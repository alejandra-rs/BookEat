export const URL_BASE = 'http://localhost:3000';

export async function post(newUser, endpoint) {
    return await fetch(`${URL_BASE}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });
}

export async function get(endpoint) {
    return await(await fetch(`${URL_BASE}/${endpoint}`)).json();
}

export async function findUserByEmail(email) {
    return (await fetch(`${URL_BASE}/users?email=${email}`)).json();
}

export async function findRestaurantByEmail(email) {
    return (await fetch(`${URL_BASE}/restaurant-profiles?email=${email}`)).json();
}

export async function patch(updatedData, endpoint, id) {
    return await fetch(`${URL_BASE}/${endpoint}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    });
}