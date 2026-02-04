import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { numCards, topic } = await req.json();

    const prompt = `
    Return ONLY the flashcards.
    Do NOT include any introduction, explanation, headings, numbering, or questions.
    
    These are STUDY FLASHCARDS.
    Format EXACTLY as:
    front:back;front:back;...
    
    Rules:
    - Each flashcard must test recall.
    - The FRONT must be a short label or term, NOT a full sentence or question.
    - The BACK must be the concise answer.
    - Choose the most natural recall direction for the topic.
    - If one side is symbolic and the other is verbal, the symbolic side MUST be on the BACK.
    - Keep front side minimal (ideally 1-5 words).
    
    Create ${numCards} flashcards about ${topic}.
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
