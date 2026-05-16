"use client";

import React, { useState, useEffect } from "react";
import { NEWS_STORIES } from "@/lib/data";
import { StoryCard } from "./StoryCard";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, RotateCcw, X } from "lucide-react";

interface StoryFeedProps {
  selectedSymbols: string[];
  onExit: () => void;
}

export function StoryFeed({ selectedSymbols, onExit }: StoryFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter stories based on selected symbols
  const filteredStories = NEWS_STORIES.filter(story =>
    story.impact.affectedSymbols.some(symbol => selectedSymbols.includes(symbol))
  );

  const stories = filteredStories.length > 0 ? filteredStories : NEWS_STORIES;

  const nextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const progress = ((currentIndex + 1) / stories.length) * 100;

  return (
    <div className="relative h-screen w-full bg-background overflow-hidden max-w-md mx-auto border-x border-white/5">
      {/* Progress Bars */}
      <div className="absolute top-4 left-6 right-6 z-50 flex gap-1.5">
        {stories.map((_, index) => (
          <div
            key={index}
            className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: index < currentIndex ? "100%" : index === currentIndex ? "100%" : "0%"
              }}
              transition={{
                duration: index === currentIndex ? 5 : 0.3,
                ease: "linear"
              }}
              onAnimationComplete={() => {
                if (index === currentIndex) nextStory();
              }}
              className="h-full bg-white"
            />
          </div>
        ))}
      </div>

      {/* Exit Button */}
      <button
        onClick={onExit}
        className="absolute top-8 right-6 z-50 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Stories */}
      <div className="relative h-full w-full">
        {stories.map((story, index) => (
          <StoryCard
            key={story.id}
            story={story}
            isActive={index === currentIndex}
          />
        ))}
      </div>

      {/* Navigation Areas (Invisible tap zones) */}
      <div className="absolute inset-0 z-30 flex">
        <div
          className="w-1/3 h-full cursor-pointer"
          onClick={prevStory}
        />
        <div
          className="w-2/3 h-full cursor-pointer"
          onClick={nextStory}
        />
      </div>

      {/* Footer Navigation */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-40 bg-gradient-to-t from-background via-background/80 to-transparent">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{currentIndex + 1}</span>
            <span className="text-muted-foreground">/ {stories.length}</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={prevStory}
              disabled={currentIndex === 0}
              className="p-3 rounded-full bg-secondary disabled:opacity-30"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            {currentIndex === stories.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(0)}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold"
              >
                <RotateCcw className="h-5 w-5" />
                Replay
              </button>
            ) : (
              <button
                onClick={nextStory}
                className="p-3 rounded-full bg-primary text-primary-foreground"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
