import {loadTemplate} from "../../src/js/load-template.js";
import {initEditButtons} from "../../src/templates/edit-button/edit-button.js";
import {setProperties} from "../../src/templates/edit-property/properties.js";
import {setCarouselTitles} from "../../src/templates/restaurant-carousel/carousel-title.js";
import {initBookingState} from "../../src/js/booking-state.js";
import {checkDarkMode} from "../../src/js/init-dark-mode.js";
import {fillPageWithData} from "./fill-page-with-data.js";


document.addEventListener('DOMContentLoaded', async function() {
    await loadTemplate();

    initEditButtons();
    setProperties();
    setCarouselTitles();
    initBookingState();

    checkDarkMode();

    await fillPageWithData();
});