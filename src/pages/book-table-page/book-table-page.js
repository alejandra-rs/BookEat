import {post, get} from "../../js/api-json.js";
import {fillPage} from "../../js/load-data.js";
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

                await fillPage(confirmationDialog, getPopupData(bookingPayload.datetime, bookingPayload.restaurantId));
                confirmationDialog.showModal();
            }

        } catch (e) {
            console.error("Error posting booking:", e);
        }
    });
});

async function getPopupData(datetime, restaurantId) {
    const restaurant = await Promise.any([
        get("restaurants", restaurantId)
    ])
    return {
        datetime: datetime,
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
