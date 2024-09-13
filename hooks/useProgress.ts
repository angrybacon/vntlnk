import { useContext } from 'react';

import { ProgressContext } from '~/providers/Progress';

export const useProgress = () => useContext(ProgressContext);
