import { fillText, fillImage, fillTotalRating } from "../../src/js/fill-utils.js";
import { fillReview } from "../../src/js/fill-review.js";
import { fillMenu } from "../../src/js/fill-menu.js";

export async function fillRestaurantInfo() {
    try {
        const index = new URLSearchParams(window.location.search).get('id') ?? 0;
        const [resResp, revResp, userResp] = await Promise.all([
            fetch('../../../data/restaurants.json'),
            fetch('../../../data/reviews.json'),
            fetch('../../../data/user-profiles.json')
        ]);
        const restaurants = await resResp.json();
        const restaurant = restaurants[index - 1];
        if (!restaurant) return;
        const container = document.querySelector('.restaurant-info');

        fillImage('image', restaurant.images, container);
        fillText('restaurant-name', restaurant.name, container);
        fillText('description', restaurant.description, container, true);
        fillTotalRating('user-score', restaurant.rating, container);
        fillImage('carousel', restaurant.gallery ?? [restaurant.images]);

        const allReviews = await revResp.json();
        const restaurantReviews = allReviews.filter(r => r['restaurant-id'] === restaurant.id);
        const previewReviews = restaurantReviews.slice(0, 3);
        const userIdsInRestaurant = new Set(previewReviews.map(r => r['user-id']));

        const allUsers = await userResp.json();
        const userReviews = allUsers.filter(user => userIdsInRestaurant.has(user.id));
        fillReview(previewReviews, userReviews);
        await fillMenu(restaurant.menu)

        const readMoreBtn = document.querySelector('.restaurant-info-page__main__read-more a');
        if (readMoreBtn) {
            readMoreBtn.href = `../../pages/restaurant-reviews-page/restaurant-reviews-page.html?id=${restaurant.id}`;
        }

    } catch (error) {
        console.error("Error al rellenar el restaurante:", error);
    }

}