import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { useBlogs } from "../../lib/hooks";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowRight, Calendar, User, Clock, Search, Sparkles, Tag, ChevronRight } from "lucide-react";
import { SEO } from "../components/SEO";
import { unpackBlogContent } from "../../lib/blogMeta";

export default function BlogPage() {
  const { data: rawBlogs, loading } = useBlogs();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Hydrate blogs with unpacked metadata & filter out future-scheduled posts
  const processedBlogs = useMemo(() => {
    const now = new Date();
    return rawBlogs
      .map((b) => {
        const { html, meta } = unpackBlogContent(b.content);
        return {
          ...b,
          content: html,
          readingTime: meta.readingTime || "4 min read",
          isFeatured: meta.isFeatured ?? false,
          scheduledAt: meta.scheduledAt ?? null,
          status: meta.status || (b.published ? "PUBLISHED" : "DRAFT"),
        };
      })
      .filter((b) => {
        // Hide if scheduled for the future
        if (b.scheduledAt && new Date(b.scheduledAt) > now) {
          return false;
        }
        return b.published;
      });
  }, [rawBlogs]);

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    processedBlogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return Array.from(set);
  }, [processedBlogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return processedBlogs.filter((b) => {
      const matchesCategory =
        selectedCategory === "ALL" || b.category?.toLowerCase() === selectedCategory.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        (b.excerpt && b.excerpt.toLowerCase().includes(q)) ||
        (b.author && b.author.toLowerCase().includes(q)) ||
        (b.tags && b.tags.some((t) => t.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [processedBlogs, selectedCategory, searchQuery]);

  // Featured hero post
  const featuredBlog = useMemo(() => {
    return processedBlogs.find((b) => b.isFeatured) || processedBlogs[0] || null;
  }, [processedBlogs]);

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-[#030213] transition-colors">
      <SEO
        title="Commercial Washroom Insights & Architectural Guides | Pacific Products & Solutions"
        description="Comprehensive technical guides, architectural BOQ planning, and product insights on restroom cubicles, urinal partitions, and HPL lockers across India."
        canonical="/blog"
      />

      {/* ── HERO BANNER ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#E9FDBF] via-white to-white dark:from-[#0a0a1a] dark:via-[#030213] dark:to-[#030213] border-b border-black/5 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7FB706]/15 text-[#4a7002] dark:text-[#B5F823] text-xs font-bold uppercase tracking-wider mb-4 border border-[#7FB706]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Architectural &amp; Engineering Journal</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#030213] dark:text-white tracking-tight mb-4">
              Restroom Infrastructure <span className="text-[#7FB706]">Knowledge Hub</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Expert articles, material specifications (IS:2046 / EN 438), hardware standards, and turnkey commercial washroom case studies.
            </p>

            {/* Search Input */}
            <div className="relative max-w-xl mx-auto">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by keyword, topic, or specification..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#0a0a1a] border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white shadow-lg focus:outline-none focus:border-[#7FB706] transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY PILLS FILTER ──────────────────────────────── */}
      <section className="py-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => setSelectedCategory("ALL")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === "ALL"
                  ? "bg-[#7FB706] text-white shadow-sm"
                  : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/5"
              }`}
            >
              All Topics ({processedBlogs.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-[#7FB706] text-white shadow-sm"
                    : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED POST BANNER (If not actively searching) ───── */}
      {!searchQuery && selectedCategory === "ALL" && featuredBlog && (
        <section className="py-12 bg-white dark:bg-[#030213]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-xs font-bold uppercase tracking-wider text-[#7FB706] mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Story</span>
            </div>
            <Link
              to={`/blog/${featuredBlog.slug}`}
              className="group block rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0c0c1c] dark:to-[#080816] border border-gray-200 dark:border-white/10 hover:border-[#7FB706]/40 shadow-xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {featuredBlog.cover_image_url && (
                  <div className="lg:col-span-7 h-64 sm:h-80 lg:h-96 overflow-hidden">
                    <ImageWithFallback
                      src={featuredBlog.cover_image_url}
                      alt={featuredBlog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className={`p-6 sm:p-10 ${featuredBlog.cover_image_url ? "lg:col-span-5" : "lg:col-span-12"}`}>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#7FB706]/15 text-[#4a7002] dark:text-[#B5F823] mb-3">
                    {featuredBlog.category || "Featured"}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#030213] dark:text-white group-hover:text-[#7FB706] transition-colors leading-tight mb-4">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-3 mb-6 leading-relaxed">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {featuredBlog.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredBlog.readingTime}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 font-bold text-[#7FB706] group-hover:translate-x-1 transition-transform">
                      Read Article <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── ARTICLES GRID ───────────────────────────────────────── */}
      <section className="py-12 pb-24 bg-white dark:bg-[#030213]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#030213] dark:text-white">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedCategory === "ALL"
                ? "All Articles"
                : `${selectedCategory} Articles`}
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {loading ? (
            <div className="text-center py-24">
              <div className="w-8 h-8 border-4 border-[#7FB706] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">Loading articles...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-24 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/10 p-8 max-w-xl mx-auto">
              <p className="text-gray-600 dark:text-gray-300 text-base font-semibold mb-2">
                No matching articles found
              </p>
              <p className="text-gray-500 text-xs mb-6">
                Try adjusting your search terms or selecting a different category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("ALL");
                }}
                className="px-4 py-2 rounded-xl bg-[#7FB706] hover:bg-[#6fa005] text-white text-xs font-bold transition"
              >
                Reset Search &amp; Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="group flex flex-col h-full bg-white dark:bg-[#0a0a1a] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden hover:shadow-2xl hover:border-[#7FB706]/40 transition-all duration-300"
                  >
                    {/* Cover Thumbnail */}
                    {blog.cover_image_url ? (
                      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-black/40">
                        <ImageWithFallback
                          src={blog.cover_image_url}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10">
                            {blog.category || "Guide"}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-28 bg-gradient-to-r from-[#7FB706]/20 to-[#B5F823]/10 flex items-center px-6">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md text-[#7FB706] border border-[#7FB706]/30">
                          {blog.category || "Article"}
                        </span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-[#030213] dark:text-white group-hover:text-[#7FB706] transition-colors line-clamp-2 leading-snug mb-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-3 leading-relaxed mb-4">
                          {blog.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#7FB706]" />
                            {blog.readingTime}
                          </span>
                          {blog.published_at && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(blog.published_at).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#7FB706] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
