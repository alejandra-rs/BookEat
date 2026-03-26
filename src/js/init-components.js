import {checkDarkMode} from "../../src/js/init-dark-mode.js";
import {loadTemplate} from "../../src/js/load-template.js";
import {fillPage, fillTemplate} from "./load-data.js";
import {setupCards} from "../../src/templates/overview/setup-cards.js";
import {initEditButtons} from "../../src/templates/edit-button/edit-button.js";
import {setProperties} from "../../src/templates/edit-property/properties.js";

document.addEventListener('DOMContentLoaded', async function() {
    await loadTemplate();
    initEditButtons(); setProperties();

    document.addEventListener('click', () => setTimeout(saveBookingState, 100));
    setTimeout(restoreBookingState, 300);

    const session = JSON.parse(sessionStorage.getItem('currentSession'));
    const role = session?.rol || "";
    const myId = session?.id || "";

    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    const searchQuery = urlParams.get('q');

    const contextElement = document.querySelector('[data-page-context]');
    let pageContext = contextElement ? contextElement.getAttribute('data-page-context') : null;

    if (pageContext === 'my-profile') {
        pageContext = role === 'user' ? 'users' : 'restaurant-profiles';
        if (!id) id = myId;
    }

    let globalData = null;
    if (id) {
        try {
            globalData = await (await fetch(`http://localhost:3000/${pageContext}/${id}`)).json();
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

                if (related === 'session') {
                    const relationField = role === 'user' ? 'userId' : 'restaurantId';
                    const expandField = role === 'user' ? 'restaurant' : 'user';
                    url += `?${relationField}=${myId}&_expand=${expandField}`;
                }
                else if (id && related) url += `?${related}=${id}`;
                else if (searchQuery && context === 'restaurants') url += `?q=${searchQuery}`;

                const jsonData = await (await fetch(url)).json();

                if (Array.isArray(jsonData)) {
                    container.__loadedData = jsonData;
                    await fillTemplate(container, jsonData);
                    if (container.querySelector('.overview')) setupCards(container);
                }
                else await fillPage(container, jsonData);
            } catch (error) {
                console.error(`Error in context "${context}":`, error);
            }
        }
    }

    checkDarkMode();
});

function saveBookingState() {
    if (document.querySelector('.booking-details-page') || document.querySelector('.book-table-page')) return;
    const dateInputEl = document.querySelector('.date-picker__input');
    const rawDate = dateInputEl?.value;

    let formattedDate;
    if (rawDate && rawDate.includes('/')) {
        const [d, m, y] = rawDate.split('/');
        formattedDate = `${y}-${m}-${d}`;
    } else formattedDate = `${rawDate}`;

    const state = {
        date: formattedDate,
        time: document.querySelector('.hour-selector__placeholder span')?.textContent || "",
        diners: document.querySelector('#number')?.textContent || "1"
    };
    sessionStorage.setItem('pendingBooking', JSON.stringify(state));
}

function restoreBookingState() {
    const state = JSON.parse(sessionStorage.getItem('pendingBooking') || '{}');

    if (state.diners) document.querySelectorAll('#number').forEach(el => el.textContent = state.diners);
    if (state.time && state.time !== "Time") document.querySelectorAll('.hour-selector__placeholder span').forEach(el => el.textContent = state.time);
    if (state.date) {
        document.querySelectorAll('.date-picker__input').forEach(el => {
            const [y, m, d] = state.date.split('-');
            el.value = `${d}/${m}/${y}`;
        });
    }
}