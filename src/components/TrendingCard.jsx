import { useState } from 'react';
import { Heart, Star, MapPin } from 'lucide-react';

export default function TrendingCard({ item }) {
  const [isLiked, setIsLiked] = useState(false);

  // Badge background helper
  const getBadgeClass = (badge) => {
    switch (badge.toLowerCase()) {
      case 'top rated':
        return 'bg-emerald-600 text-white';
      case 'popular':
        return 'bg-orange-500 text-white';
      case 'must try':
        return 'bg-violet-600 text-white';
      case 'adventure':
        return 'bg-blue-600 text-white';
      case 'best seller':
        return 'bg-teal-900 text-white';
      default:
        return 'bg-slate-700 text-white';
    }
  };

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all-300 duration-300 w-[280px] shrink-0">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Dark overlay top and bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5" />

        {/* Favorite Heart Icon */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3.5 right-3.5 z-10 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-white/70 backdrop-blur-md border border-white/40 shadow-sm text-slate-700 hover:bg-white hover:scale-105 active:scale-90 transition-all duration-200 cursor-pointer"
          aria-label="Add to favorites"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-slate-700'
            }`}
          />
        </button>

        {/* Category Badge */}
        <span
          className={`absolute top-3.5 left-3.5 z-10 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-sm ${getBadgeClass(
            item.badge
          )}`}
        >
          {item.badge}
        </span>
      </div>

      {/* Info Section */}
      <div className="flex flex-col p-4 text-left flex-grow">
        {/* Title */}
        <h3 className="text-sm font-bold text-slate-800 tracking-wide line-clamp-1 group-hover:text-primary transition-colors duration-200">
          {item.title}
        </h3>

        {/* Location */}
        <div className="mt-1 flex items-center gap-0.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <MapPin className="h-3.5 w-3.5 text-slate-400" />
          <span>{item.location}</span>
        </div>

        {/* Rating and Reviews */}
        <div className="mt-2.5 flex items-center gap-1 text-xs">
          <div className="flex items-center text-amber-500">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
          </div>
          <span className="font-bold text-slate-800">{item.rating.toFixed(1)}</span>
          <span className="text-slate-400 font-medium">({item.reviews} reviews)</span>
        </div>

        {/* Separator */}
        <div className="my-3 border-t border-slate-100" />

        {/* Price Tag */}
        <div className="flex items-baseline gap-1 mt-auto">
          <span className="text-base font-extrabold text-primary">₹{item.price}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
            / {item.pricePeriod}
          </span>
        </div>
      </div>
    </div>
  );
}
