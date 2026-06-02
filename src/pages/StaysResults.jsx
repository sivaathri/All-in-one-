import React, { useState } from 'react';
import { Star, MapPin, Heart, ChevronLeft, ChevronRight, ChevronDown, Check, ShieldCheck, Headphones, Wifi, Waves, Coffee, Car, Wind, Sprout } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import puducherryMap from '../assets/puducherry_map.png';

const INITIAL_STAYS = [
  {
    id: 1,
    name: "Sea Breeze Resort",
    rating: 4.6,
    reviewsCount: 128,
    location: "Pondicherry Beach, Pondicherry • 0.8 km from center",
    tag: "Best Seller",
    discount: "20% OFF",
    originalPrice: 5000,
    price: 4000,
    totalPrice: 16000,
    taxes: 2560,
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["Free Wi-Fi", "Pool", "Breakfast", "Parking"],
    extraAmenitiesCount: 3,
    verified: true
  },
  {
    id: 2,
    name: "Le Royal Residency",
    rating: 4.3,
    reviewsCount: 96,
    location: "White Town, Pondicherry • 1.2 km from center",
    tag: null,
    discount: "15% OFF",
    originalPrice: 4200,
    price: 3570,
    totalPrice: 14280,
    taxes: 2285,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1611891487122-2075b9627dde?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["Free Wi-Fi", "Breakfast", "Parking", "AC"],
    extraAmenitiesCount: 2,
    verified: true
  },
  {
    id: 3,
    name: "Heritage Home Stay",
    rating: 4.7,
    reviewsCount: 78,
    location: "Heritage Town, Pondicherry • 0.6 km from center",
    tag: null,
    discount: "10% OFF",
    originalPrice: 3200,
    price: 2880,
    totalPrice: 11520,
    taxes: 1843,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["Free Wi-Fi", "Breakfast", "AC", "Garden"],
    extraAmenitiesCount: 2,
    verified: false
  }
];

const getAmenityIcon = (name) => {
  switch (name) {
    case 'Free Wi-Fi':
      return <Wifi className="h-3.5 w-3.5 text-slate-450 shrink-0 stroke-[2.2]" />;
    case 'Pool':
      return <Waves className="h-3.5 w-3.5 text-slate-450 shrink-0 stroke-[2.2]" />;
    case 'Breakfast':
    case 'Breakfast Included':
      return <Coffee className="h-3.5 w-3.5 text-slate-450 shrink-0 stroke-[2.2]" />;
    case 'Parking':
    case 'Free Parking':
      return <Car className="h-3.5 w-3.5 text-slate-450 shrink-0 stroke-[2.2]" />;
    case 'AC':
    case 'Air Conditioning':
      return <Wind className="h-3.5 w-3.5 text-slate-450 shrink-0 stroke-[2.2]" />;
    case 'Garden':
      return <Sprout className="h-3.5 w-3.5 text-slate-450 shrink-0 stroke-[2.2]" />;
    default:
      return null;
  }
};

export default function StaysResults({ searchParams, onSearch }) {
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [propertyTypes, setPropertyTypes] = useState({
    hotels: true,
    resorts: true,
    homestays: false,
    villas: false,
    apartments: false
  });
  const [guestRatings, setGuestRatings] = useState({
    r45: true,
    r40: false,
    r35: false,
    r30: false
  });
  const [amenities, setAmenities] = useState({
    wifi: true,
    breakfast: true,
    pool: false,
    parking: false,
    ac: true
  });

  const [activeImageIndices, setActiveImageIndices] = useState({ 1: 0, 2: 0, 3: 0 });
  const [wishlist, setWishlist] = useState({ 1: false, 2: false, 3: false });
  const [hoveredStay, setHoveredStay] = useState(null);
  const [sortBy, setSortBy] = useState("Recommended");

  const formatDateString = (dateStr) => {
    if (!dateStr) return '21 Jun 2025';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getDayOfWeek = (dateStr) => {
    if (!dateStr) return 'Sat';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Sat';
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const nextImage = (id, maxLen) => {
    setActiveImageIndices(prev => ({
      ...prev,
      [id]: (prev[id] + 1) % maxLen
    }));
  };

  const prevImage = (id, maxLen) => {
    setActiveImageIndices(prev => ({
      ...prev,
      [id]: (prev[id] - 1 + maxLen) % maxLen
    }));
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleResetFilters = () => {
    setMinPrice(500);
    setMaxPrice(10000);
    setPropertyTypes({ hotels: true, resorts: true, homestays: false, villas: false, apartments: false });
    setGuestRatings({ r45: true, r40: false, r35: false, r30: false });
    setAmenities({ wifi: true, breakfast: true, pool: false, parking: false, ac: true });
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }} className="bg-[#F8FAFC] min-h-screen">
      <style>{`
        .double-range-input::-webkit-slider-thumb {
          pointer-events: auto;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0F766E;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(15,118,110,0.3);
          cursor: pointer;
        }
        .double-range-input::-moz-range-thumb {
          pointer-events: auto;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0F766E;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(15,118,110,0.3);
          cursor: pointer;
        }
      `}</style>
      
      {/* Top Banner containing Modify Search bar */}
      <div className="w-full bg-[#F1F5F9]/60 py-6 border-b border-slate-200/50 px-4 sm:px-6 lg:px-6">
        <div className="max-w-[1760px] mx-auto w-full">
          <SearchBar onSearch={onSearch} isModifySearch={true} />
        </div>
      </div>

      {/* Main Results Container */}
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
          
          {/* 1. Left Column: Filters Sidebar */}
          <aside className="md:col-span-3 lg:col-span-3 xl:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
              
              {/* Header Title */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-[15px] font-extrabold text-slate-800">
                  Filters
                </span>
                <button 
                  onClick={handleResetFilters}
                  className="text-[13px] font-bold text-[#0F766E] hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Price filter */}
              <div className="py-5 border-b border-slate-200">
                <h4 className="text-[13.5px] font-extrabold text-slate-800 mb-4">Price per night</h4>
                <div className="relative w-full h-6 flex items-center mb-1">
                  {/* Background Track */}
                  <div className="absolute left-0 right-0 h-1.5 bg-slate-100 rounded-full"></div>
                  {/* Active Green Track */}
                  <div 
                    className="absolute h-1.5 bg-[#0F766E] rounded-full"
                    style={{
                      left: `${((minPrice - 500) / 9500) * 100}%`,
                      right: `${100 - ((maxPrice - 500) / 9500) * 100}%`
                    }}
                  ></div>
                  
                  {/* Overlapping Absolute Range Inputs */}
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="250"
                    value={minPrice}
                    onChange={(e) => {
                      const val = Math.min(parseInt(e.target.value), maxPrice - 500);
                      setMinPrice(val);
                    }}
                    className="absolute pointer-events-none appearance-none w-full h-1 bg-transparent outline-none left-0 z-20 double-range-input"
                  />
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="250"
                    value={maxPrice}
                    onChange={(e) => {
                      const val = Math.max(parseInt(e.target.value), minPrice + 500);
                      setMaxPrice(val);
                    }}
                    className="absolute pointer-events-none appearance-none w-full h-1 bg-transparent outline-none left-0 z-20 double-range-input"
                  />
                </div>
                <div className="flex justify-between items-center text-[12px] font-semibold text-slate-500 mt-2">
                  <span>₹{minPrice.toLocaleString()}</span>
                  <span>₹{maxPrice === 10000 ? '10,000+' : maxPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Property Type */}
              <div className="py-5 border-b border-slate-200">
                <h4 className="text-[13.5px] font-extrabold text-slate-800 mb-4">Property Type</h4>
                <div className="space-y-3.5">
                  {[
                    { key: 'hotels', label: 'Hotels' },
                    { key: 'resorts', label: 'Resorts' },
                    { key: 'homestays', label: 'Homestays' },
                    { key: 'villas', label: 'Villas' },
                    { key: 'apartments', label: 'Apartments' }
                  ].map((type) => (
                    <div 
                      key={type.key} 
                      onClick={() => setPropertyTypes(prev => ({ ...prev, [type.key]: !prev[type.key] }))}
                      className="flex items-center gap-3.5 cursor-pointer group select-none"
                    >
                      <div 
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                          propertyTypes[type.key] 
                            ? 'bg-[#0F766E] border-[#0F766E] text-white' 
                            : 'border-slate-300 group-hover:border-slate-400 bg-white'
                        }`}
                      >
                        {propertyTypes[type.key] && (
                          <svg className="w-3.5 h-3.5 stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[13.5px] font-semibold text-slate-650 group-hover:text-slate-900 leading-none">
                        {type.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Rating */}
              <div className="py-5 border-b border-slate-200">
                <h4 className="text-[13.5px] font-extrabold text-slate-800 mb-4">Guest Rating</h4>
                <div className="space-y-3.5">
                  {[
                    { key: 'r45', label: '4.5 & above', stars: 4.5 },
                    { key: 'r40', label: '4.0 & above', stars: 4 },
                    { key: 'r35', label: '3.5 & above', stars: 3.5 },
                    { key: 'r30', label: '3.0 & above', stars: 3 }
                  ].map((rating) => (
                    <div 
                      key={rating.key} 
                      onClick={() => setGuestRatings(prev => ({ ...prev, [rating.key]: !prev[rating.key] }))}
                      className="flex items-center gap-3.5 cursor-pointer group select-none"
                    >
                      <div 
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                          guestRatings[rating.key] 
                            ? 'bg-[#0F766E] border-[#0F766E] text-white' 
                            : 'border-slate-300 group-hover:border-slate-400 bg-white'
                        }`}
                      >
                        {guestRatings[rating.key] && (
                          <svg className="w-3.5 h-3.5 stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>

                      {/* Custom Gold Stars */}
                      <div className="flex items-center gap-0.5 text-amber-555 shrink-0">
                        {[...Array(5)].map((_, i) => {
                          const starsCount = Math.floor(rating.stars);
                          const hasHalf = rating.stars % 1 !== 0;
                          if (i < starsCount) {
                            return <Star key={i} className="h-3.5 w-3.5 fill-current text-amber-400" strokeWidth={0} />;
                          } else if (i === starsCount && hasHalf) {
                            return (
                              <div key={i} className="relative h-3.5 w-3.5 text-slate-200">
                                <Star className="absolute top-0 left-0 h-3.5 w-3.5 text-slate-200 fill-slate-200" strokeWidth={0} />
                                <div className="absolute top-0 left-0 w-1/2 overflow-hidden h-full">
                                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 max-w-none" strokeWidth={0} />
                                </div>
                              </div>
                            );
                          } else {
                            return <Star key={i} className="h-3.5 w-3.5 text-slate-200 fill-slate-200" strokeWidth={0} />;
                          }
                        })}
                      </div>

                      <span className="text-[13.5px] font-semibold text-slate-650 group-hover:text-slate-900 leading-none">
                        {rating.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="pt-5">
                <h4 className="text-[13.5px] font-extrabold text-slate-800 mb-4">Amenities</h4>
                <div className="space-y-3.5">
                  {[
                    { key: 'wifi', label: 'Free Wi-Fi' },
                    { key: 'breakfast', label: 'Breakfast Included' },
                    { key: 'pool', label: 'Swimming Pool' },
                    { key: 'parking', label: 'Free Parking' },
                    { key: 'ac', label: 'Air Conditioning' }
                  ].map((amenity) => (
                    <div 
                      key={amenity.key} 
                      onClick={() => setAmenities(prev => ({ ...prev, [amenity.key]: !prev[amenity.key] }))}
                      className="flex items-center gap-3.5 cursor-pointer group select-none"
                    >
                      <div 
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                          amenities[amenity.key] 
                            ? 'bg-[#0F766E] border-[#0F766E] text-white' 
                            : 'border-slate-300 group-hover:border-slate-400 bg-white'
                        }`}
                      >
                        {amenities[amenity.key] && (
                          <svg className="w-3.5 h-3.5 stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[13.5px] font-semibold text-slate-650 group-hover:text-slate-900 leading-none">
                        {amenity.label}
                      </span>
                    </div>
                  ))}
                  <button className="text-xs font-extrabold text-[#0F766E] hover:underline cursor-pointer flex items-center gap-1 pt-1.5 border-none bg-transparent p-0">
                    Show More
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* 2. Middle Column: Stay Search Results */}
          <main className="md:col-span-9 lg:col-span-6 xl:col-span-7 space-y-6">
            
            {/* Header Result Counts */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="text-left">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  120 Stays found in Pondicherry
                </h2>
                <p className="text-[11.5px] font-bold text-slate-450 mt-1">
                  {formatDateString(searchParams?.checkIn)} - {formatDateString(searchParams?.checkOut)} (4 Nights) • {searchParams?.guests || '3 Adults, 1 Child, 1 Room'}
                </p>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[12px] font-bold text-slate-450 whitespace-nowrap">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 text-slate-700 text-[12px] font-bold px-3 pr-8 py-1.5 rounded-xl outline-none focus:border-[#0F766E] cursor-pointer"
                  >
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Stays List */}
            <div className="space-y-6">
              {INITIAL_STAYS.map((stay) => {
                const currentImgIdx = activeImageIndices[stay.id] || 0;
                const isHovered = hoveredStay === stay.id;

                return (
                  <div
                    key={stay.id}
                    onMouseEnter={() => setHoveredStay(stay.id)}
                    onMouseLeave={() => setHoveredStay(null)}
                    className={`bg-white rounded-3xl border ${
                      isHovered ? 'border-[#0F766E]/40 shadow-md scale-[1.005]' : 'border-slate-200 shadow-xs'
                    } p-4.5 flex flex-col md:flex-row gap-5 transition-all duration-200`}
                  >
                    
                    {/* Carousel Section */}
                    <div className="w-full md:w-[280px] h-[200px] shrink-0 rounded-2xl overflow-hidden relative group">
                      
                      {/* Heart Wishlist icon */}
                      <button
                        onClick={() => toggleWishlist(stay.id)}
                        className="absolute top-3.5 right-3.5 h-9 w-9 rounded-full bg-black/30 hover:bg-black/40 flex items-center justify-center text-white transition-all duration-150 z-10 cursor-pointer"
                      >
                        <Heart
                          className={`h-4.5 w-4.5 ${
                            wishlist[stay.id] ? 'fill-red-500 text-red-500' : 'text-white'
                          }`}
                          strokeWidth={2.5}
                        />
                      </button>

                      {/* Best seller badge */}
                      {stay.tag && (
                        <div className="absolute top-3.5 left-3.5 bg-[#15803D] text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg uppercase tracking-wider shadow-sm z-10">
                          {stay.tag}
                        </div>
                      )}

                      {/* Carousel Images */}
                      <div className="w-full h-full relative">
                        <img
                          src={stay.images[currentImgIdx]}
                          alt={stay.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                        />

                        {/* Navigation Chevrons */}
                        <div className="absolute inset-x-2.5 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => prevImage(stay.id, stay.images.length)}
                            className="h-7 w-7 rounded-lg bg-white/90 flex items-center justify-center text-slate-700 hover:bg-white shadow-sm cursor-pointer"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => nextImage(stay.id, stay.images.length)}
                            className="h-7 w-7 rounded-lg bg-white/90 flex items-center justify-center text-slate-700 hover:bg-white shadow-sm cursor-pointer"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Dots Indicators */}
                        <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                          {stay.images.map((_, dIdx) => (
                            <span
                              key={dIdx}
                              className={`h-1.5 rounded-full transition-all duration-200 ${
                                currentImgIdx === dIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Middle Info Details */}
                    <div className="flex flex-col justify-between flex-grow text-left">
                      <div>
                        {/* Title and Verified Checkbox Badge */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-[17px] font-extrabold text-slate-900 group-hover:text-[#0F766E]">
                            {stay.name}
                          </h3>
                          {stay.verified && (
                            <span
                              className="inline-flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#0066FF] text-white p-0.5"
                              title="Verified Partner"
                            >
                              <Check className="h-3 w-3 stroke-[3.5]" />
                            </span>
                          )}
                        </div>

                        {/* Rating Badges (Order: Number first, then Star icon) */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="flex items-center gap-1 bg-[#15803D] text-white text-[11px] font-black px-1.5 py-0.5 rounded-md">
                            {stay.rating}
                            <Star className="h-3 w-3 fill-current text-white" />
                          </span>
                          <span className="text-[12px] font-semibold text-slate-450">
                            ({stay.reviewsCount} reviews)
                          </span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500 mt-2.5">
                          <MapPin className="h-4 w-4 text-slate-450 shrink-0 stroke-[2.2]" />
                          <span>{stay.location}</span>
                        </div>

                        {/* Amenities Row with Icons (instead of pills) */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-[12.5px] text-slate-600 font-medium">
                          {stay.amenities.map((amenity, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              {getAmenityIcon(amenity)}
                              <span>{amenity}</span>
                            </div>
                          ))}
                          {stay.extraAmenitiesCount > 0 && (
                            <span className="text-slate-400 font-bold">
                              +{stay.extraAmenitiesCount} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Cancellation Tag */}
                      <span className="text-emerald-700 font-extrabold text-[12px] mt-4 block leading-none">
                        Free Cancellation
                        <span className="text-slate-400 font-semibold text-[11px] block mt-1">
                          Cancel before 18 Jun for full refund
                        </span>
                      </span>
                    </div>

                    {/* Right Price details block */}
                    <div className="w-full md:w-[170px] border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-5 flex flex-col justify-between items-end text-right">
                      
                      <div className="flex flex-col items-end w-full">
                        {/* Discount & Original Price Row side-by-side */}
                        <div className="flex items-center gap-2.5 justify-end">
                          {stay.discount && (
                            <span className="bg-[#EF4444] text-white px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wide">
                              {stay.discount}
                            </span>
                          )}
                          <span className="text-slate-400 text-[12.5px] font-semibold line-through">
                            ₹{stay.originalPrice.toLocaleString()}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="mt-1 flex items-baseline gap-1">
                          <span className="text-slate-900 text-[24px] font-black tracking-tight leading-none">
                            ₹{stay.price.toLocaleString()}
                          </span>
                        </div>
                        
                        <span className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">
                          Per night
                        </span>
                      </div>

                      {/* Total and CTA */}
                      <div className="w-full mt-4">
                        <span className="text-[11px] font-bold text-slate-600 block">
                          ₹{stay.totalPrice.toLocaleString()} for 4 nights
                        </span>
                        <span className="text-[10.5px] font-semibold text-slate-450 block mt-0.5">
                          + ₹{stay.taxes.toLocaleString()} taxes & fees
                        </span>

                        <button className="w-full bg-[#0F766E] text-white py-2.5 rounded-xl font-bold text-[12.5px] shadow-sm hover:bg-[#0c625c] active:scale-95 transition-all duration-150 mt-4 cursor-pointer text-center block">
                          View Rooms
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

            {/* Load more button */}
            <button className="w-full bg-white border border-slate-200 text-slate-700 py-3.5 rounded-2xl text-[13px] font-extrabold hover:bg-slate-50 hover:border-slate-350 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs">
              Load More Properties
              <ChevronDown className="h-4 w-4 stroke-[2.5]" />
            </button>

          </main>

          {/* 3. Right Column: Summary widgets and Map */}
          <aside className="md:col-span-12 lg:col-span-3 xl:col-span-3 space-y-6">
            
            {/* Map crop Card using real Puducherry Map asset */}
            <div className="bg-white rounded-3xl border border-slate-200 p-3 shadow-xs overflow-hidden relative">
              <div className="w-full h-44 rounded-2xl bg-slate-100 overflow-hidden relative border border-slate-200">
                <img 
                  src={puducherryMap} 
                  alt="Pondicherry Map" 
                  className="w-full h-full object-cover rounded-2xl"
                />

                {/* Floating Map price markers */}
                
                {/* 1. Sea Breeze Resort (₹4,000) - green by default or if hovered */}
                <div 
                  className={`absolute top-[28%] left-[86%] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 z-20 ${
                    hoveredStay === 1 ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <div className="flex flex-col items-center select-none">
                    <div className={`px-2.5 py-1 rounded-lg font-black text-[11px] shadow-md border ${
                      hoveredStay === 1 || !hoveredStay ? 'bg-[#0F766E] text-white border-[#0F766E]' : 'bg-white text-slate-800 border-slate-200'
                    }`}>
                      ₹4,000
                    </div>
                    <div className={`w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] -mt-[1px] ${
                      hoveredStay === 1 || !hoveredStay ? 'border-t-[#0F766E]' : 'border-t-white'
                    }`} />
                  </div>
                </div>

                {/* 2. Le Royal Residency (₹3,570) - green if hovered, white otherwise */}
                <div 
                  className={`absolute top-[16%] left-[82%] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 z-10 ${
                    hoveredStay === 2 ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <div className="flex flex-col items-center select-none">
                    <div className={`px-2.5 py-1 rounded-lg font-black text-[11px] shadow-md border ${
                      hoveredStay === 2 ? 'bg-[#0F766E] text-white border-[#0F766E]' : 'bg-white text-slate-800 border-slate-200'
                    }`}>
                      ₹3,570
                    </div>
                    <div className={`w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] -mt-[1px] ${
                      hoveredStay === 2 ? 'border-t-[#0F766E]' : 'border-t-white'
                    }`} />
                  </div>
                </div>

                {/* 3. Heritage Home Stay (₹2,880) - green if hovered, white otherwise */}
                <div 
                  className={`absolute top-[46%] left-[92%] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 z-10 ${
                    hoveredStay === 3 ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <div className="flex flex-col items-center select-none">
                    <div className={`px-2.5 py-1 rounded-lg font-black text-[11px] shadow-md border ${
                      hoveredStay === 3 ? 'bg-[#0F766E] text-white border-[#0F766E]' : 'bg-white text-slate-800 border-slate-200'
                    }`}>
                      ₹2,880
                    </div>
                    <div className={`w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] -mt-[1px] ${
                      hoveredStay === 3 ? 'border-t-[#0F766E]' : 'border-t-white'
                    }`} />
                  </div>
                </div>

                {/* Static mock marker 4 (₹5,280) */}
                <div className="absolute top-[42%] left-[20%] -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center select-none">
                    <div className="bg-white text-slate-800 px-2.5 py-1 rounded-lg font-black text-[11px] shadow-md border border-slate-200">
                      ₹5,280
                    </div>
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-white -mt-[1px]" />
                  </div>
                </div>

                {/* Static mock marker 5 (₹5,200) */}
                <div className="absolute top-[64%] left-[45%] -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center select-none">
                    <div className="bg-white text-slate-800 px-2.5 py-1 rounded-lg font-black text-[11px] shadow-md border border-slate-200">
                      ₹5,200
                    </div>
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-white -mt-[1px]" />
                  </div>
                </div>

                {/* Static mock marker 6 (₹2,450) */}
                <div className="absolute top-[68%] left-[94%] -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center select-none">
                    <div className="bg-white text-slate-800 px-2.5 py-1 rounded-lg font-black text-[11px] shadow-md border border-slate-200">
                      ₹2,450
                    </div>
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-white -mt-[1px]" />
                  </div>
                </div>

              </div>
            </div>


          </aside>

        </div>
      </div>
    </div>
  );
}
