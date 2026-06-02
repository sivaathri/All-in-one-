import SearchBar from './SearchBar';
import Features from './Features';
import heroBg from '../assets/hero.png';

export default function HeroSection({ onSearch }) {
  return (
    <section className="relative w-full h-[540px] md:h-[580px] lg:h-[420px]">
      {/* Background Container */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`
        }}
      />
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Content Container */}
      <div className="relative w-full h-full px-4 sm:px-8 lg:px-15 flex flex-col justify-between pt-12 pb-6 z-20">
        
        {/* Left Side Content */}
        <div className="max-w-2xl text-left space-y-3.5 mt-6 md:mt-10">
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-white leading-[1.1]">
            Your Journey <br />
            <span className="bg-gradient-to-r from-secondary to-teal-300 bg-clip-text text-transparent drop-shadow-sm">
              Starts Here
            </span>
          </h1>
          <p className="text-sm sm:text-base font-medium text-slate-200/90 leading-relaxed max-w-md">
            Find the best stays, rentals, food, adventures and more in one place.
          </p>
        </div>

        {/* Search Bar & Features container at the bottom */}
        <div className="w-full flex flex-col items-center gap-6">
          <SearchBar onSearch={onSearch} />
          <Features />
        </div>

      </div>
    </section>
  );
}
