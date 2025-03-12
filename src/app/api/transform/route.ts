import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    // API 키 확인
    if (!process.env.TOGETHER_API_KEY) {
      console.error("TOGETHER_API_KEY is not defined");
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.together.xyz/v1/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/Mistral-7B-Instruct-v0.1",
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("API request failed:", response.status, errorData);
      return NextResponse.json(
        { error: `API request failed: ${response.status}`, details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
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
