import {Component, inject, input, signal} from '@angular/core';
import {EditButton} from '../edit-button/edit-button';
import {User} from '../../models/users.model';
import {UsersService} from '../../services/firebase/users.service';
import { AuthService } from '../../services/jsonserver/auth.service';
import { showToast } from '../toast/toast';

@Component({
  selector: 'app-edit-property',
  imports: [EditButton],
  templateUrl: './edit-property.html',
  styleUrl: './edit-property.css',
})
export class EditProperty {
  private usersService = inject(UsersService);
  private session = inject(AuthService).currentUser;
  iconClass = input<string>();
  propertyTitle = input<string>();
  propertyName = input.required<string>();
  user = input.required<User>();
  onEdit = input<(value: string) => void>();

  editing = signal(false);

  get propertyValue(): string {
    const key = this.propertyName() as keyof User;
    return (this.user()?.[key] as string) ?? '';
  }

  toggleEdit(value: string) {
    if (this.editing()) {
      const customHandler = this.onEdit();
      const session = this.session();
      if (customHandler) customHandler(value);
      else if (session) this.usersService
        .patch(session.id, session.role, { [this.propertyName()]: value })
        .subscribe(() => showToast(`${this.propertyTitle() ?? this.propertyName()} updated successfully.`));
    }
    this.editing.update(v => !v);
  }
}
