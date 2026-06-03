import { useRef, useState, useEffect } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import bikerImg from '../assets/biker.png';
import carrImg from '../assets/carr.png';
import rentYamahaImg from '../assets/rent_yamaha.png';
import rentEnfieldImg from '../assets/rent_enfield.png';
import rentGlanzaImg from '../assets/rent_glanza.png';
import rentCretaImg from '../assets/rent_creta.png';
import rentSwiftImg from '../assets/rent_swift.png';
import rentActivaImg from '../assets/rent_activa.png';
import rentKtmImg from '../assets/rent_ktm.png';
import rentTharImg from '../assets/rent_thar.png';
import rentNexonImg from '../assets/car_rental.png';

/* ─── Data ─────────────────────────────────────────────────────── */
const bikeItems = [
  { id: 1, title: 'Yamaha R15 V4',              image: rentYamahaImg  },
  { id: 2, title: 'Royal Enfield Classic 350',   image: rentEnfieldImg },
  { id: 3, title: 'Honda Activa 6G',             image: rentActivaImg  },
  { id: 4, title: 'KTM Duke 390',               image: rentKtmImg     },
];

const carItems = [
  { id: 5, title: 'Toyota Glanza',      image: rentGlanzaImg },
 
  { id: 7, title: 'Maruti Swift',       image: rentSwiftImg  },
  { id: 8, title: 'Mahindra Thar 4x4',  image: rentTharImg   },
  { id: 9, title: 'Tata Nexon SUV',     image: rentNexonImg  },
];

/* ─── Panel ─────────────────────────────────────────────────────── */
function RentalPanel({ title, subtitle, ctaText, heroImage, heroAlt, items, bannerFrom, bannerTo, accentHex, icon, bgImage }) {
  const scrollRef = useRef(null);
  const [showArrow, setShowArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) { el.addEventListener('scroll', checkScroll); checkScroll(); }
    return () => { if (el) el.removeEventListener('scroll', checkScroll); };
  }, []);

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="flex-1 min-w-0 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm bg-white relative flex flex-col">

      {/* Full-panel background image */}
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0"
          />
        </>
      )}

      {/* ── Banner ── */}
      <div
        className="relative overflow-hidden px-5 pt-5 pb-16"
        style={{
          background: bgImage
            ? 'transparent'
            : `linear-gradient(135deg, ${bannerFrom} 0%, ${bannerTo} 100%)`,
          minHeight: 170,
        }}
      >

        {/* Title row */}
        <div className="flex items-center gap-3 mb-1 relative z-10">
          <h3 className="text-[23px] sm:text-[25px] font-black text-white leading-tight tracking-tight">
            {title}
          </h3>
        </div>

        {/* Subtitle */}
        <p className="text-[13px] font-medium text-white/60 mb-4 relative z-10">
          {subtitle}
        </p>

        {/* CTA Button */}
        <button
          className="relative z-10 flex items-center gap-2 text-white text-[12.5px] font-bold px-4 py-1.5 rounded-full border border-white/30 cursor-pointer mb-3 group/btn
            transition-all duration-300 ease-out
            hover:scale-105 hover:border-white/60 hover:shadow-[0_0_18px_rgba(255,255,255,0.25)]
            active:scale-95"
          style={{ background: 'rgba(255,255,255,0.12)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
        >
          {ctaText}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" strokeWidth={2.5} />
        </button>

        
      </div>

      {/* ── Cards Row ── overlaps banner */}
      <div className="px-4 pb-4 relative z-10">
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth -mt-[48px] relative z-20 pr-12"
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shrink-0 flex flex-col w-[150px] overflow-hidden"
              >
                {/* Vehicle image */}
                <div className="h-[88px] w-full flex items-end justify-center px-3 pt-2 pb-1">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="px-3 pb-3 pt-2">
                  <p className="text-[12.5px] font-bold text-slate-800 leading-snug line-clamp-1 mb-2">
                    {item.title}
                  </p>
                 
                </div>
              </div>
            ))}
          </div>

       
          
        </div>
      </div>
    </div>
  );
}

/* ─── Main Export ───────────────────────────────────────────────── */
export default function RentalServices() {
  return (
    <section className="w-full pb-1 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight">
            Rental Services
          </h2>
          <a
            href="#all-rentals"
            className="flex items-center gap-1.5 text-sm font-extrabold text-[#0F766E] hover:underline transition-all duration-200 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </div>

        {/* Two Panels side by side */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          <RentalPanel
            title="Bike Rental"
            subtitle="Hit the road with perfect bikes"
            ctaText="Explore Bikes"
            heroImage={rentKtmImg}
            heroAlt="Sport bike"
            items={bikeItems}
            bannerFrom="#0C3B2C"
            bannerTo="#1B6644"
            accentHex="#16A97A"
           
            bgImage={bikerImg}
          />
          <RentalPanel
            title="Car Rental"
            subtitle="Drive comfort, drive class"
            ctaText="Explore Cars"
            heroImage={rentCretaImg}
            heroAlt="SUV Car"
            items={carItems}
            bannerFrom="#0C2B4E"
            bannerTo="#1A4B88"
            accentHex="#2563EB"
           
            bgImage={carrImg}
          />
        </div>

      </div>
    </section>
  );
}
