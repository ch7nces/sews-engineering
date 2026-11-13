import { photos } from "@/lib/site-data";
import { Reveal, SectionLabel, SplitWords } from "./motion";

const points = [
  ["Established in 1998", "Over two and a half decades in engineering contracting from Agar Malwa, Madhya Pradesh."],
  ["Multi-discipline capability", "Civil, electrical and mechanical works delivered under one contractor."],
  ["High-voltage expertise up to 765KV", "EPC supply and construction of 11KV, 33KV, 132KV, 220KV, 400KV and 765KV lines."],
  ["‘A’ Class Civil & Electrical contractor", "Positioned to execute civil and electrical scopes for transmission and substation works."],
  ["EPC supply & construction", "From material supply and foundations to erection, wiring and charging."],
  ["Skilled, seasoned manpower", "A team of well-skilled and seasoned manpower dedicated to quality work."],
  ["Substations 11KV to 220KV", "Substation works executed for utilities and EPC contractors."],
  ["Renewable sector base", "A strong base in renewable-sector transmission and distribution, including solar parks."],
];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-paper md:py-36">
      <img src={photos.lines} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-10" loading="lazy" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel index="04" label="Why Choose SEWS" dark />
        <h2 className="mt-8 max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl">
          <SplitWords text="Reliability you can build a grid on." />
        </h2>
        <ol className="mt-16 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {points.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 4) * 0.08} className="group bg-navy p-7 transition-colors hover:bg-steel">
              <li className="list-none">
                <span className="font-mono text-sm text-amber">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-4 block h-px w-8 bg-amber transition-all duration-500 group-hover:w-16" />
                <h3 className="mt-6 text-lg font-semibold">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper-dim">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
