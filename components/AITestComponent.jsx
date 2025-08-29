"use client";

import { useState } from "react";

export default function AITestComponent() {
  const [userPreferences, setUserPreferences] = useState("");
  const [currentProducts, setCurrentProducts] = useState("");
  const [budget, setBudget] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRecommendations("");

    try {
      const response = await fetch("/api/ai-recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userPreferences: userPreferences.split(",").map((p) => p.trim()),
          currentProducts: currentProducts.split(",").map((p) => p.trim()),
          budget: budget ? parseInt(budget) : undefined,
          userId: "test-user-123",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setRecommendations(data.recommendations);
      } else {
        setError(data.error || "Failed to get recommendations");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>🤖 AI Product Recommendations Test</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            User Preferences (comma-separated):
          </label>
          <input
            type="text"
            value={userPreferences}
            onChange={(e) => setUserPreferences(e.target.value)}
            placeholder="e.g., wireless, noise-cancelling, comfortable"
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Current Products (comma-separated):
          </label>
          <input
            type="text"
            value={currentProducts}
            onChange={(e) => setCurrentProducts(e.target.value)}
            placeholder="e.g., Sony WH-1000XM4, Bose QC35"
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Budget (optional):
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="e.g., 300"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Getting Recommendations..." : "Get AI Recommendations"}
        </button>
      </form>

      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {recommendations && (
        <div>
          <h3>🎯 AI Recommendations:</h3>
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "5px",
              whiteSpace: "pre-wrap",
              fontFamily: "monospace",
            }}
          >
            {recommendations}
          </div>
        </div>
      )}

      <div style={{ marginTop: "30px", fontSize: "14px", color: "#666" }}>
        <h4>💡 Example Input:</h4>
        <p>
          <strong>Preferences:</strong> wireless, noise-cancelling, comfortable
        </p>
        <p>
          <strong>Current Products:</strong> Sony WH-1000XM4, Bose QC35
        </p>
        <p>
          <strong>Budget:</strong> 300
        </p>
      </div>
    </div>
  );
}
