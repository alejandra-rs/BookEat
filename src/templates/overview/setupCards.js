async function setupCards(type) {
    setTimeout(() => {
        const card = document.querySelectorAll('.overview');
        for (const x of card) {
            x.classList.remove('default', 'incoming', 'past', 'restaurant-past', 'restaurant-incoming');
            x.classList.add(type);
        }
    },200)
}