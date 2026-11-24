"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
};

type ButtonSpec = {
  label: string;
  title: string;
  run: () => void;
};

/**
 * Leichtgewichtiger Rich-Text-Editor (contentEditable + document.execCommand).
 * Ausreichend für die Admin-Pflege: Überschriften H1/H2/H3, Fettdruck, Kursiv,
 * Listen, Textgrößen und Links. Speichert HTML.
 */
export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  minHeight = 240
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [focused, setFocused] = useState(false);

  // Sync value in when it changes externally (z.B. beim Laden).
  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || "";
    }
  }, [value]);

  function exec(cmd: string, arg?: string) {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
    emit();
  }

  function emit() {
    if (!ref.current) return;
    onChange(ref.current.innerHTML);
  }

  function formatBlock(tag: string) {
    exec("formatBlock", tag);
  }

  function setFontSize(px: string) {
    // execCommand fontSize erwartet 1-7. Wir nutzen stattdessen inline <span style>.
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (range.collapsed) return;
    const span = document.createElement("span");
    span.style.fontSize = px;
    try {
      range.surroundContents(span);
    } catch {
      // Falls die Selektion über mehrere Blöcke geht → ignorieren
    }
    emit();
  }

  function insertLink() {
    const url = window.prompt("Link-URL (z.B. https://… oder /kontakt):", "https://");
    if (!url) return;
    exec("createLink", url);
  }

  const buttons: ButtonSpec[] = [
    { label: "H1", title: "Überschrift 1", run: () => formatBlock("H2") },
    { label: "H2", title: "Überschrift 2", run: () => formatBlock("H3") },
    { label: "H3", title: "Zwischenüberschrift", run: () => formatBlock("H4") },
    { label: "¶", title: "Absatz", run: () => formatBlock("P") },
    { label: "B", title: "Fett", run: () => exec("bold") },
    { label: "I", title: "Kursiv", run: () => exec("italic") },
    { label: "U", title: "Unterstrichen", run: () => exec("underline") },
    { label: "•", title: "Aufzählung", run: () => exec("insertUnorderedList") },
    { label: "1.", title: "Nummerierung", run: () => exec("insertOrderedList") },
    { label: "⎘", title: "Link einfügen", run: insertLink },
    { label: "✕", title: "Formatierung entfernen", run: () => exec("removeFormat") }
  ];

  const sizes = [
    { label: "S", value: "14px" },
    { label: "M", value: "17px" },
    { label: "L", value: "22px" },
    { label: "XL", value: "28px" }
  ];

  return (
    <div
      className={`rounded-xl border bg-white transition ${
        focused ? "border-gold-400" : "border-royal-700/15"
      }`}
    >
      <div className="flex flex-wrap items-center gap-1 border-b border-royal-700/10 bg-cream-50 px-2 py-1.5">
        {buttons.map((b) => (
          <button
            type="button"
            key={b.label}
            onMouseDown={(e) => e.preventDefault()}
            onClick={b.run}
            title={b.title}
            className="rounded-md px-2 py-1 text-[12.5px] font-semibold text-royal-800 hover:bg-white hover:shadow-sm"
          >
            {b.label}
          </button>
        ))}
        <div className="mx-1 h-5 w-px bg-royal-700/15" />
        <span className="text-[10.5px] uppercase tracking-wider text-neutral-500">
          Größe
        </span>
        {sizes.map((s) => (
          <button
            type="button"
            key={s.value}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setFontSize(s.value)}
            title={`Text-Größe ${s.value}`}
            className="rounded-md px-2 py-1 text-[12px] font-semibold text-royal-800 hover:bg-white hover:shadow-sm"
          >
            {s.label}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        role="textbox"
        aria-multiline="true"
        suppressContentEditableWarning
        onInput={emit}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        data-placeholder={placeholder ?? "Text eingeben …"}
        className="rte-body px-4 py-3 text-[15px] leading-relaxed text-neutral-800 outline-none"
        style={{ minHeight }}
      />
      <style jsx>{`
        .rte-body:empty::before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }
        .rte-body :global(h2) {
          font-size: 1.6rem;
          font-weight: 500;
          margin: 0.6em 0 0.3em;
          color: #0a1033;
        }
        .rte-body :global(h3) {
          font-size: 1.3rem;
          font-weight: 500;
          margin: 0.6em 0 0.25em;
          color: #0a1033;
        }
        .rte-body :global(h4) {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0.5em 0 0.2em;
          color: #0a1033;
        }
        .rte-body :global(p) {
          margin: 0.5em 0;
        }
        .rte-body :global(ul),
        .rte-body :global(ol) {
          margin: 0.5em 0 0.5em 1.25em;
        }
        .rte-body :global(a) {
          color: #0a1033;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
