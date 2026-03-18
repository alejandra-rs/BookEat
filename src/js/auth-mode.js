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

document.addEventListener('header-loaded', () => {
    updateHeader()
});

function prepareImage(miImagen, user) {
    miImagen.src = user.datos['profile-picture'] || "../../assets/icons/user-profile.svg";
    miImagen.alt = 'User profile';
    miImagen.style.cursor = 'pointer';
    miImagen.setAttribute('data-opens', 'my-account-popup');
    miImagen.setAttribute('class', 'user-profile-picture');
    return miImagen;
}

function updateHeader() {
    const usuarioGuardado = sessionStorage.getItem('usuarioActual');
    if (!usuarioGuardado) return;
    const user = JSON.parse(usuarioGuardado);
    const header__buttons = document.querySelector('header.header > .header__buttons');
    if (!header__buttons) return;
    header__buttons.replaceChildren(prepareImage(document.createElement('img'), user));
}

updateHeader();
window.updateHeader = updateHeader;

