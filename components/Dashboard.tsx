"use client";

import React from "react";
import { motion } from "framer-motion";
import { DASHBOARD_MOCK, STOCKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Play,
  LayoutGrid,
  PieChart,
  Newspaper,
  User,
  ArrowUpRight,
  Bell
} from "lucide-react";

interface DashboardProps {
  onStartStories: () => void;
  selectedSymbols: string[];
}

export function Dashboard({ onStartStories, selectedSymbols }: DashboardProps) {
  const filteredStocks = STOCKS.filter(s => selectedSymbols.includes(s.symbol));

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-24">
      {/* Header */}
      <header className="p-6 pt-12 flex justify-between items-center">
        <div>
          <p className="text-muted-foreground text-sm font-medium">Good Morning,</p>
          <h1 className="text-2xl font-bold tracking-tight">Jameson</h1>
        </div>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border">
            <Bell className="w-5 h-5" />
          </div>
          <span className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background" />
        </div>
      </header>

      <div className="px-6 space-y-8">
        {/* Portfolio Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 via-background to-background border border-primary/20 relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className="text-primary font-medium mb-1">Portfolio Value</p>
            <h2 className="text-4xl font-bold tracking-tighter mb-4">
              ${DASHBOARD_MOCK.portfolioValue.toLocaleString()}
            </h2>
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +${DASHBOARD_MOCK.dailyChange.toLocaleString()}
              </div>
              <span className="text-muted-foreground text-sm">Today</span>
            </div>
          </div>
          {/* Subtle background glow */}
          <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        </motion.div>

        {/* Daily Briefing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={onStartStories}
          className="group cursor-pointer p-6 rounded-[2rem] bg-card border border-border flex items-center justify-between hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20">
              <Play className="w-6 h-6 text-primary-foreground fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Daily Briefing</h3>
              <p className="text-muted-foreground text-sm">Your 1-min market story</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-primary font-bold">
            <span className="text-sm">Start</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>

        {/* Assets Section */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-bold text-xl tracking-tight">Your Assets</h3>
            <button className="text-primary text-sm font-bold">View All</button>
          </div>
          <div className="space-y-3">
            {(filteredStocks.length > 0 ? filteredStocks : STOCKS.slice(0, 3)).map((stock) => (
              <div key={stock.id} className="p-4 rounded-2xl bg-card/50 border border-border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center font-bold text-xs">
                    {stock.symbol}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{stock.name}</h4>
                    <p className="text-muted-foreground text-xs">{stock.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">${stock.price}</div>
                  <div className={cn(
                    "text-xs font-medium flex items-center justify-end gap-0.5",
                    (stock.change ?? 0) >= 0 ? "text-emerald-500" : "text-rose-500"
                  )}>
                    {(stock.change ?? 0) >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(stock.change ?? 0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border px-8 py-4 flex justify-between items-center z-50">
        <NavButton icon={<LayoutGrid />} active />
        <NavButton icon={<Newspaper />} onClick={onStartStories} />
        <NavButton icon={<PieChart />} />
        <NavButton icon={<User />} />
      </nav>
    </div>
  );
}

function NavButton({ icon, active, onClick }: { icon: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2.5 rounded-xl transition-all duration-200",
        active ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-6 h-6" }) : icon}
    </button>
  );
}
