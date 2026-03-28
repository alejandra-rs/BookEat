import {fillTemplate} from "../../js/load-data.js";
import {setupCards} from "../../templates/overview/setup-cards.js";

let allRestaurants = [];

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    let url = 'http://localhost:3000/restaurants';
    if (searchQuery) url += `?q=${searchQuery}`;

    try {
        const response = await fetch(url);
        allRestaurants = await response.json();
    } catch (e) {
        console.error("Error fetching restaurants for filtering", e);
    }

    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const categoryCheckboxes = document.querySelectorAll('.category-filter');
    const resultsContainer = document.querySelector('.searcher-page__results');

    const applyFilters = async () => {
        let minPrice = parseFloat(minPriceInput.value);
        let maxPrice = parseFloat(maxPriceInput.value);
        if (minPrice > maxPrice) {
            let tmp = minPrice; minPrice = maxPrice; maxPrice = tmp;
        }

        document.getElementById('min-price-label').textContent = `${minPrice}€`;
        document.getElementById('max-price-label').textContent = `${maxPrice}€`;

        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => parseInt(cb.value));

        const filteredRestaurants = allRestaurants.filter(restaurant => {
            const restMin = parseFloat(restaurant.minPrice) || 0;
            const restMax = parseFloat(restaurant.maxPrice) || 0;

            const matchesPrice = (restMin <= maxPrice) && (restMax >= minPrice);

            const matchesCategory = selectedCategories.length === 0 ||
                (restaurant.categories && selectedCategories.some(id => restaurant.categories.includes(id)));

            return matchesPrice && matchesCategory;
        })

        await fillTemplate(resultsContainer, filteredRestaurants);
        setupCards(resultsContainer);
    };

    minPriceInput.addEventListener('input', applyFilters);
    maxPriceInput.addEventListener('input', applyFilters);
    categoryCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));
});