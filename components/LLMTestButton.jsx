"use client";

import { useState } from "react";

export default function LLMTestButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const testLLM = async () => {
    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/test-llm");
      const data = await response.json();

      if (data.success) {
        setResult(JSON.stringify(data, null, 2));
        console.log("✅ LLM test successful:", data);
      } else {
        setResult(JSON.stringify(data, null, 2));
        console.log("⚠️ LLM test completed with info:", data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("❌ LLM test error:", err);
    } finally {
      setLoading(false);
    }
  };

  const testPostHogOnly = async () => {
    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/test-posthog-only");
      const data = await response.json();

      if (data.success) {
        setResult(JSON.stringify(data, null, 2));
        console.log("✅ PostHog test successful:", data);
      } else {
        setError(data.error || "Test failed");
        console.error("❌ PostHog test failed:", data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("❌ PostHog test error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <h3>🧪 Test PostHog LLM Analytics Integration</h3>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Test your PostHog integration with or without OpenAI calls
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={testLLM}
          disabled={loading}
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "14px",
          }}
        >
          {loading ? "Testing..." : "Test OpenAI + PostHog"}
        </button>

        <button
          onClick={testPostHogOnly}
          disabled={loading}
          style={{
            padding: "12px 24px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "14px",
          }}
        >
          {loading ? "Testing..." : "Test PostHog Only"}
        </button>
      </div>

      {error && (
        <div style={{ color: "red", marginBottom: "20px", textAlign: "left" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div style={{ textAlign: "left" }}>
          <h4>✅ Test Result:</h4>
          <pre
            style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "5px",
              overflow: "auto",
              fontSize: "12px",
            }}
          >
            {result}
          </pre>
        </div>
      )}

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        <p>
          <strong>What each test does:</strong>
        </p>
        <ul style={{ textAlign: "left", display: "inline-block" }}>
          <li>
            <strong>OpenAI + PostHog:</strong> Makes real LLM call + tracks in
            PostHog
          </li>
          <li>
            <strong>PostHog Only:</strong> Tests PostHog tracking without OpenAI
            costs
          </li>
          <li>Both tests will show up in your PostHog dashboard</li>
        </ul>
      </div>
    </div>
  );
}
