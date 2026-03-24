const editActions = {
    text: async (editBtnContainer, fieldContainer) => {
        const inputElement = fieldContainer.querySelector('input');
        const fieldName = inputElement.getAttribute('name');
        const btnImage = editBtnContainer.querySelector('.icon');

        if (inputElement.hasAttribute('readonly')) {
            event.preventDefault();
            inputElement.removeAttribute('readonly');
            inputElement.focus();
            if (btnImage) btnImage.src = "../../assets/icons/save.svg";
        } else await updateText(inputElement, fieldName, btnImage);
    },
    image: async (editBtnContainer, fieldContainer) => {
        console.log("imagen");
    }
}

export function initEditButtons() {
    document.addEventListener('click', async (event) => {
        const editBtnContainer = event.target.closest('.edit-button');
        if (!editBtnContainer) return;

        const fieldContainer = editBtnContainer.closest('.edit-property__label__field');
        if (fieldContainer) await editActions.text(editBtnContainer, fieldContainer);
        else await editActions.image(editBtnContainer, fieldContainer);
    });
}

async function updateText(element, fieldName, btnImage) {
    const newValue = element.value;
    try {
        const session = JSON.parse(sessionStorage.getItem('currentSession'));
        let role = session?.rol || "";
        const myId = session?.id || "";

        (role === "restaurant") ? role = "restaurant-profile" : role = "restaurant";

        const response = await fetch(`http://localhost:3000/${role}s/${myId}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({[fieldName]: newValue})
        });

        if (response.ok) {
            element.setAttribute('readonly', true);
            if (btnImage) btnImage.src = "../../assets/icons/pencil.svg";
            showToast(`You have successfully updated your ${fieldName}.`);
        } else showToast(`Failed to save changes on ${fieldName}.`);

    } catch (error) { showToast(`Failed to save changes on ${fieldName}.`); }
}



function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}