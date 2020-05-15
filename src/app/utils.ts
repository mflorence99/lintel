/**
 * Is this object empty?
 */
export function deduplicateArray(array: string[]): string[] {
  return array
    .slice()
    .sort()
    .filter((item, idx, array) => (idx === 0) || (array[idx - 1] !== item));
}

/**
 * Is this object empty?
 */
export function isObjectEmpty(obj: Record<string, any>): boolean {
  return (obj === null) || (obj === undefined) || (Object.getOwnPropertyNames(obj).length === 0);
}

/**
 * Run code on next tick
 */
export function nextTick(f: Function): void {
  setTimeout(f, 0);
}
