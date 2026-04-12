export function areSameTag(left: string, right: string): boolean {
  return left.toLowerCase() === right.toLowerCase();
}

export function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter((part) => part.length > 0)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function canonicalizeTag(rawTag: string, availableTags: string[]): string {
  const trimmedTag = rawTag.trim();
  if (!trimmedTag) return '';

  const matchingSuggestion = availableTags.find((tag) => areSameTag(tag, trimmedTag));
  return matchingSuggestion ?? toTitleCase(trimmedTag);
}
