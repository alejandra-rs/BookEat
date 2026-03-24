import {findRestaurantById} from "../../js/auth-service";

const logOutBtn = document.getElementById('log-out');

if (logOutBtn) {
    logOutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('currentSession');
        const popup = document.getElementById('my-account-popup');
        if (popup) popup.close();
        window.location.href = '../../pages/landing-page/landing-page.html';
    });
}

function adaptarPopupPorRol() {
    const sessionData = sessionStorage.getItem('currentSession');
    if (!sessionData) return;

    const session = JSON.parse(sessionData);

    const account = document.getElementById('my-account-popup__profile');

    if (session.rol === 'restaurant') {
        if (account) account.querySelector("span").textContent = 'My Restaurant Account';

        const restaurantBtnHTML = `
            <a href='../../pages/restaurant-info-page/restaurant-info-page.html?id=${findRestaurantById(session.id)}'
                id="restaurant-tab">
                <button class="my-account-popup__nav__button" id="my-restaurant">
                    <img src="../../assets/icons/fork-knife.svg" alt="Restaurant Icon" class="icon">
                    My Restaurant
                </button>
            </a>
        `;
        if (account && !document.getElementById('restaurant-tab')) {
            account.insertAdjacentHTML('afterend', restaurantBtnHTML);
        }

    } else {
        const restaurantTab = document.getElementById('restaurant-tab');
        if (restaurantTab) restaurantTab.remove();
    }
}

window.adaptarPopupPorRol = adaptarPopupPorRol;