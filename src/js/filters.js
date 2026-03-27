import {get} from "../../src/js/api-json.js";


export const filters = {
    "total": total, "average": averageRating, "percent": reviewProportion, "get": getStarValue,
    "categories": categories,
    "tableMap": renderFloorPlan,
    "random": randomSelection, "best": bestN, "sortDate": sortChronologically,
    "incoming": incomingBookings, "past": pastBookings,
    "reservationName": getReservationName, "reservationImage": getReservationImage
}


export function total(value) {
    return Object.values(value).reduce((acc, val) => acc + parseInt(val), 0);
}

export function averageRating(value) {
    if (typeof value === 'string') return parseInt(value);
    const acc = Object.entries(value)
        .reduce((acc, [star, num]) => {
            acc.sum += parseInt(star) * parseInt(num);
            acc.total += parseInt(num);
            return acc;
        }, {sum: 0, total: 0});
    return (acc.sum / acc.total).toFixed(1);
}

export function reviewProportion(value, star) {
    const total = Object.values(value).reduce((a, b) => Math.max(a, b), 0);
    return total > 0 ? getStarValue(value, star) / total * 100 : 0;
}

export function getStarValue(value, star) {
    return value[star];
}



export async function categories(categoryIds) {
    if (typeof categoryIds[0] !== "number") return categoryIds || [];
    try {
        const queryString = categoryIds.map(id => `id=${id}`).join('&');
        return await get(`categories?${queryString}`);
    } catch (e) {
        console.error("Error fetching category names:", e);
        return [];
    }
}



const DRAW_SCALE = 100;

export async function renderFloorPlan(layout, container) {
    const { canvas, floor } = setupMapContainer(container);
    const { maxX, maxY } = drawRoomOutline(canvas, layout.outline, container);

    const urlParams = new URLSearchParams(window.location.search);
    const occupiedTableIds = await fetchOccupiedTables(urlParams.get('id'),
                                                           JSON.parse(sessionStorage.getItem('pendingBooking')));

    renderTables(floor, layout.tables, { maxX, maxY }, occupiedTableIds);
}

function setupMapContainer(container) {
    let canvas = container.querySelector('canvas'); let floor = container.querySelector('#floor');

    if (!canvas || !floor) {
        container.innerHTML = `
            <canvas id="table-map__canvas"></canvas>
            <div id="floor"></div>
        `;
        canvas = container.querySelector('canvas');
        floor = container.querySelector('#floor');
    }
    return { canvas, floor };
}

function drawRoomOutline(canvas, outline, container) {
    const maxX = Math.max(...outline.map(p => p.x)); const maxY = Math.max(...outline.map(p => p.y));

    container.style.aspectRatio = `${maxX} / ${maxY}`;
    canvas.width = maxX * DRAW_SCALE; canvas.height = maxY * DRAW_SCALE;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 5; ctx.strokeStyle = '#333';

    ctx.moveTo(outline[0].x * DRAW_SCALE, outline[0].y * DRAW_SCALE);
    outline.forEach(p => ctx.lineTo(p.x * DRAW_SCALE, p.y * DRAW_SCALE));
    ctx.closePath();
    ctx.stroke();

    return { maxX, maxY };
}

async function fetchOccupiedTables(restaurantId, state) {
    try {
        const bookings = await get(`bookings?restaurantId=${restaurantId}`);

        const targetDateStr = state.date;

        const [sH, sM] = state.time.split(' - ')[0].split(':').map(Number);
        const sTotalMins = sH * 60 + sM;

        const occupied = [];

        bookings.forEach(b => {
            if (b.datetime && b.datetime.startsWith(targetDateStr)) {
                const timeMatch = b.datetime.split(" ")[1];
                if (timeMatch) {
                    const [bH, bM] = timeMatch.split(':').map(Number);
                    const diffMins = Math.abs((bH * 60 + bM) - sTotalMins);
                    if (diffMins < 120) occupied.push(...b.tables.map(id => String(id)));
                }
            }
        });
        return occupied;
    } catch (e) {
        console.error("Could not fetch bookings:", e);
        return [];
    }
}

function renderTables(floor, tables, { maxX, maxY }, occupiedTableIds) {
    floor.innerHTML = '';
    window.selectedTables = new Set();

    tables.forEach(table => {
        const btn = document.createElement('div');

        const w = (Math.abs(table.p2.x - table.p1.x) / maxX) * 100;
        const h = (Math.abs(table.p2.y - table.p1.y) / maxY) * 100;
        const x = (Math.min(table.p1.x, table.p2.x) / maxX) * 100;
        const y = (Math.min(table.p1.y, table.p2.y) / maxY) * 100;

        const isOccupied = occupiedTableIds.includes(String(table.id));
        const stateClass = isOccupied ? 'occupied' : 'free';
        const shapeClass = `shape-${table.shape}`;

        btn.className = `table-item__map__table ${stateClass} ${shapeClass}`;
        btn.style.width = `${w}%`; btn.style.height = `${h}%`;
        btn.style.left = `${x}%`; btn.style.top = `${y}%`;

        btn.dataset.id = table.id;
        btn.innerHTML = `<span>${table.capacity}</span>`;

        btn.addEventListener('click', () => {
            if (btn.classList.contains('occupied')) return;

            const session = JSON.parse(sessionStorage.getItem('currentSession') || '{}');
            if (!session.id) { document.getElementById("loginButton").click(); return; }

            btn.classList.toggle('selected');
            if (btn.classList.contains('selected'))  window.selectedTables.add(table.id);
            else window.selectedTables.delete(table.id);
        });

        floor.appendChild(btn);
    });
}



export function randomSelection(array, n) {
    return [...array].sort(() => 0.5 - Math.random()).slice(0, n);
}

export function bestN(array, n) {
    return [...array].sort((a, b) => b.rating - a.rating).slice(0, n);
}

export function sortChronologically(array) {
    return [...array].sort((a, b) => b.datetime > a.datetime ? 1 : -1);
}



export async function incomingBookings(array) {
    if (!Array.isArray(array)) return array;
    const now = new Date();

    const filtered = array
        .filter(b => new Date(b.datetime) >= now)
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));


    return await Promise.all(filtered.map(formatBookingData));
}

export async function pastBookings(array) {
    if (!Array.isArray(array)) return array;
    const now = new Date();

    const filtered = array
        .filter(b => new Date(b.datetime) < now)
        .sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

    return await Promise.all(filtered.map(formatBookingData));
}

function formatBookingData(booking) {
    return {
        ...booking,
        description: `Booking for ${booking.guests} guests.`
    };
}



export async function getReservationName(data) {
    if (data.name) return data.name;
    if (data.restaurant) return data.restaurant.name;
    if (data.user) return `${data.user.name} ${data.user.surname || ''}`.trim();
    return "Unknown";
}

export async function getReservationImage(data) {
    if (data.images) return data.images;
    if (data.image) return data.image;
    if (data.restaurant && data.restaurant.images) return data.restaurant.images;
    if (data.user && data.user.image) return data.user.image;
    return data.restaurant ? "../../assets/img/restaurant-item.png" : "../../assets/img/user-image.png";
}