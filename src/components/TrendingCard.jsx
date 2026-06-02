import { useState } from 'react';
import { Heart, Star } from 'lucide-react';

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
        return 'bg-[#0066FF] text-white';
      case 'best seller':
        return 'bg-[#15803D] text-white';
      default:
        return 'bg-slate-700 text-white';
    }
  };

  const unitText = item.pricePeriod.includes('for') ? item.pricePeriod : `/ ${item.pricePeriod}`;

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-[240px] shrink-0">
      {/* Image Container */}
      <div className="relative h-[155px] w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          loading="lazy"
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
        <div className="mt-0.5 text-[12px] font-semibold text-slate-400">
          {item.location}
        </div>

        {/* Rating and Reviews (Star first, rating, reviews count in parentheses) */}
        <div className="mt-1.5 flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-450">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" strokeWidth={0} />
          <span className="text-slate-800 font-extrabold ml-0.5">{item.rating.toFixed(1)}</span>
          <span>({item.reviews} reviews)</span>
        </div>

        {/* Price Tag (Teal bold price, gray period/unit text) */}
        <div className="flex items-center gap-1 mt-1.5">
          <span className="text-[15.5px] font-black text-[#0F766E]">₹{item.price.toLocaleString()}</span>
          <span className="text-[11.5px] font-bold text-slate-400">
            {unitText}
          </span>
        </div>
      </div>
    </div>
  );
}
