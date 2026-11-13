import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { photos } from "@/lib/site-data";
import { ease } from "./motion";

const strip = ["Established 1998", "Transmission & Distribution", "Civil & Electrical Engineering", "Renewable Energy Infrastructure"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const lines = ["ENGINEERING THE POWER", "BEHIND PROGRESS."];

  return (
    <section id="home" ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={photos.hero} alt="High-voltage transmission towers at dusk" className="h-full w-full object-cover animate-slow-zoom" fetchPriority="high" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/45 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-28 md:px-8">
        <motion.p className="eyebrow flex items-center gap-3 text-amber" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <span className="h-px w-10 bg-amber" /> A-Class Civil & Electrical Contractor · Agar Malwa, M.P.
        </motion.p>
        <h1 className="mt-6 max-w-5xl font-display text-[2.6rem] font-bold leading-[0.98] sm:text-6xl md:text-7xl lg:text-[5.6rem]">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-1">
              <motion.span className="block" initial={reduce ? false : { y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1, delay: 0.35 + i * 0.12, ease }}>
                {i === 1 ? <>BEHIND <span className="text-amber">PROGRESS.</span></> : l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="mt-7 max-w-xl text-base text-paper-dim md:text-lg" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8, ease }}>
          Delivering dependable engineering, transmission and infrastructure solutions since 1998.
        </motion.p>
        <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8, ease }}>
          <a href="#services" className="group inline-flex items-center justify-center gap-3 bg-amber px-7 py-4 font-medium text-ink transition-transform hover:-translate-y-0.5">
            Explore Our Capabilities <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#contact" className="inline-flex items-center justify-center border border-paper/40 px-7 py-4 font-medium transition-colors hover:border-amber hover:text-amber">
            Discuss Your Project
          </a>
        </motion.div>
      </div>

      <a href="#about" className="relative mx-auto mb-6 hidden flex-col items-center gap-2 text-paper-dim md:flex" aria-label="Scroll to About">
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line"><span className="absolute left-0 top-0 h-3 w-px bg-amber animate-scroll-dot" /></span>
      </a>

      <div className="relative border-t border-line bg-ink/60 backdrop-blur-sm">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {strip.map((s, i) => (
            <motion.li key={s} className="eyebrow border-line px-5 py-5 text-[0.62rem] text-paper-dim md:border-l md:px-8 md:first:border-l-0 [&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-r-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 + i * 0.1 }}>
              <span className="mr-2 text-amber">0{i + 1}</span>{s}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
