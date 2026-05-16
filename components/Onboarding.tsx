"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ONBOARDING_GOALS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Zap, Shield, TrendingUp, Sparkles } from "lucide-react";

interface OnboardingProps {
  onComplete: (goals: string[]) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const nextStep = () => setStep((s) => s + 1);

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const steps = [
    {
      title: "Market Intelligence, Simplified.",
      description: "Get the most critical financial news delivered in 1-minute high-impact stories.",
      icon: <Sparkles className="w-12 h-12 text-primary" />,
      image: "https://images.unsplash.com/photo-1611974717483-36aa3921500d?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Your Portfolio, Protected.",
      description: "We analyze how every news item affects your specific stocks and mutual funds.",
      icon: <Shield className="w-12 h-12 text-primary" />,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Speed is Wealth.",
      description: "Don't read articles. Get the takeaways. Move faster than the market.",
      icon: <Zap className="w-12 h-12 text-primary" />,
      image: "https://images.unsplash.com/photo-1642543492481-44e81e3f9c70?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto w-full overflow-hidden relative">
      <AnimatePresence mode="wait">
        {step < 3 ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col p-8 pt-20"
          >
            <div className="h-64 rounded-3xl overflow-hidden mb-12 grayscale-[0.5] contrast-[1.2]">
              <img src={steps[step].image} alt="intro" className="w-full h-full object-cover" />
            </div>
            <div className="mb-6">{steps[step].icon}</div>
            <h1 className="text-4xl font-bold tracking-tighter mb-4 leading-tight">
              {steps[step].title}
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              {steps[step].description}
            </p>

            <div className="mt-auto flex justify-between items-center pb-8">
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === step ? "w-8 bg-primary" : "w-2 bg-muted"
                    )}
                  />
                ))}
              </div>
              <button
                onClick={nextStep}
                className="bg-primary text-primary-foreground p-4 rounded-2xl shadow-xl active:scale-95 transition-transform"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="goals"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col p-8 pt-20"
          >
            <h1 className="text-4xl font-bold tracking-tighter mb-2">Define Your Focus</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              What are your primary financial objectives?
            </p>

            <div className="grid grid-cols-1 gap-4 mb-24">
              {ONBOARDING_GOALS.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={cn(
                    "p-5 rounded-2xl border transition-all duration-200 cursor-pointer",
                    selectedGoals.includes(goal.id)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border hover:border-muted-foreground/50"
                  )}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg">{goal.label}</h3>
                    {selectedGoals.includes(goal.id) && <Check className="w-5 h-5" />}
                  </div>
                  <p className={cn(
                    "text-sm leading-snug",
                    selectedGoals.includes(goal.id) ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {goal.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-auto pb-8">
              <button
                onClick={() => onComplete(selectedGoals)}
                disabled={selectedGoals.length === 0}
                className="w-full bg-primary text-primary-foreground font-bold py-5 rounded-2xl disabled:opacity-50 shadow-2xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
              >
                Next Step <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
