import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Phone,
  Truck,
  PhoneCall,
  ClipboardCheck,
  Wrench,
  PackageCheck,
  Star,
  Mail,
  ShieldCheck,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Gauge,
  Zap,
  ChevronRight,
  Menu,
  X,
  Search,
  ArrowUp,
  Cog,
  Flame,
  CircleDot,
  Layers,
  Droplets,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kardánjavítás — Országos kardántengely javítás futárszolgálattal" },
      {
        name: "description",
        content:
          "Személy- és teherautó, kamion, busz, mezőgazdasági és munkagépek kardántengelyének teljes körű felújítása. Országos kiszerelő partnerhálózat, oda-vissza futárszolgálat, akár 24 órán belül.",
      },
    ],
  }),
  component: Home,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        const dur = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.16em]"
      style={{
        background: "rgba(249,115,22,0.1)",
        border: "1px solid rgba(249,115,22,0.22)",
        color: "hsl(32 92% 65%)",
      }}
    >
      {children}
    </span>
  );
}

const services = [
  {
    icon: Wrench,
    title: "Kardánjavítás",
    desc: "Személy- és teherautó, SUV, pick-up, kamion, autóbusz, munkagép kardántengelyek teljes körű felújítása és javítása.",
    img: "https://kardanjavitas.hu/wp-content/uploads/2025/01/Kardantengely_javitas_1920x900px_Slider_jobb.jpg",
  },
  {
    icon: Truck,
    title: "Futárszolgálat",
    desc: "Oda-vissza szállítás az egész országban. Akár 24 órán belül érte megyünk — országos kiszerelő partnerhálózattal.",
    img: "https://kardanjavitas.hu/wp-content/uploads/2024/12/Kamion_kardan_javitas_1920x900px_Slider3-1.jpg",
  },
  {
    icon: PhoneCall,
    title: "Telefonos tanácsadás",
    desc: "Ingyenes szakértői tanácsadás, gyors árajánlat és rövid javítási idő. Kérjen visszahívást!",
    img: "https://kardanjavitas.hu/wp-content/uploads/2025/02/Teherauto_kardanjavitas.jpg",
  },
  {
    icon: ShieldCheck,
    title: "Garancia",
    desc: "Minimum 1/2 év teljes körű garancia. 100%-os ügyfél-elégedettség, valós Google értékelésekkel.",
    img: "https://kardanjavitas.hu/wp-content/uploads/2024/12/Mezogazdasagi_kardan_javitas_1920x900px_Slider2.jpg",
  },
];

const processSteps = [
  { icon: PhoneCall, title: "Hívjon!", desc: "Tájékoztatjuk a javítás menetéről, várható időről és költségről." },
  { icon: Truck, title: "Futárt küldünk", desc: "Azonnal futárt küldünk a kiszerelt alkatrészért az Ön címére." },
  { icon: ClipboardCheck, title: "Árajánlat", desc: "Bevizsgálás után pontos árat adunk. Ha elfogadja, nekiállunk." },
  { icon: Wrench, title: "Javítás", desc: "A javítást szakszerűen és a lehető leggyorsabban elvégezzük." },
  { icon: PackageCheck, title: "Visszaszállítás", desc: "Futárunk visszaszállítja a kész kardánt az Ön által megadott címre." },
];

const whyUs = [
  { icon: Zap,          t: "Gyors átfutás",          sub: "Pénteken beküldöd, hétfőn visszakapod",      d: "Az alkatrész beérkezésétől 24-48 órán belül garantáltan elkészítjük — nem kell napokig autó nélkül maradni.",       stat: "48h",   statLabel: "max átfutás" },
  { icon: Gauge,        t: "Precíz kiegyensúlyozás", sub: "Rezgés nélkül, mint gyárilag",               d: "Dinamikus centírozó padon dolgozunk. Az eredmény: nulla rezgés, nulla zaj — pontosan gyári toleranciákon belül.",  stat: "±0g",   statLabel: "eltérés" },
  { icon: CheckCircle2, t: "Eredeti alkatrészek",    sub: "Sosem spórolunk az anyagon",                 d: "Kizárólag OEM vagy OEM-minőségű csapágyakat és kardánkereszteket szerelünk be. Nem alkudunk a minőségből.",       stat: "100%",  statLabel: "minőség" },
  { icon: ShieldCheck,  t: "Írásos garancia",        sub: "Ha valami nem stimmel, visszacsináljuk",     d: "Minden munkára minimum 6 hónap teljes körű, írásos garancia — anyagra és munkadíjra egyaránt. Kockázat nélkül.",  stat: "6 hó",  statLabel: "garancia" },
  { icon: Truck,        t: "Nem kell mozdulnia",     sub: "Mi jövünk, visszük, hozzuk",                 d: "Bizonyos rendelési érték felett az oda-vissza szállítást mi álljuk. Ülj otthon, mi megoldjuk az egészet.",       stat: "0 Ft*", statLabel: "kiszállás" },
  { icon: PhoneCall,    t: "Folyamatos visszajelzés", sub: "Mindig tudja, hol tart a javítása",         d: "Minden fázisban értesítünk: mikor vettük át, mikor kezdtük, mikor kész. Nincs bizonytalan várakozás.",           stat: "24/7",  statLabel: "elérhetőség" },
];

const additionalServices = [
  { title: "Féltengely",  sub: "javítás és felújítás", icon: Cog,       desc: "Személyautó és teherautó féltengely felújítás, csukló csere" },
  { title: "Turbó",       sub: "javítás és felújítás", icon: Flame,     desc: "Turbófeltöltő javítás, felülvizsgálat és utángyártás" },
  { title: "Gömbfej",     sub: "javítás és felújítás", icon: CircleDot, desc: "Futómű gömbfej csere és geometria beállítás" },
  { title: "Szilent",     sub: "javítás és felújítás", icon: Layers,    desc: "Gumiszilentek, lengéscsillapítók és stabilizátor betétek" },
  { title: "Hidraulika",  sub: "javítás és gyártás",   icon: Droplets,  desc: "Hidraulika tömlők, hengerek és szivattyúk javítása, gyártása" },
];

const partnerLogos = [
  { name: "Dunagép Zrt.",  abbr: "DG",   color: "#c0392b" },
  { name: "NHSZ",          abbr: "NHSZ", color: "#27ae60" },
  { name: "Red Fox Auto",  abbr: "RF",   color: "#e74c3c" },
  { name: "Flottacar",     abbr: "FC",   color: "#2980b9" },
  { name: "D·T·K·H",       abbr: "DTKH", color: "#16a085" },
];

const categories = [
  { t: "Személyautó kardán", img: "https://kardanjavitas.hu/wp-content/uploads/2025/01/Kardantengely_javitas_1920x900px_Slider_jobb.jpg" },
  { t: "Teherautó & Kamion", img: "https://kardanjavitas.hu/wp-content/uploads/2024/12/Kamion_kardan_javitas_1920x900px_Slider3-1.jpg" },
  { t: "Autóbusz kardán", img: "https://kardanjavitas.hu/wp-content/uploads/2025/02/Teherauto_kardanjavitas.jpg" },
  { t: "Mezőgazdasági gép", img: "https://kardanjavitas.hu/wp-content/uploads/2024/12/Mezogazdasagi_kardan_javitas_1920x900px_Slider2.jpg" },
  { t: "Kardánkereszt csere", img: "https://kardanjavitas.hu/wp-content/uploads/2025/01/kardantengelyhiba_javitas_2025.jpg" },
  { t: "Centírozás & kiegyensúlyozás", img: "https://kardanjavitas.hu/wp-content/uploads/2025/01/kardanjavitas_gyorsan_2025.jpg" },
];

const team = [
  { name: "Tamás", role: "Ügyfélszolgálati manager", quote: "Hívjon bizalommal, segítek!", img: "https://kardanjavitas.hu/wp-content/uploads/2024/12/Agnecz_Tamas_kardantengely_javitas-scaled.jpg" },
  { name: "Patrik", role: "Logisztikai manager", quote: "Én megyek a kiszerelt alkatrészért!", img: "https://kardanjavitas.hu/wp-content/uploads/2025/12/Patrik_kardanjavitas_hu_2025_12-scaled.jpg" },
  { name: "Andréka Ferenc", role: "Ügyvezető", quote: "Garantálom, hogy elégedett lesz!", img: "https://kardanjavitas.hu/wp-content/uploads/2026/02/Andreka_Ferenc_kardanjavitas_hu_2026_02-scaled.jpg" },
];

const testimonials = [
  { name: "Németh Márk", role: "BMW E46", text: "Ritka korrekt és barátságos kommunikáció! Gyors és precíz szállítás és munka. Köszönöm még egyszer a felújítást Ferencnek és csapatának!" },
  { name: "Kovács Péter", role: "Mercedes Sprinter", text: "Egy nap alatt megoldották a problémát. A futár pontos volt, az ár pedig korrekt. Csak ajánlani tudom mindenkinek." },
  { name: "Szabó Tamás", role: "MAN TGX", text: "Profi munka, kifogástalan minőség. Egy hete úton vannak a kamionjaim, nulla rezgéssel. Köszönjük!" },
  { name: "Horváth László", role: "Ford Transit", text: "Villámgyors kiszállás, pontos árajánlat, korrekt munka. Legközelebb is csak idejövök. Ajánlom mindenkinek!" },
];

const faq = [
  { q: "Mennyi idő alatt készül el a javítás?", a: "A legtöbb kardántengelyt az alkatrész beérkezésétől számított 24-48 órán belül kijavítjuk. Egyedi esetekben az átfutási idő hosszabb lehet, erről előre tájékoztatjuk." },
  { q: "Mennyibe kerül egy átlagos javítás?", a: "A javítás ára több tényezőtől függ: jármű típusa, hiba jellege, szükséges alkatrészek. A bevizsgálás után pontos, írásos árajánlatot adunk." },
  { q: "Hogyan működik a futárszolgálat?", a: "Hívja telefonszámunkat, és futárunk az országban bárhol érte megy a kiszerelt alkatrésznek — akár 24 órán belül. A kész kardánt visszaszállítjuk az Ön által megadott címre." },
  { q: "Milyen garanciát vállalnak?", a: "Minden elvégzett javításra minimum 1/2 év teljes körű, írásos garanciát biztosítunk, amely az anyagra és a munkadíjra egyaránt vonatkozik." },
  { q: "Milyen járművek kardántengelyét javítják?", a: "Személyautó, SUV, pick-up, kisteher, teherautó, kamion, autóbusz, mezőgazdasági gép és munkagép — gyakorlatilag minden típusú kardántengely javításával foglalkozunk." },
];

const galleryFilters = [
  { id: "all", label: "Összes" },
  { id: "auto", label: "Személyautó" },
  { id: "kamion", label: "Kamion & TIR" },
  { id: "munkagep", label: "Munkagép" },
];

const galleryItems = [
  { tag: "Bevizsgálás & diagnosztika", vehicle: "Személyautó", category: "auto", duration: "1 óra", img: "https://kardanjavitas.hu/wp-content/uploads/2024/11/bevizsgalas.jpg" },
  { tag: "Helyszíni futáros átvétel", vehicle: "Kamion & TIR", category: "kamion", duration: "24 óra", img: "https://kardanjavitas.hu/wp-content/uploads/2024/11/Futarszolgalat.jpg" },
  { tag: "Kardánjavítás", vehicle: "BMW X5", category: "auto", duration: "6 óra", img: "https://kardanjavitas.hu/wp-content/uploads/2024/11/Kardanjavitas_slider_1.jpg" },
  { tag: "Teljes felújítás", vehicle: "Mercedes Actros", category: "kamion", duration: "1 nap", img: "https://kardanjavitas.hu/wp-content/uploads/2025/01/Teherauto_kardan_javitas_2025.jpg" },
  { tag: "Centírozás & kiegyensúlyozás", vehicle: "Audi Q7", category: "auto", duration: "3 óra", img: "https://kardanjavitas.hu/wp-content/uploads/2025/08/kardantengely_centirozas.png" },
  { tag: "Kardántengely csere", vehicle: "Volvo FH16", category: "kamion", duration: "8 óra", img: "https://kardanjavitas.hu/wp-content/uploads/2024/12/Teherautok_kardanjavitasa_1.jpg" },
  { tag: "Kardántengely hiba — csere", vehicle: "Mezőgazdasági gép", category: "munkagep", duration: "1 nap", img: "https://kardanjavitas.hu/wp-content/uploads/2024/12/kardanjavitas_kardantengely_hiba-1-scaled.jpg" },
];

const counties = [
  "Budapest", "Pest", "Győr-Moson-Sopron", "Vas", "Zala",
  "Somogy", "Baranya", "Tolna", "Fejér", "Komárom-Esztergom",
  "Veszprém", "Bács-Kiskun", "Csongrád-Csanád", "Békés", "Hajdú-Bihar",
  "Szabolcs-Sz-B", "Jász-NK-Sz", "Heves", "Nógrád", "Borsod-A-Z",
];

const countyMeta: Record<string, { tier: "kiemelt" | "aktiv"; eta: string; partners: number }> = {
  "Budapest":           { tier: "kiemelt", eta: "2–4 óra",   partners: 6 },
  "Pest":               { tier: "aktiv",   eta: "3–6 óra",   partners: 3 },
  "Győr-Moson-Sopron":  { tier: "aktiv",   eta: "4–8 óra",   partners: 2 },
  "Vas":                { tier: "aktiv",   eta: "6–10 óra",  partners: 1 },
  "Zala":               { tier: "aktiv",   eta: "6–10 óra",  partners: 1 },
  "Somogy":             { tier: "aktiv",   eta: "5–9 óra",   partners: 1 },
  "Baranya":            { tier: "aktiv",   eta: "6–10 óra",  partners: 2 },
  "Tolna":              { tier: "kiemelt", eta: "4–7 óra",   partners: 2 },
  "Fejér":              { tier: "aktiv",   eta: "4–7 óra",   partners: 2 },
  "Komárom-Esztergom":  { tier: "aktiv",   eta: "4–7 óra",   partners: 2 },
  "Veszprém":           { tier: "aktiv",   eta: "4–8 óra",   partners: 1 },
  "Bács-Kiskun":        { tier: "aktiv",   eta: "5–9 óra",   partners: 2 },
  "Csongrád-Csanád":    { tier: "aktiv",   eta: "6–10 óra",  partners: 2 },
  "Békés":              { tier: "aktiv",   eta: "7–12 óra",  partners: 1 },
  "Hajdú-Bihar":        { tier: "kiemelt", eta: "5–9 óra",   partners: 3 },
  "Szabolcs-Sz-B":      { tier: "aktiv",   eta: "7–12 óra",  partners: 1 },
  "Jász-NK-Sz":         { tier: "aktiv",   eta: "5–9 óra",   partners: 2 },
  "Heves":              { tier: "aktiv",   eta: "5–9 óra",   partners: 1 },
  "Nógrád":             { tier: "aktiv",   eta: "5–9 óra",   partners: 1 },
  "Borsod-A-Z":         { tier: "aktiv",   eta: "6–11 óra",  partners: 2 },
};

const countyCoords: Record<string, [number, number]> = {
  "Budapest":           [47.4979, 19.0402],
  "Pest":               [47.55,   19.45  ],
  "Győr-Moson-Sopron":  [47.68,   17.25  ],
  "Komárom-Esztergom":  [47.58,   18.35  ],
  "Vas":                [47.09,   16.62  ],
  "Veszprém":           [47.10,   17.90  ],
  "Zala":               [46.64,   16.80  ],
  "Somogy":             [46.45,   17.80  ],
  "Baranya":            [46.07,   18.23  ],
  "Tolna":              [46.40,   18.60  ],
  "Fejér":              [47.10,   18.50  ],
  "Nógrád":             [48.00,   19.35  ],
  "Heves":              [47.85,   20.20  ],
  "Borsod-A-Z":         [48.05,   20.75  ],
  "Szabolcs-Sz-B":      [47.95,   21.90  ],
  "Hajdú-Bihar":        [47.53,   21.63  ],
  "Jász-NK-Sz":         [47.25,   20.20  ],
  "Békés":              [46.70,   21.10  ],
  "Bács-Kiskun":        [46.80,   19.65  ],
  "Csongrád-Csanád":    [46.35,   20.15  ],
};

function FlyToCounty({ coords, zoom }: { coords: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(coords, zoom, { animate: true, duration: 1.4 });
  }, []);
  return null;
}

function CountyMapModal({ county, onClose }: { county: string; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const coords = countyCoords[county];
  const meta = countyMeta[county];

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!coords || !meta) return null;

  const countyPin = mounted ? L.divIcon({
    html: `<div style="width:18px;height:18px;border-radius:50%;background:hsl(32,92%,54%);border:3px solid #fff;box-shadow:0 0 18px rgba(249,115,22,0.95)"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    className: "",
  }) : undefined;

  const workshopPin = mounted ? L.divIcon({
    html: `<div style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:hsl(32,92%,54%);border:3px solid #fff;box-shadow:0 0 20px rgba(249,115,22,0.9);font-size:14px">🔧</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    className: "",
  }) : undefined;

  const targetZoom = county === "Budapest" ? 12 : 9;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 md:p-10"
      style={{ background: "rgba(0,0,0,0.84)", backdropFilter: "blur(14px)", zIndex: 300, animation: "backdrop-in 0.25s ease both" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.10)", animation: "modal-drop 0.45s cubic-bezier(0.22,1,0.36,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="relative" style={{ height: 420 }}>
          {mounted && countyPin && workshopPin && (
            <MapContainer
              key={county}
              center={[47.1625, 19.5033]}
              zoom={6}
              style={{ width: "100%", height: "100%" }}
              zoomControl={false}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              <FlyToCounty coords={coords} zoom={targetZoom} />
              <Marker position={coords} icon={countyPin} />
              {county !== "Budapest" && (
                <Marker position={[47.4979, 19.0402]} icon={workshopPin} />
              )}
            </MapContainer>
          )}

          
          <div
            className="absolute top-0 left-0 right-0 z-[400] p-5"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.80), transparent)", pointerEvents: "none" }}
          >
            <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "hsl(32 92% 60%)" }}>
              {meta.tier === "kiemelt" ? "⚡ Kiemelt partnerhálózat" : "● Aktív lefedettség"}
            </p>
            <h3 className="text-2xl font-black text-white">{county}</h3>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
              Becsült kiszállás: {meta.eta} · {meta.partners} helyi partner
            </p>
          </div>

          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[400] w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)", color: "white" }}
          >
            <X size={16} />
          </button>
        </div>

        
        <div className="flex gap-3 p-4" style={{ background: "hsl(222 28% 13%)", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          <a
            href="#kapcsolat"
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl text-sm font-bold text-white no-underline"
            style={{ background: "hsl(32 92% 54%)", boxShadow: "0 0 24px rgba(249,115,22,0.32)" }}
          >
            Foglalást kérek <ChevronRight size={14} />
          </a>
          <a
            href="tel:+36706734444"
            className="flex items-center gap-2 h-11 px-5 rounded-2xl text-sm font-semibold text-white no-underline glass"
          >
            <Phone size={14} /> Hívás
          </a>
        </div>
      </div>
    </div>
  );
}

const navLinks = [
  { href: "#szolgaltatasok", label: "Szolgáltatások" },
  { href: "#folyamat", label: "Folyamat" },
  { href: "#csapat", label: "Csapatunk" },
  { href: "#velemenyek", label: "Vélemények" },
  { href: "#kapcsolat", label: "Kapcsolat" },
];

const marqueeItems = [
  "Kardánjavítás", "Futárszolgálat", "24h Kiszállás",
  "1/2 Év Garancia", "12 000+ Javítás", "Ingyenes Tanácsadás",
  "Személyautó", "Kamion & TIR", "Mezőgazdasági Gép",
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [countySearch, setCountySearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    if (!lightboxItem) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxItem(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxItem]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      setShowScrollTop(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="top" className="min-h-screen overflow-x-hidden" style={{ background: "hsl(222 28% 11%)", color: "hsl(40 20% 97%)" }}>

      
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
        <div className="w-full max-w-5xl"
          style={{
            animation: "fade-in 0.65s cubic-bezier(0.22,1,0.36,1) both",
          }}
        >
          <div
            className="flex items-center justify-between h-[58px] px-3 pr-3"
            style={{
              background: scrolled ? "rgba(10,11,18,0.97)" : "rgba(10,11,18,0.85)",
              backdropFilter: "blur(48px) saturate(2.2) brightness(1.05)",
              WebkitBackdropFilter: "blur(48px) saturate(2.2) brightness(1.05)",
              border: "1px solid rgba(255,255,255,0.075)",
              borderRadius: "999px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.10)",
              transition: "background 0.4s ease",
            }}
          >
            
            <a href="#top" className="flex items-center gap-2.5 group pl-1 no-underline">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{ background: "linear-gradient(135deg, hsl(32 92% 54%), hsl(22 90% 44%))", boxShadow: "0 0 22px rgba(249,115,22,0.45)" }}
              >
                <span style={{ color: "white", fontWeight: 900, fontSize: "1rem", lineHeight: 1 }}>K</span>
              </div>
              <span className="hidden sm:block text-[1.05rem] font-bold tracking-wider" style={{ color: "hsl(40 20% 97%)" }}>
                kardán<span style={{ color: "hsl(32 92% 54%)" }}>javítás.hu</span>
              </span>
            </a>

            
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="nav-link text-sm font-medium transition-colors duration-200 no-underline"
                  style={{ color: "hsl(220 20% 70%)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(40 20% 97%)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(220 20% 70%)")}
                >
                  {l.label}
                </a>
              ))}
            </div>

            
            <div className="flex items-center gap-2">
              <a
                href="tel:+36706734444"
                className="btn-hover hidden sm:flex items-center gap-2 h-10 px-5 rounded-full text-sm font-semibold no-underline"
                style={{ background: "rgba(249,115,22,0.16)", border: "1px solid rgba(249,115,22,0.32)", color: "white", backdropFilter: "blur(8px)" }}
              >
                <Phone size={13} />
                +36 70 673 4444
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menü"
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                style={{ background: "rgba(255,255,255,0.12)", color: "hsl(220 20% 70%)", border: "none" }}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(10,11,18,0.97)",
              backdropFilter: "blur(48px) saturate(2)",
              border: "1px solid rgba(255,255,255,0.11)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
              maxHeight: menuOpen ? 400 : 0,
              opacity: menuOpen ? 1 : 0,
              marginTop: menuOpen ? "0.5rem" : 0,
              pointerEvents: menuOpen ? "auto" : "none",
              transition: "max-height 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease, margin-top 0.35s ease",
            }}
          >
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  className="text-left px-4 py-3 rounded-xl text-sm font-medium no-underline block transition-all duration-150"
                  style={{ color: "hsl(220 20% 70%)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; e.currentTarget.style.color = "hsl(40 20% 97%)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(220 20% 70%)"; }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:+36706734444"
                className="mt-2 flex items-center justify-center gap-2 h-11 rounded-full text-sm font-semibold text-white no-underline cursor-pointer"
                style={{ background: "hsl(32 92% 54%)", boxShadow: "0 0 30px rgba(249,115,22,0.3)" }}
              >
                <Phone size={13} />+36 70 673 4444
              </a>
            </div>
          </div>
        </div>
      </nav>

      
      <section id="hero" className="relative min-h-[100dvh] overflow-hidden">
        
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        
        <div
          className="absolute -top-32 -left-24 rounded-full pointer-events-none animate-blob"
          style={{ width: 620, height: 620, background: "radial-gradient(circle, rgba(249,115,22,0.16), transparent 70%)", filter: "blur(80px)" }}
        />
        
        <div
          className="absolute -top-16 right-[-80px] rounded-full pointer-events-none"
          style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(99,102,241,0.1), transparent 70%)", filter: "blur(100px)", animation: "blob 22s ease-in-out infinite reverse" }}
        />
        
        <div
          className="absolute bottom-[15%] left-[38%] rounded-full pointer-events-none"
          style={{ width: 320, height: 320, background: "radial-gradient(circle, rgba(249,115,22,0.08), transparent 70%)", filter: "blur(60px)", animation: "blob 16s ease-in-out infinite" }}
        />

        
        <div className="grid lg:grid-cols-[1fr_0.55fr] min-h-[100dvh]">

          
          <div className="relative flex flex-col justify-center pt-32 pb-36 px-6 md:px-10 lg:px-16 xl:px-24 z-10">

            
            <div className="absolute inset-0 lg:hidden -z-0">
              <img
                src="https://kardanjavitas.hu/wp-content/uploads/2025/01/Kardantengely_javitas_1920x900px_Slider_jobb.jpg"
                alt=""
                className="w-full h-full object-cover"
                style={{ opacity: 0.15 }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,11,18,0.97), rgba(10,11,18,0.8) 60%, rgba(10,11,18,0.5))" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(222 28% 11%), transparent)" }} />
            </div>

            <Reveal>
              <div className="mb-8">
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ background: "rgba(249,115,22,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(249,115,22,0.25)", color: "hsl(32 92% 68%)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "hsl(32 92% 54%)", animation: "pulse-glow 2s ease-in-out infinite" }}
                  />
                  Országos futárszolgálat · 24h
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="mb-8">
                <h1 style={{ fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em" }}>
                  <span className="block hero-gradient-text" style={{ fontSize: "clamp(3.5rem,11vw,8rem)", lineHeight: 1 }}>KARDÁN</span>
                  <span className="block hero-gradient-text" style={{ fontSize: "clamp(2.2rem,7vw,5.5rem)", lineHeight: 1 }}>JAVÍTÁS</span>
                  <span className="block" style={{ fontSize: "clamp(1.6rem,4.5vw,3.5rem)", lineHeight: 1, color: "rgba(250,244,230,0.32)" }}>AMIT MÁSOK</span>
                  <span className="block" style={{ fontSize: "clamp(1.6rem,4.5vw,3.5rem)", lineHeight: 1, color: "rgba(250,244,230,0.32)" }}>NEM VÁLLALNAK.</span>
                </h1>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="mb-7 h-[2px] w-16 rounded-full" style={{ background: "linear-gradient(90deg, hsl(32 92% 54%), transparent)" }} />
            </Reveal>

            <Reveal delay={200}>
              <p className="text-base mb-10 max-w-sm font-light leading-relaxed" style={{ color: "hsl(220 20% 68%)" }}>
                Személy- és teherautó, kamion, autóbusz, SUV, pick-up, mezőgazdasági és munkagépek kardántengelyeinek teljes körű felújítása — országos partnerhálózattal és futárszolgálattal.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#kapcsolat"
                  className="group glint cta-pulse relative inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full text-base font-semibold text-white no-underline"
                  style={{ background: "hsl(32 92% 54%)" }}
                >
                  Kérek árajánlatot
                  <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="tel:+36706734444"
                  className="btn-hover inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full text-base font-semibold glass no-underline"
                  style={{ color: "hsl(40 20% 97%)" }}
                >
                  <Phone size={16} />
                  +36 70 673 4444
                </a>
              </div>
            </Reveal>
          </div>

          
          <div className="hidden lg:block relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              <img
                src="https://kardanjavitas.hu/wp-content/uploads/2025/01/Kardantengely_javitas_1920x900px_Slider_jobb.jpg"
                alt="Kardántengely javítás"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "saturate(0.7) contrast(1.12)", opacity: 0.65 }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, hsl(222 28% 11%), transparent 38%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,11,18,0.7), transparent)" }} />

              
              <div className="glass absolute right-8 top-1/3 rounded-2xl px-5 py-4 animate-float">
                <p className="text-xs" style={{ color: "hsl(220 20% 65%)" }}>Garancia</p>
                <p className="text-xl font-bold">1/2 év</p>
              </div>
              <div className="glass absolute right-24 bottom-1/4 rounded-2xl px-5 py-4 animate-float" style={{ animationDelay: "-2.5s" }}>
                <p className="text-xs" style={{ color: "hsl(220 20% 65%)" }}>Javítások</p>
                <p className="text-xl font-bold">12 000+</p>
              </div>
            </div>
          </div>
        </div>

        
        <div
          className="absolute bottom-0 left-0 right-0 z-20 grid grid-cols-3"
          style={{ background: "rgba(6,7,12,0.97)", backdropFilter: "blur(24px) saturate(1.8)", borderTop: "1px solid rgba(255,255,255,0.12)" }}
        >
          {[
            { to: 20, suffix: "+", label: "Év tapasztalat" },
            { to: 12000, suffix: "+", label: "Elégedett ügyfél" },
            { to: 100, suffix: "%", label: "Ügyfél-elégedettség" },
          ].map(({ to, suffix, label }, i) => (
            <div
              key={label}
              className="flex flex-col items-center py-6 px-4"
              style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.10)" : "none" }}
            >
              <span className="text-3xl md:text-4xl font-black stat-glow" style={{ color: "hsl(32 92% 54%)", fontWeight: 900 }}>
                <Counter to={to} suffix={suffix} />
              </span>
              <span className="text-[10px] uppercase tracking-widest mt-1 text-center" style={{ color: "hsl(220 20% 60%)" }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      
      <div
        className="overflow-hidden"
        style={{ background: "hsl(32 92% 54%)", borderTop: "1px solid rgba(0,0,0,0.1)", borderBottom: "1px solid rgba(0,0,0,0.1)" }}
      >
        <div className="marquee-track py-3.5">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-5 font-bold tracking-[0.12em] uppercase text-[13px] px-5 text-white"
            >
              {item}
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "8px" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      
      <section id="szolgaltatasok" className="py-28 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(32 92% 54%), transparent 60%)" }} />

        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <Chip>Amit csinálunk</Chip>
                <h2 className="text-5xl md:text-6xl mt-4" style={{ fontWeight: 900 }}>Szolgáltatásaink</h2>
              </div>
              <p className="text-base leading-relaxed max-w-sm md:text-right" style={{ color: "hsl(220 20% 65%)" }}>
                Minden, ami kardán — egy helyen. Javítástól a futárszolgálatig.
              </p>
            </div>
          </Reveal>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "rgba(255,255,255,0.10)", borderRadius: "20px", overflow: "hidden" }}
          >
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div
                  className="group relative flex flex-col cursor-pointer h-full"
                  style={{ background: "hsl(222 28% 13%)" }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      style={{ filter: "saturate(0.7) contrast(1.12) brightness(0.9)" }}
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(222 28% 13%), rgba(30,36,64,0.3), transparent)" }} />
                  </div>

                  <div className="flex flex-col flex-1 p-6 pt-5">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                        style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", color: "hsl(32 92% 54%)" }}
                      >
                        <s.icon size={18} strokeWidth={1.5} />
                      </div>
                      <span className="text-xs font-bold tracking-wider" style={{ color: "rgba(255,255,255,0.15)", fontWeight: 900 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-bold tracking-wide mb-2 transition-colors duration-200"
                      style={{ fontWeight: 700 }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(32 92% 54%)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                    >
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "hsl(220 20% 65%)" }}>{s.desc}</p>
                    <div
                      className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                      style={{ background: "linear-gradient(90deg, hsl(32 92% 54%), transparent)" }}
                    />
                  </div>

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(249,115,22,0.18)" }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden py-20"
        style={{ background: "linear-gradient(135deg, hsl(32 92% 52%), hsl(20 88% 36%))" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 21px)" }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <Reveal>
              <div>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-[0.22em] mb-4">
                  Ingyenes tanácsadás · 24 órán belüli kiszállás
                </p>
                <h2 className="text-4xl md:text-[3.5rem] font-black text-white" style={{ lineHeight: 0.9, fontWeight: 900 }}>
                  Kész a javítás?<br />Mi is azok vagyunk.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <a
                  href="#kapcsolat"
                  className="btn-hover inline-flex items-center justify-center gap-2.5 h-14 px-10 rounded-full text-base font-bold no-underline"
                  style={{ background: "white", color: "hsl(20 88% 34%)", boxShadow: "0 14px 40px rgba(0,0,0,0.22)" }}
                >
                  Árajánlatot kérek
                  <ChevronRight size={16} />
                </a>
                <a
                  href="tel:+36706734444"
                  className="inline-flex items-center justify-center gap-2.5 h-14 px-10 rounded-full text-base font-bold text-white no-underline"
                  style={{ border: "2px solid rgba(255,255,255,0.38)" }}
                >
                  <Phone size={16} />
                  +36 70 673 4444
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="folyamat" className="py-28 relative" style={{ background: "hsl(224 18% 4%)" }}>
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-16 text-center">
              <Chip>A folyamat</Chip>
              <h2 className="text-5xl md:text-6xl mt-4" style={{ fontWeight: 900 }}>Egyszerű, gyors, kényelmes.</h2>
              <p className="mx-auto mt-4 max-w-2xl" style={{ color: "hsl(220 20% 65%)" }}>
                A hiba észlelésétől a kijavított alkatrész visszaszereléséig komplett megoldást nyújtunk.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            <div className="hidden lg:block absolute left-0 right-0 top-[3.5rem] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)" }} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map((p, i) => (
                <Reveal key={p.title} delay={i * 100}>
                  <div
                    className="group relative h-full rounded-3xl p-6 text-center project-card-hover"
                    style={{ background: "hsl(222 28% 13%)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    <div className="relative mx-auto mb-4 w-14 h-14 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full opacity-50 blur-md" style={{ background: "linear-gradient(135deg, hsl(32 92% 54%), hsl(22 90% 44%))" }} />
                      <div className="relative w-14 h-14 rounded-full flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, hsl(32 92% 54%), hsl(22 90% 44%))", color: "white" }}>
                        <p.icon size={22} />
                      </div>
                    </div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(32 92% 54%)" }}>
                      0{i + 1}
                    </p>
                    <h3 className="mb-2 text-base font-bold">{p.title}</h3>
                    <p className="text-sm" style={{ color: "hsl(220 20% 65%)" }}>{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-20 relative" style={{ background: "hsl(222 28% 11%)" }}>
        <div className="container mx-auto px-6">
          <Reveal>
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: "hsl(222 28% 15%)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.10)",
              }}
            >
              <div className="grid lg:grid-cols-[1fr_1.6fr]">

                
                <div
                  className="p-10 flex flex-col justify-center"
                  style={{ background: "linear-gradient(135deg, hsl(32 92% 54%), hsl(20 88% 38%))", position: "relative", overflow: "hidden" }}
                >
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 24px, rgba(0,0,0,0.07) 24px, rgba(0,0,0,0.07) 25px)" }} />
                  <div className="relative">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-3 text-white/60">Gyors kapcsolat</p>
                    <h2 className="text-3xl font-black text-white mb-3" style={{ lineHeight: 1.05 }}>
                      Kérjen ingyenes<br />visszahívást!
                    </h2>
                    <p className="text-sm text-white/70 mb-8">24 órán belül felvesszük Önnel a kapcsolatot.</p>
                    <div className="flex flex-col gap-3">
                      {[
                        { icon: Phone, val: "+36 70 673 4444" },
                        { icon: Phone, val: "+36 20 346 8840" },
                      ].map(({ icon: Icon, val }) => (
                        <a key={val} href={`tel:${val.replace(/\s/g,"")}`}
                          className="flex items-center gap-2.5 text-sm font-semibold text-white no-underline"
                        >
                          <Icon size={13} className="shrink-0" />
                          {val}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                
                <div className="p-10">
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    {[
                      { label: "Cégnév", type: "text", placeholder: "Cégnév (opcionális)", required: false },
                      { label: "Telefonszám *", type: "tel", placeholder: "+36 70 000 0000", required: true },
                      { label: "Vezetéknév *", type: "text", placeholder: "Pl. Kovács", required: true },
                      { label: "Keresztnév *", type: "text", placeholder: "Pl. Péter", required: true },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="text-[10px] font-semibold uppercase tracking-widest mb-2 block" style={{ color: "hsl(220 8% 48%)" }}>{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                          style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.11)", color: "hsl(40 20% 97%)" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.11)"; e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mb-5">
                    <label className="text-[10px] font-semibold uppercase tracking-widest mb-2 block" style={{ color: "hsl(220 8% 48%)" }}>Üzenet</label>
                    <textarea
                      rows={3}
                      placeholder="Röviden írja le a hibát vagy kérdését..."
                      className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.11)", color: "hsl(40 20% 97%)" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.11)"; e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn-hover w-full rounded-full text-base font-semibold text-white py-4 cursor-pointer"
                    style={{
                      background: "hsl(32 92% 54%)",
                      boxShadow: "0 0 40px rgba(249,115,22,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                      border: "none",
                    }}
                    onClick={() => document.getElementById("kapcsolat")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Visszahívást kérek
                  </button>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      
      <section id="miert-minket" className="py-28 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start">

            
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <Chip>Előnyeink</Chip>
                <h2 className="text-4xl md:text-5xl mt-5 mb-4" style={{ fontWeight: 900, lineHeight: 0.9 }}>
                  Miért minket<br />válasszon?
                </h2>
                <div className="mb-5 h-[2px] w-12 rounded-full" style={{ background: "linear-gradient(90deg, hsl(32 92% 54%), transparent)" }} />

                
                <div className="flex items-center gap-3 mb-5 p-3 rounded-2xl" style={{ background: "rgba(249,115,22,0.07)", border: "1px solid rgba(249,115,22,0.18)" }}>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} size={14} fill="hsl(32 92% 54%)" color="hsl(32 92% 54%)" />
                    ))}
                  </div>
                  <div>
                    <span className="text-sm font-bold">5.0</span>
                    <span className="text-xs ml-1.5" style={{ color: "hsl(220 20% 62%)" }}>Google értékelés · 12 000+ ügyfél</span>
                  </div>
                </div>

                <p className="leading-relaxed text-[15px] max-w-sm mb-3" style={{ color: "hsl(220 20% 70%)" }}>
                  20 év tapasztalat, modern műhely, eredeti alkatrészek. Nem fogadunk el silány munkát — ezért áll mögöttünk 12 000+ elégedett ügyfél.
                </p>
                <p className="text-sm font-semibold mb-8" style={{ color: "hsl(32 92% 62%)" }}>
                  → Ma még tudunk időpontot adni!
                </p>

                <div className="flex flex-col gap-3">
                  <a
                    href="#kapcsolat"
                    className="btn-hover inline-flex items-center justify-center gap-2 h-13 px-7 py-3.5 rounded-full text-base font-bold text-white no-underline"
                    style={{ background: "hsl(32 92% 54%)", boxShadow: "0 0 40px rgba(249,115,22,0.35)" }}
                  >
                    Javítást rendelek <ChevronRight size={16} />
                  </a>
                  <a
                    href="tel:+36706734444"
                    className="btn-hover inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-sm font-semibold text-white no-underline glass"
                  >
                    <Phone size={14} /> +36 70 673 4444
                  </a>
                </div>
              </div>
            </Reveal>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyUs.map((f, i) => (
                <Reveal key={f.t} delay={i * 60}>
                  <div
                    className="group relative rounded-2xl p-5 overflow-hidden cursor-default h-full"
                    style={{
                      background: "hsl(222 28% 15%)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.transform = "translateY(-4px)";
                      el.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(249,115,22,0.1)";
                      el.style.borderColor = "rgba(249,115,22,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                      el.style.borderColor = "rgba(255,255,255,0.12)";
                    }}
                  >
                    
                    <div className="absolute -right-1 -bottom-2 font-black text-[5rem] leading-none select-none pointer-events-none"
                      style={{ color: "rgba(249,115,22,0.05)", fontWeight: 900 }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                        style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", color: "hsl(32 92% 54%)" }}
                      >
                        <f.icon size={19} strokeWidth={1.5} />
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black" style={{ color: "hsl(32 92% 62%)", fontWeight: 900, lineHeight: 1 }}>{f.stat}</div>
                        <div className="text-[9px] uppercase tracking-[0.14em] mt-0.5" style={{ color: "hsl(220 20% 55%)" }}>{f.statLabel}</div>
                      </div>
                    </div>

                    <h3 className="font-bold text-sm mb-0.5 transition-colors duration-200 group-hover:text-[hsl(32_92%_60%)]">{f.t}</h3>
                    <p className="text-xs font-semibold mb-2" style={{ color: "hsl(32 92% 56%)" }}>{f.sub}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "hsl(220 20% 62%)" }}>{f.d}</p>

                    
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                      style={{ background: "linear-gradient(90deg, hsl(32 92% 54%), transparent)" }} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-28 relative" style={{ background: "hsl(224 18% 4%)" }}>
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <Chip>Portfólió</Chip>
                <h2 className="text-5xl md:text-6xl mt-4" style={{ fontWeight: 900 }}>Kardán minden járműhöz.</h2>
              </div>
              <a href="#kapcsolat" className="btn-hover inline-flex items-center gap-2 h-10 px-6 rounded-full text-sm font-medium glass no-underline" style={{ color: "hsl(40 20% 97%)" }}>
                Árajánlatot kérek
                <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
            style={{ gridAutoRows: "280px" }}
          >
            {categories.map((c, i) => (
              <Reveal key={c.t} delay={i * 60}>
                <a
                  href="#kapcsolat"
                  className={`group relative rounded-3xl overflow-hidden cursor-pointer project-card-hover no-underline block h-full ${i === 0 ? "md:col-span-2" : i === 3 ? "md:col-span-2" : ""}`}
                  style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <img
                    src={c.img}
                    alt={c.t}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    style={{ filter: "saturate(0.75) contrast(1.1)" }}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0.2), transparent)" }} />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] text-white"
                    style={{ background: "rgba(249,115,22,0.9)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    Kategória
                  </div>
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                    <h3 className="text-lg font-bold text-white">{c.t}</h3>
                    <span className="glass w-9 h-9 rounded-full grid place-items-center text-white">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(249,115,22,0.28)" }} />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-28 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(32 92% 54%), transparent 60%)" }} />

        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="mb-14 text-center">
              <Chip>Egyéb javítások</Chip>
              <h2 className="text-4xl md:text-5xl mt-4" style={{ fontWeight: 900 }}>
                További <span style={{ color: "hsl(32 92% 54%)" }}>javítási</span> szolgáltatásaink
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-base leading-relaxed" style={{ color: "hsl(220 20% 65%)" }}>
                Nem csak kardán — gömbfej, szilent, turbó, hidraulika és féltengely javítással is foglalkozunk.
              </p>
            </div>
          </Reveal>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-24">
            {additionalServices.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <a
                  href="#kapcsolat"
                  className="group relative flex flex-col items-center text-center rounded-2xl p-8 no-underline overflow-hidden"
                  style={{
                    background: "linear-gradient(160deg, hsl(222 28% 18%), hsl(222 28% 13%))",
                    border: "1px solid rgba(255,255,255,0.11)",
                    transition: "border-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(249,115,22,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.11)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg, rgba(249,115,22,0.22), rgba(249,115,22,0.06))",
                      border: "2px solid rgba(249,115,22,0.35)",
                      boxShadow: "0 0 30px rgba(249,115,22,0.1)",
                    }}
                  >
                    <s.icon size={32} style={{ color: "hsl(32 92% 58%)" }} strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] mb-2" style={{ color: "hsl(32 92% 62%)" }}>{s.title}</p>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "hsl(220 20% 57%)" }}>{s.sub}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "hsl(220 20% 65%)" }}>{s.desc}</p>

                  
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: "linear-gradient(90deg, hsl(32 92% 54%), transparent)" }} />
                </a>
              </Reveal>
            ))}
          </div>

          
          <Reveal>
            <div>
              <div className="flex items-center gap-4 mb-10 justify-center">
                <div className="h-px flex-1 max-w-[120px]" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1))" }} />
                <p className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "hsl(220 20% 57%)" }}>
                  Kiemelt partnereink
                </p>
                <div className="h-px flex-1 max-w-[120px]" style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.1))" }} />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                {partnerLogos.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 cursor-default"
                    style={{
                      background: "hsl(222 28% 17%)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
                      style={{ background: p.color, boxShadow: `0 4px 14px ${p.color}55` }}
                    >
                      {p.abbr.slice(0, 2)}
                    </div>
                    <span className="text-base font-bold" style={{ color: "hsl(220 20% 85%)" }}>{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      
      <section className="py-28 relative">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(32 92% 54%), transparent 60%)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <Chip>Elvégzett munkák</Chip>
                <h2 className="text-5xl md:text-6xl mt-4" style={{ fontWeight: 900 }}>12 000+ sikeres javítás.</h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: "hsl(220 20% 65%)" }}>
                  Kattintson bármelyik sorra a részletekért.
                </p>
              </div>
              <a href="#kapcsolat" className="btn-hover inline-flex items-center gap-2 h-10 px-6 rounded-full text-sm font-medium glass no-underline shrink-0" style={{ color: "hsl(40 20% 97%)" }}>
                Árajánlatot kérek <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>

          
          <Reveal delay={60}>
            <div className="flex flex-wrap gap-2 mb-10">
              {galleryFilters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setGalleryFilter(f.id)}
                  className="px-5 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200"
                  style={{
                    background: galleryFilter === f.id ? "hsl(32 92% 54%)" : "rgba(255,255,255,0.12)",
                    color: galleryFilter === f.id ? "white" : "hsl(220 20% 70%)",
                    boxShadow: galleryFilter === f.id ? "0 0 24px rgba(249,115,22,0.35)" : "none",
                    border: "1px solid " + (galleryFilter === f.id ? "transparent" : "rgba(255,255,255,0.11)"),
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>

          
          <div className="space-y-3">
            {galleryItems
              .filter((g) => galleryFilter === "all" || g.category === galleryFilter)
              .map((g, i) => (
                <div
                  key={g.tag + g.vehicle}
                  className="gallery-card-in group relative rounded-2xl overflow-hidden cursor-pointer"
                  style={{ border: "1px solid rgba(255,255,255,0.10)", animationDelay: `${i * 60}ms` }}
                  onClick={() => setLightboxItem(g)}
                >
                  <div className="grid md:grid-cols-[5fr_7fr]" style={{ minHeight: 200 }}>

                    
                    <div
                      className="relative flex flex-col justify-between p-6"
                      style={{ background: "hsl(222 28% 15%)", borderRight: "1px solid rgba(255,255,255,0.12)" }}
                    >
                      
                      <div
                        className="absolute right-4 top-1/2 -translate-y-1/2 font-black leading-none select-none pointer-events-none"
                        style={{ fontSize: "5.5rem", color: "rgba(249,115,22,0.07)", fontWeight: 900, lineHeight: 1 }}
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>

                      <div>
                        <span
                          className="inline-block text-[9px] font-bold uppercase tracking-[0.2em] mb-3 px-2 py-1 rounded-md"
                          style={{ background: "rgba(249,115,22,0.1)", color: "hsl(32 92% 60%)", border: "1px solid rgba(249,115,22,0.18)" }}
                        >
                          {g.vehicle}
                        </span>
                        <h3 className="text-lg font-black text-white" style={{ lineHeight: 1.15 }}>
                          {g.tag}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3 mt-5">
                        <div className="w-5 h-[2px] rounded-full shrink-0" style={{ background: "hsl(32 92% 54%)" }} />
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: "hsl(220 20% 60%)" }}>
                          <Clock size={10} /> {g.duration}
                        </span>
                        <span
                          className="ml-auto flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{ color: "hsl(32 92% 62%)" }}
                        >
                          Részletek <ArrowRight size={11} />
                        </span>
                      </div>
                    </div>

                    
                    <div className="relative overflow-hidden" style={{ minHeight: 180 }}>
                      <img
                        src={g.img}
                        alt={g.tag}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                        style={{ filter: "saturate(0.55) contrast(1.18) brightness(0.7)" }}
                      />
                      
                      <div
                        className="absolute inset-0 hidden md:block"
                        style={{ background: "linear-gradient(to right, hsl(222 28% 15%) 0%, transparent 22%)" }}
                      />
                    </div>

                  </div>

                  
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(249,115,22,0.3)" }}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>

      
      <section id="csapat" className="py-28 relative">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-16 text-center">
              <Chip>A csapat</Chip>
              <h2 className="text-5xl md:text-6xl mt-4" style={{ fontWeight: 900 }}>Szakértőnk várja hívását.</h2>
              <p className="mx-auto mt-4 max-w-2xl" style={{ color: "hsl(220 20% 65%)" }}>
                Ingyenes tanácsadás telefonon. Gyors árajánlat, rövid javítási idő.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 100}>
                <div
                  className="group overflow-hidden rounded-3xl project-card-hover"
                  style={{ background: "hsl(222 28% 15%)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img src={m.img} alt={m.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,11,18,0.8), transparent 60%)" }} />
                    <div
                      className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] text-white"
                      style={{ background: "rgba(249,115,22,0.9)", backdropFilter: "blur(8px)" }}
                    >
                      {m.role}
                    </div>
                  </div>
                  <div className="p-6" style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
                    <h3 className="text-lg font-bold">{m.name}</h3>
                    <p className="text-sm italic mt-2" style={{ color: "hsl(220 20% 70%)" }}>"{m.quote}"</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-28 relative overflow-hidden" style={{ background: "hsl(224 18% 4%)" }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            
            <Reveal>
              <div>
                <Chip>Lefedettség</Chip>
                <h2 className="text-4xl md:text-5xl mt-5 mb-6" style={{ fontWeight: 900, lineHeight: 0.95 }}>
                  Bárhová megyünk<br />az országban.
                </h2>
                <div className="mb-6 h-[2px] w-12 rounded-full" style={{ background: "linear-gradient(90deg, hsl(32 92% 54%), transparent)" }} />
                <p className="leading-relaxed text-[15px] max-w-sm mb-10" style={{ color: "hsl(220 20% 65%)" }}>
                  Országos kiszerelő partnerhálózatunkkal és saját futárszolgálatunkkal Magyarország minden pontjáról átvesszük az alkatrészt — akár 24 órán belül.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Clock, t: "24h kiszállás", d: "Bárhol az országban" },
                    { icon: Truck, t: "Saját futár", d: "Oda- és visszaszállítás" },
                    { icon: MapPin, t: "20 megye", d: "Teljes lefedettség" },
                    { icon: Phone, t: "Ingyenes tanácsadás", d: "Telefonon, azonnal" },
                  ].map((b) => (
                    <div key={b.t} className="rounded-2xl p-4" style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.12)" }}>
                      <b.icon size={16} style={{ color: "hsl(32 92% 54%)", marginBottom: 6 }} />
                      <p className="text-sm font-semibold">{b.t}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: "hsl(220 20% 62%)" }}>{b.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            
            <Reveal delay={100}>
              <div className="relative">
                <div className="absolute -inset-10 rounded-full opacity-[0.12] blur-[80px] pointer-events-none"
                  style={{ background: "radial-gradient(circle, hsl(32 92% 54%), transparent 60%)" }} />

                <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "hsl(220 20% 57%)" }}>
                  Lefedett megyék — mind a 20
                </p>

                
                <div className="relative mb-4">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "hsl(220 20% 57%)" }} />
                  <input
                    type="text"
                    placeholder="Keresse meg a megyéjét..."
                    value={countySearch}
                    onChange={(e) => { setCountySearch(e.target.value); setSelectedCounty(null); }}
                    className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.11)", color: "hsl(40 20% 97%)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.4)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.11)"; }}
                  />
                </div>

                
                <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {counties.map((c) => {
                    const meta = countyMeta[c];
                    const isSelected = selectedCounty === c;
                    const isKiemelt = meta?.tier === "kiemelt";
                    const isFiltered = countySearch && !c.toLowerCase().includes(countySearch.toLowerCase());
                    return (
                      <button
                        key={c}
                        onClick={() => setSelectedCounty(c)}
                        className="rounded-xl px-3 py-2.5 text-center text-xs font-medium transition-all duration-200 cursor-pointer"
                        style={{
                          background: isSelected ? "rgba(249,115,22,0.22)" : isKiemelt ? "rgba(249,115,22,0.1)" : "rgba(255,255,255,0.12)",
                          border: `1px solid ${isSelected ? "rgba(249,115,22,0.55)" : isKiemelt ? "rgba(249,115,22,0.28)" : "rgba(255,255,255,0.12)"}`,
                          color: isSelected ? "hsl(32 92% 72%)" : isKiemelt ? "hsl(32 92% 62%)" : "hsl(220 20% 70%)",
                          opacity: isFiltered ? 0.18 : 1,
                          transform: isSelected ? "scale(1.04)" : "scale(1)",
                          boxShadow: isSelected ? "0 0 18px rgba(249,115,22,0.22)" : "none",
                        }}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>

                
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs" style={{ color: "hsl(220 20% 57%)" }}>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "rgba(249,115,22,0.5)", border: "1px solid rgba(249,115,22,0.5)" }} />
                    Kiemelt partnerhálózat
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "rgba(255,255,255,0.11)", border: "1px solid rgba(255,255,255,0.12)" }} />
                    Aktív lefedettség
                  </span>
                  <span style={{ color: "hsl(220 8% 35%)" }}>· Kattintson egy megyére a részletekért</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="velemenyek" className="py-28 relative">
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="mb-16">
              <Chip>Ügyfeleink mondják</Chip>
              <h2 className="text-5xl md:text-6xl mt-4" style={{ fontWeight: 900 }}>Mit mondanak rólunk?</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div
                  className="glass-review rounded-2xl p-8 flex flex-col relative overflow-hidden"
                  style={{ borderTop: "2px solid rgba(249,115,22,0.28)" }}
                >
                  <div
                    className="absolute -top-5 right-5 font-black leading-none select-none pointer-events-none"
                    style={{ fontSize: "8rem", color: "rgba(249,115,22,0.06)", fontWeight: 900 }}
                    aria-hidden="true"
                  >"</div>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} size={14} fill="hsl(32 92% 54%)" color="hsl(32 92% 54%)" />
                    ))}
                  </div>
                  <p className="text-[15px] leading-relaxed flex-grow mb-8" style={{ color: "rgba(250,244,230,0.8)" }}>
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white shrink-0"
                      style={{ background: "linear-gradient(135deg, hsl(32 92% 54%), hsl(22 85% 44%))" }}
                    >
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs uppercase tracking-widest mt-0.5 font-medium" style={{ color: "hsl(32 92% 58%)" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      
      <section id="gyik" className="py-28 relative" style={{ background: "hsl(224 18% 4%)" }}>
        <div className="container mx-auto px-6 max-w-4xl">
          <Reveal>
            <div className="mb-16 text-center">
              <Chip>Gyakori kérdések</Chip>
              <h2 className="text-5xl md:text-6xl mt-4" style={{ fontWeight: 900 }}>Amit Önök kérdeznek.</h2>
            </div>
          </Reveal>

          <div className="space-y-3">
            {faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 50}>
                <div
                  className="rounded-3xl overflow-hidden"
                  style={{
                    background: "hsl(222 28% 15%)",
                    border: `1px solid ${openFaq === i ? "rgba(249,115,22,0.2)" : "rgba(255,255,255,0.12)"}`,
                    transition: "border-color 0.25s ease",
                  }}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                    style={{ background: "none", border: "none", color: "inherit" }}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="flex items-center gap-3 text-base font-semibold">
                      <HelpCircle size={18} style={{ color: "hsl(32 92% 54%)", flexShrink: 0 }} />
                      {f.q}
                    </span>
                    <ArrowRight
                      size={16}
                      style={{
                        color: openFaq === i ? "hsl(32 92% 54%)" : "hsl(220 20% 60%)",
                        flexShrink: 0,
                        transform: openFaq === i ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease, color 0.2s ease",
                      }}
                    />
                  </button>
                  <div
                    style={{
                      maxHeight: openFaq === i ? 240 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <p className="px-5 pb-5 pl-[3.25rem] text-sm leading-relaxed" style={{ color: "hsl(220 20% 65%)" }}>{f.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      
      <section id="kapcsolat" className="py-28 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05] blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(32 92% 54%), transparent 60%)" }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">

            
            <Reveal>
              <div>
                <Chip>Kapcsolat</Chip>
                <h2 className="text-4xl md:text-5xl mt-5 mb-3" style={{ fontWeight: 900 }}>Rendelje meg a javítást!</h2>
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "hsl(32 92% 54%)", animation: "pulse-glow 2s ease-in-out infinite" }} />
                  <p className="text-sm font-semibold" style={{ color: "hsl(32 92% 62%)" }}>Ma még tudunk időpontot adni — ne halogassa!</p>
                </div>
                <p className="mb-12 max-w-sm leading-relaxed text-[15px]" style={{ color: "hsl(220 20% 65%)" }}>
                  Töltse ki az űrlapot vagy hívjon minket — 24 órán belül felvesszük a kapcsolatot, és megszervezzük az oda-vissza szállítást.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: "Hívjon most", value: "+36 70 673 4444", href: "tel:+36706734444" },
                    { icon: Phone, label: "Másodlagos szám", value: "+36 20 346 8840", href: "tel:+36203468840" },
                    { icon: Mail, label: "Email", value: "info@syncwell.hu", href: "mailto:info@syncwell.hu" },
                    { icon: MapPin, label: "Telephely", value: "Magyarország, országos hálózat", href: "#" },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <a key={label} href={href}
                      className="flex items-center gap-4 group no-underline"
                      style={{ color: "inherit" }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
                        style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", color: "hsl(32 92% 54%)" }}
                      >
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest font-semibold mb-0.5" style={{ color: "hsl(220 20% 60%)" }}>{label}</div>
                        <div className="font-semibold text-sm">{value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                
                <div className="grid grid-cols-3 gap-3 mt-12">
                  {[
                    { icon: Clock, t: "24h kiszállás", d: "Országosan" },
                    { icon: ShieldCheck, t: "1/2 év garancia", d: "Minden javításra" },
                    { icon: MapPin, t: "Országos hálózat", d: "Partnerek" },
                  ].map((b) => (
                    <div key={b.t} className="rounded-2xl px-3 py-3 text-center" style={{ background: "rgba(249,115,22,0.07)", border: "1px solid rgba(249,115,22,0.15)" }}>
                      <b.icon size={18} style={{ color: "hsl(32 92% 54%)", margin: "0 auto 6px" }} />
                      <p className="text-xs font-semibold">{b.t}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: "hsl(220 20% 62%)" }}>{b.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            
            <Reveal delay={120}>
              <div
                className="glass-strong rounded-3xl p-10"
                style={{ boxShadow: "0 40px 80px -24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)" }}
              >
                {formState === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center" style={{ animation: "card-in 0.4s ease both" }}>
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                      style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)" }}
                    >
                      <CheckCircle2 size={30} style={{ color: "hsl(32 92% 54%)" }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Köszönjük!</h3>
                    <p className="text-sm max-w-xs" style={{ color: "hsl(220 20% 65%)" }}>
                      Hamarosan visszahívjuk — általában 24 órán belül.
                    </p>
                    <button
                      onClick={() => setFormState("idle")}
                      className="mt-8 text-xs cursor-pointer underline"
                      style={{ background: "none", border: "none", color: "hsl(220 20% 60%)" }}
                    >
                      Új üzenet küldése
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-bold mb-1">Kérjen ingyenes visszahívást</h3>
                    <p className="text-sm mb-6" style={{ color: "hsl(220 20% 65%)" }}>24 órán belül felvesszük Önnel a kapcsolatot.</p>

                    <form
                      className="space-y-5"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setFormState("loading");
                        setTimeout(() => setFormState("success"), 1600);
                      }}
                    >
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-widest mb-2 block" style={{ color: "hsl(220 20% 60%)" }}>Név</label>
                        <input
                          type="text"
                          placeholder="Adja meg nevét"
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                          style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.12)", color: "hsl(40 20% 97%)" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-semibold uppercase tracking-widest mb-2 block" style={{ color: "hsl(220 20% 60%)" }}>Telefonszám</label>
                          <input
                            type="tel"
                            placeholder="+36 70 000 0000"
                            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                            style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.12)", color: "hsl(40 20% 97%)" }}
                            onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold uppercase tracking-widest mb-2 block" style={{ color: "hsl(220 20% 60%)" }}>Email (opcionális)</label>
                          <input
                            type="email"
                            placeholder="pelda@email.hu"
                            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                            style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.12)", color: "hsl(40 20% 97%)" }}
                            onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-widest mb-2 block" style={{ color: "hsl(220 20% 60%)" }}>Üzenet</label>
                        <textarea
                          rows={4}
                          placeholder="Röviden írja le a hibát..."
                          className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all"
                          style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.12)", color: "hsl(40 20% 97%)" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={formState === "loading"}
                        className="btn-hover w-full rounded-full text-base font-semibold text-white py-4 cursor-pointer"
                        style={{
                          background: "hsl(32 92% 54%)",
                          boxShadow: "0 0 40px rgba(249,115,22,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                          border: "none",
                          opacity: formState === "loading" ? 0.7 : 1,
                          transition: "opacity 0.2s ease",
                        }}
                      >
                        {formState === "loading" ? "Küldés..." : "Kérek visszahívást"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      
      {showScrollTop && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 px-4 py-3"
          style={{
            background: "rgba(6,7,12,0.97)",
            backdropFilter: "blur(24px) saturate(1.8)",
            borderTop: "1px solid rgba(249,115,22,0.25)",
            boxShadow: "0 -8px 40px rgba(0,0,0,0.7)",
            animation: "card-in 0.35s cubic-bezier(0.22,1,0.36,1) both",
          }}
        >
          
          <div className="hidden sm:flex items-center gap-3 mr-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)" }}>
              <Phone size={14} style={{ color: "hsl(32 92% 54%)" }} />
            </div>
            <div className="leading-tight">
              <p className="text-[9px] uppercase tracking-widest" style={{ color: "hsl(220 8% 48%)" }}>Hívjon most ingyen</p>
              <p className="text-sm font-bold">+36 70 673 4444</p>
            </div>
          </div>

          
          <p className="hidden md:block text-xs flex-1" style={{ color: "hsl(220 20% 60%)" }}>
            <span style={{ color: "hsl(32 92% 62%)", fontWeight: 700 }}>⚡ Ma még tudunk időpontot adni</span> — ne halogassa a javítást!
          </p>

          
          <div className="flex items-center gap-2 ml-auto">
            <a
              href="tel:+36706734444"
              className="sm:hidden flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-semibold text-white no-underline"
              style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.35)" }}
            >
              <Phone size={13} /> Hívás
            </a>
            <a
              href="#kapcsolat"
              className="flex items-center gap-1.5 h-10 px-5 rounded-full text-sm font-bold text-white no-underline"
              style={{ background: "hsl(32 92% 54%)", boxShadow: "0 0 28px rgba(249,115,22,0.4)" }}
            >
              Javítást rendelek <ChevronRight size={13} />
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Vissza a tetejére"
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shrink-0"
              style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.11)", color: "hsl(220 20% 65%)" }}
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      )}

      
      {selectedCounty && (
        <CountyMapModal county={selectedCounty} onClose={() => setSelectedCounty(null)} />
      )}

      
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(20px)" }}
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.10)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative" style={{ height: 340 }}>
              <img
                src={lightboxItem.img}
                alt={lightboxItem.tag}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "saturate(0.85) contrast(1.08)" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(222 28% 15%), transparent 50%)" }} />
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.12)", color: "white" }}
              >
                <X size={16} />
              </button>
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                style={{ background: "rgba(34,197,94,0.85)", backdropFilter: "blur(8px)" }}>
                <CheckCircle2 size={10} /> Javítva
              </div>
            </div>

            <div className="p-7" style={{ background: "hsl(222 28% 15%)" }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "hsl(32 92% 60%)" }}>{lightboxItem.vehicle}</p>
              <h3 className="text-2xl font-black mb-5">{lightboxItem.tag}</h3>
              <div className="flex flex-wrap gap-4 mb-7 text-sm" style={{ color: "hsl(220 20% 70%)" }}>
                <span className="flex items-center gap-1.5"><Clock size={13} /> Javítási idő: <strong className="ml-1" style={{ color: "hsl(40 20% 90%)" }}>{lightboxItem.duration}</strong></span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={13} /> 1/2 év garancia</span>
                <span className="flex items-center gap-1.5"><Sparkles size={13} /> Eredeti alkatrészek</span>
              </div>
              <div className="flex gap-3">
                <a
                  href="#kapcsolat"
                  className="btn-hover flex-1 text-center rounded-full py-3 text-sm font-semibold text-white no-underline"
                  style={{ background: "hsl(32 92% 54%)", boxShadow: "0 0 30px rgba(249,115,22,0.28)" }}
                  onClick={() => setLightboxItem(null)}
                >
                  Kérek árajánlatot
                </a>
                <button
                  onClick={() => setLightboxItem(null)}
                  className="rounded-full px-6 py-3 text-sm font-semibold cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.1)", color: "hsl(220 20% 70%)" }}
                >
                  Bezárás
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
      <footer className="py-16 relative" style={{ borderTop: "1px solid rgba(255,255,255,0.10)", background: "hsl(224 22% 3%)" }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-14">

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, hsl(32 92% 54%), hsl(22 90% 44%))", boxShadow: "0 0 20px rgba(249,115,22,0.3)" }}
                >
                  <span style={{ color: "white", fontWeight: 900, fontSize: "1rem", lineHeight: 1 }}>K</span>
                </div>
                <span className="text-lg font-bold tracking-widest">kardán<span style={{ color: "hsl(32 92% 54%)" }}>javítás.hu</span></span>
              </div>
              <p className="text-sm max-w-xs leading-relaxed" style={{ color: "hsl(220 20% 60%)" }}>
                Kardántengely javítás, felújítás és értékesítés. Országos futárszolgálat.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-14 gap-y-3">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href}
                  className="text-sm no-underline transition-colors"
                  style={{ color: "hsl(220 20% 60%)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(40 20% 97%)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(220 20% 60%)")}
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="space-y-3">
              {[
                { icon: Phone, val: "+36 70 673 4444", href: "tel:+36706734444" },
                { icon: Phone, val: "+36 20 346 8840", href: "tel:+36203468840" },
                { icon: Mail, val: "info@syncwell.hu", href: "mailto:info@syncwell.hu" },
              ].map(({ icon: Icon, val, href }) => (
                <a key={val} href={href} className="flex items-center gap-3 text-sm no-underline" style={{ color: "hsl(220 20% 60%)" }}>
                  <Icon size={13} style={{ color: "hsl(32 92% 54%)", flexShrink: 0 }} />
                  {val}
                </a>
              ))}
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(255,255,255,0.10)", marginBottom: "2rem" }} />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>
            <div>© {new Date().getFullYear()} SyncWell Kreatív Kft. — kardánjavítás.hu</div>
            <div className="flex gap-6">
              <a href="#" className="no-underline transition-colors" style={{ color: "rgba(255,255,255,0.22)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(32 92% 54%)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
              >Adatvédelmi tájékoztató</a>
              <a href="#" className="no-underline transition-colors" style={{ color: "rgba(255,255,255,0.22)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(32 92% 54%)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
              >ÁSZF</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
