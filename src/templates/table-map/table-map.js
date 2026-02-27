const tables = [
    { id: 1,  seats: 4, shape: 'round',status: 'free' },
    { id: 2,  seats: 4, shape: 'square', status: 'free' },
    { id: 3,  seats: 4, shape: 'square', status: 'free' },
    { id: 4,  seats: 4, shape: 'round', status: 'occupied' },
    { id: 5,  seats: 4, shape: 'round', status: 'free' },
    { id: 6,  seats: 4, shape: 'square', status: 'free' },
    { id: 7,  seats: 4, shape: 'square', status: 'occupied' },
    { id: 8,  seats: 4, shape: 'square', status: 'free' },
    { id: 9,  seats: 3, shape: 'square', status: 'free' },
    { id: 10, seats: 3, shape: 'round', status: 'occupied' },
    { id: 11, seats: 3, shape: 'square', status: 'occupied' },
    { id: 12, seats: 8, shape: 'round', status: 'occupied' },
];

const floor = document.getElementById('floor');
const selected = new Set();

tables.forEach((table) => {
    const item = document.createElement('div');
    item.className = `table-item__map__table ${table.status}`;

    const shape = document.createElement('div');
    shape.className = `table-map__map__table__shape table-map__map__table__shape-${table.shape}${table.status === 'occupied' ? ' occupied' : ''}`;
    shape.textContent = table.seats;
    item.appendChild(shape);

    item.addEventListener('click', () => {
        if (table.status !== 'occupied') {
            selected.has(table.id) ? selected.delete(table.id) : selected.add(table.id);
            item.classList.toggle('selected', selected.has(table.id));
        }
    });

    floor.appendChild(item);
});

window.selectedTables = selected;