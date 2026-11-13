import hero from "@/assets/photos/hero.jpg.asset.json";
import lineman from "@/assets/photos/lineman.jpg.asset.json";
import lines from "@/assets/photos/lines.jpg.asset.json";
import tower from "@/assets/photos/tower.jpg.asset.json";
import tower2 from "@/assets/photos/tower2.jpg.asset.json";
import substation from "@/assets/photos/substation.jpg.asset.json";
import switchyard from "@/assets/photos/switchyard.jpg.asset.json";
import solar from "@/assets/photos/solar2.jpg.asset.json";
import wind from "@/assets/photos/wind.jpg.asset.json";
import cable from "@/assets/photos/cable.jpg.asset.json";
import earthing from "@/assets/photos/earthing.jpg.asset.json";
import pole from "@/assets/photos/pole.jpg.asset.json";

export const photos = {
  hero: hero.url,
  lineman: lineman.url,
  lines: lines.url,
  tower: tower.url,
  tower2: tower2.url,
  substation: substation.url,
  switchyard: switchyard.url,
  solar: solar.url,
  wind: wind.url,
  cable: cable.url,
  earthing: earthing.url,
  pole: pole.url,
};

export const company = {
  name: "Surendra Engineering Work Shop",
  short: "SEWS",
  established: 1998,
  phones: ["9424804808", "9826562976", "9302091327"],
  whatsapp: "919424804808",
  email: "sews808@gmail.com",
  addressLines: [
    "251, Infront of Agrawal Dharamshala,",
    "Vivekanand Colony,",
    "Agar, Dist. Agar Malwa,",
    "Madhya Pradesh - 465441",
  ],
  addressQuery:
    "251, Infront of Agrawal Dharamshala, Vivekanand Colony, Agar, Agar Malwa, Madhya Pradesh 465441",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type ServiceId = "transmission" | "civil" | "electrical" | "mechanical" | "supply";

export interface Service {
  id: ServiceId;
  index: string;
  title: string;
  summary: string;
  detail: string;
  keywords: string[];
  image: string;
}

export const services: Service[] = [
  {
    id: "transmission",
    index: "01",
    title: "Transmission & Distribution",
    summary: "EPC supply and installation of all types of lines, 11KV to 765KV.",
    detail:
      "Supply and installation of all types of transmission lines on an EPC basis, from 11KV up to 765KV — covering foundations, tower erection and wiring, along with substations.",
    keywords: ["EPC", "11KV – 765KV", "Foundation", "Erection", "Wiring", "Substations"],
    image: photos.lineman,
  },
  {
    id: "civil",
    index: "02",
    title: "Civil Works",
    summary: "Rafts, footings, pile casting, switchyards and roads.",
    detail:
      "All types of civil works including rafts, footings, pile casting, switchyard works and road construction.",
    keywords: ["Rafts", "Footing", "Pile Casting", "Switchyard", "Road Construction"],
    image: photos.switchyard,
  },
  {
    id: "electrical",
    index: "03",
    title: "Electrical Works",
    summary: "AC & DC cable laying, termination, erection, earthing and charging.",
    detail:
      "All kinds of AC and DC cable laying and termination, equipment erection, earthing and charging.",
    keywords: ["AC / DC Cabling", "Termination", "Equipment Erection", "Earthing", "Charging"],
    image: photos.cable,
  },
  {
    id: "mechanical",
    index: "04",
    title: "Mechanical Works",
    summary: "Structure erection, module mounting and mesh installation.",
    detail: "Structure erection, module mounting and installation, and mesh installation.",
    keywords: ["Structure Erection", "Module Mounting", "Installation", "Mesh Installation"],
    image: photos.solar,
  },
  {
    id: "supply",
    index: "05",
    title: "Material Supply",
    summary: "On-site supply of tower parts, conductors and accessories.",
    detail:
      "On-site supply of materials as per project requirement — all kinds of tower parts, conductors and accessories.",
    keywords: ["Tower Parts", "Conductors", "Accessories", "On-site Supply"],
    image: photos.tower2,
  },
];

export type ProjectCategory = "ehv" | "distribution" | "substation";
export type ProjectStatus = "Completed" | "Commissioned" | "Ongoing";

export const categories: { id: ProjectCategory; label: string; short: string }[] = [
  { id: "ehv", label: "EHV Transmission Lines", short: "EHV TL" },
  { id: "distribution", label: "11KV–33KV Transmission Lines", short: "11–33KV TL" },
  { id: "substation", label: "Substations", short: "Substations" },
];

export interface Project {
  no: string;
  title: string;
  client: string;
  location: string;
  category: ProjectCategory;
  status: ProjectStatus;
  statusText: string;
  voltage: string;
  services: ServiceId[];
  image: string;
}

export const projects: Project[] = [
  { no: "01", title: "132KV DCDS TL (Khujner–Chapiheda)", client: "Megha Engineering and Infrastructures Ltd.", location: "Rajgarh District, M.P.", category: "ehv", status: "Completed", statusText: "Completed in June 2025", voltage: "132KV", services: ["transmission", "civil", "supply"], image: photos.tower },
  { no: "02", title: "220KV DCSS TL (Mandideep Bhopal)", client: "KDBIL Pvt. Ltd. & HEG", location: "Mandideep Industrial Area, Bhopal, M.P.", category: "ehv", status: "Completed", statusText: "Completed in 2024", voltage: "220KV", services: ["transmission", "civil", "supply"], image: photos.lines },
  { no: "03", title: "400KV TL (Pachora–Handiya)", client: "GR Infraprojects Pvt. Ltd.", location: "Agar Malwa and Shajapur District, M.P.", category: "ehv", status: "Ongoing", statusText: "Ongoing project", voltage: "400KV", services: ["transmission", "civil", "supply"], image: photos.lineman },
  { no: "04", title: "765KV DCDS TL (Mandsaur–Nagda)", client: "Kalpataru Projects International Ltd.", location: "Ujjain and Mandsaur District, M.P.", category: "ehv", status: "Completed", statusText: "Completed in January 2026", voltage: "765KV", services: ["transmission", "civil", "supply"], image: photos.hero },
  { no: "05", title: "220KV DCSS TL (Pachora–Maksi)", client: "Keshma Power Pvt. Ltd.", location: "Agar Malwa District, M.P.", category: "ehv", status: "Ongoing", statusText: "Ongoing project", voltage: "220KV", services: ["transmission", "civil", "supply"], image: photos.tower2 },
  { no: "06", title: "11KV–33KV SC TL (300MW Solar Park)", client: "Avaada Sunshine Pvt. Ltd.", location: "Agar Malwa District, M.P.", category: "distribution", status: "Commissioned", statusText: "Commissioned in 2024", voltage: "11KV – 33KV", services: ["transmission", "electrical"], image: photos.solar },
  { no: "07", title: "11KV TL & 400KVA DTR", client: "Oriano Clean Energy Pvt. Ltd.", location: "Agar Malwa District, M.P.", category: "distribution", status: "Commissioned", statusText: "Commissioned in November 2025", voltage: "11KV", services: ["transmission", "electrical"], image: photos.pole },
  { no: "08", title: "33KV DC & SC TL (63MW IMC)", client: "Rays Power Infra Pvt. Ltd.", location: "Mandleswar, Khargone District, M.P.", category: "distribution", status: "Commissioned", statusText: "Commissioned in October 2025", voltage: "33KV", services: ["transmission", "electrical"], image: photos.earthing },
  { no: "09", title: "11KV TL and 100KVA DTR", client: "Oyster Renewables Pvt. Ltd.", location: "Agar Malwa District, M.P.", category: "distribution", status: "Completed", statusText: "Completed in December 2025", voltage: "11KV", services: ["transmission", "electrical"], image: photos.cable },
  { no: "10", title: "LT–11KV–33KV TL", client: "MPPKVVCL & STC (MP Power Transmission)", location: "Agar Malwa District, M.P.", category: "distribution", status: "Ongoing", statusText: "Ongoing projects", voltage: "LT – 33KV", services: ["transmission", "electrical"], image: photos.wind },
  { no: "11", title: "33KV/11KV Substation", client: "MPKVVCL & STC (M.P. Power Transmission)", location: "Agar Malwa District, M.P.", category: "substation", status: "Commissioned", statusText: "Commissioned in 2025", voltage: "33KV / 11KV", services: ["civil", "electrical", "mechanical"], image: photos.substation },
  { no: "12", title: "132KV/33KV Substation (Chapiheda)", client: "Megha Engineering and Infrastructures Ltd.", location: "Chapiheda, Rajgarh District, M.P.", category: "substation", status: "Commissioned", statusText: "Commissioned in 2025", voltage: "132KV / 33KV", services: ["civil", "electrical", "mechanical"], image: photos.switchyard },
  { no: "13", title: "220KV/33KV Substation (Surajpur)", client: "Ashoka Buildcon Pvt. Ltd.", location: "Surajpur, Shajapur District, M.P.", category: "substation", status: "Commissioned", statusText: "Commissioned in 2023", voltage: "220KV / 33KV", services: ["civil", "electrical", "mechanical"], image: photos.substation },
];

export function projectDescription(p: Project) {
  const cat = categories.find((c) => c.id === p.category)!.label;
  if (p.category === "substation")
    return `${p.voltage} substation works executed by SEWS for ${p.client} at ${p.location}. Listed in the SEWS company profile under ${cat}.`;
  return `${p.voltage} transmission line works executed by SEWS for ${p.client} across ${p.location}. Listed in the SEWS company profile under ${cat}.`;
}
