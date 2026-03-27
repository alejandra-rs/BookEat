import { fillTemplate } from "../../js/load-data.js";
import {get} from "../../js/api-json.js";

let allReviews = [];
let currentRating = 'all';
let requirePhotos = false;
let currentSort = 'newest';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('id');

    if (!restaurantId) return;

    const filterButtons = document.querySelectorAll('.restaurant-reviews-page__filters__button');
    const sortSelect = document.getElementById('sort-reviews');

    try {
        allReviews = await get(`reviews?restaurantId=${restaurantId}`);
    } catch (error) {
        console.error("Error fetching reviews:", error);
    }

    const applyFiltersAndSort = async () => {
        const reviewsContainer = document.querySelector('.restaurant-reviews-page__reviews');

        let filteredReviews = allReviews.filter(review => {
            const reviewScore = review.score || review.rating || 0;
            const matchesRating = currentRating === 'all' || Math.floor(reviewScore) === parseInt(currentRating);

            const hasPhotos = (review.images && review.images.length > 0) || (review.gallery && review.gallery.length > 0);
            const matchesPhotos = !requirePhotos || hasPhotos;

            return matchesRating && matchesPhotos;
        });

        filteredReviews.sort((a, b) => {
            const dateA = new Date(a.createdAt || a.date).getTime();
            const dateB = new Date(b.createdAt || b.date).getTime();

            return currentSort === 'newest' ? dateB - dateA : dateA - dateB;
        });

        await fillTemplate(reviewsContainer, [...filteredReviews]);
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const ratingValue = button.getAttribute('data-rating');
            const isPhotosToggle = button.hasAttribute('data-photos');

            if (ratingValue) {
                currentRating = ratingValue;

                filterButtons.forEach(btn => {
                    if (btn.hasAttribute('data-rating')) btn.classList.remove('active');
                });
                button.classList.add('active');
            }

            if (isPhotosToggle) {
                requirePhotos = !requirePhotos;
                button.classList.toggle('active');
            }
            applyFiltersAndSort();
        });
    });

    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        applyFiltersAndSort();
    });

    await applyFiltersAndSort();
});