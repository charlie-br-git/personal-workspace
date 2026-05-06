import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  initial: T,
  isValid?: (v: unknown) => v is T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return initial;
      const parsed = JSON.parse(item) as unknown;
      if (isValid && !isValid(parsed)) return initial;
      return parsed as T;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore quota/private-browsing errors
    }
  }, [key, value]);

  return [value, setValue];
}
