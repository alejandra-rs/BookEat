import {loadTemplate} from "./load-template.js";
import {filters} from "./filters.js"
import {get} from "../../src/js/api-json.js";


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
    'custom': () => {}
}


export async function fillComponent(container, data) {
    let activeData = data;
    if (container.nodeType === Node.ELEMENT_NODE) activeData = await setContext(container, data);

    const currentContextContainer = container.nodeType === Node.ELEMENT_NODE
                                             ? container.closest('[data-context]')
                                             : null;

    let elements = Array.from(container.querySelectorAll('[data-template]'));
    if (container.nodeType === Node.ELEMENT_NODE && container.hasAttribute('data-template')) {
        elements.push(container);
    }

    await Promise.all(
        elements.map(element => injectData(element, currentContextContainer, activeData))
    );

    let nestedContexts = container.querySelectorAll('[data-context]');
    await Promise.all(
        Array.from(nestedContexts).map(async (nested) => {
            const parentContext = nested.parentElement ? nested.parentElement.closest('[data-context]') : null;
            if (parentContext === currentContextContainer) {
                await fillComponent(nested, activeData);
            }
        })
    );
}


export async function fillTemplate(container, items) {
    const template = container.querySelector('template');
    if (!template) return;

    const itemsContainer = template.parentElement;
    Array.from(itemsContainer.children).forEach(child => {
        if (child.tagName !== 'TEMPLATE') child.remove();
    });

    let activeItems = items;
    const filter = itemsContainer.getAttribute('filter');
    if (filter) activeItems = await applyFilter(filter, items, itemsContainer);

    const clones = await Promise.all(
        activeItems.map(async (item) => {
            const clone = template.content.cloneNode(true);
            await loadTemplate(clone);
            const firstElement = clone.firstElementChild;
            await fillComponent(firstElement || clone, item)
            return clone
        })
    )
    itemsContainer.append(...clones);
}


async function setContext(pageContainer, data) {
    const context = pageContainer.getAttribute('data-context');
    const relatedIdKey = pageContainer.getAttribute('related');

    if (context && relatedIdKey && data[relatedIdKey]) {
        try {
            return await get(`${context}/${data[relatedIdKey]}`);
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

    let value = (key === 'self') ? data : data[key];
    if (filter && key !== 'list') value = await applyFilter(filter, value, element);

    return typeActions[type](element, value);
}


async function applyFilter(filter, value, element) {
    const [func, param] = filter.split('-');
    if (func === "tableMap") return filters[func](value, element)
    else if (param) return filters[func](value, param)
    return filters[func](value);
}