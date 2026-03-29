import { patch } from "../../js/api-json.js";
import {showToast} from "../../js/show-toast.js";

document.addEventListener('click', async (e) => {

    if (e.target && e.target.id === 'edit-profile-image__footer__cancel-button') {
        const dialog = e.target.closest('dialog');
        if (dialog) dialog.close();
    }

    if (e.target && e.target.id === 'edit-profile-image__footer__save-button') {
        const dialog = e.target.closest('dialog');

        const imageInput = dialog.querySelector('input');
        const newImageUrl = imageInput ? imageInput.value : '';

        if (!newImageUrl) {
            showToast("Please provide an image URL.");
            return;
        }

        const sessionData = JSON.parse(sessionStorage.getItem('currentSession') || '{}');
        const role = sessionData.rol || 'user';
        const userId = sessionData.id;

        if (!userId) return;

        const collection = role === 'restaurant' ? 'restaurant-profiles' : 'users';

        try {
            const payload = { image: newImageUrl };

            const response = await patch(payload, collection, userId);

            if (response.ok) {
                sessionData.image = newImageUrl;
                sessionStorage.setItem('currentSession', JSON.stringify(sessionData));

                if (window.updateHeader) window.updateHeader();

                const profileImageEl = document.querySelector('.edit-profile-page__public__image img');
                if (profileImageEl) profileImageEl.src = newImageUrl;

                if (dialog) dialog.close();

                setTimeout(() => showToast("Profile picture updated!"), 100);
            } else {
                showToast("Failed to update profile image.");
            }
        } catch (error) {
            showToast("Oops! Something went wrong.");
        }
    }
});