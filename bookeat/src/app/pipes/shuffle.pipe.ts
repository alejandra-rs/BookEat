import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shuffle',
  pure: true,
})
export class ShufflePipe implements PipeTransform {
  transform<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
  }
}
