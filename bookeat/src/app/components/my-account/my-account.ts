import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/jsonserver/auth.service';
import {
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-menu-popup',
  imports: [RouterLink, NgbDropdownToggle, NgbDropdown, NgbDropdownMenu, NgbDropdownItem],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css',
})
export class MyAccount {
  authService = inject(AuthService);
  user = this.authService.currentUser;
  private router = inject(Router);

  logout() {
    this.router.navigate(['']).then(() => this.authService.logout());
  }
}
