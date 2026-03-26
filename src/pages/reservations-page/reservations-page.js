import { fillTemplate } from "../../js/load-data.js";
import { setupCards } from "../../templates/overview/setup-cards.js";

document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.querySelector('.reservation-container__result');
    const urlParams = new URLSearchParams(window.location.search);
    const initialView = urlParams.get('time');

    if (initialView === 'past') resultsContainer.setAttribute('filter', 'past');

    document.body.addEventListener('click', async (e) => {
        if (!resultsContainer.__loadedData) return;

        const isIncoming = e.target.closest('#my-reservations');
        const isPast = e.target.closest('#incoming-reservations');

        if (isIncoming || isPast) {
            const newFilter = isIncoming ? 'incoming' : 'past';
            resultsContainer.setAttribute('filter', newFilter);

            const newUrl = new URL(window.location);
            newUrl.searchParams.set('time', newFilter);
            window.history.pushState({}, '', newUrl);

            await fillTemplate(resultsContainer, resultsContainer.__loadedData);
            setupCards(resultsContainer);
        }
    });
});