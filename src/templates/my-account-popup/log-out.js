const logOutBtn = document.getElementById('log-out');

if (logOutBtn) {
    logOutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('currentSession');
        const popup = document.getElementById('my-account-popup');
        if (popup) popup.close();
        window.location.href = '../../pages/landing-page/landing-page.html';
    });
}

async function adaptarPopupPorRol() {
    const sessionData = sessionStorage.getItem('currentSession');
    if (!sessionData) return;

    const session = JSON.parse(sessionData);

    const account = document.getElementById('my-account-popup__profile');

    if (session.rol === 'restaurant') {

        let restProfile = await (await fetch(`http://localhost:3000/restaurant-profiles?id=${session.id}`)).json();
        let restId = restProfile[0].restaurantId;

        if (account) account.querySelector("span").textContent = 'My RestaurantModel Account';

        const restaurantBtnHTML = `
            <a href="../../pages/restaurant-info-page/restaurant-info-page.html?id=${restId}&edit=true" id="restaurant-tab">
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