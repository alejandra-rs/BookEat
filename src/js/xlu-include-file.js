async function xLuIncludeFile() {
    let el = document.querySelector('[xlu-include-file]');
    if (!el) return;

    let file = el.getAttribute("xlu-include-file");

    let a = el.cloneNode(false);
    a.removeAttribute("xlu-include-file");

    try {
        let response = await fetch(file);
        if (response.ok) {
            let content = await response.text();
            a.innerHTML = content;

            el.parentNode.replaceChild(a, el);

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

            xLuIncludeFile();
        }
    } catch (error) {
        console.error("Error fetching file:", error);
    }
}