import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/jsonserver/auth.service';
import { RestaurantProfile } from '../../models/auth.model';
import { firstValueFrom } from 'rxjs';
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

  myRestaurantId = signal<number | null>(null);

  constructor() {
    const u = this.authService.currentUser();
    if (u?.role === 'RESTAURANT') {
      firstValueFrom(this.authService.getRestaurantById(Number(u.id)))
        .then(profile => {
          if (profile) this.myRestaurantId.set(Number((profile as RestaurantProfile).restaurantId));
        })
        .catch(() => {});
    }
  }

  logout() {
    this.router.navigate(['']).then(() => this.authService.logout());
  }
}
