function initCarousel() {

    const container = document.querySelector('.restaurant-carousel');
    const carousel = document.querySelector('.restaurant-carousel__carousel');

    let isHovering = false;
    let prevX = 0;
    let currentTranslate = 0;
    let velocity = 0;
    let animationFrame;

    container.addEventListener('mouseenter', (e) => {
        isHovering = true;
        prevX = e.pageX;
        cancelAnimationFrame(animationFrame);
    });

container.addEventListener('mousemove', (e) => {
    if (!isHovering) return;
    const deltaX = e.pageX - prevX;
    currentTranslate += deltaX * 1.5;
    carousel.style.transform = `translateX(${currentTranslate}px)`;
    velocity = deltaX;
    prevX = e.pageX;
});

container.addEventListener('mouseup', () => {
    isHovering = false;
    applyInertia();
});

    function applyInertia() {
        const friction = 0.95; // Factor de desaceleración

        function animate() {
            velocity *= friction;
            currentTranslate += velocity;
            carousel.style.transform = `translateX(${currentTranslate}px)`;

            if (Math.abs(velocity) > 0.1) {
                animationFrame = requestAnimationFrame(animate);
            }
        }

        if (Math.abs(velocity) > 0.1) {
            animationFrame = requestAnimationFrame(animate);
        }
    }

    function clampScroll() {
        const maxScroll = 0;
        const minScroll = -(carousel.scrollWidth - container.clientWidth);
        if (currentTranslate > maxScroll) {
            currentTranslate = maxScroll;
            velocity = 0;
        }
        if (currentTranslate < minScroll) {
            currentTranslate = minScroll;
            velocity = 0;
        }
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    }
    container.addEventListener('mousemove', clampScroll);
    container.addEventListener('mouseleave', clampScroll);
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);

} else {
    initCarousel();
}
