import {checkDarkMode} from "../../src/js/init-dark-mode.js";
import {loadTemplate} from "../../src/js/load-template.js";
import {fillPage, fillTemplate} from "./load-data.js";
import {setupCards} from "../../src/templates/overview/setup-cards.js";

document.addEventListener('DOMContentLoaded', async function() {
    await loadTemplate();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    let globalData = null;

    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/restaurants/${id}`);
            globalData = await response.json();
            await fillPage(document.body, globalData);
        } catch (error) {
            console.error("Error cargando el restaurante:", error);
        }
    }

    const containers = document.querySelectorAll("[data-context]");

    for (const container of containers) {
        const context = container.getAttribute("data-context");
        const related = container.getAttribute("related");

        if (globalData && globalData[context]) {
            const localData = globalData[context];
            if (Array.isArray(localData)) await fillTemplate(container, localData);
            else await fillPage(container, localData);
        }
        else {
            try {
                let url = `http://localhost:3000/${context}`;
                if (id && related) url += `?${related}=${id}`;

                if (related === 'session') {
                    const session = JSON.parse(sessionStorage.getItem('currentSession') || '{}');
                    if (session.rol === 'user') url += `?userId=${(session.id)}&_expand=restaurant&_sort=datetime`;
                    else if (session.rol === 'restaurant') url += `?restaurantId=${(session.id)}&_expand=user&_sort=datetime`;
                }

                const jsonData = await (await fetch(url)).json();

                if (Array.isArray(jsonData)) {
                    const session = JSON.parse(sessionStorage.getItem('currentSession') || '{}');
                    const role = session.rol || 'user';


                    if (window.location.href.includes('reservations-page') && context === 'bookings') {
                        const mappedData = jsonData.map(booking => {
                            const target = role === 'user' ? booking.restaurant : booking.user;
                            return {
                                ...booking,
                                description: `Booking for ${booking.guests} guests.`,
                                id: target?.id || booking.id,
                                restaurantId: target?.id
                            };
                        });
                        await fillTemplate(container, mappedData);
                        setupCards(container);
                    }
                    else await fillTemplate(container, jsonData);
                    if (window.location.href.includes('searcher-page')) setupCards(container);
                }
                else await fillPage(container, jsonData);
            } catch (error) {
                console.error(`Error en contexto "${context}":`, error);
            }
        }
    }
    checkDarkMode();
});