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
           <a data-template="href-id" href="../../pages/restaurant-info-page/restaurant-info-page.html">
                <button class="secondary-button read-more"> Go </button>
           </a>
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

export function setupCards(container, type = 'default') {
    const cards = container.querySelectorAll('.overview');
    const dateValue = DatesMockUps[`${type}-date`] || DatesMockUps['default-date'];

    cards.forEach(card => {
        const actionsContainer = card.querySelector('.card__actions-container');
        const idStore = card.querySelector('.overview__content__buttons__id');
        const dateDisplay = card.querySelector('[data-template="text-date"]');

        if (dateDisplay) dateDisplay.textContent = dateValue;

        if (actionsContainer && idStore) {
            const cardId = idStore.getAttribute('value') || idStore.textContent;

            while (actionsContainer.firstChild) actionsContainer.removeChild(actionsContainer.firstChild);

            const templateString = Buttons[type] || Buttons['default'];
            const fragment = document.createRange().createContextualFragment(templateString);

            const content = fragment.querySelector('template').content.cloneNode(true);

            const link = content.querySelector('a[data-template="href-id"]');
            if (link) link.href = `${link.getAttribute('href')}?id=${cardId}`;

            actionsContainer.appendChild(content);
        }
    });
}