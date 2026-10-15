import { useState } from 'react';
import { Heart } from 'lucide-react';

export default function TrendingCard({ item }) {
  const [isLiked, setIsLiked] = useState(false);

  // Badge background helper matching screenshot colors
  const getBadgeClass = (badge) => {
    switch (badge.toLowerCase()) {
      case 'top rated':
        return 'bg-[#15803D] text-white';
      case 'popular':
        return 'bg-[#F97316] text-white';
      case 'must try':
        return 'bg-[#8B5CF6] text-white';
      case 'adventure':
      case 'activity':
      case 'activities':
        return 'bg-[#0066FF] text-white';
      case 'best seller':
        return 'bg-[#15803D] text-white';
      default:
        return 'bg-slate-700 text-white';
    }
  };

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-[240px] shrink-0">
      {/* Image Container */}
      <div className="relative h-[155px] w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=600&q=80';
          }}
        />
        {/* Dark overlay top and bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5" />

        {/* Favorite Heart Icon (Directly on Image with Drop Shadow) */}
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

        {/* Category Badge */}
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

        {/* Location (Plain mixed-case text, no pin icon) */}
        <div className="mt-1 text-[12px] font-semibold text-slate-400">
          {item.location}
        </div>
      </div>
    </div>
  );
}
