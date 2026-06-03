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
  return (
    <main className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section (holds floating search bar and transparent features) */}
      <HeroSection onSearch={onSearch} />

      {/* Categories Grid */}
      <Categories />

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
    </main>
  );
}
