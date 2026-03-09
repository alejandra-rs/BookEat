document.addEventListener('click', (event) => {

    const openBtn = event.target.closest('[data-opens]');
    if (openBtn) {
        const dialogId = openBtn.getAttribute('data-opens');
        const dialog = document.getElementById(dialogId);

        if (dialog) {
            //document.querySelectorAll('dialog[open]').forEach(dialogs => dialogs.close());
            dialog.showModal();
        }
        return;
    }

//    const closeBtn = event.target.closest('[data-closes]');
//    if (closeBtn) {
//        const dialog = closeBtn.closest('dialog');
//        if (dialog) dialog.close();
//        return;
//    }

    if (event.target.tagName === 'DIALOG' && event.target.open) {
        event.target.close();
    }
});

document.addEventListener('submit', (event) => {
    if (event.target.id === 'form-login' || event.target.id === 'form-register') {
        event.preventDefault();
        //console.log(`Enviando datos de ${event.target.id}...`);
        event.target.closest('dialog').close();
    }
});