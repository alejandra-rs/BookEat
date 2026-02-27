const hoursList = [
    {hour:"09:00 - 09:30", status:"occupied"},
    {hour:"09:30 - 10:00", status:"free"},
    {hour:"10:00 - 10:30", status:"occupied"},
    {hour:"10:30 - 11:00", status:"free"},
    {hour:"11:00 - 11:30", status:"free"},
    {hour:"11:30 - 12:00", status:"occupied"},
    {hour:"12:00 - 12:30", status:"occupied"},
    {hour:"12:30 - 13:00", status:"free"},
    {hour:"13:00 - 13:30", status:"occupied"},
    {hour:"13:30 - 14:00", status:"free"},
    {hour:"14:00 - 14:30", status:"free"},
    {hour:"14:30 - 15:00", status:"free"},
    {hour:"15:00 - 15:30", status:"free"},
    {hour:"15:30 - 16:00", status:"free"},
    {hour:"16:00 - 16:30", status:"free"},
];

const dropdownContainer = document.querySelector('.hour-table');


hoursList.forEach(item => {
    const buttonHTML = `<button class="hour-table secondary-button ${item.status}">${item.hour}</button>`;
    dropdownContainer.innerHTML += buttonHTML;
});

document.querySelector('.hour-table').addEventListener('click', (event) => {
    const button = event.target.closest('.hour-table');

    if (button && !button.classList.contains('occupied')) {
        const active = dropdownContainer.querySelector('.hour-table.selected');
        if (active) active.classList.remove('selected');
        button.classList.add('selected');
    }
});


