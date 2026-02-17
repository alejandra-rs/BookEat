export function authMode() {
    const loginModeToggle = document.getElementById('profileButton');

    loginModeToggle.addEventListener('click', () => {
        let currentState = localStorage.getItem('login') === 'true';
        const newState = !currentState
        localStorage.setItem('login', newState.toString());
        updateUI(newState);
    });

}

function updateUI(loggedIn) {
    const userButton = document.getElementById('userButton');
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');

    loginButton.style.display = loggedIn ? "none" : "block";
    registerButton.style.display = loggedIn ? "none" : "block";
    userButton.style.display = loggedIn ? "block" : "none";
}