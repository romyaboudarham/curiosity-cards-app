// app/api/generate-flashcards/route.ts
import { NextResponse } from 'next/server';
import { DeckSchema, CardSchema } from '@/app/types/deck';

export async function POST(req: Request) {
  try {
    const { numCards, topic } = await req.json();

    // 1. Define the schema for OpenAI
    const deckSchema = {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Concise descriptive deck title (3-6 words)',
        },
        cards: {
          type: 'array',
          description: 'Array of flashcards',
          items: {
            type: 'object',
            properties: {
              front: {
                type: 'string',
                description: 'Short recall prompt (1-5 words)',
              },
              back: { type: 'string', description: 'Concise answer' },
            },
            required: ['front', 'back'],
          },
          minItems: numCards,
        },
      },
      required: ['title', 'cards'],
    };

    // 2. Call the OpenAI API with tool_choice enforcement
    const aiResponse = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You generate concise flashcards.' },
            {
              role: 'user',
              content: `Generate ${numCards} flashcards about "${topic}".`,
            },
          ],
          temperature: 0.4,
          tools: [
            {
              type: 'function',
              function: {
                name: 'create_deck',
                description: 'Return a flashcard deck',
                parameters: deckSchema,
              },
            },
          ],
          tool_choice: { type: 'function', function: { name: 'create_deck' } },
        }),
      }
    );

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      return NextResponse.json(
        { error: errorText },
        { status: aiResponse.status }
      );
    }

    const aiData = await aiResponse.json();

    // 3. Extract structured deck object
    const toolCall = aiData.choices[0].message.tool_calls?.[0];
    if (!toolCall || !toolCall.function.arguments) {
      return NextResponse.json(
        { error: 'AI did not return deck' },
        { status: 500 }
      );
    }

    const rawJSON = JSON.parse(toolCall.function.arguments);

    // 4. Add IDs and timestamp to deck and cards
    const deck = DeckSchema.parse({
      ...rawJSON,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      cards: rawJSON.cards.map((c: any) => ({
        ...c,
        id: crypto.randomUUID(),
      })),
    });

    // 5. Return the fully-formed deck
    return NextResponse.json({ deck });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to generate flashcards' },
      { status: 500 }
    );
  }
}
