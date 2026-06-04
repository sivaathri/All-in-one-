import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import Categories from '../components/Categories';
import TrendingSection from '../components/TrendingSection';
import RentalServices from '../components/RentalServices';
import FoodSpotsSection from '../components/FoodSpotsSection';
import ExperienceBanner from '../components/ExperienceBanner';
import UnmissableExperiences from '../components/UnmissableExperiences';
import DownloadAppBanner from '../components/DownloadAppBanner';
import PromoToast from '../components/PromoToast';
import HomeAdModal from '../components/HomeAdModal';

export default function Home({ onSearch, onNavigate }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 relative">
      {/* Hero Section (holds floating search bar and transparent features) */}
      <HeroSection onSearch={onSearch} />

      {/* Categories Grid */}
      <Categories onNavigate={onNavigate} />

      {/* Trending Section */}
      <TrendingSection />

      {/* Rental Services Section */}
      <RentalServices onNavigate={onNavigate} />

      {/* Top Food Spots Near You Section */}
      <FoodSpotsSection />

      {/* Newsletter Promo Banner */}
      <ExperienceBanner />

      {/* Unmissable Experiences grid */}
      <UnmissableExperiences />

      {/* Download App Promo Banner */}
      <DownloadAppBanner />

      {/* Promo Ad Toast — slides in from bottom-left every 60s */}
      <PromoToast />

      {/* Welcome/Promo Banner Modal Pop-up on Open */}
      <HomeAdModal />

      {/* Smooth back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-3 bg-[#0F766E] hover:bg-[#0D665F] text-white rounded-full shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center border border-teal-500/10 ${
          showScrollTop 
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5.5 w-5.5 stroke-[2.5]" />
      </button>
    </main>
  );
}
