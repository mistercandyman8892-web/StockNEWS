"use client";

import React from "react";
import { motion } from "framer-motion";
import { STOCKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Play,
  LayoutGrid,
  PieChart,
  Newspaper,
  User,
  ArrowUpRight,
  Bell,
  Settings,
  Plus
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useSession } from "next-auth/react";

interface DashboardProps {
  onStartStories: () => void;
  onManageAssets: () => void;
  selectedSymbols: string[];
}

export function Dashboard({ onStartStories, onManageAssets, selectedSymbols }: DashboardProps) {
  const { data: session } = useSession();
  const filteredStocks = STOCKS.filter(s => selectedSymbols.includes(s.symbol));

  const userName = session?.user?.name?.split(' ')[0] || "Trader";

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
      {/* Header */}
      <header className="p-6 pt-12 flex justify-between items-center">
        <div>
          <p className="text-muted-foreground text-sm font-medium">Good Morning,</p>
          <h1 className="text-2xl font-bold tracking-tight">{userName}</h1>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center border border-border">
              <Bell className="w-5 h-5" />
            </div>
            <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-background" />
          </div>
        </div>
      </header>

      <div className="px-6 space-y-8">
        {/* Daily Briefing CTA - Prominent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onStartStories}
          className="group cursor-pointer p-8 rounded-[2.5rem] bg-primary text-primary-foreground flex flex-col gap-6 shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 flex items-center justify-center backdrop-blur-md">
              <Play className="w-8 h-8 fill-current" />
            </div>
            <div className="bg-primary-foreground/20 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md">
              1 MIN READ
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Start Daily Briefing</h3>
            <p className="opacity-80 text-sm leading-relaxed">
              We've curated {filteredStocks.length} stories based on your followed assets.
            </p>
          </div>
          <div className="flex items-center gap-2 font-bold text-sm">
            Watch Now <ArrowUpRight className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Assets Section */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="font-bold text-xl tracking-tight">Your Assets</h3>
              <p className="text-muted-foreground text-xs">{selectedSymbols.length} active monitors</p>
            </div>
            <button
              onClick={onManageAssets}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {filteredStocks.length > 0 ? (
              filteredStocks.map((stock) => (
                <div
                  key={stock.id}
                  className="p-5 rounded-3xl bg-card border border-border flex items-center justify-between hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center font-bold text-sm tracking-tighter">
                      {stock.symbol}
                    </div>
                    <div>
                      <h4 className="font-bold text-base">{stock.name}</h4>
                      <p className="text-muted-foreground text-xs">{stock.category}</p>
                    </div>
                  </div>
                  <Settings className="w-4 h-4 text-muted-foreground/40" />
                </div>
              ))
            ) : (
              <div className="py-12 text-center border-2 border-dashed border-border rounded-[2.5rem] bg-card/30">
                <p className="text-muted-foreground text-sm">No assets selected yet.</p>
                <button
                  onClick={onManageAssets}
                  className="mt-4 text-primary font-bold text-sm"
                >
                  Add your first asset
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-2xl border-t border-border px-8 py-5 flex justify-between items-center z-50">
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
        "p-3 rounded-2xl transition-all duration-300",
        active
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      )}
    >
      {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-6 h-6" }) : icon}
    </button>
  );
}
