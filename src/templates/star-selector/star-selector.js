const stars = document.querySelectorAll('.star-checkbox__input');
const finalRatingInput = document.getElementById('final-rating');

stars.forEach(star => {
    star.addEventListener('change', () => {
        stars.forEach(s => s.checked = false);
        for (let i = 0; i < Number(star.value); i++) stars[i].checked = true;

        if (finalRatingInput) {
            finalRatingInput.value = star.value;
        }
    });

})