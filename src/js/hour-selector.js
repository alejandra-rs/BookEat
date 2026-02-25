document.querySelector('.hour-placeholder')
    .addEventListener('click', () => {
        document.querySelector('.hour-dropdown').classList.toggle('open');
    })


document.querySelector('.hour-dropdown').addEventListener('click', (event) => {

    const button = event.target.closest('.hour-button');

    if (button) {
        document.querySelector('.hour-dropdown').classList.remove('open');
        document.querySelector('.placeholder').innerText = button.innerText;
    }
});