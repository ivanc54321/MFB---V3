import React, { useState } from "react";
import { Heart, Send, CheckCircle, ShieldCheck, Mail, Map, GraduationCap } from "lucide-react";
import Logo from "./Logo";

interface FooterProps {
  onNavClick: (sectId: string) => void;
  onOpenDonate: () => void;
}

export default function Footer({ onNavClick, onOpenDonate }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail || !newsEmail.includes("@")) return;
    setSuccess(true);
    setNewsEmail("");
    setTimeout(() => {
      setSuccess(false);
    }, 2500);
  };

  return (
    <footer id="global-news-footer" className="bg-stone-950 text-stone-300 border-t border-stone-850">
      
      {/* Top section: High impact newsletters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-stone-900 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        
        {/* Newsletter promo */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-brand-orange-500 uppercase block font-bold">STAY UPDATED</span>
          <h3 className="text-2xl font-display font-bold text-white tracking-tight">
            Join the Mi Food Bank list
          </h3>
          <p className="text-sm font-light text-stone-400 max-w-sm leading-relaxed">
            Sowing news of local food donations, new shop items, and community support in Margate. No spam.
          </p>
        </div>

        {/* Subscription input box */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {success ? (
            <div id="newsletter-success-note" className="flex items-center space-x-2 text-brand-orange-400 text-sm font-semibold animate-scale-up">
              <CheckCircle className="h-5 w-5 text-emerald-500 animate-pulse" />
              <span>Wonderful! You are now subscribed to the Mi Food Bank Newsletter network list.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="relative w-full max-w-md">
              <input
                type="email"
                required
                placeholder="Enter email to protect families..."
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 focus:border-brand-orange-500 text-stone-100 placeholder-stone-600 pl-11 pr-32 py-3 rounded-xl focus:outline-none text-xs sm:text-sm font-medium"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-600" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-brand-orange-500 hover:bg-brand-orange-600 text-stone-950 font-extrabold rounded-lg text-xs transition-all cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}

          <div className="flex items-center space-x-2.5 text-[10px] text-stone-600 mt-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Unsubscribe with an interactive single click at any time.</span>
          </div>
        </div>

      </div>

      {/* Main Grid links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
        
        {/* Branch brand list */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Logo lightText={true} />
          </div>

          <p className="text-xs text-stone-500 font-light leading-relaxed">
            Providing low-priced food, household goods, and support to the local community in Thanet/Margate. Mi Food Bank.
          </p>

          <div className="text-[10px] font-mono text-stone-605">
            HQ ID: Registered Community Interest Company (CIC)
          </div>
        </div>

        {/* Action targets */}
        <div className="space-y-3 font-sans">
          <h4 className="text-xs font-mono text-stone-400 uppercase font-bold tracking-widest">Active Channels</h4>
          <ul className="text-xs font-normal text-stone-450 space-y-2">
            <li>
              <button onClick={() => onNavClick("impact-calculator")} className="hover:text-brand-orange-500 transition-colors cursor-pointer text-left focus:outline-none">
                Interactive Calculator
              </button>
            </li>
            <li>
              <button onClick={() => onNavClick("food-map")} className="hover:text-brand-orange-500 transition-colors cursor-pointer text-left focus:outline-none">
                Assistance Finder Map
              </button>
            </li>
            <li>
              <button onClick={() => onNavClick("volunteer-hub")} className="hover:text-brand-orange-500 transition-colors cursor-pointer text-left focus:outline-none">
                Become a Volunteer
              </button>
            </li>
            <li>
              <button onClick={() => onNavClick("blog-feed")} className="hover:text-brand-orange-500 transition-colors cursor-pointer text-left focus:outline-none">
                The Harvest Press News
              </button>
            </li>
            <li>
              <button onClick={() => onNavClick("recipe-finder")} className="hover:text-brand-orange-500 transition-colors cursor-pointer text-left focus:outline-none">
                Pantry Staples Finder
              </button>
            </li>
          </ul>
        </div>

        {/* Regional Offices */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono text-stone-400 uppercase font-bold tracking-widest">Our Shops</h4>
          <ul className="text-xs text-stone-450 space-y-2">
            <li>Shop 1: 9 High Street, Margate, CT9 1DL (Mon-Sat, 10:00-15:00)</li>
            <li>Shop 2: 92-94 Ramsgate Road, Margate, CT9 5RY (Mon-Fri, 10:00-15:00 & Sat 10:00-14:30)</li>
          </ul>
        </div>

        {/* Certifications and credentials detail summary */}
        <div className="space-y-4 font-mono text-[11px] text-stone-500">
          <h4 className="text-xs font-mono text-stone-400 uppercase font-bold tracking-widest font-sans">Credentials</h4>
          
          <div className="space-y-1 bg-stone-900/40 p-3 rounded-xl border border-stone-850 font-sans">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block font-mono">FINANCIAL TRANSPARENCY</span>
            <p className="text-[10px] leading-relaxed">
              Donations securely support local community projects under UK CIC regulations.
            </p>
          </div>

          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Guarded Security protocols active</span>
          </div>

        </div>

      </div>

      {/* Extreme bottom copyright and logo */}
      <div className="bg-stone-950 py-6 border-t border-stone-900 font-mono text-[10px] text-stone-605">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <div className="text-center sm:text-left">
            <span>© {new Date().getFullYear()} Mi Food Bank. All Rights Reserved. Designed for modern impact.</span>
          </div>

          <div className="flex space-x-4">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Charter</span>
            <span className="hover:text-white transition-colors cursor-pointer">Tax Documents</span>
            <span className="hover:text-white transition-colors cursor-pointer text-brand-orange-500">Donate • Volunteer</span>
          </div>

        </div>
      </div>

    </footer>
  );
}
