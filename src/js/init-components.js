import {checkDarkMode} from "../../src/js/init-dark-mode.js";
import {loadTemplate} from "../../src/js/load-template.js";
import {fillPage, fillTemplate} from "./load-data.js";
import {setupCards} from "../../src/templates/overview/setup-cards.js";

document.addEventListener('DOMContentLoaded', async function() {
    await loadTemplate();

    document.querySelectorAll('.custom-property').forEach(container => {
        const icon = container.getAttribute('data-icon');
        const label = container.getAttribute('data-label');
        const type = container.getAttribute('data-type');
        const name = container.getAttribute('data-key');

        const img = container.querySelector('.edit-property__icon');
        const labelSpan = container.querySelector('.edit-property__label > span');
        const input = container.querySelector('input');

        if (icon && img) img.src = `../../assets/icons/${icon}`;
        if (label && labelSpan) labelSpan.textContent = label;

        if (input) {
            if (type) input.type = type;
            if (name) {
                input.name = name;
                input.setAttribute('data-template', `input-${name}`);
            }
        }
    });

    const session = JSON.parse(sessionStorage.getItem('currentSession'));
    const role = session?.rol || "";
    const myId = session?.id || "";

    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');

    const contextElement = document.querySelector('[data-page-context]');
    let pageContext = contextElement ? contextElement.getAttribute('data-page-context') : null;

    if (pageContext === 'my-profile') {
        pageContext = role === 'user' ? 'users' : 'restaurants';
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

                if (related === 'session' && context === 'bookings') {
                    url += role === 'user'
                        ? `?userId=${myId}&_expand=restaurant&_sort=datetime`
                        : `?restaurantId=${myId}&_expand=user&_sort=datetime`;
                } else if (id && related) {
                    url += `?${related}=${id}`;
                }

                const jsonData = await (await fetch(url)).json();

                if (Array.isArray(jsonData)) {
                    if (context === 'bookings' && window.location.href.includes('reservations-page')) {
                        const mappedData = jsonData.map(booking => {
                            const target = role === 'user' ? booking.restaurant : booking.user;
                            return {
                                ...booking,
                                description: `Booking for ${booking.guests} guests.`,
                                id: booking.id,
                                restaurantId: target?.id
                            };
                        });
                        await fillTemplate(container, mappedData);
                        setupCards(container);
                    } else {
                        await fillTemplate(container, jsonData);
                        if (window.location.href.includes('searcher-page') && context === 'restaurants') {
                            setupCards(container);
                        }
                    }
                }
                else await fillPage(container, jsonData);
            } catch (error) {
                console.error(`Error in context "${context}":`, error);
            }
        }
    }

    if (pageContext === 'my-profile' || pageContext === 'restaurants' || pageContext === 'users') {
        document.addEventListener('click', async (event) => {
            const editBtnContainer = event.target.closest('.edit-button');
            if (!editBtnContainer) return;

            const fieldContainer = editBtnContainer.closest('.edit-property__label__field');
            if (!fieldContainer) return;

            const inputElement = fieldContainer.querySelector('input');
            const fieldName = inputElement.getAttribute('name');

            const btnImage = editBtnContainer.querySelector('img') || editBtnContainer.querySelector('.icon');

            if (inputElement.hasAttribute('readonly')) {
                event.preventDefault();
                inputElement.removeAttribute('readonly');
                inputElement.focus();

                if (btnImage) btnImage.src = "../../assets/icons/save.svg";
            }

            else {
                const newValue = inputElement.value;
                try {
                    const endpoint = role === 'user' ? 'users' : 'restaurants';

                    const response = await fetch(`http://localhost:3000/${endpoint}/${myId}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ [fieldName]: newValue })
                    });

                    if (response.ok) {
                        inputElement.setAttribute('readonly', true);
                        if (btnImage) btnImage.src = "../../assets/icons/pencil.svg";
                        showToast(`You have successfully updated your ${fieldName}.`);
                    } else {
                        throw new Error("Failed to save to database");
                    }

                } catch (error) {
                    showToast(`Failed to save changes on ${fieldName}.`);
                    alert("Could not save changes. Please try again.");
                }
            }
        });
    }

    checkDarkMode();
});

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}