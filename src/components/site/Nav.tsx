import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { company } from "@/lib/site-data";
import { ease } from "./motion";

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Wordmark({ compact }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center border border-amber font-display text-[0.7rem] font-bold tracking-wider text-amber">SEWS</span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-sm font-bold tracking-[0.18em]">SURENDRA</span>
          <span className="mt-1 block text-[0.6rem] tracking-[0.28em] text-paper-dim">ENGINEERING WORK SHOP</span>
        </span>
      )}
    </span>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach((n) => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 text-paper transition-colors duration-500 ${scrolled ? "border-b border-line bg-ink/95 backdrop-blur" : "bg-transparent"}`}>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#home" aria-label="Surendra Engineering Work Shop — home"><Wordmark /></a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navItems.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={`relative py-2 text-sm transition-colors ${active === n.id ? "text-paper" : "text-paper-dim hover:text-paper"}`}>
              {n.label}
              {active === n.id && <motion.span layoutId="nav-active" className="absolute -bottom-0.5 left-0 h-px w-full bg-amber" transition={{ duration: 0.4, ease }} />}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden bg-amber px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 sm:inline-block">
            Request an Enquiry
          </a>
          <button className="grid h-11 w-11 place-items-center border border-line lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink px-6 pb-8 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex h-[72px] items-center justify-between">
              <Wordmark />
              <button className="grid h-11 w-11 place-items-center border border-line" onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-10 flex flex-col" aria-label="Mobile">
              {navItems.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-line py-5 font-display text-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease }}
                >
                  <span className="eyebrow text-amber">0{i + 1}</span>
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto space-y-3">
              <a href={`tel:+91${company.phones[0]}`} className="flex items-center gap-3 text-paper-dim"><Phone className="h-4 w-4 text-amber" /> +91 {company.phones[0]}</a>
              <a href="#contact" onClick={() => setOpen(false)} className="block bg-amber py-4 text-center font-medium text-ink">Request an Enquiry</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
