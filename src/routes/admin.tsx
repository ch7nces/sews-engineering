import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Enquiry = Database["public"]["Tables"]["enquiries"]["Row"];
type Status = Database["public"]["Enums"]["enquiry_status"];
const STATUSES: { v: Status; l: string }[] = [
  { v: "new", l: "New" }, { v: "contacted", l: "Contacted" }, { v: "in_progress", l: "In Progress" }, { v: "closed", l: "Closed" },
];

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Enquiry Dashboard — SEWS" },
      { name: "description", content: "Staff-only enquiry management for Surendra Engineering Work Shop." },
      { property: "og:title", content: "Enquiry Dashboard — SEWS" },
      { property: "og:description", content: "Staff-only enquiry management." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    return () => data.subscription.unsubscribe();
  }, []);
  if (!ready) return <Shell><p className="text-muted-foreground">Loading…</p></Shell>;
  return <Shell>{session ? <Dashboard /> : <Login />}</Shell>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-ink text-paper">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="font-display font-bold tracking-widest">SEWS <span className="text-amber">· Enquiries</span></Link>
          <button onClick={() => supabase.auth.signOut()} className="text-sm text-paper-dim hover:text-paper">Sign out</button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-10">{children}</main>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  async function go(e: FormEvent) {
    e.preventDefault(); setBusy(true); setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    if (error) setErr(error.message); setBusy(false);
  }
  return (
    <form onSubmit={go} className="mx-auto max-w-sm space-y-4 border border-border bg-card p-8">
      <h1 className="text-2xl font-semibold">Staff sign in</h1>
      <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 w-full border border-input bg-background px-3" />
      <input type="password" required placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} className="h-11 w-full border border-input bg-background px-3" />
      {err && <p className="text-sm text-destructive">{err}</p>}
      <button disabled={busy} className="h-11 w-full bg-navy text-primary-foreground">{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}

function Dashboard() {
  const [rows, setRows] = useState<Enquiry[] | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [q, setQ] = useState(""); const [status, setStatus] = useState<Status | "all">("all"); const [from, setFrom] = useState(""); const [to, setTo] = useState("");
  const [sel, setSel] = useState<Enquiry | null>(null);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", u.user?.id ?? "");
      const admin = !!roles?.some((r) => r.role === "admin");
      setIsAdmin(admin);
      if (!admin) return;
      const { data } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
      setRows(data ?? []);
    })();
  }, []);

  const list = useMemo(() => (rows ?? []).filter((r) => {
    const s = q.toLowerCase();
    const d = r.created_at.slice(0, 10);
    return (status === "all" || r.status === status) && (!from || d >= from) && (!to || d <= to) &&
      (!s || `${r.full_name} ${r.company_name ?? ""} ${r.phone} ${r.email ?? ""} ${r.message}`.toLowerCase().includes(s));
  }), [rows, q, status, from, to]);

  async function update(id: string, s: Status) {
    const { error } = await supabase.from("enquiries").update({ status: s }).eq("id", id);
    if (!error) { setRows((p) => p!.map((r) => (r.id === id ? { ...r, status: s } : r))); setSel((p) => (p && p.id === id ? { ...p, status: s } : p)); }
  }

  if (isAdmin === null) return <p className="text-muted-foreground">Checking access…</p>;
  if (!isAdmin) return <p className="text-muted-foreground">Your account does not have admin access to enquiries.</p>;

  return (
    <div>
      <h1 className="text-3xl font-semibold">Enquiries</h1>
      <div className="mt-6 flex flex-wrap gap-3">
        <input placeholder="Search name, phone, message" value={q} onChange={(e) => setQ(e.target.value)} className="h-10 min-w-60 flex-1 border border-input bg-card px-3 text-sm" />
        <select value={status} onChange={(e) => setStatus(e.target.value as Status | "all")} className="h-10 border border-input bg-card px-3 text-sm">
          <option value="all">All statuses</option>{STATUSES.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
        </select>
        <input type="date" aria-label="From date" value={from} onChange={(e) => setFrom(e.target.value)} className="h-10 border border-input bg-card px-3 text-sm" />
        <input type="date" aria-label="To date" value={to} onChange={(e) => setTo(e.target.value)} className="h-10 border border-input bg-card px-3 text-sm" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <ul className="divide-y divide-border border border-border bg-card lg:col-span-2">
          {rows === null && <li className="p-4 text-sm text-muted-foreground">Loading…</li>}
          {rows && list.length === 0 && <li className="p-4 text-sm text-muted-foreground">No enquiries found.</li>}
          {list.map((r) => (
            <li key={r.id}><button onClick={() => setSel(r)} className={`w-full p-4 text-left hover:bg-muted ${sel?.id === r.id ? "bg-muted" : ""}`}>
              <div className="flex justify-between gap-2"><span className="font-medium">{r.full_name}</span><span className="eyebrow text-[0.6rem] text-muted-foreground">{STATUSES.find((s) => s.v === r.status)?.l}</span></div>
              <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()} · {r.service ?? "General"}</p>
            </button></li>
          ))}
        </ul>
        <div className="border border-border bg-card p-6 lg:col-span-3">
          {!sel ? <p className="text-sm text-muted-foreground">Select an enquiry to view details.</p> : (
            <div>
              <h2 className="text-2xl font-semibold">{sel.full_name}</h2>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                {([["Company", sel.company_name], ["Phone", sel.phone], ["Email", sel.email], ["Service", sel.service], ["Location", sel.project_location], ["Voltage / Requirement", sel.voltage_requirement], ["Received", new Date(sel.created_at).toLocaleString()]] as const).map(([k, v]) => (
                  <div key={k}><dt className="eyebrow text-[0.6rem] text-muted-foreground">{k}</dt><dd>{v || "—"}</dd></div>
                ))}
              </dl>
              <p className="eyebrow mt-5 text-[0.6rem] text-muted-foreground">Message</p>
              <p className="mt-1 whitespace-pre-wrap text-sm">{sel.message}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {STATUSES.map((s) => <button key={s.v} onClick={() => update(sel.id, s.v)} className={`border px-3 py-2 text-sm ${sel.status === s.v ? "border-navy bg-navy text-primary-foreground" : "border-border"}`}>{s.l}</button>)}
              </div>
              <div className="mt-4 flex gap-4 text-sm">
                <a className="underline" href={`tel:${sel.phone}`}>Call</a>
                {sel.email && <a className="underline" href={`mailto:${sel.email}`}>Email</a>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
