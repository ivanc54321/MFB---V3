import React, { useState, useMemo } from "react";
import { Search, MapPin, ExternalLink, Phone, ShieldCheck, Activity, Users, Truck, Info } from "lucide-react";
import { MEMBER_FOOD_BANKS } from "../data";
import { MemberFoodBank } from "../types";

export default function MichiganMap() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [activeBankId, setActiveBankId] = useState<string>("shop-1");

  // Filter food banks
  const regions = ["All", "Thanet/Margate", "Ramsgate Road Area"];

  const filteredBanks = useMemo(() => {
    return MEMBER_FOOD_BANKS.filter((bank) => {
      // Filter by search text (bank name, city, counties)
      const matchesSearch =
        bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bank.hqCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bank.countiesCovered.some((county) => county.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filter by click region
      const matchesRegion = selectedRegion === "All" || bank.regionServed === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [searchTerm, selectedRegion]);

  const activeBank = useMemo(() => {
    return MEMBER_FOOD_BANKS.find((b) => b.id === activeBankId) || MEMBER_FOOD_BANKS[0];
  }, [activeBankId]);

  // Simulated zip-code routing
  const handleZipSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTerm.toLowerCase().trim();

    // Semi-intelligent county routing
    if (query.includes("margate") || query.includes("high")) {
      setActiveBankId("shop-1");
      setSelectedRegion("Thanet/Margate");
    } else if (query.includes("ramsgate") || query.includes("ct9")) {
      setActiveBankId("shop-2");
      setSelectedRegion("Ramsgate Road Area");
    }
  };

  return (
    <section id="food-map" className="py-24 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border-t border-stone-100 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-brand-green-50 text-brand-green-800 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <MapPin className="h-3 w-3" />
            <span>Margate Assistance Map</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-stone-950 dark:text-stone-50">
            Find Your Local Mi Food Bank Shop
          </h2>
          <p className="text-stone-600 dark:text-stone-400 font-light text-base sm:text-lg">
            Find our Margate food bank locations, open to everyone in the local Thanet/Margate area to access low-priced food and support. No membership or benefits required.
          </p>
        </div>

        {/* Directory interactive layouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column A: Search & County grid list */}
          <div className="lg:col-span-5 bg-white dark:bg-stone-950 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800/80 shadow-md flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              <span className="text-xs font-mono font-bold text-stone-400 block uppercase tracking-wider">LOOKUP DIRECTORY</span>
              
              {/* Form Search */}
              <form onSubmit={handleZipSearch} className="relative">
                <input
                  type="text"
                  placeholder="Enter County (e.g. Wayne, Kent) or ZIP..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    // Immediate matching as well
                    const term = e.target.value.toLowerCase().trim();
                    if (term.includes("margate")) setActiveBankId("shop-1");
                    else if (term.includes("ramsgate")) setActiveBankId("shop-2");
                  }}
                  className="w-full pl-11 pr-24 py-3.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl focus:outline-none focus:border-brand-green-600 font-medium text-sm transition-colors text-stone-850 dark:text-stone-200 placeholder-stone-400"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-brand-green-800 text-white font-bold rounded-lg text-xs hover:bg-brand-green-900 transition-colors cursor-pointer"
                >
                  Locate
                </button>
              </form>

              {/* Geographic Filters Grid select buttons */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-stone-400 block tracking-widest font-bold">REGIONAL ZONE SELECTOR</span>
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => {
                        setSelectedRegion(region);
                        // Pick first associated bank from that region
                        const associated = MEMBER_FOOD_BANKS.find((b) => b.regionServed === region);
                        if (associated) {
                          setActiveBankId(associated.id);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                        selectedRegion === region
                          ? "bg-brand-orange-500 text-stone-900 dark:text-stone-100 shadow-sm"
                          : "bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-150"
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* List results items */}
            <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800 max-h-80 overflow-y-auto pr-2">
              <span className="text-xs font-mono font-bold text-stone-450 block uppercase tracking-wider">
                Matching Mi Food Bank Shops ({filteredBanks.length})
              </span>

              {filteredBanks.map((bank) => {
                const isActive = activeBankId === bank.id;
                return (
                  <button
                    key={bank.id}
                    id={`bank-list-item-${bank.id}`}
                    onClick={() => setActiveBankId(bank.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer group ${
                      isActive
                        ? "bg-stone-900 text-white border-stone-900 shadow-md"
                        : "bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800/60 hover:bg-stone-100 dark:bg-stone-800 hover:border-stone-300 dark:border-stone-700"
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-brand-orange-500 font-extrabold uppercase block">
                        {bank.regionServed}
                      </span>
                      <h4 className="font-display font-bold text-sm tracking-tight">
                        {bank.name}
                      </h4>
                      <p className="text-[11px] font-light">
                        Location: {bank.hqCity}, UK
                      </p>
                    </div>
                    <div className="text-[10px] font-mono px-2 py-1 bg-stone-200 hover:bg-stone-300 rounded text-stone-800 dark:text-stone-200">
                      {bank.countiesCovered.length} Counties
                    </div>
                  </button>
                );
              })}

              {filteredBanks.length === 0 && (
                <div className="py-6 text-center text-stone-450 italic text-sm">
                  No matching locations found. Try resetting filters.
                </div>
              )}
            </div>

          </div>

          {/* Column B: Showcase chosen food bank details */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-950 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800/80 shadow-md flex flex-col justify-between space-y-8 relative">
            
            {/* Visual Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-6 gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full animate-pulse bg-emerald-500" />
                  <span className="text-xs font-mono uppercase text-stone-450 tracking-wider font-bold">
                    ACTIVE NETWORK BRANCH MEMBER
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-stone-950 dark:text-stone-50 tracking-tight">
                  {activeBank.name}
                </h3>
              </div>
              
              <div className="flex flex-col text-right sm:items-end">
                <span className="text-[10px] font-mono text-stone-400 block uppercase font-bold">HEADQUARTERS</span>
                <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 flex items-center">
                  <MapPin className="h-4 w-4 text-brand-orange-500 mr-1" />
                  {activeBank.hqCity}, UK
                </span>
              </div>
            </div>

            {/* Metrics cards bar */}
            <div className="grid grid-cols-2 gap-4">
              
              <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800/60 p-4 rounded-2xl">
                <div className="flex items-center space-x-3 mb-1">
                  <Activity className="h-5 w-5 text-brand-green-800" />
                  <span className="text-xs font-mono font-medium text-stone-500 dark:text-stone-400 tracking-wider">ANNUAL MEALS</span>
                </div>
                <span className="text-2xl sm:text-3xl font-display font-black text-stone-900 dark:text-stone-100">
                  {activeBank.mealsDistributedMillions}M
                </span>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 italic font-light">Direct meals distributed</p>
              </div>

              <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800/60 p-4 rounded-2xl">
                <div className="flex items-center space-x-3 mb-1">
                  <Users className="h-5 w-5 text-brand-orange-500" />
                  <span className="text-xs font-mono font-medium text-stone-500 dark:text-stone-400 tracking-wider">HOUSEHOLDS AIDED</span>
                </div>
                <span className="text-2xl sm:text-3xl font-display font-black text-stone-900 dark:text-stone-100">
                  {(activeBank.householdsServedAnnually / 1000).toFixed(0)}K+
                </span>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 italic font-light">Registered households fed</p>
              </div>

            </div>

            {/* Description and narrative */}
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest uppercase font-bold text-stone-400 block">Mission Summary</span>
              <p className="text-stone-700 dark:text-stone-300 font-light leading-relaxed text-sm sm:text-base">
                {activeBank.description}
              </p>

              {/* Counties tag list */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-stone-450 uppercase block font-bold">OFFICIAL COVERAGE ({activeBank.countiesCovered.length} COUNTIES):</span>
                <div className="flex flex-wrap gap-1">
                  {activeBank.countiesCovered.map((cty) => (
                    <span
                      key={cty}
                      className="px-2 py-1 bg-brand-green-50 text-brand-green-800 text-[10px] font-mono border border-brand-green-100 rounded-md"
                    >
                      {cty} County
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer action tools */}
            <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
              
              <div className="flex items-center space-x-3 text-stone-500 dark:text-stone-400 text-xs font-mono">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Verified Mi Food Bank Shop.</span>
              </div>

              <div className="flex space-x-3 w-full sm:w-auto">
                <a
                  href={`mailto:micommunity.shop.margate@gmail.com`}
                  className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 border border-stone-200 dark:border-stone-800 text-stone-750 dark:text-stone-300 hover:bg-stone-50 dark:bg-stone-900 hover:text-stone-950 dark:text-stone-50 font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Email Us</span>
                </a>
                
                <a
                  href={activeBank.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-2.5 bg-brand-green-800 hover:bg-brand-green-900 border border-brand-green-900 text-white font-bold text-xs rounded-xl shadow transition-all"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
