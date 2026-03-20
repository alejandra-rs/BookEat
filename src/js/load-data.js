import {loadTemplate} from "./load-template.js";
import {filters} from "./filters.js"

export const typeActions = {
    'text': (element, value) => {
        if (element.tagName === 'DATA') element.setAttribute('value', value);
        element.textContent = value;
    },
    'input': (element, value) => element.value = value || "",
    'src': (element, value) => element.src = value ? value : "../../assets/img/restaurant-item.png",
    'href': (element, value) => element.href = `${element.getAttribute('href')}?id=${value}`,
    'width': (element, value) => element.style.width = value + '%',
    'list': async (element, value) => await fillTemplate(element, value),
    'carousel': async (element, value) => await fillCarousel(element, value)
}


export async function fillPage(pageContainer, data) {
    let activeData = data;

    if (pageContainer.nodeType === Node.ELEMENT_NODE) activeData = await setContext(pageContainer, data);

    const currentContextContainer = pageContainer.nodeType === Node.ELEMENT_NODE
                                             ? pageContainer.closest('[data-context]')
                                             : null;

    let elements = pageContainer.querySelectorAll('[data-template]');
    //TODO promiseAll
    for (const element of elements) await injectData(element, currentContextContainer, activeData);

    //TODO promiseAll cuidado que es recursivo
    let nestedContexts = pageContainer.querySelectorAll('[data-context]');
    for (const nested of nestedContexts) {
        const parentContext = nested.parentElement ? nested.parentElement.closest('[data-context]') : null;
        if (parentContext === currentContextContainer) await fillPage(nested, activeData);
    }
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
        const firstElement = clone.firstElementChild;
        await fillPage(firstElement || clone, item);
        itemsContainer.appendChild(clone);
    }
}


export async function fillCarousel(container, images) {
    const template = container.querySelector('template');
    if (!template) return;

    const itemsContainer = template.parentElement;
    for (const imageUrl of images) {
        const clone = template.content.cloneNode(true);
        const imgElement = clone.querySelector('img');
        imgElement.src = imageUrl;
        itemsContainer.appendChild(clone);
    }
}


async function setContext(pageContainer, data) {
    const context = pageContainer.getAttribute('data-context');
    const relatedIdKey = pageContainer.getAttribute('related');

    if (context && relatedIdKey && data[relatedIdKey]) {
        try {
            const response = await fetch(`http://localhost:3000/${context}/${data[relatedIdKey]}`);
            if (response.ok) return await response.json();
        } catch (e) {
            console.error("Error cargando relación:", e);
        }
    }
    return data;
}


async function injectData(element, currentContextContainer, data) {
    if (element.closest('[data-context]') !== currentContextContainer) return;
    if (Array.isArray(data)) return;

    const [type, key] = element.getAttribute('data-template').split('-');
    const filter = element.getAttribute('filter');

    if (key !== 'self' && !(key in data)) return;
    let value = (key === 'self') ? data : data[key];

    if (filter) value = await applyFilter(filter, value, element);
    return typeActions[type](element, value);
}


async function applyFilter(filter, value, element) {
    const [func, param] = filter.split('-');
    if (func === "tableMap") return filters[func](value, element)
    else if (param) return filters[func](value, param)
    else return filters[func](value);
}