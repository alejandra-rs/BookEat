import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-user-score',
  imports: [],
  templateUrl: './user-score.component.html',
  styleUrl: './user-score.component.css',
})
export class UserScore {
  score = input<number | string>();
  size = input<string>('1.2rem');
}
