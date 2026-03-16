import {checkDarkMode} from "../../src/js/init-dark-mode.js";
import {loadTemplate} from "../../src/js/load-template.js";
import {mix, setupCards} from '../../src/templates/overview/setup-cards.js';
import {fillReviewsPage} from "../../src/js/fill-review-page.js";
import {fillPage, fillTemplate} from "../../src/js/SUPREME-FILL.js";

document.addEventListener('DOMContentLoaded', async function() {
    await loadTemplate();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/restaurants/${id}`);
            const restaurantData = await response.json();

            const infoContainer = document.querySelector('.restaurant-info-page');
            if (infoContainer) {
                fillPage(infoContainer, restaurantData);
            }

            const popupContainer = document.querySelector('.menu-popup__container');
            if (popupContainer && restaurantData.menu) {
                await fillTemplate(popupContainer, restaurantData.menu);
            }

        } catch (error) {
            console.error("Error cargando detalles del restaurante:", error);
        }
    }

    const containers = document.querySelectorAll("[data-context]")

    for (const container of containers) {
        const data = container.getAttribute("data-context");
        try {
            const response = await fetch(`http://localhost:3000/${data}`);
            const jsonData = await response.json();

            if (Array.isArray(jsonData)) fillTemplate(container, jsonData);
            else fillPage(container, jsonData);
        } catch (error) {
            console.error(`Error cargando el contexto "${data}":`, error);
        }
    }
    checkDarkMode();

    /*
    switch (true) {
        case window.location.href.includes('landing-page'):
            await fillRestaurantItems();
            break;
        case window.location.href.includes('restaurant-info-page'):
            await fillRestaurantInfo();
            break;
        case window.location.href.includes('reservation-page'):
            await mix();
            break;
        case window.location.href.includes('searcher-page'):
            await  setupCards("default");
            break;
        case window.location.href.includes('restaurant-reviews-page'):
            await fillReviewsPage();
            break;
    }
     */
});