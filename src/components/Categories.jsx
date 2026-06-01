export default function Categories() {
  const categories = [
    {
      title: 'Stays',
      exploreLink: '#stays',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 44H44" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="12" y="10" width="24" height="34" rx="2" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
          <rect x="6" y="22" width="6" height="22" rx="1" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2.5" />
          <rect x="36" y="22" width="6" height="22" rx="1" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2.5" />
          <rect x="17" y="15" width="4" height="4" rx="0.5" fill="#E0F2FE" />
          <rect x="27" y="15" width="4" height="4" rx="0.5" fill="#E0F2FE" />
          <rect x="17" y="23" width="4" height="4" rx="0.5" fill="#E0F2FE" />
          <rect x="27" y="23" width="4" height="4" rx="0.5" fill="#E0F2FE" />
          <rect x="17" y="31" width="4" height="4" rx="0.5" fill="#E0F2FE" />
          <rect x="27" y="31" width="4" height="4" rx="0.5" fill="#E0F2FE" />
          <rect x="21" y="38" width="6" height="6" rx="1 1 0 0" fill="#1E3A8A" />
        </svg>
      )
    },
    {
      title: 'Bike Rental',
      exploreLink: '#bike-rental',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="32" r="8" fill="#F1F5F9" stroke="#1E293B" strokeWidth="3" />
          <circle cx="12" cy="32" r="2.5" fill="#94A3B8" />
          <circle cx="36" cy="32" r="8" fill="#F1F5F9" stroke="#1E293B" strokeWidth="3" />
          <circle cx="36" cy="32" r="2.5" fill="#94A3B8" />
          <path d="M12 32L21 20H33L36 32" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 32L24 32L33 20" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 20L18 28" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M15 20H23" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M33 20L30 12" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M27 12H34.5" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: 'Car Rental',
      exploreLink: '#car-rental',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="34" width="6" height="8" rx="1.5" fill="#1E293B" />
          <rect x="34" y="34" width="6" height="8" rx="1.5" fill="#1E293B" />
          <rect x="6" y="20" width="36" height="16" rx="4" fill="#DC2626" stroke="#991B1B" strokeWidth="2.2" />
          <path d="M10 20L14 10H34L38 20H10Z" fill="#F1F5F9" stroke="#991B1B" strokeWidth="2.2" strokeLinejoin="round" />
          <line x1="24" y1="10" x2="24" y2="20" stroke="#991B1B" strokeWidth="2.2" />
          <circle cx="12" cy="28" r="3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <circle cx="36" cy="28" r="3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <rect x="18" y="27" width="12" height="3" rx="1" fill="#475569" />
          <rect x="4" y="32" width="40" height="4" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      title: 'Food Spots',
      exploreLink: '#food-spots',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 20C8 12 15 8 24 8C33 8 40 12 40 20H8Z" fill="#D97706" stroke="#92400E" strokeWidth="2.2" />
          <circle cx="16" cy="13" r="0.8" fill="#FDE68A" />
          <circle cx="24" cy="11" r="0.8" fill="#FDE68A" />
          <circle cx="32" cy="14" r="0.8" fill="#FDE68A" />
          <circle cx="20" cy="16" r="0.8" fill="#FDE68A" />
          <circle cx="28" cy="15" r="0.8" fill="#FDE68A" />
          <path d="M6 20C7 20 8 22 9 22C10 22 11 20 12 20C13 20 14 22 15 22C16 22 17 20 18 20C19 20 20 22 21 22C22 22 23 20 24 20C25 20 26 22 27 22C28 22 29 20 30 20C31 20 32 22 33 22C34 22 35 20 36 20C37 20 38 22 39 22C40 22 41 20 42 20" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
          <path d="M7 24L24 28L41 24" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 24H41L38 27H10L7 24Z" fill="#FBBF24" />
          <rect x="8" y="27" width="32" height="5" rx="2.5" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
          <path d="M8 32H40V36C40 39.3 37.3 42 34 42H14C10.7 42 8 39.3 8 36V32Z" fill="#B45309" stroke="#78350F" strokeWidth="2.2" />
        </svg>
      )
    },
    {
      title: 'Adventures',
      exploreLink: '#adventures',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 20C8 10 15 6 24 6C33 6 40 10 40 20C36 20 33 18 30 20C27 22 21 22 18 20C15 18 12 20 8 20Z" fill="#F97316" stroke="#C2410C" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M17 7.5C18 10 19 14 18 20" stroke="#EA580C" strokeWidth="1.5" />
          <path d="M31 7.5C30 10 29 14 30 20" stroke="#EA580C" strokeWidth="1.5" />
          <path d="M24 6V21" stroke="#EA580C" strokeWidth="1.5" />
          <path d="M8 20L24 38" stroke="#475569" strokeWidth="1.2" />
          <path d="M18 20L24 38" stroke="#475569" strokeWidth="1.2" />
          <path d="M30 20L24 38" stroke="#475569" strokeWidth="1.2" />
          <path d="M40 20L24 38" stroke="#475569" strokeWidth="1.2" />
          <circle cx="24" cy="38" r="2" fill="#1E293B" />
          <rect x="22" y="40" width="4" height="2" fill="#3B82F6" />
        </svg>
      )
    },
    {
      title: 'Taxi Booking',
      exploreLink: '#taxi-booking',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="34" width="6" height="8" rx="1.5" fill="#1E293B" />
          <rect x="34" y="34" width="6" height="8" rx="1.5" fill="#1E293B" />
          <rect x="6" y="20" width="36" height="16" rx="4" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.2" />
          <path d="M10 20L14 10H34L38 20H10Z" fill="#1E293B" stroke="#CA8A04" strokeWidth="2.2" strokeLinejoin="round" />
          <line x1="24" y1="10" x2="24" y2="20" stroke="#CA8A04" strokeWidth="2.2" />
          <circle cx="12" cy="28" r="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="36" cy="28" r="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <rect x="18" y="27" width="12" height="3" rx="1" fill="#475569" />
          <rect x="18" y="5" width="12" height="5" rx="1.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
          <rect x="21" y="7" width="6" height="1.5" fill="#1E293B" />
          <rect x="4" y="32" width="40" height="4" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      title: 'Puncture Service',
      exploreLink: '#puncture-service',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="18" fill="#1E293B" stroke="#0F172A" strokeWidth="3.5" />
          <circle cx="24" cy="24" r="15" fill="none" stroke="#334155" strokeWidth="2.5" strokeDasharray="6 3" />
          <circle cx="24" cy="24" r="11" fill="#F1F5F9" stroke="#64748B" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="6" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          <path d="M24 6V18M24 30V42M6 24H18M30 24H42M11.3 11.3L19.8 19.8M28.2 28.2L36.7 36.7M11.3 36.7L19.8 28.2M28.2 19.8L36.7 11.3" stroke="#64748B" strokeWidth="2" />
          <circle cx="24" cy="24" r="2.5" fill="#475569" />
        </svg>
      )
    },
    {
      title: 'Mechanic Service',
      exploreLink: '#mechanic-service',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="rotate(-45 24 24)">
            <rect x="21" y="6" width="6" height="36" rx="1.5" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
            <circle cx="24" cy="8" r="5.5" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
            <rect x="22" y="4" width="4" height="4" fill="#F1F5F9" />
            <circle cx="24" cy="40" r="5.5" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
            <circle cx="24" cy="40" r="2" fill="#F1F5F9" />
          </g>
          <g transform="rotate(45 24 24)">
            <rect x="21" y="6" width="6" height="36" rx="1.5" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
            <circle cx="24" cy="8" r="5.5" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
            <rect x="22" y="4" width="4" height="4" fill="#F1F5F9" />
            <circle cx="24" cy="40" r="5.5" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
            <circle cx="24" cy="40" r="2" fill="#F1F5F9" />
          </g>
        </svg>
      )
    },
    {
      title: 'Tour Packages',
      exploreLink: '#tour-packages',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="14" width="32" height="26" rx="3" fill="#D97706" stroke="#92400E" strokeWidth="2.5" />
          <path d="M18 14V9C18 7.9 18.9 7 20 7H28C29.1 7 30 7.9 30 9V14" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="14" y="14" width="4" height="26" fill="#B45309" />
          <rect x="30" y="14" width="4" height="26" fill="#B45309" />
          <rect x="13" y="24" width="6" height="4" rx="1" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
          <rect x="29" y="24" width="6" height="4" rx="1" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
          <path d="M8 20V14H14" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M40 20V14H34" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M22 28L38 18L40 21L36 23L42 27.5L40 29.5L34 26L31 28.5L31 31.5L29 32.5L28.5 28.5L22 28Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 justify-center">
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href={cat.exploreLink}
              className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200/50 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md cursor-pointer"
            >
              {/* Icon container */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50/50 transition-colors duration-300 group-hover:bg-teal-50/50">
                {cat.icon}
              </div>
              {/* Title */}
              <span className="text-[13px] font-bold text-slate-850 tracking-wide line-clamp-1 group-hover:text-primary transition-colors">
                {cat.title}
              </span>
              {/* Explore Link */}
              <span className="mt-1.5 text-xs font-semibold text-teal-700 group-hover:text-teal-900 transition-colors">
                Explore
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
