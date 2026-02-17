export async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(
                `Error al cargar ${componentPath}: ${response.status}`,
            );
        }

        const html = await response.text();
        const element = document.getElementById(elementId);
        element ? element.innerHTML = html : console.error(`No se encontró el elemento con id: ${elementId}`);
    } catch (error) {
        console.error(`Error cargando componente ${componentPath}:`, error);
    }
}