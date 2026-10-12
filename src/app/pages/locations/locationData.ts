// ── Location Data for Delhi, Bangalore, and Kolkata ──

export interface LocationFAQ {
  question: string;
  answer: string;
}

export interface LocationData {
  slug: string;
  city: string;
  region: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  whatsapp: string;
  mapSrc: string;
  meta: { title: string; description: string; keywords?: string };
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

// ── High-quality Unsplash images for active locations ──
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
  kolkata: {
    hero: "https://images.unsplash.com/photo-1558431382-27e303142255?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472556-e636c2acda9e?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    ],
  },
  uae: {
    hero: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80",
    ],
  },
};

const COMMON_SERVICES = [
  { title: "Restroom Cubicles", desc: "Premium HPL, compact laminate, and stainless steel cubicle systems" },
  { title: "Shower Cubicles", desc: "Waterproof, durable shower partitions for commercial and hospitality use" },
  { title: "Locker Solutions", desc: "Customizable locker systems for gyms, offices, and public facilities" },
  { title: "Urinal Partitions", desc: "Hygienic, moisture-resistant privacy screen partitions for commercial restrooms" },
  { title: "Custom Hardware", desc: "Precision-engineered hardware accessories for partitioning systems" },
  { title: "Commercial Interiors", desc: "End-to-end interior contracting for large-scale commercial projects" },
];

const COMMON_INDUSTRIES = [
  { name: "Airports", icon: "Plane" },
  { name: "Schools & Colleges", icon: "GraduationCap" },
  { name: "Hospitals", icon: "Heart" },
  { name: "Corporate Offices", icon: "Building2" },
  { name: "Stadiums", icon: "Trophy" },
  { name: "Gyms & Sports", icon: "Dumbbell" },
  { name: "Railways & Metro", icon: "Train" },
  { name: "Shopping Malls", icon: "ShoppingBag" },
  { name: "Public Infrastructure", icon: "Landmark" },
];

const COMMON_WHY_CHOOSE = [
  { title: "Premium Materials", desc: "ISO-certified manufacturing with HPL, compact laminate & stainless steel" },
  { title: "Proven Durability", desc: "Products tested for 10+ years of heavy commercial use" },
  { title: "Custom Manufacturing", desc: "Bespoke designs tailored to your architectural vision" },
  { title: "Fast Installation", desc: "Professional teams ensuring minimal disruption to operations" },
  { title: "B2B Project Expertise", desc: "Dedicated project managers for large-scale commercial rollouts" },
  { title: "Nationwide Execution", desc: "Pan-India delivery and installation with local support" },
];

export const locations: Record<string, LocationData> = {
  delhi: {
    slug: "delhi",
    city: "Delhi NCR",
    region: "North India · Head Office",
    tagline: "Premium Infrastructure Solutions for India's Capital Region",
    description: "Our head office and primary manufacturing facility in Delhi drives all pan-India operations. Serving the National Capital Region with world-class restroom cubicles, urinal partitions, and commercial interior solutions.",
    address: "Okhla Industrial Estate, New Delhi - 110020, Delhi, India",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919818592113",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112130.34005085694!2d76.99403816684724!3d28.514782017772656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    meta: {
      title: "Restroom Cubicles & Interior Solutions in Delhi NCR | Pacific Products",
      description: "Leading manufacturer & installer of restroom cubicles, shower partitions, urinal screens & commercial interiors in Delhi NCR. Get a free quote today.",
      keywords: "restroom cubicles delhi, shower partitions ncr, urinal partitions delhi ncr, commercial interiors gurgaon, toilet cubicles noida, HPL panels delhi, locker solutions ncr, restroom cubicles, toilet cubicles, custom hardware",
    },
    stats: [
      { label: "Years of Expertise", value: "12+", numericValue: 12, suffix: "+" },
      { label: "Projects Completed", value: "600+", numericValue: 600, suffix: "+" },
      { label: "Prestigious Clients", value: "100+", numericValue: 100, suffix: "+" },
      { label: "Offices Across India", value: "3", numericValue: 3, suffix: "" },
    ],
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["Corporate Office Towers", "Metro Stations", "Shopping Malls", "5-Star Hotels", "Government Infrastructure", "Educational Institutions"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "Do you provide restroom cubicle installation in Delhi NCR?", answer: "Yes, we offer end-to-end design, manufacturing, and installation of restroom cubicles across Delhi, Gurugram, Noida, and the entire NCR region." },
      { question: "What materials do you use for cubicle partitions in Delhi?", answer: "We use premium HPL (High-Pressure Laminate), compact laminate, stainless steel 304/316, and nylon hardware — all suitable for Delhi's climate." },
      { question: "Can you handle large commercial projects in Delhi NCR?", answer: "Absolutely. We have completed projects including corporate towers, metro stations, 5-star hotels, and large-scale institutional buildings across NCR." },
      { question: "What is the typical project timeline in Delhi NCR?", answer: "Standard projects take 2-4 weeks from measurement to installation. Large-scale projects are handled on custom timelines with dedicated project managers." },
      { question: "Do you offer after-sales service in Delhi?", answer: "Yes, we provide comprehensive after-sales support including maintenance, repairs, and replacement parts with quick response times across NCR." },
    ],
    heroImage: IMAGES.delhi.hero,
    galleryImages: IMAGES.delhi.gallery,
  },
  kolkata: {
    slug: "kolkata",
    city: "Kolkata",
    region: "East India",
    tagline: "Infrastructure Solutions for the City of Joy",
    description: "Serving East India from our Kolkata operations, we provide world-class restroom cubicles, urinal partitions, and commercial interior solutions. Blending modern infrastructure with Kolkata's rich architectural heritage.",
    address: "Salt Lake Sector V, Kolkata - 700091, West Bengal",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    whatsapp: "919818592113",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.33!2d88.264!3d22.535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
    meta: {
      title: "Restroom Cubicles & Commercial Interiors in Kolkata | Pacific Products",
      description: "Kolkata's preferred partner for restroom cubicles, shower partitions, urinal partitions & locker solutions for commercial projects across West Bengal. Free site visit.",
      keywords: "restroom cubicles kolkata, toilet partitions west bengal, shower cubicles east india, urinal partitions kolkata, commercial interiors bengal, HPL panels kolkata, restroom cubicles, toilet cubicles, custom hardware",
    },
    stats: [
      { label: "Years of Expertise", value: "12+", numericValue: 12, suffix: "+" },
      { label: "Projects Completed", value: "600+", numericValue: 600, suffix: "+" },
      { label: "Prestigious Clients", value: "100+", numericValue: 100, suffix: "+" },
      { label: "Offices Across India", value: "3", numericValue: 3, suffix: "" },
    ],
    services: COMMON_SERVICES,
    industries: COMMON_INDUSTRIES,
    projects: ["Metro Stations", "IT Parks & Tech Campuses", "Shopping Malls", "Corporate Office Towers", "Healthcare Facilities", "Government & Public Infrastructure"],
    whyChoose: COMMON_WHY_CHOOSE,
    faqs: [
      { question: "Do you provide cubicle solutions across West Bengal?", answer: "Yes, we serve all major areas in West Bengal including Kolkata, Howrah, Siliguri, Asansol, and Durgapur." },
      { question: "Can you handle installations in old heritage buildings?", answer: "Absolutely. We have experience installing modern cubicle systems while respecting the structural integrity of heritage properties." },
      { question: "What materials are best suited for Kolkata's humid climate?", answer: "Our compact laminate and HPL cubicles are highly moisture-resistant, making them ideal for Kolkata's high humidity levels." },
      { question: "Do you offer site visits in Kolkata?", answer: "Yes, our team provides free site visits, measurements, and consultations across Kolkata and neighboring areas." },
      { question: "Are your installations suitable for large IT parks?", answer: "Yes, we specialize in high-traffic installations for IT parks and corporate spaces, including those in Salt Lake Sector V and Rajarhat." },
    ],
    heroImage: IMAGES.kolkata.hero,
    galleryImages: IMAGES.kolkata.gallery,
  },
  uae: {
    slug: "uae",
    city: "Dubai, UAE",
    region: "Middle East & GCC Operations Hub",
    tagline: "International Restroom Cubicles & Lockers for GCC Projects",
    description: "Pacific Products & Solutions delivers luxury architectural restroom cubicles, stainless steel partitions, and electronic locker systems across UAE, Saudi Arabia, Qatar, and Oman.",
    address: "Business Bay, Dubai, United Arab Emirates",
    phone: "+91 98185 92113",
    email: "info@pacificproduct.in",
    hours: "Sun–Thu: 8:30 AM – 5:30 PM",
    whatsapp: "919818592113",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115582.49386348633!2d55.19503463765103!3d25.197196999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1713550212891!5m2!1sen!2sin",
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
