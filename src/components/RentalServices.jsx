import { ArrowRight, Check } from 'lucide-react';
import bikerImg from '../assets/biker.png';
import carrImg from '../assets/carr.png';

/* ─── Panel ─────────────────────────────────────────────────────── */
function RentalPanel({ 
  title, 
  subtitle, 
  description,
  features = [],
  ctaText, 
  bannerFrom, 
  bannerTo, 
  bgImage, 
  onNavigate 
}) {
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

      {/* Subtle overlay gradient on left for crystal-clear readability */}
      {bgImage && (
        <div 
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.72) 0%, rgba(15, 23, 42, 0.42) 50%, rgba(15, 23, 42, 0.08) 85%, transparent 100%)'
          }}
        />
      )}

      {/* ── Banner Content ── */}
      <div
        className="relative overflow-hidden px-7 py-7 sm:px-9 sm:py-8 flex flex-col justify-between h-full z-10"
        style={{
          background: bgImage
            ? 'transparent'
            : `linear-gradient(135deg, ${bannerFrom} 0%, ${bannerTo} 100%)`,
        }}
      >
        {/* Top Header */}
        <div className="max-w-[340px]">
          <h3 className="text-[26px] sm:text-[30px] font-black text-white leading-tight tracking-tight drop-shadow-sm">
            {title}
          </h3>
          <p className="text-[14px] sm:text-[15px] font-semibold text-white/90 drop-shadow-sm mt-1">
            {subtitle}
          </p>
        </div>

        {/* ── In-between gap text and feature points ── */}
        <div className="my-3 max-w-[320px] flex flex-col gap-2.5">
          {description && (
            <p className="text-[13px] sm:text-[13.5px] text-white/85 leading-relaxed font-medium drop-shadow-sm">
              {description}
            </p>
          )}

          {features.length > 0 && (
            <div className="flex flex-col gap-2 pt-1">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-white text-[12.5px] sm:text-[13px] font-semibold drop-shadow-sm">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/30 border border-emerald-400/50 text-emerald-300">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div>
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
            description="Explore city lanes and scenic coastal routes on top scooters and cruisers."
            features={[
              'Starting from ₹399 / day',
              'Zero security deposit & instant booking',
              'Complimentary helmets included'
            ]}
            ctaText="Explore Bikes"
            bannerFrom="#0C3B2C"
            bannerTo="#1B6644"
            bgImage={bikerImg}
            onNavigate={onNavigate}
          />
          <RentalPanel
            title="Car Rental"
            subtitle="Drive comfort, drive class"
            description="Premium self-drive hatchbacks, sedans, and 4x4 SUVs for any road trip."
            features={[
              'Starting from ₹1,299 / day',
              'Unlimited kilometers & 24/7 support',
              'Clean, sanitized & verified fleet'
            ]}
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
