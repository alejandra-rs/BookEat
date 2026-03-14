import {fillText, fillImage} from "../../src/js/fill-utils.js";

export async function fillRestaurantInfo() {
    try {
        const index = new URLSearchParams(window.location.search).get('id') ?? 0;
        const response = await fetch('../../../data/restaurants.json');
        const restaurants = await response.json();
        const restaurant = restaurants[index - 1];
        if (!restaurant) return;
        const ratings = restaurant.rating;
        const totalVotes = Object.values(ratings).reduce((a, b) => a + b, 0);
        const weightedSum = Object.entries(ratings).reduce(
            (sum, [starts,count]) =>sum + Number(starts) * count, 0);
        const avg = totalVotes > 0 ?(weightedSum/totalVotes).toFixed(1) : '-' ;


            if (restaurant.images) {
                fillImage(restaurant.images, 'image');
            }
            fillText('restaurant-name', restaurant.name, 'restaurant-info');
            fillText('description', restaurant.description, 'restaurant-info', true);
            fillText('user-score', avg, 'restaurant-info');
            fillImage(restaurant.gallery ?? [restaurant.images], 'carousel'); // contenedor
    }catch (error){
        console.error("Error al rellenar el restaurante:", error);
    }

}