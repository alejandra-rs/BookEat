import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-score',
  imports: [],
  templateUrl: './user-score.html',
  styleUrl: './user-score.css',
})
export class UserScore {
  score = input<number | string>();
  size = input<string>('1.2rem');
}
