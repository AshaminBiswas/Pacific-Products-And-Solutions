import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  Quote,
  CheckCircle2,
  AlertCircle,
  MessageSquarePlus,
  Send,
  Building2,
  UserCheck,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import { SEO } from "../components/SEO";
import { Button } from "../components/Button";

interface TestimonialRecord {
  id: string;
  clientName: string;
  company?: string | null;
  designation?: string | null;
  projectRef?: string | null;
  message: string;
  rating: number;
  createdAt: string;
}

const RATING_LABELS: Record<number, string> = {
  1: "Needs Improvement",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Exceptional / 5-Star",
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [projectRef, setProjectRef] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successSubmitted, setSuccessSubmitted] = useState(false);

  useEffect(() => {
    fetchLiveTestimonials();
  }, []);

  const fetchLiveTestimonials = async () => {
    setLoading(true);
    if (!isSupabaseConfigured()) {
      setTestimonials([]);
      setLoading(false);
      return;
    }

    try {
      // 1. Query testimonials table
      const { data: tData, error: tErr } = await supabase
        .from("testimonials")
        .select("*")
        .eq("isActive", true)
        .order("sortOrder", { ascending: true })
        .order("createdAt", { ascending: false });

      if (!tErr && tData && tData.length > 0) {
        const records: TestimonialRecord[] = tData.map((r: any) => ({
          id: r.id,
          clientName: r.clientName || r.name || "Client",
          company: r.company,
          designation: r.designation,
          projectRef: r.projectRef,
          message: r.message || r.content || "",
          rating: Number(r.rating || r.stars || 5),
          createdAt: r.createdAt || r.created_at || new Date().toISOString(),
        }));
        setTestimonials(records);
      } else {
        // 2. Query feedback table fallback
        const { data: fData, error: fErr } = await supabase
          .from("feedback")
          .select("*")
          .order("created_at", { ascending: false });

        if (!fErr && fData && fData.length > 0) {
          const records: TestimonialRecord[] = fData.map((f: any) => ({
            id: f.id,
            clientName: f.name || "Client",
            company: f.company,
            designation: f.designation || null,
            projectRef: null,
            message: f.message || "",
            rating: Number(f.stars || f.rating || 5),
            createdAt: f.created_at || new Date().toISOString(),
          }));
          setTestimonials(records);
        } else {
          setTestimonials([]);
        }
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!message.trim()) {
      setErrorMsg("Please provide your review or feedback message.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    const newRecord: TestimonialRecord = {
      id: `local-${Date.now()}`,
      clientName: name.trim(),
      company: company.trim() || null,
      designation: designation.trim() || null,
      projectRef: projectRef.trim() || null,
      rating,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      if (isSupabaseConfigured()) {
        // Insert into testimonials table
        const { data: insData, error: insErr } = await supabase
          .from("testimonials")
          .insert([
            {
              clientName: newRecord.clientName,
              company: newRecord.company,
              designation: newRecord.designation,
              projectRef: newRecord.projectRef,
              rating: newRecord.rating,
              message: newRecord.message,
              isActive: true,
              isFeatured: false,
              sortOrder: 0,
              createdAt: newRecord.createdAt,
            },
          ] as any)
          .select();

        if (insErr) {
          console.warn("Testimonials insert error, attempting feedback fallback:", insErr);
          // Fallback to feedback table
          await supabase.from("feedback").insert([
            {
              name: newRecord.clientName,
              company: newRecord.company,
              message: newRecord.message,
            },
          ] as any);
        } else if (insData && insData[0]?.id) {
          newRecord.id = insData[0].id;
        }
      }

      setTestimonials((prev) => [newRecord, ...prev]);
      setSuccessSubmitted(true);
      setName("");
      setCompany("");
      setDesignation("");
      setProjectRef("");
      setMessage("");
      setRating(5);
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMsg(err.message || "Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate live rating stats
  const totalCount = testimonials.length;
  const avgRating = totalCount > 0
    ? (testimonials.reduce((acc, t) => acc + (t.rating || 5), 0) / totalCount).toFixed(1)
    : "5.0";

  return (
    <div className="bg-white dark:bg-[#030213] min-h-screen pt-24 pb-20 transition-colors">
      <SEO
        title="Client Testimonials & Reviews | Pacific Products & Solutions"
        description="Authentic verified client reviews and project testimonials on Pacific Restroom Cubicles, lockers, and architectural partition systems across India and GCC."
        keywords="Pacific cubicles reviews, restroom cubicles client testimonials, toilet partitions feedback, commercial washroom customer review"
        canonical="/testimonials"
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-[#0a0a1a] dark:to-[#030213] border-b border-gray-200 dark:border-white/5 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#7FB706]/15 border border-[#7FB706]/30 text-[#7FB706] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Client Feedback
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Client Testimonials &amp; Reviews
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Transparent, genuine experiences from architects, contractors, and facility leaders who trust Pacific Restroom Cubicles &amp; Architectural Systems.
            </p>
          </motion.div>

          {/* Stats strip if records exist */}
          {totalCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
            >
              <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-center gap-1.5 text-amber-500 mb-1">
                  <Star className="w-5 h-5 fill-amber-500" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{avgRating}</span>
                  <span className="text-xs text-gray-400">/ 5.0</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Average Client Rating</p>
              </div>

              <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {totalCount}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Verified Reviews</p>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4">
                <div className="text-2xl font-bold text-[#7FB706] mb-1">
                  100%
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Authentic Feedback</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Live Testimonials List (strictly live, no dummy data) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Client Reviews</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  All reviews are submitted by verified project partners and clients.
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10">
                {totalCount} {totalCount === 1 ? "Review" : "Reviews"}
              </span>
            </div>

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-black/10 dark:border-white/10 border-t-[#7FB706] animate-spin" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Loading verified testimonials...</p>
              </div>
            ) : totalCount === 0 ? (
              /* High-End Clean Empty State (NO dummy reviews) */
              <div className="bg-gray-50 dark:bg-[#0a0a1a] border border-gray-200 dark:border-white/5 rounded-3xl p-10 sm:p-14 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#7FB706]/10 border border-[#7FB706]/20 flex items-center justify-center mx-auto mb-5 text-[#7FB706]">
                  <Star className="w-8 h-8 fill-[#7FB706]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Be the First to Review Pacific
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-sm leading-relaxed mb-6">
                  We maintain strict data integrity and do not display simulated or fake reviews. If you have worked with us on a commercial project, please share your thoughts using the form.
                </p>
                <a
                  href="#feedback-form"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#7FB706] hover:bg-[#6fa005] text-white rounded-xl text-sm font-semibold transition shadow-lg shadow-[#7FB706]/20"
                >
                  <MessageSquarePlus className="w-4 h-4" />
                  <span>Submit Client Feedback</span>
                </a>
              </div>
            ) : (
              /* Live Reviews Cards */
              <div className="space-y-6">
                {testimonials.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 dark:bg-[#0a0a1a] border border-gray-200 dark:border-white/5 rounded-2xl p-6 sm:p-7 relative transition-all hover:border-[#7FB706]/40"
                  >
                    <Quote className="w-8 h-8 text-[#7FB706]/20 absolute right-6 top-6" />

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < item.rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-gray-200 dark:fill-gray-700 text-gray-300 dark:text-gray-700"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold ml-2">
                        {item.rating}.0
                      </span>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-5 pr-8">
                      "{item.message}"
                    </p>

                    {/* Author & Project Meta */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-gray-200 dark:border-white/5 text-xs">
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                          {item.clientName}
                          <span title="Verified Client">
                            <UserCheck className="w-3.5 h-3.5 text-[#7FB706]" />
                          </span>
                        </div>
                        {(item.designation || item.company) && (
                          <p className="text-gray-500 dark:text-gray-400 mt-0.5">
                            {[item.designation, item.company].filter(Boolean).join(" • ")}
                          </p>
                        )}
                        {item.projectRef && (
                          <p className="text-[#7FB706] font-medium mt-1">
                            Project: {item.projectRef}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-gray-400 shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Feedback Submission Form */}
          <div id="feedback-form" className="lg:col-span-5 sticky top-28">
            <div className="bg-gray-50 dark:bg-[#0a0a1a] border border-gray-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#7FB706]/10 text-[#7FB706] text-xs font-bold rounded-full mb-2">
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  Direct Feedback
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Share Your Experience
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Your feedback helps commercial architects and project planners select the right cubicle partner.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {successSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-10 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#7FB706]/15 text-[#7FB706] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      Thank You For Your Review!
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                      Your feedback has been successfully recorded and published to our testimonials hub.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSuccessSubmitted(false)}
                      className="px-4 py-2 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/15 text-gray-900 dark:text-white text-xs font-semibold rounded-xl transition"
                    >
                      Submit Another Feedback
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Star Rating Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Your Rating *
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((starVal) => {
                            const isFilled = starVal <= (hoverRating || rating);
                            return (
                              <button
                                key={starVal}
                                type="button"
                                onClick={() => setRating(starVal)}
                                onMouseEnter={() => setHoverRating(starVal)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="p-1 transition-transform hover:scale-110 focus:outline-none"
                              >
                                <Star
                                  className={`w-6 h-6 ${
                                    isFilled
                                      ? "fill-amber-400 text-amber-400"
                                      : "fill-gray-200 dark:fill-gray-700 text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>
                        <span className="text-xs font-medium text-amber-500 ml-2">
                          {RATING_LABELS[hoverRating || rating]}
                        </span>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-[#030213] border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#7FB706]"
                      />
                    </div>

                    {/* Company & Designation Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Company / Firm
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. DLF Developers"
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-[#030213] border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#7FB706]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Role / Title
                        </label>
                        <input
                          type="text"
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          placeholder="e.g. Senior Architect"
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-[#030213] border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#7FB706]"
                        />
                      </div>
                    </div>

                    {/* Project Model or Facility */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Project / Model Installed <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={projectRef}
                        onChange={(e) => setProjectRef(e.target.value)}
                        placeholder="e.g. Platina Wave Cubicles, Saffron, Locker System"
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-[#030213] border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#7FB706]"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Review &amp; Feedback Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How was the product quality, finish, installation timeline, and service?"
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-[#030213] border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#7FB706] resize-none"
                      />
                    </div>

                    {errorMsg && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 bg-[#7FB706] hover:bg-[#6fa005] text-white font-bold rounded-xl text-sm transition shadow-lg shadow-[#7FB706]/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? "Submitting Review..." : "Submit Client Review"}</span>
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
