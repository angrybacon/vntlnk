import { useEffect, useState } from 'react';

export const useDebounce = <T>(input: T, delay: number): T => {
  const [value, setValue] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => setValue(input), delay);
    return () => clearTimeout(handler);
  }, [delay, input]);

  return value;
};
