"use client";

import React, { useState } from "react";
import { STOCKS } from "@/lib/data";
import { Stock } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Search, Check, TrendingUp, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

interface SelectionScreenProps {
  onComplete: (selectedSymbols: string[]) => void;
}

export function SelectionScreen({ onComplete }: SelectionScreenProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const filteredStocks = STOCKS.filter(
    (s) =>
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStock = (symbol: string) => {
    setSelected((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground px-6 py-12 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold tracking-tight mb-2">Your Portfolio</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Select the stocks and funds you follow. We'll curate your 1-minute daily briefing.
        </p>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <input
            type="text"
            placeholder="Search AAPL, NVDA, Vanguard..."
            className="w-full bg-secondary border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 mb-24">
          {filteredStocks.map((stock, index) => (
            <motion.div
              key={stock.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => toggleStock(stock.symbol)}
              className={cn(
                "group relative flex items-center justify-between p-4 rounded-2xl cursor-pointer border transition-all duration-200",
                selected.includes(stock.symbol)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border hover:border-muted-foreground/50"
              )}
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center transition-colors",
                    selected.includes(stock.symbol)
                      ? "bg-primary-foreground/10"
                      : "bg-secondary"
                  )}
                >
                  {stock.type === "stock" ? (
                    <TrendingUp className="h-6 w-6" />
                  ) : (
                    <Briefcase className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-base">{stock.symbol}</h3>
                  <p
                    className={cn(
                      "text-sm",
                      selected.includes(stock.symbol)
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {stock.name}
                  </p>
                </div>
              </div>
              {selected.includes(stock.symbol) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-primary-foreground text-primary rounded-full p-1"
                >
                  <Check className="h-4 w-4" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/90 to-transparent">
        <div className="max-w-2xl mx-auto w-full">
          <button
            onClick={() => onComplete(selected)}
            disabled={selected.length === 0}
            className="w-full bg-primary text-primary-foreground font-bold py-5 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl transition-transform active:scale-[0.98]"
          >
            Start My Briefing {selected.length > 0 && `(${selected.length})`}
          </button>
        </div>
      </div>
    </div>
  );
}
