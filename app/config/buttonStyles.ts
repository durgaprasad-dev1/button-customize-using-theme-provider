/* ─────────────────────────────────────────────
   buttonStyles.ts
   Single source of truth for all button
   customization data. Edit THIS file to add
   new buttons or new styles.
   ───────────────────────────────────────────── */

/* ── Style IDs ──────────────────────────────── */
export type StyleId = "rounded" | "bordered" | "gradient" | "glass";

/* ── A single style option ──────────────────── */
export interface StyleOption {
  id: StyleId;
  label: string;
  description: string;
  /** Inline CSS applied to the button when this style is active */
  css: React.CSSProperties;
  /** Extra class names (for animations defined in globals.css) */
  className?: string;
}

/* ── A button entry shown in the carousel ───── */
export interface ButtonEntry {
  id: string;
  label: string;
  icon: string;
  /** The default style applied on first load */
  defaultStyle: StyleId;
}

/* ──────────────────────────────────────────────
   STYLE DEFINITIONS
   Each style is a unique, clearly different
   visual treatment. These are shared across
   all buttons — the same 4 options appear for
   every button.
   ────────────────────────────────────────────── */
export const STYLE_OPTIONS: StyleOption[] = [
  {
    id: "rounded",
    label: "Rounded",
    description: "Fully round pill shape with solid color fill",
    css: {
      borderRadius: "9999px",
      background: "var(--style-rounded-bg)",
      color: "#ffffff",
      border: "none",
      padding: "14px 36px",
      boxShadow: "0 4px 20px var(--style-rounded-shadow)",
    },
  },
  {
    id: "bordered",
    label: "Bordered",
    description: "Curved corners with a colored border, no fill",
    css: {
      borderRadius: "16px",
      background: "transparent",
      color: "var(--style-bordered-color)",
      border: "2.5px solid var(--style-bordered-color)",
      padding: "14px 36px",
      boxShadow: "none",
    },
  },
  {
    id: "gradient",
    label: "Gradient Glow",
    description: "Gradient background with a glowing shadow",
    css: {
      borderRadius: "14px",
      background: "var(--style-gradient-bg)",
      color: "#ffffff",
      border: "none",
      padding: "14px 36px",
      boxShadow: "0 6px 30px var(--style-gradient-shadow)",
    },
    className: "animate-gradient-bg",
  },
  {
    id: "glass",
    label: "Glass",
    description: "Translucent glass panel with backdrop blur",
    css: {
      borderRadius: "14px",
      background: "var(--style-glass-bg)",
      color: "var(--style-glass-color)",
      border: "1.5px solid var(--style-glass-border)",
      padding: "14px 36px",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      boxShadow: "0 8px 32px var(--style-glass-shadow)",
    },
  },
];

/* ──────────────────────────────────────────────
   BUTTON DEFINITIONS
   Add or remove buttons here. Each button
   uses the shared STYLE_OPTIONS above.
   ────────────────────────────────────────────── */
export const BUTTONS: ButtonEntry[] = [
  {
    id: "primary",
    label: "Primary",
    icon: "🔷",
    defaultStyle: "rounded",
  },
  {
    id: "action",
    label: "Action",
    icon: "⚡",
    defaultStyle: "gradient",
  },
];

/* ── Helper: look up a StyleOption by ID ────── */
export function getStyle(id: StyleId): StyleOption {
  return STYLE_OPTIONS.find((s) => s.id === id)!;
}
