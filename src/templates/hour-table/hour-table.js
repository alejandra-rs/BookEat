const hoursList = [
    {hour:"09:00 - 10:00", status:"free"},
    {hour:"10:00 - 11:00", status:"free"},
    {hour:"11:00 - 12:00", status:"free"},
    {hour:"12:00 - 13:00", status:"free"},
    {hour:"13:00 - 14:00", status:"occupied"},
    {hour:"14:00 - 15:00", status:"free"},
    {hour:"15:00 - 16:00", status:"free"},
    {hour:"16:00 - 17:00", status:"free"},
    {hour:"17:00 - 18:00", status:"free"},
    {hour:"18:00 - 19:00", status:"free"},
    {hour:"19:00 - 20:00", status:"occupied"},
    {hour:"20:00 - 21:00", status:"free"},
];

const dropdownContainer = document.querySelector('.hour-grid');


hoursList.forEach(item => {
    const buttonHTML = `<button class="hour-grid secondary-button ${item.status}">${item.hour}</button>`;
    dropdownContainer.innerHTML += buttonHTML;
});

document.querySelector('.hour-grid').addEventListener('click', (event) => {
    const button = event.target.closest('.hour-grid');

    if (button && !button.classList.contains('occupied')) {
        const active = dropdownContainer.querySelector('.hour-grid.selected');
        if (active) active.classList.remove('selected');
        button.classList.add('selected');

        const text = document.getElementById("hour-table-txt");
        if (text) text.style.display = 'none';
    }
});


