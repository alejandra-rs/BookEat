import {Component, afterNextRender, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WriteReviewPopup} from './components/write-review-popup/write-review-popup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Header} from './components/header/header.component';
import {EditProperty} from './components/edit-property/edit-property.component';
import {CategoriesService} from './services/firebase/categories.service';
import {UserReview} from './components/user-review/user-review.component';
import {Footer} from './components/footer/footer.component';
import {Toast} from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bookeat');

  constructor() {
    inject(CategoriesService).load();
  }
}
