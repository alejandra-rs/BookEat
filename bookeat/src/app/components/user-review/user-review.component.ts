import {Component, input} from '@angular/core';
import {UserScore} from '../user-score/user-score.component';
import {ReviewWithUser} from '../../models/review.model';

@Component({
  standalone: true,
  selector: 'app-user-review',
  imports: [UserScore],
  templateUrl: './user-review.component.html',
  styleUrl: './user-review.component.css',
})
export class UserReview {
  review = input<ReviewWithUser>()
}
