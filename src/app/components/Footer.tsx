import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router";
import { Facebook, Youtube, Linkedin, Instagram, Mail, Phone, MapPin, Clock, Search, X } from "lucide-react";
import { useProducts, useSolutions } from "../../lib/hooks";
import { OFFICE_PHONE, OFFICE_PHONE_TEL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "../../lib/constants";
import {
  locations,
  REGION_CLUSTERS,
  getRegionForCity,
  getLocationsForCustomer,
  searchLocations,
  resolveLocationKey,
  type LocationData,
} from "../pages/locations/locationData";

export function Footer() {
  const [showUpdate, setShowUpdate] = useState(false);
  const { data: products } = useProducts();
  const { data: solutions } = useSolutions();
  const routerLocation = useLocation();

  const [activeLocationKey, setActiveLocationKey] = useState<string>(() => {
    try {
      return localStorage.getItem("pacific_customer_location") || "delhi";
    } catch {
      return "delhi";
    }
  });
  const [footerSearch, setFooterSearch] = useState("");
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);

  // Sync customer location from current route
  useEffect(() => {
    const cleanPath = routerLocation.pathname.replace(/^\/+|\/+$/g, "");
    const pathSegment = cleanPath.split("/").pop() || "";
    const matchedKey = resolveLocationKey(pathSegment) || resolveLocationKey(cleanPath);
    if (matchedKey) {
      setActiveLocationKey(matchedKey);
      try {
        localStorage.setItem("pacific_customer_location", matchedKey);
      } catch {}
    }
  }, [routerLocation.pathname]);

  // Listen to custom location changes broadcasted across the app
  useEffect(() => {
    const handleLocationChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setActiveLocationKey(customEvent.detail);
      }
    };
    window.addEventListener("pacific_location_changed", handleLocationChange);
    return () => window.removeEventListener("pacific_location_changed", handleLocationChange);
  }, []);

  // Determine active cluster
  const currentRegion = useMemo(() => {
    if (selectedRegionId && selectedRegionId !== "all") {
      return REGION_CLUSTERS.find(r => r.id === selectedRegionId) || getRegionForCity(activeLocationKey);
    }
    return getRegionForCity(activeLocationKey);
  }, [selectedRegionId, activeLocationKey]);

  // Determine displayed locations based on search, selected tab, or customer's region
  const displayedLocations: LocationData[] = useMemo(() => {
    const query = footerSearch.trim();
    if (query) {
      return searchLocations(query);
    }
    if (selectedRegionId === "all") {
      return Object.values(locations);
    }
    if (selectedRegionId) {
      const cluster = REGION_CLUSTERS.find(r => r.id === selectedRegionId);
      if (cluster) {
        return cluster.cityKeys.map(k => locations[k]).filter((l): l is LocationData => Boolean(l));
      }
    }
    return getLocationsForCustomer(activeLocationKey);
  }, [footerSearch, selectedRegionId, activeLocationKey]);

  const handleLocationClick = (locKey: string) => {
    setActiveLocationKey(locKey);
    try {
      localStorage.setItem("pacific_customer_location", locKey);
      window.dispatchEvent(new CustomEvent("pacific_location_changed", { detail: locKey }));
    } catch {}
    setFooterSearch("");
  };

  const productLinks = [
    { name: "Restroom Cubicles", path: "/products/restroom-cubicles" },
    { name: "Modular Lockers", path: "/products/lockers" },
    { name: "Urinal Partitions", path: "/products/urinal-partitions" },
    { name: "Kids Safety Cubicles", path: "/products/kids-cubicles" },
    { name: "All Architectural Models", path: "/products" },
  ];

  const solutionTitles = solutions && solutions.length > 0
    ? Array.from(new Set(solutions.map(s => s.title).filter(Boolean))).slice(0, 7)
    : ["Corporates", "Malls", "Airports", "Metro and railways", "Hospitals", "Schools & Colleges", "Others"];

  const solutionLinks = solutionTitles.map(t => ({
    name: t,
    path: `/solutions?industry=${encodeURIComponent(t)}`
  }));

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Process", path: "/process" },
    { name: "Brochure", path: "/brochure" },
    { name: "Downloads", path: "/download" },
    { name: "FAQ", path: "/faq" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <footer className="bg-[#030213] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* ── 5-COLUMN TOP NAVIGATION GRID ───────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src="/logo-64.webp"
                  srcSet="/logo-64.webp 64w, /logo-84.webp 84w, /logo-128.webp 128w"
                  sizes="(max-width: 640px) 48px, 64px"
                  alt="Pacific Products & Solutions"
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="h-12 sm:h-16 w-12 sm:w-16 object-contain rounded-full"
                />
                <span className="text-base sm:text-lg font-bold tracking-tight leading-tight text-[#7FB706]">
                  Pacific Restroom<br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>Cubicle
                </span>
              </Link>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Leading B2B interior contracting provider in India, specializing in premium restroom cubicles, toilet partitions, urinal screens, locker solutions, and custom hardware for commercial spaces.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100063648025932"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#7FB706] transition-colors"
                aria-label="Visit Pacific Products & Solutions on Facebook"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://youtube.com/@pacificcubicles"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#7FB706] transition-colors"
                aria-label="Visit Pacific Products on YouTube"
              >
                <Youtube className="w-5 h-5" aria-hidden="true" />
                <span className="sr-only">YouTube</span>
              </a>
              <a
                href="https://www.linkedin.com/company/pacific-products-and-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#7FB706] transition-colors"
                aria-label="Visit Pacific Products & Solutions on LinkedIn"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/pacificcubicles"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#7FB706] transition-colors"
                aria-label="Visit Pacific Products on Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h4 className="font-bold mb-4 text-[#B5F823]">Services</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#7FB706] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Solutions */}
          <nav aria-label="Solutions">
            <h4 className="font-bold mb-4 text-[#B5F823]">Solutions</h4>
            <ul className="space-y-2">
              {solutionLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#7FB706] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h4 className="font-bold mb-4 text-[#B5F823]">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#7FB706] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold mb-4 text-[#B5F823]">Contact</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-1 text-[#7FB706] shrink-0" />
                <a href={`tel:${OFFICE_PHONE_TEL}`} className="text-gray-400 hover:text-[#7FB706] text-sm transition-colors">
                  {OFFICE_PHONE} (Office)
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-4 h-4 mt-1 text-[#25D366] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#25D366] text-sm transition-colors">
                  {WHATSAPP_DISPLAY} (WhatsApp)
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-1 text-[#7FB706] shrink-0" />
                <a href="mailto:info@pacificproduct.in" className="text-gray-400 hover:text-[#7FB706] text-sm transition-colors">
                  info@pacificproduct.in
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-[#7FB706] shrink-0" />
                <span className="text-gray-400 text-sm">
                  Okhla Industrial Estate Phase-II, New Delhi - 110020, Delhi, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── FULL-WIDTH CENTERED SERVICE LOCATIONS SECTION ──────── */}
        <div className="w-full my-12 pt-10 pb-8 px-4 sm:px-8 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 rounded-3xl shadow-2xl">
          {/* Centered Header */}
          <div className="max-w-3xl mx-auto text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7FB706]/15 text-[#B5F823] text-xs font-bold uppercase tracking-wider mb-3 border border-[#7FB706]/30">
              <MapPin className="w-3.5 h-3.5" />
              <span>National Footprint &amp; Project Supply</span>
            </div>
            <h4 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-2">
              Pan-India Service &amp; Project Locations
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Direct factory manufacturing in Okhla, New Delhi with express dispatch and certified installation crews deployed across all major commercial, institutional, and industrial hubs nationwide.
            </p>
          </div>

          {/* Centered Controls: Search & Region Switcher */}
          <div className="flex flex-col items-center gap-4 mb-8">
            {/* Search Box */}
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={footerSearch}
                onChange={(e) => {
                  setFooterSearch(e.target.value);
                  if (selectedRegionId) setSelectedRegionId(null);
                }}
                placeholder="Search city (e.g. Noida, Delhi NCR, Mumbai, Bengaluru)..."
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-[#08081a] border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#7FB706] shadow-inner transition-colors"
              />
              {footerSearch && (
                <button
                  type="button"
                  onClick={() => setFooterSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs p-1"
                  aria-label="Clear city search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Region Switcher Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => {
                  setFooterSearch("");
                  setSelectedRegionId(selectedRegionId === "all" ? null : "all");
                }}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all shadow-sm ${
                  selectedRegionId === "all"
                    ? "bg-[#7FB706] text-[#030213]"
                    : "bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                ALL (17 LOCATIONS)
              </button>
              {REGION_CLUSTERS.map((r) => {
                const isActive = !footerSearch && (selectedRegionId === r.id || (!selectedRegionId && currentRegion.id === r.id));
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setFooterSearch("");
                      setSelectedRegionId(r.id);
                    }}
                    className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
                      isActive
                        ? "bg-[#7FB706] text-[#030213] font-bold shadow-md shadow-[#7FB706]/20"
                        : "bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    {r.name.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full-Width Grid of Locations */}
          {displayedLocations.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
              {displayedLocations.map((loc) => {
                const isCurrent = loc.slug === activeLocationKey;
                return (
                  <Link
                    key={loc.slug}
                    to={`/${loc.canonicalSlug}`}
                    onClick={() => handleLocationClick(loc.slug)}
                    className={`group relative p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                      isCurrent
                        ? "bg-[#7FB706]/15 border-[#7FB706] text-white shadow-lg shadow-[#7FB706]/10"
                        : "bg-black/30 border-white/10 hover:border-[#7FB706]/50 hover:bg-white/5 text-gray-300 hover:text-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-xs sm:text-sm font-bold truncate group-hover:text-[#B5F823] transition-colors ${isCurrent ? "text-[#B5F823]" : "text-white"}`}>
                          {loc.city}
                        </span>
                        {isCurrent && (
                          <span className="w-2 h-2 rounded-full bg-[#B5F823] shrink-0 animate-pulse" />
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 group-hover:text-gray-300 truncate leading-snug">
                        {loc.stateName || loc.region}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 group-hover:text-gray-400">
                      <span className="truncate">
                        {loc.slug === "delhi" || loc.slug === "noida" || loc.slug === "gurugram" || loc.slug === "greater-noida" || loc.slug === "ghaziabad" || loc.slug === "faridabad"
                          ? "Same-Day Survey"
                          : loc.slug === "uae"
                          ? "GCC Export"
                          : "24–48h Express"}
                      </span>
                      <span className="text-[#7FB706] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-10 text-center bg-black/20 rounded-2xl border border-white/5 max-w-md mx-auto mb-6">
              <p className="text-sm font-semibold text-white mb-1">No locations matching "{footerSearch}"</p>
              <p className="text-xs text-gray-400 mb-3">Pacific manufactures and installs commercial restroom cubicles nationwide.</p>
              <button
                type="button"
                onClick={() => setFooterSearch("")}
                className="px-4 py-2 bg-[#7FB706] text-[#030213] text-xs font-bold rounded-xl"
              >
                Show All Cities
              </button>
            </div>
          )}

          {/* Logistics Note Strip */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#7FB706] shrink-0" />
              <p className="text-xs text-gray-300">
                <span className="font-bold text-white">Central Manufacturing Facility &amp; HQ:</span> Okhla Industrial Estate Phase-II, New Delhi. Direct factory supply &amp; turnkey installation Pan-India.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#25D366] hover:underline"
              >
                WhatsApp Project BOQ →
              </a>
            </div>
          </div>
        </div>

        {/* ── BOTTOM COPYRIGHT BAR ───────────────────────────────── */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2026 Pacific Products &amp; Solutions. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setShowUpdate(!showUpdate)}
                className="flex items-center gap-1.5 text-gray-500 hover:text-[#7FB706] text-sm transition-colors"
                title="Click to see last update time"
              >
                <Clock className="w-3.5 h-3.5" />
                {showUpdate && typeof __BUILD_DATE__ !== 'undefined' ? `Last Update: ${__BUILD_DATE__}` : "Version Info"}
              </button>
              <Link to="/privacy" className="text-gray-400 hover:text-[#7FB706] text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-[#7FB706] text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
