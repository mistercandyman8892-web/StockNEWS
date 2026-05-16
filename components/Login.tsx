"use client";

import React from "react";
import { motion } from "framer-motion";
import { LogIn, ShieldCheck, Globe, Zap } from "lucide-react";
import { signIn } from "next-auth/react";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const handleGoogleLogin = () => {
    // In a real environment, this initiates OAuth.
    // For this demo, we'll just call onLogin to proceed to onboarding.
    // signIn("google", { callbackUrl: "/" });
    onLogin();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground items-center justify-center p-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md space-y-12 text-center"
      >
        <div className="space-y-4">
          <div className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-primary/20">
            <LogIn className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter">FinStory</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Premium market intelligence, delivered in 1-minute stories.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 text-left">
          <Feature
            icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
            title="Secure Intelligence"
            desc="Enterprise-grade data protection."
          />
          <Feature
            icon={<Globe className="w-5 h-5 text-blue-500" />}
            title="Global Coverage"
            desc="Real-time news from world markets."
          />
          <Feature
            icon={<Zap className="w-5 h-5 text-amber-500" />}
            title="Ultra Fast"
            desc="Optimized for the modern investor."
          />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-primary text-primary-foreground font-bold py-5 rounded-[2rem] shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-4 hover:shadow-primary/30"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5 grayscale invert brightness-0"
          />
          Continue with Google
        </button>

        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-3xl bg-card border border-border">
      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-sm">{title}</h3>
        <p className="text-muted-foreground text-xs">{desc}</p>
      </div>
    </div>
  );
}
