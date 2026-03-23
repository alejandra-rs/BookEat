const dayMap = { 0: "D", 1: "L", 2: "M", 3: "X", 4: "J", 5: "V", 6: "S" };
let restaurantHours = {};

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const state = JSON.parse(sessionStorage.getItem('pendingBooking') || '{}');

    const syncDiners = setInterval(() => {
        const dinersSpan = document.querySelector('main #number');
        if (dinersSpan) {
            if (state.diners) dinersSpan.textContent = state.diners;
            clearInterval(syncDiners);
        }
    }, 50);

    try {
        const resRest = await fetch(`http://localhost:3000/restaurants/${id}`);
        const restData = await resRest.json();
        restaurantHours = restData.hours || {};
    } catch (e) {
        console.error("Failed to load restaurant data:", e);
    }

    function parseSavedDate(dateStr) {
        if (!dateStr || dateStr === "" || dateStr === "Date") return null;
        if (dateStr.includes('/')) {
            const [day, month, year] = dateStr.split('/');
            return new Date(`${year}-${month}-${day}`);
        }
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? null : d;
    }
    const calendarInput = document.getElementById('inline-calendar');

    const fp = flatpickr(calendarInput, {
        inline: true,
        minDate: "today",
        dateFormat: "Y-m-d",
        enable: [
            function(date) {
                const dayLetter = dayMap[date.getDay()];
                return restaurantHours[dayLetter] && restaurantHours[dayLetter].length > 0;
            }
        ],
        onChange: function(selectedDates, dateStr) {
            if (selectedDates.length > 0) {
                state.date = dateStr;
                sessionStorage.setItem('pendingBooking', JSON.stringify(state));
                renderHourTable(selectedDates[0], state.time);
            }
        }
    });

    setTimeout(() => {
        const targetDate = parseSavedDate(state.date);

        if (targetDate) fp.setDate(targetDate, true);
        else {
            const container = document.getElementById('dynamic-hour-table');
            if (container) container.innerHTML = '<p><em>Please select a date first to see available hours.</em></p>';
            validateForm();
        }
    }, 150);

    document.addEventListener('click', (e) => {
        const hourBtn = e.target.closest('.hour-table__btn');
        if (hourBtn) {
            document.querySelectorAll('.hour-table__btn').forEach(b => b.classList.remove('selected'));
            hourBtn.classList.add('selected');
            state.time = hourBtn.dataset.time;
            sessionStorage.setItem('pendingBooking', JSON.stringify(state));
            validateForm();
        }

        const confirmBtn = e.target.closest('#confirm-details');
        if (confirmBtn && !confirmBtn.disabled) {
            state.diners = document.querySelector('main #number')?.textContent || "2";
            state.date = document.getElementById('inline-calendar').value;
            state.time = document.querySelector('.hour-table__btn.selected')?.dataset.time;

            sessionStorage.setItem('pendingBooking', JSON.stringify(state));
            window.location.href = `../../pages/book-table-page/book-table-page.html?id=${id}`;
        }
    });
});


function renderHourTable(dateObj, savedTimeStr) {
    const container = document.getElementById('dynamic-hour-table');
    const dayLetter = dayMap[dateObj.getDay()];
    const ranges = restaurantHours[dayLetter];

    container.innerHTML = '';

    if (!ranges || ranges.length === 0) {
        container.innerHTML = '<p>No availability on this day.</p>';
        validateForm();
        return;
    }

    const slots = [];
    ranges.forEach(range => {
        let [startH, startM] = range.from.split(':');
        let [endH, endM] = range.to.split(':');

        let current = new Date(); current.setHours(startH, startM, 0);
        let end = new Date(); end.setHours(endH, endM, 0);

        while (current < end) {
            let startStr = current.toTimeString().substring(0, 5);
            current.setMinutes(current.getMinutes() + 30);
            let nextStr = current.toTimeString().substring(0, 5);

            if (current <= end) {
                slots.push(`${startStr} - ${nextStr}`);
            }
        }
    });

    slots.forEach(slotTime => {
        const btn = document.createElement('button');
        btn.className = `hour-table__btn secondary-button free`;
        btn.dataset.time = slotTime;
        btn.textContent = slotTime;

        if (savedTimeStr && savedTimeStr !== "Time" && slotTime === savedTimeStr) btn.classList.add('selected');
        container.appendChild(btn);
    });

    validateForm();
}

function validateForm() {
    const confirmBtn = document.getElementById('confirm-details');
    if (!confirmBtn) return;
    const timeBtn = document.querySelector('.hour-table__btn.selected');
    confirmBtn.disabled = !timeBtn;
}