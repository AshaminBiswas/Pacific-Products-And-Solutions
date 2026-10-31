import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Palette,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProductColor } from "../../lib/database.types";

interface ColorsAndFinishesSectionProps {
  colors: ProductColor[];
  title?: string;
  badge?: string;
  subtitle?: string;
  className?: string;
}

export function ColorsAndFinishesSection({
  colors,
  title = "Colors & Finishes",
  badge = "Options",
  subtitle = "Explore our solid core phenolic laminate decors, textures, and architectural color options.",
  className = "",
}: ColorsAndFinishesSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Guard against empty array
  if (!colors || colors.length === 0) return null;

  const currentColor = colors[activeIdx] || colors[0];

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev === 0 ? colors.length - 1 : prev - 1));
  }, [colors.length]);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev === colors.length - 1 ? 0 : prev + 1));
  }, [colors.length]);

  // Keyboard navigation for lightbox / carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape" && isLightboxOpen) setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, isLightboxOpen]);

  return (
    <section
      className={`py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#030213] transition-colors relative ${className}`}
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 750px" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="text-xs font-bold tracking-widest text-[#7FB706] uppercase inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7FB706]/10 border border-[#7FB706]/20">
            <Palette className="w-3.5 h-3.5" />
            {badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mt-3 mb-3 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* ── Redesigned 4:3 Image Showcase Box (Half Size) ── */}
        <div className="max-w-md mx-auto mb-6 relative">
          {/* Ambient Lighting Glow Behind the 4:3 Box */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-[#7FB706]/20 via-[#B5F823]/10 to-transparent rounded-3xl blur-xl -z-10 pointer-events-none opacity-60 dark:opacity-30" />

          {/* Master 4:3 Image Container */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] ring-1 ring-black/10 dark:ring-white/10 shadow-xl bg-gray-100 dark:bg-[#070617] group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full h-full relative"
              >
                {currentColor?.image_url && currentColor.image_url.trim() ? (
                  <ImageWithFallback
                    src={currentColor.image_url}
                    alt={currentColor?.name || `Color option ${activeIdx + 1}`}
                    className="w-full h-full object-cover select-none cursor-pointer"
                    renderWidth={800}
                    quality={85}
                    onClick={() => setIsLightboxOpen(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#12122b] to-[#070617] text-white p-6 select-none">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#7FB706] mb-3 shadow-inner">
                      <Palette className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B5F823] font-bold">
                      Architectural Decor
                    </span>
                    <span className="text-base font-extrabold mt-1 text-white text-center">
                      {currentColor?.name || 'Standard Decor'}
                    </span>
                    <span className="text-[11px] text-gray-400 mt-0.5">
                      Solid Compact Phenolic Laminate
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Top Floating Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
              <div className="pointer-events-auto px-2.5 py-1 rounded-full bg-black/60 dark:bg-black/80 backdrop-blur-md border border-white/15 text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B5F823] shadow-sm shadow-[#B5F823]/50 animate-pulse" />
                <span>Finish #{activeIdx + 1}</span>
              </div>

              <div className="pointer-events-auto flex items-center gap-1.5">
                {colors.length > 1 && (
                  <span className="px-2.5 py-1 rounded-full bg-black/60 dark:bg-black/80 backdrop-blur-md border border-white/15 text-white text-[11px] font-bold font-mono tracking-wider shadow-md">
                    {String(activeIdx + 1).padStart(2, "0")} / {String(colors.length).padStart(2, "0")}
                  </span>
                )}

                {currentColor?.image_url && currentColor.image_url.trim() && (
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/15 text-white/90 hover:text-white transition-all shadow-md active:scale-95"
                    title="View Full Resolution Texture"
                    aria-label="Enlarge image"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Previous / Next Arrow Controls (Visible when multiple colors exist) */}
            {colors.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 shadow-lg z-10"
                  aria-label="Previous finish"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 shadow-lg z-10"
                  aria-label="Next finish"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Bottom Glassmorphic Showcase Banner */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-3.5 sm:p-4 text-white flex items-end justify-between gap-2 z-10 pointer-events-none">
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B5F823] block">
                  Architectural Decor
                </span>
                <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white drop-shadow-md truncate">
                  {currentColor?.name}
                </h3>
                <p className="text-[10px] text-gray-300 font-medium truncate">
                  Solid Compact Phenolic Resin
                </p>
              </div>

              <div className="pointer-events-auto shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7FB706] hover:bg-[#6fa005] text-black font-bold text-xs transition-all shadow-md active:scale-95"
                >
                  <span>Sample</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Pagination Indicator Dots (When multiple finishes exist) ── */}
        {colors.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mb-8">
            {colors.map((color, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIdx(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIdx
                    ? "w-6 h-1.5 bg-[#7FB706]"
                    : "w-1.5 h-1.5 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40"
                }`}
                title={color.name || `Finish option ${index + 1}`}
                aria-label={`View ${color.name || `finish ${index + 1}`}`}
              />
            ))}
          </div>
        )}

        {/* ── Architectural Customization Assistance Strip ── */}
        <div className="mt-6 max-w-xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-white/[0.03] dark:via-white/[0.02] dark:to-transparent border border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7FB706]/15 text-[#7FB706] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Looking for Custom Woodgrains, Stone Textures or RAL Codes?
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                We supply physical sample swatch boxes and provide tailored color matching for architects and consultants.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="text-xs font-bold text-[#7FB706] hover:text-[#6fa005] hover:underline whitespace-nowrap flex items-center gap-1 shrink-0"
          >
            <span>Request Swatch Box</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── High-Resolution Lightbox Modal ── */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0a0a1a] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 text-white">
              <div className="flex items-center gap-2.5">
                <Palette className="w-4 h-4 text-[#B5F823]" />
                <span className="font-bold text-sm sm:text-base">{currentColor?.name}</span>
                <span className="text-xs text-gray-400 font-mono">
                  ({activeIdx + 1} of {colors.length})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal 4:3 Image Preview */}
            <div className="relative aspect-[4/3] bg-black">
              {currentColor?.image_url && currentColor.image_url.trim() ? (
                <ImageWithFallback
                  src={currentColor.image_url}
                  alt={currentColor?.name}
                  className="w-full h-full object-contain"
                  renderWidth={1600}
                  quality={90}
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#12122b] to-[#070617] text-white p-8">
                  <Palette className="w-12 h-12 text-[#7FB706] mb-3" />
                  <span className="text-xl font-bold">{currentColor?.name}</span>
                  <span className="text-xs text-gray-400 mt-1">High-Resolution texture preview available on request</span>
                </div>
              )}

              {colors.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 border-t border-white/10">
              <span>Pacific Products &amp; Solutions • High-Resolution Architectural Texture</span>
              <Link
                to="/contact"
                className="px-4 py-2 rounded-xl bg-[#7FB706] hover:bg-[#6fa005] text-black font-bold transition-all text-xs"
              >
                Request Physical Swatch for this Decor
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
