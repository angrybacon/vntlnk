'use client';

import {
  createContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

export const ProgressContext = createContext<{
  isLoading: boolean;
  setIsLoading(value: boolean): void;
}>({ isLoading: false, setIsLoading() {} });

export const ProgressProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(
    () => ({
      isLoading,
      setIsLoading: (value: boolean) => setIsLoading(value),
    }),
    [isLoading],
  );

  return <ProgressContext.Provider children={children} value={value} />;
};
