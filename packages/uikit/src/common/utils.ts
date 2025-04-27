import { Children, ReactElement, ReactNode } from "react";

export function omitKey<T extends Record<string, unknown>, K extends keyof T>(obj: T, keyToOmit: K): Omit<T, K> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [keyToOmit]: omitted, ...rest } = obj;
  return rest;
}

export function sleep(ms = 1_000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getSlotElements<T>(children: ReactNode, type: React.FC<T>) {
  const slots = Children.toArray(children) as ReactElement<T | unknown>[];
  return slots.filter((child) => child.type === type) as ReactElement<T>[];
}

export function sortObjectByKeys<T extends Record<string, unknown>>(obj: T): T {
  return Object.keys(obj).sort((a, b) => a.localeCompare(b, navigator.language, { numeric: true})).reduce((acc, cur) => ({
    ...acc,
    [cur]: obj[cur],
  }), {} as T);
}

export const noop = () => {};

export const throttle = <R, A extends unknown[]>(
  fn: (...args: A) => R,
  delay: number
): [(...args: A) => R | undefined, () => void, () => void] => {
  let wait = false;
  let timeout: undefined | number;
  let cancelled = false;

  function resetWait() {
    wait = false;
  }

  return [
    (...args: A) => {
      if (cancelled) return undefined;
      if (wait) return undefined;

      const val = fn(...args);

      wait = true;

      timeout = window.setTimeout(resetWait, delay);

      return val;
    },
    () => {
      cancelled = true;
      clearTimeout(timeout);
    },
    () => {
      clearTimeout(timeout);
      resetWait();
    },
  ];
};