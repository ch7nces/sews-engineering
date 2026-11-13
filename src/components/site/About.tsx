import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { photos } from "@/lib/site-data";
import { MaskImage, Reveal, SectionLabel, SplitWords } from "./motion";

const disciplines = ["Civil", "Electrical", "Mechanical", "Solar", "Wind", "Transmission & Distribution"];
const lineKV = ["11KV", "33KV", "132KV", "220KV", "400KV", "765KV"];
const subKV = ["11KV", "33KV", "132KV", "220KV"];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-10%"]);

  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-36">
      <div ref={ref} className="pointer-events-none absolute -top-6 left-0 select-none whitespace-nowrap font-display text-[28vw] font-bold leading-none text-foreground/[0.04] md:text-[22vw]" aria-hidden>
        <motion.span style={{ x }} className="block">1998</motion.span>
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <SectionLabel index="01" label="About the Company" />
          <h2 className="mt-8 text-4xl font-semibold leading-[1.05] md:text-6xl">
            <SplitWords text="Trusted engineering, built since 1998." />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-foreground/80">
              Established in 1998, Surendra Engineering Work Shop (SEWS) is a well-experienced and trusted firm providing engineering and energy solutions — Civil, Electrical, Mechanical, Solar, Wind and Transmission — as an <strong className="font-semibold text-foreground">‘A’ Class Civil &amp; Electrical contractor</strong>.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              We are dedicated to quality work, backed by a team of well-skilled and seasoned manpower. We have built a strong base in renewable-sector transmission and distribution, and keep evolving — adopting new techniques and methods to meet demanding standards.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
            <div className="bg-background p-6">
              <p className="eyebrow text-muted-foreground">EPC Transmission Lines</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {lineKV.map((k) => <span key={k} className="border border-border px-2.5 py-1 font-mono text-xs">{k}</span>)}
              </div>
            </div>
            <div className="bg-background p-6">
              <p className="eyebrow text-muted-foreground">Substations</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {subKV.map((k) => <span key={k} className="border border-border px-2.5 py-1 font-mono text-xs">{k}</span>)}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {disciplines.map((d) => (
                <li key={d} className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-amber" />{d}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="relative lg:col-span-6">
          <MaskImage src={photos.tower2} alt="Lattice transmission tower structure" className="aspect-[4/5] w-full" />
          <Reveal delay={0.4} className="absolute -bottom-8 -left-4 bg-navy p-6 text-paper md:-left-10 md:p-8">
            <p className="eyebrow text-amber">Est.</p>
            <p className="font-display text-6xl font-bold md:text-7xl">1998</p>
            <p className="mt-2 max-w-[14rem] text-sm text-paper-dim">Agar, Dist. Agar Malwa, Madhya Pradesh</p>
          </Reveal>
          <motion.div className="absolute -right-3 top-10 hidden h-40 w-px origin-top bg-amber md:block" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.5 }} />
        </div>
      </div>
    </section>
  );
}
