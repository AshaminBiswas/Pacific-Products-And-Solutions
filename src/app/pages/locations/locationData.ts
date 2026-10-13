// ── Enhanced Location Data Store for Pacific Products & Solutions (PRC) ──
// High-intent B2B Local SEO landing pages covering Delhi NCR, Metros, and Key Growth Cities

export interface LocationFAQ {
  question: string;
  answer: string;
}

export interface LocationData {
  slug: string;
  canonicalSlug: string;
  city: string;
  stateName: string;
  region: string;
  targetKeyword: string;
  h1: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  whatsapp: string;
  mapSrc: string;
  geoRegion: string;
  geoPlacename: string;
  logisticsInfo: {
    deliveryTime: string;
    dispatchMode: string;
    coverageHubs: string[];
  };
  meta: {
    title: string;
    description: string;
    keywords?: string;
  };
  stats: { label: string; value: string; numericValue: number; suffix: string }[];
  services: { title: string; desc: string }[];
  industries: { name: string; icon: string }[];
  projects: string[];
  whyChoose: { title: string; desc: string }[];
  faqs: LocationFAQ[];
  heroImage: string;
  heroImages?: string[];
  galleryImages: string[];
}

// ── Curated high-resolution architectural washroom imagery ──
const IMAGES = {
  delhi: {
    hero: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1582407947092-205e6e38e9da?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
  },
  gurugram: {
    hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1582407947092-205e6e38e9da?w=800&q=80",
    ],
  },
  noida: {
    hero: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
  },
  mumbai: {
    hero: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472556-e636c2acda9e?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
    ],
  },
  kolkata: {
    hero: "https://images.unsplash.com/photo-1558431382-27e303142255?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472556-e636c2acda9e?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80",
    ],
  },
  bengaluru: {
    hero: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472556-e636c2acda9e?w=800&q=80",
    ],
  },
  hyderabad: {
    hero: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1582407947092-205e6e38e9da?w=800&q=80",
    ],
  },
  chennai: {
    hero: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472556-e636c2acda9e?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
  },
  pune: {
    hero: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
  },
  ahmedabad: {
    hero: "https://images.unsplash.com/photo-1590496793907-42217c2f0f4a?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1582407947092-205e6e38e9da?w=800&q=80",
    ],
  },
  general: {
    hero: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
  },
  uae: {
    hero: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    ],
  },
};

const COMMON_SERVICES = [
  { title: "Restroom Cubicles", desc: "Precision-engineered 12mm & 18mm solid compact laminate (HPL) cubicles with Grade 304/316 SS hardware." },
  { title: "Toilet Partitions", desc: "Heavy-duty commercial toilet partition systems designed for high-traffic public, corporate, and institutional washrooms." },
  { title: "Urinal Partitions", desc: "Anti-bacterial, 100% moisture-resistant modesty screens in wall-hung cantilever and floor-supported configurations." },
  { title: "Modular HPL Lockers", desc: "High-density phenolic compact lockers with cam locks, numeric dials, and master-key systems for corporate and gym amenities." },
  { title: "Kids Toilet Cubicles", desc: "Child-safe school toilet cubicles engineered with anti-finger pinch safety clearances and emergency coin release locks." },
  { title: "Cubicle Hardware Systems", desc: "Architectural-grade Grade 304/316 SS, Polyamide nylon, and heavy-gauge aluminium profiles built for extreme commercial use." },
];

const COMMON_INDUSTRIES = [
  { name: "Corporate Offices & IT Parks", icon: "Building2" },
  { name: "Airports & Transit Hubs", icon: "Plane" },
  { name: "Hospitals & Healthcare", icon: "Heart" },
  { name: "Schools & Universities", icon: "GraduationCap" },
  { name: "Shopping Malls & Retail", icon: "ShoppingBag" },
  { name: "Sports Arenas & Gyms", icon: "Dumbbell" },
  { name: "Metro & Railway Stations", icon: "Train" },
  { name: "Hotels & Hospitality", icon: "Landmark" },
];

const COMMON_WHY_CHOOSE = [
  { title: "Direct Manufacturer Pricing", desc: "Factory-direct supply eliminating middleman markups, ensuring competitive project BOQ rates." },
  { title: "10-Year Board Warranty", desc: "Certified compact laminate engineered against water absorption, delamination, and microbial growth." },
  { title: "Precision CNC Fabrication", desc: "In-house CNC routing and chamfered edges guarantee perfect alignment, quick assembly, and zero on-site cutting mess." },
  { title: "Dual Hardware Choices", desc: "Choice of architectural Grade 304/316 SS (Golden, Matte Black, Satin) or corrosion-proof Polyamide Nylon." },
  { title: "Fast-Track Project Coordination", desc: "Dedicated project coordinators and CAD engineers deliver shop drawings and BOQ estimates within 24 hours." },
  { title: "Pan-India Certified Installation", desc: "Experienced regional installation crews provide end-to-end site measurement, delivery, and handover." },
];

const COMMON_STATS = [
  { label: "Years of Excellence", value: "12+", numericValue: 12, suffix: "+" },
  { label: "Completed Projects", value: "600+", numericValue: 600, suffix: "+" },
  { label: "Corporate Clients", value: "100+", numericValue: 100, suffix: "+" },
  { label: "Board Warranty", value: "10 Yrs", numericValue: 10, suffix: " Yrs" },
];

export const locations: Record<string, LocationData> = {
  // ── 1. Delhi NCR (Head Office & Manufacturing Center) ──
  delhi: {
    slug: "delhi",
    canonicalSlug: "restroom-cubicle-manufacturer-delhi",
    city: "Delhi NCR",
    stateName: "Delhi",
    region: "North India · Corporate Headquarters",
    targetKeyword: "Restroom Cubicle Manufacturer in Delhi NCR",
    h1: "Restroom Cubicle Manufacturer in Delhi NCR",
    tagline: "Commercial Restroom Cubicles & HPL Toilet Partitions in Delhi NCR",
    description: "Pacific Products & Solutions is a leading B2B manufacturer and contractor of commercial restroom cubicles, HPL toilet partitions, urinal modesty screens, and modular lockers across Delhi, New Delhi, and the National Capital Region. Factory-direct supply from Okhla Industrial Estate with professional installation.",
    address: "Okhla Industrial Estate, New Delhi - 110020, Delhi, India",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112130.34005085694!2d76.99403816684724!3d28.514782017772656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "IN-DL",
    geoPlacename: "New Delhi, Delhi, India",
    logisticsInfo: {
      deliveryTime: "Same-day site visit; 1-3 days dispatch from central Okhla facility",
      dispatchMode: "Dedicated factory transport with trained in-house installation team",
      coverageHubs: ["Okhla", "Connaught Place", "Nehru Place", "Aerocity", "South Extension", "Netaji Subhash Place", "Bhikaji Cama Place"],
    },
    meta: {
      title: "Restroom Cubicle Manufacturer in Delhi NCR | Pacific Products",
      description: "Buy ISO-certified commercial restroom cubicles, HPL toilet partitions & urinal screens in Delhi NCR. 12mm/18mm compact laminate with Grade 304 SS hardware. Get quote.",
      keywords: "restroom cubicle manufacturer delhi, toilet cubicle manufacturer delhi ncr, hpl toilet partitions delhi, urinal partition manufacturer delhi, commercial washroom cubicles delhi",
    },
    stats: COMMON_STATS,
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["Delhi International Airport (DIAL) Vendor Areas", "Corporate Office Complexes in Aerocity", "Central Delhi Institutional Auditoriums", "Metro Station Staff Washrooms", "Healthcare Complexes in Saket", "Commercial Complexes in Nehru Place"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "Does PRC manufacture restroom cubicles directly in Delhi?", answer: "Yes. Our primary manufacturing and CNC routing facility is located at Okhla Industrial Estate, New Delhi, ensuring direct factory pricing, immediate sample availability, and fast project turnarounds." },
      { question: "What materials are used for cubicles in Delhi NCR commercial projects?", answer: "We use solid compact laminate (HPL) in 12mm and 18mm thicknesses conforming to IS:2046 and EN 438, paired with Grade 304/316 stainless steel, polyamide nylon, or powder-coated aluminium hardware." },
      { question: "Can PRC handle emergency installation deadlines in Delhi NCR?", answer: "Yes. Because our central facility is located in Delhi NCR, standard modular cubicle models can be fabricated, dispatched, and installed within 3 to 7 business days for urgent handover milestones." },
      { question: "What warranty is provided on toilet partitions in Delhi NCR?", answer: "We provide an industry-leading 10-year warranty against water absorption, delamination, and fungal growth on our compact laminate boards, accompanied by a 1-year operational hardware warranty." },
      { question: "How do I request a site visit and measurement in Delhi?", answer: "Contact our technical sales team via phone or the inquiry form. We provide same-day or next-day site visits for commercial projects with architectural drawings or BOQ requirements." },
    ],
    heroImage: IMAGES.delhi.hero,
    galleryImages: IMAGES.delhi.gallery,
  },

  // ── 2. Gurugram (Millennium City Corporate Hub) ──
  gurugram: {
    slug: "gurugram",
    canonicalSlug: "restroom-cubicle-manufacturer-gurugram",
    city: "Gurugram",
    stateName: "Haryana",
    region: "Delhi NCR · Millennium City Tech Corridor",
    targetKeyword: "Restroom Cubicle Manufacturer in Gurugram",
    h1: "Restroom Cubicle Manufacturer in Gurugram",
    tagline: "High-Specification Restroom Cubicles & Toilet Partitions for Gurugram IT Parks",
    description: "Pacific Products & Solutions provides architectural restroom cubicles, moisture-resistant compact laminate toilet partitions, and modesty screens for corporate towers, Grade-A IT campuses, and retail malls across Gurugram and Cyber City.",
    address: "Serving Cyber City, Udyog Vihar, Golf Course Road & Manesar from our Delhi NCR Hub",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112130.34005085694!2d76.99403816684724!3d28.514782017772656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "IN-HR",
    geoPlacename: "Gurugram, Haryana, India",
    logisticsInfo: {
      deliveryTime: "Next-day site measurement; 2-4 days direct site delivery",
      dispatchMode: "Dedicated logistics from Okhla facility via NH-48 corridor",
      coverageHubs: ["DLF Cyber City", "Golf Course Road", "Golf Course Extension", "Udyog Vihar", "Sohna Road", "Manesar Industrial Belt"],
    },
    meta: {
      title: "Restroom Cubicle Manufacturer in Gurugram | Toilet Partitions PRC",
      description: "Premium restroom cubicle manufacturer in Gurugram. Solid HPL toilet partitions, urinal modesty screens & lockers for Grade-A offices & malls. Free BOQ quote.",
      keywords: "restroom cubicle manufacturer gurugram, toilet cubicles gurgaon, commercial toilet partitions gurugram, hpl cubicles cyber city, urinal partitions gurgaon",
    },
    stats: COMMON_STATS,
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["Cyber City IT Office Blocks", "Golf Course Road Commercial Headquarters", "Udyog Vihar MNC Facilities", "Manesar Automotive Corporate Centers"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "Do you supply restroom cubicles to Cyber City and Golf Course Road corporate offices?", answer: "Yes, we regularly supply Grade-A corporate fit-out contractors and facility teams across Cyber City, Udyog Vihar, and Golf Course Road with architectural cubicle specifications." },
      { question: "Can PRC match custom architectural RAL color themes?", answer: "Yes. Our solid compact laminate panels are available in over 40 solid colors, wood grains, and stone textures, with Grade 304 SS hardware available in Satin, Matte Black, and Golden PVD finishes." },
      { question: "What is the typical turnaround time for projects in Gurugram?", answer: "Standard configurations take 3-5 business days from drawing approval to on-site delivery and installation." },
    ],
    heroImage: IMAGES.gurugram.hero,
    galleryImages: IMAGES.gurugram.gallery,
  },

  // ── 3. Noida (Commercial & Industrial Hub) ──
  noida: {
    slug: "noida",
    canonicalSlug: "restroom-cubicle-manufacturer-noida",
    city: "Noida",
    stateName: "Uttar Pradesh",
    region: "Delhi NCR · Commercial & Institutional Corridor",
    targetKeyword: "Restroom Cubicle Manufacturer in Noida",
    h1: "Restroom Cubicle Manufacturer in Noida",
    tagline: "Commercial Restroom Partitions & Compact Cubicles in Noida",
    description: "Pacific Products & Solutions designs, manufactures, and installs durable, water-resistant HPL restroom cubicles, urinal screens, and athletic locker systems for commercial towers, tech parks, and institutions across Noida and Noida Expressway.",
    address: "Serving Sector 62, Noida Expressway, Sector 18 & Phase II from our Delhi NCR Hub",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112104.28!2d77.30!3d28.53!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "IN-UP",
    geoPlacename: "Noida, Uttar Pradesh, India",
    logisticsInfo: {
      deliveryTime: "Daily site connectivity; 1-3 days fabrication and delivery",
      dispatchMode: "Direct dispatch from Delhi central plant via DND Flyway & Kalindi Kunj",
      coverageHubs: ["Sector 62 IT Hub", "Sector 18 Commercial Center", "Noida Expressway IT SEZs", "Phase II Industrial Area", "Sector 135 Corporate Park"],
    },
    meta: {
      title: "Restroom Cubicle Manufacturer in Noida | Toilet Partitions PRC",
      description: "Leading toilet cubicle and restroom partition manufacturer in Noida. 12mm phenolic compact laminate, SS 304 hardware, fast supply across Sector 62 & Expressway.",
      keywords: "restroom cubicle manufacturer noida, toilet cubicle manufacturer noida, urinal partition screens noida, hpl cubicles noida expressway, commercial toilet partitions noida",
    },
    stats: COMMON_STATS,
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["Noida Expressway IT Campuses", "Sector 62 Institutional Towers", "Retail Complexes in Sector 18", "Commercial Data Centers in Greater Noida Expressway"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "How quickly can cubicles be delivered and installed in Noida?", answer: "Given our factory location in neighboring Okhla (New Delhi), we provide 24-hour site measurements and rapid 2-4 day delivery and installation cycles across Noida." },
      { question: "Are PRC cubicles suitable for high-moisture public washrooms?", answer: "Yes. Our 12mm solid compact laminate is 100% waterproof, non-porous, and resistant to steam, cleaning acids, and intensive daily wash cycles." },
    ],
    heroImage: IMAGES.noida.hero,
    galleryImages: IMAGES.noida.gallery,
  },

  // ── 4. Greater Noida (Knowledge Park & Industrial Hub) ──
  "greater-noida": {
    slug: "greater-noida",
    canonicalSlug: "restroom-cubicle-manufacturer-greater-noida",
    city: "Greater Noida",
    stateName: "Uttar Pradesh",
    region: "Delhi NCR · Educational & Industrial Zone",
    targetKeyword: "Restroom Cubicle Manufacturer in Greater Noida",
    h1: "Restroom Cubicle Manufacturer in Greater Noida",
    tagline: "Institutional Toilet Cubicles & Industrial Restroom Solutions in Greater Noida",
    description: "Engineered restroom partitions and compact laminate cubicles designed for heavy institutional usage across Greater Noida's universities, tech zones, exhibition centers, and industrial corridors.",
    address: "Serving Knowledge Park, Pari Chowk, Surajpur & Ecotech Corridor from Delhi NCR Hub",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112285.12!2d77.45!3d28.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1dd9919f1bb%3A0xa19c5c994d5d36e2!2sGreater%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "IN-UP",
    geoPlacename: "Greater Noida, Uttar Pradesh, India",
    logisticsInfo: {
      deliveryTime: "Site measurement within 24 hours; 2-4 days transit",
      dispatchMode: "Palletized truck dispatch via Noida-Greater Noida Expressway",
      coverageHubs: ["Knowledge Park I-IV", "Pari Chowk", "Ecotech Industrial Areas", "Surajpur", "Yamuna Expressway Commercial Zone"],
    },
    meta: {
      title: "Restroom Cubicle Manufacturer in Greater Noida | PRC",
      description: "Restroom cubicle manufacturer in Greater Noida for universities, tech parks & industrial facilities. High-density HPL panels with 10-year warranty. Get quote.",
      keywords: "restroom cubicle manufacturer greater noida, toilet partitions greater noida, school cubicles knowledge park, industrial washroom cubicles surajpur",
    },
    stats: COMMON_STATS,
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["Knowledge Park University Campuses", "Ecotech Manufacturing Facilities", "Exhibition & Convention Facilities", "Commercial Tech Parks near Pari Chowk"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "Do you supply heavy-duty cubicles for educational campuses in Greater Noida?", answer: "Yes, our vandal-resistant compact laminate cubicles with nylon or heavy SS 304 hardware are specifically built for high-traffic schools, colleges, and university hostels." },
    ],
    heroImage: IMAGES.noida.hero,
    galleryImages: IMAGES.noida.gallery,
  },

  // ── 5. Ghaziabad (Industrial & Commercial Hub) ──
  ghaziabad: {
    slug: "ghaziabad",
    canonicalSlug: "restroom-cubicle-manufacturer-ghaziabad",
    city: "Ghaziabad",
    stateName: "Uttar Pradesh",
    region: "Delhi NCR · Industrial & Commercial Hub",
    targetKeyword: "Restroom Cubicle Manufacturer in Ghaziabad",
    h1: "Restroom Cubicle Manufacturer in Ghaziabad",
    tagline: "Commercial Washroom Cubicles & Partitions in Ghaziabad",
    description: "Pacific Products & Solutions delivers rugged, anti-bacterial compact laminate toilet cubicles, shower partitions, and urinal modesty panels for factories, commercial malls, and institutions across Ghaziabad.",
    address: "Serving Sahibabad Industrial Area, Raj Nagar District Centre, Indirapuram & Kaushambi",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111979.84!2d77.38!3d28.66!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1bb41c50fdf%3A0xe6f06fd26a7798ba!2sGhaziabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "IN-UP",
    geoPlacename: "Ghaziabad, Uttar Pradesh, India",
    logisticsInfo: {
      deliveryTime: "1-2 days site coordination; 2-4 days direct site delivery",
      dispatchMode: "Dedicated factory logistics from Okhla via NH-9 / Anand Vihar corridor",
      coverageHubs: ["Sahibabad Industrial Area", "Raj Nagar District Centre (RDC)", "Indirapuram", "Kaushambi", "Loni Commercial Zone"],
    },
    meta: {
      title: "Restroom Cubicle Manufacturer in Ghaziabad | PRC",
      description: "Commercial restroom cubicle manufacturer in Ghaziabad. Solid HPL toilet partitions, urinal modesty screens & lockers for factories, malls & offices. Request pricing.",
      keywords: "restroom cubicle manufacturer ghaziabad, toilet cubicles sahibabad, commercial toilet partitions ghaziabad, urinal partitions indirapuram",
    },
    stats: COMMON_STATS,
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["Sahibabad Industrial Plants", "Indirapuram Commercial Shopping Centers", "RDC Office Complexes", "Healthcare Facilities in Vaishali"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "Can PRC provide durable cubicles for industrial factory washrooms in Ghaziabad?", answer: "Yes, our 12mm compact laminate systems with nylon or stainless steel hardware withstand heavy multi-shift industrial usage, chemical washdowns, and high humidity." },
    ],
    heroImage: IMAGES.general.hero,
    galleryImages: IMAGES.general.gallery,
  },

  // ── 6. Faridabad (Industrial Growth Corridor) ──
  faridabad: {
    slug: "faridabad",
    canonicalSlug: "restroom-cubicle-manufacturer-faridabad",
    city: "Faridabad",
    stateName: "Haryana",
    region: "Delhi NCR · Industrial & Commercial Belt",
    targetKeyword: "Restroom Cubicle Manufacturer in Faridabad",
    h1: "Restroom Cubicle Manufacturer in Faridabad",
    tagline: "Durable Restroom Partitions & Commercial Cubicles in Faridabad",
    description: "Pacific Products & Solutions provides factory-direct compact laminate restroom cubicles, urinal partitions, and staff lockers for manufacturing plants, commercial towers, and hospitals across Faridabad and Mathura Road.",
    address: "Serving Mathura Road, Sector 24/25, Badarpur Corridor & Ballabhgarh from Delhi NCR Hub",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112356.12!2d77.28!3d28.40!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdde154f85e43%3A0xb3e7c813c9e6bb07!2sFaridabad%2C%20Haryana!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "IN-HR",
    geoPlacename: "Faridabad, Haryana, India",
    logisticsInfo: {
      deliveryTime: "Same-day site measurement; 1-3 days fabrication & delivery",
      dispatchMode: "Direct dispatch from Okhla central plant via Mathura Road corridor",
      coverageHubs: ["Mathura Road Industrial Belt", "Sector 24/25 Industrial Areas", "NHPC Chowk Commercial Area", "Badarpur Border", "Ballabhgarh Corridor"],
    },
    meta: {
      title: "Restroom Cubicle Manufacturer in Faridabad | PRC",
      description: "Restroom cubicle manufacturer in Faridabad. Waterproof HPL toilet partitions, urinal screens, factory lockers. Quick dispatch from Okhla facility. Get quote.",
      keywords: "restroom cubicle manufacturer faridabad, toilet cubicles faridabad, industrial toilet partitions mathura road, hpl cubicles faridabad",
    },
    stats: COMMON_STATS,
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["Mathura Road Industrial Hubs", "Sector 24 Commercial Plants", "Healthcare Facilities in Sector 16", "Metro Line Commuter Amenities"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "How close is your manufacturing facility to Faridabad projects?", answer: "Our main manufacturing plant in Okhla is situated just 15 minutes from the Faridabad-Delhi border, enabling exceptionally fast site inspections, deliveries, and technician support." },
    ],
    heroImage: IMAGES.general.hero,
    galleryImages: IMAGES.general.gallery,
  },

  // ── 7. Mumbai (Financial Capital & Western Hub) ──
  mumbai: {
    slug: "mumbai",
    canonicalSlug: "restroom-cubicle-manufacturer-mumbai",
    city: "Mumbai",
    stateName: "Maharashtra",
    region: "West India · Financial Capital Hub",
    targetKeyword: "Restroom Cubicle Manufacturer in Mumbai",
    h1: "Restroom Cubicle Manufacturer in Mumbai",
    tagline: "Architectural Restroom Cubicles & Moisture-Proof Partitions for Mumbai",
    description: "Pacific Products & Solutions is an established B2B manufacturer and contractor supplying solid compact laminate toilet partitions, urinal modesty screens, and luxury washroom cubicles to corporate towers, hotels, and transit hubs across Mumbai, Navi Mumbai, and Thane.",
    address: "Serving BKC, Lower Parel, Andheri East, Navi Mumbai & Thane with certified local crews",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "IN-MH",
    geoPlacename: "Mumbai, Maharashtra, India",
    logisticsInfo: {
      deliveryTime: "3-5 days transit from central facility with palletized crating",
      dispatchMode: "Dedicated road freight to Mumbai depots; local certified installation team",
      coverageHubs: ["Bandra Kurla Complex (BKC)", "Lower Parel", "Andheri East / MIDC", "Powai", "Navi Mumbai Vashi / Airoli", "Thane Wagle Estate"],
    },
    meta: {
      title: "Restroom Cubicle Manufacturer in Mumbai | Toilet Partitions PRC",
      description: "Leading restroom cubicle manufacturer in Mumbai. 12mm/18mm phenolic HPL partitions, urinal screens & lockers for BKC, Lower Parel & Navi Mumbai. Request quote.",
      keywords: "restroom cubicle manufacturer mumbai, toilet cubicle manufacturer mumbai, toilet partitions bkc mumbai, urinal partition screens mumbai, hpl cubicles mumbai",
    },
    stats: COMMON_STATS,
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["Bandra Kurla Complex (BKC) Corporate Towers", "Lower Parel Commercial Mill Compounds", "Andheri MIDC Tech Campuses", "Navi Mumbai IT Parks & Data Centers"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "How does PRC handle delivery and installation for Mumbai projects?", answer: "Panels are precision CNC routed and pre-drilled at our central plant, palletized with waterproof packaging, and shipped directly to the Mumbai site. Our experienced local installation technicians complete assembly on site." },
      { question: "Are PRC cubicles resistant to Mumbai's coastal humidity and monsoon moisture?", answer: "Yes. Our solid compact laminate panels have zero water absorption and are impervious to swelling, mold, or rust, backed by Grade 304 or 316 stainless steel hardware." },
      { question: "Do you supply toilet cubicles to high-density commercial spaces like BKC and Lower Parel?", answer: "Yes. We have executed large corporate floor rollouts across BKC and Lower Parel with custom heights, concealed hardware, and matching locker systems." },
    ],
    heroImage: IMAGES.mumbai.hero,
    galleryImages: IMAGES.mumbai.gallery,
  },

  // ── 8. Kolkata (East India Hub) ──
  kolkata: {
    slug: "kolkata",
    canonicalSlug: "restroom-cubicle-manufacturer-kolkata",
    city: "Kolkata",
    stateName: "West Bengal",
    region: "East India · Regional Operations Hub",
    targetKeyword: "Restroom Cubicle Manufacturer in Kolkata",
    h1: "Restroom Cubicle Manufacturer in Kolkata",
    tagline: "Commercial Restroom Cubicles & Toilet Partitions in Kolkata",
    description: "Serving East India from our established Kolkata operations, Pacific Products & Solutions provides world-class HPL restroom cubicles, urinal modesty screens, and athletic locker systems for tech campuses, hospitals, and infrastructure across Kolkata and West Bengal.",
    address: "Salt Lake Sector V, Kolkata - 700091, West Bengal, India",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.33!2d88.264!3d22.535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "IN-WB",
    geoPlacename: "Kolkata, West Bengal, India",
    logisticsInfo: {
      deliveryTime: "Regional depot stocking; 2-4 days project supply",
      dispatchMode: "Dedicated regional transport with local certified installation team",
      coverageHubs: ["Salt Lake Sector V", "Rajarhat New Town", "Park Street Commercial", "Howrah Commercial Zone", "Chittaranjan Avenue"],
    },
    meta: {
      title: "Restroom Cubicle Manufacturer in Kolkata | Toilet Partitions PRC",
      description: "Kolkata's trusted restroom cubicle & toilet partition manufacturer. 12mm/18mm solid HPL compact laminate for IT parks, hospitals & malls. Free site consultation.",
      keywords: "restroom cubicle manufacturer kolkata, toilet cubicle manufacturer west bengal, urinal partitions kolkata, salt lake sector v cubicles, hpl toilet partitions kolkata",
    },
    stats: COMMON_STATS,
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["Salt Lake Sector V IT Campuses", "Rajarhat New Town Commercial Towers", "Kolkata Metro Station Public Restrooms", "Heritage Renovation Complexes"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "Do you have a dedicated service presence in Kolkata?", answer: "Yes, we maintain a dedicated regional presence and technical team in Salt Lake Sector V, managing site measurements, delivery, and installation throughout West Bengal." },
      { question: "What material works best for Kolkata's high humidity levels?", answer: "Our solid compact laminate panels are specifically engineered for tropical high-humidity climates, resisting mold, water absorption, and warping without requiring edge-banding." },
    ],
    heroImage: IMAGES.kolkata.hero,
    galleryImages: IMAGES.kolkata.gallery,
  },

  // ── 9. Bengaluru (Silicon Valley Tech Hub) ──
  bengaluru: {
    slug: "bengaluru",
    canonicalSlug: "restroom-cubicle-manufacturer-bengaluru",
    city: "Bengaluru",
    stateName: "Karnataka",
    region: "South India · Silicon Valley Tech Hub",
    targetKeyword: "Restroom Cubicle Manufacturer in Bengaluru",
    h1: "Restroom Cubicle Manufacturer in Bengaluru",
    tagline: "Architectural Restroom Cubicles & Partitions for Bengaluru Tech Campuses",
    description: "Pacific Products & Solutions provides high-performance commercial restroom cubicles, compact laminate toilet partitions, and digital locker systems for MNC tech campuses, corporate parks, and institutions across Bengaluru.",
    address: "Serving Whitefield, Electronic City, Outer Ring Road & Manyata Tech Park",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.8865390924!2d77.49085205561085!3d12.953959988185244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "IN-KA",
    geoPlacename: "Bengaluru, Karnataka, India",
    logisticsInfo: {
      deliveryTime: "4-5 days transit with crate protection; local installation management",
      dispatchMode: "Regular containerized freight to Bangalore depot with on-site deployment",
      coverageHubs: ["Whitefield IT Corridor", "Electronic City", "Outer Ring Road (ORR)", "Manyata Embassy Business Park", "Indiranagar", "Koramangala Commercial"],
    },
    meta: {
      title: "Restroom Cubicle Manufacturer in Bengaluru | Toilet Partitions PRC",
      description: "Premier restroom cubicle manufacturer in Bengaluru. High-density compact laminate partitions for tech parks in Whitefield, ORR & Electronic City. Request quote.",
      keywords: "restroom cubicle manufacturer bengaluru, toilet cubicle manufacturer bangalore, toilet partitions whitefield, hpl cubicles bangalore tech parks, urinal partitions bengaluru",
    },
    stats: COMMON_STATS,
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["Outer Ring Road Tech Campuses", "Whitefield Enterprise Workspaces", "Manyata Tech Park Facilities", "Electronic City Corporate Campuses"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "Can PRC meet corporate MNC washroom design specifications in Bengaluru?", answer: "Yes. Our cubicle systems meet LEED green building criteria, featuring low-VOC materials, Grade 304/316 SS hardware, and ADA-compliant accessibility stall dimensions." },
      { question: "How does PRC coordinate projects in Bengaluru without an in-city factory?", answer: "We pre-machine every component at our high-capacity central plant with millimetric precision, freight them in secured crates, and deploy trained local installation crews for rapid on-site assembly." },
    ],
    heroImage: IMAGES.bengaluru.hero,
    galleryImages: IMAGES.bengaluru.gallery,
  },

  // ── 10. Hyderabad (Cyberabad Tech Corridor) ──
  hyderabad: {
    slug: "hyderabad",
    canonicalSlug: "restroom-cubicle-manufacturer-hyderabad",
    city: "Hyderabad",
    stateName: "Telangana",
    region: "South India · Cyberabad Tech Hub",
    targetKeyword: "Restroom Cubicle Manufacturer in Hyderabad",
    h1: "Restroom Cubicle Manufacturer in Hyderabad",
    tagline: "Commercial Toilet Partitions & Restroom Cubicles in Hyderabad",
    description: "Pacific Products & Solutions delivers solid compact laminate restroom cubicles, urinal privacy partitions, and locker solutions for IT towers, pharma corporate campuses, and convention centers across HITEC City, Gachibowli, and Financial District.",
    address: "Serving HITEC City, Gachibowli, Financial District, Madhapur & Kondapur",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3160407073!2d78.26795855018619!3d17.41229980138977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "IN-TG",
    geoPlacename: "Hyderabad, Telangana, India",
    logisticsInfo: {
      deliveryTime: "3-5 days direct freight; local project execution",
      dispatchMode: "Dedicated road transit to Hyderabad with regional supervisor and technicians",
      coverageHubs: ["HITEC City", "Gachibowli", "Financial District Nanakramguda", "Madhapur", "Jubilee Hills Commercial", "Shamshabad Airport Corridor"],
    },
    meta: {
      title: "Restroom Cubicle Manufacturer in Hyderabad | Toilet Partitions PRC",
      description: "Restroom cubicle manufacturer in Hyderabad. Premium HPL toilet partitions, urinal modesty screens & lockers for HITEC City & Gachibowli. Get pricing.",
      keywords: "restroom cubicle manufacturer hyderabad, toilet cubicles hitec city, commercial toilet partitions hyderabad, urinal screens gachibowli, hpl cubicles hyderabad",
    },
    stats: COMMON_STATS,
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["HITEC City Corporate Campuses", "Financial District Tower Washrooms", "Pharma Research Corporate Hubs", "Convention & Exhibition Restrooms"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "Do you supply toilet partitions for IT and pharma corporate headquarters in Hyderabad?", answer: "Yes, our chemical-resistant, non-porous compact laminate systems are widely specified for high-standard hygiene facilities in HITEC City and Genome Valley." },
    ],
    heroImage: IMAGES.hyderabad.hero,
    galleryImages: IMAGES.hyderabad.gallery,
  },

  // ── 11. Chennai (Automotive & IT Hub) ──
  chennai: {
    slug: "chennai",
    canonicalSlug: "restroom-cubicle-manufacturer-chennai",
    city: "Chennai",
    stateName: "Tamil Nadu",
    region: "South India · Industrial & IT Hub",
    targetKeyword: "Restroom Cubicle Manufacturer in Chennai",
    h1: "Restroom Cubicle Manufacturer in Chennai",
    tagline: "Corrosion-Proof Restroom Cubicles & Partitions in Chennai",
    description: "Pacific Products & Solutions provides anti-corrosive solid compact laminate restroom cubicles, stainless steel urinal partitions, and lockers built to withstand coastal atmospheric conditions for IT parks and manufacturing plants across Chennai.",
    address: "Serving OMR IT Expressway, Guindy, Ambattur, Sriperumbudur & T Nagar",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248756.11677334758!2d80.06892461875323!3d13.047525480572855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "IN-TN",
    geoPlacename: "Chennai, Tamil Nadu, India",
    logisticsInfo: {
      deliveryTime: "4-5 days transit from central facility with waterproof crating",
      dispatchMode: "Containerized dispatch to Chennai logistics hubs; certified local crew",
      coverageHubs: ["OMR IT Expressway", "Guindy Industrial Estate", "Ambattur", "Sriperumbudur Industrial Corridor", "Mount Road / T Nagar"],
    },
    meta: {
      title: "Restroom Cubicle Manufacturer in Chennai | Toilet Partitions PRC",
      description: "Corrosion-proof restroom cubicle manufacturer in Chennai. Solid compact laminate & Grade 316 SS hardware for OMR IT parks & manufacturing hubs. Get quote.",
      keywords: "restroom cubicle manufacturer chennai, toilet partitions omr chennai, commercial washroom cubicles chennai, urinal partitions guindy, hpl cubicles chennai",
    },
    stats: COMMON_STATS,
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["OMR IT Park Washrooms", "Guindy Corporate Campuses", "Automotive Assembly Plant Restrooms in Sriperumbudur", "Healthcare Facilities in Greams Road"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "How do your cubicles resist Chennai's saline coastal air and rust?", answer: "We provide Grade 316 marine-grade stainless steel or corrosion-proof polyamide nylon hardware paired with 100% phenolic compact laminate boards that never rust or corrode." },
    ],
    heroImage: IMAGES.chennai.hero,
    galleryImages: IMAGES.chennai.gallery,
  },

  // ── 12. Pune (Automotive & Tech Hub) ──
  pune: {
    slug: "pune",
    canonicalSlug: "restroom-cubicle-manufacturer-pune",
    city: "Pune",
    stateName: "Maharashtra",
    region: "West India · Tech & Engineering Hub",
    targetKeyword: "Restroom Cubicle Manufacturer in Pune",
    h1: "Restroom Cubicle Manufacturer in Pune",
    tagline: "Commercial Restroom Partitions & Compact Cubicles in Pune",
    description: "Pacific Products & Solutions manufactures high-durability compact laminate restroom cubicles, urinal modesty screens, and staff lockers for Hinjewadi IT parks, Magarpatta tech zones, and Chakan industrial campuses in Pune.",
    address: "Serving Hinjewadi IT Park, Magarpatta, Kharadi, Chakan & Viman Nagar",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.70906757134!2d73.6981504996969!3d18.524870599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d3d3432!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "IN-MH",
    geoPlacename: "Pune, Maharashtra, India",
    logisticsInfo: {
      deliveryTime: "3-4 days freight dispatch; local installation execution",
      dispatchMode: "Direct freight to Pune logistics centers with local site installation team",
      coverageHubs: ["Hinjewadi Infotech Park", "Magarpatta City", "Kharadi EON Free Zone", "Chakan Industrial Zone", "Viman Nagar Commercial"],
    },
    meta: {
      title: "Restroom Cubicle Manufacturer in Pune | Toilet Partitions PRC",
      description: "Leading restroom cubicle manufacturer in Pune. Solid HPL toilet partitions, urinal modesty screens & lockers for Hinjewadi & Kharadi tech parks. Free quote.",
      keywords: "restroom cubicle manufacturer pune, toilet cubicles hinjewadi pune, commercial toilet partitions pune, urinal screens kharadi, hpl cubicles pune",
    },
    stats: COMMON_STATS,
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["Hinjewadi IT Phase 1-3 Facilities", "Kharadi Tech Park Tower Washrooms", "Automotive Industrial Campuses in Chakan", "Institutional Universities in Kothrud"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "Can PRC handle large multi-level IT campus washroom fit-outs in Pune?", answer: "Yes, our modular CNC manufacturing pipeline accommodates high stall volumes (100+ cubicle units) with synchronized phased delivery matching site handover milestones." },
    ],
    heroImage: IMAGES.pune.hero,
    galleryImages: IMAGES.pune.gallery,
  },

  // ── 13. Ahmedabad (Industrial & Commercial Capital of Gujarat) ──
  ahmedabad: {
    slug: "ahmedabad",
    canonicalSlug: "restroom-cubicle-manufacturer-ahmedabad",
    city: "Ahmedabad",
    stateName: "Gujarat",
    region: "West India · Commercial & GIFT City Corridor",
    targetKeyword: "Restroom Cubicle Manufacturer in Ahmedabad",
    h1: "Restroom Cubicle Manufacturer in Ahmedabad",
    tagline: "Commercial Toilet Cubicles & Restroom Partitions in Ahmedabad",
    description: "Pacific Products & Solutions provides architectural compact laminate restroom cubicles, urinal screens, and athletic lockers for corporate headquarters, textile complexes, and financial towers across Ahmedabad and GIFT City.",
    address: "Serving SG Highway, GIFT City, Sanand, Prahlad Nagar & Changodar",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235014.29918731385!2d72.41493010497576!3d23.020158084667503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "IN-GJ",
    geoPlacename: "Ahmedabad, Gujarat, India",
    logisticsInfo: {
      deliveryTime: "2-3 days direct freight from Delhi NCR; local installation management",
      dispatchMode: "Daily road transit via Western Freight Corridor; local certified fitters",
      coverageHubs: ["SG Highway Corporate Belt", "GIFT City Financial Zone", "Prahlad Nagar", "Sanand Industrial Area", "Changodar"],
    },
    meta: {
      title: "Restroom Cubicle Manufacturer in Ahmedabad | Toilet Partitions PRC",
      description: "Restroom cubicle manufacturer in Ahmedabad & GIFT City. Solid HPL toilet partitions, urinal modesty screens & lockers. Fast delivery & warranty. Get quote.",
      keywords: "restroom cubicle manufacturer ahmedabad, toilet cubicles gift city, commercial toilet partitions ahmedabad, urinal screens sg highway, hpl cubicles ahmedabad",
    },
    stats: COMMON_STATS,
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["GIFT City Tower Corporate Restrooms", "SG Highway Corporate Headquarters", "Pharma & Chemical Industrial Washrooms in Sanand", "Commercial Malls in Prahlad Nagar"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "Do you supply toilet cubicles to GIFT City projects in Gandhinagar?", answer: "Yes, we meet GIFT City's international specification guidelines for green building materials, fire safety ratings (BS 476 Part 7 Class 1), and anti-bacterial surfaces." },
    ],
    heroImage: IMAGES.ahmedabad.hero,
    galleryImages: IMAGES.ahmedabad.gallery,
  },

  // ── 14. Guwahati (Northeast Gateway) ──
  guwahati: {
    slug: "guwahati",
    canonicalSlug: "restroom-cubicle-manufacturer-guwahati",
    city: "Guwahati",
    stateName: "Assam",
    region: "Northeast India · Regional Gateway",
    targetKeyword: "Restroom Cubicle Manufacturer in Guwahati",
    h1: "Restroom Cubicle Manufacturer in Guwahati",
    tagline: "Institutional & Commercial Restroom Cubicles in Guwahati",
    description: "Pacific Products & Solutions delivers moisture-resistant solid compact laminate toilet cubicles, urinal partitions, and school lockers for universities, healthcare centers, and transit infrastructure across Guwahati and the Northeast.",
    address: "Serving GS Road, Dispur, Jalukbari, Betkuchi & North Guwahati Commercial Hubs",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114620.00!2d91.73!3d26.14!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5a287f9133ff%3A0x2bbd1332436bde32!2sGuwahati%2C%20Assam!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "IN-AS",
    geoPlacename: "Guwahati, Assam, India",
    logisticsInfo: {
      deliveryTime: "4-6 days palletized freight; site installation technician deployment",
      dispatchMode: "Dedicated road transport via East India corridor with crated protection",
      coverageHubs: ["GS Road Commercial Hub", "Dispur Capital Complex", "Jalukbari Institutional Belt", "Betkuchi Industrial Area"],
    },
    meta: {
      title: "Restroom Cubicle Manufacturer in Guwahati | Toilet Partitions PRC",
      description: "Restroom cubicle manufacturer in Guwahati. 12mm waterproof HPL toilet partitions, urinal modesty screens & lockers for universities & hospitals in Assam. Get quote.",
      keywords: "restroom cubicle manufacturer guwahati, toilet cubicles assam, institutional toilet partitions guwahati, hpl cubicles northeast india",
    },
    stats: COMMON_STATS,
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["Guwahati University & Medical Campuses", "Airport Terminal Support Facilities", "GS Road Commercial Towers", "Government Institutional Complexes"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "How does PRC service projects in Guwahati and Northeast states?", answer: "We pre-fabricate all partitions to exact drawing dimensions at our central facility, pack them in heavy wooden crates to prevent transit damage, and dispatch them directly to site with our installation leads." },
    ],
    heroImage: IMAGES.general.hero,
    galleryImages: IMAGES.general.gallery,
  },

  // ── 15. Bhubaneswar (East Coast Commercial Hub) ──
  bhubaneswar: {
    slug: "bhubaneswar",
    canonicalSlug: "restroom-cubicle-manufacturer-bhubaneswar",
    city: "Bhubaneswar",
    stateName: "Odisha",
    region: "East India · IT & Smart City Hub",
    targetKeyword: "Restroom Cubicle Manufacturer in Bhubaneswar",
    h1: "Restroom Cubicle Manufacturer in Bhubaneswar",
    tagline: "Commercial Toilet Partitions & Restroom Cubicles in Bhubaneswar",
    description: "Pacific Products & Solutions provides durable, anti-bacterial solid compact laminate restroom cubicles, urinal screens, and athletic lockers for IT parks, educational campuses, and hospitals across Bhubaneswar and Cuttack.",
    address: "Serving Chandrasekharpur, Infocity, Patia, Rasulgarh & Cuttack Road",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.51!2d85.82!3d20.30!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "IN-OR",
    geoPlacename: "Bhubaneswar, Odisha, India",
    logisticsInfo: {
      deliveryTime: "3-5 days road transit; certified local installation crews",
      dispatchMode: "Palletized freight from central facility coordinated with Kolkata regional hub",
      coverageHubs: ["Infocity IT Zone", "Chandrasekharpur Commercial Area", "Patia Institutional Corridor", "Rasulgarh Industrial Area"],
    },
    meta: {
      title: "Restroom Cubicle Manufacturer in Bhubaneswar | PRC",
      description: "Restroom cubicle manufacturer in Bhubaneswar. Waterproof HPL toilet partitions, urinal modesty screens & lockers for Infocity & university campuses. Get pricing.",
      keywords: "restroom cubicle manufacturer bhubaneswar, toilet cubicles odisha, infocity toilet partitions, school cubicles patia bhubaneswar",
    },
    stats: COMMON_STATS,
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["Infocity IT Park Complexes", "Patia University Hostels & Campuses", "AIIMS & Healthcare Facility Restrooms", "Smart City Commercial Centers"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "Do you supply toilet partitions for university hostels and tech campuses in Bhubaneswar?", answer: "Yes, our vandal-proof compact laminate cubicles with nylon or heavy stainless steel hardware are popular choices for universities and IT parks across Infocity and Patia." },
    ],
    heroImage: IMAGES.general.hero,
    galleryImages: IMAGES.general.gallery,
  },

  // ── 16. Kochi (Kerala Commercial Hub) ──
  kochi: {
    slug: "kochi",
    canonicalSlug: "restroom-cubicle-manufacturer-kochi",
    city: "Kochi",
    stateName: "Kerala",
    region: "South India · Commercial & Maritime Hub",
    targetKeyword: "Restroom Cubicle Manufacturer in Kochi",
    h1: "Restroom Cubicle Manufacturer in Kochi",
    tagline: "Waterproof Restroom Cubicles & Partitions in Kochi",
    description: "Pacific Products & Solutions manufactures 100% waterproof compact laminate restroom cubicles, stainless steel urinal partitions, and moisture-proof lockers designed for high-humidity coastal environments in Kochi and Ernakulam.",
    address: "Serving Kakkanad Infopark, Marine Drive, MG Road, Kalamassery & Ernakulam",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125744.78!2d76.26!3d9.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582c10b37644a3!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "IN-KL",
    geoPlacename: "Kochi, Kerala, India",
    logisticsInfo: {
      deliveryTime: "4-5 days containerized transit; site installation coordination",
      dispatchMode: "Dedicated road freight to Ernakulam depots with certified installation team",
      coverageHubs: ["Kakkanad Infopark", "Marine Drive Commercial", "MG Road Ernakulam", "Kalamassery Industrial Belt", "Willingdon Island"],
    },
    meta: {
      title: "Restroom Cubicle Manufacturer in Kochi | Toilet Partitions PRC",
      description: "100% waterproof restroom cubicle manufacturer in Kochi. Solid phenolic compact laminate partitions for Kakkanad Infopark & commercial buildings. Get quote.",
      keywords: "restroom cubicle manufacturer kochi, toilet cubicles ernakulam, waterproof toilet partitions kerala, infopark washroom cubicles kakkanad, hpl cubicles kochi",
    },
    stats: COMMON_STATS,
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["Kakkanad Infopark IT Offices", "Marine Drive Commercial Facilities", "Healthcare Hospital Washrooms in Ernakulam", "Hospitality Resorts & Malls"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "How do your cubicles perform in Kerala's heavy monsoons and high humidity?", answer: "Our solid compact laminate has zero porosity, meaning moisture, humidity, and constant water contact will never cause swelling, bubbling, or delamination, backed by our 10-year warranty." },
    ],
    heroImage: IMAGES.general.hero,
    galleryImages: IMAGES.general.gallery,
  },

  // ── 17. UAE & GCC (International Export Hub) ──
  uae: {
    slug: "uae",
    canonicalSlug: "locations/uae",
    city: "Dubai, UAE",
    stateName: "Dubai",
    region: "Middle East & GCC Operations Hub",
    targetKeyword: "Restroom Cubicles & Toilet Partitions Supplier Dubai UAE",
    h1: "Restroom Cubicles & Toilet Partitions Supplier Dubai UAE",
    tagline: "International Restroom Cubicles & Lockers for GCC Projects",
    description: "Pacific Products & Solutions manufactures and exports luxury architectural restroom cubicles, stainless steel partitions, and electronic locker systems across UAE, Saudi Arabia, Qatar, and Oman.",
    address: "Business Bay, Dubai, United Arab Emirates",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Sun–Thu: 8:30 AM – 5:30 PM",
    whatsapp: "919217016908",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115582.49386348633!2d55.19503463765103!3d25.197196999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    geoRegion: "AE-DU",
    geoPlacename: "Dubai, United Arab Emirates",
    logisticsInfo: {
      deliveryTime: "Export sea freight (Jebel Ali) 7-10 days; Air express 2-3 days",
      dispatchMode: "International export crated packaging conforming to ISPM-15 standards",
      coverageHubs: ["Business Bay Dubai", "Downtown Dubai", "DIFC", "Abu Dhabi Commercial", "Sharjah Industrial", "Riyadh KSA"],
    },
    meta: {
      title: "Restroom Cubicles & Toilet Partitions Supplier Dubai UAE | Pacific Products",
      description: "Premium restroom cubicles, phenolic lockers, and HPL washroom partitions for commercial towers, hotels, and malls in Dubai, Abu Dhabi, and GCC countries.",
      keywords: "restroom cubicles dubai, toilet partitions uae, phenolic lockers abu dhabi, commercial washroom cubicles gcc, hpl partitions middle east",
    },
    stats: [
      { label: "Years of Expertise", value: "12+", numericValue: 12, suffix: "+" },
      { label: "Projects Completed", value: "600+", numericValue: 600, suffix: "+" },
      { label: "Prestigious Clients", value: "100+", numericValue: 100, suffix: "+" },
      { label: "Global Reach", value: "GCC", numericValue: 6, suffix: " Countries" },
    ],
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["Dubai Commercial Towers", "Hospitality Resorts & Spas", "International Airport Terminals", "Shopping Malls", "High-End Fitness Centers"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "Do you supply and export restroom cubicles to UAE and GCC?", answer: "Yes, we manufacture and export complete knockdown cubicle and locker packages with international export packaging to Dubai, Abu Dhabi, Riyadh, and Doha." },
      { question: "What international standards do your cubicles comply with?", answer: "Our compact laminate systems meet BS 476 Part 7 Class 1 fire safety, anti-bacterial hygiene certifications, and high-temperature durability." },
      { question: "How are logistics and delivery handled for UAE orders?", answer: "We coordinate sea freight and air express dispatch with full customs clearance and localized installation guidance." },
    ],
    heroImage: IMAGES.uae.hero,
    galleryImages: IMAGES.uae.gallery,
  },
};

// ── Slug lookup helpers ──
export const SLUG_MAP: Record<string, string> = {
  // Legacy short slugs
  delhi: "delhi",
  gurugram: "gurugram",
  gurgaon: "gurugram",
  noida: "noida",
  "greater-noida": "greater-noida",
  ghaziabad: "ghaziabad",
  faridabad: "faridabad",
  mumbai: "mumbai",
  kolkata: "kolkata",
  bengaluru: "bengaluru",
  bangalore: "bengaluru",
  hyderabad: "hyderabad",
  chennai: "chennai",
  pune: "pune",
  ahmedabad: "ahmedabad",
  guwahati: "guwahati",
  bhubaneswar: "bhubaneswar",
  kochi: "kochi",
  uae: "uae",
  // Full target canonical slugs
  "restroom-cubicle-manufacturer-delhi": "delhi",
  "restroom-cubicle-manufacturer-gurugram": "gurugram",
  "restroom-cubicle-manufacturer-noida": "noida",
  "restroom-cubicle-manufacturer-greater-noida": "greater-noida",
  "restroom-cubicle-manufacturer-ghaziabad": "ghaziabad",
  "restroom-cubicle-manufacturer-faridabad": "faridabad",
  "restroom-cubicle-manufacturer-mumbai": "mumbai",
  "restroom-cubicle-manufacturer-kolkata": "kolkata",
  "restroom-cubicle-manufacturer-bengaluru": "bengaluru",
  "restroom-cubicle-manufacturer-hyderabad": "hyderabad",
  "restroom-cubicle-manufacturer-chennai": "chennai",
  "restroom-cubicle-manufacturer-pune": "pune",
  "restroom-cubicle-manufacturer-ahmedabad": "ahmedabad",
  "restroom-cubicle-manufacturer-guwahati": "guwahati",
  "restroom-cubicle-manufacturer-bhubaneswar": "bhubaneswar",
  "restroom-cubicle-manufacturer-kochi": "kochi",
};

export function resolveLocationKey(param: string | undefined): string | null {
  if (!param) return null;
  const normalized = param.toLowerCase().trim().replace(/^\/+|\/+$/g, "");
  return SLUG_MAP[normalized] || null;
}
