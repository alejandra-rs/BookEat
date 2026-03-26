import {post, get} from "../../js/api-json.js";
import {fillPage} from "../../js/load-data.js";

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

                const datos={datetime: "...", address: "...", map: "..."}
                await fillPage(confirmationDialog, datos);
                confirmationDialog.showModal();
            }




        } catch (e) {
            console.error("Error posting booking:", e);
        }
    });
});