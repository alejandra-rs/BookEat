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
       <template>
           <a>
                <button class="secondary-button">Cancel Reservation</button>
           </a>
           <a data-template="href-restaurantId" href="../../pages/restaurant-reviews-page/restaurant-reviews-page.html">
                <button class="secondary-button">Read Reviews</button>
           </a>
       </template>
    `,
    'past': `
       <template>
            <button class="secondary-button btn-write-review">Write a Review</button>
           
           <a data-template="href-restaurantId" href="../../pages/restaurant-reviews-page/restaurant-reviews-page.html">
                <button class="secondary-button">Read Reviews</button>
           </a>
       </template>
    `,
    'restaurant-incoming': `
        <button class="secondary-button">Booked tables</button>
    `,
    'restaurant-past': `
        <button class="secondary-button">Booked tables</button>
    `
};

export function setupCards(container) {
    const time = new URLSearchParams(window.location.search).get('time');
    const session = JSON.parse(sessionStorage.getItem('currentSession') || '{}');
    const role = session.rol || 'user';

    let type = 'default';
    if (time) type = role === 'restaurant' ? `restaurant-${time}` : time;
    const dateValue = DatesMockUps[`${type}-date`] || DatesMockUps['default-date'];
    const cards = container.querySelectorAll('.overview');

    cards.forEach(card => {
        const actionsContainer = card.querySelector('.card__actions-container');
        const idStore = card.querySelector('.overview__content__buttons__id');
        const dateDisplay = card.querySelector('[data-template="text-date"]');

        if (dateDisplay) dateDisplay.textContent = dateValue;

        if (actionsContainer && idStore) {
            while (actionsContainer.firstChild) actionsContainer.removeChild(actionsContainer.firstChild);

            const templateString = Buttons[type] || Buttons['default'];
            const fragment = document.createRange().createContextualFragment(templateString);

            const template = fragment.querySelector('template');
            const content = template ? template.content.cloneNode(true) : fragment;

            const link = content.querySelector('a[data-template]');
            if (link) {
                const targetIdSelector = `.overview__content__buttons__${link.getAttribute('data-template').split('-')[1]}`;
                const targetIdElement = card.querySelector(targetIdSelector);
                if (targetIdElement) {
                    link.href = `${link.getAttribute('href')}?id=${targetIdElement.getAttribute('value')}`;
                }
        }
            // --- EL FRANCOTIRADOR ---
            const reviewBtn = content.querySelector('.btn-write-review');
            if (reviewBtn) {
                // 1. Buscamos el nombre
                const titleElement = card.querySelector('h1[filter="reservationName"]');
                const restaurantName = titleElement ? titleElement.textContent : 'Restaurant';

                // 2. Buscamos el ID del restaurante en la tarjeta
                const restIdElement = card.querySelector('.overview__content__buttons__restaurantId');
                const restaurantId = restIdElement ? restIdElement.getAttribute('value') : '';

                reviewBtn.addEventListener('click', () => {
                    // Ponemos el nombre en el título
                    const popupTitle = document.getElementById('review-restaurant-title');
                    if (popupTitle) popupTitle.textContent = `Review: ${restaurantName}`;

                    // Metemos el ID en el bolsillo secreto del formulario
                    const hiddenIdInput = document.getElementById('review-restaurant-id');
                    if (hiddenIdInput) hiddenIdInput.value = restaurantId;

                    const dialog = document.getElementById('write-review');
                    if (dialog) {
                        document.querySelectorAll('dialog[open]').forEach(d => d.close());
                        dialog.showModal();
                    }
                });
            }
            // -------------------------

        actionsContainer.appendChild(content);
    }
    });
}