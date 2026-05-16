"use client";

import { useState } from "react";
import { SelectionScreen } from "@/components/SelectionScreen";
import { StoryFeed } from "@/components/StoryFeed";
import { Onboarding } from "@/components/Onboarding";
import { Dashboard } from "@/components/Dashboard";
import { Login } from "@/components/Login";
import { NEWS_STORIES } from "@/lib/data";
import { fetchMarketNews } from "@/lib/newsService";
import { useEffect } from "react";
import { NewsStory } from "@/lib/types";

type AppPhase = "login" | "onboarding" | "selection" | "dashboard" | "stories";

export default function Home() {
  const [phase, setPhase] = useState<AppPhase>("login");
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [userGoals, setUserGoals] = useState<string[]>([]);
  const [liveStories, setLiveStories] = useState<NewsStory[]>([]);

  useEffect(() => {
    async function loadNews() {
      const news = await fetchMarketNews();
      if (news.length > 0) {
        setLiveStories(news);
      }
    }
    loadNews();
  }, []);

  const storiesToUse = liveStories.length > 0 ? liveStories : NEWS_STORIES;

  // Filtering stories based on selected symbols
  const filteredStories = storiesToUse.filter((story) =>
    story.impact.affectedSymbols.some((symbol) =>
      selectedSymbols.includes(symbol)
    )
  );

  // Fallback to stories that mention ANY selected symbol, or just show latest if none match
  const displayStories = filteredStories.length > 0 ? filteredStories : storiesToUse;

  const handleOnboardingComplete = (goals: string[]) => {
    setUserGoals(goals);
    setPhase("selection");
  };

  const handleSelectionComplete = (symbols: string[]) => {
    setSelectedSymbols(symbols);
    setPhase("dashboard");
  };

  const handleStartStories = () => {
    setPhase("stories");
  };

  const handleStoriesEnd = () => {
    setPhase("dashboard");
  };

  return (
    <main className="min-h-screen bg-background">
      {phase === "login" && (
        <Login onLogin={() => setPhase("onboarding")} />
      )}

      {phase === "onboarding" && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      {phase === "selection" && (
        <SelectionScreen onConfirm={handleSelectionComplete} />
      )}

      {phase === "dashboard" && (
        <Dashboard
          onStartStories={handleStartStories}
          onManageAssets={() => setPhase("selection")}
          selectedSymbols={selectedSymbols}
        />
      )}

      {phase === "stories" && (
        <StoryFeed stories={displayStories} onAllStoriesEnd={handleStoriesEnd} />
      )}
    </main>
  );
}
