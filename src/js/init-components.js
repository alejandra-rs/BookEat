document.addEventListener('DOMContentLoaded', async function() {
    await loadTemplate();
    await fillRestaurantItems();
    checkDarkMode();
});