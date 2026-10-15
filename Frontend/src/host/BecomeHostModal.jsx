import React, { useEffect, useRef } from 'react';
import { X, UserPlus, Home, Calendar, Wallet, Check, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import hostIllustration from '../assets/become_host_modal.jpg';

export default function BecomeHostModal({
  isOpen = false,
  onClose = () => {},
  onStartListing = () => {}
}) {
  const modalRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle clicking outside modal card
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleStartListing = () => {
    onClose();
    onStartListing();
  };

  return (
    <>
      <style>{`
        @keyframes hostModalFade {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(8px); }
        }
        @keyframes hostModalScale {
          from { opacity: 0; transform: scale(0.96) translateY(14px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-host-backdrop {
          animation: hostModalFade 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-host-box {
          animation: hostModalScale 0.28s cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
        }
      `}</style>

      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-slate-950/45 backdrop-blur-sm animate-host-backdrop">
        <div
          ref={modalRef}
          className="bg-white rounded-[28px] sm:rounded-[32px] border border-slate-100 shadow-2xl w-full max-w-[800px] max-h-[92vh] flex flex-col relative overflow-hidden animate-host-box text-left"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 bg-slate-100/70 hover:bg-slate-200/80 rounded-full p-2 transition-all cursor-pointer z-30 outline-none"
            aria-label="Close dialog"
          >
            <X className="h-4.5 w-4.5 stroke-[2.5]" />
          </button>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto no-scrollbar p-6 sm:p-8 md:p-9 space-y-6 sm:space-y-7">
            
            {/* ── 1. Top Hero Section: Title + Subtitle + Illustration ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 pr-6">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
                  Become a Host
                </h2>
                <p className="text-[13px] sm:text-[14px] font-medium text-slate-500 mt-2 max-w-[440px] leading-relaxed">
                  Join thousands of hosts on TripVerse and start earning by sharing your space or vehicles with travelers.
                </p>
              </div>

              {/* Right Illustration */}
              <div className="shrink-0 w-[200px] sm:w-[240px] md:w-[260px] self-center sm:self-auto">
                <img
                  src={hostIllustration}
                  alt="Become a Host on TripVerse"
                  className="w-full h-auto max-h-[140px] sm:max-h-[155px] object-contain rounded-2xl mix-blend-multiply select-none pointer-events-none"
                />
              </div>
            </div>

            {/* ── 2. "How it works?" ── */}
            <div>
              <h3 className="text-[16px] sm:text-[17px] font-extrabold text-slate-900 mb-4 sm:mb-5">
                How it works?
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-3 items-start relative">
                {/* Step 1 */}
                <div className="flex flex-col items-start relative pr-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-150 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                    <UserPlus className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h4 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 mt-3">
                    1. Create Account
                  </h4>
                  <p className="text-[11.5px] text-slate-500 font-medium leading-snug mt-1">
                    Sign up as a host and complete your profile.
                  </p>
                </div>

                {/* Arrow 1 */}
                <div className="hidden md:flex absolute left-[21%] top-4 -translate-y-1/2 text-slate-300">
                  <ArrowRight className="w-4.5 h-4.5 stroke-[2]" />
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-start relative pr-2">
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-150 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                    <Home className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h4 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 mt-3">
                    2. Add Your Listing
                  </h4>
                  <p className="text-[11.5px] text-slate-500 font-medium leading-snug mt-1">
                    List your property, bike or car with details and photos.
                  </p>
                </div>

                {/* Arrow 2 */}
                <div className="hidden md:flex absolute left-[46.5%] top-4 -translate-y-1/2 text-slate-300">
                  <ArrowRight className="w-4.5 h-4.5 stroke-[2]" />
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-start relative pr-2">
                  <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-150 flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                    <Calendar className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h4 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 mt-3">
                    3. Get Booked
                  </h4>
                  <p className="text-[11.5px] text-slate-500 font-medium leading-snug mt-1">
                    Travelers book your listing and we notify you instantly.
                  </p>
                </div>

                {/* Arrow 3 */}
                <div className="hidden md:flex absolute left-[71.5%] top-4 -translate-y-1/2 text-slate-300">
                  <ArrowRight className="w-4.5 h-4.5 stroke-[2]" />
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-start">
                  <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-150 flex items-center justify-center text-[#0F766E] shadow-sm shrink-0">
                    <Wallet className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h4 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 mt-3">
                    4. Earn Money
                  </h4>
                  <p className="text-[11.5px] text-slate-500 font-medium leading-snug mt-1">
                    Welcome guests and earn securely with TripVerse.
                  </p>
                </div>
              </div>
            </div>

            {/* Subtle Divider */}
            <div className="border-t border-slate-100" />

            {/* ── 3. "What can you list on TripVerse?" ── */}
            <div>
              <h3 className="text-[16px] sm:text-[17px] font-extrabold text-slate-900 mb-4 sm:mb-5">
                What can you list on TripVerse?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                
                {/* Card 1: Stay Properties */}
                <div className="rounded-2xl border border-emerald-100/90 bg-[#F4FAF6] p-4.5 flex flex-col justify-between hover:border-emerald-300/80 hover:shadow-sm transition-all group">
                  <div>
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
                        <Home className="w-5 h-5 stroke-[2.3]" />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-[14.5px] font-extrabold text-slate-900 leading-tight">
                          Stay Properties
                        </h4>
                        <p className="text-[11.5px] text-slate-500 font-medium leading-snug mt-1">
                          List your homes, apartments, villas or any other property.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4 pt-3 border-t border-emerald-100/60">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                        <span className="text-[12px] font-bold text-slate-700">Short Term Stays</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                        <span className="text-[12px] font-bold text-slate-700">Long Term Stays</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                        <span className="text-[12px] font-bold text-slate-700">Daily / Monthly Rentals</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Bike Rental */}
                <div className="rounded-2xl border border-blue-100/90 bg-[#F4F8FE] p-4.5 flex flex-col justify-between hover:border-blue-300/80 hover:shadow-sm transition-all group">
                  <div>
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
                        {/* Bike/Motorcycle SVG */}
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 12c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 12c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM15 6.5c-1.38 0-2.5 1.12-2.5 2.5 0 .32.06.63.18.91l-3.3 3.3c-.28-.13-.59-.21-.92-.21-1.38 0-2.5 1.12-2.5 2.5h1.5c0-.55.45-1 1-1 .31 0 .59.14.78.36l3.52-3.52c.22.1.46.16.72.16 1.1 0 2-.9 2-2s-.9-2-2-2zM12 4h4v1.5h-4z"/>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-[14.5px] font-extrabold text-slate-900 leading-tight">
                          Bike Rental
                        </h4>
                        <p className="text-[11.5px] text-slate-500 font-medium leading-snug mt-1">
                          List your bikes and reach thousands of riders.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4 pt-3 border-t border-blue-100/60">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                        <span className="text-[12px] font-bold text-slate-700">Daily Rentals</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                        <span className="text-[12px] font-bold text-slate-700">Weekly Rentals</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                        <span className="text-[12px] font-bold text-slate-700">Monthly Rentals</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3: Car Rental */}
                <div className="rounded-2xl border border-purple-100/90 bg-[#FAF7FE] p-4.5 flex flex-col justify-between hover:border-purple-300/80 hover:shadow-sm transition-all group">
                  <div>
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-purple-100/80 text-purple-700 flex items-center justify-center shrink-0 shadow-xs">
                        {/* Car SVG */}
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/>
                          <circle cx="7.5" cy="14.5" r="1.5"/>
                          <circle cx="16.5" cy="14.5" r="1.5"/>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-[14.5px] font-extrabold text-slate-900 leading-tight">
                          Car Rental
                        </h4>
                        <p className="text-[11.5px] text-slate-500 font-medium leading-snug mt-1">
                          List your cars and earn by renting to travelers.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4 pt-3 border-t border-purple-100/60">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                        <span className="text-[12px] font-bold text-slate-700">Self Drive Cars</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                        <span className="text-[12px] font-bold text-slate-700">With Driver</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                        <span className="text-[12px] font-bold text-slate-700">Outstation Trips</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ── 4. Safe, Secure & Trusted Banner ── */}
            <div className="rounded-2xl border border-emerald-100/90 bg-[#F4FAF6] px-4.5 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col text-left">
                  <h5 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 leading-tight">
                    Safe, Secure & Trusted
                  </h5>
                  <p className="text-[11px] sm:text-[11.5px] text-slate-500 font-medium mt-0.5 leading-snug">
                    We verify all hosts and listings to ensure a safe experience for our community.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleStartListing}
                className="text-[12px] font-bold text-[#0F766E] hover:underline cursor-pointer shrink-0 outline-none"
              >
                Learn More
              </button>
            </div>

            {/* ── 5. Action Button & Help text ── */}
            <div className="flex flex-col items-center justify-center pt-1 pb-1">
              <button
                type="button"
                onClick={handleStartListing}
                className="w-full max-w-[360px] py-3.5 px-6 rounded-xl bg-[#00684A] hover:bg-[#00553C] text-white font-extrabold text-[15px] shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center active:scale-[0.99] outline-none"
              >
                Start Listing Now
              </button>

              <div className="flex items-center justify-center gap-1.5 text-slate-500 text-[12px] font-medium mt-2.5">
                <Clock className="w-3.5 h-3.5 text-slate-400 stroke-[2.2]" />
                <span>It only takes a few minutes to get started!</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
