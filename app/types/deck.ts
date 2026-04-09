import { z } from 'zod';

export const CardSchema = z.object({
  id: z.string().min(1),
  front: z.string().min(1),
  back: z.string().min(1),
});

export const DeckSchema = z.object({
  id: z.string().min(1),
  createdAt: z.string().min(1),
  title: z.string().min(1),
  prompt: z.string().optional(),
  cards: z.array(CardSchema).min(1),
});

export type Card = z.infer<typeof CardSchema>;
export type Deck = z.infer<typeof DeckSchema>;
