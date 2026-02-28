const DatesMockUps = {
    'default-date': "",
    'incoming-date': "12/02/2026",
    'past-date': "31/12/2025",
    'restaurant-incoming-date': "12/03/2026",
    'restaurant-past-date': "04/05/2025",
}

const Buttons = {
    'default': `
        <button class="secondary-button" onclick="window.location.href='../restaurant-info-page/restaurant-info-page.html'"> Go </button>
    `,
    'incoming': `
        <button class="secondary-button">Cancel Reservation</button>
        <button class="secondary-button">Read Reviews</button>
    `,
    'past': `
        <button class="secondary-button">Write a Review</button>
        <button class="secondary-button">Read Reviews</button>
    `,
    'restaurant-incoming': `
        <button class="secondary-button">Booked tables</button>
    `,
    'restaurant-past': `
        <button class="secondary-button">Booked tables</button>
    `
};

async function setupCards(type) {
let overviews = document.querySelectorAll('.overview');
    for (let overview of overviews) {
        let date = overview.querySelector(".overview__content__title > span.overview__content__title__date")
        date.textContent = DatesMockUps[type + "-date"]
        let buttonContainer = overview.querySelector(".overview__content__button-container")
        buttonContainer.innerHTML = Buttons[type]
        let card = overview.querySelector(".overview__image");
        if (type.includes('restaurant')) {
            card.innerHTML = '<img src="../../assets/img/user-image.png" alt="user image" class="icon overview__image"/>'
        } else
        card.innerHTML =`<img src="../../assets/img/restaurant-item.png" alt="a restaurant image" class="icon overview__image"/>`
    }
}

async function mix() {
    let index = 0
    let types = ["incoming", "past", "restaurant-incoming", "restaurant-past"]
    let overviews = document.querySelectorAll('.overview');
    for (let overview of overviews) {
        index = (index +1) % 4
        let date = overview.querySelector(".overview__content__title > span.overview__content__title__date")
        date.textContent = DatesMockUps[types[index] + "-date"]
        let buttonContainer = overview.querySelector(".overview__content__button-container")
        buttonContainer.innerHTML = Buttons[types[index]]
        let card = overview.querySelector(".overview__image");
        if (types[index].includes('restaurant')) {
            card.innerHTML = '<img src="../../assets/img/user-image.png" alt="user image" class="icon overview__image"/>'
        } else
        card.innerHTML =`<img src="../../assets/img/restaurant-item.png" alt="a restaurant image" class="icon overview__image"/>`
    }
}