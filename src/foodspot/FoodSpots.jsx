import { useState, useMemo, useEffect } from 'react';
import { 
  MapPin, Search, ChevronDown, SlidersHorizontal, Star, Heart, 
  X, Clock, Utensils, ThumbsUp, CheckCircle, Calendar, Users, HeartHandshake, Compass, Plus, Minus
} from 'lucide-react';
import foodBannerImg from '../assets/food_spots_banner.png';
import mapImg from '../assets/puducherry_map.png';

// Exact Restaurant Database from Mockup
const RESTAURANT_DATA = [
  {
    id: 1,
    title: 'Baker Street Cafe',
    location: 'White Town, Puducherry',
    distance: '0.5 km',
    rating: 4.6,
    reviews: '1.2k',
    price: 300,
    pricePeriod: 'for two',
    cuisine: 'Cafe, Continental, Italian',
    badge: '20% OFF',
    pills: ['Pure Veg', 'Free Delivery'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    description: 'An iconic French bakery and gourmet cafe in Pondicherry. Renowned for its buttery croissants, quiches, eclairs, cheese, and fresh baguettes.',
    hours: '7:00 AM - 9:30 PM',
    features: ['AC Dining', 'Kid Friendly', 'Takeaway available', 'All Day Breakfast'],
    mapX: '55%',
    mapY: '35%',
    menu: [
      { name: 'Butter Croissant', price: 95, category: 'Starters', veg: true, desc: 'Flaky and rich buttery pastry baked fresh daily.' },
      { name: 'Chocolate Eclair', price: 120, category: 'Desserts', veg: true, desc: 'Choux pastry filled with chocolate custard, glazed with ganache.' }
    ],
    reviewsList: [
      { user: 'Pierre D.', rating: 4.5, date: 'May 20, 2026', comment: 'Authentic croissants! Excellent butter laminate. Worth a visit.' }
    ]
  },
  {
    id: 2,
    title: 'Coromandel Cafe',
    location: 'Beach Road, Puducherry',
    distance: '1.2 km',
    rating: 4.4,
    reviews: '950',
    price: 400,
    pricePeriod: 'for two',
    cuisine: 'Seafood, Asian, Indian',
    badge: '10% OFF',
    pills: ['Popular', 'Free Delivery'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    description: 'A charming French-colonial style café serving European classics, seafood curries, and house-made desserts in a whimsical pink villa.',
    hours: '8:30 AM - 10:30 PM',
    features: ['Outdoor Seating', 'AC Dining', 'Free Wifi', 'Valet Parking'],
    mapX: '72%',
    mapY: '23%',
    menu: [
      { name: 'Pink Benedict', price: 380, category: 'Starters', veg: false, desc: 'Poached eggs on house brioche with beetroot hollandaise.' }
    ],
    reviewsList: [
      { user: 'Maya S.', rating: 5, date: 'May 12, 2026', comment: 'Absolutely magical ambiance! The coastal food was amazing.' }
    ]
  },
  {
    id: 3,
    title: 'Le Dupleix Restaurant',
    location: 'Dumas Street, Puducherry',
    distance: '1.5 km',
    rating: 4.7,
    reviews: '830',
    price: 1500,
    pricePeriod: 'for two',
    cuisine: 'French, Continental, European',
    badge: '',
    pills: ['Fine Dining', 'Free Delivery'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    description: 'Authentic French fine dining inside a restored historical heritage villa. Known for its curated wine selection and colonial recipes.',
    hours: '12:00 PM - 11:00 PM',
    features: ['AC Dining', 'Wine Bar', 'Valet Parking'],
    mapX: '48%',
    mapY: '45%',
    menu: [
      { name: 'Coq au Vin', price: 680, category: 'Main Course', veg: false, desc: 'Chicken braised slowly in red Burgundy wine, lardons, and mushrooms.' }
    ],
    reviewsList: [
      { user: 'Jean-Luc G.', rating: 5, date: 'June 01, 2026', comment: 'Felt like being back in France. Great heritage vibe.' }
    ]
  },
  {
    id: 4,
    title: 'Villa Shanti',
    location: 'Auroville Road, Puducherry',
    distance: '2.3 km',
    rating: 4.5,
    reviews: '740',
    price: 350,
    pricePeriod: 'for two',
    cuisine: 'Multi Cuisine',
    badge: '',
    pills: ['Pure Veg'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    description: 'Villa Shanti offers a peaceful courtyard dining setting and an eclectic mix of Indian and Continental cuisine made with fresh ingredients.',
    hours: '12:00 PM - 11:00 PM',
    features: ['Courtyard Seating', 'AC Dining', 'Cocktail Bar'],
    mapX: '81%',
    mapY: '60%',
    menu: [
      { name: 'Tandoori Stuffed Mushrooms', price: 340, category: 'Starters', veg: true, desc: 'Stuffed with cheese and spices, cooked in a clay oven.' }
    ],
    reviewsList: [
      { user: 'Arun V.', rating: 5, date: 'June 03, 2026', comment: 'Courtyard is beautiful. Must-visit in White Town.' }
    ]
  },
  {
    id: 5,
    title: 'Cafe Xtasi',
    location: 'Bussy Street, Puducherry',
    distance: '1.8 km',
    rating: 4.3,
    reviews: '520',
    price: 250,
    pricePeriod: 'for two',
    cuisine: 'Cafe, Fast Food, Beverages',
    badge: '15% OFF',
    pills: ['Budget Friendly'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    description: 'A lively hangout spot offering wood-fired pizzas, mocktails, burgers, and delicious finger foods at budget prices.',
    hours: '11:00 AM - 11:00 PM',
    features: ['AC Dining', 'Free Wifi', 'Music'],
    mapX: '32%',
    mapY: '73%',
    menu: [
      { name: 'Margherita Woodfire Pizza', price: 290, category: 'Main Course', veg: true, desc: 'Traditional thin-crust cheese pizza cooked in woodfire oven.' }
    ],
    reviewsList: [
      { user: 'Rohit K.', rating: 4, date: 'May 10, 2026', comment: 'Crispy pizzas and super value for money.' }
    ]
  },
  {
    id: 6,
    title: 'Just Parathas',
    location: 'MG Road, Puducherry',
    distance: '2.0 km',
    rating: 4.2,
    reviews: '310',
    price: 200,
    pricePeriod: 'for two',
    cuisine: 'North Indian, Chinese',
    badge: '',
    pills: ['Quick Bites'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    description: 'Famous for its enormous variety of stuffed parathas served with butter, pickle, and curd. Quick and filling vegetarian food.',
    hours: '10:00 AM - 10:00 PM',
    features: ['Quick Service', 'Vegetarian Friendly'],
    mapX: '28%',
    mapY: '28%',
    menu: [
      { name: 'Aloo Cheese Paratha', price: 90, category: 'Main Course', veg: true, desc: 'Stuffed wheat bread with spiced mashed potatoes and melted cheese.' }
    ],
    reviewsList: [
      { user: 'Amit S.', rating: 4, date: 'Apr 18, 2026', comment: 'Yummy parathas! Extremely filling.' }
    ]
  },
  {
    id: 7,
    title: 'Pizza Republic',
    location: 'Mission Street, Puducherry',
    distance: '1.1 km',
    rating: 4.4,
    reviews: '610',
    price: 500,
    pricePeriod: 'for two',
    cuisine: 'Pizza, Italian, Fast Food',
    badge: '',
    pills: ['Free Delivery'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    description: 'Customize your own pizza base, sauce, and toppings. Fast, fresh, and baked to perfection in record time.',
    hours: '11:00 AM - 11:30 PM',
    features: ['AC Dining', 'Create Your Own Pizza'],
    mapX: '65%',
    mapY: '49%',
    menu: [
      { name: 'Custom Paneer Pizza', price: 350, category: 'Main Course', veg: true, desc: 'Sourdough base, pesto sauce, organic cottage cheese and bell peppers.' }
    ],
    reviewsList: [
      { user: 'Sam P.', rating: 5, date: 'June 01, 2026', comment: 'Customizing toppings is very fun! Pizzas are hot and tasty.' }
    ]
  },
  {
    id: 8,
    title: 'Bay of Buddha',
    location: 'Rock Beach, Puducherry',
    distance: '1.0 km',
    rating: 4.6,
    reviews: '480',
    price: 600,
    pricePeriod: 'for two',
    cuisine: 'Asian, Tibetan, Thai',
    badge: '',
    pills: ['Popular'],
    image: 'https://images.unsplash.com/photo-1534080391025-0979e8304b2b?auto=format&fit=crop&w=600&q=80',
    description: 'Rooftop pan-Asian restaurant offering dramatic sea views and authentic dim sums, sushis, and Thai curries.',
    hours: '6:30 PM - 11:00 PM',
    features: ['Rooftop Seating', 'Sea View', 'Bar'],
    mapX: '88%',
    mapY: '42%',
    menu: [
      { name: 'Thai Basil Chicken', price: 410, category: 'Main Course', veg: false, desc: 'Stir-fried minced chicken with holy basil, garlic, and chillies.' }
    ],
    reviewsList: [
      { user: 'Aditya R.', rating: 4.8, date: 'June 03, 2026', comment: 'Breathtaking beach views and top dim sums.' }
    ]
  },
  {
    id: 9,
    title: 'Dosa Corner',
    location: 'Nehru Street, Puducherry',
    distance: '2.4 km',
    rating: 4.1,
    reviews: '230',
    price: 150,
    pricePeriod: 'for two',
    cuisine: 'South Indian, Fast Food',
    badge: '',
    pills: ['Budget Friendly'],
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
    description: 'Crispiest paper roast dosas, idlis, and hot sambar. The perfect spot for a quick, traditional, and authentic South Indian breakfast.',
    hours: '7:00 AM - 10:30 PM',
    features: ['Quick Service', 'Vegetarian'],
    mapX: '20%',
    mapY: '60%',
    menu: [
      { name: 'Masala Dosa', price: 70, category: 'Main Course', veg: true, desc: 'Crispy crepe with spiced potato filling, served with coconut chutney.' }
    ],
    reviewsList: [
      { user: 'Meena V.', rating: 4.5, date: 'May 12, 2026', comment: 'Very economical and authentic taste. Sambar is amazing!' }
    ]
  },
  {
    id: 10,
    title: 'Burger Barn',
    location: 'Anna Salai, Puducherry',
    distance: '1.7 km',
    rating: 4.3,
    reviews: '410',
    price: 250,
    pricePeriod: 'for two',
    cuisine: 'Burgers, American, Fast Food',
    badge: '',
    pills: ['Quick Bites'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    description: 'Juicy craft burgers, loaded fries, and thick milkshakes. A vintage American-themed fast food diner perfect for comfort food.',
    hours: '11:00 AM - 11:00 PM',
    features: ['AC Dining', 'Loaded Fries'],
    mapX: '38%',
    mapY: '18%',
    menu: [
      { name: 'Crispy Chicken Burger', price: 140, category: 'Main Course', veg: false, desc: 'Buttermilk fried chicken fillet, lettuce, mayo, toasted brioche.' }
    ],
    reviewsList: [
      { user: 'Sanjay S.', rating: 4, date: 'May 28, 2026', comment: 'Juicy burgers. Highly recommend the loaded cheese fries!' }
    ]
  },
  {
    id: 11,
    title: 'The French Window',
    location: 'Romain Rolland Street, Puducherry',
    distance: '1.3 km',
    rating: 4.5,
    reviews: '290',
    price: 350,
    pricePeriod: 'for two',
    cuisine: 'Desserts, Cafe, Continental',
    badge: '',
    pills: ['Cafe'],
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    description: 'A cozy artisan cafe specialized in gourmet pastries, sourdough sandwiches, waffles, and warm herbal teas.',
    hours: '8:00 AM - 9:00 PM',
    features: ['Cozy Seating', 'Free Wifi', 'Desserts Display'],
    mapX: '51%',
    mapY: '57%',
    menu: [
      { name: 'Sourdough Avocado Toast', price: 240, category: 'Starters', veg: true, desc: 'Crushed avocado, sea salt, pepper, olive oil on house sourdough.' }
    ],
    reviewsList: [
      { user: 'Carla T.', rating: 4.5, date: 'June 01, 2026', comment: 'Beautiful waffle selection and great coffee!' }
    ]
  },
  {
    id: 12,
    title: 'Sea Salt Restaurant',
    location: 'Serenity Beach Road, Puducherry',
    distance: '3.5 km',
    rating: 4.6,
    reviews: '340',
    price: 700,
    pricePeriod: 'for two',
    cuisine: 'Seafood, Coastal, Indian',
    badge: '',
    pills: ['Seafood'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    description: 'Enjoy delicious coastal recipes, fresh fish fry, and local style curries in an open-air beachfront setup.',
    hours: '11:00 AM - 11:00 PM',
    features: ['Beachfront', 'Outdoor Seating', 'Fresh Catch Display'],
    mapX: '84%',
    mapY: '80%',
    menu: [
      { name: 'Masala Fried Pomfret', price: 390, category: 'Main Course', veg: false, desc: 'Whole fish marinated in local coastal spices and shallow fried.' }
    ],
    reviewsList: [
      { user: 'Dinesh R.', rating: 5, date: 'May 30, 2026', comment: 'Excellent fish fry. Feet in the sand dining experience!' }
    ]
  }
];

const CUISINES = ['All', 'Cafe', 'French', 'Indian', 'Seafood', 'Italian', 'Desserts', 'Pizza', 'Burgers'];

export default function FoodSpots() {
  // Filter States
  const [selectedLocation, setSelectedLocation] = useState('Pondicherry, India');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');
  const [selectedRating, setSelectedRating] = useState('All Ratings');
  
  // Selected Map Restaurant (for floating card)
  const [selectedRestaurant, setSelectedRestaurant] = useState(RESTAURANT_DATA[0]);
  // Detail Modal State
  const [detailModalRestaurant, setDetailModalRestaurant] = useState(null);
  const [detailTab, setDetailTab] = useState('About & Booking');
  
  // Table Booking States
  const [bookingDate, setBookingDate] = useState('2025-06-21');
  const [bookingTime, setBookingTime] = useState('7:30 PM');
  const [bookingGuests, setBookingGuests] = useState('2 Guests');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Wishlist State
  const [wishlist, setWishlist] = useState([]);
  
  // Map zoom level simulation
  const [zoomLevel, setZoomLevel] = useState(13);

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(wId => wId !== id) : [...prev, id]
    );
  };

  // Filter and Sort Calculations
  const filteredRestaurants = useMemo(() => {
    let list = [...RESTAURANT_DATA];

    // Filter by location
    if (selectedLocation) {
      const locKey = selectedLocation.toLowerCase().split(',')[0].trim();
      list = list.filter(r => r.location.toLowerCase().includes(locKey) || r.location.toLowerCase().includes('puducherry'));
    }

    // Filter by search query (title, description, cuisine)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      list = list.filter(r => 
        r.title.toLowerCase().includes(query) ||
        r.cuisine.toLowerCase().includes(query) ||
        r.location.toLowerCase().includes(query)
      );
    }

    // Filter by cuisine dropdown
    if (selectedCuisine !== 'All') {
      list = list.filter(r => r.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase()));
    }

    // Filter by rating dropdown
    if (selectedRating !== 'All Ratings') {
      const minRating = parseFloat(selectedRating.split('+')[0]);
      list = list.filter(r => r.rating >= minRating);
    }

    // Sorting
    if (sortBy === 'Price: Low to High') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Top Rated') {
      list.sort((a, b) => b.rating - a.rating);
    } // 'Popular' maintains default ranking order

    return list;
  }, [selectedLocation, searchQuery, selectedCuisine, selectedRating, sortBy]);

  // Handle booking form submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const code = 'TV-FOOD-' + Math.floor(1000 + Math.random() * 9000);
    setBookingCode(code);
    setBookingConfirmed(true);
  };

  // Reset booking state when changing selected restaurant
  useEffect(() => {
    setBookingConfirmed(false);
    setBookingCode('');
    setDetailTab('About & Booking');
  }, [detailModalRestaurant]);

  // Select initial restaurant if list changes
  useEffect(() => {
    if (filteredRestaurants.length > 0 && !filteredRestaurants.includes(selectedRestaurant)) {
      setSelectedRestaurant(filteredRestaurants[0]);
    }
  }, [filteredRestaurants, selectedRestaurant]);

  return (
    <div className="w-full bg-[#FAFBFD] min-h-screen pb-16 rent-page-enter">
      
      {/* ─── HERO BANNER SECTION ─── */}
      <div 
        className="w-full h-[320px] sm:h-[350px] relative bg-cover bg-center flex flex-col justify-center px-6 sm:px-16 md:px-24 text-left shadow-inner border-b border-slate-200"
        style={{ backgroundImage: `url(${foodBannerImg})` }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-slate-950/40 z-0 pointer-events-none" />

        <div className="relative z-10 max-w-3xl text-left select-none">
          <span className="text-white text-base md:text-lg font-semibold tracking-wide uppercase">
            Discover the Best
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-1.5 tracking-tight leading-none">
            Food Spots
            <span className="inline-block relative text-[#EA580C] italic font-serif ml-3 select-none">
              Near You!
              <svg className="absolute bottom-[-8px] left-0 w-full h-[6px]" viewBox="0 0 100 10" preserveAspectRatio="none" fill="none">
                <path d="M0,5 Q50,0 100,5" stroke="#EA580C" strokeWidth="4.5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm md:text-base font-medium mt-4 max-w-xl leading-relaxed">
            Explore top restaurants, cafes, and hidden gems around you.
          </p>
        </div>

        {/* ─── FLOATING SEARCH/FILTER BAR ─── */}
        <div className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1360px] bg-white rounded-3xl shadow-xl border border-slate-100/90 p-2 md:p-3 z-20">
          <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-2">
            
            {/* 1. Location Pin & Change */}
            <div className="flex items-center gap-3.5 pl-3 pr-4 py-2 border-r border-slate-150/80 w-full lg:w-auto shrink-0 justify-between lg:justify-start">
              <div className="flex items-center gap-2 text-left">
                <MapPin className="h-5.5 w-5.5 text-[#0F766E] shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider leading-none">Location</span>
                  <span className="text-[13.5px] font-black text-slate-800 mt-1 block truncate leading-none">
                    {selectedLocation.split(',')[0]}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setShowLocationModal(true)}
                className="text-[12.5px] font-extrabold text-[#0F766E] hover:text-[#0c625c] hover:underline cursor-pointer ml-3 shrink-0"
              >
                Change
              </button>
            </div>

            {/* 2. Text Search Input */}
            <div className="flex items-center gap-2.5 px-3 py-2 border-r border-slate-150/80 flex-grow w-full lg:w-auto">
              <Search className="h-5 w-5 text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search for restaurants, cuisines..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[13.5px] font-semibold text-slate-800 placeholder-slate-400 outline-none"
              />
            </div>

            {/* 3. Cuisine Dropdown */}
            <div className="relative flex flex-col items-start px-4 py-1.5 border-r border-slate-150/80 w-full sm:w-[48%] lg:w-[155px] shrink-0 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Cuisine</span>
              <div className="flex items-center justify-between w-full mt-1.5 cursor-pointer">
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="w-full bg-transparent text-[13.5px] font-extrabold text-slate-800 outline-none cursor-pointer appearance-none pr-5 z-10"
                >
                  {CUISINES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="h-4.5 w-4.5 text-slate-455 absolute right-3 pointer-events-none z-0" />
              </div>
            </div>

            {/* 4. Sort By Dropdown */}
            <div className="relative flex flex-col items-start px-4 py-1.5 border-r border-slate-150/80 w-full sm:w-[48%] lg:w-[165px] shrink-0 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Sort By</span>
              <div className="flex items-center justify-between w-full mt-1.5 cursor-pointer">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-transparent text-[13.5px] font-extrabold text-slate-800 outline-none cursor-pointer appearance-none pr-5 z-10"
                >
                  <option value="Popular">Popular</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Top Rated">Top Rated</option>
                </select>
                <ChevronDown className="h-4.5 w-4.5 text-slate-455 absolute right-3 pointer-events-none z-0" />
              </div>
            </div>

            {/* 5. Rating Dropdown */}
            <div className="relative flex flex-col items-start px-4 py-1.5 w-full sm:w-[48%] lg:w-[155px] shrink-0 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Rating</span>
              <div className="flex items-center justify-between w-full mt-1.5 cursor-pointer">
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full bg-transparent text-[13.5px] font-extrabold text-slate-800 outline-none cursor-pointer appearance-none pr-5 z-10"
                >
                  <option value="All Ratings">All Ratings</option>
                  <option value="4.5+">4.5+ ★</option>
                  <option value="4.0+">4.0+ ★</option>
                  <option value="3.5+">3.5+ ★</option>
                </select>
                <ChevronDown className="h-4.5 w-4.5 text-slate-455 absolute right-3 pointer-events-none z-0" />
              </div>
            </div>

            {/* 6. Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-[48%] lg:w-auto shrink-0 justify-end ml-auto">
              <button 
                className="bg-[#0F766E] hover:bg-[#0c625c] active:scale-98 text-white px-7 py-3.5 rounded-2xl font-extrabold text-[14px] transition-all cursor-pointer shadow-md shadow-teal-800/10 flex-grow lg:flex-grow-0 text-center"
              >
                Search
              </button>
              <button className="h-12 w-12 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 flex items-center justify-center rounded-2xl cursor-pointer text-slate-500 hover:text-slate-800 transition-colors shrink-0">
                <SlidersHorizontal className="h-5 w-5" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* ─── SPLIT VIEW: RESTAURANT GRID & MAP PANEL ─── */}
      <div className="mx-auto max-w-[1760px] px-4 pt-16 pb-4">
        
        <div className="flex flex-col lg:flex-row items-stretch gap-6 mt-8 h-[calc(100vh-220px)] min-h-[650px]">
          
          {/* ==================== LEFT COLUMN: LISTING GRID ==================== */}
          <section className="w-full lg:w-[58%] xl:w-[60%] flex flex-col h-full overflow-y-auto no-scrollbar pr-1 text-left">
            
            {/* Header controls inside list */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-5 shrink-0">
              <h2 className="text-lg sm:text-[19px] font-black text-slate-800 tracking-tight leading-none">
                {filteredRestaurants.length}+ Food Spots Found
              </h2>
              
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-3xs cursor-pointer">
                <span className="text-[11px] font-semibold text-slate-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-[11px] font-black text-slate-700 outline-none cursor-pointer pr-1"
                >
                  <option value="Popular">Popular</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Top Rated">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Restaurant Cards Grid (Exact Design from Mockup) */}
            {filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 pb-16">
                {filteredRestaurants.map((restaurant) => {
                  const isHovered = selectedRestaurant?.id === restaurant.id;
                  return (
                    <div
                      key={restaurant.id}
                      onClick={() => setSelectedRestaurant(restaurant)}
                      onMouseEnter={() => setSelectedRestaurant(restaurant)}
                      className={`group bg-white rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col relative overflow-hidden shadow-xs hover:shadow-md ${
                        isHovered 
                          ? 'border-[#0F766E] ring-1 ring-[#0F766E]/20' 
                          : 'border-slate-200/80'
                      }`}
                    >
                      {/* Photo Container */}
                      <div className="relative h-[155px] w-full overflow-hidden bg-slate-100">
                        <img 
                          src={restaurant.image} 
                          alt={restaurant.title} 
                          className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                        
                        {/* Discount Tag */}
                        {restaurant.badge && (
                          <span className="absolute top-3 left-3 text-[10px] font-black uppercase bg-red-655 text-white px-2 py-0.5 rounded-md shadow-xs tracking-wider animate-pulse">
                            {restaurant.badge}
                          </span>
                        )}

                        {/* Wishlist Heart */}
                        <button
                          onClick={(e) => toggleWishlist(restaurant.id, e)}
                          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-xs border border-white/50 flex items-center justify-center shadow-3xs hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
                        >
                          <Heart 
                            className={`h-4.5 w-4.5 transition-colors ${
                              wishlist.includes(restaurant.id) 
                                ? 'fill-red-500 text-red-500 stroke-red-500' 
                                : 'text-slate-500'
                            }`} 
                            strokeWidth={2.2}
                          />
                        </button>
                      </div>

                      {/* Content Section */}
                      <div className="p-4 flex flex-col flex-grow text-left justify-between">
                        <div>
                          {/* Title & Rating */}
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-[14.5px] font-black text-slate-850 tracking-tight leading-snug group-hover:text-[#0F766E] transition-colors line-clamp-1">
                              {restaurant.title}
                            </h4>
                            <span className="text-[11.5px] font-extrabold text-white flex items-center gap-0.5 shrink-0 bg-emerald-600 px-1.5 py-0.5 rounded-md leading-none shadow-3xs">
                              {restaurant.rating.toFixed(1)} ★
                            </span>
                          </div>
                          
                          {/* Location & Distance */}
                          <div className="flex items-center justify-between text-[12px] font-semibold text-slate-400 mt-1">
                            <span className="flex items-center gap-1 leading-none">
                              <MapPin className="h-3.5 w-3.5 text-[#0F766E]" />
                              {restaurant.location.split(',')[0]}
                            </span>
                            <span className="text-slate-450 text-[11px] font-bold">{restaurant.distance}</span>
                          </div>

                          {/* Cuisine */}
                          <p className="text-[11.5px] text-slate-400 font-semibold mt-1.5 line-clamp-1 leading-relaxed">
                            {restaurant.cuisine}
                          </p>

                          {/* Badge pills */}
                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {restaurant.pills.map((p) => {
                              const isVeg = p === 'Pure Veg';
                              const isPop = p === 'Popular' || p === 'Fine Dining';
                              return (
                                <span 
                                  key={p} 
                                  className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-md ${
                                    isVeg 
                                      ? 'bg-emerald-50 text-emerald-650' 
                                      : isPop 
                                        ? 'bg-pink-50 text-pink-650' 
                                        : 'bg-slate-50 text-slate-600'
                                  }`}
                                >
                                  {p}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {/* Price Details at bottom */}
                        <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-4 text-[12px] font-bold text-slate-500">
                          <span>₹₹₹ • ₹{restaurant.price} {restaurant.pricePeriod}</span>
                          
                          <span 
                            onClick={(e) => {
                              e.stopPropagation();
                              setDetailModalRestaurant(restaurant);
                            }}
                            className="text-[11px] font-black text-[#0F766E] hover:underline cursor-pointer"
                          >
                            Book Table &rarr;
                          </span>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-white border border-slate-200 rounded-3xl py-20 px-4 text-center">
                <h3 className="text-[15px] font-black text-slate-800">No restaurants match your search</h3>
                <button 
                  onClick={() => {
                    setSelectedCuisine('All');
                    setSortBy('Popular');
                    setSelectedRating('All Ratings');
                    setSearchQuery('');
                  }}
                  className="mt-6 bg-[#0F766E] text-white text-[12.5px] font-extrabold px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}

          </section>

          {/* ==================== RIGHT COLUMN: MAP PANEL ==================== */}
          <section className="hidden lg:block lg:w-[42%] xl:w-[40%] h-full rounded-[28px] overflow-hidden border border-slate-200/80 shadow-2xs relative bg-slate-100">
            
            {/* Map Canvas with puducherry_map.png */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-300"
              style={{ 
                backgroundImage: `url(${mapImg})`,
                transform: `scale(${1 + (zoomLevel - 13) * 0.15})`
              }}
            />

            {/* Overlay Map Tint for soft look */}
            <div className="absolute inset-0 bg-slate-900/5 pointer-events-none" />

            {/* Custom Interactive Pins Layer */}
            {filteredRestaurants.map((restaurant) => {
              const isSelected = selectedRestaurant?.id === restaurant.id;
              return (
                <div
                  key={restaurant.id}
                  onClick={() => setSelectedRestaurant(restaurant)}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                  style={{ top: restaurant.mapY, left: restaurant.mapX }}
                >
                  <div className="flex flex-col items-center group">
                    {/* Circle Image Pin */}
                    <div className={`h-11 w-11 rounded-full border-2 bg-white overflow-hidden shadow-lg transition-transform hover:scale-110 active:scale-95 ${
                      isSelected 
                        ? 'border-[#EA580C] ring-4 ring-[#EA580C]/20 scale-105' 
                        : 'border-white group-hover:border-[#EA580C]/50'
                    }`}>
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.title} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    {/* Rating Bubble Below circle */}
                    <div className={`mt-0.5 px-2 py-0.5 rounded-md text-[9px] font-black text-white shadow-md leading-none ${
                      isSelected ? 'bg-[#EA580C]' : 'bg-slate-900/90'
                    }`}>
                      {restaurant.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Circular Green Clusters (Simulated pins) */}
            <div className="absolute top-[18%] left-[80%] z-10 h-7.5 w-7.5 rounded-full bg-emerald-700/90 text-white flex items-center justify-center font-black border-2 border-white shadow-md text-[10.5px]">
              8
            </div>
            <div className="absolute top-[48%] left-[25%] z-10 h-7.5 w-7.5 rounded-full bg-emerald-700/90 text-white flex items-center justify-center font-black border-2 border-white shadow-md text-[10.5px]">
              13
            </div>
            <div className="absolute top-[17%] left-[64%] z-10 h-7.5 w-7.5 rounded-full bg-emerald-700/90 text-white flex items-center justify-center font-black border-2 border-white shadow-md text-[10.5px]">
              12
            </div>
            <div className="absolute top-[31%] left-[78%] z-10 h-7.5 w-7.5 rounded-full bg-emerald-700/90 text-white flex items-center justify-center font-black border-2 border-white shadow-md text-[10.5px]">
              10
            </div>
            <div className="absolute top-[47%] left-[65%] z-10 h-7.5 w-7.5 rounded-full bg-emerald-700/90 text-white flex items-center justify-center font-black border-2 border-white shadow-md text-[10.5px]">
              6
            </div>
            <div className="absolute top-[75%] left-[34%] z-10 h-7.5 w-7.5 rounded-full bg-emerald-700/90 text-white flex items-center justify-center font-black border-2 border-white shadow-md text-[10.5px]">
              9
            </div>

            {/* Zoom Controls & Location Pointer */}
            <div className="absolute right-4 top-[50%] -translate-y-1/2 z-30 flex flex-col gap-2">
              <button 
                className="h-10 w-10 bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center rounded-xl shadow-md cursor-pointer text-slate-650 active:scale-95 transition-all"
                aria-label="Target Location"
              >
                <Compass className="h-5 w-5 text-slate-600" />
              </button>
              
              <div className="flex flex-col bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden">
                <button 
                  onClick={() => setZoomLevel(prev => Math.min(prev + 1, 16))}
                  className="h-10 w-10 hover:bg-slate-50 flex items-center justify-center border-b border-slate-100 cursor-pointer text-slate-650 active:scale-95 transition-all"
                  aria-label="Zoom In"
                >
                  <Plus className="h-4.5 w-4.5" />
                </button>
                <button 
                  onClick={() => setZoomLevel(prev => Math.max(prev - 1, 11))}
                  className="h-10 w-10 hover:bg-slate-50 flex items-center justify-center cursor-pointer text-slate-650 active:scale-95 transition-all"
                  aria-label="Zoom Out"
                >
                  <Minus className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Floating Selection Card on Map (Bottom Center/Right) */}
            {selectedRestaurant && (
              <div className="absolute bottom-5 left-5 right-5 z-30 bg-white rounded-2xl border border-slate-150 shadow-2xl p-3 text-left flex gap-3 animate-modal-box">
                {/* Image */}
                <div className="relative h-24 w-28 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                  <img 
                    src={selectedRestaurant.image} 
                    alt={selectedRestaurant.title} 
                    className="h-full w-full object-cover" 
                  />
                  {/* Heart */}
                  <button 
                    onClick={(e) => toggleWishlist(selectedRestaurant.id, e)}
                    className="absolute top-1.5 right-1.5 h-6.5 w-6.5 rounded-full bg-white/90 border border-slate-100 flex items-center justify-center shadow-xs cursor-pointer z-10"
                  >
                    <Heart 
                      className={`h-3.5 w-3.5 transition-colors ${
                        wishlist.includes(selectedRestaurant.id) 
                          ? 'fill-red-500 text-red-500 stroke-red-500' 
                          : 'text-slate-500'
                      }`} 
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="flex-grow flex flex-col justify-between text-left pr-4 relative">
                  {/* Close */}
                  <button 
                    onClick={() => setSelectedRestaurant(null)}
                    className="absolute top-0 right-0 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>

                  <div>
                    <h5 className="text-[13.5px] font-black text-slate-800 pr-4 truncate leading-snug">
                      {selectedRestaurant.title}
                    </h5>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mt-0.5">
                      <span className="text-emerald-600 flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-emerald-600 text-emerald-600" />
                        {selectedRestaurant.rating.toFixed(1)}
                      </span>
                      <span>({selectedRestaurant.reviews} reviews)</span>
                    </div>
                    <div className="text-[10.5px] font-semibold text-slate-400 mt-0.5 truncate">
                      {selectedRestaurant.location.split(',')[0]} • {selectedRestaurant.distance}
                    </div>
                    {/* Discount */}
                    {selectedRestaurant.badge && (
                      <span className="text-[10px] font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded-md mt-1.5 inline-block">
                        {selectedRestaurant.badge} up to ₹100
                      </span>
                    )}
                  </div>

                  <button 
                    onClick={() => setDetailModalRestaurant(selectedRestaurant)}
                    className="bg-[#0F766E] hover:bg-[#0c625c] text-white py-1.5 px-3 rounded-lg text-[11.5px] font-black mt-2 text-center w-full shadow-xs active:scale-98 transition-all cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            )}

          </section>

        </div>

      </div>

      {/* ==================== LOCATION CHANGE MODAL ==================== */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-modal-backdrop">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-[420px] p-6 text-left relative animate-modal-box">
            
            {/* Close */}
            <button
              onClick={() => setShowLocationModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-50 p-1.5 transition-all cursor-pointer"
            >
              <X className="h-5 w-5 stroke-[2.5]" />
            </button>

            <h3 className="text-lg font-black text-slate-850 flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-[#0F766E]" />
              <span>Select Destination</span>
            </h3>

            <div className="flex flex-col gap-2">
              {['Puducherry, India', 'Auroville, India', 'Goa, India', 'Bangalore, India'].map((loc) => {
                const isSelected = selectedLocation === loc;
                return (
                  <button
                    key={loc}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setShowLocationModal(false);
                    }}
                    className={`w-full text-left rounded-xl px-4 py-3 text-[13px] font-bold transition-all cursor-pointer flex items-center justify-between border ${
                      isSelected 
                        ? 'border-[#0F766E] bg-teal-50/20 text-[#0F766E]' 
                        : 'border-slate-150 hover:bg-slate-50 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span>{loc}</span>
                    {isSelected && <CheckCircle className="h-4.5 w-4.5 text-[#0F766E]" />}
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* ==================== RESTAURANT DETAIL MODAL ==================== */}
      {detailModalRestaurant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-modal-backdrop">
          <div className="bg-white rounded-[28px] border border-slate-150 shadow-2xl w-full max-w-[960px] max-h-[92vh] overflow-y-auto no-scrollbar flex flex-col text-left relative animate-modal-box">
            
            {/* Close Button */}
            <button
              onClick={() => setDetailModalRestaurant(null)}
              className="absolute top-5 right-5 z-40 text-slate-400 hover:text-slate-800 bg-white/95 border border-slate-150 rounded-full p-2 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
              aria-label="Close details"
            >
              <X className="h-5.5 w-5.5 stroke-[2.5]" />
            </button>

            {/* Top Large Photo */}
            <div className="relative h-[250px] sm:h-[300px] w-full shrink-0 overflow-hidden bg-slate-200">
              <img 
                src={detailModalRestaurant.image} 
                alt={detailModalRestaurant.title} 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              
              {/* Restaurant Header in image */}
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <span className="text-[10px] font-extrabold uppercase bg-[#0F766E] px-2.5 py-1 rounded-md tracking-wider">
                  {detailModalRestaurant.cuisine.split(',')[0]} • {detailModalRestaurant.location.split(',')[0]}
                </span>
                <h3 className="text-2xl sm:text-4xl font-black mt-2 tracking-tight">
                  {detailModalRestaurant.title}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-slate-200">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <strong>{detailModalRestaurant.rating.toFixed(1)}</strong> ({detailModalRestaurant.reviews} reviews)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {detailModalRestaurant.hours}
                  </span>
                </div>
              </div>
            </div>

            {/* Custom Tabs */}
            <div className="flex border-b border-slate-150 bg-slate-50/50 px-6 pt-3 shrink-0">
              {['About & Booking', 'Menu', 'Reviews'].map((tab) => {
                const isActive = detailTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setDetailTab(tab)}
                    className={`py-3.5 px-4 text-[13px] font-extrabold tracking-tight relative transition-all cursor-pointer ${
                      isActive ? 'text-[#0F766E]' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>{tab}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-[#0F766E]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col md:flex-row gap-8 overflow-y-auto max-h-[calc(92vh-380px)]">
              
              {/* TAB 1: ABOUT & BOOKING */}
              {detailTab === 'About & Booking' && (
                <>
                  {/* Left Column: Details */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-wider mb-2">About the Place</h4>
                      <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                        {detailModalRestaurant.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-4.5">
                      <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-wider mb-2.5">Key Facilities</h4>
                      <div className="grid grid-cols-2 gap-2.5">
                        {detailModalRestaurant.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-[12.5px] font-semibold text-slate-655">
                            <CheckCircle className="h-4.5 w-4.5 text-[#0F766E] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4.5">
                      <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-wider mb-2.5">Pricing details</h4>
                      <div className="flex items-center gap-4 bg-slate-50 border border-slate-150 rounded-xl p-3">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Average Cost</span>
                          <span className="text-[16px] font-black text-slate-800 mt-0.5 block">₹{detailModalRestaurant.price}</span>
                        </div>
                        <div className="h-8 border-l border-slate-200"></div>
                        <p className="text-[11.5px] text-slate-400 font-semibold leading-normal">
                          Average price computed for two people dining (alcohol excluded). Taxes extra.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Reservation Card */}
                  <div className="w-full md:w-[350px] shrink-0 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm h-fit">
                    {bookingConfirmed ? (
                      <div className="text-center py-6 flex flex-col items-center gap-3 animate-success-check">
                        <div className="h-14 w-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
                          <CheckCircle className="h-8 w-8" />
                        </div>
                        <div className="mt-2">
                          <h4 className="text-lg font-black text-slate-850">Table Reserved!</h4>
                          <p className="text-[11.5px] text-slate-400 font-semibold mt-1">A confirmation has been sent to your email.</p>
                        </div>
                        <div className="bg-slate-50 border border-dashed border-slate-250 rounded-xl py-3 px-6 w-full text-center mt-3 select-all">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Booking ID</span>
                          <strong className="text-[15px] font-extrabold text-slate-800 tracking-wider block mt-0.5">{bookingCode}</strong>
                        </div>
                        <div className="w-full bg-teal-50 border border-teal-100/55 rounded-xl p-3 text-left mt-2.5">
                          <div className="flex items-center gap-2.5 text-[11px] font-bold text-slate-700">
                            <Calendar className="h-4.5 w-4.5 text-[#0F766E]" />
                            <span>{bookingDate} at {bookingTime}</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-[11px] font-bold text-slate-700 mt-2">
                            <Users className="h-4.5 w-4.5 text-[#0F766E]" />
                            <span>{bookingGuests}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setBookingConfirmed(false)}
                          className="text-[11.5px] font-black text-[#0F766E] hover:underline cursor-pointer mt-4"
                        >
                          Book Another Table
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} className="space-y-4 text-left">
                        <h4 className="text-[13.5px] font-black text-slate-850 border-b border-slate-100 pb-2.5 flex items-center gap-2">
                          <Utensils className="h-4.5 w-4.5 text-[#0F766E]" />
                          <span>Reserve Table</span>
                        </h4>

                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider pl-0.5">Date</label>
                          <input
                            type="date"
                            required
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[12.5px] font-semibold text-slate-800 outline-none focus:border-[#0F766E]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider pl-0.5">Time</label>
                            <select
                              value={bookingTime}
                              onChange={(e) => setBookingTime(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[12.5px] font-semibold text-slate-800 outline-none focus:border-[#0F766E] cursor-pointer"
                            >
                              {['12:30 PM', '1:00 PM', '1:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'].map((t) => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider pl-0.5">Guests</label>
                            <select
                              value={bookingGuests}
                              onChange={(e) => setBookingGuests(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[12.5px] font-semibold text-slate-800 outline-none focus:border-[#0F766E] cursor-pointer"
                            >
                              {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6+ Guests'].map((g) => (
                                <option key={g} value={g}>{g}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="bg-teal-50/50 rounded-xl p-3 border border-teal-100/30 text-left">
                          <span className="text-[10px] font-extrabold text-[#0F766E] block uppercase tracking-wider">PROMO APPLIED</span>
                          <p className="text-[11px] text-slate-700 font-semibold mt-1">
                            Get complimentary chef's special dessert on arrival with this booking.
                          </p>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-[#0F766E] hover:bg-[#0c625c] active:scale-98 text-white py-3 rounded-xl text-[13px] font-black cursor-pointer shadow-md transition-all text-center block"
                        >
                          Confirm Free Reservation
                        </button>
                      </form>
                    )}
                  </div>
                </>
              )}

              {/* TAB 2: MENU */}
              {detailTab === 'Menu' && (
                <div className="w-full space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-wider">Digital Dining Menu</h4>
                    <span className="text-[11.5px] font-semibold text-slate-400">Prices are subject to seasonal taxes</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {detailModalRestaurant.menu.map((dish) => (
                      <div key={dish.name} className="flex gap-4 border border-slate-150 rounded-2xl p-4 bg-white relative">
                        
                        {/* Veg / Non veg icon */}
                        <div className="absolute top-4.5 right-4.5 shrink-0 flex items-center justify-center">
                          <div className={`h-4.5 w-4.5 border-2 flex items-center justify-center rounded-sm ${
                            dish.veg ? 'border-emerald-600' : 'border-red-650'
                          }`}>
                            <div className={`h-2.5 w-2.5 rounded-full ${
                              dish.veg ? 'bg-emerald-600' : 'bg-red-655'
                            }`}></div>
                          </div>
                        </div>

                        <div className="flex-grow text-left">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            {dish.category}
                          </span>
                          <h5 className="text-[14px] font-extrabold text-slate-850 mt-1 block pr-6">
                            {dish.name}
                          </h5>
                          <p className="text-[11.5px] text-slate-455 font-medium mt-1 leading-normal">
                            {dish.desc}
                          </p>
                          <span className="text-[14px] font-black text-[#0F766E] block mt-3.5">
                            ₹{dish.price}
                          </span>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: REVIEWS */}
              {detailTab === 'Reviews' && (
                <div className="w-full space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-wider">Customer Feedback</h4>
                    <span className="text-[11.5px] font-bold text-slate-700 flex items-center gap-1 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-md">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {detailModalRestaurant.rating.toFixed(1)} / 5.0
                    </span>
                  </div>

                  <div className="space-y-4">
                    {detailModalRestaurant.reviewsList.map((rev, i) => (
                      <div key={i} className="border border-slate-150 rounded-2xl p-4 bg-slate-50/20 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] font-extrabold text-slate-800">{rev.user}</span>
                          <span className="text-[11.5px] text-slate-400 font-semibold">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 mt-1.5 text-amber-400">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star 
                              key={idx} 
                              className={`h-3.5 w-3.5 ${idx < rev.rating ? 'fill-amber-400' : 'text-slate-200'}`} 
                              strokeWidth={0}
                            />
                          ))}
                        </div>
                        <p className="text-[12.5px] text-slate-600 font-medium leading-relaxed mt-2.5">
                          "{rev.comment}"
                        </p>
                        
                        <div className="mt-4 flex items-center gap-2">
                          <button className="flex items-center gap-1.5 text-[10.5px] font-bold text-slate-455 hover:text-slate-655 cursor-pointer">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            <span>Helpful</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* Injected Animations */}
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(8px); }
        }
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-backdrop {
          animation: modalFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-modal-box {
          animation: modalScaleIn 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-success-check {
          animation: modalScaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

    </div>
  );
}
