export function omitKey<T extends Record<string, unknown>, K extends keyof T>(obj: T, keyToOmit: K): Omit<T, K> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [keyToOmit]: omitted, ...rest } = obj;
  return rest;
}
