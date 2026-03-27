import { loadTemplate } from "../../js/load-template.js";

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const isEdit = urlParams.get('edit') === 'true';
    const pageId = urlParams.get('id');
    const session = JSON.parse(sessionStorage.getItem('currentSession') || '{}');

    if (!isEdit || session.rol !== 'restaurant') return;

    try {
        const profileRes = await fetch(`http://localhost:3000/restaurant-profiles?id=${session.id}`);
        const profiles = await profileRes.json();
        const myRestaurantId = profiles[0]?.restaurantId;

        if (String(pageId) === String(myRestaurantId)) {
            const waitForRender = setInterval(async () => {
                const title = document.querySelector('[data-template="text-name"]');
                const desc = document.querySelector('[data-template="text-description"]');

                if (title && desc && title.textContent !== 'Restaurant Name') {
                    clearInterval(waitForRender);

                    title.outerHTML = `
                        <div class="edit-property__label__field w-100 mb-2">
                            <input type="text" name="name" class="edit-property__field__input fs-3 fw-bold" value="${title.textContent}" readonly data-collection="restaurants" data-id="${myRestaurantId}">
                            <span load-template="edit-button"></span>
                        </div>
                    `;
                    desc.outerHTML = `
                        <div class="edit-property__label__field w-100 mt-3">
                            <textarea name="description" class="edit-property__field__input" rows="5" readonly data-collection="restaurants" data-id="${myRestaurantId}">${desc.textContent}</textarea>
                            <span load-template="edit-button" ></span>
                        </div>
                    `;

                    await loadTemplate();
                }
            }, 100);
        }
    } catch (error) {
        console.error("Error verifying restaurant ownership:", error);
    }
});