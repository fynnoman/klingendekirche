"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { SITE } from "@/lib/data";
import { Ornament } from "./Ornament";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(253,251,246,0) 0%, rgba(253,251,246,0.55) 55%, rgba(253,251,246,1) 100%), url('https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=2400&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center 28%"
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 15% 10%, rgba(197,159,74,.18), transparent 55%), radial-gradient(ellipse at 90% 0%, rgba(31,59,130,.18), transparent 55%)"
          }}
        />
      </div>

      <div className="container-xl pt-24 pb-36 sm:pt-32 sm:pb-44">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl text-center"
        >
          <div className="mb-8 flex justify-center">
            <Ornament />
          </div>
          <div className="eyebrow mx-auto justify-center text-[13px]">
            Seit {SITE.foundedYear} · Saarlouis-Lisdorf
          </div>
          <h1 className="display mt-7 text-[64px] sm:text-[88px] md:text-[120px] lg:text-[148px]">
            Klingende
            <br />
            <span className="italic text-royal-700">Kirche.</span>
          </h1>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
            Ein Forum für anspruchsvolle Kirchenmusik aus Saarlouis-Lisdorf. Konzerte,
            Orgelakademie und internationaler Kompositionswettbewerb, getragen von 275 Mitgliedern
            und einem ausgezeichneten MAYER-Orgelinstrument.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="btn-primary text-base px-7 py-3.5">
              Nächste Konzerte
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10h12M12 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href="/" className="btn-ghost text-base px-7 py-3.5">
              Über den Verein
            </Link>
          </div>
        </motion.div>

        {/* Stats plate */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-24 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-3xl border border-royal-700/10 bg-royal-700/10 shadow-plate sm:grid-cols-3"
        >
          {[
            { k: "1993", v: "Gegründet" },
            { k: "275", v: "Mitglieder" },
            { k: "240+", v: "Konzerte" }
          ].map((s, i) => (
            <div key={i} className="bg-cream-50 px-6 py-10 text-center sm:py-12">
              <div className="display text-4xl text-royal-800 sm:text-5xl">{s.k}</div>
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-600">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-cream-50" />
    </section>
  );
}
