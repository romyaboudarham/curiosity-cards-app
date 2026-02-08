import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { numCards, topic } = await req.json();

    const prompt = `
    For flashcard requests, use the following rules:

- Return ONLY the flashcards.
- Do NOT include any introduction, explanation, headings, numbering, or extra text.
- Each flashcard must test recall.
- The FRONT must be a short label or term (1–5 words), not a question or full sentence.
- The BACK must be the concise answer or definition.
- Use a consistent recall direction for all cards.

Format EXACTLY as:
front:back;front:back;front:back

Formatting rules:
- Use a SINGLE line only.
- Do NOT include spaces or line breaks anywhere in the output.

If the topic is a language:
- Do NOT use the native script.
- Use English-alphabet transliteration ONLY.
- Put the target-language term on the FRONT and the English meaning on the BACK.

Create ${numCards} flashcards of common ${topic} words.

If the output does not exactly match the required format, regenerate it.`;
    

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You generate concise flashcards." },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      return NextResponse.json(
        { error: errorText },
        { status: aiResponse.status }
      );
    }

    const aiData = await aiResponse.json();
    const flashcards = aiData.choices[0].message.content;

    return NextResponse.json({ flashcards });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate flashcards" },
      { status: 500 }
    );
  }
}
