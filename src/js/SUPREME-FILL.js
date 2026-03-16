import { loadTemplate } from "./load-template.js";

export function fillPage(pageContainer, data) {

    let elements = pageContainer.querySelectorAll('[data-template]');
    if (elements.length === 0) return;

    elements.forEach(el => {
        const [type, key, filter] = el.getAttribute('data-template').split('-');
        let value = data[key];
        if (filter === 'avg') value = average(value);
        if (type === 'text') {
            if (el.tagName === 'DATA') el.setAttribute('value', value);
            el.textContent = value;
        }
        if (type === 'src') el.src = value;
        if (type === 'href') el.href = `${el.getAttribute('href')}?id=${value}`;
        fillTemplate(el, value);
    })

}

export async function fillTemplate(container, items) {
    const template = container.querySelector('template');
    if (!template) return;

    const itemsContainer = template.parentElement;
    Array.from(itemsContainer.children).forEach(child => {
        if (child.tagName !== 'TEMPLATE') child.remove();
    });

    for (const item of items) {
        const clone = template.content.cloneNode(true);
        await loadTemplate(clone);
        fillPage(clone, item);
        itemsContainer.appendChild(clone);
    }
}

export function average(value) {
    if (!value || typeof value !== 'object') {
        return "0.0";
    }

    const acc = Object.entries(value)
        .reduce((acc, [star, num]) => {
            acc.sum += parseInt(star) * num;
            acc.total += num;
            return acc;
        }, {sum: 0, total: 0});

    return (acc.sum / acc.total).toFixed(1);
}
