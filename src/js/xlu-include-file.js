async function xLuIncludeFile(rootContext = document) {
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

                await xLuIncludeFile(tempTemplate.content);

                let a = el.cloneNode(false);
                a.removeAttribute("xlu-include-file");
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

