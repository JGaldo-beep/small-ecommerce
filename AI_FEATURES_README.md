# AI Features with PostHog LLM Analytics

This project now includes AI-powered features with PostHog LLM Analytics integration for tracking and monitoring.

## 🚀 **Setup Required**

### Environment Variables

Create a `.env.local` file with:

```bash
# PostHog Configuration
NEXT_PUBLIC_POSTHOG_API_KEY=your_posthog_api_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Existing Sanity & Stripe configs...
```

## 📊 **Features Implemented**

### 1. **AI Product Recommendations**

- **File**: `lib/ai-recommendations.ts`
- **API**: `POST /api/ai-recommendations`
- **Usage**: Get personalized product suggestions based on user preferences

### 2. **Product Analysis**

- **Function**: `analyzeProductDescription()`
- **Purpose**: Analyze product descriptions for insights and SEO optimization

### 3. **Embeddings with PostHog Tracking**

- **File**: `lib/embeddings.ts`
- **Features**:
  - Product embeddings
  - User preference embeddings
  - Cosine similarity calculations
  - PostHog event tracking for all operations

## 🔧 **How to Use**

### Get AI Recommendations

```typescript
import { getProductRecommendations } from "../lib/ai-recommendations";

const recommendations = await getProductRecommendations({
  userPreferences: ["wireless", "noise-cancelling", "comfortable"],
  currentProducts: ["Sony WH-1000XM4", "Bose QC35"],
  budget: 300,
});
```

### Create Embeddings

```typescript
import { createProductEmbedding } from "../lib/embeddings";

const embedding = await createProductEmbedding({
  name: "Wireless Headphones",
  description: "Premium noise-cancelling wireless headphones",
  category: "Audio",
  price: 299,
  userId: "user123",
});
```

### API Endpoint

```bash
POST /api/ai-recommendations
{
  "userPreferences": ["wireless", "noise-cancelling"],
  "currentProducts": ["Product A", "Product B"],
  "budget": 300,
  "userId": "user123"
}
```

## 📈 **PostHog Analytics**

All AI operations are automatically tracked in PostHog:

- **LLM calls** (completions, embeddings)
- **Token usage** and costs
- **Response times** and performance
- **Error tracking** and debugging
- **User behavior** patterns

## 🎯 **Next Steps**

1. **Add your API keys** to `.env.local`
2. **Test the AI features** with sample data
3. **Monitor analytics** in your PostHog dashboard
4. **Customize prompts** for your specific use case
5. **Integrate with your UI** components

## 🔒 **Security Notes**

- API keys are server-side only
- User data is anonymized in PostHog
- Embeddings are processed securely
- Rate limiting should be implemented for production
