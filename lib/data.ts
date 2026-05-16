import { Stock, NewsStory, DashboardData } from "./types";

export const STOCKS: Stock[] = [
  { id: "1", symbol: "AAPL", name: "Apple Inc.", type: "stock", category: "Technology", price: 189.43, change: 1.2 },
  { id: "2", symbol: "TSLA", name: "Tesla, Inc.", type: "stock", category: "Automotive", price: 175.34, change: -2.4 },
  { id: "3", symbol: "NVDA", name: "NVIDIA Corporation", type: "stock", category: "Technology", price: 894.12, change: 4.5 },
  { id: "4", symbol: "MSFT", name: "Microsoft Corporation", type: "stock", category: "Technology", price: 415.67, change: 0.8 },
  { id: "5", symbol: "AMZN", name: "Amazon.com, Inc.", type: "stock", category: "E-commerce", price: 178.12, change: 1.1 },
  { id: "6", symbol: "GOOGL", name: "Alphabet Inc.", type: "stock", category: "Technology", price: 154.23, change: -0.5 },
  { id: "7", symbol: "VOO", name: "Vanguard S&P 500 ETF", type: "mutual_fund", category: "Index Fund", price: 489.12, change: 0.3 },
  { id: "8", symbol: "VTI", name: "Vanguard Total Stock Market ETF", type: "mutual_fund", category: "Index Fund", price: 254.34, change: 0.2 },
  { id: "9", symbol: "QQQ", name: "Invesco QQQ Trust", type: "mutual_fund", category: "Index Fund", price: 445.12, change: 0.7 },
  { id: "10", symbol: "META", name: "Meta Platforms, Inc.", type: "stock", category: "Technology", price: 495.23, change: 2.1 },
];

export const NEWS_STORIES: NewsStory[] = [
  {
    id: "story-1",
    title: "AI Demand Hits Fever Pitch",
    summary: "NVIDIA reports record-breaking quarterly earnings as data centers rush to secure H100 chips.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    source: "Bloomberg",
    timestamp: "2h ago",
    impact: {
      level: "positive",
      description: "Direct revenue boost for chipmakers and cloud providers.",
      affectedSymbols: ["NVDA", "MSFT", "GOOGL"],
    },
    details: [
      "Quarterly revenue exceeded analyst expectations by 20%.",
      "Supply chain constraints are easing, allowing for faster deliveries.",
      "New Blackwell architecture announced for late 2024."
    ]
  },
  {
    id: "story-2",
    title: "iPhone Sales Surge in Emerging Markets",
    summary: "Apple sees double-digit growth in India and Southeast Asia, offsetting plateauing US sales.",
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=800",
    source: "Financial Times",
    timestamp: "4h ago",
    impact: {
      level: "positive",
      description: "Market expansion reduces reliance on mature economies.",
      affectedSymbols: ["AAPL", "VOO"],
    },
    details: [
      "India now represents a top 5 market for Apple.",
      "Services revenue continues to hit all-time highs.",
      "Supply chain diversification to Vietnam is ahead of schedule."
    ]
  },
  {
    id: "story-3",
    title: "Federal Reserve Holds Rates Steady",
    summary: "Interest rates remain unchanged as inflation shows signs of cooling, but not fast enough.",
    imageUrl: "https://images.unsplash.com/photo-1611974717483-36aa3921500d?auto=format&fit=crop&q=80&w=800",
    source: "Reuters",
    timestamp: "6h ago",
    impact: {
      level: "neutral",
      description: "Macro uncertainty persists for high-growth tech stocks.",
      affectedSymbols: ["TSLA", "AMZN", "QQQ"],
    },
    details: [
      "Inflation print came in at 3.1%, slightly above target.",
      "Powell hints at 'higher for longer' approach.",
      "Yield curve remains slightly inverted."
    ]
  },
  {
    id: "story-4",
    title: "EV Price War Intensifies",
    summary: "Major manufacturers announce deep discounts to clear inventory amid slowing demand.",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
    source: "Wall Street Journal",
    timestamp: "8h ago",
    impact: {
      level: "negative",
      description: "Margin compression expected across the automotive sector.",
      affectedSymbols: ["TSLA"],
    },
    details: [
      "Average selling price dropped by 12% year-over-year.",
      "Inventory levels reached a 2-year high.",
      "Competition from domestic Chinese brands is rising."
    ]
  }
];

export const DASHBOARD_MOCK: DashboardData = {
  portfolioValue: 124500.67,
  dailyChange: 1420.45,
  topMoves: [
    { symbol: "NVDA", change: 4.5 },
    { symbol: "META", change: 2.1 },
    { symbol: "TSLA", change: -2.4 },
  ]
};

export const ONBOARDING_GOALS = [
  { id: "wealth", label: "Long-term Wealth", description: "Build a solid foundation for your future." },
  { id: "income", label: "Passive Income", description: "Focus on dividends and steady returns." },
  { id: "news", label: "Market News", description: "Stay updated on the latest financial moves." },
  { id: "speculative", label: "Growth & Tech", description: "High-risk, high-reward opportunities." },
];
