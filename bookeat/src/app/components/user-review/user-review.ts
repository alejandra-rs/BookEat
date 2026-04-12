import {Component, input} from '@angular/core';
import {UserScore} from '../user-score/user-score';
import {ReviewWithUser} from '../../models/review.model';

@Component({
  selector: 'app-user-review',
  imports: [UserScore],
  templateUrl: './user-review.html',
  styleUrl: './user-review.css',
})
export class UserReview {
  review = input<ReviewWithUser>()
}
