import {post} from '../../js/api-json.js';
import {check, checkEmail, clearErrors, dateValid, getData, getExistencesByEmail, isEmpty, logIn, matchPasswords, showError, validPassword, validPhone} from "../../js/auth-service.js";
import {showToast} from "../../js/show-toast.js";

function createUser(data) {
    return {
        name: data.name,
        surname: data.surname,
        username: data.surname,
        accountName: data.name + data.surname,
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

        clearErrors(formRegister);
        let hasError = false;

        if(isEmpty(formRegister)) return;
        if (check(dateValid(data), formRegister.elements['birthdate'], 'Must be between 18 and 99 years')) hasError = true;
        if (check(validPhone(data), formRegister.elements['phoneNumber'], 'Must be exactly 9 numbers')) hasError = true;
        if (check(checkEmail(data), formRegister.elements['email'], 'Must be a valid email')) hasError = true;
        if (check(validPassword(data), formRegister.elements['password'], 'Must be at least 8 characters')) hasError = true;
        if (check(matchPasswords(data.password, data.confirmPassword), formRegister.elements['confirmPassword'], 'Passwords do not match')) hasError = true;

        if (hasError) return;
        try {

            const [usersExistences, restaurantExistences] = await getExistencesByEmail(data.email)
            if (usersExistences.length > 0 || restaurantExistences.length > 0) return showError(formRegister.elements['email'], "This email already exists.");

            const postResponse = await post(createUser(data), 'users');

            if (!postResponse.ok) throw new Error("The account could not be created.");

            await logIn(data.email, data.password);
            formRegister.reset();
            const dialog = formRegister.closest('dialog');
            if (dialog) dialog.close();
            updateHeader();

        } catch (error) {
            showToast(error.message);
        }
    }
    if (evento.target && evento.target.id === 'form-login') {
        evento.preventDefault();
        const formLogin = evento.target;

        clearErrors(formLogin);
        const data = getData(formLogin);
        let hasError = false;

        if (check(checkEmail(data), formLogin.elements['email'], 'Must be a valid email')) hasError = true;
        if (check(validPassword(data), formLogin.elements['password'], 'Must be at least 8 characters')) hasError = true;

        if (hasError) return;

        try {
            let login = await logIn(data.email, data.password)
            if (!login){
                showError(formLogin.elements['email'], "");
                showError(formLogin.elements['password'], "");
                throw new Error("Mail or Password Invalid");
            }
            const dialog = formLogin.closest('dialog');
            if(dialog) dialog.close();
            formLogin.reset();
            updateHeader();

        } catch (error) {
            showToast(error.message);
        }
    }
});