import { useState, useMemo } from 'react';
import { 
  Calendar, MapPin, Star, Heart, ArrowRight, Grid, List, 
  ChevronDown, SlidersHorizontal, ShieldCheck, DollarSign, Clock, Phone, Award,
  Fuel, Gauge, Zap
} from 'lucide-react';

// Reusing vehicle images from assets
import rentYamahaImg from '../assets/rent_yamaha.png';
import rentEnfieldImg from '../assets/rent_enfield.png';
import rentActivaImg from '../assets/rent_activa.png';
import rentKtmImg from '../assets/rent_ktm.png';
import rentGlanzaImg from '../assets/rent_glanza.png';
import rentSwiftImg from '../assets/rent_swift.png';
import rentTharImg from '../assets/rent_thar.png';
import rentNexonImg from '../assets/car_rental.png';
import rentalsBannerImg from '../assets/rentalhomebg.png';

const FLEET_DATA = [
  // Bikes
  { id: 1, title: 'Yamaha R15 V4', type: 'Bike', category: 'Sports Bike', image: rentYamahaImg, price: 699, rating: 4.7, reviews: 125, spec: '155cc • Petrol', badge: 'Popular' },
  { id: 2, title: 'Royal Enfield Classic 350', type: 'Bike', category: 'Cruiser Bike', image: rentEnfieldImg, price: 899, rating: 4.8, reviews: 210, spec: '349cc • Petrol', badge: 'Best Seller' },
  { id: 3, title: 'KTM Duke 250', type: 'Bike', category: 'Sports Bike', image: rentKtmImg, price: 849, rating: 4.6, reviews: 98, spec: '249cc • Petrol', badge: 'Popular' },
  
  // Scooters (integrated under Bike tab for mockup match)
  { id: 4, title: 'Honda Activa 6G', type: 'Scooter', category: 'Scooter', image: rentActivaImg, price: 399, rating: 4.5, reviews: 163, spec: '110cc • Petrol', badge: 'New' },
  
  { id: 5, title: 'Bajaj Pulsar NS200', type: 'Bike', category: 'Sports Bike', image: rentYamahaImg, price: 599, rating: 4.6, reviews: 87, spec: '199cc • Petrol', badge: '' },
  { id: 6, title: 'Honda Hornet 2.0', type: 'Bike', category: 'Sports Bike', image: rentKtmImg, price: 549, rating: 4.4, reviews: 64, spec: '184cc • Petrol', badge: '' },
  
  // Scooters (integrated under Bike tab for mockup match)
  { id: 7, title: 'TVS Jupiter 125', type: 'Scooter', category: 'Scooter', image: rentActivaImg, price: 449, rating: 4.5, reviews: 103, spec: '125cc • Petrol', badge: '' },
  
  { id: 8, title: 'Royal Enfield Meteor 350', type: 'Bike', category: 'Cruiser Bike', image: rentEnfieldImg, price: 999, rating: 4.8, reviews: 142, spec: '349cc • Petrol', badge: '' },
  
  // Cars
  { id: 9, title: 'Toyota Glanza', type: 'Car', category: 'Hatchback', image: rentGlanzaImg, price: 1500, rating: 4.7, reviews: 29, spec: 'Petrol • Automatic', badge: 'Best Seller' },
  { id: 10, title: 'Mahindra Thar 4x4', type: 'Car', category: 'SUV', image: rentTharImg, price: 3000, rating: 4.9, reviews: 67, spec: 'Diesel • Manual', badge: 'Popular' },
  { id: 11, title: 'Maruti Swift', type: 'Car', category: 'Hatchback', image: rentSwiftImg, price: 1200, rating: 4.6, reviews: 45, spec: 'Petrol • Manual', badge: '' },
  { id: 12, title: 'Tata Nexon SUV', type: 'Car', category: 'SUV', image: rentNexonImg, price: 2200, rating: 4.8, reviews: 88, spec: 'Petrol • Automatic', badge: '' },

  // Bicycles
  { id: 13, title: 'Hercules Roadeo hybrid', type: 'Bicycle', category: 'Hybrid', image: rentYamahaImg, price: 199, rating: 4.3, reviews: 31, spec: '21-Speed • Manual', badge: 'Popular' },
  { id: 14, title: 'Firefox Target MTB', type: 'Bicycle', category: 'Mountain', image: rentKtmImg, price: 299, rating: 4.4, reviews: 18, spec: '24-Speed • Manual', badge: '' },

  // Electric (support Electric filter)
  { id: 15, title: 'Revolt RV400', type: 'Bike', category: 'Electric Bike', image: rentYamahaImg, price: 699, rating: 4.7, reviews: 88, spec: 'Electric • 150km Range', badge: 'New' },
  { id: 16, title: 'Ather 450X', type: 'Scooter', category: 'Electric Scooter', image: rentActivaImg, price: 549, rating: 4.8, reviews: 112, spec: 'Electric • 110km Range', badge: 'Popular' }
];

function formatDateString(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // 0-based
  const day = parseInt(parts[2], 10);
  
  const d = new Date(year, month, day);
  if (isNaN(d.getTime())) return dateStr;
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const mStr = months[d.getMonth()];
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const wStr = weekdays[d.getDay()];
  
  return `${day} ${mStr} ${year}, ${wStr}`;
}

export default function RentHome({ onSearch, onSelectVehicle }) {
  const [activeTab, setActiveTab] = useState('Bike'); // 'Bike' | 'Car' | 'Scooter' | 'Bicycle'
  const [location, setLocation] = useState('Pondicherry, India');
  const [pickUpDate, setPickUpDate] = useState('2025-06-21');
  const [pickUpTime, setPickUpTime] = useState('10:00 AM');
  const [dropOffDate, setDropOffDate] = useState('2025-06-25');
  const [dropOffTime, setDropOffTime] = useState('10:00 AM');
  const [priceMin, setPriceMin] = useState(200);
  const [priceMax, setPriceMax] = useState(1500);
  const [selectedTypes, setSelectedTypes] = useState(['All']);
  const [sortBy, setSortBy] = useState('popular');
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' | 'list'
  
  // Local wishlist state for user interaction
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(wId => wId !== id) : [...prev, id]
    );
  };

  const handleTypeToggle = (type) => {
    if (type === 'All') {
      setSelectedTypes(['All']);
    } else {
      setSelectedTypes(prev => {
        const withoutAll = prev.filter(t => t !== 'All');
        if (withoutAll.includes(type)) {
          const next = withoutAll.filter(t => t !== type);
          return next.length === 0 ? ['All'] : next;
        } else {
          return [...withoutAll, type];
        }
      });
    }
  };

  // Filter & Sort calculation
  const filteredVehicles = useMemo(() => {
    let list = [];
    // If activeTab is Bike, show both Bikes and Scooters to match the mockup grid exactly
    if (activeTab === 'Bike') {
      list = FLEET_DATA.filter(item => item.type === 'Bike' || item.type === 'Scooter');
    } else {
      list = FLEET_DATA.filter(item => item.type === activeTab);
    }

    // Price Filter (double range slider)
    list = list.filter(item => {
      if (priceMax >= 1500) {
        return item.price >= priceMin;
      }
      return item.price >= priceMin && item.price <= priceMax;
    });

    // Type Filter (applies to Bike category checkboxes in mockup)
    if (activeTab === 'Bike' && !selectedTypes.includes('All')) {
      list = list.filter(item => {
        if (selectedTypes.includes('Sports') && item.category.includes('Sports')) return true;
        if (selectedTypes.includes('Cruiser') && item.category.includes('Cruiser')) return true;
        if (selectedTypes.includes('Scooter') && item.category.includes('Scooter')) return true;
        if (selectedTypes.includes('Electric') && item.category.includes('Electric')) return true;
        return false;
      });
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeTab, priceMin, priceMax, selectedTypes, sortBy]);

  const handleApplyFilters = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        location,
        pickUpDate,
        dropOffDate,
        vehicleType: activeTab
      });
    }
  };

  const handleResetFilters = () => {
    setLocation('Pondicherry, India');
    setPickUpDate('2025-06-21');
    setPickUpTime('10:00 AM');
    setDropOffDate('2025-06-25');
    setDropOffTime('10:00 AM');
    setPriceMin(200);
    setPriceMax(1500);
    setSelectedTypes(['All']);
    setSortBy('popular');
  };

  // Dynamic counts for tab labels
  const tabCounts = {
    Bike: 350,
    Car: 280,
    Scooter: 180,
    Bicycle: 90
  };

  const timeOptions = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  return (
    <div className="w-full bg-[#FAFBFD] min-h-screen pb-16 rent-page-enter">
      
      {/* ─── BREADCRUMBS & BANNER HEADER ─── */}
      <div 
        className="w-full h-[340px] bg-cover bg-center relative flex flex-col justify-between p-6 sm:p-10 text-left border-b border-slate-200/50"
        style={{ backgroundImage: `url(${rentalsBannerImg})` }}
      >
        {/* Banner Glass Tint Overlay */}
        <div className="absolute inset-0 z-0" />

        {/* Text Area */}
        <div className="relative z-10 pt-4 max-w-2xl text-left">
          
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-[#0F172A]">
            Rent Your <span className="text-[#0D9488]">Perfect Ride</span>
          </h1>
          <p className="text-[14.5px] sm:text-[16px] font-semibold text-slate-655 mt-3.5 tracking-wide">
            Bikes, Cars, Scooters & Bicycles – Anytime, Anywhere
          </p>

          {/* Single Badges Pill Capsule */}
          <div className="mt-7 bg-white/95 border border-slate-200/60 shadow-sm rounded-full py-3 px-8 flex flex-wrap items-center gap-x-6 gap-y-2 w-fit">
            <div className="flex items-center gap-2 text-[12.5px] font-extrabold text-[#0F172A]">
              <svg className="h-4.5 w-4.5 text-[#0F172A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
              <span>Best Prices</span>
            </div>
            
            <div className="flex items-center gap-2 text-[12.5px] font-extrabold text-[#0F172A]">
              <svg className="h-4.5 w-4.5 text-[#0F172A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>Verified Vehicles</span>
            </div>
            
            <div className="flex items-center gap-2 text-[12.5px] font-extrabold text-[#0F172A]">
              <svg className="h-4.5 w-4.5 text-[#0F172A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
              <span>24/7 Support</span>
            </div>
            
            <div className="flex items-center gap-2 text-[12.5px] font-extrabold text-[#0F172A]">
              <svg className="h-4.5 w-4.5 text-[#0F172A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Easy Booking</span>
            </div>
          </div>

        </div>

        {/* ─── FLOATING CATEGORY TABS ─── */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 max-w-[920px] w-[calc(100%-2rem)] bg-white rounded-2xl shadow-xl border border-slate-100/80 flex overflow-hidden z-20">
          
          {/* Bike tab */}
          <button 
            onClick={() => { setActiveTab('Bike'); setSelectedTypes(['All']); }}
            className={`flex-1 flex items-center justify-center gap-3 py-4 sm:py-5 text-left border-b-3 cursor-pointer transition-all ${
              activeTab === 'Bike'
                ? 'border-[#0D9488] bg-teal-50/10'
                : 'border-transparent hover:bg-slate-50/60'
            }`}
          >
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${activeTab === 'Bike' ? 'bg-[#0D9488]/10 text-[#0D9488]' : 'bg-slate-100 text-slate-500'}`}>
              <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="18" r="3" />
                <path d="M12 18V12h6" />
                <path d="M12 12L9 6H4" />
              </svg>
            </div>
            <div>
              <span className={`text-[12.5px] font-black block ${activeTab === 'Bike' ? 'text-slate-800' : 'text-slate-500'}`}>Bike Rental</span>
              <span className={`text-[10px] font-bold block mt-0.5 ${activeTab === 'Bike' ? 'text-[#0D9488]' : 'text-slate-400'}`}>{tabCounts.Bike}+ Bikes</span>
            </div>
          </button>

          {/* Car tab */}
          <button 
            onClick={() => { setActiveTab('Car'); setSelectedTypes(['All']); }}
            className={`flex-1 flex items-center justify-center gap-3 py-4 sm:py-5 text-left border-b-3 cursor-pointer transition-all ${
              activeTab === 'Car'
                ? 'border-[#0D9488] bg-teal-50/10'
                : 'border-transparent hover:bg-slate-50/60'
            }`}
          >
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${activeTab === 'Car' ? 'bg-[#0D9488]/10 text-[#0D9488]' : 'bg-slate-100 text-slate-500'}`}>
              <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="10" width="20" height="8" rx="2" />
                <path d="M7 10V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v5" />
                <circle cx="6" cy="14" r="1" fill="currentColor" />
                <circle cx="18" cy="14" r="1" fill="currentColor" />
              </svg>
            </div>
            <div>
              <span className={`text-[12.5px] font-black block ${activeTab === 'Car' ? 'text-slate-800' : 'text-slate-500'}`}>Car Rental</span>
              <span className={`text-[10px] font-bold block mt-0.5 ${activeTab === 'Car' ? 'text-[#0D9488]' : 'text-slate-400'}`}>{tabCounts.Car}+ Cars</span>
            </div>
          </button>

          {/* Scooter tab */}
          <button 
            onClick={() => { setActiveTab('Scooter'); setSelectedTypes(['All']); }}
            className={`flex-1 flex items-center justify-center gap-3 py-4 sm:py-5 text-left border-b-3 cursor-pointer transition-all ${
              activeTab === 'Scooter'
                ? 'border-[#0D9488] bg-teal-50/10'
                : 'border-transparent hover:bg-slate-50/60'
            }`}
          >
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${activeTab === 'Scooter' ? 'bg-[#0D9488]/10 text-[#0D9488]' : 'bg-slate-100 text-slate-500'}`}>
              <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="18" r="2.5" />
                <circle cx="18" cy="18" r="2.5" />
                <path d="M6 15.5h8.5l3.5-7.5h2" />
                <path d="M12 8h-3" />
              </svg>
            </div>
            <div>
              <span className={`text-[12.5px] font-black block ${activeTab === 'Scooter' ? 'text-slate-800' : 'text-slate-500'}`}>Scooter Rental</span>
              <span className={`text-[10px] font-bold block mt-0.5 ${activeTab === 'Scooter' ? 'text-[#0D9488]' : 'text-slate-400'}`}>{tabCounts.Scooter}+ Scooters</span>
            </div>
          </button>

          {/* Bicycle tab */}
          <button 
            onClick={() => { setActiveTab('Bicycle'); setSelectedTypes(['All']); }}
            className={`flex-1 flex items-center justify-center gap-3 py-4 sm:py-5 text-left border-b-3 cursor-pointer transition-all ${
              activeTab === 'Bicycle'
                ? 'border-[#0D9488] bg-teal-50/10'
                : 'border-transparent hover:bg-slate-50/60'
            }`}
          >
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${activeTab === 'Bicycle' ? 'bg-[#0D9488]/10 text-[#0D9488]' : 'bg-slate-100 text-slate-500'}`}>
              <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="5.5" cy="17.5" r="3.5" />
                <circle cx="18.5" cy="17.5" r="3.5" />
                <path d="M15 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-3 11.5L8.5 12H4.5" />
                <path d="M12 17.5L15 12h3.5" />
                <path d="M12 7.5L8.5 12H15L12 7.5z" />
              </svg>
            </div>
            <div>
              <span className={`text-[12.5px] font-black block ${activeTab === 'Bicycle' ? 'text-slate-800' : 'text-slate-500'}`}>Bicycle Rental</span>
              <span className={`text-[10px] font-bold block mt-0.5 ${activeTab === 'Bicycle' ? 'text-[#0D9488]' : 'text-slate-400'}`}>{tabCounts.Bicycle}+ Bicycles</span>
            </div>
          </button>

        </div>

      </div>

      {/* ─── MAIN 2-COLUMN LAYOUT ─── */}
      <div className="mx-auto max-w-[1860px] px-4 pt-20 pb-8 flex flex-col lg:flex-row gap-6">
        
        {/* ==================== LEFT FILTER SIDEBAR ==================== */}
        <aside className="w-full lg:w-[350px] shrink-0 bg-white border border-slate-200/80 rounded-3xl p-5 shadow-2xs text-left h-fit sticky top-[152px]">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4.5">
            <h3 className="text-[13.5px] font-black text-slate-850 flex items-center gap-1.5 uppercase tracking-wider">
              <SlidersHorizontal className="h-4 w-4 text-[#0D9488]" />
              <span>Filters</span>
            </h3>
            <button 
              onClick={handleResetFilters}
              className="text-[11.5px] font-black text-[#0D9488] hover:underline cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <form onSubmit={handleApplyFilters} className="space-y-4.5">
            
            {/* Location Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-0.5 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-[#0D9488]" />
                <span>Location</span>
              </label>
              <div className="relative">
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[12px] font-semibold text-slate-800 outline-none appearance-none focus:border-[#0D9488] cursor-pointer"
                >
                  <option value="Pondicherry, India">Pondicherry, India</option>
                  <option value="Auroville, India">Auroville, India</option>
                  <option value="Goa, India">Goa, India</option>
                </select>
                <ChevronDown className="h-4 w-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Pick up date & Time */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-0.5 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-[#0D9488]" />
                <span>Pick-up Date</span>
              </label>
              
              <div className="grid grid-cols-5 gap-2">
                {/* Date Picker Button overlay */}
                <div className="col-span-3 relative flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 cursor-pointer focus-within:border-[#0D9488] shadow-3xs">
                  <span className="text-[11.5px] font-semibold text-slate-800 whitespace-nowrap">
                    {formatDateString(pickUpDate)}
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 ml-1" />
                  <input 
                    type="date"
                    value={pickUpDate}
                    onChange={(e) => setPickUpDate(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                </div>
                {/* Time select */}
                <div className="col-span-2 relative">
                  <select
                    value={pickUpTime}
                    onChange={(e) => setPickUpTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 text-[11.5px] font-semibold text-slate-800 outline-none appearance-none focus:border-[#0D9488] cursor-pointer shadow-3xs"
                  >
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="h-4 w-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Return Date & Time */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-0.5 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-[#0D9488]" />
                <span>Return Date</span>
              </label>
              
              <div className="grid grid-cols-5 gap-2">
                {/* Date Picker Button overlay */}
                <div className="col-span-3 relative flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 cursor-pointer focus-within:border-[#0D9488] shadow-3xs">
                  <span className="text-[11.5px] font-semibold text-slate-800 whitespace-nowrap">
                    {formatDateString(dropOffDate)}
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 ml-1" />
                  <input 
                    type="date"
                    value={dropOffDate}
                    onChange={(e) => setDropOffDate(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                </div>
                {/* Time select */}
                <div className="col-span-2 relative">
                  <select
                    value={dropOffTime}
                    onChange={(e) => setDropOffTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 text-[11.5px] font-semibold text-slate-800 outline-none appearance-none focus:border-[#0D9488] cursor-pointer shadow-3xs"
                  >
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="h-4 w-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Price Double Range Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[10px] font-black text-slate-450 uppercase tracking-wider pl-0.5">
                <span>Price Range</span>
                <span className="text-slate-800 text-[11.5px] font-black normal-case">
                  ₹{priceMin} - {priceMax >= 1500 ? '₹1500+' : `₹${priceMax}`}
                </span>
              </div>
              <div className="relative w-full h-6 flex items-center select-none">
                {/* Base Grey Track */}
                <div className="absolute left-0 right-0 h-1 bg-slate-100 rounded-lg" />
                
                {/* Green Highlighted Range */}
                <div 
                  className="absolute h-1 bg-[#0D9488] rounded-lg"
                  style={{
                    left: `${((priceMin - 200) / 1300) * 100}%`,
                    right: `${100 - ((priceMax - 200) / 1300) * 100}%`
                  }}
                />
                
                {/* Left Slider Input */}
                <input 
                  type="range"
                  min="200"
                  max="1500"
                  step="50"
                  value={priceMin}
                  onChange={(e) => {
                    const val = Math.min(parseInt(e.target.value), priceMax - 50);
                    setPriceMin(val);
                  }}
                  className="absolute w-full h-1 bg-transparent pointer-events-none appearance-none z-30 outline-none
                             [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0D9488] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer
                             [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#0D9488] [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                />
                
                {/* Right Slider Input */}
                <input 
                  type="range"
                  min="200"
                  max="1500"
                  step="50"
                  value={priceMax}
                  onChange={(e) => {
                    const val = Math.max(parseInt(e.target.value), priceMin + 50);
                    setPriceMax(val);
                  }}
                  className="absolute w-full h-1 bg-transparent pointer-events-none appearance-none z-30 outline-none
                             [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0D9488] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer
                             [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#0D9488] [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-[9px] font-bold text-slate-450 -mt-1">
                <span>₹200</span>
                <span>₹1,500+</span>
              </div>
            </div>

            {/* Checkboxes Checklist (Bike-specific categories) */}
            {activeTab === 'Bike' && (
              <div className="flex flex-col gap-2 pt-1.5">
                <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block mb-0.5">Bike Type</span>
                
                <label className="flex items-center gap-2.5 cursor-pointer text-[12px] font-semibold text-slate-650 hover:text-slate-900">
                  <input 
                    type="checkbox"
                    checked={selectedTypes.includes('All')}
                    onChange={() => handleTypeToggle('All')}
                    className="h-4 w-4 rounded border-slate-300 text-[#0D9488] focus:ring-[#0D9488] cursor-pointer"
                  />
                  <span>All Types</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-[12px] font-semibold text-slate-650 hover:text-slate-900">
                  <input 
                    type="checkbox"
                    checked={selectedTypes.includes('Sports')}
                    onChange={() => handleTypeToggle('Sports')}
                    className="h-4 w-4 rounded border-slate-300 text-[#0D9488] focus:ring-[#0D9488] cursor-pointer"
                  />
                  <span>Sports Bikes</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-[12px] font-semibold text-slate-650 hover:text-slate-900">
                  <input 
                    type="checkbox"
                    checked={selectedTypes.includes('Cruiser')}
                    onChange={() => handleTypeToggle('Cruiser')}
                    className="h-4 w-4 rounded border-slate-300 text-[#0D9488] focus:ring-[#0D9488] cursor-pointer"
                  />
                  <span>Cruiser Bikes</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-[12px] font-semibold text-slate-650 hover:text-slate-900">
                  <input 
                    type="checkbox"
                    checked={selectedTypes.includes('Scooter')}
                    onChange={() => handleTypeToggle('Scooter')}
                    className="h-4 w-4 rounded border-slate-300 text-[#0D9488] focus:ring-[#0D9488] cursor-pointer"
                  />
                  <span>Scooters</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-[12px] font-semibold text-slate-650 hover:text-slate-900">
                  <input 
                    type="checkbox"
                    checked={selectedTypes.includes('Electric')}
                    onChange={() => handleTypeToggle('Electric')}
                    className="h-4 w-4 rounded border-slate-300 text-[#0D9488] focus:ring-[#0D9488] cursor-pointer"
                  />
                  <span>Electric Bikes</span>
                </label>
              </div>
            )}

            {/* CTA Action button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#0D9488] hover:bg-[#0b7d73] text-white text-[12.5px] font-black py-2.5 rounded-xl transition-all cursor-pointer text-center block shadow-md shadow-teal-850/10"
              >
                Apply Filters
              </button>
            </div>

          </form>

        </aside>

        {/* ==================== CENTER VEHICLE LISTING GRID ==================== */}
        <main className="flex-1">
          
          {/* Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div className="text-left">
              <h2 className="text-[15.5px] font-black text-slate-850 tracking-tight">
                {tabCounts[activeTab] || 350}+ {activeTab}s <span className="text-slate-400 font-semibold">available in Pondicherry</span>
              </h2>
            </div>

            {/* Sort & Layout controllers */}
            <div className="flex items-center gap-3 ml-auto sm:ml-0">
              
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-3xs">
                <span className="text-[10.5px] font-semibold text-slate-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-[11px] font-black text-slate-700 outline-none cursor-pointer pr-1"
                >
                  <option value="popular">Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* Layout triggers */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setLayoutMode('grid')}
                  className={`h-9 w-9 flex items-center justify-center rounded-xl transition-all cursor-pointer border ${
                    layoutMode === 'grid' 
                      ? 'bg-[#0D9488] border-[#0D9488] text-white shadow-sm' 
                      : 'bg-white border-slate-200 text-slate-400 hover:text-slate-650'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setLayoutMode('list')}
                  className={`h-9 w-9 flex items-center justify-center rounded-xl transition-all cursor-pointer border ${
                    layoutMode === 'list' 
                      ? 'bg-[#0D9488] border-[#0D9488] text-white shadow-sm' 
                      : 'bg-white border-slate-200 text-slate-400 hover:text-slate-650'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Cards Grid */}
          {filteredVehicles.length > 0 ? (
            <div className={layoutMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4'
              : 'flex flex-col gap-4'
            }>
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => onSelectVehicle(vehicle)}
                  className={`group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-3xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col text-left relative ${
                    layoutMode === 'list' ? 'sm:flex-row' : ''
                  }`}
                >
                  
                  {/* Image Section */}
                  <div 
                    className={`flex items-center justify-center p-3 relative shrink-0 overflow-hidden ${
                      layoutMode === 'list' ? 'w-full sm:w-[190px] h-[135px]' : 'h-[140px]'
                    }`}
                   
                  >
                    
                    {/* Badge */}
                    {vehicle.badge && (
                      <span className={`absolute top-2.5 left-2.5 text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-md border ${
                        vehicle.badge === 'Best Seller'
                          ? 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]'
                          : vehicle.badge === 'New'
                            ? 'bg-[#F3E5F5] text-[#7B1FA2] border-[#E1BEE7]'
                            : 'bg-[#E6F4F1] text-[#0D9488] border-emerald-100/30'
                      }`}>
                        {vehicle.badge}
                      </span>
                    )}

                    {/* Wishlist Heart */}
                    <button
                      onClick={(e) => toggleWishlist(vehicle.id, e)}
                      className="absolute top-2.5 right-2.5 h-6.5 w-6.5 rounded-full bg-white border border-slate-100/80 flex items-center justify-center shadow-3xs hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
                    >
                      <Heart 
                        className={`h-3.5 w-3.5 transition-colors ${
                          wishlist.includes(vehicle.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-slate-400'
                        }`} 
                      />
                    </button>

                    {/* Vehicle Thumb */}
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.title} 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-350 z-0"
                      loading="lazy"
                    />

                  </div>

                  {/* Info Section */}
                  <div className="p-3.5 flex flex-col flex-grow justify-between">
                    <div>
                      <h4 className="text-[13.5px] font-extrabold text-slate-850 tracking-tight leading-snug line-clamp-1">
                        {vehicle.title}
                      </h4>
                      
                      {/* Specs row */}
                      {(() => {
                        const parts = vehicle.spec.split('•').map(p => p.trim());
                        const spec1 = parts[0];
                        const spec2 = parts[1];
                        
                        let Icon1 = Gauge;
                        let Icon2 = Fuel;
                        
                        if (vehicle.type === 'Car') {
                          Icon1 = Fuel;
                          Icon2 = Gauge;
                        }
                        
                        return (
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[9.5px] font-bold text-slate-400 mt-1.5">
                            <span className="flex items-center gap-1">
                              <Award className="h-3.5 w-3.5 text-slate-350" />
                              <span>{vehicle.category}</span>
                            </span>
                            {spec1 && (
                              <span className="flex items-center gap-1">
                                <Icon1 className="h-3.5 w-3.5 text-slate-350" />
                                <span>{spec1}</span>
                              </span>
                            )}
                            {spec2 && (
                              <span className="flex items-center gap-1">
                                <Icon2 className="h-3.5 w-3.5 text-slate-350" />
                                <span>{spec2}</span>
                              </span>
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Footer Price and Rating Row */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 mt-3">
                      <div>
                        <span className="text-[16px] font-black text-[#0D9488]">₹{vehicle.price}</span>
                        <span className="text-[10px] font-bold text-slate-400"> / day</span>
                      </div>

                      {/* Rating details */}
                      <span className="text-[10.5px] font-bold text-slate-500 flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <strong>{vehicle.rating}</strong>
                        <span className="text-slate-400">({vehicle.reviews})</span>
                      </span>
                    </div>

                    {/* Action button at bottom of card */}
                    <div className="mt-3.5">
                      <div className="text-[12px] font-bold text-center text-[#0D9488] border border-[#0D9488]/30 rounded-xl group-hover:bg-[#0D9488] group-hover:text-white py-2 transition-all duration-300 flex items-center justify-center">
                        <span>View Details</span>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          ) : (
            /* Empty fallback */
            <div className="flex flex-col items-center justify-center bg-white border border-slate-200 rounded-3xl py-20 px-4 text-center">
              <h3 className="text-[15px] font-black text-slate-800">No vehicles match filters</h3>
              <p className="text-[12px] text-slate-400 font-semibold mt-1">Try resetting filters to show vehicles.</p>
              <button 
                onClick={handleResetFilters}
                className="mt-6 bg-[#0D9488] text-white text-[12.5px] font-extrabold px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}

        </main>



      </div>

    </div>
  );
}
