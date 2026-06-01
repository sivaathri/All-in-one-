import HeroSection from '../components/HeroSection';
import Categories from '../components/Categories';
import TrendingSection from '../components/TrendingSection';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section (holds floating search bar and transparent features) */}
      <HeroSection />

      {/* Categories Grid */}
      <Categories />

      {/* Trending Section */}
      <TrendingSection />
    </main>
  );
}
