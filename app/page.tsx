"use client";

import React, { useState, useEffect } from "react";
import { SelectionScreen } from "@/components/SelectionScreen";
import { StoryFeed } from "@/components/StoryFeed";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [selectedSymbols, setSelectedSymbols] = useState<string[] | null>(null);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <AnimatePresence mode="wait">
        {!selectedSymbols ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SelectionScreen
              onComplete={(symbols) => setSelectedSymbols(symbols)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="feed"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "circOut" }}
          >
            <StoryFeed
              selectedSymbols={selectedSymbols}
              onExit={() => setSelectedSymbols(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
