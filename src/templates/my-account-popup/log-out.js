const logOutBtn = document.getElementById('log-out');

if (logOutBtn) {
    logOutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('currentSession');
        const popup = document.getElementById('my-account-popup');
        if (popup) popup.close();
        window.location.href = '../../pages/landing-page/landing-page.html';
    });
}