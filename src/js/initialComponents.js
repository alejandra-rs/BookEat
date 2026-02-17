import { loadComponent } from './loadComponents.js';
import { initDarkMode } from './initDarkMode.js';
import { authMode } from './authMode.js';

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('header', 'src/components/header.html');
    await loadComponent('restaurant-item', 'src/components/restaurant-item.html');
    initDarkMode();
    authMode();
});