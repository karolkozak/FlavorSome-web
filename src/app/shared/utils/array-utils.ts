export function inArray<T>(needle: T, haystack: T[]): boolean {
  return haystack && haystack.indexOf(needle) >= 0;
}
