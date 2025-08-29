import { openai } from "./posthog-openai";

interface ProductRecommendationRequest {
  userPreferences: string;
  currentProducts: string[];
  budget?: number;
}

export async function getProductRecommendations(
  request: ProductRecommendationRequest
) {
  try {
    const prompt = `Based on the following user preferences and current products, suggest 3-5 product recommendations:

User Preferences: ${request.userPreferences}
Current Products: ${request.currentProducts.join(", ")}
Budget: ${request.budget ? `$${request.budget}` : "No budget specified"}

Please provide:
1. Product names
2. Brief descriptions
3. Why these would be good recommendations
4. Estimated price range

Format as a JSON response.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful ecommerce product recommendation assistant. Provide relevant, helpful suggestions based on user preferences.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return (
      completion.choices[0]?.message?.content || "No recommendations available"
    );
  } catch (error) {
    console.error("Error getting AI recommendations:", error);
    throw error;
  }
}

export async function analyzeProductDescription(description: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a product analysis expert. Analyze product descriptions and provide insights.",
        },
        {
          role: "user",
          content: `Analyze this product description and provide insights on:
1. Key features
2. Target audience
3. Potential improvements
4. SEO optimization suggestions

Description: ${description}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 400,
    });

    return completion.choices[0]?.message?.content || "Analysis not available";
  } catch (error) {
    console.error("Error analyzing product description:", error);
    throw error;
  }
}
