import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-score',
  imports: [],
  templateUrl: './user-score.html',
  styleUrl: './user-score.css',
})
export class UserScore {
  @Input({required: true}) score? : number|string;
}
