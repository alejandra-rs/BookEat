// 1. Escuchamos cuando se hace clic en cualquier botón de subir imagen

//TODO
document.addEventListener('click', (e) => {
    const uploadBtn = e.target.closest('.btn-trigger-upload');

    if (uploadBtn) {
        // Buscamos a la "familia" (el div contenedor)
        const componentContainer = uploadBtn.closest('.image-upload-component');

        // Buscamos el input de archivo oculto de esta familia y le hacemos clic mágicamente
        const fileInput = componentContainer.querySelector('.image-file-input');
        if (fileInput) fileInput.click();
    }
});

// 2. Escuchamos cuando el usuario termina de elegir la foto en su ordenador
document.addEventListener('change', (e) => {
    if (e.target && e.target.classList.contains('image-file-input')) {

        const fileInput = e.target;
        const componentContainer = fileInput.closest('.image-upload-component');
        const hiddenBase64 = componentContainer.querySelector('.image-base64-hidden');
        const uploadText = componentContainer.querySelector('.upload-text');

        const file = fileInput.files[0];

        if (file) {
            // Cambiamos el texto del botón para que sepa que se ha subido bien
            if (uploadText) {
                const shortName = file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name;
                uploadText.textContent = shortName;
            }

            // Convertimos la imagen a texto (Base64)
            const reader = new FileReader();
            reader.onload = function(event) {
                // Guardamos el texto larguísimo en el input oculto (que luego leerá FormData)
                if (hiddenBase64) {
                    hiddenBase64.value = event.target.result;
                }

                // Lanzamos el grito al aire por si la página de perfil lo quiere escuchar luego
                fileInput.dispatchEvent(new CustomEvent('image-loaded', { bubbles: true, detail: event.target.result }));
            };

            reader.readAsDataURL(file);
        }
    }
});