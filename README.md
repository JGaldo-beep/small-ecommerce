# 🚀 Small Ecommerce - Next.js + Sanity + PostHog LLM Analytics

A modern, full-featured ecommerce platform built with cutting-edge technologies including AI-powered product recommendations, real-time analytics, and a headless CMS.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![Sanity](https://img.shields.io/badge/Sanity-CMS-000000?style=for-the-badge&logo=sanity)
![PostHog](https://img.shields.io/badge/PostHog-Analytics-6366F1?style=for-the-badge&logo=posthog)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT-412991?style=for-the-badge&logo=openai)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)

## ✨ Features Overview

### 🛍️ **Ecommerce Core**

- **Product Catalog** - Dynamic product listings with Sanity CMS
- **Product Details** - Rich product pages with image galleries
- **Shopping Cart** - Persistent cart with quantity controls
- **Responsive Design** - Mobile-first, modern UI components
- **SEO Optimized** - Next.js App Router with metadata

### 🎨 **Content Management (Sanity CMS)**

- **Headless CMS** - Manage products, banners, and content
- **Real-time Updates** - Live preview and instant content changes
- **Image Management** - Optimized image handling with Sanity
- **Custom Schemas** - Flexible content modeling
- **API Integration** - GROQ queries for data fetching

### 🤖 **AI-Powered Features**

- **Product Recommendations** - AI-driven product suggestions
- **Content Analysis** - AI-powered product description insights
- **Smart Search** - Intelligent product discovery
- **User Preference Learning** - Personalized recommendations
- **Cost Optimization** - Token usage and cost tracking

### 📊 **Analytics & Monitoring (PostHog)**

- **LLM Analytics** - Track OpenAI API usage and costs
- **Real-time Metrics** - Live performance monitoring
- **User Behavior** - Track user interactions and engagement
- **Cost Analysis** - Monitor AI feature ROI
- **Performance Insights** - Latency and success rate tracking

### 🛠️ **Technical Features**

- **Next.js 15.5** - Latest App Router with server components
- **TypeScript** - Full type safety and IntelliSense
- **Responsive UI** - Tailwind CSS with custom components
- **State Management** - React Context for global state
- **API Routes** - RESTful API endpoints
- **Error Handling** - Comprehensive error boundaries
- **Loading States** - Smooth user experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Sanity account
- PostHog account
- OpenAI API key

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd small-ecommerce
npm install
```

### 2. Environment Setup

Create `.env.local` file:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-08-28

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# PostHog Configuration
NEXT_PUBLIC_POSTHOG_API_KEY=your_posthog_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### 3. Sanity Setup

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Deploy schemas
sanity deploy
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## 🏗️ Project Structure

```
small-ecommerce/
├── app/                          # Next.js App Router
│   ├── (root)/                  # Root layout
│   ├── product/[slug]/          # Product detail pages
│   ├── api/                     # API routes
│   │   ├── ai-recommendations/  # AI recommendations API
│   │   ├── test-llm/           # LLM testing API
│   │   └── test-posthog-only/  # PostHog testing API
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # React components
│   ├── Cart.jsx                 # Shopping cart
│   ├── Footer.jsx               # Site footer
│   ├── FooterBanner.jsx         # Promotional banner
│   ├── HeroBanner.jsx           # Hero section
│   ├── LLMTestButton.jsx        # AI testing component
│   ├── Navbar.jsx               # Navigation
│   └── Product.jsx              # Product cards
├── context/                      # React Context
│   └── StateContext.jsx         # Global state management
├── lib/                          # Utility libraries
│   ├── ai-recommendations.ts    # AI recommendation logic
│   ├── client.ts                # Sanity client
│   ├── embeddings.ts            # AI embeddings
│   ├── getStripe.js             # Stripe integration
│   ├── image.ts                 # Image utilities
│   └── posthog-openai.ts       # PostHog + OpenAI setup
├── sanity/                       # Sanity CMS configuration
│   ├── schemaTypes/             # Content schemas
│   │   ├── banner.ts            # Banner schema
│   │   ├── footerBanner.ts      # Footer banner schema
│   │   ├── index.ts             # Schema index
│   │   └── product.ts           # Product schema
│   ├── lib/                     # Sanity utilities
│   │   ├── client.ts            # Sanity client
│   │   ├── image.ts             # Image handling
│   │   ├── live.ts              # Live preview
│   │   └── queries.ts           # GROQ queries
│   ├── sanity.cli.ts            # CLI configuration
│   └── sanity.config.ts         # Sanity configuration
└── public/                       # Static assets
```

## 🎯 Key Features Deep Dive

### 🛍️ **Ecommerce Functionality**

#### Product Management

- **Dynamic Product Catalog** - Products managed through Sanity CMS
- **Rich Product Details** - Images, descriptions, pricing, specifications
- **SEO-Optimized URLs** - Clean, searchable product URLs
- **Image Optimization** - Responsive images with Sanity's image pipeline

#### Shopping Experience

- **Interactive Cart** - Add/remove products with quantity controls
- **Persistent State** - Cart persists across page refreshes
- **Real-time Updates** - Instant cart updates and calculations
- **Responsive Design** - Works perfectly on all devices

### 🤖 **AI Integration**

#### Product Recommendations

```javascript
// AI-powered product suggestions
const recommendations = await getProductRecommendations(
  userPreferences,
  availableProducts
);
```

#### Content Analysis

```javascript
// AI analysis of product descriptions
const analysis = await analyzeProductDescription(productDescription);
```

#### Smart Embeddings

```javascript
// Create and track user preference embeddings
const embedding = await createUserPreferenceEmbedding(
  userBehavior,
  preferences
);
```

### 📊 **Analytics & Monitoring**

#### PostHog LLM Analytics

- **Automatic Tracking** - Every OpenAI API call is tracked
- **Cost Monitoring** - Real-time cost per request tracking
- **Performance Metrics** - Latency, success rates, token usage
- **User Insights** - Who's using AI features and how

#### Real-time Dashboard

- **Live Metrics** - See analytics as they happen
- **Cost Trends** - Monitor spending over time
- **Usage Patterns** - Understand feature adoption
- **Performance Alerts** - Identify bottlenecks quickly

### 🎨 **Content Management**

#### Sanity Studio

- **Visual Editor** - Intuitive content editing interface
- **Real-time Collaboration** - Multiple editors can work simultaneously
- **Custom Schemas** - Flexible content modeling
- **API-First** - Content available via REST API and GROQ

#### Content Types

- **Products** - Name, slug, price, details, images
- **Banners** - Hero sections, promotional content
- **Footer Banners** - Special offers, call-to-action
- **Dynamic Content** - Easy to add new content types

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

### Other Platforms

```bash
npm run build
npm start
```

## 🔧 Configuration

### Sanity CMS

- **Project Setup** - Configure in `sanity.config.ts`
- **Content Schemas** - Define in `sanity/schemaTypes/`
- **API Queries** - Write GROQ queries in `sanity/lib/queries.ts`
- **Image Handling** - Configure in `sanity/lib/image.ts`

### PostHog Analytics

- **API Keys** - Set in environment variables
- **Event Tracking** - Automatic with `@posthog/ai` package
- **Dashboard** - Access at [app.posthog.com](https://app.posthog.com)
- **Real-time Data** - Events appear within seconds

### OpenAI Integration

- **API Keys** - Secure environment variable storage
- **Model Selection** - Configurable in AI functions
- **Cost Control** - Built-in usage monitoring
- **Error Handling** - Graceful quota limit handling

## 🧪 Testing

### Test AI Features

```bash
# Test PostHog integration
curl http://localhost:3000/api/test-posthog-only

# Test OpenAI + PostHog
curl http://localhost:3000/api/test-llm
```

### Test Components

- **LLM Test Button** - Available on homepage
- **PostHog Dashboard** - Check for events
- **Sanity Studio** - Verify content management

## 📚 Documentation

- **[PostHog LLM Analytics Guide](POSTHOG_LLM_ANALYTICS_GUIDE.md)** - Complete PostHog integration guide
- **[Sanity Documentation](https://www.sanity.io/docs)** - CMS setup and usage
- **[Next.js Documentation](https://nextjs.org/docs)** - Framework features
- **[OpenAI API Docs](https://platform.openai.com/docs)** - AI integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Sanity** - Powerful headless CMS
- **PostHog** - Comprehensive analytics platform
- **OpenAI** - Cutting-edge AI capabilities

## 📞 Support

- **Issues** - [GitHub Issues](https://github.com/yourusername/small-ecommerce/issues)
- **Discussions** - [GitHub Discussions](https://github.com/yourusername/small-ecommerce/discussions)
- **Documentation** - Check the docs folder and linked resources

---

**Built with ❤️ using Next.js, Sanity, PostHog, and OpenAI**

_This project demonstrates modern web development best practices with AI integration, real-time analytics, and a scalable architecture._
