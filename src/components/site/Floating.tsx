import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/site-data";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-amber" aria-hidden />;
}

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {show && (
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
            className="grid h-11 w-11 place-items-center border border-line bg-ink text-paper hover:text-amber">
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
      <a href={whatsappLink("Hello SEWS, I would like to discuss a project.")} target="_blank" rel="noopener noreferrer" aria-label="Chat with SEWS on WhatsApp"
        className="group flex h-14 items-center gap-2 rounded-full bg-success px-4 text-ink shadow-lg transition-transform hover:-translate-y-0.5">
        <MessageCircle className="h-6 w-6" />
        <span className="hidden text-sm font-medium sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
