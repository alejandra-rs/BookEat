document.addEventListener('click', (event) => {

    const openBtn = event.target.closest('[data-opens]');
    if (openBtn) {
        const dialogId = openBtn.getAttribute('data-opens');
        const dialog = document.getElementById(dialogId);

        if (dialog) {
            document.querySelectorAll('dialog[open]').forEach(dialogs => dialogs.close());
            dialog.showModal();
        }
        return;
    }

    if (event.target.tagName === 'DIALOG' && event.target.open) {
        event.target.close();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateHeader, 100);
});

function updateHeader() {
    const usuarioGuardado = localStorage.getItem('usuarioActual');

    const loginBtn = document.querySelector('header .header');
    const registerBtn = document.getElementById('registerButton');
    const accountContainer = document.querySelector('.header__buttons__account');

    // Verificamos que los elementos existan antes de intentar cambiarlos
    if (!accountContainer) return;

    if (usuarioGuardado) {
        // --- EL USUARIO ESTÁ LOGUEADO ---
        const usuario = JSON.parse(usuarioGuardado);

        // Ocultamos los botones
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';

        // Actualizamos la foto de perfil
        if (userIcon && usuario.datos['profile-picture']) {
            userIcon.src = usuario.datos['profile-picture'];
            userIcon.style.borderRadius = '50%';
            userIcon.style.border = '2px solid var(--primary-color, #ccc)'; // Puedes usar tu variable de CSS
            userIcon.style.cursor = 'pointer'; // Para que parezca un botón clickeable
        }

        // Creamos el botón de cerrar sesión si no existe
        if (!document.getElementById('logoutButton')) {
            const logoutBtn = document.createElement('button');
            logoutBtn.id = 'logoutButton';
            logoutBtn.className = 'secondary-button'; // Mantenemos tus estilos
            logoutBtn.textContent = 'Log out';
            logoutBtn.style.marginLeft = '10px';

            // Lógica para cerrar sesión
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('usuarioActual');
                window.location.reload(); // Recarga la página y vuelve al estado original
            });

            accountContainer.appendChild(logoutBtn);
        }
    } else {
        // --- EL USUARIO NO ESTÁ LOGUEADO ---
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (registerBtn) registerBtn.style.display = 'inline-block';

        if (userIcon) {
            userIcon.src = '../../assets/icons/user-profile.svg'; // Tu icono por defecto
            userIcon.style.borderRadius = '0';
            userIcon.style.border = 'none';
            userIcon.style.cursor = 'default';
        }

        // Si existe el botón de logout, lo quitamos
        const logoutBtn = document.getElementById('logoutButton');
        if (logoutBtn) {
            logoutBtn.remove();
        }
    }
}

// Hacemos que la función sea accesible globalmente por si otros scripts (como login.js) la necesitan
window.actualizarHeader = updateHeader;