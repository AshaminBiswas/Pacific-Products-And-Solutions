import { useState, useEffect, useRef } from "react";
import { motion, animate, useInView } from "motion/react";
import { Link, useNavigate, useParams } from "react-router";
import { SEO } from "../components/SEO";
import { organizationSchema, faqSchema, breadcrumbSchema } from "../../lib/seo-data";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  DoorOpen,
  Dumbbell,
  ExternalLink,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Layers3,
  Mail,
  MapPin,
  MenuSquare,
  Phone,
  Plane,
  ShieldCheck,
  ShoppingBag,
  ShowerHead,
  Sparkles,
  Train,
  Trophy,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Button } from "../components/Button";
import { ContactForm } from "../components/ContactForm";
import { useLocationGallery } from "../../lib/hooks";
import { locations, type LocationData, resolveLocationKey } from "./locations/locationData";
import { FeaturedServices } from "../components/FeaturedServices";

const iconMap: Record<string, LucideIcon> = {
  Plane,
  GraduationCap,
  Heart: HeartPulse,
  Building2,
  Trophy,
  Dumbbell,
  Train,
  ShoppingBag,
  Landmark,
};

const serviceIcons: LucideIcon[] = [DoorOpen, ShowerHead, MenuSquare, Layers3, Wrench, Building2];

// Core canonical product categories with descriptions & direct links
const PRODUCT_CATEGORIES = [
  {
    title: "Commercial Restroom Cubicles",
    slug: "restroom-cubicles",
    path: "/products/restroom-cubicles",
    desc: "12mm & 18mm solid compact laminate (HPL) cubicles with heavy-duty Grade 304/316 SS or nylon hardware. 10-year moisture warranty.",
    badge: "10-Year Warranty",
  },
  {
    title: "Toilet Partitions",
    slug: "toilet-partitions",
    path: "/products/restroom-cubicles",
    desc: "Heavy-traffic toilet partition systems engineered for high-density corporate offices, IT parks, and transit terminals.",
    badge: "Heavy Commercial",
  },
  {
    title: "Urinal Partition Screens",
    slug: "urinal-partitions",
    path: "/products/urinal-partitions",
    desc: "Hygienic, anti-bacterial compact laminate modesty partition screens in wall-hung cantilever and floor-supported options.",
    badge: "Anti-Bacterial",
  },
  {
    title: "Modular HPL Lockers",
    slug: "lockers",
    path: "/products/lockers",
    desc: "High-density phenolic compact lockers with digital cam locks, master keys, and integrated ventilation slots for gyms and offices.",
    badge: "Phenolic Core",
  },
  {
    title: "Kids Safety Cubicles",
    slug: "kids-cubicles",
    path: "/products/kids-cubicles",
    desc: "Child-safe school toilet cubicles with anti-finger pinch safety clearance, rounded corners, and emergency coin release.",
    badge: "Child-Safe",
  },
  {
    title: "Architectural Hardware",
    slug: "hardware",
    path: "/products",
    desc: "Precision Grade 304/316 SS hinges, indicator locks, adjustable legs, coat hooks, and heavy-gauge aluminium profiles.",
    badge: "Grade 304/316 SS",
  },
];

// Technical specifications comparison data
const TECHNICAL_SPECS = [
  {
    parameter: "Core Material",
    specification: "Solid High-Pressure Compact Laminate (HPL / Phenolic Core)",
    standards: "Conforms to IS:2046 and EN 438-4 specifications",
  },
  {
    parameter: "Standard Thicknesses",
    specification: "12mm (Standard Commercial) & 18mm (Ultra High Traffic)",
    standards: "Density: ≥ 1400 kg/m³ with decorative melamine surfaces",
  },
  {
    parameter: "Water Absorption",
    specification: "Zero water absorption (≤ 0.5% immersion 24h)",
    standards: "100% moisture, steam, and water jet proof",
  },
  {
    parameter: "Hardware Alloys",
    specification: "Grade 304 / Grade 316 Stainless Steel & Polyamide Nylon",
    standards: "Corrosion-resistant; Satin, Matte Black, Golden PVD finishes",
  },
  {
    parameter: "Fire Safety Rating",
    specification: "Class 1 / Class A Fire Retardant Core available",
    standards: "BS 476 Part 7 certified self-extinguishing",
  },
  {
    parameter: "Warranty Coverage",
    specification: "10 Years on Compact Boards · 1 Year on Hardware",
    standards: "Guaranteed against delamination, swelling, and fungal decay",
  },
];

function cleanText(value: string) {
  return value
    .replace(/â€”/g, "-")
    .replace(/â€“/g, "-")
    .replace(/Â·/g, "|")
    .replace(/Â/g, "");
}

function scrollToInquiry() {
  document.getElementById("location-inquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openWhatsapp(data: LocationData) {
  const message = encodeURIComponent(`Hi Pacific Products, I want to discuss a commercial restroom cubicle project in ${cleanText(data.city)}.`);
  window.open(`https://wa.me/${data.whatsapp}?text=${message}`, "_blank", "noopener,noreferrer");
}

function mergeBackendImages(data: LocationData, locationImages: ReturnType<typeof useLocationGallery>["data"]): LocationData {
  const backendHeroImages = locationImages.filter((image) => image.placement === "hero").map(i => i.image_url);
  const heroImage = backendHeroImages.length > 0 ? backendHeroImages[0] : data.heroImage;
  const heroImages = backendHeroImages.length > 0 ? backendHeroImages : [data.heroImage];

  const galleryImages = locationImages
    .filter((image) => image.placement !== "hero")
    .map((image) => image.image_url);
  const repeatedGalleryImages = galleryImages.length > 0
    ? Array.from({ length: Math.max(6, galleryImages.length) }, (_, index) => galleryImages[index % galleryImages.length])
    : data.galleryImages;

  return {
    ...data,
    heroImage,
    heroImages,
    galleryImages: repeatedGalleryImages,
  };
}

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#7FB706] ${className}`}>
      <span className="h-px w-8 bg-[#7FB706]" />
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto mb-12 max-w-3xl text-center" : "mb-12 max-w-3xl"}>
      <Eyebrow className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-3xl font-bold leading-tight text-[#030213] dark:text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {copy && <p className="mt-5 text-base leading-8 text-gray-600 dark:text-gray-400 sm:text-lg">{copy}</p>}
    </div>
  );
}

function AnimatedCounter({ numericValue, suffix }: { numericValue: number; suffix: string }) {
  const [display, setDisplay] = useState("0" + suffix);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, numericValue, {
        duration: 2.2,
        ease: "easeOut",
        onUpdate(latest) {
          if (Number.isInteger(numericValue)) {
            setDisplay(Math.floor(latest) + suffix);
          } else {
            setDisplay(latest.toFixed(1) + suffix);
          }
        },
      });
      return controls.stop;
    }
  }, [inView, numericValue, suffix]);

  return <span ref={ref}>{display}</span>;
}

// ── SECTION 1: Breadcrumb Navigation ───────────────────────────────────────
function BreadcrumbNav({ data }: { data: LocationData }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-black/5 bg-gray-50/70 py-3 dark:border-white/5 dark:bg-white/[0.02]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <li>
            <Link to="/" className="hover:text-[#7FB706] transition-colors font-medium">Home</Link>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            <Link to="/products/restroom-cubicles" className="hover:text-[#7FB706] transition-colors font-medium">Restroom Cubicles</Link>
          </li>
          <li className="flex items-center gap-2">
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            <span className="font-semibold text-[#030213] dark:text-[#B5F823]">{cleanText(data.city)}</span>
          </li>
        </ol>
      </div>
    </nav>
  );
}

// ── SECTION 2: Location Hero Section ───────────────────────────────────────
function HeroSection({ data }: { data: LocationData }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f8f3] to-white py-12 dark:from-[#030213] dark:to-[#08071e] sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Eyebrow>{cleanText(data.region)}</Eyebrow>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-[#030213] dark:text-white sm:text-5xl lg:text-6xl">
              {cleanText(data.h1)}
            </h1>
            <p className="mt-6 text-base leading-8 text-gray-700 dark:text-gray-300 sm:text-lg">
              {cleanText(data.description)}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" onClick={scrollToInquiry} className="font-semibold shadow-lg shadow-[#7FB706]/20">
                Request a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link
                to="/products/restroom-cubicles"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-7 py-3.5 text-base font-semibold text-[#030213] transition hover:border-[#7FB706] hover:bg-[#7FB706]/5 dark:border-white/15 dark:bg-white/5 dark:text-white"
              >
                Explore Products
              </Link>
              <button
                onClick={() => openWhatsapp(data)}
                className="inline-flex items-center justify-center rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-3.5 text-base font-semibold text-[#128C7E] transition hover:bg-[#25D366] hover:text-white dark:text-[#25D366] dark:hover:text-white"
              >
                WhatsApp Us
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#7FB706]" />
                <span>ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#7FB706]" />
                <span>10-Year Board Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#7FB706]" />
                <span>Direct Manufacturer Supply</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3 shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-white/5">
              <div className="h-[460px] w-full overflow-hidden rounded-2xl relative">
                <img
                  src={data.heroImage}
                  alt={`${cleanText(data.city)} commercial restroom cubicles and toilet partitions by PRC`}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                  width={800}
                  height={460}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs font-semibold tracking-wider uppercase text-[#B5F823]">Commercial Specification</p>
                    <p className="text-lg font-bold">{cleanText(data.city)} Commercial Washroom Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Stats Strip ────────────────────────────────────────────────────────────
function StatStrip({ data }: { data: LocationData }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
      }}
      className="grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-black/10 bg-white shadow-xl shadow-black/5 dark:border-white/10 dark:bg-white/[0.03]"
    >
      {data.stats.map((stat) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
          }}
          key={stat.label}
          className="border-r border-black/10 p-5 last:border-r-0 dark:border-white/10 sm:p-7 text-center"
        >
          <div className="text-3xl font-extrabold text-[#7FB706] dark:text-[#B5F823]">
            <AnimatedCounter numericValue={stat.numericValue} suffix={stat.suffix} />
          </div>
          <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ── SECTION 3: Product Categories ──────────────────────────────────────────
function ProductCategoriesSection({ city }: { city: string }) {
  return (
    <section className="bg-white py-20 dark:bg-[#030213]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Product Range"
          title={`Commercial Restroom Products for ${cleanText(city)} Projects`}
          copy="Explore our comprehensive range of commercial partitioning systems. Every product category is precision-engineered, modular, and built for demanding B2B environments."
          align="center"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-7 transition hover:-translate-y-1 hover:border-[#7FB706]/40 hover:shadow-xl hover:shadow-black/5 dark:border-white/10 dark:bg-white/[0.02]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-[#7FB706]/10 px-3 py-1 text-xs font-bold text-[#7FB706] dark:text-[#B5F823]">
                    {cat.badge}
                  </span>
                  <DoorOpen className="h-5 w-5 text-gray-400 group-hover:text-[#7FB706] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#030213] dark:text-white group-hover:text-[#7FB706] transition-colors">
                  {cat.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100 dark:border-white/5">
                <Link
                  to={cat.path}
                  className="inline-flex items-center text-sm font-semibold text-[#7FB706] hover:text-[#5e8804] dark:hover:text-[#B5F823] transition-colors"
                >
                  View Specifications
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 4: Location-Specific Business Content ──────────────────────────
function RegionalOperationsSection({ data }: { data: LocationData }) {
  return (
    <section className="bg-[#f7f8f3] py-20 dark:bg-[#07061b]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>{cleanText(data.city)} Execution</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#030213] dark:text-white sm:text-4xl">
              Factory-Direct Supply & Regional Project Coordination
            </h2>
            <p className="mt-5 text-base leading-8 text-gray-700 dark:text-gray-300">
              Pacific Products & Solutions provides end-to-end commercial washroom project execution for contractors, architects, and corporate clients in <strong>{cleanText(data.city)}</strong>. All compact laminate panels are precision-routed on our CNC machining centers in Delhi NCR, packed in protective crates, and dispatched directly to your job site.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex items-start gap-4">
                  <Truck className="h-6 w-6 mt-1 text-[#7FB706] shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#030213] dark:text-white">Logistics & Delivery Timeline</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{data.logisticsInfo.deliveryTime}</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">Mode: {data.logisticsInfo.dispatchMode}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 mt-1 text-[#7FB706] shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#030213] dark:text-white">Key Commercial Corridors Served</h4>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {data.logisticsInfo.coverageHubs.map((hub) => (
                        <span key={hub} className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-white/10 dark:text-gray-300">
                          {hub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex items-start gap-4">
                  <Wrench className="h-6 w-6 mt-1 text-[#7FB706] shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#030213] dark:text-white">Professional On-Site Installation</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Trained installation teams deploy to your project site to handle laser levelling, anchor fixing, and precise panel alignment, ensuring zero damage and rapid handover.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-[#7FB706]/30 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-[#030213]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7FB706]">B2B Quotation Process</span>
              <h3 className="mt-3 text-2xl font-bold text-[#030213] dark:text-white">
                How to Request a BOQ Quote for {cleanText(data.city)}
              </h3>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                Architects, interior designers, general contractors, and facility heads can request tailored quotations in 3 easy steps:
              </p>

              <ol className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7FB706] text-xs font-bold text-white">1</span>
                  <span className="text-gray-700 dark:text-gray-300"><strong>Share Drawings & BOQ:</strong> Send your CAD plans, washroom layout, or approximate stall count.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7FB706] text-xs font-bold text-white">2</span>
                  <span className="text-gray-700 dark:text-gray-300"><strong>Shop Drawings & Estimate:</strong> Our estimation engineering team prepares itemized shop drawings and commercial quotes within 24 hours.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7FB706] text-xs font-bold text-white">3</span>
                  <span className="text-gray-700 dark:text-gray-300"><strong>Production & Delivery:</strong> Once approved, panels are CNC-machined, packed, and dispatched with installation coordination.</span>
                </li>
              </ol>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10">
              <Button size="lg" onClick={scrollToInquiry} className="w-full font-bold">
                Submit Your Project Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 5: Applications and Industries ─────────────────────────────────
function IndustrySection({ data }: { data: LocationData }) {
  return (
    <section className="bg-white py-20 dark:bg-[#030213]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Commercial Applications"
          title={`Built for High-Traffic ${cleanText(data.city)} Built Environments`}
          copy="Our cubicles and partitions are engineered to perform under heavy commercial foot traffic, rigorous cleaning chemicals, and demanding hygiene requirements across diverse industry sectors."
          align="center"
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {data.industries.map((ind, idx) => {
            const Icon = iconMap[ind.icon] || Building2;
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04, duration: 0.35 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-gray-50/50 p-6 text-center transition hover:border-[#7FB706]/40 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.05]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7FB706]/10 text-[#7FB706] dark:text-[#B5F823]">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="mt-4 text-sm font-bold text-[#030213] dark:text-white">{ind.name}</h4>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 6: Materials & Technical Specifications ───────────────────────
function TechnicalSpecsSection() {
  return (
    <section className="bg-[#030213] py-20 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Eyebrow className="justify-center">Engineering Standards</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Materials & Technical Specifications
          </h2>
          <p className="mt-4 text-base text-gray-400">
            Manufactured using solid High-Pressure Compact Laminate (HPL) conforming to IS:2046 and EN 438-4 with Grade 304/316 SS and Polyamide nylon hardware.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.04] text-xs uppercase tracking-wider text-[#B5F823]">
                <tr>
                  <th className="px-6 py-4 font-semibold">Parameter</th>
                  <th className="px-6 py-4 font-semibold">Specification</th>
                  <th className="px-6 py-4 font-semibold">Testing & Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {TECHNICAL_SPECS.map((spec) => (
                  <tr key={spec.parameter} className="transition hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-bold text-white whitespace-nowrap">{spec.parameter}</td>
                    <td className="px-6 py-4 text-gray-300">{spec.specification}</td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{spec.standards}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 text-center">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <span className="text-2xl font-bold text-[#B5F823]">12mm / 18mm</span>
            <p className="mt-1 text-xs text-gray-400">High-Density Solid Compact Core</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <span className="text-2xl font-bold text-[#B5F823]">Grade 304 / 316</span>
            <p className="mt-1 text-xs text-gray-400">Heavy-Duty Stainless Steel Hardware</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <span className="text-2xl font-bold text-[#B5F823]">10-Year Board</span>
            <p className="mt-1 text-xs text-gray-400">Delamination & Swelling Warranty</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 7: Verified Project Portfolio ──────────────────────────────────
function ProjectPortfolioSection({ data }: { data: LocationData }) {
  return (
    <section className="bg-white py-20 dark:bg-[#030213]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Commercial References"
          title={`Project Execution & Capability References for ${cleanText(data.city)}`}
          copy="Representative commercial and institutional projects delivered across corporate, airport, transit, healthcare, and educational sectors."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.projects.map((proj) => (
            <div
              key={proj}
              className="flex items-start gap-4 rounded-xl border border-black/10 bg-gray-50/50 p-5 transition hover:border-[#7FB706]/40 hover:bg-white dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.04]"
            >
              <Factory className="h-6 w-6 mt-1 text-[#7FB706] shrink-0" />
              <div>
                <h4 className="font-bold text-[#030213] dark:text-white">{proj}</h4>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Solid Compact Laminate Partitions & Modesty Screens</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-[#7FB706]/20 bg-[#7FB706]/5 p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#030213] dark:text-white">
            <CheckCircle2 className="h-5 w-5 text-[#7FB706]" />
            <span>ISO 9001:2015 Quality Management System</span>
          </div>
          <span className="hidden sm:inline text-gray-300 dark:text-gray-700">|</span>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#030213] dark:text-white">
            <CheckCircle2 className="h-5 w-5 text-[#7FB706]" />
            <span>Certified Material Test Reports (IS:2046 & EN 438)</span>
          </div>
          <span className="hidden sm:inline text-gray-300 dark:text-gray-700">|</span>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#030213] dark:text-white">
            <CheckCircle2 className="h-5 w-5 text-[#7FB706]" />
            <span>B2B Site Inspection & Handover Documentation</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION 8: Why Choose PRC ──────────────────────────────────────────────
function WhyChooseSection({ data }: { data: LocationData }) {
  return (
    <section className="bg-[#f7f8f3] py-20 dark:bg-[#07061b]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose PRC"
          title={`Why Architects & Contractors Choose PRC in ${cleanText(data.city)}`}
          copy="Commercial accountability, precision CNC manufacturing, and transparent warranties ensure your washroom projects are completed on schedule and to specification."
          align="center"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.whyChoose.map((item, idx) => (
            <div
              key={item.title}
              className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7FB706]/10 text-[#7FB706] dark:text-[#B5F823]">
                {idx % 2 === 0 ? <ShieldCheck className="h-6 w-6" /> : <Award className="h-6 w-6" />}
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#030213] dark:text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 9: Location Buyer FAQ Section ──────────────────────────────────
function FaqSection({ data }: { data: LocationData }) {
  return (
    <section className="bg-white py-20 dark:bg-[#030213]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title={`Questions About Restroom Cubicles in ${cleanText(data.city)}`}
          copy="Answers to common questions from project heads, contractors, and architects regarding materials, delivery, installation, and quotations."
          align="center"
        />

        <div className="mx-auto max-w-4xl space-y-4">
          {data.faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-black/10 bg-gray-50/50 p-6 transition hover:border-[#7FB706]/40 open:bg-white open:shadow-md dark:border-white/10 dark:bg-white/[0.02] dark:open:bg-white/[0.04]"
            >
              <summary className="cursor-pointer list-none text-base font-bold text-[#030213] dark:text-white flex items-center justify-between">
                <span>{cleanText(faq.question)}</span>
                <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7FB706]/10 text-[#7FB706] font-bold group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
                {cleanText(faq.answer)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION 10: Lead Generation Quote Form ─────────────────────────────────
function InquirySection({ data }: { data: LocationData }) {
  return (
    <section id="location-inquiry" className="bg-[#f7f8f3] py-20 dark:bg-[#07061b]">
      <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <SectionHeading
            eyebrow={`${cleanText(data.city)} Inquiry`}
            title="Request a Project Quotation & BOQ"
            copy={`Share your project requirements or CAD layouts. Our technical sales team serving ${cleanText(data.city)} will provide shop drawings and itemized estimates within 24 hours.`}
          />

          <div className="space-y-4">
            <div className="flex gap-4 rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#7FB706]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Service Coverage</p>
                <p className="mt-1 font-semibold text-[#030213] dark:text-white">{cleanText(data.address)}</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-[#7FB706]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Direct Phone</p>
                <a href={`tel:${data.phone}`} className="mt-1 font-semibold text-[#030213] hover:text-[#7FB706] dark:text-white transition-colors">
                  {cleanText(data.phone)}
                </a>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-[#7FB706]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Commercial Email</p>
                <a href={`mailto:${data.email}`} className="mt-1 font-semibold text-[#030213] hover:text-[#7FB706] dark:text-white transition-colors">
                  {cleanText(data.email)}
                </a>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-[#7FB706]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Business Hours</p>
                <p className="mt-1 font-semibold text-[#030213] dark:text-white">{cleanText(data.hours)}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => openWhatsapp(data)}
              className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-6 py-3 font-bold text-white transition hover:bg-[#1fb457]"
            >
              WhatsApp Us Directly
            </button>
            <button
              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(cleanText(data.address))}`, "_blank", "noopener,noreferrer")}
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 font-bold text-[#030213] transition hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Location Map
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-[#030213]">
          <h3 className="text-2xl font-bold text-[#030213] dark:text-white mb-2">
            Send {cleanText(data.city)} Project Inquiry
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Fill in your project details below to receive a formal quotation from Pacific Products & Solutions.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

// ── Map Section ────────────────────────────────────────────────────────────
function MapSection({ data }: { data: LocationData }) {
  if (!data.mapSrc) return null;
  return (
    <section className="relative h-[420px] overflow-hidden border-t border-black/10 dark:border-white/10">
      <iframe
        src={data.mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`${cleanText(data.city)} Pacific Products service map`}
        className="grayscale transition duration-500 hover:grayscale-0"
      />
      <div className="absolute left-6 top-6 rounded-xl border border-black/10 bg-white/95 p-4 shadow-xl backdrop-blur dark:border-white/10 dark:bg-[#030213]/92">
        <p className="font-bold text-[#030213] dark:text-white">{cleanText(data.city)}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">{cleanText(data.region)}</p>
      </div>
    </section>
  );
}

// ── Sticky Mobile CTA Dock ─────────────────────────────────────────────────
function StickyCta({ data }: { data: LocationData }) {
  return (
    <div className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white/95 p-3 shadow-2xl shadow-black/15 backdrop-blur dark:border-white/10 dark:bg-[#030213]/95">
      <div className="min-w-0 pl-2">
        <p className="truncate text-sm font-bold text-[#030213] dark:text-white">{cleanText(data.city)} Cubicle Inquiry</p>
        <p className="truncate text-xs text-gray-500 dark:text-gray-400">10-Year Board Warranty · Fast BOQ Quote</p>
      </div>
      <Button size="sm" onClick={scrollToInquiry} className="shrink-0 font-semibold">
        Get Quote
      </Button>
    </div>
  );
}

// ── Main Page Component ────────────────────────────────────────────────────
export default function LocationPage() {
  const { location, city } = useParams<{ location?: string; city?: string }>();
  const navigate = useNavigate();

  // Support both /restroom-cubicle-manufacturer-:city and /locations/:location
  const rawParam = city || location;
  const resolvedKey = resolveLocationKey(rawParam);
  const data = resolvedKey ? locations[resolvedKey] : null;

  const { data: locationImages } = useLocationGallery(resolvedKey || undefined);
  const pageData = data ? mergeBackendImages(data, locationImages) : null;

  if (!pageData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white pt-20 dark:bg-[#030213]">
        <div className="text-center px-4">
          <h1 className="mb-4 text-4xl font-bold text-[#030213] dark:text-white">Service Location Not Found</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            The requested location page does not exist or may have moved. Please explore our product catalog or contact our national sales desk.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate("/products/restroom-cubicles")}>View Products</Button>
            <Button variant="outline" onClick={() => navigate("/contact")}>Contact Us</Button>
          </div>
        </div>
      </div>
    );
  }

  const canonicalPath = `/${pageData.canonicalSlug}/`;

  return (
    <main className="min-h-screen bg-white text-[#030213] dark:bg-[#030213] dark:text-white">
      <SEO
        title={cleanText(pageData.meta.title).replace(' | Pacific Products & Solutions', '')}
        description={cleanText(pageData.meta.description)}
        keywords={pageData.meta.keywords ? cleanText(pageData.meta.keywords) : undefined}
        canonical={canonicalPath}
        geoRegion={pageData.geoRegion}
        geoPlacename={pageData.geoPlacename}
        jsonLd={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Restroom Cubicles", url: "/products/restroom-cubicles" },
            { name: cleanText(pageData.city), url: canonicalPath },
          ]),
          faqSchema(pageData.faqs.map(f => ({ question: cleanText(f.question), answer: cleanText(f.answer) }))),
        ]}
      />

      {/* Section 1: Breadcrumbs */}
      <BreadcrumbNav data={pageData} />

      {/* Section 2: High-Intent Hero */}
      <HeroSection data={pageData} />

      {/* Key Numbers */}
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <StatStrip data={pageData} />
      </div>

      {/* Section 3: Core Canonical Product Categories */}
      <ProductCategoriesSection city={pageData.city} />

      {/* Architectural Models Showcase */}
      <FeaturedServices />

      {/* Section 4: Location-Specific Business Operations & Logistics */}
      <RegionalOperationsSection data={pageData} />

      {/* Section 5: Applications and Commercial Industries */}
      <IndustrySection data={pageData} />

      {/* Section 6: Materials & Technical Specifications */}
      <TechnicalSpecsSection />

      {/* Section 7: Verified Project Portfolio */}
      <ProjectPortfolioSection data={pageData} />

      {/* Section 8: Why Choose PRC */}
      <WhyChooseSection data={pageData} />

      {/* Section 9: Local Buyer FAQ Section */}
      <FaqSection data={pageData} />

      {/* Section 10: Lead Generation Quote Form */}
      <InquirySection data={pageData} />

      {/* Map Section */}
      <MapSection data={pageData} />

      {/* Sticky Mobile CTA */}
      <StickyCta data={pageData} />
    </main>
  );
}
