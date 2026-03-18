const formRegister = document.getElementById('form-register');

const getPostUser = async (URL_BASE, nuevoUsuario) => {
    return await fetch(`${URL_BASE}/user-profiles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoUsuario)
    });
}
if (formRegister) {
    formRegister.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        evento.stopImmediatePropagation();

        const formData = new FormData(formRegister);

        const data = Object.fromEntries(formData.entries());
        const { Name, Surname, Email, Password, Birthdate, PhoneNumber } = data;

        if (!Name?.trim() || !Surname?.trim() || !Email?.trim() || !Password?.trim() || !Birthdate) {
            alert("please complete all fields");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            alert("please enter a valid email address");
            return;
        }

        if (Password !== data.ConfirmPassword) {
            alert("the password do not match.");
            return;
        }
        if (Password.length < 8){
            alert("the password length should be at least 8 characters.");
            return;
        }
        if (PhoneNumber.length === 9){
            alert("the password length should be at least 8 characters.");
            return;
        }


        const URL_BASE = 'http://localhost:3000';

        try {

            //TODO hacer esto con promesas

            const usuariosExistentes = await (await fetch(`${URL_BASE}/user-profiles?email=${data.Email}`)).json();
            const restaurantesExistentes = await (await fetch(`${URL_BASE}/restaurant-profiles?email=${data.Email}`)).json();

            if (usuariosExistentes.length > 0 || restaurantesExistentes.length > 0) {
                alert("Este email ya está registrado. Por favor, ve a la pestaña de Login.");
                return;
            }

            const nuevoUsuario = {
                Name,
                Surname,
                PhoneNumber,
                Email,
                Password,
                "profile-picture": ""
            };

            const postResponse = await getPostUser(URL_BASE, nuevoUsuario);

            if (!postResponse.ok) {
                throw new Error("Hubo un problema al crear la cuenta en el servidor.");
            }

            const usuarioCreado = await postResponse.json();

            // TODO aquí hay dry que se puede separar
            const sesion = {
                rol: 'cliente',
                datos: usuarioCreado
            };
            sessionStorage.setItem('usuarioActual', JSON.stringify(sesion));

            alert(`¡Cuenta creada con éxito! Bienvenido a BookEat, ${name}.`);
            formRegister.reset();

            const dialog = document.getElementById('register-popup');
            if (dialog) dialog.close();

            window.updateHeader();

        } catch (error) {
            alert(error.message);
        }
    });
}