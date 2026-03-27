import {post} from '../../js/api-json.js';
import {checkEmail, getData, getExistencesByEmail, isEmpty, logIn, matchPasswords, validPassword, validPhone} from "../../js/auth-service.js";

function createUser(data) {
    return {
        name: data.name,
        surname: data.surname,
        username: data.surname,
        accountName: data.nickName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
        image: ""
    };
}

document.addEventListener('submit', async (evento) => {
    if (evento.target && evento.target.id === 'form-register') {
        evento.preventDefault();
        evento.stopImmediatePropagation();

        const formRegister = evento.target;
        const data = getData(formRegister);

        if(isEmpty(data)) return alert("please complete all fields");
        if(!checkEmail(data)) return alert("must be a valid email address");
        if (!matchPasswords(data.password, data.confirmPassword)) return alert("the password do not match.");
        if (!validPassword(data)) return alert("the password length should be at least 8 characters.");
        if (!validPhone(data)) return alert("the phone number length should be 9 numbers.");

        try {

            const [usersExistences, restaurantExistences] = await getExistencesByEmail(data.email)
            if (usersExistences.length > 0 || restaurantExistences.length > 0) return alert("This email already exists.");

            const postResponse = await post(createUser(data), 'users');

            if (!postResponse.ok) throw new Error("The account could not be created.");

            await logIn(data.email, data.password);
            formRegister.reset();
            const dialog = formRegister.closest('dialog');
            if (dialog) dialog.close();
            updateHeader();

        } catch (error) {
            alert(error.message);
        }
    }
    if (evento.target && evento.target.id === 'form-login') {
        evento.preventDefault();
        const formLogin = evento.target;
        const data = getData(formLogin);
        if(isEmpty(data)) return alert("please complete all fields");
        if(!checkEmail(data)) return alert("must be a valid email address");
        try {
            await logIn(data.email, data.password)
            const dialog = formLogin.closest('dialog');
            if(dialog) dialog.close();
            formLogin.reset();
            updateHeader();

        } catch (error) {
            alert(error.message);
        }
    }
});