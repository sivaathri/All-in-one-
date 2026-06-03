import { MapPin, Compass, Car, Users, Headset, Tag, ShieldCheck, Mail, Phone, Clock } from 'lucide-react';

export default function Footer({ onNavigate = () => {} }) {
  return (
    <footer className="w-full bg-[#F8FAFC] border-t border-slate-200 text-slate-500">
      
      {/* Main Multi-Column Section */}
      <div className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-4">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4 text-left pr-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
              {/* TripVerse Pin Logo */}
              <div className="h-9 w-9 rounded-full bg-[#E6F4F1] flex items-center justify-center text-[#0F766E] border border-emerald-100/50">
                <MapPin className="h-5 w-5 fill-[#0F766E] text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[19px] font-black tracking-tight text-slate-800 leading-none">
                  Trip<span className="text-[#0F766E]">Verse</span>
                </span>
                <span className="text-[9px] font-bold tracking-wide text-slate-400 mt-0.5">
                  Explore. Experience. Enjoy.
                </span>
              </div>
            </div>
            <p className="text-[11.5px] font-semibold text-slate-500 leading-relaxed pt-1">
              Your ultimate travel companion for stays, rentals, food, adventures and more - all in one place.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a href="#" className="h-8 w-8 rounded-full border border-slate-200 bg-white hover:bg-[#0F766E] hover:text-white transition-all duration-200 flex items-center justify-center text-slate-600 cursor-pointer shadow-xs" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full border border-slate-200 bg-white hover:bg-[#0F766E] hover:text-white transition-all duration-200 flex items-center justify-center text-slate-600 cursor-pointer shadow-xs" aria-label="Instagram">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full border border-slate-200 bg-white hover:bg-[#0F766E] hover:text-white transition-all duration-200 flex items-center justify-center text-slate-600 cursor-pointer shadow-xs" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full border border-slate-200 bg-white hover:bg-[#0F766E] hover:text-white transition-all duration-200 flex items-center justify-center text-slate-600 cursor-pointer shadow-xs" aria-label="LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Vertical Divider (Desktop Only) */}
          <div className="hidden lg:block w-px bg-slate-200/60 h-40 self-center" />

          {/* Column 2: Explore */}
          <div className="space-y-4 text-left lg:pl-3">
            <h4 className="text-[12.5px] font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <Compass className="h-4 w-4 text-[#0F766E] shrink-0" />
              <span>Explore</span>
            </h4>
            <ul className="space-y-2 text-[12px] font-semibold text-slate-500">
              <li><a href="#stays" onClick={() => onNavigate('home')} className="hover:text-[#0F766E] transition-colors">Stays</a></li>
              <li><a href="#bike-rental" onClick={() => onNavigate('home')} className="hover:text-[#0F766E] transition-colors">Rentals</a></li>
              <li><a href="#food-spots" onClick={() => onNavigate('home')} className="hover:text-[#0F766E] transition-colors">Food Spots</a></li>
              <li><a href="#adventures" onClick={() => onNavigate('home')} className="hover:text-[#0F766E] transition-colors">Adventures</a></li>
              <li><a href="#attractions" className="hover:text-[#0F766E] transition-colors">Top Attractions</a></li>
              <li><a href="#guides" className="hover:text-[#0F766E] transition-colors">Travel Guides</a></li>
            </ul>
          </div>

          {/* Vertical Divider (Desktop Only) */}
          <div className="hidden lg:block w-px bg-slate-200/60 h-40 self-center" />

          {/* Column 3: Services */}
          <div className="space-y-4 text-left lg:pl-3">
            <h4 className="text-[12.5px] font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <Car className="h-4 w-4 text-[#0F766E] shrink-0" />
              <span>Services</span>
            </h4>
            <ul className="space-y-2 text-[12px] font-semibold text-slate-500">
              <li><a href="#taxi-booking" className="hover:text-[#0F766E] transition-colors">Taxi Booking</a></li>
              <li><a href="#puncture-service" className="hover:text-[#0F766E] transition-colors">Puncture Service</a></li>
              <li><a href="#mechanic-service" className="hover:text-[#0F766E] transition-colors">Mechanic Service</a></li>
              <li><a href="#tour-packages" className="hover:text-[#0F766E] transition-colors">Tour Packages</a></li>
              <li><a href="#airport-pickup" className="hover:text-[#0F766E] transition-colors">Airport Pickup</a></li>
              <li>
                <button
                  onClick={() => onNavigate('become-host')}
                  className="hover:text-[#0F766E] transition-colors cursor-pointer border-none bg-transparent p-0 text-[12px] font-semibold text-slate-500"
                >
                  Become a Host
                </button>
              </li>
            </ul>
          </div>

          {/* Vertical Divider (Desktop Only) */}
          <div className="hidden lg:block w-px bg-slate-200/60 h-40 self-center" />

          {/* Column 4: Company */}
          <div className="space-y-4 text-left lg:pl-3">
            <h4 className="text-[12.5px] font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <Users className="h-4 w-4 text-[#0F766E] shrink-0" />
              <span>Company</span>
            </h4>
            <ul className="space-y-2 text-[12px] font-semibold text-slate-500">
              <li><a href="#about" className="hover:text-[#0F766E] transition-colors">About Us</a></li>
              <li><a href="#careers" className="hover:text-[#0F766E] transition-colors">Careers</a></li>
              <li><a href="#partner" className="hover:text-[#0F766E] transition-colors">Partner with Us</a></li>
              <li><a href="#press" className="hover:text-[#0F766E] transition-colors">Press & Media</a></li>
              <li><a href="#blog" className="hover:text-[#0F766E] transition-colors">Blog</a></li>
              <li><a href="#contact" className="hover:text-[#0F766E] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Vertical Divider (Desktop Only) */}
          <div className="hidden lg:block w-px bg-slate-200/60 h-40 self-center" />

          {/* Column 5: Support */}
          <div className="space-y-4 text-left lg:pl-3">
            <h4 className="text-[12.5px] font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <Headset className="h-4 w-4 text-[#0F766E] shrink-0" />
              <span>Support</span>
            </h4>
            <ul className="space-y-2 text-[12px] font-semibold text-slate-500">
              <li><a href="#help" className="hover:text-[#0F766E] transition-colors">Help Center</a></li>
              <li><a href="#faqs" className="hover:text-[#0F766E] transition-colors">FAQs</a></li>
              <li><a href="#cancellation" className="hover:text-[#0F766E] transition-colors">Cancellation Policy</a></li>
              <li><a href="#terms" className="hover:text-[#0F766E] transition-colors">Terms of Service</a></li>
              <li><a href="#privacy" className="hover:text-[#0F766E] transition-colors">Privacy Policy</a></li>
              <li><a href="#report" className="hover:text-[#0F766E] transition-colors">Report an Issue</a></li>
            </ul>
          </div>

          {/* Vertical Divider (Desktop Only) */}
          <div className="hidden lg:block w-px bg-slate-200/60 h-40 self-center" />

          {/* Column 6: Get in Touch */}
          <div className="space-y-4 text-left lg:pl-3">
            <h4 className="text-[12.5px] font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <MapPin className="h-4 w-4 text-[#0F766E] shrink-0" />
              <span>Get in Touch</span>
            </h4>
            <ul className="space-y-3.5 text-[11.5px] font-semibold text-slate-500">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#0F766E] shrink-0 mt-0.5" />
                <span>124 French Quarter Lane,<br />Pondicherry, 605001, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#0F766E] shrink-0" />
                <a href="mailto:support@tripverse.com" className="hover:text-[#0F766E] transition-colors">support@tripverse.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#0F766E] shrink-0" />
                <a href="tel:+914132224455" className="hover:text-[#0F766E] transition-colors">+91 (413) 222-4455</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#0F766E] shrink-0" />
                <span>Mon - Sun: 9:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Trust Indicators & Brand Rights */}
      <div className="bg-[#EFF6F8] py-8 border-t border-slate-200/80">
        <div className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row items-center justify-between gap-6">
          
          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 xl:gap-8 text-left">
            {/* Tag 1 */}
            <div className="flex items-center gap-2.5">
              <div className="h-8.5 w-8.5 rounded-full bg-[#E6F4F1] border border-emerald-100 flex items-center justify-center text-[#0F766E] shrink-0 shadow-xs">
                <Tag className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[11px] font-black text-slate-800 leading-tight">Exclusive Deals</p>
                <p className="text-[9px] font-bold text-slate-400 leading-tight mt-0.5">App-only offers just for you</p>
              </div>
            </div>

            {/* Tag 2 */}
            <div className="flex items-center gap-2.5">
              <div className="h-8.5 w-8.5 rounded-full bg-[#E6F4F1] border border-emerald-100 flex items-center justify-center text-[#0F766E] shrink-0 shadow-xs">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[11px] font-black text-slate-800 leading-tight">Easy Bookings</p>
                <p className="text-[9px] font-bold text-slate-400 leading-tight mt-0.5">Book in seconds, anytime, anywhere</p>
              </div>
            </div>

            {/* Tag 3 */}
            <div className="flex items-center gap-2.5">
              <div className="h-8.5 w-8.5 rounded-full bg-[#E6F4F1] border border-emerald-100 flex items-center justify-center text-[#0F766E] shrink-0 shadow-xs">
                <Headset className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[11px] font-black text-slate-800 leading-tight">Trip Management</p>
                <p className="text-[9px] font-bold text-slate-400 leading-tight mt-0.5">Manage your trips with ease</p>
              </div>
            </div>

            {/* Tag 4 */}
            <div className="flex items-center gap-2.5">
              <div className="h-8.5 w-8.5 rounded-full bg-[#E6F4F1] border border-emerald-100 flex items-center justify-center text-[#0F766E] shrink-0 shadow-xs">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[11px] font-black text-slate-800 leading-tight">Secure Payments</p>
                <p className="text-[9px] font-bold text-slate-400 leading-tight mt-0.5">Your transactions are safe and secure</p>
              </div>
            </div>
          </div>

          {/* Copyright & Payment Brands */}
          <div className="flex flex-col sm:flex-row items-center gap-6 xl:gap-8 z-10">
            {/* Copyright */}
            <p className="text-[11px] font-bold text-slate-400 text-center sm:text-left">
              &copy; {new Date().getFullYear()} TripVerse Technologies Pvt. Ltd. All rights reserved.
            </p>

            {/* Simulated Payment Badges */}
            <div className="flex items-center gap-2">
              {/* Visa */}
              <div className="h-6 w-11 bg-white border border-slate-200 rounded flex items-center justify-center px-1 shadow-xs">
                <span className="text-[10px] font-black italic tracking-wide text-blue-800">VISA</span>
              </div>
              
              {/* Mastercard */}
              <div className="h-6 w-11 bg-white border border-slate-200 rounded flex items-center justify-center gap-0.5 px-1 shadow-xs">
                <div className="h-3.5 w-3.5 rounded-full bg-red-500 opacity-90" />
                <div className="h-3.5 w-3.5 rounded-full bg-amber-500 opacity-90 -ml-1.5" />
              </div>

              {/* UPI */}
              <div className="h-6 w-11 bg-white border border-slate-200 rounded flex items-center justify-center px-1 shadow-xs">
                <span className="text-[7.5px] font-black tracking-tight text-emerald-600">UPI</span>
              </div>

              {/* Paytm */}
              <div className="h-6 w-11 bg-white border border-slate-200 rounded flex items-center justify-center px-1 shadow-xs">
                <span className="text-[8px] font-extrabold tracking-tighter text-sky-500">paytm</span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </footer>
  );
}
