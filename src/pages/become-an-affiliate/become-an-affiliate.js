import { post } from "../../js/api-json.js";
import {
    checkEmail, getData, isEmpty, logIn, matchPasswords, validPassword, validPhone, buildAddress,
    getExistencesByEmail, getNextId
} from "../../js/auth-service.js";

const formAffiliate = document.getElementById('form-affiliate');
const tagInput = document.getElementById('tag-input');
const tagsContainer = document.getElementById('tags-container');

function getTags() {
    return [...tagsContainer.querySelectorAll('.tag__text')]
        .map(tag => tag.textContent.trim())
        .filter(Boolean);
}

function createRestaurantData(data, restaurantId) {
    return {
        id: restaurantId,
        name: data.restaurantName,
        description: "",
        hours: {},
        url: "",
        address: buildAddress(data),
        coordinates: [0, 0],
        categories: [],
        rating: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        },
        menu: [],
        outline: [],
        tables: [],
        gallery: []
    };
}

function createRestaurantProfile(data, userId, restaurantId) {
    return {
        id: `${userId}`,
        name: data.name,
        surname: data.surname,
        accountName: data.name,
        password: data.password,
        email: data.email,
        phoneNumber: data.phoneNumber,
        image: "",
        restaurantId: restaurantId
    };
}

function cleanTag(closeButton) {
    const tagDiv = closeButton.parentElement;
    tagDiv.remove();
    if (tagsContainer.children.length === 0) {
        tagsContainer.classList.remove('visible');
    }
}

function crearTag(texto) {
    if (texto.trim() === '') return;
    const tagDiv = document.createElement('div');
    tagDiv.className = 'tag';
    tagDiv.innerHTML = `${texto} <span class="tag__close" onclick="cleanTag(this)">×</span>`;
    tagsContainer.appendChild(tagDiv);
    tagsContainer.classList.add('visible');
    tagInput.value = '';
}

if (tagInput) {
    tagInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            crearTag(this.value);
        }
    });
}

if (tagsContainer) {
    tagsContainer.addEventListener('click', (event) => {
        const closeBtn = event.target.closest('.tag__close');
        if (!closeBtn) return;
        cleanTag(closeBtn);
    });
}

if (formAffiliate) {
    formAffiliate.addEventListener('submit', async (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        const data = getData(formAffiliate);

        if (isEmpty(data)) return alert('please complete all fields');
        if (!checkEmail(data)) return alert('must be a valid email address');
        if (!validPhone(data)) return alert('the phone number length should be at least 9 digits.');
        if (!matchPasswords(data.password, data.confirmPassword)) return alert('the password do not match.');
        if (!validPassword(data)) return alert('the password length should be at least 8 characters.');

        try {
            const [usersExistences, restaurantExistences] = await getExistencesByEmail(data.email);

            if (usersExistences.length > 0 || restaurantExistences.length > 0) {
                return alert('This email already exists.');
            }
            const nextRestaurantId = await getNextId('restaurants');
            const restaurantPostResponse = await post(createRestaurantData(data, nextRestaurantId), 'restaurants');
            
            if (!restaurantPostResponse.ok) throw new Error('The restaurant could not be created.');

            
            const nextProfileId = await getNextId('restaurant-profiles');
            const newRestaurantProfile = createRestaurantProfile(data, nextProfileId, nextRestaurantId)

            const postResponse = await post(newRestaurantProfile, 'restaurant-profiles');

            if (!postResponse.ok) throw new Error('The account could not be created.');

            await logIn(data.email, data.password)

            formAffiliate.reset();
            tagsContainer.replaceChildren();
            tagsContainer.classList.remove('visible');
            updateHeader();

            alert('Restaurant account created successfully.');
        } catch (error) {
            alert(error.message);
        }
    });
}