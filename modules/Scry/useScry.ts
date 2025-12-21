import { useEffect, useState } from 'react';

import { scry } from '~/modules/Scry/scry';
import { type Card as CardModel, type Warning } from '~/modules/Scry/typings';

type Props = Omit<Parameters<typeof scry>[0], 'query'> & {
  query: string | (() => string);
};

export const useScry = ({ extra, order, query: queryInput, unique }: Props) => {
  const [cards, setCards] = useState<CardModel[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [warnings, setWarnings] = useState<Warning[]>([]);

  useEffect(() => {
    let should = true;
    const query = typeof queryInput === 'string' ? queryInput : queryInput();
    if (query.length > 0) {
      setIsLoading(true);
      scry({ extra, order, query, unique }).then((response) => {
        if (should) {
          setError(null);
          setWarnings(response.warnings);
          if (response.object === 'list') {
            // TODO Handle pagination
            setCards(response.data);
          } else if (response.object === 'error') {
            setCards([]);
            setError(response.details);
          }
        }
        setIsLoading(false);
      });
    }
    return () => {
      should = false;
    };
  }, [extra, order, queryInput, unique]);

  return { cards, error, isLoading, warnings };
};
