import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Flame, CheckCircle, MapPin, Users, Heart } from "lucide-react";
import { motion } from "motion/react";

interface ParallaxHeroProps {
  onDonateClick: () => void;
  onExploreClick: (id: string) => void;
}

export default function ParallaxHero({ onDonateClick, onExploreClick }: ParallaxHeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="hero-parallax-container"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950 text-white pt-20"
    >
      {/* Parallax Background Layer */}
      <div
        className="absolute inset-0 z-0 scale-105 transition-transform duration-75"
        style={{
          transform: `translateY(${scrollY * 0.25}px)`,
          backgroundImage: `linear-gradient(to bottom, rgba(12, 12, 12, 0.45), rgba(12, 12, 12, 0.9)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1800')`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      />

      {/* Grid pattern overlay (moving slightly slower for depth multiplier) */}
      <div
        className="absolute inset-0 z-10 glow-grid"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />

      {/* Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-950/40 z-10" />

      {/* Ambient glowing circles */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green-800/20 rounded-full blur-3xl z-10 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-orange-500/10 rounded-full blur-3xl z-10 pointer-events-none"
        style={{ transform: `translateY(${scrollY * -0.05}px)` }}
      />

      {/* Main Container Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Headline Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-brand-green-800/40 border border-brand-green-200/30 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-brand-orange-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-brand-green-100 italic">
                Serving Margate & Thanet
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.2, type: "spring", bounce: 0.4 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-none text-white whitespace-nowrap"
            >
              No Neighbour <br className="lg:hidden" />
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 via-amber-400 to-yellow-500"
              >
                Left Hungry.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-stone-300 max-w-xl leading-relaxed font-light"
            >
              Providing low-priced food, household goods, and support to the local community in Thanet/Margate. Open to everyone (no membership or benefits required).
            </motion.p>

            {/* Interactive Quick Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4"
            >
              <button
                id="hero-cta-donate"
                onClick={onDonateClick}
                className="group flex flex-1 items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-brand-orange-500 to-amber-500 hover:from-brand-orange-600 hover:to-amber-600 text-stone-950 font-extrabold rounded-xl shadow-lg hover:shadow-brand-orange-500/20 transform hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Heart className="h-5 w-5 fill-stone-900 group-hover:scale-110 transition-transform" />
                <span>Donate Cash</span>
              </button>

              <button
                id="hero-cta-volunteer"
                onClick={() => onExploreClick("volunteer-hub")}
                className="flex flex-1 items-center justify-center space-x-2 px-6 py-4 bg-stone-900/90 border border-stone-800 hover:border-brand-green-200 text-stone-200 hover:text-white rounded-xl shadow backdrop-blur transition-all cursor-pointer"
              >
                <span>Volunteer</span>
              </button>
              
              <button
                id="hero-cta-crowdfund"
                onClick={() => window.open('https://www.crowdfunder.co.uk', '_blank')}
                className="flex flex-1 w-full items-center justify-center space-x-2 px-6 py-4 bg-brand-green-800/80 border border-brand-green-600 hover:bg-brand-green-700 text-white rounded-xl shadow backdrop-blur transition-all cursor-pointer"
              >
                <Sparkles className="h-5 w-5" />
                <span>Crowdfunder: Shop Expansion</span>
              </button>
            </motion.div>

            {/* Micro details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.8 }}
              className="flex items-center space-x-6 text-sm text-stone-400 font-mono italic"
            >
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-brand-green-200" />
                <span>CIC Registered</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-brand-green-200" />
                <span>94% Direct Aid Efficiency</span>
              </div>
            </motion.div>

          </div>

          {/* Dynamic Counter Showcase Widgets */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative space-y-6">
              
              {/* Stat card 1 */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="bg-stone-900/90 border border-stone-800/80 p-6 rounded-2xl hover:border-brand-green-600/60 shadow-xl backdrop-blur-lg transform hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-brand-green-800/30 text-brand-orange-500 rounded-xl group-hover:scale-105 transition-transform">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-3xl font-display font-black text-white block">180M+</span>
                    <span className="text-xs text-stone-450 uppercase tracking-widest font-mono">Pounds of Food Rescued</span>
                  </div>
                </div>
              </motion.div>

              {/* Stat card 2 */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.65 }}
                className="bg-stone-900/90 border border-stone-800/80 p-6 rounded-2xl hover:border-brand-green-600/60 shadow-xl backdrop-blur-lg transform hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-brand-green-800/30 text-brand-green-100 rounded-xl group-hover:scale-105 transition-transform">
                    <Flame className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-3xl font-display font-black text-white block">150M+</span>
                    <span className="text-xs text-stone-450 uppercase tracking-widest font-mono font-medium">Meals Delivered Annually</span>
                  </div>
                </div>
              </motion.div>

              {/* Quick assistance link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="bg-gradient-to-r from-brand-green-900/60 to-stone-900 border border-brand-green-800/30 p-5 rounded-2xl shadow-lg backdrop-blur-md flex items-center justify-between group cursor-pointer"
                onClick={() => onExploreClick("food-map")}
              >
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-brand-orange-500" />
                  <div>
                    <span className="text-sm font-semibold text-white block">Need Help?</span>
                    <span className="text-xs text-stone-450">Learn More</span>
                  </div>
                </div>
                <div className="bg-stone-800 p-2 rounded-lg group-hover:bg-brand-orange-500 group-hover:text-stone-950 transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>

      {/* Slope bottom divider for visual rhythm */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-900 to-transparent z-10" />
    </div>
  );
}
