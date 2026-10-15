import { useState } from 'react';
import { Tag, Calendar, Headset, Play, Apple, Search, Landmark, Compass, ShoppingBag, Utensils, Waves } from 'lucide-react';
import downloadAppBg from '../assets/bg.png';
import appQrCode from '../assets/app_qr_code.png';

export default function DownloadAppBanner() {
  return (
    <section className="w-full pb-12 pt-4 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card with generated background */}
        <div 
          className="rounded-[28px] border border-slate-200/50 p-5 md:py-5 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xs min-h-[200px] bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${downloadAppBg})` }}
        >
          
          {/* Left Side: Spacing placeholder to keep the background traveler fully visible */}
          <div className="w-full lg:w-[28%] shrink-0 h-6 lg:h-auto pointer-events-none z-10" />

          {/* Middle Side: Text Details + Feature Row */}
          <div className="flex-1 text-center lg:text-left z-10 lg:pl-4">
            <h3 className="text-[25px] sm:text-[28px] font-black text-slate-850 tracking-tight leading-tight">
              Travel Better with <span className="text-[#0F766E] block sm:inline">TripVerse App</span>
            </h3>
            <p className="text-[13px] sm:text-[14px] text-slate-500 font-semibold mt-2.5 max-w-[480px] leading-normal">
              Book on the go, get exclusive app-only deals and manage your trips with ease.
            </p>

            {/* Banner Feature List */}
            <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
              
              {/* Feature 1 */}
              <div className="flex items-center gap-2 max-w-[150px] text-left">
                <div className="h-8.5 w-8.5 rounded-full bg-[#E6F4F1] border border-emerald-100 flex items-center justify-center text-[#0F766E] shrink-0">
                  <Tag className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11.5px] font-extrabold text-slate-800 leading-tight">Exclusive Deals</p>
                  <p className="text-[9px] font-bold text-slate-400 mt-0.5 leading-tight">App-only offers just for you</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-2 max-w-[150px] text-left">
                <div className="h-8.5 w-8.5 rounded-full bg-[#E6F4F1] border border-emerald-100 flex items-center justify-center text-[#0F766E] shrink-0">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11.5px] font-extrabold text-slate-800 leading-tight">Easy Bookings</p>
                  <p className="text-[9px] font-bold text-slate-400 mt-0.5 leading-tight">Book stays, rentals & more in seconds</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-2 max-w-[150px] text-left">
                <div className="h-8.5 w-8.5 rounded-full bg-[#E6F4F1] border border-emerald-100 flex items-center justify-center text-[#0F766E] shrink-0">
                  <Headset className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11.5px] font-extrabold text-slate-800 leading-tight">Trip Management</p>
                  <p className="text-[9px] font-bold text-slate-400 mt-0.5 leading-tight">Manage bookings. We're here whenever you need</p>
                </div>
              </div>

            </div>
          </div>

          {/* Vertical Divider (Desktop Only) */}
          <div className="hidden lg:block h-20 w-px bg-slate-200/80 self-center z-10" />

          {/* Right Side: QR Code + OR + App Downloads */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 z-10">
            
            {/* QR Code Container */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10.5px] font-black text-[#0F766E] uppercase tracking-wider">Scan QR to Download</span>
              <div className="bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-md flex items-center justify-center h-28 w-28">
                <img 
                  src={appQrCode} 
                  alt="Download QR Code" 
                  className="w-full h-full object-contain select-none pointer-events-none"
                />
              </div>
            </div>

            {/* OR Separator (Custom Dashed Circle) */}
            <div className="flex sm:flex-col items-center gap-3 w-full sm:w-auto">
              <div className="h-px sm:h-12 w-full sm:w-px bg-slate-200/80" />
              <div className="h-9 w-9 rounded-full bg-white border border-dashed border-[#0F766E] flex items-center justify-center text-[10px] font-black text-[#0F766E] shrink-0 shadow-xs">
                OR
              </div>
              <div className="h-px sm:h-12 w-full sm:w-px bg-slate-200/80" />
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col gap-3 min-w-[155px]">
              
              {/* Google Play */}
              <a 
                href="#google-play"
                className="bg-black hover:bg-slate-900 text-white rounded-xl p-2 px-3.5 flex items-center gap-2.5 transition-all hover:scale-[1.03] active:scale-97 shadow-xs cursor-pointer text-left border border-slate-800"
              >
                <Play className="h-6 w-6 text-white fill-white" />
                <div>
                  <p className="text-[8px] font-extrabold uppercase text-slate-400 leading-none">GET IT ON</p>
                  <p className="text-[13px] font-bold text-white tracking-tight mt-0.5 leading-none">Google Play</p>
                </div>
              </a>

              {/* App Store */}
              <a 
                href="#app-store"
                className="bg-black hover:bg-slate-900 text-white rounded-xl p-2 px-3.5 flex items-center gap-2.5 transition-all hover:scale-[1.03] active:scale-97 shadow-xs cursor-pointer text-left border border-slate-800"
              >
                <Apple className="h-6 w-6 text-white fill-white" />
                <div>
                  <p className="text-[8px] font-extrabold uppercase text-slate-400 leading-none">Download on the</p>
                  <p className="text-[13px] font-bold text-white tracking-tight mt-0.5 leading-none">App Store</p>
                </div>
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
