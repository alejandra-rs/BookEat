import {Component, afterNextRender, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WriteReviewPopup} from './components/write-review-popup/write-review-popup';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Header} from './components/header/header';
import {EditProperty} from './components/edit-property/edit-property';
import {CategoriesService} from './services/jsonserver/categories.service';
import {UserReview} from './components/user-review/user-review';
import {Footer} from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bookeat');

  constructor() {
    inject(CategoriesService).load();
  }
}
