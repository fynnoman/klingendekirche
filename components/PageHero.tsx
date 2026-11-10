import { Ornament } from "./Ornament";

export default function PageHero({
  eyebrow,
  title,
  subtitle
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section
      className="relative overflow-hidden border-b border-royal-700/10 bg-gradient-to-b from-cream-100/70 to-cream-50"
      style={{
        backgroundImage:
          "radial-gradient(500px 300px at 100% 0%, rgba(197,159,74,.14), transparent 60%), radial-gradient(500px 300px at 0% 30%, rgba(31,59,130,.08), transparent 60%), linear-gradient(180deg, rgba(243,236,217,.4), rgba(253,251,246,1))"
      }}
    >
      <div className="container-xl py-24 sm:py-36">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-7 flex justify-center">
            <Ornament />
          </div>
          {eyebrow && <div className="eyebrow mx-auto justify-center">{eyebrow}</div>}
          <h1 className="display mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
