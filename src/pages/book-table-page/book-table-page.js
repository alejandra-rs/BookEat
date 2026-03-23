import {post} from "../../js/api-json.js";

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
        const startTime = state.time.split(' - ')[0];

        const bookingPayload = {
            restaurantId: restaurantId,
            userId: String(userId),
            datetime: `${state.date} ${startTime}`,
            guests: state.diners,
            tables: selectedTableIds,
            status: "incoming"
        };

        try {
            const response = await post(bookingPayload, "bookings");

            if (response.ok) {
                // TODO: booking popup confirmation + something went wrong
                sessionStorage.removeItem('pendingBooking');
            }

        } catch (e) {
            console.error("Error posting booking:", e);
        }
    });
});