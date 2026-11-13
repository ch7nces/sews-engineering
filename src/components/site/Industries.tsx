import { photos } from "@/lib/site-data";
import { Reveal, SafeImg, SectionLabel, SplitWords } from "./motion";

const items = [
  ["Power Transmission", photos.tower],
  ["Power Distribution", photos.pole],
  ["Substations", photos.substation],
  ["Solar Infrastructure", photos.solar],
  ["Wind Energy", photos.wind],
  ["Civil Infrastructure", photos.switchyard],
  ["Electrical Installation", photos.cable],
  ["Mechanical Installation", photos.tower2],
] as const;

export function Industries() {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel index="05" label="Industries & Capabilities" />
        <h2 className="mt-8 max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl">
          <SplitWords text="Where our work powers the grid." />
        </h2>
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {items.map(([label, src], i) => (
            <Reveal key={label} delay={(i % 4) * 0.07} className="group relative aspect-[3/4] overflow-hidden bg-navy">
              <SafeImg src={src} alt={label} className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 text-paper">
                <span className="font-mono text-[0.65rem] text-amber">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-1 font-display text-base font-medium leading-tight md:text-lg">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
