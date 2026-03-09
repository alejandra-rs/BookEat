document.addEventListener('click', (event) => {

    const loginDialog = document.getElementById('login-popup');
    const registerDialog = document.getElementById('register-popup');

    if (event.target.closest('#loginButton')) {
        if (loginDialog && !loginDialog.open) loginDialog.showModal();
        if (registerDialog) registerDialog.close();
        return;
    }

    if (event.target.closest('#registerButton')) {
        if (registerDialog && registerDialog.open) registerDialog.close();
        if (registerDialog) registerDialog.showModal();
        return;
    }

    if (loginDialog && loginDialog.open && event.target === loginDialog) {
        loginDialog.close();
    }

    if (registerDialog && registerDialog.open && event.target === registerDialog) {
        registerDialog.close();
    }
});

document.addEventListener('submit', (event) => {
    if (event.target.id === 'form-login') {
        event.preventDefault();
        console.log("Enviando datos de login...");
        // Aquí harías tu fetch() a la API
        document.getElementById('login-popup').close();
    }
});