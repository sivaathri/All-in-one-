import { useState, useEffect } from 'react';
import { X, Copy, Check, Ticket, Shield, Headset, ArrowRight } from 'lucide-react';
import homeadImg from '../assets/homead.png';

export default function HomeAdModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Countdown timer state: 2 days, 14 hours, 36 mins, 45 secs initially
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 45
  });

  useEffect(() => {
    // Show the popup 800ms after the home screen opens for a smooth entrance
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Countdown logic
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                // Reset to 2 days to keep the demo active
                days = 2;
                hours = 14;
                minutes = 36;
                seconds = 45;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCopyCode = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText('WELCOME20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  // Format numbers to always be 2 digits
  const formatTime = (num) => String(num).padStart(2, '0');

  return (
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 transition-opacity duration-300 animate-in fade-in"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="relative max-w-[920px] w-full bg-white rounded-[28px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 ease-out border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Real HTML/React Text & Interactive components */}
        <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-between text-left bg-gradient-to-br from-emerald-50/30 via-white to-white relative z-10">
          
          <div>
            {/* Limited Time Offer Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#E6F4F1] text-[#0F766E] px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide mb-5">
              <Ticket className="h-3.5 w-3.5" />
              <span>LIMITED TIME OFFER</span>
            </div>

            {/* Heading */}
            <h2 className="text-[32px] sm:text-[38px] font-black text-slate-900 leading-[1.1] tracking-tight">
              Welcome to <span className="text-[#0F766E]">TripVerse!</span>
            </h2>
            <p className="text-slate-500 font-semibold text-[14px] sm:text-[15px] mt-2 mb-6">
              Your next adventure starts now ✈️
            </p>

            {/* Coupon Card */}
            <div className="border border-dashed border-[#0F766E]/30 rounded-2xl p-4 bg-slate-50/50 mb-6">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div>
                  <span className="text-[11px] font-bold text-[#0F766E] uppercase tracking-wider block">UP TO</span>
                  <span className="text-[28px] font-black text-[#0F766E] leading-none">20% OFF</span>
                </div>
                <div className="text-right flex-1 max-w-[190px]">
                  <p className="text-[12.5px] font-extrabold text-slate-800 leading-snug">On Your First Booking</p>
                  <p className="text-[10px] font-semibold text-slate-400 leading-snug mt-0.5">Across Stays, Rentals, Adventures & More</p>
                </div>
              </div>

              {/* Coupon Code Copier */}
              <button 
                onClick={handleCopyCode}
                className="w-full flex items-center justify-between bg-white border border-slate-200/80 rounded-xl p-2 px-3 hover:border-[#0F766E] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span className="bg-[#0F766E] text-white text-[10px] font-black px-2.5 py-1 rounded-md">USE CODE</span>
                  <span className="text-[14px] font-black text-slate-800 tracking-wider">WELCOME20</span>
                </div>
                <div className="text-[#0F766E] flex items-center gap-1 text-[11px] font-bold">
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                      <span className="text-slate-500 group-hover:text-[#0F766E]">Copy</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#E6F4F1] flex items-center justify-center text-[#0F766E] mb-2 shadow-xs">
                  <Ticket className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </div>
                <p className="text-[11px] font-black text-slate-800 leading-tight">Best Prices</p>
                <p className="text-[9px] font-bold text-slate-400 mt-0.5">Guaranteed</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#EEF2FF] flex items-center justify-center text-indigo-600 mb-2 shadow-xs">
                  <Shield className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </div>
                <p className="text-[11px] font-black text-slate-800 leading-tight">Safe & Secure</p>
                <p className="text-[9px] font-bold text-slate-400 mt-0.5">Bookings</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#FFF7ED] flex items-center justify-center text-amber-600 mb-2 shadow-xs">
                  <Headset className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </div>
                <p className="text-[11px] font-black text-slate-800 leading-tight">24/7 Support</p>
                <p className="text-[9px] font-bold text-slate-400 mt-0.5">Always Here</p>
              </div>
            </div>
          </div>

          {/* CTA & Actions */}
          <div>
            <div className="flex items-center gap-5 mb-3.5">
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-[#0F766E] hover:bg-[#0D665F] text-white text-[13.5px] font-extrabold px-6 py-2.5 rounded-full flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-emerald-800/10 cursor-pointer"
              >
                <span>Explore Now</span>
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </button>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-slate-800 text-[13px] font-bold underline underline-offset-4 decoration-slate-300 hover:decoration-slate-500 transition-all cursor-pointer"
              >
                Maybe Later
              </button>
            </div>
            
            <p className="text-[9.5px] font-bold text-slate-400">
              *Offer valid for a limited time only.
            </p>
          </div>
        </div>

        {/* Right Side: Visual Image Graphic cropped & Countdown Overlay */}
        <div className="relative w-full md:w-[480px] h-[320px] md:h-auto overflow-hidden bg-[#EFFBF8] shrink-0">
          
          {/* Wrapper is twice the width of the container, aligned to the right. This completely hides the left 50% of the image (text side). */}
          <img 
            src={homeadImg} 
            alt="Promo Graphic" 
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            style={{ objectPosition: '70% center' }}
          />

          {/* Real Functional Countdown Timer Box (positioned on the right side over the illustration) */}
          <div className="absolute bottom-6 right-6 left-6 md:left-auto md:w-[320px] bg-white/90 backdrop-blur-xs border border-white/60 p-3 rounded-2xl shadow-lg z-20 flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider mb-2">Hurry! Offer ends in</span>
            
            <div className="flex gap-2">
              {/* Days */}
              <div className="flex flex-col items-center bg-[#E6F4F1] rounded-lg px-2 py-1 min-w-[48px]">
                <span className="text-[16px] font-black text-[#0F766E] leading-none">{formatTime(timeLeft.days)}</span>
                <span className="text-[8px] font-bold text-[#0F766E] uppercase mt-0.5">Days</span>
              </div>
              <span className="text-[#0F766E] font-black self-center">:</span>
              
              {/* Hours */}
              <div className="flex flex-col items-center bg-[#E6F4F1] rounded-lg px-2 py-1 min-w-[48px]">
                <span className="text-[16px] font-black text-[#0F766E] leading-none">{formatTime(timeLeft.hours)}</span>
                <span className="text-[8px] font-bold text-[#0F766E] uppercase mt-0.5">Hours</span>
              </div>
              <span className="text-[#0F766E] font-black self-center">:</span>

              {/* Mins */}
              <div className="flex flex-col items-center bg-[#E6F4F1] rounded-lg px-2 py-1 min-w-[48px]">
                <span className="text-[16px] font-black text-[#0F766E] leading-none">{formatTime(timeLeft.minutes)}</span>
                <span className="text-[8px] font-bold text-[#0F766E] uppercase mt-0.5">Mins</span>
              </div>
              <span className="text-[#0F766E] font-black self-center">:</span>

              {/* Secs */}
              <div className="flex flex-col items-center bg-[#E6F4F1] rounded-lg px-2 py-1 min-w-[48px]">
                <span className="text-[16px] font-black text-[#0F766E] leading-none">{formatTime(timeLeft.seconds)}</span>
                <span className="text-[8px] font-bold text-[#0F766E] uppercase mt-0.5">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Modal Close Button in Top Right */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white hover:bg-slate-100 shadow-md text-slate-700 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Close promotion modal"
        >
          <X className="h-5 w-5" strokeWidth={2.5} />
        </button>

      </div>
    </div>
  );
}
