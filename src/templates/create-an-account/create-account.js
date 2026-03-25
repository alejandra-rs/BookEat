import {post, URL_BASE} from '../../js/api-json.js';
const formRegister = document.getElementById('form-register');

async function logIn(email, password) {
    const [usersExistences, restaurantExistences] = await getExistencesByEmail(email);
    if (usersExistences.length === 0 && restaurantExistences.length === 0) throw new Error("email or password is wrong.");

    let rol = usersExistences.length === 1 ? 'user' : 'restaurant';
    let user = usersExistences.length === 1 ? usersExistences[0] : restaurantExistences[0];

    if (!matchPasswords(user.password, password)) throw new Error("email or password is wrong.");

    sessionStorage.setItem('currentSession', JSON.stringify({rol: rol,id: user.id, image: user.image}));
}

function getData(form) {
    return Object.fromEntries(new FormData(form).entries())
}

function isEmpty(data) {
    for (let value in data.values) {
        if (!value?.trim()){
            return true
        }
    }
    return false
}

function checkEmail(data) {
    let emailRegex = /^[^\s@]+@[^\s@]+/;
    return (emailRegex.test(data.email))

}

function matchPasswords(password, otherPassword) {
    return password === otherPassword;
}

function validPassword(data) {
    return data.password.length > 8;
}

function validPhone(data) {
    return data.phoneNumber.length === 9;
}

async function findUserByEmail(email) {
    return (await fetch(`${URL_BASE}/users?email=${email}`)).json();
}

async function findRestaurantByEmail(email) {
    return (await fetch(`${URL_BASE}/restaurant-profiles?email=${email}`)).json();
}

function createUser(data) {
    return {
        name: data.name,
        surname: data.surname,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
        image: ""
    };
}

async function getExistencesByEmail(email) {
    return await Promise.all([
        findUserByEmail(email),
        findRestaurantByEmail(email),
    ]);
}

if (formRegister) {
    formRegister.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        evento.stopImmediatePropagation();

        const data = getData(formRegister);

        if(isEmpty(data)) return alert("please complete all fields");
        if(!checkEmail(data)) return alert("must be a valid email address");
        if (!matchPasswords(data.password, data.confirmPassword)) return alert("the password do not match.");
        if (!validPassword(data)) return alert("the password length should be at least 8 characters.");
        if (!validPhone(data)) return alert("the phone number length should be at least 8 characters.");

        try {

            const [usersExistences, restaurantExistences] = await getExistencesByEmail(data.email)
            if (usersExistences.length > 0 || restaurantExistences.length > 0) return alert("This email already exists.");

            const postResponse = await post(createUser(data), 'users');

            if (!postResponse.ok) throw new Error("The account could not be created.");

            await logIn(data.email, data.password);
            formRegister.reset();
            document.getElementById('register-popup').close();
            updateHeader();

        } catch (error) {
            alert(error.message);
        }
    });
}


const formLogin = document.getElementById('form-login');

formLogin.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    evento.stopImmediatePropagation();

    const data = getData(formLogin);

    if(isEmpty(data)) return alert("please complete all fields");
    if(!checkEmail(data)) return alert("must be a valid email address");

    try {
        await logIn(data.email, data.password)
        document.getElementById('login-popup').close();
        formLogin.reset();
        updateHeader();

    } catch (error) {
        alert(error.message);
    }
});