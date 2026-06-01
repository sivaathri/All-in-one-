import { MapPin, Send } from 'lucide-react';

export default function Footer({ onNavigate = () => {} }) {
  return (
    <footer className="w-full bg-[#0B1519] border-t border-slate-800 text-slate-400">
      {/* Top Banner / Newsletter */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="text-lg font-bold text-white tracking-wide">
              Subscribe to our newsletter
            </h3>
            <p className="text-xs text-slate-400">
              Get the latest updates on new stays, rentals, and trending adventures.
            </p>
          </div>
          <div className="flex w-full md:w-auto max-w-md items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 p-1">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
            />
            <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white hover:bg-teal-800 active:scale-95 transition-all cursor-pointer">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Info */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-950/60 border border-teal-800/40">
                <MapPin className="h-6 w-6 text-primary" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-none">
                  Trip<span className="text-primary">Verse</span>
                </span>
                <span className="text-[10px] font-medium tracking-wide text-slate-500 mt-0.5">
                  Explore. Experience. Enjoy.
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs pt-2">
              Your ultimate travel companion for Pondicherry and beyond. Book rooms, rent bikes or cars, order food, secure tours, and call mechanic support, all in a single platform.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-primary hover:text-white transition-colors cursor-pointer" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-primary hover:text-white transition-colors cursor-pointer" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-primary hover:text-white transition-colors cursor-pointer" aria-label="Instagram">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-primary hover:text-white transition-colors cursor-pointer" aria-label="LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">Explore</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><a href="#stays" onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Hotels & Stays</a></li>
              <li><a href="#bike-rental" onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Bike Rentals</a></li>
              <li><a href="#car-rental" onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Car Rentals</a></li>
              <li><a href="#food-spots" onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Top Food Spots</a></li>
              <li><a href="#adventures" onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Adventures & paragliding</a></li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">Services</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><a href="#taxi-booking" onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Taxi Booking</a></li>
              <li><a href="#puncture-service" onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Puncture Repair</a></li>
              <li><a href="#mechanic-service" onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Mechanic Support</a></li>
              <li><a href="#tour-packages" onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Tour Packages</a></li>
              <li>
                <button
                  onClick={() => onNavigate('become-host')}
                  className="hover:text-primary transition-colors cursor-pointer border-none bg-transparent p-0 text-left text-xs font-semibold text-slate-400"
                >
                  Become a Host
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">Contact Us</h4>
            <ul className="space-y-3.5 text-xs font-semibold text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>124 French Quarter Lane,<br />Pondicherry, 605001, India</span>
              </li>
              <li>
                <span className="block text-slate-500 text-[10px] uppercase font-bold">Email</span>
                <a href="mailto:support@tripverse.com" className="hover:text-primary transition-colors text-white font-bold">support@tripverse.com</a>
              </li>
              <li>
                <span className="block text-slate-500 text-[10px] uppercase font-bold">Phone Support</span>
                <a href="tel:+914132224455" className="hover:text-primary transition-colors text-white font-bold">+91 (413) 222-4455</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#080E11] py-6 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-medium text-slate-500">
            &copy; {new Date().getFullYear()} TripVerse Technologies Private Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px] font-semibold text-slate-500">
            <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#sitemap" className="hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
