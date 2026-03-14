import {loadTemplate} from "../../src/js/load-template.js";
import {fillText, fillImage, fillPrice, fillTotalRating} from "../../src/js/fill-utils.js";

export async function fillRestaurantItems() {
    try {
        const response = await fetch('../../../data/restaurants.json');
        const restaurants = await response.json();

        const latest   = [...restaurants].sort((a, b) => a.id - b.id).slice(0, 10);
        const popular = [...restaurants]
            .filter(r => {
                const totalVotes = Object.values(r.rating).reduce((sum, v) => sum + v, 0);
                const totalScore = Object.entries(r.rating).reduce((sum, [star, count]) => sum + Number(star) * count, 0);
                const average = totalVotes === 0 ? 0 : totalScore / totalVotes;
                return average > 4;
            })
            .slice(0);
        const featured = [...restaurants].sort(() => Math.random() - 0.5).slice(0, 10);

        const sections = [
            { el: document.querySelector('.carousel--lastest .restaurant-carousel__carousel'),  data: latest,   title: 'Latest' },
            { el: document.querySelector('.carousel--popular .restaurant-carousel__carousel'),  data: popular,  title: 'Popular' },
            { el: document.querySelector('.carousel--featured .restaurant-carousel__carousel'), data: featured, title: 'Featured' }
        ];
        const templateResponse = await fetch('../../templates/restaurant-item/restaurant-item.html');
        const itemHTML = await templateResponse.text();

        for (const section of sections) {
            if (section.el) {
                await fillCarousel(section.el, section.data, section.title, itemHTML);
            }
        }

    } catch (e) {
        console.error(e);
    }
}

async function fillCarousel(carouselSection, restaurants, title) {
    if (!carouselSection) return;

    const h1 = carouselSection.closest('.restaurant-carousel')?.querySelector('h1');
    if (h1) h1.textContent = title.charAt(0).toUpperCase() + title.slice(1);

    const response = await fetch('../../templates/restaurant-item/restaurant-item.html');
    const itemHTML = await response.text();

    const scoreResponse = await fetch('../../templates/user-score/user-score.html');
    const scoreHTML = await scoreResponse.text();

    const fragment = document.createDocumentFragment();
    for (const restaurant of restaurants) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('restaurant-carousel__carousel__item');
        wrapper.innerHTML = itemHTML;

        carouselSection.appendChild(wrapper);

        const item = wrapper.querySelector('.restaurant-item');
        if (!item) continue;

        const scorePlaceholder = item.querySelector('[load-template="user-score"]');
        if (scorePlaceholder) {
            scorePlaceholder.innerHTML = scoreHTML;
        }

        fillItem(item, restaurant);
        fragment.appendChild(wrapper);
    }
    carouselSection.innerHTML = '';
    carouselSection.appendChild(fragment);
}

function fillItem(container, data) {
    fillLink(container, data);
    fillText('name', data.name, container);
    fillImage('image',data.images, container);
    fillTotalRating('user-score', data.rating, container);
    fillPrice(container, data);
}

function fillLink(item, restaurant) {
    item.href = `../../pages/restaurant-info-page/restaurant-info-page.html?id=${restaurant.id}`;
}

