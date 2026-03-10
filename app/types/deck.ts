import { z } from "zod";

export const CardSchema = z.object({
    front: z.string().min(1),
    back: z.string().min(1),
});

export const DeckSchema = z.object({
    title: z.string().min(1),
    cards: z.array(CardSchema).min(1),
});

export type Card = z.infer<typeof CardSchema>;
export type Deck = z.infer<typeof DeckSchema>;