import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Heart, Star, Utensils } from 'lucide-react';

const FOOD_ITEMS = [
  {
    id: 1,
    title: 'Coromandel Café',
    location: 'Pondicherry',
    rating: 4.6,
    reviews: 128,
    price: 1200,
    pricePeriod: 'for two',
    cuisine: 'Cafe • Continental',
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: 'Le Dupont',
    location: 'Pondicherry',
    rating: 4.4,
    reviews: 96,
    price: 1800,
    pricePeriod: 'for two',
    cuisine: 'French • Bakery',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: 'Surguru',
    location: 'Pondicherry',
    rating: 4.5,
    reviews: 230,
    price: 250,
    pricePeriod: 'for two',
    cuisine: 'South Indian',
    badge: 'Must Try',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    title: 'Villa Shanti',
    location: 'Pondicherry',
    rating: 4.7,
    reviews: 180,
    price: 1500,
    pricePeriod: 'for two',
    cuisine: 'Multi Cuisine',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    title: 'Bay of Buddha',
    location: 'Pondicherry',
    rating: 4.3,
    reviews: 75,
    price: 1300,
    pricePeriod: 'for two',
    cuisine: 'Italian • Cafe',
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    title: 'Theevu Plage',
    location: 'Pondicherry',
    rating: 4.6,
    reviews: 142,
    price: 2000,
    pricePeriod: 'for two',
    cuisine: 'Seafood • Coastal',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1534080391025-0979e8304b2b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 7,
    title: 'Tanto Pizzeria',
    location: 'Auroville',
    rating: 4.5,
    reviews: 340,
    price: 800,
    pricePeriod: 'for two',
    cuisine: 'Italian • Woodfire Pizza',
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 8,
    title: 'GMT Ice Cream',
    location: 'White Town',
    rating: 4.8,
    reviews: 412,
    price: 300,
    pricePeriod: 'for two',
    cuisine: 'Desserts • Gelato',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 9,
    title: 'Baker Street',
    location: 'Pondicherry',
    rating: 4.3,
    reviews: 198,
    price: 450,
    pricePeriod: 'for two',
    cuisine: 'French • Cafe • Desserts',
    badge: 'Must Try',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 10,
    title: 'The Promenade',
    location: 'Rock Beach',
    rating: 4.6,
    reviews: 215,
    price: 2200,
    pricePeriod: 'for two',
    cuisine: 'Multi Cuisine • Seafood',
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
  }
];

function FoodCard({ item }) {
  const [isLiked, setIsLiked] = useState(false);

  const getBadgeClass = (badge) => {
    switch (badge.toLowerCase()) {
      case 'top rated':
      case 'best seller':
        return 'bg-[#15803D] text-white';
      case 'popular':
        return 'bg-[#F97316] text-white';
      case 'must try':
        return 'bg-[#8B5CF6] text-white';
      case 'new':
        return 'bg-[#2563EB] text-white';
      default:
        return 'bg-slate-700 text-white';
    }
  };

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-[240px] shrink-0">
      {/* Image Container */}
      <div className="relative h-[155px] w-full overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
          }}
        />
        {/* Dark overlay top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5" />

        {/* Favorite Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 z-10 text-white hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer drop-shadow-md"
          aria-label="Add to favorites"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500 stroke-red-500' : 'text-white'
            }`}
            strokeWidth={2.2}
          />
        </button>

        {/* Badge */}
        <span
          className={`absolute top-2.5 left-2.5 z-10 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md shadow-sm ${getBadgeClass(
            item.badge
          )}`}
        >
          {item.badge}
        </span>
      </div>

      {/* Info Section */}
      <div className="flex flex-col p-3.5 text-left flex-grow">
        {/* Title */}
        <h3 className="text-[14.5px] font-extrabold text-[#0F172A] tracking-tight line-clamp-1 group-hover:text-[#0F766E] transition-colors duration-200">
          {item.title}
        </h3>

        {/* Location */}
        <div className="mt-0.5 text-[12px] font-semibold text-slate-400">
          {item.location}
        </div>

        {/* Rating and Reviews */}
        <div className="mt-1.5 flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-450">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" strokeWidth={0} />
          <span className="text-slate-800 font-extrabold ml-0.5">{item.rating.toFixed(1)}</span>
          <span>({item.reviews} reviews)</span>
        </div>

        {/* Cuisine Type */}
        <div className="mt-1.5 text-[11.5px] font-bold text-slate-400 leading-tight">
          {item.cuisine}
        </div>

        {/* Price Tag */}
        <div className="flex items-center gap-1 mt-1.5">
          <span className="text-[15.5px] font-black text-[#0F766E]">₹{item.price.toLocaleString()}</span>
          <span className="text-[11.5px] font-bold text-slate-400">
            {item.pricePeriod}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function FoodSpotsSection() {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full pt-6 pb-6 bg-white overflow-hidden border-t border-slate-100">
      <div className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            {/* Round Steaming Mug / Utensils Icon Badge */}
            <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#0F766E] border border-emerald-100/50 shadow-xs shrink-0">
              <Utensils className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <h2 className="text-2xl sm:text-[24px] font-black text-slate-900 tracking-tight leading-tight">
                Top Food Spots Near You
              </h2>
              <span className="text-[12.5px] font-medium text-slate-400 mt-0.5">
                Discover trending restaurants and must-try cuisines
              </span>
            </div>
          </div>

          <a
            href="#all-food-spots"
            className="flex items-center gap-1.5 text-sm font-extrabold text-[#0F766E] hover:underline transition-all duration-200 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="h-4.5 w-4.5 text-[#0F766E] stroke-[2.5]" />
          </a>
        </div>

        {/* Slider Container with overlay buttons */}
        <div className="relative group/slider mt-6">
          {/* Scrollable Row */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 pt-2 px-1 no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {FOOD_ITEMS.map((item) => (
              <div key={item.id} className="snap-start">
                <FoodCard item={item} />
              </div>
            ))}
          </div>

          {/* Left Arrow Button */}
          {showLeftArrow && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-5.5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white border border-slate-200 shadow-md text-slate-700 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5.5 w-5.5" strokeWidth={2.5} />
            </button>
          )}

          {/* Right Arrow Button */}
          {showRightArrow && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-5.5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white border border-slate-200 shadow-md text-slate-700 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5.5 w-5.5" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
