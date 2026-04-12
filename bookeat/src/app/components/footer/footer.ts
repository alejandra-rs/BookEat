import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  links: string[] = ["lorem Ipsum", "lorm 2", "lorm 3"];
  contacts: string[] = ["Email: lorem@ipsum.com", "Tel: 123456789"];
}
