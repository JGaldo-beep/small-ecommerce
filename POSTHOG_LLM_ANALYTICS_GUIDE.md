# 🚀 PostHog LLM Analytics Complete Guide

## 📋 Table of Contents

1. [Overview](#overview)
2. [How It Works](#how-it-works)
3. [Complete Data Flow](#complete-data-flow)
4. [Code Implementation](#code-implementation)
5. [What Gets Tracked](#what-gets-tracked)
6. [Dashboard Features](#dashboard-features)
7. [Setup Instructions](#setup-instructions)
8. [Testing & Debugging](#testing--debugging)
9. [Common Issues](#common-issues)
10. [Best Practices](#best-practices)

---

## 🎯 Overview

PostHog LLM Analytics automatically tracks every OpenAI API call in your application, providing real-time insights into:

- **Token usage** and costs
- **Performance metrics** (latency, success rates)
- **Model usage patterns**
- **User behavior** with AI features
- **Cost optimization** opportunities

The beauty is: **Zero manual tracking required** - PostHog captures everything automatically!

---

## 🔍 How It Works

### The Core Concept

PostHog acts as an **invisible layer** that intercepts every OpenAI API call, captures metadata, and sends it to your PostHog dashboard for analysis.

### Key Components

1. **PostHog SDK** - Captures events and metadata
2. **OpenAI Integration** - Wraps OpenAI client with PostHog tracking
3. **Automatic Interception** - Every API call goes through PostHog first
4. **Real-time Dashboard** - See analytics as they happen

---

## 🔄 Complete Data Flow

### When You Press the Button:

```
Button Click → Frontend → API Route → PostHog Integration → OpenAI API → PostHog Dashboard
```

### Detailed Step-by-Step:

#### Step 1: Button Click (Frontend)

```javascript
// In LLMTestButton.jsx
const testLLM = async () => {
  const response = await fetch("/api/test-llm");
  // ... handle response
};
```

#### Step 2: API Route Execution

```javascript
// In /api/test-llm/route.ts
export async function GET(request: NextRequest) {
  // This is where the magic happens!
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [...],
    max_tokens: 50,
  });
}
```

#### Step 3: PostHog Integration (The Magic!)

```javascript
// In lib/posthog-openai.ts
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  posthog: phClient, // ← This enables automatic tracking
});
```

---

## 💻 Code Implementation

### 1. PostHog Client Setup

```javascript
// lib/posthog-openai.ts
import { PostHog } from "posthog-node";

const phClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  flushAt: 1, // Send immediately (for development)
  flushInterval: 0,
});
```

### 2. OpenAI with PostHog Integration

```javascript
import { OpenAI } from "@posthog/ai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  posthog: phClient, // ← This enables automatic tracking
});
```

### 3. Using the Integrated Client

```javascript
// Every call is automatically tracked!
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello!" }],
  max_tokens: 100,
});
```

---

## 📊 What Gets Tracked Automatically

### PostHog Captures:

1. **LLM Generation Event** - Every OpenAI API call
2. **Token Usage** - Input/output tokens consumed
3. **Cost Tracking** - Estimated cost per request
4. **Latency** - How long the request took
5. **Model Information** - Which model was used
6. **Request Details** - Messages, parameters, etc.
7. **User Context** - Who made the request
8. **Timestamp** - When it happened
9. **Success/Failure Status** - API response status
10. **Error Details** - If something goes wrong

### Example Event Data:

```json
{
  "event": "llm_generation",
  "properties": {
    "model": "gpt-3.5-turbo",
    "input_tokens": 25,
    "output_tokens": 50,
    "total_tokens": 75,
    "estimated_cost": 0.0015,
    "latency_ms": 1250,
    "status": "success",
    "user_id": "user_123",
    "timestamp": "2025-08-29T03:30:30.000Z"
  }
}
```

---

## 🎛️ Dashboard Features

### In "Generations" Tab:

- **Event List** - All LLM calls with details
- **Model Breakdown** - Usage by model type
- **Cost Analysis** - Spending trends over time
- **Performance Metrics** - Latency and success rates
- **User Activity** - Who's using AI features

### In "Dashboard" Tab:

- **Total LLM Calls** over time
- **Cost Trends** by model and date
- **Token Usage** patterns
- **Performance Charts** (latency, success rates)
- **Custom Insights** you can create

### In "Traces" Tab:

- **Request Tracing** - Detailed call chains
- **Error Analysis** - Failed requests and why
- **Performance Bottlenecks** - Slow requests

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
npm install @posthog/ai posthog-node
```

### 2. Environment Variables

```bash
# .env.local
NEXT_PUBLIC_POSTHOG_API_KEY=your_posthog_api_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Create PostHog Client

```javascript
// lib/posthog-openai.ts
import { PostHog } from "posthog-node";
import { OpenAI } from "@posthog/ai";

const phClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  flushAt: 1,
  flushInterval: 0,
});

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  posthog: phClient,
});

export { phClient };
```

### 4. Use in Your Code

```javascript
import { openai } from "../lib/posthog-openai";

// Every call is automatically tracked!
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello!" }],
});
```

---

## 🧪 Testing & Debugging

### Test PostHog Integration

```javascript
// Test PostHog connection
const testEvent = await phClient.capture({
  distinctId: "test-user",
  event: "posthog_test",
  properties: { timestamp: new Date().toISOString() },
});
```

### Check Dashboard

1. **Go to PostHog dashboard**
2. **Check "Generations" tab**
3. **Look for recent events**
4. **Verify event properties**

### Debug Common Issues

- **No events showing?** Check API keys and environment variables
- **Events delayed?** Check `flushAt` and `flushInterval` settings
- **Wrong data?** Verify PostHog project configuration

---

## ❌ Common Issues

### 1. OpenAI Quota Exceeded (429 Error)

```
Error: 429 You exceeded your current quota
```

**Solution:** This is NOT a PostHog problem - it's OpenAI billing. PostHog still tracks the attempt!

### 2. No Events in Dashboard

**Possible Causes:**

- Missing or incorrect API keys
- Wrong PostHog host URL
- Network connectivity issues
- PostHog project not configured

**Solutions:**

- Verify environment variables
- Check PostHog project settings
- Test with simple PostHog events first

### 3. Events Delayed

**Cause:** PostHog batching events
**Solution:** Set `flushAt: 1` for immediate sending (development)

---

## 🎯 Best Practices

### 1. Environment Configuration

- Use separate API keys for development/production
- Never commit API keys to version control
- Use `.env.local` for local development

### 2. Error Handling

- Always wrap OpenAI calls in try-catch
- Log errors for debugging
- Handle quota limits gracefully

### 3. Performance

- Use `flushAt: 1` for development (immediate)
- Use `flushAt: 20` for production (batched)
- Monitor dashboard for performance insights

### 4. Security

- Validate user permissions before LLM calls
- Track user context for audit trails
- Monitor usage patterns for abuse

---

## 🔮 Advanced Features

### Custom Event Properties

```javascript
// Add custom context to LLM calls
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [...],
  // PostHog will capture these automatically
  user: "user_123",
  session: "session_456",
  feature: "product_recommendations"
});
```

### Cost Optimization

- **Monitor token usage** by feature
- **Track cost per user** for billing
- **Identify expensive models** and optimize
- **Set usage alerts** for budget control

### User Analytics

- **Track AI feature adoption**
- **Monitor user engagement** with AI
- **Identify power users** and use cases
- **Optimize AI features** based on usage

---

## 📈 What You Get Out of It

### Business Insights

- **Cost per AI feature** - ROI analysis
- **User engagement** - Which AI features are popular
- **Performance metrics** - User experience optimization
- **Usage patterns** - Feature development priorities

### Technical Benefits

- **Zero code changes** - Automatic tracking
- **Real-time monitoring** - Live system health
- **Error tracking** - Quick debugging
- **Performance optimization** - Identify bottlenecks

### User Experience

- **Faster AI responses** - Performance insights
- **Better error handling** - User feedback
- **Feature optimization** - Data-driven decisions
- **Cost transparency** - Usage understanding

---

## 🎉 Summary

PostHog LLM Analytics is a **game-changer** because:

1. **Zero Manual Work** - Everything is tracked automatically
2. **Rich Insights** - Cost, performance, usage patterns
3. **Real-time Data** - See what's happening live
4. **Easy Integration** - Just wrap OpenAI with PostHog
5. **Powerful Analytics** - Build custom insights and dashboards

The key insight: **PostHog becomes an invisible layer that captures everything automatically** when you use the `@posthog/ai` package. You get enterprise-grade LLM analytics without writing a single line of tracking code!

---

## 🔗 Useful Links

- [PostHog LLM Analytics Documentation](https://posthog.com/docs/llm-analytics)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [PostHog Dashboard](https://app.posthog.com)
- [GitHub Repository](https://github.com/PostHog/posthog)

---

_This guide covers the complete PostHog LLM Analytics implementation. For specific questions or advanced features, refer to the official PostHog documentation._
