const tagInput = document.getElementById('tag-input');
const tagsContainer = document.getElementById('tags-container');

function borrarTag(spanCerrar) {
    const tagDiv = spanCerrar.parentElement;
    tagDiv.remove();
    if (tagsContainer.children.length === 0) {
        tagsContainer.classList.remove('visible');
    }
}

function crearTag(texto) {
    if (texto.trim() === '') return;

    const tagDiv = document.createElement('div');
    tagDiv.className = 'tag';

    tagDiv.innerHTML = `${texto} <span onclick="borrarTag(this)">×</span>`;

    tagsContainer.appendChild(tagDiv);

    tagsContainer.classList.add('visible');

    tagInput.value = '';
}

tagInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        crearTag(this.value);
    }
});