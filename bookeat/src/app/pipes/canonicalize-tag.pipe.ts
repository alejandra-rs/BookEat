import {Pipe, PipeTransform} from '@angular/core';

export function areSameTag(left: string, right: string): boolean {
  return left.toLowerCase() === right.toLowerCase();
}

@Pipe({
  name: 'canonicalizeTag',
})
export class CanonicalizeTagPipe implements PipeTransform {
  transform(rawTag: string, availableTags: string[]): string {
    const trimmedTag = rawTag.trim();
    if (!trimmedTag) return '';
    const match = availableTags.find(tag => areSameTag(tag, trimmedTag));
    return match ?? toTitleCase(trimmedTag);
  }
}

export function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter((part) => part.length > 0)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
