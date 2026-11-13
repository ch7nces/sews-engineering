import { createFileRoute } from "@tanstack/react-router";
import { Intro } from "@/components/site/Intro";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { WhyUs } from "@/components/site/WhyUs";
import { Industries } from "@/components/site/Industries";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingActions, ScrollProgress } from "@/components/site/Floating";

const title = "SEWS — Transmission, Substation & Infrastructure Engineering since 1998";
const description =
  "Surendra Engineering Work Shop: A-Class Civil & Electrical contractor delivering EPC transmission lines 11KV–765KV, substations, civil, electrical and mechanical works in Madhya Pradesh.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Intro />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <WhyUs />
        <Industries />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
