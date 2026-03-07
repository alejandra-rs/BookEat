
//buscamos la ruta
function find(dato) {
    return "../../templates/" + dato + "/" + dato + ".html" ;
}

async function cargar(id, datos) {
    let appDiv = document.getElementById(id);

    if (!appDiv) {
        return;
    }

    for (const dato of datos) {
        let path = find(dato);
        try {
            appDiv.appendChild(await cargarTemplate(path));
        } catch (error) {
            console.error(`Fallo al cargar el template ${dato}:`, error);
        }
    }
}



async function cargarTemplate(url) {
    let response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} al intentar cargar ${url}`);
    }

    let text = await response.text();
    let template = document.createElement('template');
    template.innerHTML = text;

    let placeholders = template.content.querySelectorAll('[data-template]');

    for (let placeholder of placeholders) {
        let subUrl = placeholder.getAttribute('data-template');

        try {
            let subContent = await cargarTemplate(find(subUrl));
            placeholder.replaceWith(subContent);
        } catch (error) {
            console.error(`Error en el sub-template ${subUrl}:`, error);
        }
    }

    return document.importNode(template.content, true);
}

// 4. Lógica para abrir el menú (La que llama tu botón)
window.popupMode = function(idDato, data) {
    // Buscamos tu dialog usando el ID exacto que tienes en menu-popup.html
    const dialog = document.getElementById('menu-dialog');

    if (dialog) {
        dialog.showModal(); // Esto abre el popup por encima de todo
    } else {
        console.error("No se ha encontrado el <dialog id='menu-dialog'>.");
    }
};