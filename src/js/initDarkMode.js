const sunIcon = "src/assets/icons/light-mode.svg";
const moonIcon = "src/assets/icons/dark-mode.svg";
export function initDarkMode() {
    //Obtenemos el botón y el icono del tema
    const darkModeToggle = document.getElementById('darkModeToggle');
    const themeIcon = document.getElementById('lightModeIcon');

    //Si no existen, salimos de la función
    if (!darkModeToggle || !themeIcon) return;

    //Almacenamos el tema seleccionado en localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.src = sunIcon;
    } else {
        themeIcon.src = moonIcon;
    }

    //Añadimos el evento click al botón para cambiar el tema
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');

        themeIcon.src = isDarkMode ? sunIcon : moonIcon;
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
}
