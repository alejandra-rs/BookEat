export const filters = {
    total: total,
    average: average,
    tableMap: renderFloorPlan,
    percent: reviewProportion,
    get: getStarValue,
    reservationName: getReservationName,
    reservationImage: getReservationImage
}


export function average(value) {
    if (typeof value === 'number') return parseInt(value);

    const acc = Object.entries(value)
        .reduce((acc, [star, num]) => {
            acc.sum += parseInt(star) * num;
            acc.total += num;
            return acc;
        }, {sum: 0, total: 0});

    return (acc.sum / acc.total).toFixed(1);
}


export function total(value) {
    return Object.values(value).reduce((acc, val) => acc + val, 0);
}


export function reviewProportion(value, star) {
    const total = Object.values(value).reduce((a, b) => Math.max(a, b), 0);
    return total > 0 ? getStarValue(value, star) / total * 100 : 0;
}


export function getStarValue(value, star) {
    return value[star];
}

export function renderFloorPlan(layout, container) {
    const canvas = container.querySelector('#table-map__canvas');
    const ctx = canvas.getContext('2d');
    const floor = container.querySelector('#floor');

    const maxX = Math.max(...layout.outline.map(p => p.x));
    const maxY = Math.max(...layout.outline.map(p => p.y));

    container.style.aspectRatio = `${maxX} / ${maxY}`;

    const DRAW_SCALE = 100;
    canvas.width = maxX * DRAW_SCALE;
    canvas.height = maxY * DRAW_SCALE;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#333';
    ctx.moveTo(layout.outline[0].x * DRAW_SCALE, layout.outline[0].y * DRAW_SCALE);
    layout.outline.forEach(p => ctx.lineTo(p.x * DRAW_SCALE, p.y * DRAW_SCALE));
    ctx.closePath();
    ctx.stroke();

    floor.innerHTML = '';
    layout.tables.forEach(table => {
        const btn = document.createElement('div');

        const w = ((table.p2.x - table.p1.x) / maxX) * 100;
        const h = ((table.p2.y - table.p1.y) / maxY) * 100;
        const x = (table.p1.x / maxX) * 100;
        const y = (table.p1.y / maxY) * 100;

        btn.className = `table-item__map__table shape-${table.shape} ${table.status || 'free'}`;
        btn.style.width = `${w}%`;
        btn.style.height = `${h}%`;
        btn.style.left = `${x}%`;
        btn.style.top = `${y}%`;

        btn.innerHTML = `<span>${table.capacity}</span>`;
        btn.onclick = () => btn.classList.toggle('selected');

        floor.appendChild(btn);
    });
}

const profileCache = {};

async function fetchProfile(endpoint, dataId) {
    if (profileCache[dataId]) return profileCache[dataId];
    try {
        const res = await fetch(`http://localhost:3000/${endpoint}/${dataId}`);
        const profile = await res.json();
        profileCache[dataId] = profile;
        return profile;
    } catch (e) { return null; }
}

export async function getReservationName(data) {
    const role = JSON.parse(sessionStorage.getItem('usuarioActual') || '{}').rol;
    const endpoint = role === 'cliente' ? "restaurants" : "user-profiles";
    const resInfo = await fetchProfile(endpoint, data.id);
    if (!resInfo) return "Loading...";
    return resInfo.name || `${resInfo.name} ${resInfo.surname}`;
}


export async function getReservationImage(data) {
    const role = JSON.parse(sessionStorage.getItem('usuarioActual') || '{}').rol;
    const endpoint = role === 'cliente' ? "restaurants" : "user-profiles";

    const resInfo = await fetchProfile(endpoint, data.id);
    console.log(resInfo);
    if (resInfo?.image) return resInfo.image;
    if (resInfo?.images) return resInfo.images;
    return role === 'cliente' ? "../../assets/img/restaurant-item.png" : "../../assets/img/user-image.png";
}