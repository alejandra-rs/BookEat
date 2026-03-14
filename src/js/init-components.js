import {fillRestaurantItems} from '../../src/js/fill-Restaurant-Items-Carousels.js';
import {fillRestaurantInfo} from '../../src/js/fill-Restaurant-info.js';
import {checkDarkMode} from "../../src/js/init-dark-mode.js";
import {loadTemplate} from "../../src/js/load-template.js";
import {mix, setupCards} from '../../src/templates/overview/setup-cards.js';

document.addEventListener('DOMContentLoaded', async function() {
    await loadTemplate();
    switch (true) {
        case window.location.href.includes('landing-page'):
            await fillRestaurantItems();
            break;
        case window.location.href.includes('restaurant-info-page'):
            await fillRestaurantInfo();
            break;
        case window.location.href.includes('reservation-page'):
            mix();
            break;
    }
    checkDarkMode();
});