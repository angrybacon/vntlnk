import { useEffect, useState } from 'react';

export const useDebounce = (input: string, delay = 300) => {
  const [value, setValue] = useState(input);
  const [valueSafe, setValueSafe] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => setValueSafe(value.trim()), delay);
    return () => clearTimeout(handler);
  }, [delay, value]);

  return [value, setValue, valueSafe] as const;
};
