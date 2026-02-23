# Curiosity Cards - AI Flashcards App!

## [Try it Yourself!](https://curiosity-cards-app.vercel.app/)
## [Video Documentation](https://www.youtube.com/watch?time_continue=1&v=enKps2PSPw4&embeds_referring_euri=https%3A%2F%2Fwww.romyaboudarham.com%2F&source_ve_path=Mjg2NjY)

Tool instantly generating a deck of flashcards on any topic with features to organize and edit them

**Tools**
- Next.js
- Next.js API Routes
- Node.js
- React
- TypeScript
- Tailwind CSS
- OpenAI API
- Figma Design System

## Design System
https://www.figma.com/design/55ZZEpMgA8KUjIGNv4ZcJd/CuriousityCards?node-id=38-186&t=FRmtNjNKHzT7C34O-1

Created Tokens and Components

## Frontend

Start UI

```bash
# change directory into my-app
cd curiosity-cards-app

# install dependencies (if you haven't done yet)
npm install

# run application and view at http://localhost:3000/
npm run dev
```

- Collects user input for flashcard generation
- Sends requests to the backend API
- Parses and displays generated flashcards
- Manages client-side state and interactions

---

## Backend

The backend is implemented using **Next.js API routes** and acts as a secure layer between the frontend and the LLM.

It:
- Constructs structured prompts from user input
- Calls the OpenAI API to generate flashcard content
- Returns consistently formatted results to the client

Sensitive logic and API keys are handled server-side using environment variables.
