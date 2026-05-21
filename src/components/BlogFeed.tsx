import React, { useState, useMemo } from "react";
import { Search, Heart, Bookmark, MessageSquare, Plus, CheckCircle, Sparkles, User, Calendar, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "../data";
import { BlogPost } from "../types";

export default function BlogFeed() {
  const [blogs, setBlogs] = useState<BlogPost[]>(BLOG_POSTS);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedList, setBookmarkedList] = useState<Record<string, boolean>>({});

  // Form drafting fields
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftCategory, setDraftCategory] = useState<"News" | "Impact Story" | "Recipe" | "Event">("News");
  const [draftExcerpt, setDraftExcerpt] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [draftAuthor, setDraftAuthor] = useState("");
  const [draftSuccess, setDraftSuccess] = useState(false);

  // Filter and search logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchCategory = activeCategory === "All" || blog.category === activeCategory;
      const matchText =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchText;
    });
  }, [blogs, activeCategory, searchQuery]);

  // Social interactions
  const handleLikeBlog = (id: string) => {
    setBlogs((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          return { ...b, likes: b.likes + 1 };
        }
        return b;
      })
    );
  };

  const handleBookmark = (id: string) => {
    setBookmarkedList((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Submit dynamic draft news/updates
  const handleCreateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle.trim() || !draftExcerpt.trim() || !draftContent.trim()) return;

    const newBlog: BlogPost = {
      id: Math.random().toString(),
      title: draftTitle,
      excerpt: draftExcerpt,
      content: draftContent,
      category: draftCategory,
      readTime: "3 min read",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      author: draftAuthor.trim() || "Community Member",
      image: "https://images.unsplash.com/photo-1484863137850-59afcfe05386?auto=format&fit=crop&q=80&w=800", // Stock default
      likes: 1,
      commentsCount: 0,
    };

    setBlogs((prev) => [newBlog, ...prev]);
    setDraftSuccess(true);
    setTimeout(() => {
      setDraftSuccess(false);
      setShowDraftModal(false);
      // Reset forms
      setDraftTitle("");
      setDraftExcerpt("");
      setDraftContent("");
      setDraftAuthor("");
    }, 1800);
  };

  const categories = ["All", "News", "Impact Story", "Recipe"];

  return (
    <section id="blog-feed" className="py-24 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 border-t border-stone-100 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title narrative */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl space-y-4 text-left">
            <div className="inline-flex items-center space-x-1.5 bg-brand-orange-50 text-brand-orange-600 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              <BookOpen className="h-3 w-3" />
              <span>The Harvest Press & News Blog</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-stone-950 dark:text-stone-50 tracking-tight">
              Community News & Updates
            </h2>
            <p className="text-stone-600 dark:text-stone-400 font-light text-sm sm:text-base leading-relaxed">
              Read real-life testimonials, community shop stories, volunteers, and low-cost recipes straight from the heart of our Margate network.
            </p>
          </div>

          {/* Action CTAs: Submit News story */}
          <button
            id="draft-news-btn"
            onClick={() => setShowDraftModal(true)}
            className="flex items-center space-x-2 px-5 py-3.5 bg-stone-900 hover:bg-stone-850 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer select-none"
          >
            <span>Draft Community Update</span>
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Dynamic Nav filters and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-stone-150 pb-6 mb-10 gap-4">
          
          <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-white dark:bg-stone-950 text-stone-950 dark:text-stone-50 shadow-sm"
                    : "text-stone-500 dark:text-stone-400 hover:text-stone-850 dark:text-stone-200"
                }`}
              >
                {cat === "All" ? "All Stories" : `${cat}s`}
              </button>
            ))}
          </div>

          {/* Local blog search input */}
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search news & stews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 focus:outline-none focus:border-brand-green-800 rounded-xl text-xs text-stone-800 dark:text-stone-200 font-medium"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-400 hover:text-stone-800 dark:text-stone-200 focus:outline-none"
              >
                clear
              </button>
            )}
          </div>

        </div>

        {/* Blogs cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => {
            const isBookmarked = !!bookmarkedList[blog.id];
            return (
              <article
                key={blog.id}
                id={`blog-card-${blog.id}`}
                className="bg-white dark:bg-stone-950 rounded-3xl border border-stone-150/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  
                  {/* Photo thumbnail placeholder */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-stone-950/85 text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-blur">
                      {blog.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4 text-left">
                    <div className="flex items-center text-[10px] font-mono text-stone-400 justify-between">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {blog.date}
                      </span>
                      <span>{blog.readTime}</span>
                    </div>

                    <h4 className="font-display font-black text-lg tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-brand-orange-500 transition-colors leading-snug">
                      {blog.title}
                    </h4>

                    <p className="text-stone-550 font-light text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                </div>

                {/* Footer and Interactive logs */}
                <div className="px-6 pb-6 pt-4 border-t border-stone-50 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-mono">
                  <span className="flex items-center text-[10px] truncate max-w-40 font-semibold italic">
                    <User className="h-3 w-3 mr-1 text-brand-green-800 shrink-0" />
                    By {blog.author.split(",")[0]}
                  </span>

                  <div className="flex items-center space-x-3.5">
                    
                    <button
                      id={`like-blog-btn-${blog.id}`}
                      onClick={() => handleLikeBlog(blog.id)}
                      className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer"
                      aria-label="Like post"
                    >
                      <Heart className="h-4 w-4 fill-none hover:fill-red-500 text-stone-400 hover:text-red-500 transition-all" />
                      <span>{blog.likes}</span>
                    </button>

                    <button
                      onClick={() => handleBookmark(blog.id)}
                      className={`flex items-center space-x-1 transition-colors cursor-pointer ${
                        isBookmarked ? "text-brand-orange-500" : "hover:text-brand-orange-500"
                      }`}
                      aria-label="Bookmark post"
                    >
                      <Bookmark className={`h-4 w-4 text-stone-400 ${isBookmarked ? "fill-brand-orange-500 text-brand-orange-500" : ""}`} />
                    </button>

                  </div>
                </div>

              </article>
            );
          })}

          {filteredBlogs.length === 0 && (
            <div className="col-span-full py-16 text-center text-stone-450 italic text-sm">
              No news or recipe entries fit your criteria. Try switching categories or clearing search.
            </div>
          )}
        </div>

      </div>

      {/* COMPOSER MODAL FOR COMMUNITY WRITERS */}
      {showDraftModal && (
        <div id="news-composer-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-white dark:bg-stone-950 rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-8 space-y-6 animate-scale-up border border-stone-100 dark:border-stone-800 relative">
            
            {/* Success state overlay */}
            {draftSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="bg-brand-orange-50 p-4 rounded-full w-fit mx-auto text-brand-orange-600 animate-pulse">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h4 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100">Story Published to Local Feed!</h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">Dispatching to community streams...</p>
              </div>
            ) : (
              
              /* Draft Input controls */
              <form onSubmit={handleCreateDraft} className="space-y-4">
                
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-brand-orange-500" />
                    <span className="font-display font-extrabold text-stone-900 dark:text-stone-100 text-lg">
                      Draft Local News Story
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDraftModal(false)}
                    className="text-stone-400 hover:text-stone-700 dark:text-stone-300 text-sm font-bold focus:outline-none cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3 text-xs">
                  
                  <div className="space-y-1">
                    <label className="text-stone-450 font-bold block">Update Catchline / Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Garden Harvest sets new record in Oakland County"
                      value={draftTitle}
                      onChange={(e) => setDraftTitle(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-2.5 rounded-lg focus:outline-none focus:border-brand-green-800 text-stone-900 dark:text-stone-100 placeholder-stone-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    
                    <div className="space-y-1">
                      <label className="text-stone-450 font-bold block">Author / Submitter</label>
                      <input
                        type="text"
                        placeholder="e.g. Martha G., Volunteer Coord"
                        value={draftAuthor}
                        onChange={(e) => setDraftAuthor(e.target.value)}
                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-2.5 rounded-lg focus:outline-none focus:border-brand-green-800 text-stone-900 dark:text-stone-100 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-stone-450 font-bold block">Content Category</label>
                      <select
                        value={draftCategory}
                        onChange={(e) => setDraftCategory(e.target.value as any)}
                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-2.5 rounded-lg focus:outline-none focus:border-brand-green-800 text-stone-900 dark:text-stone-100 text-xs"
                      >
                        <option value="News">News / Press</option>
                        <option value="Impact Story">Impact Story / Reflection</option>
                        <option value="Recipe">Recipe / Culinary</option>
                        <option value="Event">Network Event</option>
                      </select>
                    </div>

                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-450 font-bold block">Summary Snippet (Excerpt)</label>
                    <input
                      type="text"
                      required
                      placeholder="A short one-sentence hook summarizing the update."
                      value={draftExcerpt}
                      onChange={(e) => setDraftExcerpt(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-2.5 rounded-lg focus:outline-none focus:border-brand-green-800 text-stone-900 dark:text-stone-100 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-450 font-bold block font-sans">Full Story Narrative text</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share details here. What happened, who benefited, and how can neighbors support this initiative?"
                      value={draftContent}
                      onChange={(e) => setDraftContent(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-2.5 rounded-lg focus:outline-none focus:border-brand-green-800 text-stone-900 dark:text-stone-100 text-xs"
                    />
                  </div>

                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-orange-500 hover:bg-brand-orange-600 text-stone-950 dark:text-stone-50 font-bold text-xs rounded-xl shadow transition-all cursor-pointer uppercase tracking-wider text-center"
                >
                  Publish to Community Feed
                </button>

              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
