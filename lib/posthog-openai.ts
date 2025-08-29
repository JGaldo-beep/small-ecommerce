import { OpenAI } from "@posthog/ai";
import { PostHog } from "posthog-node";

// Validate environment variables
const posthogApiKey = process.env.NEXT_PUBLIC_POSTHOG_API_KEY;
const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
const openaiApiKey = process.env.OPENAI_API_KEY;

if (!posthogApiKey) {
  console.warn(
    "⚠️ NEXT_PUBLIC_POSTHOG_API_KEY is missing. LLM analytics won't work."
  );
}

if (!openaiApiKey) {
  console.warn("⚠️ OPENAI_API_KEY is missing. OpenAI calls won't work.");
}

// Initialize PostHog client
const phClient = new PostHog(posthogApiKey || "test-key", {
  host: posthogHost,
  flushAt: 1, // For development - flush immediately
  flushInterval: 0,
});

// Initialize OpenAI client with PostHog integration
export const openai = new OpenAI({
  apiKey: openaiApiKey || "test-key",
  posthog: phClient,
});

// Export PostHog client for direct use if needed
export { phClient };

// Cleanup function to shutdown PostHog client
export const shutdownPostHog = async () => {
  if (phClient) {
    await phClient.shutdown();
  }
};

// Test function to verify PostHog is working
export const testPostHogConnection = async () => {
  try {
    if (posthogApiKey) {
      await phClient.capture({
        distinctId: "test-user",
        event: "posthog_connection_test",
        properties: {
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV,
        },
      });
      console.log("✅ PostHog connection test successful");
      return true;
    } else {
      console.log("⚠️ PostHog API key missing, skipping connection test");
      return false;
    }
  } catch (error) {
    console.error("❌ PostHog connection test failed:", error);
    return false;
  }
};
