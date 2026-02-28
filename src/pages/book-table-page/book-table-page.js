document.addEventListener('click', event => {

    const text = document.getElementById('hour-table-txt');
    const map = document.getElementById('hour-table-map');
    const bookButton = document.getElementById('book-selected');

    const hourButton = event.target.closest('.hour-table > button');
    if (hourButton) {
        if (text) text.style.display = 'none';
        if (map) map.style.display = 'flex';
    }

    const tableClicked = event.target.closest('.table-item__map__table');
    if (tableClicked) {
        setTimeout(() => {
            const currentSelected = window.selectedTables;
            if (currentSelected && currentSelected.size > 0) bookButton.style.display = 'block';
            else bookButton.style.display = 'none';
        }, 50);
    }
});