import {post} from "../../js/api-json.js";
import Panzoom from 'https://cdn.jsdelivr.net/npm/@panzoom/panzoom@4.6.0/dist/panzoom.es.js';

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
            if (response.ok) sessionStorage.removeItem('pendingBooking');
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