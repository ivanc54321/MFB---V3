import React, { useState } from "react";
import { Check, Calendar, Users, HeartHandshake, Sparkles, AlertCircle, ShieldCheck, FileCheck, PartyPopper } from "lucide-react";
import { VOLUNTEER_ROLES } from "../data";
import { VolunteerRole, VolunteerSignup } from "../types";

export default function VolunteerHub() {
  const [selectedRole, setSelectedRole] = useState<string>("warehouse-sort");
  const [activeShift, setActiveShift] = useState<string>("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [joinedRoster, setJoinedRoster] = useState<VolunteerSignup[]>([]);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [county, setCounty] = useState("Wayne");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const activeRoleDetails = VOLUNTEER_ROLES.find((r) => r.id === selectedRole) || VOLUNTEER_ROLES[0];

  // Set default shift when role changes
  useState(() => {
    if (activeRoleDetails && activeRoleDetails.shifts.length > 0) {
      setActiveShift(activeRoleDetails.shifts[0]);
    }
  });

  const handleRoleSelect = (id: string) => {
    setSelectedRole(id);
    const role = VOLUNTEER_ROLES.find((r) => r.id === id);
    if (role && role.shifts.length > 0) {
      setActiveShift(role.shifts[0]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = "Please enter your full name.";
    if (!email.trim() || !email.includes("@")) newErrors.email = "Please enter a valid email address.";
    if (!phone.trim() || phone.length < 7) newErrors.phone = "Please enter a valid phone number.";
    if (!activeShift) newErrors.shift = "Please select a scheduled shift.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const newSignup: VolunteerSignup = {
      id: Math.random().toString(),
      name: fullName,
      email: email,
      phone: phone,
      roleId: selectedRole,
      county: county,
      shift: activeShift,
      date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
    };

    setJoinedRoster((prev) => [newSignup, ...prev]);
    setSignUpSuccess(true);
  };

  const handleResetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setSignUpSuccess(false);
  };

  return (
    <section id="volunteer-hub" className="py-24 bg-stone-900 text-stone-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-green-800/5 glow-grid-heavy pointer-events-none" />

      {/* Decorative radial glows */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-brand-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-green-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header content section */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center space-x-1.5 bg-brand-green-800/60 text-brand-green-100 border border-brand-green-600/30 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest font-bold">
            <HeartHandshake className="h-3.5 w-3.5 text-brand-orange-500" />
            <span>Volunteer Recruitment Hub</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
            Give Your Hour, Change a Roster
          </h2>
          <p className="text-stone-350 font-light text-base sm:text-lg">
            No specific skills required—just an eager heart! Help sort boxes, pack cargo backpacks, seed community food fields, or drive mobile distribution vehicles.
          </p>
        </div>

        {/* Content layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Role Navigator Cards */}
          <div className="lg:col-span-4 space-y-4 max-h-[640px] overflow-y-auto pr-2">
            <span className="text-xs font-mono font-bold text-stone-450 uppercase block tracking-widest">
              STEP 1: SELECT YOUR INVOLVEMENT
            </span>

            {VOLUNTEER_ROLES.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  id={`role-btn-${role.id}`}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex flex-col space-y-3 cursor-pointer ${
                    isSelected
                      ? "bg-brand-green-800 border-white/20 text-white shadow-lg shadow-black/30"
                      : "bg-stone-950/70 text-stone-300 border-stone-800 hover:border-stone-700 hover:bg-stone-900"
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                      isSelected ? "bg-white dark:bg-stone-950/10 text-brand-orange-400" : "bg-stone-800 text-stone-400"
                    }`}>
                      {role.category}
                    </span>
                    <span className="text-xs font-mono text-stone-400 flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      {role.spotsRemaining} spots left
                    </span>
                  </div>

                  <h3 className="font-display font-black text-base tracking-tight leading-snug">
                    {role.title}
                  </h3>

                  <p className="text-xs line-clamp-2 font-light text-stone-350">
                    {role.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Column 2: Selected Role Details & Dynamic Form signup */}
          <div className="lg:col-span-8 bg-stone-950/40 border border-stone-800 p-6 sm:p-8 rounded-3xl backdrop-blur-md flex flex-col justify-between">
            {signUpSuccess ? (
              
              /* CONFETTI SUCCESS PANEL */
              <div id="signup-success-view" className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                <div className="p-4 bg-brand-orange-500/20 text-brand-orange-500 rounded-full animate-bounce">
                  <PartyPopper className="h-12 w-12" />
                </div>
                
                <div className="space-y-2 max-w-md">
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    You are Officially Registered!
                  </h3>
                  <p className="text-sm text-stone-300 font-light">
                    Thank you, <strong>{fullName}</strong>, for committing to feed our community! A confirmation ticket has been dispatched to <strong>{email}</strong> complete with directions, safety guidelines, and shift instructions.
                  </p>
                </div>

                {/* Print ticket details */}
                <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 w-full max-w-md text-left space-y-4">
                  <span className="text-[10px] font-mono uppercase text-brand-orange-400 tracking-wider">
                    VOLUNTEER GATE PASS
                  </span>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-stone-500 dark:text-stone-400 font-semibold block uppercase">POSITION</span>
                      <span className="text-stone-200 font-bold">{activeRoleDetails.title}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 dark:text-stone-400 font-semibold block uppercase">LOCATION</span>
                      <span className="text-stone-200 font-bold">{county}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 dark:text-stone-400 font-semibold block uppercase">CONFIRMED DATE</span>
                      <span className="text-stone-200 font-bold">Upcoming Saturday</span>
                    </div>
                    <div>
                      <span className="text-stone-500 dark:text-stone-400 font-semibold block uppercase">SHIFT SESSION</span>
                      <span className="text-stone-200 font-bold">{activeShift}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-bold text-xs shadow transition-all cursor-pointer"
                  >
                    Register Someone Else
                  </button>
                  <button
                    onClick={() => {
                      const printW = window.open();
                      if (printW) {
                        printW.document.write(`
                          <html><head><title>Volunteer Pass</title></head><body style="font-family:sans-serif;padding:40px;">
                            <h1>Mi Food Bank Volunteer Gate Pass</h1>
                            <p>Thank you for partnering with Mi Food Bank.</p>
                            <ul>
                              <li><strong>Volunteer Name:</strong> ${fullName}</li>
                              <li><strong>Assigned Activity:</strong> ${activeRoleDetails.title}</li>
                              <li><strong>Location:</strong> ${county}</li>
                              <li><strong>Shift Slot:</strong> ${activeShift}</li>
                            </ul>
                            <small>Mi Food Bank Credential Key: VC-${Math.floor(Math.random() * 99999 + 1000)}</small>
                          </body></html>
                        `);
                        printW.print();
                      }
                    }}
                    className="px-6 py-3 bg-brand-orange-500 text-stone-900 dark:text-stone-100 font-extrabold rounded-xl text-xs hover:bg-brand-orange-600 transition-all cursor-pointer"
                  >
                    Print Gate Ticket
                  </button>
                </div>
              </div>

            ) : (
              
              /* SIGNUP FORM LAYER */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-800">
                
                {/* Role Details */}
                <div className="space-y-6 md:pr-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-brand-orange-500 uppercase tracking-widest block font-bold">
                      ASSIGNMENT DETAILS
                    </span>
                    <h3 className="text-xl font-display font-extrabold text-white leading-tight">
                      {activeRoleDetails.title}
                    </h3>
                  </div>

                  <p className="text-sm font-light text-stone-300 leading-relaxed">
                    {activeRoleDetails.description}
                  </p>

                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-stone-450 block uppercase">REQUIRED CAPABILITIES</span>
                    <div className="space-y-2">
                      {activeRoleDetails.requiredSkills.map((skill) => (
                        <div key={skill} className="flex items-start space-x-2 text-xs font-light text-stone-300">
                          <Check className="h-4 w-4 bg-brand-green-800/40 text-brand-orange-500 p-0.5 rounded-full flex-shrink-0 mt-0.5" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact metric */}
                  <div className="bg-brand-orange-50/5 border border-brand-orange-500/20 p-5 rounded-2xl flex items-start space-x-3">
                    <Sparkles className="h-5 w-5 text-brand-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-display font-bold text-brand-orange-400 block pb-1">COMPELLING IMPACT STAT</span>
                      <p className="text-xs text-stone-250 leading-relaxed font-light font-sans">
                        {activeRoleDetails.impactDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Schedule & Registration Form */}
                <form onSubmit={handleFormSubmit} className="space-y-5 pt-8 md:pt-0 md:pl-8">
                  <span className="text-xs font-mono font-bold text-stone-450 block uppercase tracking-widest">
                    STEP 2: ENROLLMENT FORM
                  </span>

                  {/* Shifts */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-stone-400 block font-bold">Shift Schedule</span>
                    <div className="grid grid-cols-1 gap-2">
                      {activeRoleDetails.shifts.map((shift) => (
                        <label
                          key={shift}
                          className={`flex items-center space-x-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                            activeShift === shift
                              ? "bg-brand-orange-500 border-brand-orange-550 text-stone-900 dark:text-stone-100 font-extrabold"
                              : "bg-stone-900 text-stone-350 border-stone-800 hover:border-stone-700 hover:bg-stone-850"
                          }`}
                        >
                          <input
                            type="radio"
                            name="active-role-shift"
                            value={shift}
                            checked={activeShift === shift}
                            onChange={() => setActiveShift(shift)}
                            className="text-brand-green-800 focus:outline-none accent-black"
                          />
                          <span>{shift}</span>
                        </label>
                      ))}
                    </div>
                    {errors.shift && (
                      <span className="text-red-400 text-xs flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" /> {errors.shift}
                      </span>
                    )}
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 gap-4">
                    
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-stone-400 block font-semibold">Your Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-stone-900 p-3 rounded-xl text-xs border border-stone-800 focus:outline-none focus:border-brand-orange-500 text-white placeholder-stone-600"
                      />
                      {errors.fullName && (
                        <span className="text-red-400 text-[11px] flex items-center">
                          <AlertCircle className="h-3.5 w-3.5 mr-1" /> {errors.fullName}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-stone-400 block font-semibold">Email Mailbox</label>
                        <input
                          type="email"
                          placeholder="johndoe@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-stone-900 p-3 rounded-xl text-xs border border-stone-800 focus:outline-none focus:border-brand-orange-500 text-white placeholder-stone-600 font-medium"
                        />
                        {errors.email && (
                          <span className="text-red-400 text-[10px] flex items-center leading-none mt-1">
                            <AlertCircle className="h-3.5 w-3.5 mr-1 flex-shrink-0" /> {errors.email}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-stone-400 block font-semibold">Telephone Line</label>
                        <input
                          type="tel"
                          placeholder="(517) 555-0192"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-stone-900 p-3 rounded-xl text-xs border border-stone-800 focus:outline-none focus:border-brand-orange-500 text-white placeholder-stone-600"
                        />
                        {errors.phone && (
                          <span className="text-red-400 text-[10px] flex items-center leading-none mt-1">
                            <AlertCircle className="h-3.5 w-3.5 mr-1 flex-shrink-0" /> {errors.phone}
                          </span>
                        )}
                      </div>

                    </div>

                    {/* Target location selector */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-stone-400 block font-semibold font-sans">Shop Location</label>
                      <select
                        value={county}
                        onChange={(e) => setCounty(e.target.value)}
                        className="w-full bg-stone-900 p-3 rounded-xl text-xs border border-stone-800 focus:outline-none focus:border-brand-orange-500 text-white font-medium"
                      >
                        <option value="Shop 1 (High Street)">Shop 1 (9 High Street)</option>
                        <option value="Shop 2 (Ramsgate Road)">Shop 2 (92-94 Ramsgate Road)</option>
                      </select>
                    </div>

                  </div>

                  {/* Enroll submit */}
                  <button
                    type="submit"
                    className="w-full py-4 mt-2 bg-gradient-to-r from-brand-orange-500 to-amber-500 hover:from-brand-orange-600 hover:to-amber-600 text-stone-950 dark:text-stone-50 font-extrabold rounded-xl shadow font-display text-sm flex items-center justify-center space-x-2 cursor-pointer transition-all uppercase tracking-wider"
                  >
                    <FileCheck className="h-4.5 w-4.5" />
                    <span>Securely Enroll shift roster</span>
                  </button>

                  <div className="flex items-center space-x-2 text-[10px] text-stone-500 dark:text-stone-400 justify-center">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span>Your privacy is 100% guarded under encrypted SSL.</span>
                  </div>

                </form>

              </div>
            )}

            {/* List Joined Volunteers listing rosters dynamically for real portal feel! */}
            {joinedRoster.length > 0 && (
              <div className="mt-8 pt-6 border-t border-stone-800">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-orange-400 block mb-3 font-semibold">
                  COMMUNITY BOARD: RECENTLY ENROLLED VOLUNTEERS IN THE AREA ({joinedRoster.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {joinedRoster.map((vol) => {
                    const matchedRole = VOLUNTEER_ROLES.find((r) => r.id === vol.roleId);
                    return (
                      <div
                        key={vol.id}
                        className="px-3 py-1.5 bg-stone-900 text-[11px] rounded-lg border border-stone-800 flex items-center space-x-1.5 animate-bounce-short"
                      >
                        <span className="text-white font-bold">{vol.name.split(" ")[0]}</span>
                        <span className="text-stone-500 dark:text-stone-400 italic">joined</span>
                        <span className="text-brand-green-100 font-semibold">{matchedRole?.title.split(" ")[0]}...</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
