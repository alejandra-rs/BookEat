import {fillText, fillImage, fillRating} from "../../src/js/fill-utils.js";
import {fillReview} from "../../src/js/fill-review.js";

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
        const ratings = restaurant.rating;
        const totalVotes = Object.values(ratings).reduce((a, b) => a + b, 0);
        const weightedSum = Object.entries(ratings).reduce(
            (sum, [starts,count]) =>sum + Number(starts) * count, 0);
        const avg = totalVotes > 0 ?(weightedSum/totalVotes).toFixed(1) : '-' ;
        const container = document.querySelector('.restaurant-info');

        fillImage( 'image', restaurant.images,container);
        fillText('restaurant-name', restaurant.name, container);
        fillText('description', restaurant.description, container, true);
        fillRating('user-score', avg, container);
        fillImage( 'carousel', restaurant.gallery ?? [restaurant.images]);

        const allReviews = await revResp.json();
        const restaurantReviews = allReviews.filter(r => r['restaurant-id'] === restaurant.id);
        const userIdsInRestaurant = new Set(restaurantReviews.map(r => r['user-id']));

        const allUsers = await userResp.json();
        const userReviews = allUsers.filter(user => userIdsInRestaurant.has(user.id));
        fillReview(restaurantReviews, userReviews);
    }catch (error){
        console.error("Error al rellenar el restaurante:", error);
    }

}