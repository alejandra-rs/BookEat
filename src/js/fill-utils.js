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

export function fillTotalRating(item, restaurant) {
    let totalVotes = 0, totalScore = 0;
    for (const [star, count] of Object.entries(restaurant.rating)) {
        totalVotes += count;
        totalScore += Number(star) * count;
    }
    const average = totalVotes === 0 ? "0.0" : (totalScore / totalVotes).toFixed(1);

    const scoreNumberEl = item.querySelector('.score__number');
    if (scoreNumberEl) {
        scoreNumberEl.textContent = average;
        scoreNumberEl.setAttribute('value', average);
    }
}

export function fillRating(key, value, context = document) {
    const container = context === document ? context.body : context;
    if (!container) return;
    container.querySelectorAll(`[data-template="${key}"]`).forEach(item => {
        item.textContent = value;
    })

}

export function fillPrice(item, restaurant) {
    const priceEl = item.querySelector('.restaurant-item__content__info__price');
    if (!priceEl) return;

    if (restaurant.menu?.length > 0) {
        let minPrice = Infinity, maxPrice = 0, hasPrice = false;

        restaurant.menu.forEach(section => {
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