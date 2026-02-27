
const Date = {
    'default': "",
    'incomingDate': "12/02/2026",
    'pastDate': "31/12/2025",
    'restaurantIncomingDate': "12/03/2026",
    'restaurantPastDate': "04/05/2025",
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
        let date = overview.querySelector(".title-bar > span.date")
        date.textContent = Date[type + "Date"]
        let buttonContainer = overview.querySelector(".buttonContainer")
        buttonContainer.innerHTML = Buttons[type]
        let card = overview.querySelector(".card-media");
        if (type.includes('restaurant')) {
            card.innerHTML = '<img src="/src/assets/icons/account-user.svg" alt="user image" class="profileImage icon_img restaurantUser_overview"/>'
        } else
        card.innerHTML =`<img src="/src/assets/img/restaurant-item.png" alt="a restaurant image" class="restaurantImage icon_img"/>`
    }

}