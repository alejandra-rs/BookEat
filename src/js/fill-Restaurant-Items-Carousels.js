export async function fillRestaurantItems() {
    try {
        const response = await fetch('../../../data/restaurants.json');
        const restaurants = await response.json();

        const items = document.querySelectorAll('.restaurant-item');

        items.forEach((item, index) => {
            const restaurant = restaurants[index % restaurants.length];

            if (restaurant) {
                //mirar si funciona, lo plantee para cuando hagamos click
                item.href = `../../pages/restaurant-info-page/restaurant-info-page.html?id=${restaurant.id}`;

                const titleEl = item.querySelector('.restaurant-item__content__title');
                if (titleEl) titleEl.textContent = restaurant.name;

                const imgEl = item.querySelector('.restaurant-item__image img');
                if (imgEl && restaurant.images) {
                    imgEl.src = restaurant.images.startsWith('//')
                        ? `https:${restaurant.images}`
                        : restaurant.images;
                }

                let totalVotes = 0, totalScore = 0;
                for (const [star, count] of Object.entries(restaurant.rating)) {
                    totalVotes += count;
                    totalScore += Number(star) * count;
                }
                const average = totalVotes === 0 ? "0.0" : (totalScore / totalVotes).toFixed(1);

                const infoContainer = item.querySelector('.restaurant-item__content__info');

                if (infoContainer) {
                    const scoreNumberEl = infoContainer.querySelector('.score__number');

                    if (scoreNumberEl) {
                        scoreNumberEl.textContent = average;
                        scoreNumberEl.setAttribute('value', average);
                    }
                }
                const priceEl = item.querySelector('.restaurant-item__content__info__price');
                if (priceEl) {
                    if (restaurant.menu && restaurant.menu.length > 0  ) {
                        let minPrice = Infinity;
                        let maxPrice = 0;
                        let hasPrice = false;

                        restaurant.menu.forEach(sections => {
                            sections.items.forEach((dish) => {
                                if (dish.price) {
                                    if (dish.price < minPrice) minPrice = dish.price;
                                    if (dish.price > maxPrice) maxPrice = dish.price;
                                    hasPrice = true
                                }
                            })
                        })

                        if (hasPrice) {
                            const minFormat = Math.floor(minPrice) === minPrice ? minPrice : minPrice.toFixed(2);
                            const maxFormat = Math.floor(maxPrice) === maxPrice ? maxPrice : maxPrice.toFixed(2);

                            priceEl.textContent = `${minFormat}€ - ${maxFormat}€`;
                        }else{
                            priceEl.textContent = "Price not available";
                        }
                    }else{
                        priceEl.textContent = "Price not available";
                    }
                }
            }
        });

    } catch (error) {
        console.error("Error al rellenar los carruseles:", error);
    }
}