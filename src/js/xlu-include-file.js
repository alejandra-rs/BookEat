async function xLuIncludeFile() {
    let z = document.getElementsByTagName("*");

    for (let i = 0; i < z.length; i++) {
        if (z[i].getAttribute("xlu-include-file")) {
            let a = z[i].cloneNode(false);
            let file = z[i].getAttribute("xlu-include-file");
            try {
                let response = await fetch(file);
                if (response.ok) {

                    let content = await response.text();


                    if (file === "article-template.html") {
                        content = replaceArticleTemplatePlaceholders(content, z[i]);

                    }

                    a.removeAttribute("xlu-include-file");
                    a.innerHTML = content;
                    z[i].parentNode.replaceChild(a, z[i]);

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

            return;
        }
    }
}


function replaceArticleTemplatePlaceholders(content, element) {
    let articleData = {
        title: element.getAttribute("data-title"),
        subtitle: element.getAttribute("data-subtitle"),
        date: element.getAttribute("data-date"),
        displayDate: element.getAttribute("data-display-date"),
        content: element.getAttribute("data-content"),
        image: element.getAttribute("data-image"),
        imageCaption: element.getAttribute("data-image-caption")
    };
    return content
        .replace(/{{title}}/g, articleData.title ?? "{{title}}")
        .replace(/{{subtitle}}/g, articleData.subtitle ?? "{{subtitle}}")
        .replace(/{{date}}/g, articleData.date ?? "{{date}}")
        .replace(/{{displayDate}}/g, articleData.displayDate ?? "{{displayDate}}")
        .replace(/{{content}}/g, articleData.content ?? "{{content}}")
        .replace(/{{image}}/g, articleData.image ?? "{{image}}")
        .replace(/{{imageCaption}}/g, articleData.imageCaption ?? "{{imageCaption}}");

}


function redirectToArticle(event, element) {
    event.preventDefault();
    let params = new URLSearchParams();
    params.append("title", element.getAttribute("data-title"));
    params.append("subtitle", element.getAttribute("data-subtitle"));
    params.append("date", element.getAttribute("data-date"));
    params.append("displayDate", element.getAttribute("data-display-date"));
    params.append("content", element.getAttribute("data-content"));
    params.append("image", element.getAttribute("data-image") || "");
    params.append("imageCaption", element.getAttribute("data-image-caption") || "");

    window.location.href = "article.html?" + params.toString();
}


