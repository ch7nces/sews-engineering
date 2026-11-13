import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ease } from "./motion";

export function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try { seen = !!sessionStorage.getItem("sews-intro"); } catch {}
    if (seen) { setShow(false); return; }
    const t = setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem("sews-intro", "1"); } catch {}
    }, reduce ? 600 : 2300);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [show]);

  const word = "SURENDRA";
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="sews-intro fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink text-paper"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease }}
          aria-hidden
        >
          <motion.div className="absolute inset-0 grid-lines" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 1.2 }} />
          <motion.div
            className="absolute left-0 top-1/2 h-px w-full origin-left bg-amber"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: [1, 1, 0.25] }}
            transition={{ duration: 1.1, ease }}
          />
          <div className="relative px-6 text-center">
            <h1 className="flex justify-center overflow-hidden font-display text-5xl font-bold tracking-[0.12em] sm:text-7xl md:text-8xl">
              {word.split("").map((c, i) => (
                <motion.span key={i} className="inline-block" initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.7, delay: 0.35 + i * 0.045, ease }}>
                  {c}
                </motion.span>
              ))}
            </h1>
            <div className="overflow-hidden">
              <motion.p className="mt-3 font-display text-base tracking-[0.42em] text-paper-dim sm:text-xl" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 0.85, ease }}>
                ENGINEERING WORK SHOP
              </motion.p>
            </div>
            <motion.p className="eyebrow mt-8 text-amber" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25, duration: 0.6 }}>
              Engineering • Energy • Infrastructure
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
