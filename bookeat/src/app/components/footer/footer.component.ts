import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class Footer {
  links: string[] = ["Lorem Ipsum Dolor 1", "Lorem Ipsum Dolor 2", "Lorem Ipsum Dolor 3"];
  contacts: string[] = ["Email: lorem@ipsum.com", "Tel: 123456789"];
}
