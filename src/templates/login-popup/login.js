const formLogin = document.getElementById('form-login');

formLogin.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const email = formLogin.querySelector('input[type="email"]').value;
    const password = formLogin.querySelector('input[type="password"]').value;

    try {
        const usuarioLogueado = await findUser(email, password);

        sessionStorage.setItem('usuarioActual', JSON.stringify(usuarioLogueado));

        document.getElementById('login-popup').close();
        updateHeader();

    } catch (error) {
        alert(error.message);
    }
});

const getClientes = async (URL_BASE, email, password) => {
    let usuarios = await (await fetch(`${URL_BASE}/user-profiles?email=${email}`)).json();

    return usuarios.filter(user => user.password === password);
}

const getRestaurantUser = async (URL_BASE, email, password) => {
    let usuarios = await (await fetch(`${URL_BASE}/restaurant-profiles?email=${email}`)).json();

    return usuarios.filter(user => user.password === password);
}

async function findUser(email, password) {
    const URL_BASE = 'http://localhost:3000';

    let clientes = await getClientes(URL_BASE, email, password);

    if (clientes.length > 0) {
        return {
            rol: 'cliente',
            datos: clientes[0],
            id: parseInt(clientes[0].id)
        };
    }

    let duenos = await getRestaurantUser(URL_BASE, email, password);

    if (duenos.length > 0) {
        return {
            rol: 'dueño',
            datos: duenos[0],
            id: duenos[0]
        };
    }

    throw new Error('Email o contraseña incorrectos');
}