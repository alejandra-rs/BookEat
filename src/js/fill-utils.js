export function fillText(key, val, tag, isHTML = false) {
    const container = document.querySelector(`.${tag}`);
    if (!container) return;
    container.querySelectorAll(`[data-template="${key}"]`).forEach(item => {
        if (isHTML) {
            item.innerHTML = val;
        } else {
            item.textContent = val;
        }
    });
}

export function fillImage(src, dataTemplate) {
    const elements = document.querySelectorAll(`[data-template="${dataTemplate}"]`);
    elements.forEach(element => {
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