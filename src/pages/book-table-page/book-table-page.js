import {post, get} from "../../js/api-json.js";
import {fillComponent} from "../../js/load-data.js";
import Panzoom from 'https://cdn.jsdelivr.net/npm/@panzoom/panzoom@4.6.0/dist/panzoom.es.js';
import proj4 from 'https://cdn.skypack.dev/proj4';

document.addEventListener('DOMContentLoaded', () => {

    setInterval(() => {
        const bookButton = document.getElementById('book-selected');
        if (!bookButton) return;
        const currentSelected = window.selectedTables;
        if (currentSelected && currentSelected.size > 0) bookButton.style.display = 'block';
        else bookButton.style.display = 'none';
    }, 200);

    document.addEventListener('click', async (event) => {
        const bookBtn = event.target.closest('#book-selected');
        if (!bookBtn) return;

        const session = JSON.parse(sessionStorage.getItem('currentSession') || '{}');
        const userId = session.id || "";

        if (!userId) return;

        const state = JSON.parse(sessionStorage.getItem('pendingBooking') || '{}');
        const urlParams = new URLSearchParams(window.location.search);
        const restaurantId = urlParams.get('id');

        const selectedTableIds = Array.from(window.selectedTables);

        const bookingPayload = {
            restaurantId: restaurantId,
            userId: String(userId),
            datetime: `${state.date} ${state.time}`,
            guests: state.diners,
            tables: selectedTableIds,
            status: "incoming"
        };

        try {
            const response = await post(bookingPayload, "bookings");

            if (response.ok) {
                sessionStorage.removeItem('pendingBooking');
                const confirmationDialog = document.querySelector('#booking-confirmation-container dialog');
                await fillComponent(confirmationDialog, getPopupData(bookingPayload.datetime, bookingPayload.restaurantId));
                confirmationDialog.showModal();
            }

        } catch (e) {
            console.error("Error posting booking:", e);
        }
    });

    setTimeout(() => {
        const mapElement = document.getElementById('hour-table-map');

        if (mapElement) {
            const panzoom = Panzoom(mapElement, {
                maxScale: 5,
                minScale: 0.75,
                startScale: 0.75,
                step: 0.3,
                contain: 'false'
            });

            mapElement.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);

            const zoomInBtn = document.getElementById('zoom-in');
            const zoomOutBtn = document.getElementById('zoom-out');
            const resetBtn = document.getElementById('zoom-reset');

            zoomInBtn.addEventListener('click', () => panzoom.zoomIn());
            zoomOutBtn.addEventListener('click', () => panzoom.zoomOut());
            resetBtn.addEventListener('click', () => {
                panzoom.reset();
                panzoom.zoom(0.75);
                panzoom.pan(0, 0);
            });

            mapElement.addEventListener('pointerdown', (e) => {
                if (e.target.closest('.table-item__map__table')) {
                    e.stopPropagation();
                }
            });
        }
    }, 500);
});

async function getPopupData(datetime, restaurantId) {
    const restaurant = await get(`restaurants?id=${restaurantId}`);

    return {
        datetime: datetime,
        restaurantName: restaurant[0].name,
        address: restaurant[0].address,
        map: getMapLinkFrom(restaurant[0].coordinates)
    }
}

function getMapLinkFrom(coordinates) {
    const utm30N = "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs";
    const wgs84 = "+proj=longlat +datum=WGS84 +no_defs";

    const projection = proj4(utm30N, wgs84);
    const [lon, lat] = projection.forward(coordinates);

    const offset = 0.005;
    const bbox = `${lon - offset}%2C${lat - offset}%2C${lon + offset}%2C${lat + offset}`;

    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
}
