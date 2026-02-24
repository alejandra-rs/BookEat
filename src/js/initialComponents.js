import { loadComponent } from './loadComponents.js';
import { initDarkMode } from './initDarkMode.js';
import { authMode } from './authMode.js';

document.addEventListener('DOMContentLoaded', async () => {
    initDarkMode();
    authMode();
});