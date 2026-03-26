import {post} from "../../js/api-json.js";
import {get} from "../../js/api-json.js";

async function setConfirmation(confirmationDialog, bookingPayload) {
    let [restaurant] =  await Promise.all([
        get('restaurants', bookingPayload.restaurantId)
    ])
    confirmationDialog.querySelector("#booking-confirmation-popup__title").innerText = `Booking Confirmed at\n${restaurant[0].name}`;
    confirmationDialog.querySelector("#reservation-details__content__info__address span").innerText = restaurant[0].address;
    const timeElement = confirmationDialog.querySelector("#reservation-details__content__info__datetime time");
    timeElement.innerText = bookingPayload.datetime;
    timeElement.setAttribute('datetime', bookingPayload.datetime);
}

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
                await setConfirmation(confirmationDialog, bookingPayload);
                confirmationDialog.showModal();
            }

        } catch (e) {
            console.error("Error posting booking:", e);
        }
    });
});