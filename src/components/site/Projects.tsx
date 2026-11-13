import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MapPin, MessageCircle, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { categories, projectDescription, projects, services, whatsappLink, type Project, type ProjectCategory, type ProjectStatus } from "@/lib/site-data";
import { SafeImg, SectionLabel, SplitWords, ease, requestEnquiry } from "./motion";

const statuses: (ProjectStatus | "all")[] = ["all", "Completed", "Commissioned", "Ongoing"];

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const cls = status === "Ongoing" ? "bg-amber text-ink" : "bg-paper text-ink";
  return (
    <span className={`eyebrow inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.58rem] ${cls}`}>
      {status === "Ongoing" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />}
      {status}
    </span>
  );
}

export function Projects() {
  const [cat, setCat] = useState<ProjectCategory | "all">("all");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Project | null>(null);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (cat === "all" || p.category === cat) &&
        (status === "all" || p.status === status) &&
        (!s || `${p.title} ${p.client} ${p.location}`.toLowerCase().includes(s)),
    );
  }, [cat, status, q]);

  return (
    <section id="projects" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="03" label="Project Portfolio" />
            <h2 className="mt-8 text-4xl font-semibold leading-[1.05] md:text-6xl">
              <SplitWords text="Lines and substations across Madhya Pradesh." />
            </h2>
          </div>
          <p className="text-muted-foreground lg:col-span-4">
            Thirteen recent projects from 11KV distribution to 765KV EHV transmission, delivered for leading EPC contractors, developers and utilities.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-14 flex flex-col gap-5 border-y border-border py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-5 flex gap-1 overflow-x-auto px-5 lg:mx-0 lg:px-0" role="tablist" aria-label="Project category">
            {[{ id: "all" as const, short: "All Projects" }, ...categories].map((c) => {
              const count = c.id === "all" ? projects.length : projects.filter((p) => p.category === c.id).length;
              const on = cat === c.id;
              return (
                <button key={c.id} role="tab" aria-selected={on} onClick={() => setCat(c.id)}
                  className={`relative shrink-0 px-4 py-2.5 text-sm transition-colors ${on ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {on && <motion.span layoutId="cat-pill" className="absolute inset-0 bg-navy" transition={{ duration: 0.4, ease }} />}
                  <span className="relative">{c.short} <span className="font-mono text-xs opacity-60">{String(count).padStart(2, "0")}</span></span>
                </button>
              );
            })}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="status-filter">Filter by status</label>
            <select id="status-filter" value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus | "all")}
              className="h-11 border border-input bg-card px-3 text-sm">
              {statuses.map((s) => <option key={s} value={s}>{s === "all" ? "All statuses" : s}</option>)}
            </select>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <label className="sr-only" htmlFor="project-search">Search projects</label>
              <input id="project-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search project or client"
                className="h-11 w-full border border-input bg-card pl-9 pr-3 text-sm outline-none focus:border-amber sm:w-64" />
            </div>
          </div>
        </div>

        <motion.div layout className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.article key={p.no} layout
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55, delay: Math.min(i, 6) * 0.05, ease }}
                className={i % 7 === 0 && list.length > 2 ? "sm:col-span-2" : ""}>
                <button onClick={() => setOpen(p)} className="group block w-full text-left" aria-label={`View project ${p.title}`}>
                  <div className={`relative overflow-hidden bg-navy ${i % 7 === 0 && list.length > 2 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                    <SafeImg src={p.image} alt="" className="h-full w-full object-cover transition duration-[900ms] group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                    <div className="absolute left-4 top-4 flex items-center gap-2"><StatusBadge status={p.status} /></div>
                    <span className="absolute right-4 top-4 font-mono text-xs text-paper">{p.no} / 13</span>
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-paper">
                      <span className="font-display text-3xl font-bold md:text-4xl">{p.voltage}</span>
                      <span className="grid h-10 w-10 place-items-center bg-amber text-ink transition-transform duration-300 group-hover:-translate-y-1"><ArrowUpRight className="h-4 w-4" /></span>
                    </div>
                  </div>
                  <div className="relative pt-5">
                    <span className="absolute left-0 top-0 h-px w-full bg-border" />
                    <span className="absolute left-0 top-0 h-px w-0 bg-amber transition-all duration-500 group-hover:w-full" />
                    <p className="eyebrow text-muted-foreground">{categories.find((c) => c.id === p.category)!.short}</p>
                    <h3 className="mt-2 text-xl font-semibold leading-snug">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.client}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5 text-amber" />{p.location}</p>
                  </div>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && (
          <div className="mt-10 border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">No projects match these filters.</p>
            <button onClick={() => { setCat("all"); setStatus("all"); setQ(""); }} className="mt-4 text-sm underline underline-offset-4">Clear filters</button>
          </div>
        )}
        <p className="mt-12 text-xs text-muted-foreground">Project photographs are illustrative infrastructure imagery and not documentation of the specific sites listed.</p>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto border-border bg-background p-0 sm:rounded-none">
          {open && (
            <div className="grid md:grid-cols-5">
              <div className="relative min-h-56 bg-navy md:col-span-2">
                <SafeImg src={open.image} alt="Illustrative infrastructure photograph" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <div className="absolute bottom-5 left-5 text-paper">
                  <p className="eyebrow text-amber">Project {open.no}</p>
                  <p className="font-display text-4xl font-bold">{open.voltage}</p>
                </div>
              </div>
              <div className="p-6 md:col-span-3 md:p-10">
                <StatusBadge status={open.status} />
                <DialogTitle className="mt-4 font-display text-2xl font-semibold md:text-3xl">{open.title}</DialogTitle>
                <DialogDescription className="mt-3 leading-relaxed text-muted-foreground">{projectDescription(open)}</DialogDescription>
                <dl className="mt-6 grid grid-cols-1 gap-px border border-border bg-border text-sm sm:grid-cols-2">
                  {[
                    ["Client", open.client],
                    ["Location", open.location],
                    ["Voltage level", open.voltage],
                    ["Status", open.statusText],
                    ["Category", categories.find((c) => c.id === open.category)!.label],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-background p-4">
                      <dt className="eyebrow text-[0.6rem] text-muted-foreground">{k}</dt>
                      <dd className="mt-1 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="eyebrow mt-6 text-muted-foreground">Related services</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {open.services.map((id) => <span key={id} className="border border-border px-2.5 py-1 text-xs">{services.find((s) => s.id === id)!.title}</span>)}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button onClick={() => { requestEnquiry({ service: "Transmission & Distribution", message: `I'd like to discuss a project similar to ${open.title}.` }); setOpen(null); }}
                    className="bg-navy px-6 py-3 font-medium text-primary-foreground">Discuss a similar project</button>
                  <a href={whatsappLink(`Hello SEWS, I saw your project "${open.title}" and would like to discuss a similar project.`)} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 hover:border-amber">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
