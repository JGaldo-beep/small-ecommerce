import { NextRequest, NextResponse } from "next/server";
import { openai, testPostHogConnection } from "../../../lib/posthog-openai";

export async function GET(request: NextRequest) {
  try {
    // Test PostHog connection first
    const posthogWorking = await testPostHogConnection();

    // Make a simple LLM call to trigger PostHog tracking
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. Give a short, friendly response.",
        },
        {
          role: "user",
          content:
            "Say hello and confirm you're working with PostHog tracking.",
        },
      ],
      max_tokens: 50,
    });

    const response = completion.choices[0]?.message?.content || "No response";

    return NextResponse.json({
      success: true,
      message: "LLM call successful with PostHog tracking",
      response,
      posthogWorking,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in test LLM API:", error);
    return NextResponse.json(
      {
        error: "Failed to test LLM",
        details: error instanceof Error ? error.message : "Unknown error",
        posthogWorking: false,
      },
      { status: 500 }
    );
  }
}
