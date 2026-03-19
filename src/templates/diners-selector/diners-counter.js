const btnLess = document.getElementById('less');
const btnMore = document.getElementById('more');
const numberDisplay = document.getElementById('number');

let dinersCount = 1;

function updateDisplay() {
    numberDisplay.textContent = dinersCount;
}

btnMore.addEventListener('click', () => {
    dinersCount++;
    updateDisplay();
});

btnLess.addEventListener('click', () => {
    if (dinersCount > 1) {
        dinersCount--;
        updateDisplay();
    }
});

updateDisplay();