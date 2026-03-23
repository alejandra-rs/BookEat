const date_picker = document.getElementById('date-picker');
if (date_picker) {
        flatpickr(date_picker, {
                wrap: true,
                altInput: true,
                altFormat: "d/m/Y",
                dateFormat: "d/m/Y",
                disableMobile: true,
                allowInput: true,
                clickOpens: true,
                minDate: "today",
                locale: { "firstDayOfWeek": 1 }
        });
}