import { NextRequest, NextResponse } from "next/server";
import { getProductRecommendations } from "../../../lib/ai-recommendations";
import { createUserPreferenceEmbedding } from "../../../lib/embeddings";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userPreferences, currentProducts, budget, userId } = body;

    if (!userPreferences || !currentProducts) {
      return NextResponse.json(
        { error: "userPreferences and currentProducts are required" },
        { status: 400 }
      );
    }

    // Create embedding for user preferences
    const userEmbedding = await createUserPreferenceEmbedding(
      userPreferences,
      userId
    );

    // Get AI recommendations
    const recommendations = await getProductRecommendations({
      userPreferences,
      currentProducts,
      budget,
    });

    return NextResponse.json({
      success: true,
      recommendations,
      userEmbedding: userEmbedding.slice(0, 10), // Return first 10 dimensions for demo
    });
  } catch (error) {
    console.error("Error in AI recommendations API:", error);
    return NextResponse.json(
      { error: "Failed to get recommendations" },
      { status: 500 }
    );
  }
}
