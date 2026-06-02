import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import rentYamahaImg from '../assets/rent_yamaha.png';
import rentEnfieldImg from '../assets/rent_enfield.png';
import rentGlanzaImg from '../assets/rent_glanza.png';
import rentCretaImg from '../assets/rent_creta.png';
import rentSwiftImg from '../assets/rent_swift.png';
import rentActivaImg from '../assets/rent_activa.png';
import rentKtmImg from '../assets/rent_ktm.png';
import rentTharImg from '../assets/rent_thar.png';
import rentNexonImg from '../assets/car_rental.png';

export default function RentalServices() {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const rentalItems = [
    {
      id: 1,
      title: 'Yamaha R15 V4',
      type: 'Bike Rental',
      price: 1200,
      image: rentYamahaImg
    },
    {
      id: 2,
      title: 'Royal Enfield Classic 350',
      type: 'Bike Rental',
      price: 900,
      image: rentEnfieldImg
    },
    {
      id: 3,
      title: 'Toyota Glanza',
      type: 'Car Rental',
      price: 1799,
      image: rentGlanzaImg
    },
    {
      id: 4,
      title: 'Hyundai Creta',
      type: 'Car Rental',
      price: 2999,
      image: rentCretaImg
    },
    {
      id: 5,
      title: 'Maruti Swift',
      type: 'Car Rental',
      price: 1299,
      image: rentSwiftImg
    },
    {
      id: 6,
      title: 'Honda Activa 6G',
      type: 'Bike Rental',
      price: 400,
      image: rentActivaImg
    },
    {
      id: 7,
      title: 'KTM Duke 390',
      type: 'Bike Rental',
      price: 1500,
      image: rentKtmImg
    },
    {
      id: 8,
      title: 'Mahindra Thar 4x4',
      type: 'Car Rental',
      price: 3500,
      image: rentTharImg
    },
    {
      id: 9,
      title: 'Tata Nexon SUV',
      type: 'Car Rental',
      price: 2200,
      image: rentNexonImg
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

  const getBadgeStyle = (type) => {
    if (type.toLowerCase().includes('bike')) {
      return 'bg-[#EBF5F4] text-[#0F766E]';
    }
    return 'bg-[#EFF6FF] text-[#2563EB]';
  };

  return (
    <section className="w-full  pb-16 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight text-left">
            Rental Services
          </h2>
          <a
            href="#all-rentals"
            className="flex items-center gap-1.5 text-sm font-extrabold text-[#0F766E] hover:underline transition-all duration-200 cursor-pointer"
          >
            <span>View all</span>
            <ArrowRight className="h-4.5 w-4.5 text-[#0F766E] stroke-[2.5]" />
          </a>
        </div>

        {/* Slider Container with overlay buttons */}
        <div className="relative group/slider">
          {/* Scrollable Row */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 px-1 no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {rentalItems.map((item) => (
              <div key={item.id} className="snap-start">
                <div className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-[240px] shrink-0">
                  
                  {/* Image Container (White Background) */}
                  <div className="relative h-[155px] w-full bg-white flex items-center justify-center overflow-hidden p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-103 select-none pointer-events-none"
                    />
                  </div>

                  {/* Info Section */}
                  <div className="flex flex-col p-4 text-left border-t border-slate-100 flex-grow">
                    {/* Title */}
                    <h3 className="text-[14.5px] font-extrabold text-[#0F172A] tracking-tight line-clamp-1 leading-snug">
                      {item.title}
                    </h3>

                    {/* Rental Type Badge Pill */}
                    <div className="mt-2.5">
                      <span className={`inline-block text-[10.5px] font-extrabold px-3 py-1 rounded-md shadow-xs ${getBadgeStyle(item.type)}`}>
                        {item.type}
                      </span>
                    </div>

                    {/* Price Tag */}
                    <div className="flex items-baseline gap-1 mt-3">
                      <span className="text-[15.5px] font-black text-slate-800">₹{item.price.toLocaleString()}</span>
                      <span className="text-[11.5px] font-bold text-slate-400">/ day</span>
                    </div>
                  </div>

                </div>
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
