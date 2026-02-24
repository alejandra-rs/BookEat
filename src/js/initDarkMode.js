const sunIcon = "/src/assets/icons/light-mode.svg";
const moonIcon = "/src/assets/icons/dark-mode.svg";

function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const themeIcon = document.getElementById('darkModeIcon');

    if (!darkModeToggle || !themeIcon) return;

    const savedTheme = localStorage.getItem('theme') || 'light';
    themeIcon.src = savedTheme === 'dark' ? sunIcon : moonIcon;

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');

        themeIcon.src = isDarkMode ? sunIcon : moonIcon;
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
}

initDarkMode();
