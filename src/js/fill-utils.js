export function fillText(key, val, context = document, isHTML = false) {
    const container = context === document ? context.body : context;
    if (!container) return;

    container.querySelectorAll(`[data-template="${key}"]`).forEach(item => {
        if (isHTML) {
            item.innerHTML = val;
        } else {
            item.textContent = val;
        }
    });
}
export function fillImage(key,src, context = document) {
    const container = context === document ? context.body : context;
    if (!container) return;

    container.querySelectorAll(`[data-template="${key}"]`).forEach(element => {
       if (!src) return;
        if (element.tagName.toLowerCase() === 'img') {
            element.src = src.startsWith('//') ? `https:${src}` : src;
        } else {
            const images = Array.isArray(src) ? src : [src];
            element.innerHTML = images
                .map(url => {
                    const fullUrl = url.startsWith('//') ? `https:${url}` : url;
                    return `<img src="${fullUrl}" alt="">`;
                })
                .join('');
        }
    });
}

export function fillTotalRating(key, ratings, context = document) {
    const container = context === document ? context.body : context;
    if (!container || !ratings) return;
    const score = calculateRating(ratings);
    container.querySelectorAll(`[data-template="${key}"]`).forEach(item => {
        item.textContent = score;
        item.setAttribute('value', score);
    })

}

export function fillRating(key, value, context = document) {
    const container = context === document ? context.body : context;
    if (!container) return;
    container.querySelectorAll(`[data-template="${key}"]`).forEach(item => {
        item.textContent = value;
        item.setAttribute('value', value);
    })
}

export function calculateRating(ratings){
    const totalVotes = Object.values(ratings).reduce((a, b) => a + b, 0);
    const weightedSum = Object.entries(ratings).reduce(
        (sum, [starts,count]) =>sum + Number(starts) * count, 0);
    return totalVotes > 0 ?(weightedSum/totalVotes).toFixed(1) : '-' ;
}

export function fillPrice(container, data) {
    const priceEl = container.querySelector('.restaurant-item__content__info__price');
    if (!priceEl) return;

    if (data.menu?.length > 0) {
        let minPrice = Infinity, maxPrice = 0, hasPrice = false;

        data.menu.forEach(section => {
            section.items.forEach(dish => {
                if (dish.price != null) {
                    if (dish.price < minPrice) minPrice = dish.price;
                    if (dish.price > maxPrice) maxPrice = dish.price;
                    hasPrice = true;
                }
            });
        });

        priceEl.textContent = hasPrice
            ? `${formatPrice(minPrice)}€ - ${formatPrice(maxPrice)}€`
            : 'Price not available';
    } else {
        priceEl.textContent = 'Price not available';
    }
}

export function formatPrice(price) {
    return Number.isInteger(price) ? price : price.toFixed(2);
}