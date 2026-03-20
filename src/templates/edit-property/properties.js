export function setProperties() {
    document.querySelectorAll('.custom-property').forEach(container => {
        const icon = container.getAttribute('data-icon');
        const label = container.getAttribute('data-label');
        const type = container.getAttribute('data-type');
        const name = container.getAttribute('data-key');

        const img = container.querySelector('.edit-property__icon');
        const labelSpan = container.querySelector('.edit-property__label > span');
        const input = container.querySelector('input');

        if (icon && img) img.src = `../../assets/icons/${icon}`;
        if (label && labelSpan) labelSpan.textContent = label;

        if (input) {
            if (type) input.type = type;
            if (name) {
                input.name = name;
                input.setAttribute('data-template', `input-${name}`);
            }
        }
    });
}