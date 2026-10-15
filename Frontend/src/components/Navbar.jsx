import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Heart } from 'lucide-react';
import { AuthModal } from '../auth';
import BecomeHostModal from './BecomeHostModal';

export default function Navbar({ onNavigate = () => {}, currentPage = 'home' }) {
  const [activeMenu, setActiveMenu] = useState('Stays');
  const [isOpen, setIsOpen] = useState(false);
  const [rentalsDropdown, setRentalsDropdown] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  // Authentication & Host Popup states
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // 'login' or 'register'
  const [isBecomeHostOpen, setIsBecomeHostOpen] = useState(false);
  // Synchronous initial state from localStorage to eliminate any 1-second flash on refresh
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUserStr = localStorage.getItem('tripverse_user');
      return savedUserStr ? JSON.parse(savedUserStr) : null;
    } catch {
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return Boolean(localStorage.getItem('tripverse_token') || localStorage.getItem('tripverse_user'));
    } catch {
      return false;
    }
  });

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  // Sync across tabs if user logs in or logs out elsewhere
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedUserStr = localStorage.getItem('tripverse_user');
        const savedToken = localStorage.getItem('tripverse_token');
        if (savedUserStr) {
          setCurrentUser(JSON.parse(savedUserStr));
          setIsLoggedIn(true);
        } else if (savedToken) {
          setIsLoggedIn(true);
        } else {
          setCurrentUser(null);
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.warn('Cross-tab session sync error:', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Listen for global open-become-host-modal events (e.g. from footer)
  useEffect(() => {
    const handleOpenHostModal = () => setIsBecomeHostOpen(true);
    window.addEventListener('open-become-host-modal', handleOpenHostModal);
    return () => window.removeEventListener('open-become-host-modal', handleOpenHostModal);
  }, []);

  const handleAuthSuccess = (userData) => {
    if (userData) {
      const user = userData.user || userData;
      setCurrentUser(user);
    } else {
      try {
        const saved = localStorage.getItem('tripverse_user');
        if (saved) setCurrentUser(JSON.parse(saved));
      } catch (e) {}
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('tripverse_token');
    localStorage.removeItem('tripverse_user');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setProfileDropdownOpen(false);
  };

  const displayName = currentUser?.fullName || currentUser?.name || 'User';
  const displayEmail = currentUser?.email || currentUser?.mobileNumber || currentUser?.phone || '';
  const userInitials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'U';

  // Click outside profile dropdown handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);

  // Sync active menu with current page routing
  useEffect(() => {
    if (currentPage === 'home') {
      setActiveMenu('Home');
    } else if (currentPage === 'stays-results') {
      setActiveMenu('Stays');
    } else if (currentPage === 'rent-home' || currentPage === 'rent-results' || currentPage === 'rent-detail') {
      setActiveMenu('Rentals');
    } else if (currentPage === 'food-spots') {
      setActiveMenu('Food Spots');
    } else if (currentPage === 'adventures' || currentPage === 'activities') {
      setActiveMenu('Activities');
    } else if (currentPage === 'services') {
      setActiveMenu('Services');
    }
  }, [currentPage]);

  const menuItems = [
    { name: 'Home', path: '#home' },
    { name: 'Stays', path: '#stays' },
    { 
      name: 'Rentals', 
      path: '#rentals',
      dropdown: true,
      dropdownItems: [
        { name: 'Bike Rental', vehicleType: 'Bike', desc: 'Scooters, Royal Enfields & Sports Bikes' },
        { name: 'Car Rental', vehicleType: 'Car', desc: 'Sedans, Hatchbacks, SUVs & Thar' }
      ]
    },
    { name: 'Food Spots', path: '#food' },
    { name: 'Activities', path: '#activities' },
    { name: 'Taxi Booking', path: '#taxi' },
    { 
      name: 'Services', 
      path: '#services',
      dropdown: true,
      dropdownItems: [
        { name: 'Mechanic Service', tab: 'mechanic', desc: 'On-spot breakdown & repairs', icon: 'wrench' },
        { name: 'Puncture Service', tab: 'puncture', desc: 'Doorstep & roadside tyre fix', icon: 'disc' }
      ]
    },
    { name: 'Tour Packages', path: '#packages' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm transition-all duration-300">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <svg className="w-10 h-10 shrink-0" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Green double-headed route arrow underneath */}
              <path d="M7 22C9 28 27 28 29 22" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" />
              {/* Left arrowhead pointing up-left */}
              <path d="M9.5 23L5.5 20L5 25" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Right arrowhead pointing up-right */}
              <path d="M26.5 23L30.5 20L31 25" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Orange Map Pin */}
              <path d="M18 5C13.5 5 10 8.5 10 13C10 19.5 18 27 18 27C18 27 26 19.5 26 13C26 8.5 22.5 5 18 5Z" fill="white" stroke="#EA580C" strokeWidth="2.5" strokeLinejoin="round" />
              {/* Green Center Dot */}
              <circle cx="18" cy="13" r="2.8" fill="#0F766E" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[23px] font-extrabold tracking-tight text-[#0F766E] leading-none">
                TripVerse
              </span>
              <span className="text-[9px] font-bold tracking-wider text-slate-500 mt-1">
                Explore. Experience. Enjoy.
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          {currentPage !== 'become-host' && (
            <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => {
              if (item.dropdown) {
                const isRentals = item.name === 'Rentals';
                const isDropdownOpen = isRentals ? rentalsDropdown : servicesDropdown;
                const setDropdown = isRentals ? setRentalsDropdown : setServicesDropdown;
                const isActive = activeMenu === item.name;

                return (
                  <div
                    key={item.name}
                    className="relative py-2"
                    onMouseEnter={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}
                  >
                    <button
                      onClick={() => {
                        setActiveMenu(item.name);
                        if (item.name === 'Services') {
                          onNavigate('services');
                        } else if (item.name === 'Rentals') {
                          onNavigate('rent-home');
                        }
                      }}
                      className={`flex items-center gap-1 text-[15px] font-semibold transition-colors duration-200 cursor-pointer outline-none ${
                        isActive
                          ? 'text-[#0F766E]'
                          : 'text-slate-800 hover:text-[#0F766E]'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`h-3.5 w-3.5 shrink-0 stroke-[2.5] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#0F766E]' : 'text-slate-700'}`} />
                    </button>
                    {isActive && (
                      <span className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-6 h-[2.5px] rounded-full bg-[#0F766E]" />
                    )}
                    
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute left-0 top-full mt-1 w-64 origin-top-left rounded-2xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black/5 transition-all duration-200 z-50 animate-in fade-in slide-in-from-top-1">
                        <div className="px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                          {item.name === 'Rentals' ? 'Self-Drive Fleet in Pondy' : 'Vehicle Roadside Support'}
                        </div>
                        {item.dropdownItems.map((subItem) => {
                          const subName = typeof subItem === 'string' ? subItem : subItem.name;
                          const subTab = typeof subItem === 'object' ? subItem.tab : null;
                          const subDesc = typeof subItem === 'object' ? subItem.desc : null;
                          const subVehicle = typeof subItem === 'object' ? subItem.vehicleType : (subName.includes('Car') ? 'Car' : 'Bike');
                          return (
                            <button
                              key={subName}
                              onClick={(e) => {
                                e.preventDefault();
                                setDropdown(false);
                                setActiveMenu(item.name);
                                if (item.name === 'Services') {
                                  onNavigate('services', subTab ? { tab: subTab } : null);
                                } else if (item.name === 'Rentals') {
                                  onNavigate('rent-home', { vehicleType: subVehicle });
                                }
                              }}
                              className="w-full text-left rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-[#0F766E] transition-colors outline-none cursor-pointer flex flex-col group"
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="font-extrabold text-[13px] text-slate-900 group-hover:text-[#0F766E]">
                                  {subName}
                                </span>
                                <span className="text-[10px] font-bold text-teal-600 bg-teal-50/80 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                  Select
                                </span>
                              </div>
                              {subDesc && (
                                <span className="text-[11px] text-slate-400 font-normal mt-0.5 leading-snug">
                                  {subDesc}
                                </span>
                              )}
                            </button>
                          );
                        })}
                        <div className="mt-1 pt-1 border-t border-slate-100">
                          <button
                            onClick={() => {
                              setDropdown(false);
                              setActiveMenu(item.name);
                              if (item.name === 'Services') {
                                onNavigate('services');
                              } else if (item.name === 'Rentals') {
                                onNavigate('rent-home');
                              }
                            }}
                            className="w-full text-center py-1.5 text-[11px] font-bold text-[#0F766E] hover:underline cursor-pointer"
                          >
                            Explore All {item.name} →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = activeMenu === item.name;
              return (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveMenu(item.name);
                    if (item.name === 'Home') {
                      onNavigate('home');
                    } else if (item.name === 'Stays') {
                      onNavigate('stays-results');
                    } else if (item.name === 'Rentals') {
                      onNavigate('rent-home');
                    } else if (item.name === 'Food Spots') {
                      onNavigate('food-spots');
                    } else if (item.name === 'Activities' || item.name === 'Adventures') {
                      onNavigate('activities');
                    } else if (item.name === 'Services') {
                      onNavigate('services');
                    } else {
                      onNavigate('home');
                    }
                  }}
                  className={`relative py-2 text-[15px] font-semibold transition-colors duration-200 outline-none ${
                    isActive
                      ? 'text-[#0F766E]'
                      : 'text-slate-800 hover:text-[#0F766E]'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-6 h-[2.5px] rounded-full bg-[#0F766E]" />
                  )}
                </a>
              );
            })}
            </div>
          )}

          {/* Desktop Right Side Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                {currentPage !== 'become-host' && (
                  <button
                    onClick={() => setIsBecomeHostOpen(true)}
                    className="flex items-center gap-2 rounded-xl border border-[#0F766E] px-4 py-2 text-[14px] font-semibold text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all duration-200 cursor-pointer outline-none"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                    <span>Become a Host</span>
                  </button>
                )}

                {/* Wishlist Button */}
                <button 
                  onClick={() => onNavigate('stays-results')}
                  className="flex items-center gap-2 text-slate-700 hover:text-[#0F766E] font-semibold text-[14px] px-3 py-2 cursor-pointer transition-colors mr-1 shrink-0 outline-none"
                >
                  <Heart className="h-[18px] w-[18px] text-slate-700 stroke-[2.2]" />
                  <span>Wishlist</span>
                </button>

                {/* Bell Icon */}
                <button className="relative p-2 text-slate-700 hover:text-[#0F766E] cursor-pointer transition-colors mr-2 shrink-0 outline-none">
                  <svg className="h-[20px] w-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span className="absolute top-1 right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#16A34A] text-white font-bold text-[9px]">
                    3
                  </span>
                </button>

                <div ref={profileDropdownRef} className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200/60 p-1.5 pr-3 hover:bg-slate-100 transition-colors cursor-pointer select-none outline-none"
                  >
                    <div className="h-8 w-8 rounded-lg bg-[#0F766E] text-white flex items-center justify-center font-extrabold text-[13px] shadow-sm shadow-teal-700/10">
                      {userInitials}
                    </div>
                    <span className="text-[13px] font-bold text-slate-800 max-w-[130px] truncate">{displayName}</span>
                    <ChevronDown className={`h-3.5 w-3.5 text-slate-500 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2.5 w-52 origin-top-right rounded-xl border border-gray-150 bg-white p-1.5 shadow-lg ring-1 ring-black/5 z-40">
                      <div className="px-3.5 py-2 border-b border-slate-100 mb-1 text-left">
                        <p className="text-[12.5px] font-bold text-slate-900 truncate">{displayName}</p>
                        {displayEmail && <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">{displayEmail}</p>}
                      </div>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onNavigate('my-bookings');
                        }}
                        className="w-full text-left rounded-lg px-3.5 py-2.5 text-[12.5px] font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        My Bookings
                      </button>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onNavigate('become-host');
                        }}
                        className="w-full text-left rounded-lg px-3.5 py-2.5 text-[12.5px] font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        Host Dashboard
                      </button>
                      <div className="border-t border-slate-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left rounded-lg px-3.5 py-2.5 text-[12.5px] font-bold text-red-650 hover:bg-red-50/50 transition-colors cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {currentPage !== 'become-host' && (
                  <button
                    onClick={() => setIsBecomeHostOpen(true)}
                    className="flex items-center gap-2 rounded-xl border border-[#0F766E] px-4 py-2 text-[14px] font-semibold text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all duration-200 cursor-pointer outline-none"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                    <span>Become a Host</span>
                  </button>
                )}
                <button
                  onClick={() => { setIsAuthOpen(true); setAuthTab('login'); }}
                  className="rounded-xl border border-[#0F766E] px-4.5 py-2 text-[14px] font-semibold text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all duration-200 cursor-pointer outline-none"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setIsAuthOpen(true); setAuthTab('register'); }}
                  className="rounded-xl bg-[#0F766E] border border-[#0F766E] px-4.5 py-2 text-[14px] font-semibold text-white shadow-sm hover:bg-[#0c625c] transition-all duration-200 cursor-pointer outline-none"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-6 shadow-inner transition-all duration-300">
          {currentPage !== 'become-host' && (
            <div className="space-y-1.5">
            {menuItems.map((item) => {
              if (item.dropdown) {
                return (
                  <div key={item.name} className="py-1">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setActiveMenu(item.name);
                        if (item.name === 'Services') {
                          onNavigate('services');
                        } else if (item.name === 'Rentals') {
                          onNavigate('rent-home');
                        }
                      }}
                      className="block w-full text-left px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0F766E] hover:underline"
                    >
                      {item.name}
                    </button>
                    <div className="mt-1 pl-4 space-y-1">
                      {item.dropdownItems.map((subItem) => {
                        const subName = typeof subItem === 'string' ? subItem : subItem.name;
                        const subTab = typeof subItem === 'object' ? subItem.tab : null;
                        const subVehicle = typeof subItem === 'object' ? subItem.vehicleType : (subName.includes('Car') ? 'Car' : 'Bike');
                        return (
                          <button
                            key={subName}
                            onClick={() => {
                              setIsOpen(false);
                              setActiveMenu(item.name);
                              if (item.name === 'Services') {
                                onNavigate('services', subTab ? { tab: subTab } : null);
                              } else if (item.name === 'Rentals') {
                                onNavigate('rent-home', { vehicleType: subVehicle });
                              }
                            }}
                            className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#0F766E] transition-colors outline-none cursor-pointer"
                          >
                            {subName}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              const isActive = activeMenu === item.name;
              return (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    setActiveMenu(item.name);
                    if (item.name === 'Home') {
                      onNavigate('home');
                    } else if (item.name === 'Stays') {
                      onNavigate('stays-results');
                    } else if (item.name === 'Rentals') {
                      onNavigate('rent-home');
                    } else if (item.name === 'Food Spots') {
                      onNavigate('food-spots');
                    } else if (item.name === 'Activities' || item.name === 'Adventures') {
                      onNavigate('activities');
                    } else if (item.name === 'Services') {
                      onNavigate('services');
                    } else {
                      onNavigate('home');
                    }
                  }}
                  className={`block rounded-lg px-3 py-2 text-base font-semibold transition-colors outline-none ${
                    isActive
                      ? 'bg-teal-50 text-[#0F766E]'
                      : 'text-slate-800 hover:bg-slate-50 hover:text-[#0F766E]'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
            </div>
          )}

          {/* Mobile CTA Buttons */}
          <div className="mt-6 space-y-2.5 border-t border-gray-100 pt-6">
            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                {currentPage !== 'become-host' && (
                  <button
                    onClick={() => {
                      setIsBecomeHostOpen(true);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full rounded-xl border border-[#0F766E] py-3 text-center text-sm font-semibold text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all duration-200 cursor-pointer outline-none mb-1"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                    <span>Become a Host</span>
                  </button>
                )}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-150 p-3.5 rounded-xl">
                  <div className="h-10 w-10 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-black text-[15px]">
                    {userInitials}
                  </div>
                  <div className="flex flex-col text-left truncate">
                    <span className="text-[14px] font-bold text-slate-800 leading-none truncate">{displayName}</span>
                    {displayEmail && <span className="text-[11px] font-semibold text-slate-400 mt-1 leading-none truncate">{displayEmail}</span>}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate('my-bookings');
                  }}
                  className="w-full rounded-xl border border-slate-200 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors outline-none"
                >
                  My Bookings
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate('become-host');
                  }}
                  className="w-full rounded-xl border border-slate-200 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors outline-none"
                >
                  Host Dashboard
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full rounded-xl border border-red-250 hover:bg-red-50/50 py-3 text-center text-sm font-semibold text-red-600 transition-colors outline-none"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                {currentPage !== 'become-host' && (
                  <button
                    onClick={() => {
                      setIsBecomeHostOpen(true);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full rounded-xl border border-[#0F766E] py-3 text-center text-sm font-semibold text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all duration-200 cursor-pointer outline-none"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                    <span>Become a Host</span>
                  </button>
                )}
                <button
                  onClick={() => { setIsAuthOpen(true); setAuthTab('login'); setIsOpen(false); }}
                  className="w-full rounded-xl border border-[#0F766E] py-3 text-center text-sm font-semibold text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all duration-200 cursor-pointer outline-none"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setIsAuthOpen(true); setAuthTab('register'); setIsOpen(false); }}
                  className="w-full rounded-xl bg-[#0F766E] py-3 text-center text-sm font-semibold text-white shadow-md hover:bg-[#0c625c] transition-all cursor-pointer outline-none"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {/* Auth Modal using dedicated SignIn/SignUp in src/auth/ */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authTab}
        onSuccess={handleAuthSuccess}
      />

      {/* Become a Host Modal */}
      <BecomeHostModal
        isOpen={isBecomeHostOpen}
        onClose={() => setIsBecomeHostOpen(false)}
        onStartListing={() => onNavigate('become-host')}
      />
    </nav>
  );
}
