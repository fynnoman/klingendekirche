"use client";
import { useState, useId } from "react";
import type { ReactNode } from "react";

export default function Collapsible({
  title,
  eyebrow,
  defaultOpen = false,
  children
}: {
  title: string;
  eyebrow?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className="overflow-hidden rounded-2xl border border-royal-700/10 bg-white shadow-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-cream-100/70 sm:px-8 sm:py-6"
      >
        <div>
          {eyebrow && (
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-600">
              {eyebrow}
            </div>
          )}
          <div className="headline mt-1 text-lg leading-snug text-royal-800 sm:text-xl">
            {title}
          </div>
        </div>
        <span
          aria-hidden
          className={`shrink-0 text-royal-700 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          id={id}
          className="border-t border-royal-700/10 px-6 pb-8 pt-6 text-[15px] leading-relaxed text-neutral-800 sm:px-8"
        >
          {children}
        </div>
      )}
    </div>
  );
}
