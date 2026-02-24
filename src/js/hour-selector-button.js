const button = document.querySelector('.hour-button');

button.addEventListener('click', () => {
    if (button.classList.contains('occupied')) return;
    button.classList.toggle('selected');
});