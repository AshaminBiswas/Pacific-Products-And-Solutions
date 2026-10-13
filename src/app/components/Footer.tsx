import { useState } from "react";
import { Link } from "react-router";
import { Facebook, Youtube, Linkedin, Instagram, Mail, Phone, MapPin, Clock } from "lucide-react";
import { useProducts, useSolutions } from "../../lib/hooks";
import { OFFICE_PHONE, OFFICE_PHONE_TEL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "../../lib/constants";

const logo = "/logo.webp";

export function Footer() {
  const [showUpdate, setShowUpdate] = useState(false);
  const { data: products } = useProducts();
  const { data: solutions } = useSolutions();

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

  const locationLinks = [
    { name: "Delhi NCR", path: "/locations/delhi" },
    { name: "Kolkata", path: "/locations/kolkata" },
    { name: "Dubai UAE", path: "/locations/uae" },
  ];

  return (
    <footer className="bg-[#030213] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src={logo}
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
            <p className="text-gray-400 mb-6">
              Leading B2B interior contracting provider in India, specializing in premium restroom cubicles, toilet partitions, urinal screens, locker solutions, and custom hardware for commercial spaces.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100063648025932" target="_blank" rel="noopener noreferrer" className="hover:text-[#7FB706] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@pacificcubicles" target="_blank" rel="noopener noreferrer" className="hover:text-[#7FB706] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/pacific-products-and-solutions" target="_blank" rel="noopener noreferrer" className="hover:text-[#7FB706] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/pacificcubicles" target="_blank" rel="noopener noreferrer" className="hover:text-[#7FB706] transition-colors">
                <Instagram className="w-5 h-5" />
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

          {/* Contact & Locations */}
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
                <MapPin className="w-4 h-4 mt-1 text-[#7FB706]" />
                <span className="text-gray-400 text-sm">Okhla Industrial Estate, New Delhi - 110020<br/>Delhi, India</span>
              </li>
            </ul>
            <h5 className="font-semibold mb-2 text-sm">Our Locations</h5>
            <ul className="space-y-1">
              {locationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#7FB706] transition-colors text-xs"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2026 Pacific Products & Solutions. All rights reserved.
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
