import { NewsStory, ImpactLevel } from "./types";

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || "sandbox_c8r2r2aad3i9v2bt8vbg";

export async function fetchMarketNews(symbols: string[] = []): Promise<NewsStory[]> {
  try {
    let allNews: any[] = [];

    if (symbols.length > 0) {
      // Fetch news for selected symbols if provided
      const today = new Date().toISOString().split('T')[0];
      const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      // We'll fetch for the first few symbols to stay within rate limits for demo
      const fetchPromises = symbols.slice(0, 3).map(symbol =>
        fetch(`https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${lastWeek}&to=${today}&token=${FINNHUB_API_KEY}`)
          .then(res => res.json())
      );

      const results = await Promise.all(fetchPromises);
      allNews = results.flat();
    }

    // If no symbol-specific news or none found, fallback to general news
    if (allNews.length === 0) {
      const response = await fetch(
        `https://finnhub.io/api/v1/news?category=general&token=${FINNHUB_API_KEY}`
      );
      if (response.ok) {
        allNews = await response.json();
      }
    }

    // Sort by time descending
    allNews.sort((a, b) => b.datetime - a.datetime);

    // Transform Finnhub data to our NewsStory format
    return allNews.slice(0, 10).map((item: any, index: number) => ({
      id: `live-${index}-${item.id}`,
      title: item.headline,
      summary: item.summary || "Stay updated with the latest market moves and financial trends.",
      imageUrl: item.image || `https://images.unsplash.com/photo-1611974717483-36aa3921500d?auto=format&fit=crop&q=80&w=800`,
      source: item.source || "Market Feed",
      timestamp: new Date(item.datetime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      impact: {
        level: determineImpact(item.headline),
        description: "Live market update based on current headlines.",
        affectedSymbols: extractSymbols(item.headline),
      },
      details: [
        "Real-time coverage from global news desks.",
        "Market sentiment analysis pending further data.",
        "Historical context available in the full report."
      ]
    }));
  } catch (error) {
    console.error("Error fetching live news:", error);
    return [];
  }
}

function determineImpact(headline: string): ImpactLevel {
  const lower = headline.toLowerCase();
  if (lower.includes("surge") || lower.includes("rise") || lower.includes("gain") || lower.includes("growth")) return "positive";
  if (lower.includes("fall") || lower.includes("drop") || lower.includes("slump") || lower.includes("loss")) return "negative";
  return "neutral";
}

function extractSymbols(headline: string): string[] {
  // Simple heuristic for demo purposes
  const symbols = ["AAPL", "TSLA", "NVDA", "MSFT", "AMZN", "GOOGL"];
  return symbols.filter(s => headline.includes(s));
}
