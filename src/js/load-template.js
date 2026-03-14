export async function loadTemplate(rootContext = document) {
    let elements = Array.from(rootContext.querySelectorAll('[load-template]'));
    if (elements.length === 0) return;

    await Promise.all(elements.map(async (el) => {
        let file = el.getAttribute("load-template");
        try {
            let response = await fetch(find(file));
            if (response.ok) {
                let content = await response.text();

                let tempTemplate = document.createElement('template');
                tempTemplate.innerHTML = content;

                await loadTemplate(tempTemplate.content);

                let a = el.cloneNode(false);
                a.removeAttribute("load-template");
                a.appendChild(tempTemplate.content);

                if (el.parentNode) {
                    el.parentNode.replaceChild(a, el);
                }

                if (document.contains(a)) {
                    let scripts = a.querySelectorAll("script");
                    scripts.forEach(oldScript => {
                        let newScript = document.createElement("script");

                        Array.from(oldScript.attributes).forEach(attr => {
                            newScript.setAttribute(attr.name, attr.value);
                        });

                        newScript.textContent = oldScript.textContent;
                        document.body.appendChild(newScript);
                        oldScript.remove();
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching file:", error);
        }
    }));
}

function find(dato) {
    return "../../templates/" + dato + "/" + dato + ".html" ;
}

