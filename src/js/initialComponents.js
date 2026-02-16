import { loadComponent } from './loadComponents.js';
import { initDarkMode } from './initDarkMode.js';

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('header', 'src/components/header.html');
    initDarkMode();
});