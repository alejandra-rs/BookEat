import {Component, ElementRef, inject, signal, viewChild} from '@angular/core';
import {RegisterForm} from '../../models/users.model'
import {form, FormField, required} from '@angular/forms/signals';
import {checkBirthdate, checkEmail, checkMatch, checkPassword, checkPhone} from '../../validators/form.validators';
import {UsersService} from '../../services/jsonserver/users.service';
import {FormCard} from '../form-card/form-card';

@Component({
  selector: 'app-create-an-account',
  standalone: true,
  imports: [FormField, FormCard],
  templateUrl: './create-an-account.html',
  styleUrl: './create-an-account.css',
})
export class CreateAnAccount {
  service = inject(UsersService)

  dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('registerDialog');

  open(){
    this.dialogRef().nativeElement.showModal()
  }

  close(){
    this.dialogRef().nativeElement.close()
  }

  closeOnBackdrop(event: MouseEvent) {
    const rect = this.dialogRef().nativeElement.getBoundingClientRect();
    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedOutside) this.close();
  }

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

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
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
