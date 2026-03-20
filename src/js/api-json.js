const URL_BASE = 'http://localhost:3000';

export async function post(newUser, endpoint) {
    return await fetch(`${URL_BASE}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });
}