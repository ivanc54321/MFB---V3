import { useState, useEffect } from "react";
import { Heart, Menu, X, Share2, Award, Sparkles, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
  onOpenDonate: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Header({ onNavClick, activeSection, onOpenDonate, isDark, toggleTheme }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Background scroll check
      setIsScrolled(window.scrollY > 40);

      // Scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Our Impact", id: "impact-calculator" },
    { label: "Find Assistance", id: "food-map" },
    { label: "Volunteer", id: "volunteer-hub" },
    { label: "Community Blog", id: "blog-feed" },
    { label: "Pantry Recipes", id: "recipe-finder" },
  ];

  const handleItemClick = (id: string) => {
    onNavClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || activeSection !== "hero"
          ? "bg-stone-900/95 text-stone-100 shadow-lg backdrop-blur-md py-3"
          : "bg-gradient-to-b from-stone-950/80 to-stone-950/0 text-stone-100 py-5"
      }`}
    >
      {/* Scroll indicator bar */}
      <div
        className="absolute bottom-0 left-0 h-[3px] bg-brand-orange-500 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand Brand */}
          <button
            id="brand-logo-btn"
            onClick={() => handleItemClick("hero")}
            className="flex items-center group text-left cursor-pointer focus:outline-none transition-transform hover:scale-[1.02]"
          >
            <Logo lightText={true} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-brand-orange-500 bg-stone-800/80"
                      : "text-stone-300 hover:text-white hover:bg-stone-800/40"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-brand-orange-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-stone-400 hover:text-brand-orange-500 hover:bg-stone-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              id="header-action-volunteer"
              onClick={() => handleItemClick("volunteer-hub")}
              className="px-4 py-2 border border-brand-green-200 rounded-lg text-sm font-semibold text-brand-green-100 hover:bg-brand-green-800 hover:border-brand-green-600 transition-all cursor-pointer"
            >
              Volunteer
            </button>
            <button
              id="header-action-donate"
              onClick={onOpenDonate}
              className="flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-brand-orange-500 to-amber-500 rounded-lg text-sm font-bold text-stone-900 hover:from-brand-orange-600 hover:to-amber-600 shadow-md transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Heart className="h-4 w-4 fill-stone-900" />
              <span>Donate</span>
            </button>
          </div>

          {/* Mobile Hamburguer */}
          <div className="flex lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-stone-900 border-t border-stone-800"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold ${
                    activeSection === item.id
                      ? "text-brand-orange-500 bg-stone-800"
                      : "text-stone-300 hover:text-white hover:bg-stone-850"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 border-t border-stone-800 flex flex-col space-y-3">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center space-x-2 py-3 border border-stone-700 hover:border-brand-orange-500 text-stone-300 rounded-lg font-semibold text-sm transition-colors cursor-pointer"
                >
                  {isDark ? (
                    <>
                      <Sun className="h-4 w-4 text-brand-orange-500" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
                <button
                  id="mobile-volunteer-btn"
                  onClick={() => handleItemClick("volunteer-hub")}
                  className="w-full text-center py-3 border border-stone-700 hover:border-brand-green-200 text-stone-300 rounded-lg font-semibold text-sm transition-colors cursor-pointer"
                >
                  Volunteer Services
                </button>
                <button
                  id="mobile-donate-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDonate();
                  }}
                  className="w-full text-center py-3 bg-brand-orange-500 hover:bg-brand-orange-600 text-stone-900 font-extrabold rounded-lg text-sm shadow transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Heart className="h-4 w-4 fill-stone-900" />
                  <span>Donate Today</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
