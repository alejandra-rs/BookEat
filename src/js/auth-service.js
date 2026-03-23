import {URL_BASE} from "../js/api-json.js";

export async function logIn(email, password) {
    const [usersExistences, restaurantExistences] = await getExistencesByEmail(email);
    if (usersExistences.length === 0 && restaurantExistences.length === 0) throw new Error("email or password is wrong.");

    let rol = usersExistences.length === 1 ? 'user' : 'restaurant';
    let user = usersExistences.length === 1 ? usersExistences[0] : restaurantExistences[0];

    if (!matchPasswords(user.password, password)) throw new Error("email or password is wrong.");

    sessionStorage.setItem('currentSession', JSON.stringify({rol: rol,id: user.id, image: user.image}));
}

export function getData(form) {
    return Object.fromEntries(new FormData(form).entries())
}

export async function getNextRestaurantId() {
    const restaurants = await (await fetch(`${URL_BASE}/restaurants`)).json();
    const maxId = restaurants.reduce((max, restaurant) => {
        const numericId = Number(restaurant.id);
        return Number.isFinite(numericId) ? Math.max(max, numericId) : max;
    }, 0);

    return maxId + 1;
}

export function isEmpty(data) {
    for (let value in data.values) {
        if (!value?.trim()){
            return true
        }
    }
    return false
}

export function checkEmail(data) {
    let emailRegex = /^[^\s@]+@[^\s@]+/;
    return (emailRegex.test(data.email))
}

export function matchPasswords(password, otherPassword) {
    return password === otherPassword;
}

export function validPassword(data) {
    return data.password.length > 8;
}

export function validPhone(data) {
    return data.phoneNumber.length === 9;
}

export function buildAddress(data) {
    return [data.addressLine1, data.addressLine2, data.city, data.province, data.postalCode]
        .filter(Boolean)
        .map(value => value.trim())
        .join(', ');
}

async function findUserByEmail(email) {
    return (await fetch(`${URL_BASE}/users?email=${email}`)).json();
}

async function findRestaurantByEmail(email) {
    return (await fetch(`${URL_BASE}/restaurant-profiles?email=${email}`)).json();
}
export async function getExistencesByEmail(email) {
    return await Promise.all([
        findUserByEmail(email),
        findRestaurantByEmail(email),
    ]);
}