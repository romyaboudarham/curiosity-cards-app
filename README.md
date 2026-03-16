# Curiosity Cards - AI Flashcards App!

## [Try it Yourself!](https://curiosity-cards-app.vercel.app/)
## [Video Documentation](https://www.youtube.com/watch?time_continue=1&v=enKps2PSPw4&embeds_referring_euri=https%3A%2F%2Fwww.romyaboudarham.com%2F&source_ve_path=Mjg2NjY)

Instantly generates a deck of flashcards on any topic with features to organize and edit them

**Built With**
- Next.js
- Next.js API Routes
- React
- TypeScript
- Tailwind CSS
- OpenAI API
- Zod
- Figma Design System

## Getting Started

Start UI

```bash
# change directory into my-app
cd curiosity-cards-app

# install dependencies (if you haven't done yet)
npm install

# run application and view at http://localhost:3000/
npm run dev
```
---

## Design System
https://www.figma.com/design/55ZZEpMgA8KUjIGNv4ZcJd/CuriousityCards?node-id=38-186&t=FRmtNjNKHzT7C34O-1

Created Styling Tokens and Components

## How It Works

**User input → Next.js API route → OpenAI → Zod validation → localStorage → Study page**

The API route acts as a secure server-side layer — the OpenAI API key never reaches the browser.

Instead of prompting the model and hoping for consistent output, the route uses **OpenAI function calling** to enforce a strict JSON schema, guaranteeing structured responses every time:

```ts
functions: [{ name: 'create_deck', parameters: deckSchema }],
function_call: { name: 'create_deck' },
```

The response is then validated server-side with **Zod** before being returned to the client. Types are inferred directly from the schema — a single source of truth for both runtime validation and TypeScript types:

```ts
export const DeckSchema = z.object({ ... });
export type Deck = z.infer<typeof DeckSchema>;
```

Generated decks are persisted to **localStorage** and accessed by ID on the study page.
