import {email, minLength, pattern, required, validate} from '@angular/forms/signals';

export const PHONE_PATTERN = /^[0-9]{9}$/;

export function checkPassword(data: any) {
  required(data, { message: 'la contraseña es obligatoria' });
  minLength(data, 8, { message: 'Debe tener al menos 8 caracteres' });
}

export function checkMatch(pathPassword: any, pathConfirmPassword: any) {
  validate(pathConfirmPassword, (context) => {

    const confirmPass = context.value();
    const pass = context.valueOf(pathPassword);

    if (pass && confirmPass && pass !== confirmPass) {
      return {kind: 'mismatch', message: 'La contraseña debe coincidir'};
    }
    return null;
  })
}

export function checkPhone(pathPhone: any) {
  required(pathPhone, {message: "El telefono es obligatorio"});
  pattern(pathPhone, PHONE_PATTERN, {message: "La telefono es obligatorio, de 9 digitos"});
}

export function checkEmail(pathEmail: any) {
  required(pathEmail, {message: "El email es obligatorio"});
  email(pathEmail, {message: "El email tiene que ser válido"});
}

export function checkBirthdate(pathDate: any) {
  required(pathDate, {message: "El date es obligatorio"});
  validate(pathDate, (context) => {
    const dateValue= context.value() as string;
    const birthdate = new Date(dateValue);
    const today = new Date();
    const age18Date = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    const age99Date = new Date(
      today.getFullYear() - 99,
      today.getMonth(),
      today.getDate()
    );
    if (birthdate > age18Date) {
      return { kind: 'underage', message: "Debes ser mayor de 18 años" };
    }
    if (birthdate < age99Date) {
      return { kind: 'overage', message: "La edad no puede superar los 99 años" };
    }
    return null;
  });
}
