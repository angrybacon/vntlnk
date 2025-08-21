import { z } from 'zod';

import { ErrorSchema, ListSchema } from '~/modules/Scry/typings';

const API = {
  SEARCH: 'https://api.scryfall.com/cards/search',
} as const;

/**
 * Scry for a query with the provided options.
 *
 * See https://scryfall.com/docs/api
 */
export const scry = async (options: {
  /** Additional syntax to append at the end of the query */
  extra?: string;
  order?: 'color';
  query: string;
  unique?: 'art' | 'cards' | 'prints';
}) => {
  const { extra = '', order, query, unique } = options;
  const parameters = new URLSearchParams({
    q: `${query} ${extra}`,
    ...(order && { order }),
    ...(unique && { unique }),
  }).toString();
  const response = await fetch(`${API.SEARCH}?${parameters}`);
  const json = await response.json();
  const cards = z
    .discriminatedUnion('object', [ErrorSchema, ListSchema])
    .parse(json);
  return cards;
};
