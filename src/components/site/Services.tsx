import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { services, whatsappLink, type Service } from "@/lib/site-data";
import { Reveal, SafeImg, SectionLabel, SplitWords, requestEnquiry } from "./motion";

export function Services() {
  const [open, setOpen] = useState<Service | null>(null);
  return (
    <section id="services" className="relative bg-ink py-24 text-paper md:py-36">
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="02" label="Our Services" dark />
            <h2 className="mt-8 text-4xl font-semibold leading-[1.05] md:text-6xl">
              <SplitWords text="Five disciplines. One accountable contractor." />
            </h2>
          </div>
          <Reveal className="lg:col-span-5">
            <p className="text-paper-dim">From foundations to charging, SEWS executes the complete scope of transmission, substation and renewable infrastructure works. Select a service for the full scope.</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08} className={`bg-ink ${i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}`}>
              <button onClick={() => setOpen(s)} className="group relative flex h-full w-full flex-col text-left focus-visible:outline-2 focus-visible:outline-amber" aria-label={`View ${s.title} details`}>
                <div className={`relative overflow-hidden bg-steel ${i === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
                  <SafeImg src={s.image} alt={s.title} className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <span className="absolute left-5 top-5 font-mono text-xs text-amber">{s.index}</span>
                </div>
                <div className="relative flex flex-1 flex-col p-6 md:p-8">
                  <span className="absolute left-0 top-0 h-px w-0 bg-amber transition-all duration-500 group-hover:w-full" />
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-semibold">{s.title}</h3>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-amber transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  <p className="mt-3 text-sm text-paper-dim">{s.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.keywords.slice(0, 4).map((k) => <span key={k} className="eyebrow border border-line px-2 py-1 text-[0.58rem] text-paper-dim">{k}</span>)}
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
          <div className="flex flex-col justify-between bg-navy p-8">
            <p className="eyebrow text-amber">Have a scope in mind?</p>
            <p className="mt-6 font-display text-2xl">Share your project location, voltage level and requirement — our team will get back to you.</p>
            <button onClick={() => requestEnquiry({})} className="mt-8 self-start bg-amber px-6 py-3 font-medium text-ink transition-transform hover:-translate-y-0.5">Request an Enquiry</button>
          </div>
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-line bg-ink p-0 text-paper sm:rounded-none">
          {open && (
            <>
              <div className="relative aspect-[16/8] overflow-hidden bg-steel">
                <SafeImg src={open.image} alt={open.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
              </div>
              <div className="p-6 md:p-10">
                <p className="eyebrow text-amber">Service {open.index}</p>
                <DialogTitle className="mt-3 font-display text-3xl font-semibold md:text-4xl">{open.title}</DialogTitle>
                <DialogDescription className="mt-4 text-base leading-relaxed text-paper-dim">{open.detail}</DialogDescription>
                <div className="mt-6 flex flex-wrap gap-2">
                  {open.keywords.map((k) => <span key={k} className="eyebrow border border-line px-2.5 py-1 text-[0.6rem]">{k}</span>)}
                </div>
                <p className="mt-6 text-xs text-paper-dim">Photograph is illustrative of the type of work.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button onClick={() => { requestEnquiry({ service: open.title }); setOpen(null); }} className="bg-amber px-6 py-3 font-medium text-ink">Enquire about {open.title}</button>
                  <a href={whatsappLink(`Hello SEWS, I am interested in your ${open.title} services. I would like to discuss a project.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-line px-6 py-3 hover:border-amber">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
