import { fillText, fillImage, fillTotalRating } from "../../src/js/fill-utils.js";
import { fillReview } from "../../src/js/fill-review.js";
import {fillMenu} from "../../src/js/fill-menu.js";

let currentPage = 1;
const reviewsPerPage = 5;

export async function fillReviewsPage() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    if (!id) return;

    const [resResp, revResp, userResp] = await Promise.all([
        fetch('../../../data/restaurants.json').then(r => r.json()),
        fetch('../../../data/reviews.json').then(r => r.json()),
        fetch('../../../data/user-profiles.json').then(r => r.json())
    ]);

    const restaurant = resResp.find(r => r.id === id);
    if (!restaurant) return;

    const infoContainer = document.querySelector('.restaurant-reviews-page__main');
    if (infoContainer) {
        fillText('restaurant-name', restaurant.name, infoContainer);
        fillImage('image', restaurant.images, infoContainer);
        fillImage('carousel', restaurant.gallery, infoContainer);
        fillText('description', restaurant.description, infoContainer, true);
        fillTotalRating('user-score', restaurant.rating, infoContainer);
    }

    const restaurantReviews = revResp.filter(r => r['restaurant-id'] === id);
    fillSummaryBreakdown(restaurant.rating);
    await fillMenu(restaurant.menu);

    const selectSort = document.getElementById('sort-reviews');

    const applyFiltersAndSort = () => {
        const activeBtn = document.querySelector('.restaurant-reviews-page__filters__button.active');
        const ratingFilter = activeBtn ? activeBtn.getAttribute('data-rating') : 'all';
        const photoFilter = activeBtn ? activeBtn.getAttribute('data-photos') === 'true' : false;

        let data = [...restaurantReviews];
        if (ratingFilter && ratingFilter !== 'all') {
            data = data.filter(r => r.rating === parseInt(ratingFilter));
        }
        if (photoFilter) {
            data = data.filter(r => r.images && r.images.length > 0);
        }

        const criteria = selectSort.value;
        const finalData = sortReviews(data, criteria);

        currentPage = 1;
        setupPagination(finalData, userResp);
    };

    selectSort.addEventListener('change', applyFiltersAndSort);
    initFilters(applyFiltersAndSort);

    applyFiltersAndSort();
}

export function setupPagination(reviews, userMap) {
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    const updateDisplay = async () => {
        const start = (currentPage - 1) * reviewsPerPage;
        const end = start + reviewsPerPage;
        await fillReview(reviews.slice(start, end), userMap);

        renderPageNumbers(totalPages);

        document.getElementById('prev-page').disabled = currentPage === 1;
        document.getElementById('next-page').disabled = currentPage === totalPages;
    };

    const renderPageNumbers = (total) => {
        const container = document.getElementById('page-numbers');
        container.innerHTML = '';

        const pages = [];
        const delta = 2;

        for (let i = 1; i <= total; i++) {
            if (i <= 5 || i === total || (i >= currentPage - delta && i <= currentPage + delta)) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...');
            }
        }

        pages.forEach(page => {
            const span = document.createElement('span');
            span.textContent = page;
            span.className = `page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'dots' : ''}`;

            if (page !== '...') {
                span.onclick = () => {
                    currentPage = page;
                    updateDisplay();
                    window.scrollTo(0, 500);
                };
            }
            container.appendChild(span);
        });
    };

    document.getElementById('prev-page').onclick = () => { if (currentPage > 1) { currentPage--; updateDisplay(); } };
    document.getElementById('next-page').onclick = () => { if (currentPage < totalPages) { currentPage++; updateDisplay(); } };

    updateDisplay();
}

function fillSummaryBreakdown(reviews) {
    if (!reviews || reviews.length === 0) return;

    const totalReviews = Object.values(reviews).reduce((a, b) => a + b, 0);
    const totalCountEl = document.querySelector('.restaurant-reviews-page__summary__mean__info');
    if (totalCountEl) {
        totalCountEl.textContent = `${totalReviews} reviews`;
    }
    for (let i = 1; i <= 5; i++) {
        const count = reviews[i];
        const percentage = (count / totalReviews) * 100;

        const countEl = document.querySelector(`[data-template="count-${i}"]`);
        if (countEl) countEl.textContent = count;

        const barFill = document.querySelector(`[data-template="bar-${i}"]`);
        if (barFill) {
            barFill.style.width = `${percentage}%`;
        }
    }
}

export function sortReviews(reviews, criteria) {
    const sorted = [...reviews];

    switch (criteria) {
        case 'newest':
            return sorted.sort((a, b) => new Date(b['created-at']) - new Date(a['created-at']));
        case 'oldest':
            return sorted.sort((a, b) => new Date(a['created-at']) - new Date(b['created-at']));
        default:
            return sorted;
    }
}

export function initFilters(callback) {
    const buttons = document.querySelectorAll('.restaurant-reviews-page__filters__button');

    buttons.forEach(btn => {
        btn.onclick = () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            callback();
        };
    });
}