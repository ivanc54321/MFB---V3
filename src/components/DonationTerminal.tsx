import React, { useState } from "react";
import { Check, X, CreditCard, Heart, Award, ArrowRight, CheckCircle, Smartphone, AlertCircle, FileText, Printer } from "lucide-react";

interface DonationTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number;
  initialFrequency?: "one-time" | "monthly";
}

export default function DonationTerminal({ isOpen, onClose, initialAmount = 25, initialFrequency = "monthly" }: DonationTerminalProps) {
  const [step, setStep] = useState(1);
  const [pledgeAmt, setPledgeAmt] = useState<number>(initialAmount);
  const [customVal, setCustomVal] = useState<string>("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">(initialFrequency);

  // Form Fields
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isTribute, setIsTribute] = useState(false);
  const [tributeName, setTributeName] = useState("");

  // Payment simulated Credit card
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});
  const [paySimulated, setPaySimulated] = useState(false);

  if (!isOpen) return null;

  const quickAmounts = [15, 25, 50, 100, 250, 500];

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!donorName.trim()) errors.donorName = "Please enter your name.";
    if (!donorEmail.trim() || !donorEmail.includes("@")) errors.donorEmail = "Please enter a valid email address.";

    if (Object.keys(errors).length > 0) {
      setCardErrors(errors);
      return;
    }

    setCardErrors({});
    setStep(3);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (cardNumber.replace(/\D/g, "").length < 16) errors.cardNumber = "Please enter a valid 16-digit card number.";
    if (!cardExpiry || !cardExpiry.includes("/")) errors.cardExpiry = "Enter expiration date (MM/YY).";
    if (cardCVC.length < 3) errors.cardCVC = "CVC must be at least 3 digits.";

    if (Object.keys(errors).length > 0) {
      setCardErrors(errors);
      return;
    }

    setCardErrors({});
    setPaySimulated(true);
    setTimeout(() => {
      setStep(4);
      setPaySimulated(false);
    }, 1500);
  };

  return (
    <div
      id="donation-terminal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 p-4 backdrop-blur-sm animate-fade-in text-stone-950 dark:text-stone-50 text-left"
    >
      <div className="bg-white dark:bg-stone-950 rounded-3xl w-full max-w-xl shadow-2xl relative overflow-hidden flex flex-col justify-between border border-stone-100 dark:border-stone-800 max-h-[92vh]">
        
        {/* Upper Step Progress header */}
        <div className="bg-stone-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-brand-orange-500 to-amber-500 text-stone-900 dark:text-stone-100 rounded-lg">
              <Heart className="h-5 w-5 fill-stone-900" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg tracking-tight">
                Secure Donation Terminal
              </h3>
              <p className="text-[10px] font-mono uppercase text-stone-400 tracking-wider">
                Step {step} of 4 • Fully encrypted transaction and ledger
              </p>
            </div>
          </div>

          <button
            id="close-terminal-btn"
            onClick={onClose}
            className="p-1.5 hover:bg-stone-850 rounded-lg text-stone-400 hover:text-white transition-all cursor-pointer"
            aria-label="Close terminal cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step dots line progress indicator */}
        <div className="h-1 w-full bg-stone-100 dark:bg-stone-800 flex">
          <div className="h-full bg-brand-orange-500 transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }} />
        </div>

        {/* Main interactive terminal slides */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[60vh]">
          
          {step === 1 && (
            /* STEP 1: CHOOSE PLEDGE AMOUNT */
            <form onSubmit={handleStep1Submit} className="space-y-6">
              
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block font-bold">SELECT GIFT VALUE</span>
                <h4 className="font-display font-extrabold text-xl text-stone-900 dark:text-stone-100 tracking-tight leading-snug">
                  Choose a direct aid amount:
                </h4>
              </div>

              {/* Freq selection block */}
              <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl w-fit">
                <button
                  type="button"
                  onClick={() => setFrequency("one-time")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    frequency === "one-time"
                      ? "bg-white dark:bg-stone-950 text-stone-950 dark:text-stone-50 shadow-sm"
                      : "text-stone-500 dark:text-stone-400 hover:text-stone-850 dark:text-stone-200"
                  }`}
                >
                  One-time donation
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency("monthly")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
                    frequency === "monthly"
                      ? "bg-brand-orange-500 text-stone-950 dark:text-stone-50 shadow-sm"
                      : "text-stone-500 dark:text-stone-400 hover:text-stone-850 dark:text-stone-200"
                  }`}
                >
                  <Heart className="h-3 w-3 fill-stone-950" />
                  <span>Monthly sustainment</span>
                </button>
              </div>

              {/* Amount buttons grid */}
              <div className="grid grid-cols-3 gap-3">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setPledgeAmt(amt);
                      setCustomVal("");
                    }}
                    className={`p-4 border rounded-2xl text-base font-extrabold transition-all cursor-pointer ${
                      pledgeAmt === amt && !customVal
                        ? "bg-brand-green-800 text-white border-brand-green-850 shadow-md"
                        : "bg-stone-50 dark:bg-stone-900 border-stone-150 hover:bg-stone-100 dark:bg-stone-800 hover:border-stone-250 text-stone-800 dark:text-stone-200"
                    }`}
                  >
                    £{amt}
                  </button>
                ))}
              </div>

              {/* Custom input details */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-stone-400 block font-bold">OR ENTER OTHER CUSTOM VALUE (£)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-stone-400">£</span>
                  <input
                    type="number"
                    min="5"
                    placeholder="Enter custom pounds amount..."
                    value={customVal}
                    onChange={(e) => {
                      setCustomVal(e.target.value);
                      setPledgeAmt(Number(e.target.value) || 0);
                    }}
                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 py-3 pl-8 pr-4 rounded-xl text-sm focus:outline-none focus:border-brand-green-800 font-bold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-stone-900 hover:bg-stone-850 text-white font-extrabold font-display rounded-xl shadow-md flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider text-xs"
              >
                <span>Continue to Donor details</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>

            </form>
          )}

          {step === 2 && (
            /* STEP 2: DONOR PARTICULARS & TRIBUTES */
            <form onSubmit={handleStep2Submit} className="space-y-6">
              
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-stone-450 uppercase tracking-wider block font-bold">DONOR PARTICULARS</span>
                <h4 className="font-display font-extrabold text-xl text-stone-900 dark:text-stone-100 tracking-tight leading-snug">
                  Let us know who you are:
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-4">
                
                <div className="space-y-1">
                  <label className="text-xs font-mono text-stone-400 block font-semibold">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Smith"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 rounded-xl focus:outline-none focus:border-brand-green-800 text-sm font-semibold"
                  />
                  {cardErrors.donorName && (
                    <span className="text-red-500 text-xs flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" /> {cardErrors.donorName}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-stone-400 block font-semibold">Your Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. janesmith@yahoo.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 rounded-xl focus:outline-none focus:border-brand-green-800 text-sm font-semibold"
                  />
                  {cardErrors.donorEmail && (
                    <span className="text-red-500 text-xs flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" /> {cardErrors.donorEmail}
                    </span>
                  )}
                </div>

                {/* Tribute Dedicated Gift toggle checkbox */}
                <div className="pt-2">
                  <label className="flex items-center space-x-3 p-4 bg-brand-orange-50 border border-brand-orange-500/20 rounded-2xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isTribute}
                      onChange={(e) => setIsTribute(e.target.checked)}
                      className="accent-brand-orange-500 focus:outline-none"
                    />
                    <div>
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block font-display">Dedicate this donation in honor/memory of someone</span>
                      <span className="text-[10px] text-stone-500 dark:text-stone-400 block leading-tight font-light font-sans">
                        We will draft a custom commemorative graphic you can print or display!
                      </span>
                    </div>
                  </label>
                </div>

                {isTribute && (
                  <div className="space-y-1 animate-scale-up text-xs">
                    <label className="text-stone-450 font-bold block">Honoree Name / Dedicated Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Reverend Thomas Green, Grandma Mary"
                      value={tributeName}
                      onChange={(e) => setTributeName(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 rounded-xl focus:outline-none focus:border-brand-orange-550 text-stone-900 dark:text-stone-100 font-bold"
                    />
                  </div>
                )}

              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3.5 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 font-bold text-xs rounded-xl shadow-sm cursor-pointer transition-all uppercase tracking-wider text-center"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3.5 bg-stone-900 hover:bg-stone-850 text-white font-extrabold font-display text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider text-center"
                >
                  <span>Go to Secured Payment</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </form>
          )}

          {step === 3 && (
            /* STEP 3: SECURED TRANSACTION CREDIT PORTAL */
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              
              <div className="space-y-1 text-left">
                <span className="text-[11px] font-mono text-emerald-600 block uppercase tracking-widest font-black">
                  🛡️ SSL SECURE GATEWAY
                </span>
                <h4 className="font-display font-extrabold text-xl text-stone-900 dark:text-stone-100 tracking-tight leading-snug">
                  Secured Transaction Ledger
                </h4>
              </div>

              {/* Dynamic total checkout check */}
              <div className="bg-stone-900 text-white p-4 rounded-2xl flex items-center justify-between border border-stone-850 shadow">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-stone-400">Pledge Stream Summary</span>
                  <span className="text-sm font-semibold block">{frequency === "monthly" ? "Monthly Sustainer Gift" : "One-time Direct Aid"}</span>
                </div>
                <div>
                  <span className="text-2xl font-display font-black text-brand-orange-500">£{pledgeAmt}</span>
                  <span className="text-[10px] font-mono text-stone-400">/{frequency === "monthly" ? "mo" : "once"}</span>
                </div>
              </div>

              {paySimulated ? (
                /* SIMULATION LOADER WAVE */
                <div className="py-12 text-center space-y-4">
                  <div className="h-8 w-8 rounded-full border-t-4 border-brand-orange-500 animate-spin mx-auto" />
                  <span className="text-xs font-mono text-stone-500 dark:text-stone-400 block uppercase tracking-wider">
                    Securing bank connection, executing handshake protocols...
                  </span>
                </div>
              ) : (
                /* Card parameters */
                <div className="space-y-4">
                  
                  {/* Card input field */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-stone-400 block font-semibold">Credit Card Number (Simulated)</label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={19}
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setCardNumber(val.replace(/(.{4})/g, "$1 ").trim());
                        }}
                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 pl-11 rounded-xl text-sm focus:outline-none focus:border-brand-green-800 font-bold text-stone-900 dark:text-stone-100 tracking-wider font-mono placeholder:tracking-normal placeholder:font-sans"
                      />
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    </div>
                    {cardErrors.cardNumber && (
                      <span className="text-red-500 text-[11px] flex items-center leading-none mt-1">
                        <AlertCircle className="h-3.5 w-3.5 mr-1" /> {cardErrors.cardNumber}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-stone-400 block font-semibold">Expiration date</label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          if (val.length >= 2) {
                            setCardExpiry(val.slice(0, 2) + "/" + val.slice(2, 4));
                          } else {
                            setCardExpiry(val);
                          }
                        }}
                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 rounded-xl text-sm focus:outline-none focus:border-brand-green-800 font-bold text-stone-900 dark:text-stone-100 font-mono text-center"
                      />
                      {cardErrors.cardExpiry && (
                        <span className="text-red-500 text-[10px] flex items-center leading-none mt-1">
                          <AlertCircle className="h-3.5 w-3.5 mr-1 shrink-0" /> {cardErrors.cardExpiry}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-stone-400 block font-semibold">CVV/CVC</label>
                      <input
                        type="password"
                        maxLength={3}
                        placeholder="•••"
                        value={cardCVC}
                        onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, ""))}
                        className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 rounded-xl text-sm focus:outline-none focus:border-brand-green-800 font-bold text-stone-900 dark:text-stone-100 text-center font-mono"
                      />
                      {cardErrors.cardCVC && (
                        <span className="text-red-500 text-[10px] flex items-center leading-none mt-1">
                          <AlertCircle className="h-3.5 w-3.5 mr-1 shrink-0" /> {cardErrors.cardCVC}
                        </span>
                      )}
                    </div>

                  </div>

                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={paySimulated}
                  className="w-1/3 py-3.5 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 font-bold text-xs rounded-xl shadow-sm transition-all uppercase tracking-wider text-center cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={paySimulated}
                  className="w-2/3 py-3.5 bg-brand-green-800 hover:bg-brand-green-900 border border-brand-green-900 text-white font-extrabold font-display text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider text-center"
                >
                  <span>Authorize Transaction</span>
                  <Check className="h-4.5 w-4.5 stroke-[3px]" />
                </button>
              </div>

            </form>
          )}

          {step === 4 && (
            /* STEP 4: TAX EXEMPT RECEIPT & COMMITMENT DIGNITARY CARD */
            <div id="donation-receipt-pane" className="space-y-6 text-center py-6">
              
              <div className="p-4 bg-emerald-50 text-emerald-700 rounded-full w-fit mx-auto animate-bounce">
                <CheckCircle className="h-10 w-10" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-orange-500 block font-bold">TRANSACTION CERTIFIED</span>
                <h4 className="font-display font-black text-2xl text-stone-950 dark:text-stone-50">
                  Glorious support, thank you!
                </h4>
                <p className="text-xs sm:text-sm text-stone-650 dark:text-stone-400 max-w-sm mx-auto leading-relaxed font-light font-sans">
                  Your donation of <strong>£{pledgeAmt}</strong> has been debited securely. A copy has been delivered to <strong>{donorEmail}</strong>.
                </p>
              </div>

              {/* Printable receipt rendering frame */}
              <div className="bg-stone-50 dark:bg-stone-900 border border-stone-250 p-6 rounded-2xl text-left space-y-4 max-w-md mx-auto">
                <div className="flex justify-between items-center border-b border-stone-200 dark:border-stone-800 pb-3">
                  <div>
                    <span className="text-[9px] font-mono text-stone-400 uppercase tracking-wider">TAX EXEMPT RECEIPT</span>
                    <span className="font-display font-black text-stone-900 dark:text-stone-100 text-sm block">Mi Food Bank</span>
                  </div>
                  <Award className="h-6 w-6 text-brand-orange-500 shrink-0" />
                </div>

                <div className="space-y-2 text-[11px] font-sans text-stone-700 dark:text-stone-300 leading-snug">
                  <div>
                    <span className="font-mono text-stone-400 uppercase font-semibold">DONOR IDENTIFICATION:</span>{" "}
                    <strong>{donorName}</strong>
                  </div>
                  <div>
                    <span className="font-mono text-stone-400 uppercase font-semibold">DEDICATORY STATUS:</span>{" "}
                    {isTribute ? (
                      <strong>In Honor of &quot;{tributeName}&quot;</strong>
                    ) : (
                      <em className="text-stone-400 font-light">Direct Programmatic Aid</em>
                    )}
                  </div>
                  <div>
                    <span className="font-mono text-stone-400 uppercase font-semibold">PLEDGE TOTAL:</span>{" "}
                    <strong>£{pledgeAmt} {frequency === "monthly" ? "Monthly Roster" : "One-Time Contribution"}</strong>
                  </div>
                  <div>
                    <span className="font-mono text-stone-400 uppercase font-semibold">FINANCIAL LEDGER:</span>{" "}
                    <span className="font-mono text-brand-green-800 font-bold">RECEIPT KEY: MICOM-{Math.floor(Math.random() * 900000 + 100000)}</span>
                  </div>
                </div>

                {isTribute && (
                  <div className="border-t border-dashed border-stone-250 pt-3 text-center">
                    <span className="text-[10px] font-mono text-brand-orange-600 block uppercase tracking-widest font-bold">💐 TRIBUTE HONOREE CARD</span>
                    <p className="text-[11px] italic font-light font-serif pt-1 text-stone-650 dark:text-stone-400">
                      &quot;Generous support given in cherished memory and celebration of the vibrant legacy of {tributeName}.&quot;
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-4 max-w-sm mx-auto">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-stone-900 hover:bg-stone-850 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition-all uppercase tracking-wider"
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    const printReceipt = window.open();
                    if (printReceipt) {
                      printReceipt.document.write(`
                        <html><head><title>Mi Food Bank Donation Receipt</title></head><body style="font-family:sans-serif;padding:50px;">
                          <h1 style="border-bottom:2px solid #2d5a27;padding-bottom:10px;">Tax Exempt Donation Receipt</h1>
                          <p><strong>Mi Food Bank</strong></p>
                          <hr/>
                          <p><strong>Donor Name:</strong> ${donorName}</p>
                          <p><strong>Amount:</strong> £${pledgeAmt} (${frequency})</p>
                          <p><strong>Dedicatory Honor:</strong> ${isTribute ? tributeName : 'N/A'}</p>
                          <p><strong>Registration Info:</strong> Registered Community Interest Company</p>
                          <p><strong>Reference Code:</strong> MICOM-${Math.floor(Math.random() * 89999 + 10000)}</p>
                          <p>Thank you for nourishing neighboring lives!</p>
                        </body></html>
                      `);
                      printReceipt.print();
                    }
                  }}
                  className="flex-1 py-3 bg-brand-orange-500 text-stone-900 dark:text-stone-100 font-extrabold text-xs rounded-xl hover:bg-brand-orange-600 shadow cursor-pointer transition-all uppercase tracking-wider flex items-center justify-center space-x-1.5"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print Receipt</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
