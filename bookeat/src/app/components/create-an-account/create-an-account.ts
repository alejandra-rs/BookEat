import {Component, inject, signal} from '@angular/core';
import {RegisterForm, User} from '../../models/users.model'
import {form, FormField, required} from '@angular/forms/signals';
import {checkBirthdate, checkEmail, checkMatch, checkPassword, checkPhone} from '../../validators/form.validators';
import {UsersService} from '../../services/jsonserver/users.service';

@Component({
  selector: 'app-create-an-account',
  standalone: true,
  imports: [FormField],
  templateUrl: './create-an-account.html',
  styleUrl: './create-an-account.css',
})
export class CreateAnAccount {
  service = inject(UsersService)
  registerData = signal<RegisterForm>({
    name: '',
    surname: '',
    birthdate: '',
    accountName: '',
    email: '',
    phoneNumber: 0,
    password: '',
    confirmPassword: ''
  });

  registerForm= form(this.registerData, (path) => {
    required(path.name, { message: 'El nombre es obligatorio' });
    required(path.surname, { message: 'El apellido es obligatorio' });
    checkPhone(path.phoneNumber)
    checkBirthdate(path.birthdate);
    checkEmail(path.email);
    checkPassword(path.password);
    checkPassword(path.confirmPassword);
    checkMatch(path.password, path.confirmPassword);
  });

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (this.registerForm().invalid()) return;

    const form = this.registerData()
    const user: Omit<User, 'id'> & {password: string} = {
      name: form.name,
      surname: form.surname,
      birthdate:form.birthdate,
      accountName: form.name + " " + form.surname,
      email: form.email,
      password: form.password,
      phoneNumber: `+34 ${form.phoneNumber}`,
      image: '',
    }

    this.service.post(user)
  }

}
