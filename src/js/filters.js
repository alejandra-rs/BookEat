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

    if (typeof value === 'string') return parseInt(value);
    const acc = Object.entries(value)
        .reduce((acc, [star, num]) => {
            acc.sum += parseInt(star) * parseInt(num);
            acc.total += parseInt(num);
            return acc;
        }, {sum: 0, total: 0});
    return (acc.sum / acc.total).toFixed(1);
}


export function total(value) {
    return Object.values(value).reduce((acc, val) => acc + parseInt(val), 0);
}


export function reviewProportion(value, star) {
    const total = Object.values(value).reduce((a, b) => Math.max(a, b), 0);
    return total > 0 ? getStarValue(value, star) / total * 100 : 0;
}


export function getStarValue(value, star) {
    return value[star];
}

export async function renderFloorPlan(layout, container) {
    // 1. CLEAN DOM INJECTION
    let canvas = container.querySelector('canvas');
    let floor = container.querySelector('#floor');

    if (!canvas || !floor) {
        container.innerHTML = `
            <canvas id="table-map__canvas"></canvas>
            <div id="floor"></div>
        `;
        canvas = container.querySelector('canvas');
        floor = container.querySelector('#floor');
    }

    // 2. ASPECT RATIO & SCALING
    const maxX = Math.max(...layout.outline.map(p => p.x));
    const maxY = Math.max(...layout.outline.map(p => p.y));

    // Apply the exact aspect ratio dynamically so the map is never warped
    container.style.aspectRatio = `${maxX} / ${maxY}`;

    // Set internal canvas resolution to be high-quality
    const DRAW_SCALE = 100;
    canvas.width = maxX * DRAW_SCALE;
    canvas.height = maxY * DRAW_SCALE;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 15; // Thicker line for better visibility
    ctx.strokeStyle = '#333';
    ctx.moveTo(layout.outline[0].x * DRAW_SCALE, layout.outline[0].y * DRAW_SCALE);
    layout.outline.forEach(p => ctx.lineTo(p.x * DRAW_SCALE, p.y * DRAW_SCALE));
    ctx.closePath();
    ctx.stroke();

    // 3. COLLISION LOGIC
    const state = JSON.parse(sessionStorage.getItem('pendingBooking') || '{}');
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('id');

    let occupiedTableIds = [];

    if (state.date && state.time && state.time.includes(' - ')) {
        try {
            const res = await fetch(`http://localhost:3000/bookings?restaurantId=${restaurantId}`);
            const bookings = await res.json();

            let targetDateStr = state.date;
            if (targetDateStr.includes('/')) {
                const [d, m, y] = targetDateStr.split('/');
                targetDateStr = `${y}-${m}-${d}`;
            }

            bookings.forEach(b => {
                if (b.datetime && b.datetime.includes(targetDateStr)) {
                    const timeMatch = b.datetime.match(/\d{2}:\d{2}/);
                    if (timeMatch) {
                        const [bH, bM] = timeMatch[0].split(':').map(Number);
                        const [sH, sM] = state.time.split(' - ')[0].split(':').map(Number);

                        const diffMins = Math.abs((bH * 60 + bM) - (sH * 60 + sM));
                        if (diffMins < 120 && b.tableIds) {
                            occupiedTableIds.push(...b.tableIds);
                        }
                    }
                }
            });
        } catch (e) {
            console.error("Could not fetch bookings:", e);
        }
    }

    // 4. DRAW TABLES (Relying mostly on CSS now)
    floor.innerHTML = '';
    window.selectedTables = new Set();

    layout.tables.forEach(table => {
        const btn = document.createElement('div');

        const widthVal = Math.abs(table.p2.x - table.p1.x);
        const heightVal = Math.abs(table.p2.y - table.p1.y);
        const minX = Math.min(table.p1.x, table.p2.x);
        const minY = Math.min(table.p1.y, table.p2.y);

        const w = (widthVal / maxX) * 100;
        const h = (heightVal / maxY) * 100;
        const x = (minX / maxX) * 100;
        const y = (minY / maxY) * 100;

        const isOccupied = occupiedTableIds.includes(table.id);

        // Add base class and state class
        btn.className = `table-item__map__table ${isOccupied ? 'occupied' : 'free'}`;

        // Keep positioning inline because it depends on the math
        btn.style.width = `${w}%`;
        btn.style.height = `${h}%`;
        btn.style.left = `${x}%`;
        btn.style.top = `${y}%`;

        if (table.shape === 'round' || table.shape === 'circle') {
            btn.style.borderRadius = '50%';
        } else {
            btn.style.borderRadius = '8px';
        }

        btn.dataset.id = table.id;
        btn.innerHTML = `<span>${table.capacity}</span>`;

        btn.onclick = () => {
            if (!isOccupied) {
                btn.classList.toggle('selected');
                if (btn.classList.contains('selected')) {
                    window.selectedTables.add(table.id);
                } else {
                    window.selectedTables.delete(table.id);
                }
            }
        };

        floor.appendChild(btn);
    });
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