"use client";

import { useState } from "react";
import { SelectionScreen } from "@/components/SelectionScreen";
import { StoryFeed } from "@/components/StoryFeed";
import { Onboarding } from "@/components/Onboarding";
import { Dashboard } from "@/components/Dashboard";
import { NEWS_STORIES } from "@/lib/data";

type AppPhase = "onboarding" | "selection" | "dashboard" | "stories";

export default function Home() {
  const [phase, setPhase] = useState<AppPhase>("onboarding");
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [userGoals, setUserGoals] = useState<string[]>([]);

  // Filtering stories based on selected symbols
  // If no symbols selected (unlikely due to UI), show all
  const filteredStories = NEWS_STORIES.filter((story) =>
    story.impact.affectedSymbols.some((symbol) =>
      selectedSymbols.includes(symbol)
    )
  );

  // Fallback to all stories if filtering results in too few stories for the demo
  const displayStories = filteredStories.length > 0 ? filteredStories : NEWS_STORIES;

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
      {phase === "onboarding" && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      {phase === "selection" && (
        <SelectionScreen onConfirm={handleSelectionComplete} />
      )}

      {phase === "dashboard" && (
        <Dashboard
          onStartStories={handleStartStories}
          selectedSymbols={selectedSymbols}
        />
      )}

      {phase === "stories" && (
        <StoryFeed stories={displayStories} onAllStoriesEnd={handleStoriesEnd} />
      )}
    </main>
  );
}
