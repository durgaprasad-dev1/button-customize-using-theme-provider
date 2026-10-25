"use client";

import { useState } from "react";
import { BUTTONS, type StyleId } from "./config/buttonStyles";
import { ButtonCard } from "./components/ButtonCard";
import { ThemeToggle } from "./components/ThemeToggle";

export default function Home() {
  /* State: which style is active for each button */
  const [styles, setStyles] = useState<Record<string, StyleId>>(
    Object.fromEntries(BUTTONS.map((b) => [b.id, b.defaultStyle]))
  );

  const handleStyleChange = (buttonId: string, style: StyleId) => {
    setStyles((prev) => ({ ...prev, [buttonId]: style }));
  };

  return (
    <div className="relative flex flex-col flex-1 min-h-screen overflow-hidden">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* ── Header ──────────────────────────── */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center shadow-lg shadow-[#6366f1]/25">
            <span className="text-white text-sm font-bold">B</span>
          </div>
          <span className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
            ButtonCraft
          </span>
        </div>
        <ThemeToggle />
      </header>

      {/* ── Hero ────────────────────────────── */}
      <section className="relative z-10 text-center px-6 pt-6 pb-2 sm:pt-10 sm:pb-4 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3 leading-tight">
          Customize{" "}
          <span className="bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
            Button Styles
          </span>
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
          Click a button to open the style picker.
          Choose from <strong>Rounded</strong>, <strong>Bordered</strong>,{" "}
          <strong>Gradient Glow</strong>, or <strong>Glass</strong>.
        </p>
      </section>

      {/* ── Button Cards ────────────────────── */}
      <section className="relative z-10 flex-1 flex items-center justify-center px-6 py-10">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 w-full max-w-3xl justify-center">
          {BUTTONS.map((btn, i) => (
            <ButtonCard
              key={btn.id}
              button={btn}
              activeStyle={styles[btn.id]}
              onStyleChange={handleStyleChange}
              index={i}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
