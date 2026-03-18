const logOutBtn = document.getElementById('log-out');

if (logOutBtn) {
    logOutBtn.addEventListener('click', (e) => {
        sessionStorage.removeItem('usuarioActual');
        const popup = document.getElementById('my-account-popup');
        if (popup) popup.close();
        window.location.href = '../../pages/landing-page/landing-page.html';
    });
}