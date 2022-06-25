// like object entries, but better typed
export function entries<O>(o: O) {
  return Object.entries(o) as [keyof O, O[keyof O]][];
}
