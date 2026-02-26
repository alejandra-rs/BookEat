const btnLess = document.getElementById('less');
const btnMore = document.getElementById('more');
const numberDisplay = document.getElementById('number');

let dinersCount = 0;

function updateDisplay() {
    numberDisplay.textContent = dinersCount;
}


btnMore.addEventListener('click', () => {
    dinersCount++;
    updateDisplay();
});
btnLess.addEventListener('click', () => {
    if (dinersCount > 0) {
        dinersCount--;
        updateDisplay();
    }
});

updateDisplay();