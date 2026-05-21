import { useState, useEffect, useRef } from "react";
import { animate } from "motion/react";
import Header from "./components/Header";
import ParallaxHero from "./components/ParallaxHero";
import ImpactCalculator from "./components/ImpactCalculator";
import MichiganMap from "./components/MichiganMap";
import VolunteerHub from "./components/VolunteerHub";
import BlogFeed from "./components/BlogFeed";
import RecipeFinder from "./components/RecipeFinder";
import DonationTerminal from "./components/DonationTerminal";
import Footer from "./components/Footer";

// List of all sections in order
const SECTIONS = [
  { id: "hero", label: "Our Story" },
  { id: "impact-calculator", label: "Our Impact" },
  { id: "food-map", label: "Find Assistance" },
  { id: "volunteer-hub", label: "Volunteer Hub" },
  { id: "blog-feed", label: "Community Blog" },
  { id: "recipe-finder", label: "Pantry Recipes" },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // Donation Unified Terminal State
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [donateAmount, setDonateAmount] = useState(25);
  const [donateFreq, setDonateFreq] = useState<"one-time" | "monthly">("monthly");

  // Theme State
  const [isDark, setIsDark] = useState(false);

  // Animation and Snapping references
  const scrollAnimationRef = useRef<any>(null);
  const scrollTimeoutRef = useRef<any>(null);
  const isNavigatingRef = useRef<boolean>(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Track window resizing for accurate section layout offsets
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update scroll height and find the active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Only update active section automatically if we aren't doing a custom programmatic click-scroll
      if (!isNavigatingRef.current) {
        const h = windowHeight;
        const index = Math.min(
          SECTIONS.length - 1,
          Math.max(0, Math.round(currentScrollY / h))
        );
        setActiveSection(SECTIONS[index].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [windowHeight]);

  // Handle snapping of sections upon resting scroll
  useEffect(() => {
    const handleScrollEndDetection = () => {
      // Avoid snapping if an animation is running or donate popup is open
      if (scrollAnimationRef.current || isNavigatingRef.current || isDonateOpen) return;

      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        const currentY = window.scrollY;
        const targetIndex = Math.round(currentY / windowHeight);

        // Check if we are close to the extreme bottom where the footer resides
        const totalHeight = document.documentElement.scrollHeight - windowHeight;
        if (currentY >= totalHeight - 60) {
          return;
        }

        const targetY = targetIndex * windowHeight;
        if (Math.abs(currentY - targetY) > 8) {
          scrollToOffset(targetY, 0.7);
        }
      }, 180); // Silence interval before snaps
    };

    window.addEventListener("scroll", handleScrollEndDetection, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScrollEndDetection);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [windowHeight, isDonateOpen]);

  // Perform programmatic transitions utilizing custom cubic-bezier ease
  const scrollToOffset = (targetY: number, duration: number = 0.9) => {
    if (scrollAnimationRef.current) {
      scrollAnimationRef.current.stop();
    }

    const startY = window.scrollY;
    scrollAnimationRef.current = animate(startY, targetY, {
      duration,
      ease: [0.25, 1, 0.5, 1], // Fluid cubic-bezier(0.25, 1, 0.5, 1) transition curve
      onUpdate: (latestValue) => {
        window.scrollTo(0, latestValue);
      },
      onComplete: () => {
        scrollAnimationRef.current = null;
        isNavigatingRef.current = false;
        
        // Final fallback sync section ID
        const finalIdx = Math.round(window.scrollY / windowHeight);
        if (finalIdx >= 0 && finalIdx < SECTIONS.length) {
          setActiveSection(SECTIONS[finalIdx].id);
        }
      },
    });
  };

  // Nav actions
  const handleNavClick = (sectionId: string) => {
    const index = SECTIONS.findIndex((s) => s.id === sectionId);
    if (index !== -1) {
      isNavigatingRef.current = true;
      setActiveSection(sectionId);
      scrollToOffset(index * windowHeight, 0.95);
    }
  };

  // Open direct donation popups
  const handleOpenDonate = () => {
    setDonateAmount(30);
    setDonateFreq("monthly");
    setIsDonateOpen(true);
  };

  const handleCalculatorDonateTrigger = (amount: number, frequency: "one-time" | "monthly") => {
    setDonateAmount(amount);
    setDonateFreq(frequency);
    setIsDonateOpen(true);
  };

  // Calculate dynamic scale, translation, and opacity for parallax stacking deck of cards
  const getSectionStyle = (idx: number) => {
    const start = idx * windowHeight;
    const end = (idx + 1) * windowHeight;

    // Normal foreground positioning or incoming transition card
    if (scrollY <= start) {
      return {
        scale: 1,
        opacity: 1,
        translateY: 0,
        zIndex: (idx + 1) * 10,
      };
    }

    // Fully covered card
    if (scrollY >= end) {
      return {
        scale: 0.85,
        opacity: 0.85,
        translateY: -windowHeight * 0.12,
        zIndex: (idx + 1) * 10,
      };
    }

    // Interactive progress being overlapped (0 to 1 ratio)
    const progress = (scrollY - start) / windowHeight;
    const scale = 1 - 0.15 * progress;
    const opacity = 1 - 0.15 * progress;
    const translateY = -windowHeight * 0.12 * progress;

    return {
      scale,
      opacity,
      translateY,
      zIndex: (idx + 1) * 10,
    };
  };

  return (
    <div id="full-app-scroller" className="bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen relative font-sans overflow-x-hidden antialiased selection:bg-brand-orange-500 selection:text-stone-950 transition-colors duration-300">
      
      {/* Sticky polished Backdrop-blur header bar */}
      <Header
        onNavClick={handleNavClick}
        activeSection={activeSection}
        onOpenDonate={handleOpenDonate}
        isDark={isDark}
        toggleTheme={() => setIsDark(!isDark)}
      />

      {/* Main stacked parallax sections card list */}
      <div id="page-deck-container" className="relative w-full">
        {SECTIONS.map((section, idx) => {
          const style = getSectionStyle(idx);
          return (
            <div
              key={section.id}
              id={`scroll-section-${section.id}`}
              style={{
                zIndex: style.zIndex,
                transform: `translateY(${style.translateY}px) scale(${style.scale}) translateZ(0)`,
                opacity: style.opacity,
              }}
              className="sticky top-0 h-screen w-full overflow-hidden origin-center bg-stone-50 dark:bg-stone-950 transition-shadow duration-300 shadow-2xl"
            >
              {/* Internal container with standalone scrolling if container exceeds viewport space */}
              <div className="h-full w-full overflow-y-auto overflow-x-hidden pt-20 custom-scrollbar pb-10 relative">
                
                {/* Visual Accent Ambient Green Glows */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(45,90,39,0.14)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_40%,rgba(45,90,39,0.28)_0%,transparent_60%)] opacity-90" />
                <div className="absolute top-1/4 left-[10%] w-[35rem] h-[35rem] rounded-full blur-[140px] pointer-events-none -z-10 bg-[#2d5a27]/8 dark:bg-[#2d5a27]/15 animate-pulse" style={{ animationDuration: '10s' }} />
                <div className="absolute bottom-1/4 right-[5%] w-[30rem] h-[30rem] rounded-full blur-[160px] pointer-events-none -z-10 bg-[#bcd7c4]/10 dark:bg-[#2d5a27]/10" />
                <div className="absolute inset-0 glow-grid pointer-events-none opacity-40 -z-20" />

                {section.id === "hero" && (
                  <ParallaxHero
                    onDonateClick={handleOpenDonate}
                    onExploreClick={handleNavClick}
                  />
                )}

                {section.id === "impact-calculator" && (
                  <ImpactCalculator onDonateClick={handleCalculatorDonateTrigger} />
                )}

                {section.id === "food-map" && (
                  <MichiganMap />
                )}

                {section.id === "volunteer-hub" && (
                  <VolunteerHub />
                )}

                {section.id === "blog-feed" && (
                  <BlogFeed />
                )}

                {section.id === "recipe-finder" && (
                  <RecipeFinder />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Unified Secure payment slide drawer/modal */}
      <DonationTerminal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        initialAmount={donateAmount}
        initialFrequency={donateFreq}
      />

      {/* Earthy design footer: slides on top of the last section */}
      <div style={{ zIndex: 100 }} className="relative bg-stone-950 shadow-2xl">
        <Footer
          onNavClick={handleNavClick}
          onOpenDonate={handleOpenDonate}
        />
      </div>

    </div>
  );
}
