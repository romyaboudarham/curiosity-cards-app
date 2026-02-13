import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { numCards, topic } = await req.json();

    const prompt = `
    Return ONLY flashcards.

    Format EXACTLY as:
    front:back;front:back;front:back

    Rules:
    - Single line only; no spaces or line breaks.
    - No intro, explanations, headings, or numbering.
    - Each card must test recall.
    - FRONT = short term or label (1–5 words).
    - BACK = concise answer.
    - Use one consistent recall direction.

    Topic-specific rules:
    - Language topics: use English-alphabet transliteration only (no native script); target term on FRONT, English meaning on BACK.
    - Quote/title topics: FRONT is the quote or title; BACK is the source.

    Create ${numCards} flashcards about ${topic}.
    Regenerate if the format is not followed exactly.`;
    

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
