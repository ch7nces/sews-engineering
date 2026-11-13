import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string } & HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Image revealed by a sliding mask (clip-path). */
export function MaskImage({ src, alt, className, imgClassName }: { src: string; alt: string; className?: string; imgClassName?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`relative overflow-hidden bg-steel ${className ?? ""}`}
      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease }}
    >
      <SafeImg src={src} alt={alt} className={`h-full w-full object-cover ${imgClassName ?? ""}`} />
    </motion.div>
  );
}

/** Image with graceful fallback to a technical placeholder if it fails to load. */
export function SafeImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={(e) => {
        const el = e.currentTarget;
        el.style.visibility = "hidden";
        el.parentElement?.classList.add("grid-lines");
      }}
    />
  );
}

export function SplitWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionLabel({ index, label, dark }: { index: string; label: string; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-4 eyebrow ${dark ? "text-paper-dim" : "text-muted-foreground"}`}>
      <span className="text-amber">{index}</span>
      <motion.span
        className="h-px w-12 origin-left bg-amber"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease }}
      />
      <span>{label}</span>
    </div>
  );
}

export function requestEnquiry(detail: { service?: string; message?: string }) {
  window.dispatchEvent(new CustomEvent("sews:enquire", { detail }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}
