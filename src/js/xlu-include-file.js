async function xLuIncludeFile(rootContext = document) {
    // 1. Buscamos los elementos a incluir
    let elements = Array.from(rootContext.querySelectorAll('[xlu-include-file]'));
    if (elements.length === 0) return;

    await Promise.all(elements.map(async (el) => {
        let file = el.getAttribute("xlu-include-file");

        try {
            let response = await fetch(file);
            if (response.ok) {
                let content = await response.text();

                let tempTemplate = document.createElement('template');
                tempTemplate.innerHTML = content;

                // 2. Resolvemos los sub-templates en memoria PRIMERO
                await xLuIncludeFile(tempTemplate.content);

                // 3. Preparamos el nodo final
                let a = el.cloneNode(false);
                a.removeAttribute("xlu-include-file");
                a.appendChild(tempTemplate.content);

                // 4. Insertamos en su contenedor padre (puede ser el DOM real o el fragmento en memoria)
                if (el.parentNode) {
                    el.parentNode.replaceChild(a, el);
                }

                // 5. ¡LA CLAVE! Solo ejecutamos los scripts si este bloque YA ESTÁ en el documento real.
                // Si es un sub-template, esto dará 'false' y esperará a que el padre lo inserte.
                if (document.contains(a)) {
                    let scripts = a.querySelectorAll("script");
                    scripts.forEach(oldScript => {
                        let newScript = document.createElement("script");

                        // Copiamos atributos (src, type="module", etc)
                        Array.from(oldScript.attributes).forEach(attr => {
                            newScript.setAttribute(attr.name, attr.value);
                        });

                        newScript.textContent = oldScript.textContent;
                        document.body.appendChild(newScript);
                        oldScript.remove(); // Limpiamos el script viejo inerte
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching file:", error);
        }
    }));
}