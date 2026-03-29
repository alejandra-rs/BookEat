import {post} from "../../js/api-json.js";
import {showToast} from "../../js/show-toast.js";

document.addEventListener('submit', async (e) => {
    if (e.target && e.target.id === 'form-write-review') {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target).entries());
        const sessionData = JSON.parse(sessionStorage.getItem('currentSession'));

        const newComment = {
            restaurantId: formData.restaurantId,
            userId: sessionData.id,
            title: formData.title,
            description: formData.reviewText,
            pros: formData.pros,
            cons: formData.cons,
            rating: String(formData.rating),
            datetime: new Date().toISOString().split('T')[0],
            images: formData.image === "" ? [] : [formData.image]
        };

        try {

            const response = await post(newComment, 'reviews');

            if (!response.ok) throw new Error("Error saving the review.");

            e.target.reset();
            const dialog = e.target.closest('dialog');
            if (dialog) dialog.close();

            showToast("Thanks for your review! It has been published.")

        } catch (error) {
            showToast("Oops! Something went wrong.");
        }
    }
});