import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    // API 키 확인
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not defined");
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
        temperature: 0.2,
        stream: true,
      }),
    });

    if (!response.ok || !response.body) {
      const errorData = await response.text();
      console.error("API request failed:", response.status, errorData);
      return NextResponse.json(
        { error: `API request failed: ${response.status}`, details: errorData },
        { status: response.status }
      );
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
  } catch (error) {
    console.error("Error in transform API:", error);
    return NextResponse.json(
      {
        error: String(error),
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
