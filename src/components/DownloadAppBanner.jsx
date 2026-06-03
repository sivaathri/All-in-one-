import { useState } from 'react';
import { Tag, Calendar, Headset, Play, Apple, Search, Landmark, Compass, ShoppingBag, Utensils, Waves } from 'lucide-react';
import becameBg from '../assets/becameBG.png';

export default function DownloadAppBanner() {
  return (
    <section className="w-full pb-12 pt-4 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card with becameBg as background */}
        <div 
          className="rounded-[28px] border border-slate-200/50 p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xs min-h-[280px] bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${becameBg})` }}
        >
          
          {/* Left Side: Mock Tilted Smartphone Display (Large, overflowing bottom) */}
          <div className="w-full lg:w-[28%] flex justify-center shrink-0 relative lg:-mb-24 mt-2 lg:mt-6 z-10">
            {/* Phone Container with Rotation */}
            <div className="relative w-[210px] h-[370px] bg-slate-900 rounded-[36px] border-[6px] border-slate-800 shadow-2xl rotate-[-12deg] transform hover:rotate-[-5deg] transition-all duration-500 ease-out overflow-hidden flex flex-col">
              {/* Notch / Dynamic Island */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black rounded-full z-30" />
              
              {/* Phone Content Screen */}
              <div className="absolute inset-0 bg-slate-50 p-2.5 pt-7 flex flex-col gap-2 overflow-y-auto no-scrollbar">
                
                {/* TripVerse Header */}
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="h-4.5 w-4.5 bg-[#0F766E] rounded-md flex items-center justify-center text-[10px] text-white font-black">T</div>
                  <span className="text-[12.5px] font-black text-slate-800 tracking-tight">TripVerse</span>
                </div>
                <span className="text-[7.5px] font-bold text-slate-400 -mt-1.5">Explore. Experience. Enjoy.</span>

                {/* Simulated Search Bar */}
                <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 rounded-lg p-1 px-2 mt-1">
                  <Search className="h-2.5 w-2.5 text-slate-400" />
                  <span className="text-[8px] text-slate-400 font-semibold">Search stays, rentals, food...</span>
                </div>

                {/* Simulated Categories Grid */}
                <div className="grid grid-cols-4 gap-1.5 mt-1">
                  <div className="flex flex-col items-center">
                    <div className="h-5 w-5 bg-teal-50 rounded-full flex items-center justify-center text-[#0F766E] border border-teal-100/50">
                      <Landmark className="h-2.5 w-2.5" />
                    </div>
                    <span className="text-[6px] font-bold text-slate-500 mt-1">Stays</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-5 w-5 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 border border-blue-100/50">
                      <Waves className="h-2.5 w-2.5" />
                    </div>
                    <span className="text-[6px] font-bold text-slate-500 mt-1">Rentals</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-5 w-5 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 border border-rose-100/50">
                      <Utensils className="h-2.5 w-2.5" />
                    </div>
                    <span className="text-[6px] font-bold text-slate-500 mt-1">Food</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-5 w-5 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 border border-amber-100/50">
                      <Compass className="h-2.5 w-2.5" />
                    </div>
                    <span className="text-[6px] font-bold text-slate-500 mt-1">Adventures</span>
                  </div>
                </div>

                {/* Section Header */}
                <div className="flex justify-between items-center mt-2 px-0.5">
                  <span className="text-[8.5px] font-black text-slate-800">Top Picks for You</span>
                  <span className="text-[6.5px] font-bold text-[#0F766E] hover:underline cursor-pointer">View All</span>
                </div>

                {/* Simulated Horizontally Scrollable Cards */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  
                  {/* Card 1 */}
                  <div className="border border-slate-100 rounded-lg p-1 bg-white shrink-0 w-[65px] flex flex-col gap-0.5">
                    <div className="h-10 w-full rounded-md bg-slate-200 overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=80&q=80" className="h-full w-full object-cover" />
                    </div>
                    <span className="text-[6.5px] font-extrabold text-slate-800 line-clamp-1">Sea Breeze</span>
                    <span className="text-[5.5px] text-slate-400">Pondicherry</span>
                    <span className="text-[6px] font-bold text-[#0F766E]">★ 4.6</span>
                  </div>

                  {/* Card 2 */}
                  <div className="border border-slate-100 rounded-lg p-1 bg-white shrink-0 w-[65px] flex flex-col gap-0.5">
                    <div className="h-10 w-full rounded-md bg-slate-200 overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=80&q=80" className="h-full w-full object-cover" />
                    </div>
                    <span className="text-[6.5px] font-extrabold text-slate-800 line-clamp-1">Cafe Xtasi</span>
                    <span className="text-[5.5px] text-slate-400">Pondicherry</span>
                    <span className="text-[6px] font-bold text-[#0F766E]">★ 4.5</span>
                  </div>

                  {/* Card 3 */}
                  <div className="border border-slate-100 rounded-lg p-1 bg-white shrink-0 w-[65px] flex flex-col gap-0.5">
                    <div className="h-10 w-full rounded-md bg-slate-200 overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=80&q=80" className="h-full w-full object-cover" />
                    </div>
                    <span className="text-[6.5px] font-extrabold text-slate-800 line-clamp-1">Scuba Diving</span>
                    <span className="text-[5.5px] text-slate-400">Pondicherry</span>
                    <span className="text-[6px] font-bold text-[#0F766E]">★ 4.8</span>
                  </div>

                </div>

              </div>
            </div>
          </div>

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
          <div className="hidden lg:block h-28 w-px bg-slate-200/80 self-center z-10" />

          {/* Right Side: QR Code + OR + App Downloads */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 z-10">
            
            {/* QR Code Container */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10.5px] font-black text-[#0F766E] uppercase tracking-wider">Scan QR to Download</span>
              <div className="bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-md flex items-center justify-center h-28 w-28">
                {/* SVG QR Code Mock */}
                <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-800">
                  {/* Position Finders */}
                  <rect x="0" y="0" width="30" height="30" />
                  <rect x="5" y="5" width="20" height="20" fill="white" />
                  <rect x="10" y="10" width="10" height="10" />

                  <rect x="70" y="0" width="30" height="30" />
                  <rect x="75" y="5" width="20" height="20" fill="white" />
                  <rect x="80" y="10" width="10" height="10" />

                  <rect x="0" y="70" width="30" height="30" />
                  <rect x="5" y="75" width="20" height="20" fill="white" />
                  <rect x="10" y="80" width="10" height="10" />

                  {/* Alignment & Code Details (Mock patterns) */}
                  <rect x="40" y="10" width="10" height="10" />
                  <rect x="50" y="20" width="10" height="10" />
                  <rect x="35" y="40" width="15" height="15" />
                  <rect x="75" y="45" width="10" height="15" />
                  <rect x="55" y="60" width="20" height="10" />
                  <rect x="40" y="80" width="10" height="10" />
                  <rect x="85" y="85" width="15" height="15" />
                  <rect x="45" y="85" width="10" height="10" />
                  <rect x="80" y="70" width="10" height="10" />
                </svg>
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
