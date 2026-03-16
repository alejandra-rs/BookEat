import {calculateRating, fillImage, fillPrice, fillText, fillTotalRating} from "../../src/js/fill-utils.js";

export async function fillRestaurantItems() {
    try {
        const restaurants = await (await fetch('../../../data/restaurants.json')).json();
        const itemHTML = await (await fetch('../../templates/restaurant-item/restaurant-item.html')).text();

        const sections = await Promise.all([
            getLatestRestaurants(restaurants).then(data => ({
                el: document.querySelector('.carousel--lastest .restaurant-carousel__carousel'),
                data: data,
                title: 'Latest'
            })),

            getPopularRestaurants(restaurants).then(data => ({
                el: document.querySelector('.carousel--popular .restaurant-carousel__carousel'),
                data: data,
                title: 'Popular'
            })),

            getFeaturedRestaurants(restaurants).then(data => ({
                el: document.querySelector('.carousel--featured .restaurant-carousel__carousel'),
                data: data,
                title: 'Featured'
            }))
        ]);
        await Promise.all(sections.map(section => fillCarousel(section, itemHTML))
        )

    } catch (e) {
        console.error(e);
    }
}

async function fillCarousel(carouselSection, html) {
    if (!carouselSection.el) return;
    const scoreHTML = await (await fetch('../../templates/user-score/user-score.html')).text();
    carouselSection.el.closest('.restaurant-carousel').querySelector('h1').textContent = carouselSection.title

    const fragment = document.createDocumentFragment();
    for (const restaurant of carouselSection.data) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('restaurant-carousel__carousel__item');
        wrapper.innerHTML = html;

        carouselSection.el.appendChild(wrapper);

        const item = wrapper.querySelector('.restaurant-item');
        if (!item) continue;

        const scorePlaceholder = item.querySelector('[load-template="user-score"]');
        if (scorePlaceholder) {
            scorePlaceholder.innerHTML = scoreHTML;
        }

        fillItem(item, restaurant);
        fragment.appendChild(wrapper);
    }
    carouselSection.el.innerHTML = '';
    carouselSection.el.appendChild(fragment);
}

function fillItem(container, data) {
    fillLink(container, data);
    fillText('name', data.name, container);
    fillImage('image',data.images, container);
    fillTotalRating('user-score', data.rating, container);
    fillPrice(container, data);
}


async function getLatestRestaurants(data) {
    return [...data].sort((a, b) => a.id - b.id).slice(0, 10);
}

async function getPopularRestaurants(data) {
    return [...data]
        .filter(r => calculateRating(r.rating) > 4)
        .sort((a, b) => calculateRating(b.rating) - calculateRating(a.rating))
        .slice(0, 10);
}

async function getFeaturedRestaurants(data) {
    return [...data].sort(() => Math.random() - 0.5).slice(0, 10);
}
function fillLink(item, restaurant) {
    item.href = `../../pages/restaurant-info-page/restaurant-info-page.html?id=${restaurant.id}`;
}

