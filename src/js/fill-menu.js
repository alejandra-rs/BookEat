import { fillText, fillImage, fillPrice } from "../../src/js/fill-utils.js";
import {find} from "../../src/js/load-template.js";

export async function fillMenu(menu) {
    if (!menu) return;

    const container = document.querySelector('.menu-popup__container');
    if (!container) return;

    container.innerHTML = '';

    const [sectionRes, itemRes] = await Promise.all([
        fetch(find('menu-section')),
        fetch(find('menu-item'))
    ]);
    const sectionHTML = await sectionRes.text();
    const itemHTML = await itemRes.text();

    for (const sectionData of menu) {
        const sectionContainer = document.createElement('section');
        sectionContainer.classList.add('menu-section');
        sectionContainer.innerHTML = sectionHTML;

        fillText('section-title', sectionData["section-name"], sectionContainer);

        const itemsContainer = sectionContainer.querySelector('.menu-section__items');
        if (itemsContainer) {
            itemsContainer.innerHTML = '';

            for (const plate of sectionData.items) {
                const plateElement = document.createElement('article');
                plateElement.classList.add('menu-item');
                plateElement.innerHTML = itemHTML;

                fillText('menu-item-name', plate.name, plateElement);
                fillText('menu-item-description', plate.description, plateElement);

                if (plate.price) {
                    const priceFormatted = `${plate.price.toFixed(2)}€`;
                    fillText('menu-item-price', priceFormatted, plateElement);
                }

                if(plate.image){
                    fillImage('menu-item-image',plate.image, plateElement);
                }

                itemsContainer.appendChild(plateElement);
            }
        }

        container.appendChild(sectionContainer);
    }
}