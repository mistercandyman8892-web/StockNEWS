"use client";

import React from "react";
import { NewsStory } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus, Share2, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoryCardProps {
  story: NewsStory;
  isActive: boolean;
}

export function StoryCard({ story, isActive }: StoryCardProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full flex flex-col bg-background overflow-hidden"
        >
          {/* Background Image with Gradient */}
          <div className="relative h-3/5 w-full">
            <img
              src={story.imageUrl}
              alt={story.title}
              className="w-full h-full object-cover grayscale-[0.2]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />

            {/* Source and Time */}
            <div className="absolute top-12 left-6 right-6 flex justify-between items-center">
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                {story.source} • {story.timestamp}
              </span>
              <div className="flex gap-3">
                <button className="p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
                  <Bookmark className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 pt-4 pb-24 flex flex-col">
            {/* Impact Badge */}
            <div className="mb-4">
              <span className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                story.impact.level === "positive" && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                story.impact.level === "negative" && "bg-rose-500/10 text-rose-400 border border-rose-500/20",
                story.impact.level === "neutral" && "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
              )}>
                {story.impact.level === "positive" && <ArrowUpRight className="h-3 w-3" />}
                {story.impact.level === "negative" && <ArrowDownRight className="h-3 w-3" />}
                {story.impact.level === "neutral" && <Minus className="h-3 w-3" />}
                {story.impact.level} Impact
              </span>
            </div>

            <h2 className="text-3xl font-bold leading-tight mb-4 tracking-tight">
              {story.title}
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {story.summary}
            </p>

            <div className="mt-auto">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Key Takeaways</h4>
              <ul className="space-y-3">
                {story.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="flex gap-3 text-sm"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
