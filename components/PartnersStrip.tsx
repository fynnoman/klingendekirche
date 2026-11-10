import { PARTNERS } from "@/lib/data";
import { OrnamentDouble } from "./Ornament";

export default function PartnersStrip() {
  return (
    <section className="border-t border-royal-700/10 bg-cream-100/60">
      <div className="container-wide py-14">
        <div className="mb-8 flex flex-col items-center text-center">
          <OrnamentDouble />
          <h2 className="headline mt-4 text-2xl font-medium text-royal-800 sm:text-3xl">
            Partner und Förderer
          </h2>
          <p className="mt-2 max-w-lg text-sm text-neutral-600">
            Unser Programm lebt von einem Netzwerk starker Institutionen und Freunde.
          </p>
        </div>
        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-5 text-center text-[13px] font-medium text-royal-800 sm:grid-cols-3 md:grid-cols-5">
          {PARTNERS.map((p) => (
            <li
              key={p.name}
              className="rounded-xl border border-royal-700/10 bg-white/80 px-3 py-4 shadow-[0_1px_0_rgba(0,0,0,.02)]"
            >
              <div className="leading-tight">{p.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
