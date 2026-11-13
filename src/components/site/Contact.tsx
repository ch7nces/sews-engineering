import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { company, services, whatsappLink } from "@/lib/site-data";
import { enquirySchema } from "@/lib/enquiry-schema";
import { submitEnquiry } from "@/lib/enquiry.functions";
import { Reveal, SectionLabel, SplitWords } from "./motion";

type Field = "full_name" | "company_name" | "phone" | "email" | "service" | "project_location" | "voltage_requirement" | "message" | "website";
const empty: Record<Field, string> = { full_name: "", company_name: "", phone: "", email: "", service: "", project_location: "", voltage_requirement: "", message: "", website: "" };

export function Contact() {
  const submit = useServerFn(submitEnquiry);
  const [v, setV] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const h = (e: Event) => {
      const d = (e as CustomEvent<{ service?: string; message?: string }>).detail;
      setState("idle");
      setV((p) => ({ ...p, service: d.service ?? p.service, message: d.message ?? p.message }));
    };
    window.addEventListener("sews:enquire", h);
    return () => window.removeEventListener("sews:enquire", h);
  }, []);

  const set = (k: Field) => (e: { target: { value: string } }) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = enquirySchema.safeParse(v);
    if (!parsed.success) {
      const errs: Partial<Record<Field, string>> = {};
      parsed.error.issues.forEach((i) => { const k = i.path[0] as Field; errs[k] ??= i.message; });
      setErrors(errs);
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setState("loading");
    setServerError("");
    try {
      await submit({ data: parsed.data });
      setState("done");
      setV(empty);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  const input = (k: Field, label: string, props: Record<string, unknown> = {}, required = false) => (
    <div>
      <label htmlFor={`f-${k}`} className="eyebrow text-[0.62rem] text-paper-dim">{label}{required && <span className="text-amber"> *</span>}</label>
      <input id={`f-${k}`} value={v[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined}
        className={`mt-2 h-12 w-full border-b bg-transparent text-base text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-amber ${errors[k] ? "border-destructive" : "border-line"}`} {...props} />
      {errors[k] && <p id={`e-${k}`} className="mt-1.5 text-xs text-destructive">{errors[k]}</p>}
    </div>
  );

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(company.addressQuery)}&output=embed`;

  return (
    <section id="contact" className="relative bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 md:px-8 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="06" label="Contact & Enquiry" dark />
          <h2 className="mt-8 text-4xl font-semibold leading-[1.05] md:text-6xl">
            <SplitWords text="Let's discuss your project." />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 text-paper-dim">Tell us about your transmission, substation or renewable infrastructure requirement. Prefer to talk? Call or WhatsApp us directly.</p>
            <ul className="mt-10 space-y-6">
              <li className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-amber" />
                <div className="flex flex-col gap-1">
                  {company.phones.map((p) => <a key={p} href={`tel:+91${p}`} className="font-display text-lg hover:text-amber">+91 {p.slice(0, 5)} {p.slice(5)}</a>)}
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-amber" />
                <a href={`mailto:${company.email}`} className="font-display text-lg hover:text-amber">{company.email}</a>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-amber" />
                <address className="not-italic text-paper-dim">{company.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
              </li>
            </ul>
            <a href={whatsappLink("Hello SEWS, I would like to discuss a project.")} target="_blank" rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 border border-line px-6 py-3.5 transition-colors hover:border-amber hover:text-amber">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <div className="relative border border-line bg-navy/60 p-6 md:p-10">
            <AnimatePresence mode="wait">
              {state === "done" ? (
                <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex min-h-[420px] flex-col items-start justify-center" role="status">
                  <CheckCircle2 className="h-12 w-12 text-success" />
                  <h3 className="mt-6 text-3xl font-semibold">Enquiry received.</h3>
                  <p className="mt-3 max-w-md text-paper-dim">Thank you — your enquiry has been recorded and our team will contact you. For anything urgent, call +91 {company.phones[0]}.</p>
                  <button onClick={() => setState("idle")} className="mt-8 border border-line px-5 py-3 text-sm hover:border-amber">Send another enquiry</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-7 sm:grid-cols-2">
                  <div className="sm:col-span-2"><p className="eyebrow text-amber">Request an Enquiry</p></div>
                  {input("full_name", "Full Name", { autoComplete: "name", maxLength: 100 }, true)}
                  {input("company_name", "Company / Organization", { autoComplete: "organization", maxLength: 150 })}
                  {input("phone", "Phone Number", { type: "tel", inputMode: "tel", autoComplete: "tel", maxLength: 20 }, true)}
                  {input("email", "Email Address", { type: "email", autoComplete: "email", maxLength: 255 })}
                  <div>
                    <label htmlFor="f-service" className="eyebrow text-[0.62rem] text-paper-dim">Service Interested In</label>
                    <select id="f-service" value={v.service} onChange={set("service")} className="mt-2 h-12 w-full border-b border-line bg-transparent text-base text-paper outline-none focus:border-amber">
                      <option value="" className="bg-ink">Select a service</option>
                      {services.map((s) => <option key={s.id} value={s.title} className="bg-ink">{s.title}</option>)}
                      <option value="Other" className="bg-ink">Other</option>
                    </select>
                  </div>
                  {input("project_location", "Project Location", { maxLength: 200 })}
                  <div className="sm:col-span-2">{input("voltage_requirement", "Project Voltage / Requirement", { placeholder: "e.g. 33KV line, 132KV substation", maxLength: 200 })}</div>
                  <div className="sm:col-span-2">
                    <label htmlFor="f-message" className="eyebrow text-[0.62rem] text-paper-dim">Message<span className="text-amber"> *</span></label>
                    <textarea id="f-message" rows={4} value={v.message} onChange={set("message")} maxLength={2000} aria-invalid={!!errors.message}
                      className={`mt-2 w-full resize-none border-b bg-transparent py-2 text-base text-paper outline-none focus:border-amber ${errors.message ? "border-destructive" : "border-line"}`} />
                    {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
                  </div>
                  {/* Honeypot: hidden from people, bots fill it */}
                  <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                    <label htmlFor="f-website">Website</label>
                    <input id="f-website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} />
                  </div>
                  {state === "error" && <p className="text-sm text-destructive sm:col-span-2" role="alert">{serverError}</p>}
                  <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-paper-dim">Fields marked * are required.</p>
                    <button type="submit" disabled={state === "loading"} className="inline-flex items-center justify-center gap-2 bg-amber px-8 py-4 font-medium text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-70">
                      {state === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Submit Enquiry"}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
      <div className="relative h-[360px] border-t border-line md:h-[440px]">
        <iframe title="SEWS office location on Google Maps" src={mapSrc} className="h-full w-full grayscale-[0.6] invert-[0.9] hue-rotate-180" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.addressQuery)}`} target="_blank" rel="noopener noreferrer"
          className="absolute bottom-5 left-5 bg-amber px-5 py-3 text-sm font-medium text-ink">Open in Google Maps</a>
      </div>
    </section>
  );
}
