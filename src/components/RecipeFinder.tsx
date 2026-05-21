import { useState } from "react";
import { PANTRY_RECIPES } from "../data";
import { Recipe } from "../types";
import { Check, Flame, Clock, ChefHat, HelpCircle, AlertCircle, ShoppingBag, Salad } from "lucide-react";

export default function RecipeFinder() {
  const [selectedStaples, setSelectedStaples] = useState<string[]>(["onion"]);

  // Available interactive cupboard ingredients
  const availableStaples = [
    { id: "onion", label: "🧅 Red / Yellow Onions" },
    { id: "potatoes", label: "🥔 Gold Potatoes" },
    { id: "canned beans", label: "🫘 Canned Kidney/Black Beans" },
    { id: "canned tomatoes", label: "🍅 Canned Stewed Tomatoes" },
    { id: "milk", label: "🥛 Wholesome Milk" },
    { id: "apples", label: "🍎 Fresh Red Apples" },
    { id: "oats", label: "🌾 Whole Grain Oats" },
    { id: "rice", label: "🍚 Long Grain White/Brown Rice" },
    { id: "canned corn", label: "🌽 Low-sodium canned corn" },
  ];

  const handleToggleStaple = (id: string) => {
    setSelectedStaples((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Find recipes matching checked ingredients
  const matchedRecipes = PANTRY_RECIPES.map((recipe) => {
    // Count how many ingredients match
    const matchesCount = recipe.matchIngredients.filter((ing) =>
      selectedStaples.includes(ing)
    ).length;

    const matchPercent = Math.round((matchesCount / recipe.matchIngredients.length) * 100);

    return {
      ...recipe,
      matchesCount,
      matchPercent,
    };
  }).sort((a, b) => b.matchPercent - a.matchPercent);

  return (
    <section id="recipe-finder" className="py-24 bg-brand-cream-50 text-stone-900 dark:text-stone-100 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title elements */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-brand-green-100 text-brand-green-800 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <ChefHat className="h-4.5 w-4.5 text-brand-orange-500" />
            <span>Pantry Waste Fighter Tool</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-stone-950 dark:text-stone-50 tracking-tight">
            Pantry-Staple Recipe Finder
          </h2>
          <p className="text-stone-600 dark:text-stone-400 font-light text-base sm:text-lg">
            Got surplus food distribution items? Select what is currently in your pantry below, and instantly unlock highly nutritious, low-energy family recipes created by local community chefs!
          </p>
        </div>

        {/* Layout breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Cupboard staples checkboxes */}
          <div className="lg:col-span-4 bg-white dark:bg-stone-950 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-md space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-brand-orange-500 font-bold uppercase block">
                STEP 1: SELECT STOCK INGREDIENTS
              </span>
              <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100 leading-snug">
                Click what you have in cupboard:
              </h3>
            </div>

            {/* Checkboxes grid layout */}
            <div className="grid grid-cols-1 gap-2">
              {availableStaples.map((staple) => {
                const isSelected = selectedStaples.includes(staple.id);
                return (
                  <button
                    key={staple.id}
                    onClick={() => handleToggleStaple(staple.id)}
                    className={`left-align w-full text-left p-3 rounded-xl border font-medium text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-brand-green-50 border-brand-green-200 text-brand-green-900 font-bold shadow-sm"
                        : "bg-stone-50 dark:bg-stone-900 border-stone-150 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:bg-stone-800 hover:border-stone-250"
                    }`}
                  >
                    <span>{staple.label}</span>
                    <div className={`h-5 w-5 rounded-md flex items-center justify-center p-0.5 border ${
                      isSelected
                        ? "bg-brand-green-800 text-white border-brand-green-900"
                        : "bg-white dark:bg-stone-950 border-stone-300 dark:border-stone-700"
                    }`}>
                      {isSelected && <Check className="h-3 w-3 stroke-[3px]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-4 bg-brand-cream-100 rounded-2xl border border-brand-cream-200 text-xs text-stone-550 flex items-start space-x-2.5">
              <AlertCircle className="h-4.5 w-4.5 text-brand-orange-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Choose multiple staples to find perfect multi-ingredient matches. Our recipes are designed to cost under **$1.50 per serving**!
              </p>
            </div>

          </div>

          {/* Right panel: Filtered match details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center bg-stone-100 dark:bg-stone-800/60 p-4 rounded-xl border border-stone-150">
              <span className="text-xs font-mono font-bold text-stone-500 dark:text-stone-400">
                RECOMMENDED DISHES SORTED BY CUPBOARD COMPATIBILITY
              </span>
              <span className="text-xs font-mono font-bold text-brand-green-800 uppercase px-2.5 py-0.5 bg-brand-green-50 rounded">
                Staples Engine V2.1
              </span>
            </div>

            {/* Recipes lists scrollable mapping container */}
            <div className="space-y-6 max-h-[640px] overflow-y-auto pr-2">
              {matchedRecipes.map((recipe) => {
                const hasMatches = recipe.matchesCount > 0;
                return (
                  <div
                    key={recipe.id}
                    id={`recipe-card-${recipe.id}`}
                    className={`p-6 sm:p-8 bg-white dark:bg-stone-950 rounded-3xl border shadow-md transition-all ${
                      recipe.matchPercent >= 66
                        ? "border-brand-green-600 ring-2 ring-brand-green-100"
                        : recipe.matchPercent > 0
                        ? "border-stone-200 dark:border-stone-800"
                        : "border-stone-100 dark:border-stone-800 opacity-60"
                    }`}
                  >
                    {/* Upper row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-4">
                      
                      <div className="space-y-1 text-left">
                        <div className="flex items-center space-x-2.5">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                            recipe.difficulty === "Easy"
                              ? "bg-emerald-50 text-emerald-800"
                              : "bg-amber-50 text-amber-800"
                          }`}>
                            {recipe.difficulty} prep
                          </span>
                          
                          {recipe.matchPercent > 0 && (
                            <span className="text-[10px] font-mono bg-brand-orange-50 text-brand-orange-600 px-2 py-0.5 rounded font-bold">
                              {recipe.matchPercent}% Ingredient Match! ({recipe.matchesCount} item)
                            </span>
                          )}
                        </div>

                        <h4 className="font-display font-black text-xl tracking-tight text-stone-900 dark:text-stone-100 leading-snug">
                          {recipe.title}
                        </h4>
                      </div>

                      {/* Minutes indicators */}
                      <div className="flex items-center space-x-4 text-xs font-mono text-stone-550 italic">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-stone-400" />
                          Prep: {recipe.prepTime}
                        </span>
                        <span className="flex items-center">
                          <Flame className="h-4 w-4 mr-1 text-brand-orange-500" />
                          Cook: {recipe.cookTime}
                        </span>
                      </div>

                    </div>

                    {/* Mid segment: Ingredients array highlights */}
                    <div className="py-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                      
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-stone-400 tracking-widest block uppercase font-bold">STAPLE INGREDIENTS IN RECIPE</span>
                        <div className="flex flex-wrap gap-1">
                          {recipe.matchIngredients.map((item) => {
                            const hasItem = selectedStaples.includes(item);
                            return (
                              <span
                                key={item}
                                className={`px-2.5 py-1 text-xs rounded-lg font-medium border flex items-center space-x-1.5 ${
                                  hasItem
                                    ? "bg-brand-green-50 border-brand-green-200 text-brand-green-900 font-bold"
                                    : "bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-400 font-light"
                                }`}
                              >
                                {hasItem ? "✅" : "❌"}
                                <span className="capitalize">{item}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-stone-400 tracking-widest block uppercase font-bold">COMMON CUPBOARD SPICES</span>
                        <div className="flex flex-wrap gap-1">
                          {recipe.otherIngredients.map((item) => (
                            <span
                              key={item}
                              className="px-2.5 py-1 text-xs bg-stone-50 dark:bg-stone-900 text-stone-605 border border-stone-150 rounded-lg capitalize"
                            >
                              + {item}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Step-by-Step cooking breakdown */}
                    <div className="space-y-3.5 bg-stone-50 dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800/50 text-left">
                      <span className="text-xs font-mono text-stone-450 block uppercase tracking-wider font-bold">
                        PREPARATION INSTRUCTIONS
                      </span>
                      <ol className="list-decimal pl-5 text-stone-700 dark:text-stone-300 space-y-2 text-xs sm:text-sm font-light leading-relaxed">
                        {recipe.instructions.map((step, idx) => (
                          <li key={idx} className="pl-1">
                            {step}
                          </li>
                        ))}
                      </ol>

                      {/* Cook tip box */}
                      <div className="pt-3 border-t border-stone-150 text-xs text-brand-green-800 italic flex items-center space-x-2">
                        <ShoppingBag className="h-4 w-4 text-brand-orange-500 shrink-0" />
                        <span>
                          <strong>Nutrition Tip</strong>: {recipe.tips}
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
