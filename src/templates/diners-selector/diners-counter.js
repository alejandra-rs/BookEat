document.addEventListener('click', (e) => {
    const btnMore = e.target.closest('#more');
    const btnLess = e.target.closest('#less');

    if (btnMore || btnLess) {
        const container = (btnMore || btnLess).closest('.diners-counter__container');
        const numberDisplay = container.querySelector('#number');

        let count = parseInt(numberDisplay.textContent) || 1;

        if (btnMore) count++;
        else if (btnLess && count > 1) count--;
        numberDisplay.textContent = count;
    }
});