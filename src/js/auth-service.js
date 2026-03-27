import {findRestaurantByEmail, findUserByEmail, URL_BASE} from "../js/api-json.js";

export async function logIn(email, password) {
    const [usersExistences, restaurantExistences] = await getExistencesByEmail(email);
    if (usersExistences.length === 0 && restaurantExistences.length === 0) return false

    let rol = usersExistences.length === 1 ? 'user' : 'restaurant';
    let user = usersExistences.length === 1 ? usersExistences[0] : restaurantExistences[0];

    if (!matchPasswords(user.password, password)) return false;

    sessionStorage.setItem('currentSession', JSON.stringify({rol: rol,id: user.id, image: user.image}));
    return true
}

export function getData(form) {
    return Object.fromEntries(new FormData(form).entries())
}

export function isEmpty(form) {
    let hasError = false;
    const inputs = Array.from(form.elements);

    for (let input of inputs) {
        if (input.tagName === 'BUTTON' || input.type === 'submit' || input.type === 'button') {
            continue;
        }
        if (!input.value.trim()) {
            showError(input, "This field is required");
            hasError = true;
        }
    }
    return hasError;
}

export function checkEmail(data) {
    let emailRegex = /^[^\s@]+@[^\s@]+/;
    return (emailRegex.test(data.email))
}

export function matchPasswords(password, otherPassword) {
    return password === otherPassword;
}

export function validPassword(data) {
    return data.password.length >= 8;
}

export function validPhone(data) {
    const patronNumerico = /^[0-9]+$/
    return patronNumerico.test(data.phoneNumber) && data.phoneNumber.length === 9 ;
}

export function buildAddress(data) {
    return [data.addressLine1, data.addressLine2, data.city, data.province, data.postalCode]
        .filter(Boolean)
        .map(value => value.trim())
        .join(', ');
}

export async function getExistencesByEmail(email) {
    return await Promise.all([
        findUserByEmail(email),
        findRestaurantByEmail(email),
    ]);
}


export async function findRestaurantById(id) {
    try {
        const response = await fetch(`${URL_BASE}/restaurants/${id}`);
        if (!response.ok) return null;

        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error("Error searching a restaurant", error);
        return null;
    }
}

export async function getNextId(url) {
    const datas = await (await fetch(`${URL_BASE}/${url}`)).json();
    const maxId = datas.reduce((max, data) => {
        const numericId = Number(data.id);
        return Number.isFinite(numericId) ? Math.max(max, numericId) : max;
    }, 0);

    return maxId + 1;
}


export function dateValid(data) {
    let today = new Date();
    let birthdate = new Date(data.birthdate);

    let age = today.getFullYear() - birthdate.getFullYear();

    let month = today.getMonth() - birthdate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }

    return age >= 18 && age <= 99;
}


export function showError(input, message) {
    input.classList.add('input-error');
    let errorSpan = input.parentNode.querySelector('.error-message');
    if (!errorSpan) {
        errorSpan = document.createElement('div');
        errorSpan.className = 'error-message';
        input.parentNode.appendChild(errorSpan);
    }
    errorSpan.textContent = message;
    return true
}

export function check(condition, input, message) {
    if (!condition) {
        return showError(input, message);
    }
    return false;
}

export function clearErrors(form) {
    form.querySelectorAll('.input-error').forEach(i => i.classList.remove('input-error'));
    form.querySelectorAll('.error-message').forEach(span => span.remove());
}

document.addEventListener('input', (e) => {
    if (e.target.classList.contains('input-error')) {
        e.target.classList.remove('input-error');
        const errorSpan = e.target.parentNode.querySelector('.error-message');
        if (errorSpan) errorSpan.remove();
    }
});