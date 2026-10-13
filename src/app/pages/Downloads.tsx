import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import type { Catalog } from "../../lib/database.types";
import { FileText, Image as ImageIcon, Download, ExternalLink, X, Search } from "lucide-react";
import { SEO } from "../components/SEO";
import { PageHero } from "../components/PageHero";
import { usePageBanner } from "../../lib/hooks";

const DOCUMENT_TYPES = [
  "Brochure",
  "Catalog",
  "Drawing",
  "Installation Manual",
  "Warranty",
  "Technical Specification",
  "Test Report",
  "Other"
];

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export default function Downloads() {
  const { data: bannerData } = usePageBanner("downloads");
  const { data: altBanner } = usePageBanner("download");
  const banner = bannerData || altBanner;

  const [downloads, setDownloads] = useState<Catalog[]>([]);
  const [productMap, setProductMap] = useState<Record<string, { title: string; slug: string; category: string }>>({});
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("Brochure");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewItem, setPreviewItem] = useState<Catalog | null>(null);

  useEffect(() => {
    const fetchDownloads = async () => {
      setLoading(true);
      try {
        const [{ data: catalogData }, { data: productData }] = await Promise.all([
          supabase
            .from("catalogs")
            .select("*")
            .eq("published", true)
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false }),
          supabase
            .from("products")
            .select("id, title, slug, category"),
        ]);

        if (catalogData) {
          setDownloads(catalogData as Catalog[]);
        }

        if (productData) {
          const map: Record<string, { title: string; slug: string; category: string }> = {};
          productData.forEach((p: any) => {
            map[p.id] = { title: p.title, slug: p.slug, category: p.category };
          });
          setProductMap(map);
        }
      } catch (err) {
        console.error("Error loading downloads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  // Filter and group by category
  const filteredDownloads = downloads.filter((d) => {
    const matchesType = (d.document_type || "Catalog") === selectedType;
    if (!matchesType) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const linkedProduct = d.product_id ? productMap[d.product_id] : null;
    return (
      d.title.toLowerCase().includes(q) ||
      (d.description || "").toLowerCase().includes(q) ||
      (d.category || "").toLowerCase().includes(q) ||
      (linkedProduct && linkedProduct.title.toLowerCase().includes(q))
    );
  });
  
  const groupedByCategory = filteredDownloads.reduce((acc, item) => {
    const cat = item.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, Catalog[]>);

  // Available document types that actually have files
  const availableTypes = DOCUMENT_TYPES.filter(
    (type) => downloads.some((d) => (d.document_type || "Catalog") === type)
  );

  // Fallback if the selected type has no items but others do
  useEffect(() => {
    if (!loading && availableTypes.length > 0 && !availableTypes.includes(selectedType)) {
      setSelectedType(availableTypes[0]);
    }
  }, [loading, availableTypes, selectedType]);


  return (
    <div className="bg-white dark:bg-[#030213] min-h-screen pt-20 pb-20 transition-colors">
      <SEO
        title="Technical Downloads & Product Catalogs"
        description="Download product brochures, CAD drawings, technical specifications, and installation manuals for our restroom cubicle, urinal partition, and locker systems."
        keywords="restroom cubicle brochure download, urinal partition technical specification, locker system catalog PDF, cubicle installation manual, Pacific Products downloads"
        canonical="/download"
      />

      {/* Hero Banner */}
      <PageHero
        title={banner?.title || "Technical Downloads & Product Catalogs"}
        accentWord="Catalogs"
        subtitle={banner?.subtitle || "Access our complete library of product brochures, technical specifications, CAD drawings, and installation manuals."}
        breadcrumb="Downloads"
        backgroundImage={banner?.image_url}
        backgroundAlt={banner?.alt_text || "Pacific Restroom Cubicles Technical Downloads & Catalogs"}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-28 bg-gray-50 dark:bg-[#0a0a1a] border border-gray-200 dark:border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Document Types</h3>
              <nav className="space-y-2">
                {DOCUMENT_TYPES.map((type) => {
                  const count = downloads.filter((d) => (d.document_type || "Catalog") === type).length;
                  if (count === 0 && !loading) return null;
                  
                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                        selectedType === type
                          ? "bg-[#7FB706] text-white font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <span>{type}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        selectedType === type ? "bg-white/20 text-white" : "bg-gray-200 dark:bg-white/5 text-gray-600 dark:text-gray-500"
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search Input */}
            <div className="relative mb-8">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product model, brochure name, or specification..."
                className="w-full pl-12 pr-10 py-3 bg-gray-50 dark:bg-[#0a0a1a] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#7FB706] text-sm transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-black/10 dark:border-white/10 border-t-[#7FB706] animate-spin" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Loading documents...</p>
              </div>
            ) : filteredDownloads.length === 0 ? (
              <div className="bg-gray-50 dark:bg-[#0a0a1a] border border-gray-200 dark:border-white/5 rounded-2xl p-16 text-center">
                <Search className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No documents found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchQuery ? `No documents match "${searchQuery}".` : `There are currently no ${selectedType.toLowerCase()}s available for download.`}
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(groupedByCategory).map(([category, items]) => (
                  <div key={category}>
                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{category}</h2>
                      <div className="h-px bg-gray-200 dark:bg-white/10 flex-1"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {items.map((item) => (
                        <div 
                          key={item.id}
                          onClick={() => setPreviewItem(item)}
                          className="group bg-gray-50 dark:bg-[#0a0a1a] border border-gray-200 dark:border-white/5 rounded-2xl p-5 hover:border-[#7FB706] dark:hover:border-[#7FB706]/30 hover:bg-gray-100 dark:hover:bg-white/[0.02] transition-all cursor-pointer flex flex-col"
                        >
                          <div className="w-full h-40 mb-4 rounded-xl overflow-hidden bg-gray-200 dark:bg-black/50 border border-gray-200 dark:border-white/5 relative">
                            {item.thumbnail_url ? (
                               <img 
                                 src={item.thumbnail_url} 
                                 alt={item.title} 
                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                               />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors">
                                {item.file_type === "pdf" ? (
                                  <FileText className="w-12 h-12 mb-2" />
                                ) : (
                                  <ImageIcon className="w-12 h-12 mb-2" />
                                )}
                                <span className="text-xs uppercase tracking-wider">{item.file_type}</span>
                              </div>
                            )}
                            
                            {/* Overlay hover action */}
                            <div className="absolute inset-0 bg-black/40 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="px-4 py-2 bg-[#7FB706] text-white rounded-full text-sm font-medium flex items-center gap-2">
                                <Search className="w-4 h-4" /> View Document
                              </span>
                            </div>
                          </div>

                          <div className="flex-1">
                            {item.product_id && productMap[item.product_id] && (
                              <div className="mb-2">
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#7FB706]/15 text-[#7FB706] border border-[#7FB706]/30">
                                  Model: {productMap[item.product_id].title}
                                </span>
                              </div>
                            )}
                            <h3 className="text-gray-900 dark:text-white font-medium mb-1 line-clamp-2 group-hover:text-[#7FB706] transition-colors">{item.title}</h3>
                            {item.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-500 line-clamp-2 mb-3">{item.description}</p>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-white/5">
                            <span className="text-xs text-gray-500">{formatFileSize(item.file_size)}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(item.file_url, '_blank');
                              }}
                              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 hover:bg-gray-200 dark:hover:bg-white/5 rounded-lg transition-colors"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200">
          <div className="w-full max-w-6xl bg-white dark:bg-[#0a0a1a] border border-gray-200 dark:border-white/10 rounded-2xl h-full max-h-[90vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-gray-200 dark:border-white/10 gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${previewItem.file_type === 'pdf' ? 'bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400' : 'bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400'}`}>
                  {previewItem.file_type === "pdf" ? (
                    <FileText className="w-6 h-6" />
                  ) : (
                    <ImageIcon className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{previewItem.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {previewItem.category} • {formatFileSize(previewItem.file_size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={previewItem.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-white/5 rounded-xl text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />Open in New Tab
                </a>
                <a
                  href={previewItem.file_url}
                  download
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#7FB706] rounded-xl text-white hover:bg-[#6fa005] transition-colors text-sm font-medium"
                >
                  <Download className="w-4 h-4" />Download
                </a>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors ml-2"
                  aria-label="Close"
>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Preview Body */}
            <div className="flex-1 overflow-hidden p-4 md:p-6 bg-gray-50 dark:bg-[#05050f]">
              {previewItem.file_type === "pdf" ? (
                <iframe
                  src={`${previewItem.file_url}#toolbar=0`}
                  className="w-full h-full rounded-xl border border-gray-200 dark:border-white/10 bg-white"
                  title={previewItem.title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center overflow-auto">
                  <img
                    src={previewItem.file_url}
                    alt={previewItem.title}
                    className="max-w-full max-h-full rounded-xl object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
