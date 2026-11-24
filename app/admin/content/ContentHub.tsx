"use client";

import { useState } from "react";
import NewsEditor from "./NewsEditor";
import GalleryEditor from "./GalleryEditor";
import PartnerEditor from "./PartnerEditor";
import BoardEditor from "./BoardEditor";
import MembersEditor from "./MembersEditor";
import SettingsEditor from "./SettingsEditor";
import BlocksEditor from "./BlocksEditor";

type SubTab =
  | "news"
  | "galerien"
  | "partner"
  | "vorstand"
  | "mitglieder"
  | "kontakt"
  | "bloecke";

const TABS: { key: SubTab; label: string }[] = [
  { key: "news", label: "News" },
  { key: "galerien", label: "Beiträge / Galerien" },
  { key: "partner", label: "Partner" },
  { key: "vorstand", label: "Vorstand" },
  { key: "mitglieder", label: "Mitgliederlisten" },
  { key: "kontakt", label: "Kontakt & Bank" },
  { key: "bloecke", label: "Freitext-Blöcke" }
];

export default function ContentHub() {
  const [tab, setTab] = useState<SubTab>("news");
  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap gap-2 border-b border-royal-700/10 pb-3">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition ${
              tab === t.key
                ? "bg-royal-800 text-cream-50"
                : "border border-royal-700/15 bg-white text-neutral-700 hover:text-royal-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === "news" && <NewsEditor />}
      {tab === "galerien" && <GalleryEditor />}
      {tab === "partner" && <PartnerEditor />}
      {tab === "vorstand" && <BoardEditor />}
      {tab === "mitglieder" && <MembersEditor />}
      {tab === "kontakt" && <SettingsEditor />}
      {tab === "bloecke" && <BlocksEditor />}
    </div>
  );
}
