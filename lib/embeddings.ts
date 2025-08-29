import { openai } from "./posthog-openai";
import { phClient } from "./posthog-openai";

interface EmbeddingRequest {
  text: string;
  userId?: string;
  context?: string;
}

export async function createEmbedding(request: EmbeddingRequest) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: request.text,
    });

    const embedding = response.data[0]?.embedding;

    if (embedding) {
      // Capture embedding creation event in PostHog
      phClient.capture({
        distinctId: request.userId || "anonymous",
        event: "embedding_created",
        properties: {
          text_length: request.text.length,
          context: request.context || "general",
          embedding_dimensions: embedding.length,
          model: "text-embedding-ada-002",
        },
      });

      return embedding;
    }

    throw new Error("No embedding generated");
  } catch (error) {
    console.error("Error creating embedding:", error);

    // Capture error event in PostHog
    phClient.capture({
      distinctId: request.userId || "anonymous",
      event: "embedding_error",
      properties: {
        error: error instanceof Error ? error.message : "Unknown error",
        text_length: request.text.length,
        context: request.context || "general",
      },
    });

    throw error;
  }
}

export async function createProductEmbedding(productData: {
  name: string;
  description: string;
  category: string;
  price: number;
  userId?: string;
}) {
  const combinedText = `${productData.name} ${productData.description} ${productData.category}`;

  return createEmbedding({
    text: combinedText,
    userId: productData.userId,
    context: "product_embedding",
  });
}

export async function createUserPreferenceEmbedding(
  preferences: string[],
  userId?: string
) {
  const combinedText = preferences.join(" ");

  return createEmbedding({
    text: combinedText,
    userId,
    context: "user_preferences",
  });
}

// Utility function to calculate similarity between embeddings
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Embeddings must have the same dimensions");
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
