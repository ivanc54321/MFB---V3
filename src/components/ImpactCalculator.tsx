import { useState } from "react";
import { Heart, Landmark, Plus, ThumbsUp, PoundSterling, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface ImpactCalculatorProps {
  onDonateClick: (amount: number, frequency: "one-time" | "monthly") => void;
}

export default function ImpactCalculator({ onDonateClick }: ImpactCalculatorProps) {
  const [sliderVal, setSliderVal] = useState(25);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("monthly");

  // Determine dynamic buying power details
  const getBuyingPower = (value: number) => {
    let multiplier = frequency === "monthly" ? 12 : 1;
    let totalValue = value * multiplier;

    let meals = Math.round(totalValue * 10); // £1 = approx 10 meals
    let milkCartons = Math.round(totalValue / 2.50); // £2.50 = Carton of wholesome local milk
    let familiesFedWeeks = Math.round(totalValue / 25); // £25 feeds a family for a week
    let produceCases = Math.round(totalValue / 15); // £15 rescued farm produce case

    if (value <= 15) {
      return {
        title: "Snack Pack & Apple Sponsor",
        impact: `Provides ${meals} supplementary meals and coordinates 2 cases of orchard-fresh apples.`,
        desc: "Essential nutritional support that supplements weekend child backpacks during dry months.",
        iconSummary: "🎒 📦",
        progressMeals: 35,
        progressAgri: 15,
        progressSustain: 5,
        level: "Seedling"
      };
    } else if (value <= 40) {
      return {
        title: "Weekly Family Food Lifeline",
        impact: `Feeds ${familiesFedWeeks > 0 ? familiesFedWeeks : 1} local Margate family for a full week, including ${milkCartons} cartons of fresh milk.`,
        desc: "Covers a balanced box of vegetables, grains, canned lean meats, and whole-wheat breads.",
        iconSummary: "🥛 🥦 📦 🍎",
        progressMeals: 60,
        progressAgri: 45,
        progressSustain: 20,
        level: "Sprout"
      };
    } else if (value <= 85) {
      return {
        title: "Agri-Surplus Sourcing Case",
        impact: `Funds the rescue & transport of ${produceCases} crates of surplus farm vegetables (around ${meals} meals provided).`,
        desc: "Solves logistics costs by dispatching drivers straight to crop farms in Grand Rapids and Bay City.",
        iconSummary: "🚜 🥕 🥦 🍎 🥔 🥛",
        progressMeals: 80,
        progressAgri: 75,
        progressSustain: 40,
        level: "Harvester"
      };
    } else if (value <= 150) {
      return {
        title: "Mobile Food Truck Co-Sponsor",
        impact: `Rescues ${meals} meals, distributing ${milkCartons} containers of cold dairy to central families.`,
        desc: "Fuels refrigerator heavy-trucks driving directly into school districts experiencing severe food desert constraints.",
        iconSummary: "🚛 🥛 🍉 🥦 📦 🥕 🥚",
        progressMeals: 92,
        progressAgri: 90,
        progressSustain: 65,
        level: "Champion"
      };
    } else {
      return {
        title: "County Cold Vault Anchor",
        impact: `Funds ${meals} heavy-impact meals, keeping over ${produceCases} cases of delicate greens strictly refrigerated.`,
        desc: "Underwrites cooling utility grids and commercial walk-in vaults to protect perishable state agriculture.",
        iconSummary: "❄️ ❄️ 🥦 🥛 🍇 📦 🥕 🥚 🧀 🍎",
        progressMeals: 100,
        progressAgri: 98,
        progressSustain: 95,
        level: "Guardian of the Harvest"
      };
    }
  };

  const currentImpact = getBuyingPower(sliderVal);
  const totalImpactEst = sliderVal * (frequency === "monthly" ? 12 : 1) * 10;

  const quickPledges = [15, 25, 50, 100, 250];

  return (
    <section
      id="impact-calculator"
      className="py-24 bg-stone-50 dark:bg-stone-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-stone-900/5 glow-grid pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Title details */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-brand-orange-50 text-brand-orange-600 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            <span>Interactive Impact Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-stone-900 dark:text-stone-100 tracking-tight">
            See the Power of Your Pound
          </h2>
          <p className="text-stone-600 dark:text-stone-400 font-light text-base sm:text-lg">
            Unlike standard grocery prices, our scale and rural partnerships mean **£1 provides nearly 10 nutritional meals**. Slide the bar below to calculate your real local footprint!
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Slider Control Block */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-950 p-6 sm:p-8 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-xl space-y-8">
            
            {/* Frequency Toggle */}
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-5">
              <div>
                <span className="font-display font-bold text-lg text-stone-900 dark:text-stone-100 block">Choose Frequency</span>
                <span className="text-xs text-stone-450 font-normal">Monthly gifts provide stable sustainable year-round planning.</span>
              </div>
              <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                <button
                  id="freq-btn-once"
                  onClick={() => setFrequency("one-time")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    frequency === "one-time"
                      ? "bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 shadow-sm"
                      : "text-stone-500 dark:text-stone-400 hover:text-stone-850 dark:text-stone-200"
                  }`}
                >
                  One-time
                </button>
                <button
                  id="freq-btn-monthly"
                  onClick={() => setFrequency("monthly")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
                    frequency === "monthly"
                      ? "bg-brand-orange-500 text-stone-950 dark:text-stone-50 shadow-sm"
                      : "text-stone-500 dark:text-stone-400 hover:text-stone-850 dark:text-stone-200"
                  }`}
                >
                  <Heart className="h-3.5 w-3.5 fill-stone-950" />
                  <span>Monthly Gift</span>
                </button>
              </div>
            </div>

            {/* Slider Widget */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-sm font-mono text-stone-500 dark:text-stone-400 uppercase tracking-widest font-bold">Contribution Amount</span>
                <span className="text-4xl font-display font-black text-brand-green-800 flex items-center tracking-tight">
                  <PoundSterling className="h-7 w-7 text-brand-orange-500 stroke-[3px]" />
                  <span>{sliderVal}</span>
                  <span className="text-sm font-semibold text-stone-400 ml-1">/{frequency === "monthly" ? "mo" : "once"}</span>
                </span>
              </div>

              {/* Slider markup */}
              <div className="relative pt-2">
                <input
                  id="impact-slider"
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={sliderVal}
                  onChange={(e) => setSliderVal(Number(e.target.value))}
                  className="w-full h-3 bg-stone-150 rounded-lg appearance-none cursor-pointer accent-brand-orange-500 hover:accent-brand-orange-600 focus:outline-none"
                />
                
                {/* Visual guidelines */}
                <div className="flex justify-between text-[11px] font-mono text-stone-400 pt-3">
                  <span>£5</span>
                  <span>£100</span>
                  <span>£200</span>
                  <span>£300</span>
                  <span>£400</span>
                  <span>£500+</span>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-stone-400 block font-mono">POPULAR QUICK VALUES</span>
              <div className="flex flex-wrap gap-2">
                {quickPledges.map((amt) => (
                  <button
                    key={amt}
                    id={`preset-btn-${amt}`}
                    onClick={() => setSliderVal(amt)}
                    className={`px-4 py-2 border rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      sliderVal === amt
                        ? "bg-brand-green-800 text-white border-brand-green-850 shadow-md"
                        : "bg-stone-50 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:border-brand-green-200 hover:bg-stone-100 dark:bg-stone-800"
                    }`}
                  >
                    £{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated instant transaction note */}
            <div className="p-4 bg-brand-orange-500 rounded-2xl border border-brand-orange-600 flex items-start space-x-3 text-stone-900 text-sm font-medium shadow-md">
              <Landmark className="h-6 w-6 text-stone-900 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Your protection matters</strong>: Outfitted with 256-bit bank SSL safeguards. 94% of coordinates go directly to sorting and transportation. Tax-deductible receipt issued immediately.
              </span>
            </div>

          </div>

          {/* Buying Power Outcome Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-green-800 to-brand-green-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between h-full relative">
            <div className="absolute top-4 right-4 bg-white dark:bg-stone-950/10 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase">
              {currentImpact.level}
            </div>

            {/* Content copy */}
            <div className="space-y-6">
              
              <div className="space-y-1">
                <span className="text-[11px] font-mono tracking-widest text-brand-orange-500 uppercase block font-bold">ANNUAL SUSTAINED FOOTPRINT</span>
                <h3 className="text-2xl font-display font-extrabold tracking-tight">
                  {currentImpact.title}
                </h3>
              </div>

              {/* Dynamic Icons array */}
              <div className="bg-white dark:bg-stone-950/5 border border-white/10 p-5 rounded-2xl text-center">
                <div className="text-3xl tracking-wide select-none animate-shiver">
                  {currentImpact.iconSummary}
                </div>
                <span className="text-[10px] font-mono uppercase text-brand-green-150 mt-2 block tracking-wider font-light">
                  Direct Nutritional Deliverable Items
                </span>
              </div>

              <div className="space-y-4">
                
                {/* Specific metric statements */}
                <div className="space-y-1 bg-brand-green-750/40 p-4 rounded-xl border border-white/5">
                  <span className="text-xs font-mono text-brand-orange-500 uppercase font-bold">Dynamic Impact</span>
                  <p className="text-sm text-stone-200 font-light">
                    {currentImpact.impact}
                  </p>
                </div>

                <p className="text-xs text-brand-green-100 italic leading-relaxed">
                  &quot;{currentImpact.desc}&quot;
                </p>

              </div>

              {/* Progress Gauges */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-mono uppercase text-brand-green-150 tracking-wider font-bold block">Resource Allocation Shares</span>
                
                {/* Bar 1 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="italic">Meals Generated ({totalImpactEst} total)</span>
                    <span>{currentImpact.progressMeals}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-brand-green-750 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-brand-orange-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${currentImpact.progressMeals}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Bar 2 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="italic">Agricultural Rescue Support</span>
                    <span>{currentImpact.progressAgri}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-brand-green-750 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-yellow-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${currentImpact.progressAgri}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

              </div>

            </div>

            {/* CTA action trigger */}
            <div className="pt-8">
              <button
                id="impact-cta-donate-now"
                onClick={() => onDonateClick(sliderVal, frequency)}
                className="w-full py-4 bg-brand-orange-500 text-stone-900 dark:text-stone-900 font-extrabold rounded-xl shadow hover:bg-brand-orange-600 transition-all font-display text-base cursor-pointer tracking-wider flex items-center justify-center space-x-2"
              >
                <span>Sponsor program at £{sliderVal}/{frequency === "monthly" ? "mo" : "once"}</span>
                <Heart className="h-4.5 w-4.5 fill-stone-900" />
              </button>
              <span className="text-[10px] font-mono text-center block text-brand-green-150 mt-2">
                Saves up to £100 annually in family household food costs.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
