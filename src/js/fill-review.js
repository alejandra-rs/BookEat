import {fillText, fillImage, fillRating} from "../../src/js/fill-utils.js";
import {find} from "../../src/js/load-template.js";

export async  function fillReview(reviews, userReviews) {
    const section = document.querySelector('.restaurant-reviews-page__reviews')
        || document.querySelector('.restaurant-info-page__main__reviews');

    if (!section) return;

    const [reviewRes, scoreRes] = await Promise.all([
        fetch(find('user-review')),
        fetch(find('user-score'))
    ]);
    const templateHTML = await reviewRes.text();
    const scoreHTML = await scoreRes.text();

    section.innerHTML = '';

    reviews.forEach(review => {
        const user = userReviews.find(u => u.id === review['user-id']);
        const wrapper = document.createElement('article');

        wrapper.setAttribute('data-template', 'user-review');
        wrapper.classList.add('user-review');
        wrapper.innerHTML = templateHTML;
        const scorePlaceholder = wrapper.querySelector('[data-template="user-score"]');
        if (scorePlaceholder) {
            scorePlaceholder.innerHTML = scoreHTML;
            fillRating('user-score', review.rating, scorePlaceholder);
        }
        fillText('user-name-review', `${user.name} ${user.surname}`, wrapper);
        fillText('user-date-review', formatDate(review['created-at']), wrapper);
        fillText('user-description', review.description, wrapper);
        fillText('user-pros-review', `<li>${review.pros}</li>`, wrapper, true);
        fillText('user-cons-review', `<li>${review.cons}</li>`, wrapper, true);

        fillImage('user-profile-review', user['profile-picture'], wrapper);
        fillImage('user-carousel', review.images, wrapper);

        section.appendChild(wrapper);
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}