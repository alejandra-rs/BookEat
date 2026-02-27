
const DatesMockUps = {
    'default-date': "",
    'incoming-date': "12/02/2026",
    'past-date': "31/12/2025",
    'restaurant-incoming-date': "12/03/2026",
    'restaurant-past-date': "04/05/2025",
}

const Buttons = {
    'default': `
        <button class="secondary-button restaurant-btn" onclick="window.location.href='../restaurant-info-page/restaurant-info-page.html'">
            Go
        </button>
    `,
    'incoming': `
        <button class="secondary-button incoming-reservation">Cancel Reservation</button>
        <button class="secondary-button incoming-reservation past-reservation">Read Reviews</button>
    `,
    'past': `
        <button class="secondary-button past-reservation">Write a Review</button>
        <button class="secondary-button incoming-reservation past-reservation">Read Reviews</button>
    `,
    'restaurant-incoming': `
        <button class="secondary-button restaurantUser_overview">Booked tables</button>
    `,
    'restaurant-past': `
        <button class="secondary-button restaurantUser_overview">Booked tables</button>
    `
};



async function setupCards(type) {
let overviews = document.querySelectorAll('.overview');
    for (let overview of overviews) {
        let date = overview.querySelector(".overview__content__title > span.date")
        date.textContent = DatesMockUps[type + "-date"]
        let buttonContainer = overview.querySelector(".overview__content__button-container")
        buttonContainer.innerHTML = Buttons[type]
        let card = overview.querySelector(".overview__image");
        if (type.includes('restaurant')) {
            card.innerHTML = '<img src="/src/assets/icons/account-user.svg" alt="user image" class="profileImage icon_img restaurantUser_overview"/>'
        } else
        card.innerHTML =`<img src="/src/assets/img/restaurant-item.png" alt="a restaurant image" class="restaurantImage icon_img"/>`
    }
}

async function mix() {
    let index = 0
    let types = ["incoming", "past", "restaurant-incoming", "restaurant-past"]
    let overviews = document.querySelectorAll('.overview');
    for (let overview of overviews) {
        index = (index +1) % 4
        let date = overview.querySelector(".overview__content__title > span.date")
        date.textContent = DatesMockUps[types[index] + "-date"]
        let buttonContainer = overview.querySelector(".overview__content__button-container")
        buttonContainer.innerHTML = Buttons[types[index]]
        let card = overview.querySelector(".overview__image");
        if (types[index].includes('restaurant')) {
            card.innerHTML = '<img src="/src/assets/icons/account-user.svg" alt="user image" class="profileImage icon_img restaurantUser_overview"/>'
        } else
        card.innerHTML =`<img src="/src/assets/img/restaurant-item.png" alt="a restaurant image" class="restaurantImage icon_img"/>`
    }
}

