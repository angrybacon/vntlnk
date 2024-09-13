import { z } from 'zod';

const CardSchema = z.object({
  id: z.string(),
  image_uris: z.object({ art_crop: z.string(), small: z.string() }).nullish(),
  object: z.literal('card'),
  name: z.string(),
});

export type Card = z.infer<typeof CardSchema>;

const WarningsSchema = z
  .string()
  .array()
  .nullish()
  .transform((values) => (values || []).map((text, id) => ({ id, text })));

export type Warning = z.infer<typeof WarningsSchema>[number];

const ErrorSchema = z.object({
  details: z.string(),
  object: z.literal('error'),
  warnings: WarningsSchema,
});

const ListSchema = z.object({
  data: CardSchema.array(),
  has_more: z.boolean(),
  object: z.literal('list'),
  total_cards: z.number().nullish(),
  warnings: WarningsSchema,
});

const API = 'https://api.scryfall.com/cards/search';

export const scry = async (options: { extra: string; query: string }) => {
  const { extra, query } = options;
  const pattern = query.split('').map((character) => `\\b${character}\\w*`);
  const parameters: string = Object.entries({
    order: 'color',
    q: `name:\/^${pattern.join('\\s')}$\/ ${extra}`,
  })
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  const response = await fetch(`${API}?${parameters}`);
  const json = await response.json();
  const cards = z
    .discriminatedUnion('object', [ErrorSchema, ListSchema])
    .parse(json);
  return cards;
};
