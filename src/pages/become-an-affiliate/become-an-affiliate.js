import { post } from "../../js/api-json.js";
import {
    checkEmail, getData, isEmpty, logIn, matchPasswords, validPassword, validPhone, buildAddress,
    getExistencesByEmail, getNextId, check, clearErrors, showError
} from "../../js/auth-service.js";
import { showToast } from "../../js/show-toast.js";

function getTags(tagsContainer) {
    if (!tagsContainer) return [];
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
        rating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
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

window.cleanTag = function(closeButton) {
    const tagsContainer = document.getElementById('tags-container');
    const tagDiv = closeButton.parentElement;
    tagDiv.remove();
    if (tagsContainer && tagsContainer.children.length === 0) {
        tagsContainer.classList.remove('visible');
    }
}

function crearTag(texto) {
    if (texto.trim() === '') return;
    const tagsContainer = document.getElementById('tags-container');
    const tagInput = document.getElementById('tag-input');

    if (!tagsContainer || !tagInput) return;

    const tagDiv = document.createElement('div');
    tagDiv.className = 'tag';
    tagDiv.innerHTML = `${texto} <span class="tag__close" onclick="window.cleanTag(this)">×</span>`;
    tagsContainer.appendChild(tagDiv);
    tagsContainer.classList.add('visible');
    tagInput.value = '';
}

document.addEventListener('keydown', (event) => {
    if (event.target && event.target.id === 'tag-input' && event.key === 'Enter') {
        event.preventDefault();
        crearTag(event.target.value);
    }
});

document.addEventListener('submit', async (event) => {
    if (event.target && event.target.id === 'form-affiliate') {
        event.preventDefault();
        event.stopImmediatePropagation();

        const formAffiliate = event.target;
        const data = getData(formAffiliate);
        const tagsContainer = document.getElementById('tags-container');

        clearErrors(formAffiliate);
        let hasError = false;


        if (check(validPhone(data), formAffiliate.elements['phoneNumber'], 'Must be exactly 9 numbers')) hasError = true;
        if (check(checkEmail(data), formAffiliate.elements['email'], 'Must be a valid email')) hasError = true;
        if (check(validPassword(data), formAffiliate.elements['password'], 'Must be at least 8 characters')) hasError = true;
        if (check(matchPasswords(data.password, data.confirmPassword), formAffiliate.elements['confirmPassword'], 'Passwords do not match')) hasError = true;

        if (hasError) return;

        try {
            const [usersExistences, restaurantExistences] = await getExistencesByEmail(data.email);

            if (usersExistences.length > 0 || restaurantExistences.length > 0) {
                return showError(formAffiliate.elements['email'], "This email already exists.");
            }

            const nextRestaurantId = await getNextId('restaurants');
            const restaurantPostResponse = await post(createRestaurantData(data, nextRestaurantId), 'restaurants');

            if (!restaurantPostResponse.ok) throw new Error('The restaurant could not be created.');

            const nextProfileId = await getNextId('restaurant-profiles');
            const newRestaurantProfile = createRestaurantProfile(data, nextProfileId, nextRestaurantId);

            const postResponse = await post(newRestaurantProfile, 'restaurant-profiles');

            if (!postResponse.ok) throw new Error('The account could not be created.');

            await logIn(data.email, data.password);

            formAffiliate.reset();
            if (tagsContainer) {
                tagsContainer.replaceChildren();
                tagsContainer.classList.remove('visible');
            }

            if (window.updateHeader) window.updateHeader();

            showToast('RestaurantModel account created successfully.');

        } catch (error) {
            showToast(error.message);
        }
    }
});