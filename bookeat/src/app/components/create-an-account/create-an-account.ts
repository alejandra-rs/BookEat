import {Component, inject, input, output, signal} from '@angular/core';
import {RegisterForm} from '../../models/users.model'
import {form, FormField, required} from '@angular/forms/signals';
import {checkBirthdate, checkEmail, checkMatch, checkPassword, checkPhone} from '../../validators/form.validators';
import {UsersService} from '../../services/firebase/users.service';
import {FormCard} from '../form-card/form-card';

@Component({
  selector: 'app-create-an-account',
  standalone: true,
  imports: [FormField, FormCard],
  templateUrl: './create-an-account.html',
  styleUrl: './create-an-account.css',
})
export class CreateAnAccount {
  service = inject(UsersService);
  open = input(false);
  closed = output<void>();
  openLogin = output<void>();

  errors(field: any): string[] {
    if (!field().invalid() || (!field().touched() && !this.submitted())) return [];
    return (field().errors() ?? []).map((e: any) => e.message);
  }

  close() { this.closed.emit(); }

  registerData = signal<RegisterForm>({
    name: '',
    surname: '',
    birthdate: '',
    accountName: '',
    email: '',
    phoneNumber: '',
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

  submitted = signal(false);

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.submitted.set(true);
    if (this.registerForm().invalid()) return;

    const form = this.registerData()
    const user = {
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
