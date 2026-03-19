document.addEventListener('submit', async (e) => {
    if (e.target && e.target.id === 'form-write-review') {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target).entries());
        const sessionData = JSON.parse(sessionStorage.getItem('currentSession'));

        const nuevaResena = {
            restaurantId: formData.restaurantId,
            userId: sessionData.id,

            description: formData.reviewText,
            pros: formData.pros,
            cons: formData.cons,
            rating: String(formData.rating),
            'created-at': new Date().toISOString().split('T')[0]
        };

        try {

            const response = await fetch('http://localhost:3000/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaResena)
            });

            if (!response.ok) throw new Error("Error saving the review.");

            e.target.reset();
            const dialog = e.target.closest('dialog');
            if (dialog) dialog.close();

            setTimeout(() => alert("Thanks for your review! It has been published."), 100);

        } catch (error) {
            console.error(error);
            alert("Oops! Something went wrong.");
        }
    }
});