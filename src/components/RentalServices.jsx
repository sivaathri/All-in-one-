import { ArrowRight } from 'lucide-react';
import bikerImg from '../assets/biker.png';
import carrImg from '../assets/carr.png';

/* ─── Panel ─────────────────────────────────────────────────────── */
function RentalPanel({ title, subtitle, ctaText, bannerFrom, bannerTo, bgImage, onNavigate }) {
  const handlePanelClick = () => {
    const vehicleType = title.toLowerCase().includes('bike') ? 'Bike' : 'Car';
    onNavigate('rent-home', { vehicleType });
  };

  return (
    <div
      onClick={handlePanelClick}
      className="flex-1 min-w-0 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm bg-white relative flex flex-col cursor-pointer group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 min-h-[330px] sm:min-h-[350px] lg:min-h-[360px]"
    >
      {/* Full-panel background image */}
      {bgImage && (
        <img
          src={bgImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0 group-hover:scale-102 transition-transform duration-500"
        />
      )}

      {/* ── Banner Content ── */}
      <div
        className="relative overflow-hidden px-7 py-8 sm:px-9 sm:py-10 flex flex-col justify-between h-full z-10"
        style={{
          background: bgImage
            ? 'transparent'
            : `linear-gradient(135deg, ${bannerFrom} 0%, ${bannerTo} 100%)`,
        }}
      >
        <div className="max-w-[320px]">
          {/* Title row */}
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-[26px] sm:text-[30px] font-black text-white leading-tight tracking-tight drop-shadow-sm">
              {title}
            </h3>
          </div>

          {/* Subtitle */}
          <p className="text-[14px] sm:text-[15px] font-medium text-white/90 leading-relaxed drop-shadow-sm">
            {subtitle}
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-8">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePanelClick();
            }}
            className="inline-flex items-center gap-2 text-white text-[13px] font-bold px-5 py-2.5 rounded-full border border-white/35 cursor-pointer group/btn
              transition-all duration-300 ease-out
              hover:scale-105 hover:border-white/70 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
              active:scale-95 shadow-md"
            style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
          >
            {ctaText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Export ───────────────────────────────────────────────── */
export default function RentalServices({ onNavigate = () => {} }) {
  return (
    <section className="w-full pb-1 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight">
            Rental Services
          </h2>
          <button
            onClick={() => onNavigate('rent-home')}
            className="flex items-center gap-1.5 text-sm font-extrabold text-[#0F766E] hover:underline transition-all duration-200 cursor-pointer bg-transparent border-none"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Two Panels side by side */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          <RentalPanel
            title="Bike Rental"
            subtitle="Hit the road with perfect bikes"
            ctaText="Explore Bikes"
            bannerFrom="#0C3B2C"
            bannerTo="#1B6644"
            bgImage={bikerImg}
            onNavigate={onNavigate}
          />
          <RentalPanel
            title="Car Rental"
            subtitle="Drive comfort, drive class"
            ctaText="Explore Cars"
            bannerFrom="#0C2B4E"
            bannerTo="#1A4B88"
            bgImage={carrImg}
            onNavigate={onNavigate}
          />
        </div>

      </div>
    </section>
  );
}
