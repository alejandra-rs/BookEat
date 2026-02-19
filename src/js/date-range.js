// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
document.addEventListener('DOMContentLoaded', () => {

    const fromButton = document.getElementById('from-button');
    const toButton = document.getElementById('to-button');

    const fromPicker = flatpickr('#from-input', {
        dateFormat: 'd.m.Y',
        clickOutside: false,
        onChange(selectedDates) {
            if (selectedDates[0]) {
                toPicker.set('minDate', selectedDates[0]);
            }
        }
    });

    const toPicker = flatpickr('#to-input', {
        dateFormat: 'd.m.Y',
        clickOutside: false,
        onChange(selectedDates) {
            if (selectedDates[0]) {
                fromPicker.set('maxDate', selectedDates[0]);
            }
        }
    });

    fromButton.addEventListener('click', () => fromPicker.open());
    toButton.addEventListener('click', () => toButton.open());
    console.log("cargando js");
})
