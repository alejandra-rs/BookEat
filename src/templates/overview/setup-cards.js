import {fillPage} from "../../js/load-data.js";

const DatesMockUps = {
    'default-date': "",
    'incoming-date': "12/02/2026",
    'past-date': "31/12/2025",
    'restaurant-incoming-date': "12/03/2026",
    'restaurant-past-date': "04/05/2025",
}

const Buttons = {
    'default': `
       <template>
           <div class="card">
               <a class="button" data-template="href-id" href="../../pages/restaurant-info-page/restaurant-info-page.html">Go</a>
           </div>
       </template>
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

export function setupCards(container) {
    // 1. Find all the freshly rendered cards inside the container
    const cards = container.querySelectorAll('.overview'); // Changed this to '.overview' to perfectly match overview.html's root element

    cards.forEach(card => {
        const actionsContainer = card.querySelector('.card__actions-container');
        const idStore = card.querySelector('.overview__content__button-container');

        if (actionsContainer && idStore) {
            // 2. Grab the ID that load-data.js injected
            const cardId = idStore.getAttribute('value') || idStore.textContent;

            // 3. Create the "GO" button
            const goButton = document.createElement('a');
            goButton.className = 'button'; // Give it your global button class so it looks nice
            goButton.textContent = 'GO >';

            // 4. Set the correct URL with the dynamic ID attached!
            goButton.href = `../../pages/restaurant-info-page/restaurant-info-page.html?id=${cardId}`;

            // 5. Inject the button into the card
            actionsContainer.appendChild(goButton);
        }
    });
}