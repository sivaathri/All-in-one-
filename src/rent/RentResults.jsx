import { useState, useMemo } from 'react';
import { ChevronDown, SlidersHorizontal, ArrowLeft, Star, Heart, MapPin, Calendar, Fuel, Cpu, ShieldCheck } from 'lucide-react';

// Reusing vehicle images from assets
import rentYamahaImg from '../assets/rent_yamaha.png';
import rentEnfieldImg from '../assets/rent_enfield.png';
import rentActivaImg from '../assets/rent_activa.png';
import rentKtmImg from '../assets/rent_ktm.png';
import rentGlanzaImg from '../assets/rent_glanza.png';
import rentSwiftImg from '../assets/rent_swift.png';
import rentTharImg from '../assets/rent_thar.png';
import rentNexonImg from '../assets/car_rental.png';

const FLEETS = [
  { id: 1, title: 'Yamaha R15 V4', type: 'Bike', category: 'Sports', image: rentYamahaImg, price: 600, rating: 4.8, reviews: 42, fuel: 'Petrol', transmission: 'Manual', power: '155cc' },
  { id: 2, title: 'Royal Enfield Classic 350', type: 'Bike', category: 'Cruiser', image: rentEnfieldImg, price: 800, rating: 4.9, reviews: 108, fuel: 'Petrol', transmission: 'Manual', power: '350cc' },
  { id: 3, title: 'Toyota Glanza', type: 'Car', category: 'Hatchback', image: rentGlanzaImg, price: 1500, rating: 4.7, reviews: 29, fuel: 'Petrol', transmission: 'Automatic', power: 'Petrol' },
  { id: 4, title: 'Mahindra Thar 4x4', type: 'Car', category: 'SUV', image: rentTharImg, price: 3000, rating: 4.9, reviews: 67, fuel: 'Diesel', transmission: 'Manual', power: '4WD' },
  { id: 5, title: 'KTM Duke 390', type: 'Bike', category: 'Sports', image: rentKtmImg, price: 900, rating: 4.8, reviews: 54, fuel: 'Petrol', transmission: 'Manual', power: '373cc' },
  { id: 6, title: 'Tata Nexon SUV', type: 'Car', category: 'SUV', image: rentNexonImg, price: 2200, rating: 4.8, reviews: 88, fuel: 'Petrol', transmission: 'Automatic', power: 'SUV' },
  { id: 7, title: 'Honda Activa 6G', type: 'Bike', category: 'Scooter', image: rentActivaImg, price: 400, rating: 4.6, reviews: 92, fuel: 'Petrol', transmission: 'Automatic', power: '110cc' },
  { id: 8, title: 'Maruti Swift', type: 'Car', category: 'Hatchback', image: rentSwiftImg, price: 1200, rating: 4.6, reviews: 45, fuel: 'Petrol', transmission: 'Manual', power: 'Hatchback' }
];

export default function RentResults({ searchParams, onBack, onSelectVehicle, onSearch }) {
  const [selectedType, setSelectedType] = useState(searchParams.vehicleType || 'All');
  const [maxPrice, setMaxPrice] = useState(3500);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFuel, setSelectedFuel] = useState([]);
  const [selectedTransmission, setSelectedTransmission] = useState([]);
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-asc' | 'price-desc' | 'rating'

  // Filter Categories list based on Type (Cars vs Bikes)
  const categories = useMemo(() => {
    if (selectedType === 'Car') return ['SUV', 'Hatchback'];
    if (selectedType === 'Bike') return ['Sports', 'Cruiser', 'Scooter'];
    return ['SUV', 'Hatchback', 'Sports', 'Cruiser', 'Scooter'];
  }, [selectedType]);

  const handleCategoryToggle = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleFuelToggle = (fuel) => {
    setSelectedFuel(prev =>
      prev.includes(fuel) ? prev.filter(f => f !== fuel) : [...prev, fuel]
    );
  };

  const handleTransmissionToggle = (trans) => {
    setSelectedTransmission(prev =>
      prev.includes(trans) ? prev.filter(t => t !== trans) : [...prev, trans]
    );
  };

  // Filter and Sort calculation
  const filteredFleets = useMemo(() => {
    let result = FLEETS;

    // Filter by vehicle type (Car vs Bike)
    if (selectedType !== 'All') {
      result = result.filter(item => item.type === selectedType);
    }

    // Filter by price
    result = result.filter(item => item.price <= maxPrice);

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(item => selectedCategories.includes(item.category));
    }

    // Filter by fuel
    if (selectedFuel.length > 0) {
      result = result.filter(item => selectedFuel.includes(item.fuel));
    }

    // Filter by transmission
    if (selectedTransmission.length > 0) {
      result = result.filter(item => selectedTransmission.includes(item.transmission));
    }

    // Sort result
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedType, maxPrice, selectedCategories, selectedFuel, selectedTransmission, sortBy]);

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-16 rent-page-enter">
      
      {/* Search Sticky Info Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-[80px] z-30 py-3 shadow-xs">
        <div className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-left">
          
          {/* Back button + Summary */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="h-4.5 w-4.5" strokeWidth={2.5} />
            </button>
            <div>
              <p className="text-[14px] font-black text-slate-800 leading-snug">
                Self-Drive Rentals
              </p>
              <div className="flex items-center gap-2 text-[10.5px] font-bold text-slate-400 mt-0.5">
                <MapPin className="h-3 w-3 text-[#0F766E]" />
                <span>{searchParams.location || 'Pondicherry'}</span>
                <span>•</span>
                <Calendar className="h-3 w-3 text-[#0F766E]" />
                <span>{searchParams.pickUpDate || 'June 21'} - {searchParams.dropOffDate || 'June 25'}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4">
            <span className="text-[12px] font-bold text-slate-450 bg-slate-50 border border-slate-200/60 p-2 rounded-xl">
              Found <strong className="text-slate-800">{filteredFleets.length} vehicles</strong>
            </span>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 p-1.5 rounded-xl">
              <span className="text-[11.5px] font-extrabold text-slate-450 pl-1.5">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-[11.5px] font-black text-slate-700 focus:outline-hidden cursor-pointer"
              >
                <option value="popular">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Main Results Content Layout */}
      <div className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar Filter Section */}
        <aside className="w-full lg:w-[280px] shrink-0 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs text-left h-fit sticky top-[152px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <h3 className="text-[14px] font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <SlidersHorizontal className="h-4 w-4 text-[#0F766E]" />
              <span>Filters</span>
            </h3>
            <button
              onClick={() => {
                setSelectedCategories([]);
                setSelectedFuel([]);
                setSelectedTransmission([]);
                setMaxPrice(3500);
              }}
              className="text-[11.5px] font-bold text-[#0F766E] hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Vehicle Class Selector */}
          <div className="flex flex-col gap-2 mb-6">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-1">Vehicle Type</span>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-50 border border-slate-200/60 p-1 rounded-xl">
              {['All', 'Car', 'Bike'].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setSelectedType(t);
                    setSelectedCategories([]);
                  }}
                  className={`py-1.5 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
                    selectedType === t 
                      ? 'bg-white text-[#0F766E] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t}s
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mb-6 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] font-black text-slate-450 uppercase tracking-wider">
              <span>Price / Day</span>
              <span className="text-slate-800 text-[12.5px] font-extrabold normal-case">Up to ₹{maxPrice}</span>
            </div>
            <input 
              type="range" 
              min="300"
              max="3500"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-[#0F766E] cursor-pointer h-1.5 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-semibold text-slate-400">
              <span>₹300</span>
              <span>₹3,500</span>
            </div>
          </div>

          {/* Categories Checklist */}
          <div className="mb-6">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-2.5">Category</span>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2.5 cursor-pointer text-[12.5px] font-semibold text-slate-650 hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                    className="h-4.5 w-4.5 rounded border-slate-300 text-[#0F766E] focus:ring-[#0F766E] cursor-pointer"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fuel Types */}
          <div className="mb-6">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-2.5">Fuel Type</span>
            <div className="flex flex-col gap-2">
              {['Petrol', 'Diesel'].map((fuel) => (
                <label key={fuel} className="flex items-center gap-2.5 cursor-pointer text-[12.5px] font-semibold text-slate-650 hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={selectedFuel.includes(fuel)}
                    onChange={() => handleFuelToggle(fuel)}
                    className="h-4.5 w-4.5 rounded border-slate-300 text-[#0F766E] focus:ring-[#0F766E] cursor-pointer"
                  />
                  <span>{fuel}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Transmission Types */}
          <div>
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-2.5">Transmission</span>
            <div className="flex flex-col gap-2">
              {['Manual', 'Automatic'].map((trans) => (
                <label key={trans} className="flex items-center gap-2.5 cursor-pointer text-[12.5px] font-semibold text-slate-650 hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={selectedTransmission.includes(trans)}
                    onChange={() => handleTransmissionToggle(trans)}
                    className="h-4.5 w-4.5 rounded border-slate-300 text-[#0F766E] focus:ring-[#0F766E] cursor-pointer"
                  />
                  <span>{trans}</span>
                </label>
              ))}
            </div>
          </div>

        </aside>

        {/* Right side Grid results */}
        <main className="flex-1">
          {filteredFleets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
              {filteredFleets.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectVehicle(item)}
                  className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col text-left"
                >
                  {/* Vehicle Image */}
                  <div className="h-[135px] w-full bg-slate-100/50 flex items-center justify-center p-3 relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-[#E6F4F1] text-[#0F766E] text-[9px] font-extrabold px-1.5 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <span className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-slate-800 text-[9.5px] font-bold px-1.5 py-0.5 rounded-full border border-slate-100 flex items-center gap-1 shadow-xs">
                      <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                    </span>
                  </div>

                  {/* Vehicle Details */}
                  <div className="p-3 flex flex-col flex-grow justify-between">
                    <div>
                      <h4 className="text-[14px] font-extrabold text-slate-850 tracking-tight leading-snug line-clamp-1">
                        {item.title}
                      </h4>
                      
                      {/* Spec tags */}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        <span className="flex items-center gap-1 text-[9px] font-extrabold text-slate-400 bg-slate-50 border border-slate-150 px-1.5 py-0.5 rounded-md">
                          <Fuel className="h-2.5 w-2.5 text-slate-450" />
                          <span>{item.fuel}</span>
                        </span>
                        <span className="flex items-center gap-1 text-[9px] font-extrabold text-slate-400 bg-slate-50 border border-slate-150 px-1.5 py-0.5 rounded-md">
                          <Cpu className="h-2.5 w-2.5 text-slate-450" />
                          <span>{item.transmission}</span>
                        </span>
                        <span className="text-[9px] font-extrabold text-slate-400 bg-slate-50 border border-slate-150 px-1.5 py-0.5 rounded-md">
                          {item.power}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 mt-3">
                      <div>
                        <span className="text-[15.5px] font-black text-[#0F766E]">₹{item.price}</span>
                        <span className="text-[9.5px] font-semibold text-slate-400"> / day</span>
                      </div>
                      <button className="text-[10.5px] font-extrabold text-white bg-[#0F766E] hover:bg-[#0D665F] px-2.5 py-1.5 rounded-lg active:scale-95 transition-all cursor-pointer">
                        Book Now
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* No Results fallback */
            <div className="flex flex-col items-center justify-center bg-white border border-slate-200 rounded-2xl py-20 px-4 text-center">
              <div className="h-16 w-16 bg-slate-50 border border-slate-150 rounded-full flex items-center justify-center text-slate-400 mb-4">
                <SlidersHorizontal className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-[16px] font-black text-slate-800">No Vehicles Match Your Filters</h3>
              <p className="text-[13px] text-slate-400 font-semibold mt-1 max-w-[280px]">
                Try adjusting your pricing range or choosing a different category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedFuel([]);
                  setSelectedTransmission([]);
                  setMaxPrice(3500);
                }}
                className="mt-6 bg-[#0F766E] hover:bg-[#0D665F] text-white text-[12.5px] font-extrabold px-5 py-2 rounded-xl transition-all cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
