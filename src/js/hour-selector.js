const hoursList = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "16:00 - 17:00",
    "17:00 - 18:00"
];
const dropdownContainer = document.querySelector('.hour-dropdown');

dropdownContainer.innerHTML = '';
hoursList.forEach(hour => {
    const buttonHTML = `<button class="hour-button secondary-button">${hour}</button>`;
    dropdownContainer.innerHTML += buttonHTML;
});


document.querySelector('.hour-placeholder')
    .addEventListener('click', () => {
        dropdownContainer.classList.toggle('open');
    })


document.querySelector('.hour-dropdown').addEventListener('click', (event) => {

    const button = event.target.closest('.hour-button');

    if (button) {
        document.querySelector('.placeholder').innerText = button.innerText;
        document.querySelector('.hour-dropdown').classList.remove('open');
    }
});