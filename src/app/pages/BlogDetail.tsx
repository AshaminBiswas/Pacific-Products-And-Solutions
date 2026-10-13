import React, { useMemo } from "react";
import { motion } from "motion/react";
import { useParams, useNavigate, Link } from "react-router";
import DOMPurify from "dompurify";
import { useBlog } from "../../lib/hooks";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/Button";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Clock,
  Share2,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  MessageCircle,
  FileCheck,
} from "lucide-react";
import { SEO } from "../components/SEO";
import { blogPostSchema } from "../../lib/seo-data";
import { unpackBlogContent } from "../../lib/blogMeta";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: rawBlog, loading } = useBlog(slug);

  // Unpack content and extended metadata
  const { blog, meta, sanitizedContent } = useMemo(() => {
    if (!rawBlog) return { blog: null, meta: {}, sanitizedContent: "" };

    const { html, meta } = unpackBlogContent(rawBlog.content);
    const clean = DOMPurify.sanitize(html, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "target", "rel"],
    });

    return {
      blog: rawBlog,
      meta,
      sanitizedContent: clean,
    };
  }, [rawBlog]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white dark:bg-[#030213]">
        <div className="w-8 h-8 rounded-full border-2 border-black/10 dark:border-white/10 border-t-[#7FB706] animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white dark:bg-[#030213]">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-3xl font-extrabold text-[#030213] dark:text-white mb-3">
            Article Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
            The article you are looking for may have been updated, moved, or is currently unpublished.
          </p>
          <Button onClick={() => navigate("/blog")}>Back to Knowledge Hub</Button>
        </div>
      </div>
    );
  }

  // SEO details
  const pageTitle = meta.seoTitle || `${blog.title} | Pacific Products & Solutions`;
  const pageDescription =
    meta.metaDescription || blog.excerpt?.slice(0, 160) || "Pacific Washroom Solutions Guide";
  const canonicalPath = meta.canonicalUrl || `/blog/${blog.slug}`;
  const readingTime = meta.readingTime || "5 min read";

  // Share handler
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-[#030213] transition-colors">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalPath}
        ogType="article"
        ogImage={meta.ogImage || blog.cover_image_url}
        jsonLd={blogPostSchema(blog)}
      />

      {/* ── HEADER / HERO ───────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#E9FDBF]/40 via-white to-white dark:from-[#0a0a1a] dark:via-[#030213] dark:to-[#030213] border-b border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Back button */}
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#7FB706] dark:hover:text-[#B5F823] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Category & Reading Time */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#7FB706]/15 text-[#4a7002] dark:text-[#B5F823] border border-[#7FB706]/20">
                {blog.category || "General"}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3.5 h-3.5 text-[#7FB706]" />
                {readingTime}
              </span>
              {blog.published_at && (
                <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(blog.published_at).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#030213] dark:text-white tracking-tight leading-tight mb-4">
              {blog.title}
            </h1>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-normal">
                {blog.excerpt}
              </p>
            )}

            {/* Author Byline & Share */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7FB706] to-[#030213] border border-[#7FB706]/40 flex items-center justify-center font-bold text-white text-sm shadow-sm">
                  {blog.author ? blog.author.charAt(0).toUpperCase() : "P"}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#030213] dark:text-white">
                    {blog.author || "Pacific Technical Team"}
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400">
                    Commercial Washroom Specialist
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-xs font-semibold text-gray-700 dark:text-gray-300 transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── COVER IMAGE ─────────────────────────────────────────── */}
      {blog.cover_image_url && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 bg-black/40">
              <ImageWithFallback
                src={blog.cover_image_url}
                alt={blog.alt_text || blog.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
              {blog.alt_text && (
                <p className="py-2.5 px-4 text-center text-xs text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-black/30 border-t border-gray-100 dark:border-white/5">
                  {blog.alt_text}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* ── ARTICLE BODY CONTENT ────────────────────────────────── */}
      <section className="py-12 bg-white dark:bg-[#030213]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <article
              className="prose prose-lg max-w-none 
                prose-headings:font-bold prose-headings:text-[#030213] dark:prose-headings:text-white prose-headings:tracking-tight
                prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-100 dark:prose-h2:border-white/10
                prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-base prose-p:mb-5
                prose-a:text-[#7FB706] prose-a:font-semibold prose-a:underline hover:prose-a:text-[#6fa005]
                prose-strong:text-[#030213] dark:prose-strong:text-white prose-strong:font-bold
                prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:my-5 prose-ul:text-gray-700 dark:prose-ul:text-gray-300
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2 prose-ol:my-5 prose-ol:text-gray-700 dark:prose-ol:text-gray-300
                prose-blockquote:border-l-4 prose-blockquote:border-[#7FB706] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-800 dark:prose-blockquote:text-gray-200 prose-blockquote:my-6
                prose-code:text-[#4a7002] dark:prose-code:text-[#B5F823] prose-code:bg-gray-100 dark:prose-code:bg-white/5 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-img:rounded-2xl prose-img:shadow-lg prose-img:border prose-img:border-gray-200 dark:prose-img:border-white/10 prose-img:my-8
                [&_table]:w-full [&_table]:border-collapse [&_table]:my-8 [&_table]:text-sm
                [&_th]:bg-gray-100 dark:[&_th]:bg-white/10 [&_th]:border [&_th]:border-gray-200 dark:[&_th]:border-white/15 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-bold [&_th]:text-[#030213] dark:[&_th]:text-white
                [&_td]:border [&_td]:border-gray-200 dark:[&_td]:border-white/10 [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-gray-700 dark:[&_td]:text-gray-300
                [&_.pro-tip]:bg-emerald-50 dark:[&_.pro-tip]:bg-emerald-950/40 [&_.pro-tip]:border-l-4 [&_.pro-tip]:border-emerald-500 [&_.pro-tip]:p-5 [&_.pro-tip]:rounded-r-2xl [&_.pro-tip]:my-8
                [&_.warning-notice]:bg-amber-50 dark:[&_.warning-notice]:bg-amber-950/40 [&_.warning-notice]:border-l-4 [&_.warning-notice]:border-amber-500 [&_.warning-notice]:p-5 [&_.warning-notice]:rounded-r-2xl [&_.warning-notice]:my-8
                [&_.cta-quote]:bg-[#7FB706]/10 [&_.cta-quote]:border-l-4 [&_.cta-quote]:border-[#7FB706] [&_.cta-quote]:p-6 [&_.cta-quote]:rounded-r-2xl [&_.cta-quote]:my-10
                [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-2xl [&_iframe]:shadow-xl [&_iframe]:my-8"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <Tag className="w-4 h-4 text-[#7FB706]" />
                  <span>Related Keywords</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 bg-[#E9FDBF] text-[#4a7002] dark:bg-[#7FB706]/20 dark:text-[#B5F823] rounded-xl text-xs font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── B2B COMMERCIAL PROJECT INQUIRY CALLOUT ─────────── */}
            <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#0c0c1e] to-[#040310] text-white border border-[#7FB706]/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7FB706]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#7FB706] uppercase tracking-wider mb-2">
                  <FileCheck className="w-4 h-4" />
                  <span>Pan-India Commercial Project Execution</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black mb-3">
                  Planning Restroom Cubicles or Lockers for Your Project?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xl">
                  Connect directly with Pacific Products &amp; Solutions engineers. We offer in-house CNC
                  manufacturing, 12mm/18mm Solid Compact Laminate, Grade 304/316 SS hardware, and pan-India
                  installation crews.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/919999999999?text=Hi%20Pacific%20Team%2C%20I%20read%20your%20article%20and%20would%20like%20to%20request%20a%20commercial%20quote."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#7FB706] hover:bg-[#6fa005] text-white text-xs font-bold shadow-lg transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Request BOQ on WhatsApp
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition"
                  >
                    <PhoneCall className="w-4 h-4" />
                    Contact Technical Team
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
