import { NextRequest, NextResponse } from "next/server";
import { phClient } from "../../../lib/posthog-openai";

export async function GET(request: NextRequest) {
  try {
    // Test PostHog connection and tracking
    const testEvent = await phClient.capture({
      distinctId: "test-user-" + Date.now(),
      event: "posthog_test_event",
      properties: {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        testType: "posthog_only",
        message: "Testing PostHog tracking without OpenAI",
      },
    });

    // Test a custom event that mimics LLM tracking
    const llmEvent = await phClient.capture({
      distinctId: "test-user-" + Date.now(),
      event: "llm_generation_attempted",
      properties: {
        timestamp: new Date().toISOString(),
        model: "gpt-3.5-turbo",
        tokens_requested: 50,
        status: "quota_exceeded",
        error_message: "OpenAI quota exceeded - but PostHog tracking works!",
        cost_estimate: 0.001,
      },
    });

    return NextResponse.json({
      success: true,
      message: "PostHog tracking test successful",
      posthogTestEvent: testEvent,
      llmEvent: llmEvent,
      timestamp: new Date().toISOString(),
      note: "Check your PostHog dashboard - you should see these events!",
    });
  } catch (error) {
    console.error("Error in PostHog test API:", error);
    return NextResponse.json(
      {
        error: "Failed to test PostHog",
        details: error instanceof Error ? error.message : "Unknown error",
        posthogWorking: false,
      },
      { status: 500 }
    );
  }
}
