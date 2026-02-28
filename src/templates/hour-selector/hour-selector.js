const hoursList = [
    "9:00 - 9:30",
    "9:30 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:00",
    "11:00 - 11:30",
    "11:30 - 12:00",
    "12:00 - 12:30",
    "12:30 - 13:00",
    "13:00 - 13:30",
    "13:30 - 14:00",
    "14:00 - 14:30",
    "14:30 - 15:00",
    "15:00 - 15:30",
    "15:30 - 16:00",
    "16:00 - 16:30"
];

const dropdownContainer = document.querySelector('.hour-selector__dropdown');

dropdownContainer.innerHTML = '';
hoursList.forEach(hour => {
    const buttonHTML = `<button class="hour-button secondary-button">${hour}</button>`;
    dropdownContainer.innerHTML += buttonHTML;
});


document.querySelector('.hour-selector__placeholder')
    .addEventListener('click', () => {
        dropdownContainer.classList.toggle('open');
    })


document.querySelector('.hour-selector__dropdown').addEventListener('click', (event) => {

    const button = event.target.closest('.hour-button');

    if (button) {
        document.querySelector('.hour-selector__placeholder').innerText = button.innerText;
        document.querySelector('.hour-selector__dropdown').classList.remove('open');
    }
});