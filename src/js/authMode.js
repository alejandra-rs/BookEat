function authMode(event) {
    if (event) {
        event.preventDefault();
    }
    let currentState = localStorage.getItem('login') === 'true';
    const newState = !currentState
    localStorage.setItem('login', newState.toString());
    updateUI(newState);
}

function updateUI(loggedIn) {
    const userButton = document.getElementById('userButton');
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');

    loginButton.style.display = loggedIn ? "none" : "block";
    registerButton.style.display = loggedIn ? "none" : "block";
    userButton.style.display = loggedIn ? "block" : "none";
}

function popupMode(id1, id_disable){
    if (id_disable != null){
        const popup_disable = document.getElementById(id_disable);
        popup_disable.style.display = 'none';
    }
    const popup = document.getElementById(id1);
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
}


function closeLoginPopup(id, buttonID) {
    document.body.style.overflow = 'scroll';
    document.getElementById(id).style.display = 'none';
    const btn = document.getElementById(buttonID) ;
    if(btn != null){
        btn.addEventListener('click', authMode)
    }
}