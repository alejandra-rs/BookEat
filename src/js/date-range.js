const calendarRangeButton = document.getElementById('calendar-range-button');
const input = document.getElementById('calendar-range-input');

function adjustWidth() {
    if(input.value.length > 0) {
        input.size = input.value.length - 4;
    }else {
        input.size = input.placeholder.length - 5;
    }
}

const fromPicker = flatpickr('#calendar-range-input', {
    dateFormat: 'd.m.Y',
    clickOutside: false,
    mode: "range",
    onReady: adjustWidth,
    onChange: adjustWidth,
    onClose(selectedDates) {
        switch (selectedDates.length) {
            case 1:
                fromPicker.setDate([selectedDates[0], selectedDates[0]]);
                adjustWidth();
                break;
            case 0:
                fromPicker.clear();
                adjustWidth();
                break;
        }
    },
});

document.addEventListener('DOMContentLoaded', () => {
    calendarRangeButton.addEventListener('click', () => fromPicker.open());
})
