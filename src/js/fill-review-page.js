import { fillText, fillImage, fillTotalRating } from "../../src/js/fill-utils.js";
import { fillReview } from "../../src/js/fill-review.js";
import { fillMenu } from "../../src/js/fill-menu.js";

const state = {
    currentPage: 1,
    reviewsPerPage: 5,
    allReviews: [],
    filteredReviews: [],
    users: []
};

export async function fillReviewsPage() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) return;

    const [res, rev, users] = await Promise.all([
        fetch('../../../data/restaurants.json').then(r => r.json()),
        fetch('../../../data/reviews.json').then(r => r.json()),
        fetch('../../../data/users.json').then(r => r.json())
    ]);

    const restaurant = res.find(r => r.id === Number(id));
    if (!restaurant) return;

    const infoContainer = document.querySelector('.restaurant-reviews-page__main');
    if (infoContainer) {
        fillText('restaurant-name', restaurant.name, infoContainer);
        fillImage('image', restaurant.images, infoContainer);
        fillImage('carousel', restaurant.gallery, infoContainer);
        fillText('description', restaurant.description, infoContainer, true);
        fillTotalRating('user-score', restaurant.rating, infoContainer);
    }

    state.allReviews = rev.filter(r => r['restaurantId'] === Number(id));
    state.users = users;

    fillSummaryBreakdown(restaurant.rating);
    await fillMenu(restaurant.menu);

    document.getElementById('sort-reviews').onchange = applyFiltersAndSort;
    initFilters(applyFiltersAndSort);

    document.getElementById('prev-page').onclick = () => changePage(-1);
    document.getElementById('next-page').onclick = () => changePage(1);

    applyFiltersAndSort();
}

const applyFiltersAndSort = () => {
    const activeBtn = document.querySelector('.restaurant-reviews-page__filters__button.active');
    const rating = activeBtn?.dataset.rating;
    const onlyPhotos = activeBtn?.dataset.photos === 'true';
    const sortCriteria = document.getElementById('sort-reviews').value;

    state.filteredReviews = state.allReviews.filter(r => {
        const matchRating = !rating || rating === 'all' || r.rating === Number(rating);
        const matchPhotos = !onlyPhotos || (r.images?.length > 0);
        return matchRating && matchPhotos;
    });

    state.filteredReviews.sort((a, b) => {
        const dateA = new Date(a['created-at']), dateB = new Date(b['created-at']);
        return sortCriteria === 'newest' ? dateB - dateA : dateA - dateB;
    });

    state.currentPage = 1;
    updateUI();
};

const updateUI = async () => {
    const { currentPage, reviewsPerPage, filteredReviews, users } = state;
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

    const start = (currentPage - 1) * reviewsPerPage;
    await fillReview(filteredReviews.slice(start, start + reviewsPerPage), users);

    renderPageNumbers(totalPages);
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages || totalPages === 0;
};

const changePage = (offset) => {
    state.currentPage += offset;
    updateUI();
    window.scrollTo(0, 500);
};

const renderPageNumbers = (total) => {
    const container = document.getElementById('page-numbers');
    container.innerHTML = '';

    for (let i = 1; i <= total; i++) {
        if (i <= 5 || i === total || Math.abs(state.currentPage - i) <= 1) {
            const span = document.createElement('span');
            span.textContent = i;
            span.className = `page-item ${i === state.currentPage ? 'active' : ''}`;
            span.onclick = () => { state.currentPage = i; updateUI(); window.scrollTo(0, 500); };
            container.appendChild(span);
        } else if (container.lastChild?.textContent !== '...') {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.className = 'page-item dots';
            container.appendChild(dots);
        }
    }
};

function fillSummaryBreakdown(ratings) {
    const total = Object.values(ratings).reduce((a, b) => a + b, 0);
    document.querySelector('.restaurant-reviews-page__summary__mean__info').textContent = `${total} reviews`;

    Object.entries(ratings).forEach(([star, count]) => {
        const percentage = (count / total) * 100;
        document.querySelector(`[data-template="count-${star}"]`).textContent = count;
        document.querySelector(`[data-template="bar-${star}"]`).style.width = `${percentage}%`;
    });
}

function initFilters(callback) {
    document.querySelectorAll('.restaurant-reviews-page__filters__button').forEach(btn => {
        btn.onclick = (e) => {
            document.querySelector('.restaurant-reviews-page__filters__button.active').classList.remove('active');
            e.currentTarget.classList.add('active');
            callback();
        };
    });
}