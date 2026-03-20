const hoursList = [
    "9:00 - 9:30", "9:30 - 10:00", "10:00 - 10:30",
    "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00",
    "12:00 - 12:30", "12:30 - 13:00", "13:00 - 13:30",
    "13:30 - 14:00", "14:00 - 14:30", "14:30 - 15:00",
    "15:00 - 15:30", "15:30 - 16:00", "16:00 - 16:30",
    "16:30 - 17:00", "17:00 - 17:30", "17:30 - 18:00",
    "18:00 - 18:30", "18:30 - 19:00", "19:00 - 19:30",
    "19:30 - 20:00", "20:00 - 20:30", "20:30 - 21:00",
];

document.addEventListener('click', (e) => {
    const placeholder = e.target.closest('.hour-selector__placeholder');
    if (placeholder) {
        const dropdown = placeholder.nextElementSibling;

        if (dropdown.children.length === 0) {
            hoursList.forEach(hour => {
                const btn = document.createElement('button');
                btn.textContent = hour;
                btn.className = 'hour-selector__dropdown__item';
                dropdown.appendChild(btn);
            });
        }
        dropdown.classList.toggle('show');
    }

    const hourItem = e.target.closest('.hour-selector__dropdown__item');
    if (hourItem) {
        const dropdown = hourItem.closest('.hour-selector__dropdown');
        const placeholderSpan = dropdown.previousElementSibling.querySelector('span');

        placeholderSpan.textContent = hourItem.textContent;
        dropdown.classList.remove('show');
    }

    if (!e.target.closest('.hour-selector')) {
        document.querySelectorAll('.hour-selector__dropdown.show').forEach(drop => {
            drop.classList.remove('show');
        });
    }
});