import { z } from 'zod';

const CardSchema = z.object({
  id: z.string(),
  image_uris: z.object({ art_crop: z.string(), small: z.string() }).nullish(),
  object: z.literal('card'),
  name: z.string(),
  set: z.string(),
});

export type Card = z.infer<typeof CardSchema>;

const WarningsSchema = z
  .string()
  .array()
  .nullish()
  .transform((values) => (values || []).map((text, id) => ({ id, text })));

export type Warning = z.infer<typeof WarningsSchema>[number];

export const ErrorSchema = z.object({
  details: z.string(),
  object: z.literal('error'),
  warnings: WarningsSchema,
});

export const ListSchema = z.object({
  data: CardSchema.array(),
  has_more: z.boolean(),
  object: z.literal('list'),
  total_cards: z.number().nullish(),
  warnings: WarningsSchema,
});
