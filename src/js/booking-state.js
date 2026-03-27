export function initBookingState() {
    document.addEventListener('click', () => setTimeout(saveBookingState, 100));
    setTimeout(restoreBookingState, 300);
}


function saveBookingState() {
    if (document.querySelector('.booking-details-page') ||
        document.querySelector('.book-table-page')) return;

    const rawDate = document.querySelector('.date-picker__input')?.value;
    let formattedDate;

    if (rawDate && rawDate.includes('/')) {
        const [d, m, y] = rawDate.split('/');
        formattedDate = `${y}-${m}-${d}`;
    } else formattedDate = `${rawDate}`;

    const state = {
        date: formattedDate,
        time: document.querySelector('.hour-selector__placeholder span')?.textContent || "",
        diners: document.querySelector('#number')?.textContent || "1"
    };
    sessionStorage.setItem('pendingBooking', JSON.stringify(state));
}


function restoreBookingState() {
    const state = JSON.parse(sessionStorage.getItem('pendingBooking') || '{}');

    if (state.diners) document.querySelectorAll('#number').forEach(el => el.textContent = state.diners);
    if (state.time && state.time !== "Time") document.querySelectorAll('.hour-selector__placeholder span').forEach(el => el.textContent = state.time);
    if (state.date) {
        document.querySelectorAll('.date-picker__input').forEach(el => {
            const [y, m, d] = state.date.split('-');
            el.value = `${d}/${m}/${y}`;
        });
    }
}