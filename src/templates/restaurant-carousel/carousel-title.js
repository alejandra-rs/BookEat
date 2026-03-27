export function setCarouselTitles() {
    document.querySelectorAll('.carousel').forEach(container => {
        const title = container.getAttribute('data-title');
        const titleContainer = container.querySelector('.restaurant-carousel__title');

        if (titleContainer) titleContainer.textContent = title;

    });
}