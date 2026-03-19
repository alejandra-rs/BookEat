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

    // Detect exactly which page is loading to apply specific behaviors
    const currentUrl = window.location.href;
    const isReservationsPage = currentUrl.includes('reservations-page');
    const isSearcherPage = currentUrl.includes('searcher-page');

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
                    const role = session.rol;
                    const myId = session.id;

                    if (role === 'user') url += `?userId=${myId}&_expand=restaurant&_sort=datetime`;
                    else if (role === 'restaurant') url += `?restaurantId=${myId}&_expand=user&_sort=datetime`;

                    console.log(url);
                }

                const response = await fetch(url);
                const jsonData = await response.json();

                if (Array.isArray(jsonData)) {
                    const session = JSON.parse(sessionStorage.getItem('currentSession') || '{}');
                    const role = session.rol || 'cliente';


                    // 1. RESERVATIONS PAGE LOGIC (Map descriptions and setup cards)
                    if (isReservationsPage && context === 'bookings') {
                        console.log(url)
                        const mappedData = jsonData.map(booking => {
                            const target = role === 'cliente' ? booking.restaurant : booking.user;
                            return {
                                ...booking,
                                description: `Booking for ${booking.guests} guests on ${booking.datetime}.`,
                                id: target?.id || booking.id
                            };
                        });
                        await fillTemplate(container, mappedData);
                        setupCards(container);
                    }
                    // 2. SEARCHER PAGE LOGIC (Setup cards directly, no mapping needed)
                    else if (isSearcherPage) {
                        await fillTemplate(container, jsonData);
                        setupCards(container);
                    }
                    else await fillTemplate(container, jsonData);
                }

                else await fillPage(container, jsonData);
            } catch (error) {
                console.error(`Error en contexto "${context}":`, error);
            }
        }
    }
    checkDarkMode();
});