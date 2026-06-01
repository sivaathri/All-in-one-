import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import TrendingCard from './TrendingCard';

export default function TrendingSection() {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const trendingItems = [
    {
      id: 1,
      title: 'Sea Breeze Resort',
      location: 'Pondicherry',
      rating: 4.6,
      reviews: 128,
      price: 2499,
      pricePeriod: 'night',
      badge: 'Top Rated',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'Royal Enfield Classic 350',
      location: 'Pondicherry',
      rating: 4.8,
      reviews: 96,
      price: 500,
      pricePeriod: 'day',
      badge: 'Popular',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Cafe Xtasi',
      location: 'Pondicherry',
      rating: 4.5,
      reviews: 230,
      price: 300,
      pricePeriod: 'for two',
      badge: 'Must Try',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'Paragliding Experience',
      location: 'Auroville, Pondicherry',
      rating: 4.9,
      reviews: 75,
      price: 2999,
      pricePeriod: 'person',
      badge: 'Adventure',
      image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      title: 'Pondicherry 3N/4D Tour',
      location: 'Pondicherry',
      rating: 4.7,
      reviews: 160,
      price: 8999,
      pricePeriod: 'person',
      badge: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=600&q=80'
    }
  ];

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
      // Run once on load to configure arrows correctly
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
    <section className="w-full py-16 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col text-left">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Trending Near You
            </h2>
            <div className="h-1 w-12 bg-primary rounded-full mt-2" />
          </div>
          <a
            href="#all-trending"
            className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-teal-850 hover:underline transition-all duration-200 cursor-pointer"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Slider Container with overlay buttons */}
        <div className="relative group/slider">
          {/* Scrollable Row */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 px-1 no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {trendingItems.map((item) => (
              <div key={item.id} className="snap-start">
                <TrendingCard item={item} />
              </div>
            ))}
          </div>

          {/* Left Arrow Button */}
          {showLeftArrow && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 shadow-lg text-slate-700 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Right Arrow Button */}
          {showRightArrow && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 shadow-lg text-slate-700 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
