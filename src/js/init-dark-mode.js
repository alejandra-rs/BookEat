const sunIcon = "../../assets/icons/light-mode.svg";
const moonIcon = "../../assets/icons/dark-mode.svg";

export function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const themeIcon = document.getElementById('dark-mode-icon');

    if (!darkModeToggle || !themeIcon) return;

    const savedTheme = sessionStorage.getItem('theme') || 'light';
    themeIcon.src = savedTheme === 'dark' ? sunIcon : moonIcon;

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');

        themeIcon.src = isDarkMode ? sunIcon : moonIcon;
        sessionStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
}

export function checkDarkMode() {
    const savedTheme = sessionStorage.getItem('theme') || 'light';
    const themeIcon = document.getElementById('dark-mode-icon');
    themeIcon.src = savedTheme === "dark" ? sunIcon : moonIcon;
    if (savedTheme === 'dark') {
        document.body.classList.toggle('dark-mode');
    }
    initDarkMode()
}
