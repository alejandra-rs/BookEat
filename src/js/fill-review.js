import {fillText, fillImage, fillRating} from "../../src/js/fill-utils.js";

export function fillReview(reviews, userReviews) {
    const reviewContainers = document.querySelectorAll('[data-template="user-review"]');
    // We only populate as many reviews as there are template slots in the HTML
    reviews.slice(0, reviewContainers.length).forEach((review, index) => {
        const container = reviewContainers[index];
        const user = userReviews.filter(u => u.id === review['user-id'])[0];

        const nameEl = container.querySelector('.user-review__header__metadata');

        fillText('user-name-review',`${user.name} ${user.surname}`, nameEl);
        fillText('user-date-review',formatDate(review['created-at']), nameEl);
        fillText('user-description', review.description, container);

        fillText('user-pros-review', `<li>${review.pros}</li>`, container, true);
        fillText('user-cons-review', `<li>${review.cons}</li>`, container, true);

        const scoreContainer = container.querySelector('[data-template="user-score"]');
        fillRating('user-score', review.rating, scoreContainer);

        const userImage = container.querySelector('.user-review__header__imag');
        fillImage( 'user-profile-review',`${user['profile-picture']}`, container);

        const imageContainer = container.querySelector('.user-review__images');
        fillImage('user-carousel',review.images, imageContainer );
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}