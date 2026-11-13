import { MessageCircle } from "lucide-react";
import { company, services, whatsappLink } from "@/lib/site-data";
import { navItems, Wordmark } from "./Nav";
import { Reveal } from "./motion";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <Reveal className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Wordmark />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper-dim">
            Established in 1998, an ‘A’ Class Civil & Electrical contractor delivering transmission lines, substations and renewable infrastructure works across Madhya Pradesh.
          </p>
          <a href={whatsappLink("Hello SEWS, I would like to discuss a project.")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 bg-amber px-5 py-3 text-sm font-medium text-ink">
            <MessageCircle className="h-4 w-4" /> WhatsApp Us
          </a>
        </div>
        <div className="lg:col-span-2">
          <p className="eyebrow text-amber">Navigate</p>
          <ul className="mt-5 space-y-3 text-sm">{navItems.map((n) => <li key={n.id}><a href={`#${n.id}`} className="text-paper-dim hover:text-paper">{n.label}</a></li>)}</ul>
        </div>
        <div className="lg:col-span-3">
          <p className="eyebrow text-amber">Services</p>
          <ul className="mt-5 space-y-3 text-sm">{services.map((s) => <li key={s.id}><a href="#services" className="text-paper-dim hover:text-paper">{s.title}</a></li>)}</ul>
        </div>
        <div className="lg:col-span-3">
          <p className="eyebrow text-amber">Contact</p>
          <ul className="mt-5 space-y-3 text-sm text-paper-dim">
            {company.phones.map((p) => <li key={p}><a href={`tel:+91${p}`} className="hover:text-paper">+91 {p}</a></li>)}
            <li><a href={`mailto:${company.email}`} className="hover:text-paper">{company.email}</a></li>
            <li><address className="not-italic">{company.addressLines.join(" ")}</address></li>
          </ul>
        </div>
      </Reveal>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-paper-dim md:flex-row md:items-center md:justify-between md:px-8">
          <p>© 2026 Surendra Engineering Work Shop. All Rights Reserved.</p>
          <p className="eyebrow text-[0.6rem]">Engineering • Energy • Infrastructure</p>
        </div>
      </div>
    </footer>
  );
}
