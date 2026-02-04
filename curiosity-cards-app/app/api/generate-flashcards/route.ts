import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { numCards, topic } = await req.json();

    const prompt = `
    Return ONLY the flashcards.
    Do NOT include an introduction, explanation, or numbering.
    Format EXACTLY as:
    word:definition;word:definition;...

    Make ${numCards} word:definition pairs of ${topic}.
    `;

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
