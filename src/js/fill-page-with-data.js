import {fillComponent, fillTemplate} from "./load-data.js";
import {setupCards} from "../../src/templates/overview/setup-cards.js";
import {get} from "../../src/js/api-json.js";

export async function fillPageWithData() {
    const config = getPageConfiguration();

    const globalData = await fillGlobalData(config);
    const containers = Array.from(document.querySelectorAll("[data-context]"));

    await Promise.all(
        containers.map(container =>  fillContainerWithData(container, globalData, config))
    );
}


function getPageConfiguration() {
    const session = JSON.parse(sessionStorage.getItem('currentSession'));
    const role = session?.rol || "";
    const sessionId = session?.id || "";

    const urlParams = new URLSearchParams(window.location.search);
    let contextId = urlParams.get('id');
    const searchQuery = urlParams.get('q');

    const contextElement = document.querySelector('[data-page-context]');
    let pageContext = contextElement ? contextElement.getAttribute('data-page-context') : null;

    if (pageContext === 'my-profile') {
        pageContext = role === 'user' ? 'users' : 'restaurant-profiles';
        if (!contextId) contextId = sessionId;
    }

    return {role: role, sessionId: sessionId, contextId: contextId, pageContext: pageContext, searchQuery: searchQuery};
}


function buildApiEndpoint(containerContext, relatedContext, configuration) {
    if (relatedContext === 'session') {
        const relationField = configuration.role === 'user' ? 'userId' : 'restaurantId';
        const expandField = configuration.role === 'user' ? 'restaurant' : 'user';
        return `${containerContext}?${relationField}=${configuration.sessionId}&_expand=${expandField}`;
    }

    if (configuration.contextId && relatedContext) return `${containerContext}?${relatedContext}=${configuration.contextId}`;

    if (configuration.searchQuery) return `${containerContext}?q=${configuration.searchQuery}`;

    return containerContext;
}


async function fillGlobalData(config) {
    if (!config.contextId) return;
    try {
        const data = await get(`${config.pageContext}/${config.contextId}`);
        await fillComponent(document.body, data);
        return data;
    } catch (error) {
        console.error("Error cargando datos globales:", error);
    }
}


async function fillContainerWithData(container, globalData, config) {
    const context = container.getAttribute("data-context");
    const related = container.getAttribute("related");

    const data = (globalData && globalData[context])
        ? globalData[context]
        : await get(`${buildApiEndpoint(context, related, config)}`);

    if (data) await fill(container, data);
}


async function fill(container, data) {
    if (Array.isArray(data)) {
        container.__loadedData = data;
        await fillTemplate(container, data);
        if (container.querySelector('.overview')) setupCards(container);
    }
    else await fillComponent(container, data);
}
