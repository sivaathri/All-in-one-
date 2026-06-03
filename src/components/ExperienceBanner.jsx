import { useState } from 'react';
import { Send, Check, Ticket, Shield, Headset } from 'lucide-react';
import bannerImg from '../assets/banner.png';

export default function ExperienceBanner() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section className="w-full pb-12 pt-4 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card Container */}
        <div className="bg-gradient-to-r from-[#EFFBF8] via-[#EBF9F6] to-slate-50 rounded-[28px] border border-slate-200/50 p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xs">
          
          {/* Left Side: Illustration Graphic */}
          <div className="w-full lg:w-[28%] h-[200px] lg:h-[160px] relative shrink-0 flex items-center justify-center">
            <img 
              src={bannerImg} 
              alt="Pondicherry Experience" 
              className="w-full h-full object-contain select-none pointer-events-none"
            />
          </div>

          {/* Middle Side: Title + Key Trust Indicators */}
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-[22px] sm:text-[25px] font-black text-slate-800 tracking-tight leading-tight">
              Your Pondicherry Experience <br />
              <span className="text-[#0F766E]">Starts Here!</span>
            </h3>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-5 mt-6">
              
              {/* Best Price */}
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-[#E6F4F1] flex items-center justify-center text-[#0F766E] border border-emerald-100/50 shrink-0">
                  <Ticket className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-[12px] font-extrabold text-slate-800 leading-tight">Best Price</p>
                  <p className="text-[10px] font-semibold text-slate-400">Guaranteed</p>
                </div>
              </div>

              <div className="hidden sm:block h-8 w-px bg-slate-200/80 self-center" />

              {/* 24/7 Support */}
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-[#E6F4F1] flex items-center justify-center text-[#0F766E] border border-emerald-100/50 shrink-0">
                  <Headset className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-[12px] font-extrabold text-slate-800 leading-tight">24/7 Support</p>
                  <p className="text-[10px] font-semibold text-slate-400">Always Here</p>
                </div>
              </div>

              <div className="hidden sm:block h-8 w-px bg-slate-200/80 self-center" />

              {/* Trusted & Safe */}
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-[#E6F4F1] flex items-center justify-center text-[#0F766E] border border-emerald-100/50 shrink-0">
                  <Shield className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-[12px] font-extrabold text-slate-800 leading-tight">Trusted & Safe</p>
                  <p className="text-[10px] font-semibold text-slate-400">Verified Hosts</p>
                </div>
              </div>

            </div>
          </div>

          {/* Vertical Divider (Desktop Only) */}
          <div className="hidden lg:block h-28 w-px bg-slate-200/80 self-center" />

          {/* Right Side: Newsletter Subscription Box */}
          <div className="w-full lg:w-[35%] bg-white/50 border border-white/80 p-5 rounded-2xl shadow-xs text-left">
            <h4 className="text-[13px] font-bold text-slate-700 leading-snug">
              Get exclusive deals & travel tips
            </h4>
            <p className="text-[11.5px] text-slate-400 font-semibold mt-0.5 mb-3.5">
              straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder={subscribed ? "Thank you!" : "Enter your email"}
                  value={email}
                  disabled={subscribed}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-white border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#0F766E] transition-colors ${
                    subscribed ? "text-emerald-600 bg-emerald-50/20 border-emerald-200" : ""
                  }`}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={subscribed}
                className="bg-[#0F766E] hover:bg-[#0D665F] text-white p-2.5 px-4 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shrink-0 cursor-pointer shadow-xs disabled:bg-emerald-600 disabled:scale-100"
                aria-label="Subscribe to newsletter"
              >
                {subscribed ? (
                  <Check className="h-4.5 w-4.5" strokeWidth={3} />
                ) : (
                  <Send className="h-4.5 w-4.5" strokeWidth={2.5} />
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
