const stars = document.querySelectorAll('.star-checkbox__input');

stars.forEach(star => {
    star.addEventListener('change', () => {
        stars.forEach(s => s.checked = false);
        for (let i = 0; i < Number(star.value); i++) stars[i].checked = true;
    })
})