export interface Stock {
  id: string;
  symbol: string;
  name: string;
  type: "stock" | "mutual_fund";
  category: string;
}

export type ImpactLevel = "positive" | "negative" | "neutral";

export interface NewsStory {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  source: string;
  timestamp: string;
  impact: {
    level: ImpactLevel;
    description: string;
    affectedSymbols: string[];
  };
  details: string[];
}

export interface UserPortfolio {
  selectedSymbols: string[];
}
