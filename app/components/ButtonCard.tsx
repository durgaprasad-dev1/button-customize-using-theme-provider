"use client";

import { useState, useRef, useEffect } from "react";
import {
  type StyleId,
  type ButtonEntry,
  STYLE_OPTIONS,
  getStyle,
} from "../config/buttonStyles";

/* ─── Style Selector Panel ──────────────────── */
function StyleSelector({
  activeStyle,
  onSelect,
  onClose,
}: {
  activeStyle: StyleId;
  onSelect: (id: StyleId) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function outside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="animate-scale-in mt-5 rounded-2xl p-5
        border border-[var(--border)]
        bg-[var(--surface)] backdrop-blur-xl
        shadow-xl shadow-black/8 dark:shadow-black/30"
      style={{ transformOrigin: "top center" }}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">
        Choose a style
      </p>

      <div className="grid grid-cols-2 gap-2.5">
        {STYLE_OPTIONS.map((opt) => {
          const active = activeStyle === opt.id;
          return (
            <button
              key={opt.id}
              id={`style-opt-${opt.id}`}
              onClick={() => onSelect(opt.id)}
              className={`relative flex flex-col items-start gap-1 p-3.5 rounded-xl
                text-left cursor-pointer transition-all duration-200
                ${
                  active
                    ? "bg-[var(--accent)]/10 border border-[var(--accent)]/40 shadow-sm"
                    : "bg-transparent border border-[var(--border)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)]"
                }`}
            >
              {/* Mini preview dot */}
              <span
                className="w-7 h-7 rounded-lg border border-[var(--border)]"
                style={{
                  ...opt.css,
                  padding: 0,
                  boxShadow: "none",
                  backdropFilter: undefined,
                }}
              />

              <span
                className={`text-xs font-semibold ${active ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`}
              >
                {opt.label}
              </span>
              <span className="text-[10px] leading-tight text-[var(--text-muted)]">
                {opt.description}
              </span>

              {active && (
                <svg
                  className="absolute top-2.5 right-2.5 w-4 h-4 text-[var(--accent)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Button Card ───────────────────────────── */
export function ButtonCard({
  button,
  activeStyle,
  onStyleChange,
  index,
}: {
  button: ButtonEntry;
  activeStyle: StyleId;
  onStyleChange: (buttonId: string, style: StyleId) => void;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const style = getStyle(activeStyle);

  return (
    <div
      className="w-full max-w-sm animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className={`rounded-3xl p-7 flex flex-col
          border transition-all duration-300
          ${
            open
              ? "border-[var(--accent)]/25 shadow-2xl shadow-[var(--accent)]/5"
              : "border-[var(--border)] hover:border-[var(--border-strong)] shadow-lg shadow-black/4 dark:shadow-black/20"
          }
          bg-[var(--surface)]`}
      >
        {/* Card header */}
        <div className="flex items-center gap-3 mb-1.5">
          <span className="text-2xl">{button.icon}</span>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            {button.label}
          </h3>
        </div>

        {/* Current style label */}
        <p className="text-xs text-[var(--text-muted)] mb-6">
          Current style:{" "}
          <span className="font-semibold text-[var(--accent)]">
            {style.label}
          </span>
        </p>

        {/* Live preview button */}
        <div className="flex items-center justify-center py-6 px-4 rounded-2xl bg-[var(--background)] border border-[var(--border)]">
          <button
            id={`btn-${button.id}`}
            onClick={() => setOpen((v) => !v)}
            style={style.css}
            className={`text-sm font-semibold cursor-pointer
              transition-all duration-300
              hover:scale-105 active:scale-95
              ${style.className ?? ""}`}
          >
            {button.label} Button
          </button>
        </div>

        {/* Click hint */}
        <p className="text-[10px] text-center text-[var(--text-muted)] mt-2">
          Click button to change style
        </p>

        {/* Style selector */}
        {open && (
          <StyleSelector
            activeStyle={activeStyle}
            onSelect={(id) => {
              onStyleChange(button.id, id);
              setOpen(false);
            }}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
