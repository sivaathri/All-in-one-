import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const PROMOS = [
  {
    id: 1,
    emoji: '🔥',
    title: 'Adventure Alert!',
    desc: 'River Rafting in Coorg\nStarting at ₹1,499',
    cta: 'Book Now',
    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 2,
    emoji: '🏨',
    title: 'Stay Deal!',
    desc: 'Sea Breeze Resort Pondicherry\nOnly ₹2,499 / night',
    cta: 'View Deal',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 3,
    emoji: '🛵',
    title: 'Ride in Style!',
    desc: 'Royal Enfield Classic 350\nRent from ₹500 / day',
    cta: 'Rent Now',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 4,
    emoji: '🤿',
    title: 'Dive Deep!',
    desc: 'Scuba Diving in Pondicherry\nOnly ₹3,499 / person',
    cta: 'Explore',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=120&q=80',
  },
];

const VISIBLE_MS = 60_000; // Visible for 1 minute
const HIDDEN_MS = 10_000;   // Hidden for 10 seconds

export default function PromoToast() {
  const [visible, setVisible] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    let timeoutId;
    let index = 0;

    const startPromoCycle = () => {
      setPromoIndex(index);
      setVisible(true);

      // Hide the promo after 1 minute
      timeoutId = setTimeout(() => {
        setVisible(false);

        // Show the next promo after 10 seconds of being hidden
        timeoutId = setTimeout(() => {
          index = (index + 1) % PROMOS.length;
          startPromoCycle();
        }, HIDDEN_MS);
      }, VISIBLE_MS);
    };

    // Show the first promo 3 seconds after page loads
    timeoutId = setTimeout(startPromoCycle, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const promo = PROMOS[promoIndex];

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-6 left-5 z-[9999] transition-all duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      style={{
        transform: visible ? 'translateX(0) translateY(0)' : 'translateX(-120%) translateY(20px)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="flex items-center gap-3 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.18)] border border-slate-200/80 p-3 pr-4 w-[290px] max-w-[calc(100vw-40px)]">
        {/* Image */}
        <div className="h-[60px] w-[60px] rounded-xl overflow-hidden shrink-0 border border-slate-100">
          <img
            src={promo.image}
            alt={promo.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-black text-slate-900 leading-snug">
            {promo.title} {promo.emoji}
          </p>
          <p className="text-[11.5px] text-slate-500 font-medium leading-snug mt-0.5 whitespace-pre-line">
            {promo.desc}
          </p>
          <button className="mt-1.5 text-[11px] font-extrabold text-[#0F766E] hover:underline cursor-pointer">
            {promo.cta} →
          </button>
        </div>

        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
