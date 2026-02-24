const fromPicker = flatpickr("#date-picker", {
    altInput: true,
    altFormat: "d/m/Y",
    dateFormat: "d/m/Y",
    allowInput: true,
    minDate: "today",
    locale: {"firstDayOfWeek": 1}
});

const input_calendar  = document.getElementById("calendar-icon");
const input_arrow  = document.getElementById("dropdown-arrow");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded");
    input_calendar.addEventListener('click', () => fromPicker.open());
    input_arrow.addEventListener('click', () => fromPicker.open());
})