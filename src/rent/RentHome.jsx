import { useState } from 'react';
import { Search, Calendar, MapPin, Compass, ShieldCheck, HelpCircle, ArrowRight, Star } from 'lucide-react';

// Reusing vehicle images from assets
import rentYamahaImg from '../assets/rent_yamaha.png';
import rentEnfieldImg from '../assets/rent_enfield.png';
import rentActivaImg from '../assets/rent_activa.png';
import rentKtmImg from '../assets/rent_ktm.png';
import rentGlanzaImg from '../assets/rent_glanza.png';
import rentSwiftImg from '../assets/rent_swift.png';
import rentTharImg from '../assets/rent_thar.png';
import rentNexonImg from '../assets/car_rental.png';

const POPULAR_VEHICLES = [
  { id: 1, title: 'Yamaha R15 V4', type: 'Bike', category: 'Sports', image: rentYamahaImg, price: 600, rating: 4.8, reviews: 42, spec: '155cc • 45 km/l' },
  { id: 2, title: 'Royal Enfield Classic 350', type: 'Bike', category: 'Cruiser', image: rentEnfieldImg, price: 800, rating: 4.9, reviews: 108, spec: '350cc • 35 km/l' },
  { id: 3, title: 'Toyota Glanza', type: 'Car', category: 'Hatchback', image: rentGlanzaImg, price: 1500, rating: 4.7, reviews: 29, spec: 'Petrol • Automatic' },
  { id: 4, title: 'Mahindra Thar 4x4', type: 'Car', category: 'SUV', image: rentTharImg, price: 3000, rating: 4.9, reviews: 67, spec: 'Diesel • Manual • 4WD' },
  { id: 5, title: 'KTM Duke 390', type: 'Bike', category: 'Sports', image: rentKtmImg, price: 900, rating: 4.8, reviews: 54, spec: '373cc • 30 km/l' },
  { id: 6, title: 'Tata Nexon SUV', type: 'Car', category: 'SUV', image: rentNexonImg, price: 2200, rating: 4.8, reviews: 88, spec: 'Petrol • Automatic' },
];

export default function RentHome({ onSearch, onSelectVehicle }) {
  const [vehicleType, setVehicleType] = useState('All'); // 'All' | 'Car' | 'Bike'
  const [location, setLocation] = useState('Pondicherry, India');
  const [pickUpDate, setPickUpDate] = useState('2025-06-21');
  const [dropOffDate, setDropOffDate] = useState('2025-06-25');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({
      location,
      pickUpDate,
      dropOffDate,
      vehicleType
    });
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-16 animate-in fade-in duration-300">
      
      {/* Search & Hero Header */}
      <div className="bg-gradient-to-b from-[#EFFBF8] via-[#E6F4F1] to-slate-50 pt-8 pb-14 border-b border-slate-100">
        <div className="mx-auto max-w-[1360px] px-4 text-center">
          
          <span className="text-[12.5px] font-extrabold tracking-widest text-[#0F766E] uppercase block mb-3">
            TRIPVERSE RENTALS
          </span>
          
          <h1 className="text-[34px] sm:text-[44px] md:text-[50px] font-black text-slate-900 leading-tight tracking-tight mb-4">
            Ride Pondicherry on Your <span className="text-[#0F766E]">Own Terms</span>
          </h1>
          
          <p className="text-[14px] sm:text-[16px] text-slate-500 font-semibold mb-8 max-w-xl mx-auto">
            Rent top-quality bikes and cars for a day, week, or month. Clear daily pricing with full support.
          </p>

          {/* Search Card Panel */}
          <form 
            onSubmit={handleSearchSubmit}
            className="max-w-[960px] mx-auto bg-white rounded-3xl border border-slate-200/80 p-4 md:p-6 shadow-xl flex flex-col gap-4 text-left"
          >
            {/* Toggles */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3.5">
              {['All', 'Car', 'Bike'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setVehicleType(t)}
                  className={`px-4.5 py-1.5 rounded-full text-xs font-black tracking-wide cursor-pointer transition-all duration-200 ${
                    vehicleType === t 
                      ? 'bg-[#0F766E] text-white shadow-md shadow-teal-800/10'
                      : 'bg-slate-100 text-slate-650 hover:bg-slate-200/80'
                  }`}
                >
                  {t}s
                </button>
              ))}
            </div>

            {/* Inputs Panel Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Location Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-[#0F766E]" />
                  <span>Pick-up Location</span>
                </label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-slate-800 focus:outline-hidden focus:border-[#0F766E] transition-colors"
                  required
                />
              </div>

              {/* Pick up date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-1 flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-[#0F766E]" />
                  <span>Pick-up Date</span>
                </label>
                <input 
                  type="date" 
                  value={pickUpDate}
                  onChange={(e) => setPickUpDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-slate-800 focus:outline-hidden focus:border-[#0F766E] transition-colors"
                  required
                />
              </div>

              {/* Drop off date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-1 flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-[#0F766E]" />
                  <span>Drop-off Date</span>
                </label>
                <input 
                  type="date" 
                  value={dropOffDate}
                  onChange={(e) => setDropOffDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-slate-800 focus:outline-hidden focus:border-[#0F766E] transition-colors"
                  required
                />
              </div>

            </div>

            {/* Submit Bar */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-1">
              <span className="text-[11.5px] font-semibold text-slate-450 pl-1">
                *Insurance & maintenance cover included.
              </span>
              <button
                type="submit"
                className="bg-[#0F766E] hover:bg-[#0D665F] text-white text-[13.5px] font-extrabold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 hover:scale-[1.03] active:scale-97 shadow-md shadow-emerald-800/10 cursor-pointer"
              >
                <Search className="h-4 w-4" />
                <span>Search Fleets</span>
              </button>
            </div>

          </form>

        </div>
      </div>

      {/* Popular Vehicles Section */}
      <div className="mx-auto max-w-[1360px] px-4 py-16">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-left">
            <h2 className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight leading-tight">
              Featured Fleet
            </h2>
            <span className="text-[12.5px] font-semibold text-slate-450">
              Popular self-drive rentals in Pondicherry
            </span>
          </div>
          <button
            onClick={() => onSearch({ location, pickUpDate, dropOffDate, vehicleType })}
            className="flex items-center gap-1 text-sm font-extrabold text-[#0F766E] hover:underline transition-all cursor-pointer"
          >
            <span>See All Vehicles</span>
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_VEHICLES.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => onSelectVehicle(vehicle)}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col text-left"
            >
              {/* Image Section */}
              <div className="h-[180px] w-full bg-slate-100/50 flex items-center justify-center p-4 relative">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.title} 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#E6F4F1] text-[#0F766E] text-[9.5px] font-extrabold px-2 py-0.5 rounded-md border border-emerald-100/30">
                  {vehicle.category}
                </span>
                <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-100 flex items-center gap-1 shadow-xs">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span>{vehicle.rating}</span>
                </span>
              </div>

              {/* Info Section */}
              <div className="p-4.5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-[16px] font-extrabold text-slate-850 tracking-tight leading-snug">
                    {vehicle.title}
                  </h3>
                  <p className="text-[11.5px] font-bold text-slate-400 mt-0.5">
                    {vehicle.spec}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-4">
                  <div>
                    <span className="text-[18px] font-black text-[#0F766E]">₹{vehicle.price}</span>
                    <span className="text-[11px] font-semibold text-slate-400"> / day</span>
                  </div>
                  <button className="text-[12px] font-extrabold bg-slate-100 group-hover:bg-[#0F766E] group-hover:text-white px-3 py-1.5 rounded-lg transition-all duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Rent Block */}
      <div className="mx-auto max-w-[1360px] px-4 pb-8">
        <div className="bg-gradient-to-r from-teal-900 to-emerald-950 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 text-left shadow-lg">
          
          <div className="max-w-md">
            <span className="text-[10px] font-black text-emerald-350 tracking-[0.1em] uppercase">Guaranteed Security</span>
            <h3 className="text-[25px] font-black leading-tight tracking-tight mt-1.5 mb-3">
              TripVerse Care keeps you moving safely
            </h3>
            <p className="text-[13.5px] text-teal-150 leading-relaxed font-medium">
              We stand by our clients 24/7. Travel freely knowing your ride is fully covered and supported.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full md:w-auto">
            {/* Item 1 */}
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-teal-850 flex items-center justify-center shrink-0 border border-teal-800">
                <ShieldCheck className="h-5 w-5 text-emerald-450" />
              </div>
              <div>
                <p className="text-[13.5px] font-black">Zero Deposit</p>
                <p className="text-[11px] text-teal-200 mt-0.5">Flexible trust bookings</p>
              </div>
            </div>
            {/* Item 2 */}
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-teal-850 flex items-center justify-center shrink-0 border border-teal-800">
                <Compass className="h-5 w-5 text-emerald-450" />
              </div>
              <div>
                <p className="text-[13.5px] font-black">Free Roadside</p>
                <p className="text-[11px] text-teal-200 mt-0.5">Anywhere in Pondicherry</p>
              </div>
            </div>
            {/* Item 3 */}
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-teal-850 flex items-center justify-center shrink-0 border border-teal-800">
                <HelpCircle className="h-5 w-5 text-emerald-450" />
              </div>
              <div>
                <p className="text-[13.5px] font-black">Clean Vehicles</p>
                <p className="text-[11px] text-teal-200 mt-0.5">Fully sanitized rides</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
