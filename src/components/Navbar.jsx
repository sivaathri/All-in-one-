import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Eye, EyeOff, User, Lock, Mail, Phone, Heart } from 'lucide-react';
import becameBg from '../assets/becameBG.png';

export default function Navbar({ onNavigate = () => {}, currentPage = 'home' }) {
  const [activeMenu, setActiveMenu] = useState('Stays');
  const [isOpen, setIsOpen] = useState(false);
  const [rentalsDropdown, setRentalsDropdown] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  // Authentication Popup states
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // 'login' or 'register'
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null); // 'name' | 'email' | 'phone' | 'password' | 'confirmPassword'

  const authModalRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Click outside auth modal handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (authModalRef.current && !authModalRef.current.contains(event.target)) {
        setIsAuthOpen(false);
      }
    }
    if (isAuthOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAuthOpen]);

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
    if (currentPage === 'home' || currentPage === 'stays-results') {
      setActiveMenu('Stays');
    } else if (currentPage === 'rent-home' || currentPage === 'rent-results' || currentPage === 'rent-detail') {
      setActiveMenu('Rentals');
    }
  }, [currentPage]);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setTimeout(() => {
      setIsAuthLoading(false);
      setIsAuthSuccess(true);
      setTimeout(() => {
        setIsLoggedIn(true);
        setIsAuthOpen(false);
        setIsAuthSuccess(false);
        // Reset inputs
        setEmailInput('');
        setPasswordInput('');
        setConfirmPasswordInput('');
        setNameInput('');
        setPhoneInput('');
        setRememberMe(false);
        setAgreeTerms(false);
      }, 1000);
    }, 1200);
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, text: '', color: 'bg-slate-200', textColor: 'text-slate-400' };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    switch (score) {
      case 1: return { score, text: 'Very Weak', color: 'bg-red-500', textColor: 'text-red-500' };
      case 2: return { score, text: 'Weak', color: 'bg-orange-500', textColor: 'text-orange-500' };
      case 3: return { score, text: 'Medium', color: 'bg-yellow-500', textColor: 'text-yellow-600' };
      case 4: return { score, text: 'Strong', color: 'bg-teal-500', textColor: 'text-teal-650' };
      case 5: return { score, text: 'Very Strong', color: 'bg-emerald-500', textColor: 'text-emerald-600' };
      default: return { score: 0, text: '', color: 'bg-slate-200', textColor: 'text-slate-400' };
    }
  };

  const menuItems = [
   
    { name: 'Stays', path: '#stays', active: true },
    { name: 'Rentals', path: '#rentals' },
    { name: 'Food Spots', path: '#food' },
    { name: 'Adventures', path: '#adventures' },
    { name: 'Taxi Booking', path: '#taxi' },
    { name: 'Services', path: '#services' },
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

                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}
                  >
                    <button className="flex items-center gap-1 text-[15px] font-semibold text-slate-800 hover:text-[#0F766E] transition-colors duration-200 cursor-pointer">
                      {item.name}
                      <ChevronDown className="h-3.5 w-3.5 text-slate-800 shrink-0 stroke-[2.5]" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute left-0 mt-0 w-48 origin-top-left rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg ring-1 ring-black/5 transition-all duration-200">
                        {item.dropdownItems.map((subItem) => (
                          <a
                            key={subItem}
                            href={`#${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-[#0F766E] transition-colors"
                          >
                            {subItem}
                          </a>
                        ))}
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
                    } else {
                      onNavigate('home');
                    }
                  }}
                  className={`relative py-2 text-[15px] font-semibold transition-colors duration-200 ${
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
            {currentPage !== 'become-host' && (
              <button
                onClick={() => onNavigate('become-host')}
                className="rounded-lg border border-[#0F766E] px-4.5 py-2 text-[14px] font-semibold text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all duration-200 cursor-pointer"
              >
                Become a Host
              </button>
            )}
            
            {isLoggedIn ? (
              <>
                {/* Wishlist Button */}
                <button 
                  onClick={() => onNavigate('stays-results')}
                  className="flex items-center gap-2 text-slate-700 hover:text-[#0F766E] font-semibold text-[14px] px-3 py-2 cursor-pointer transition-colors mr-1 shrink-0"
                >
                  <Heart className="h-[18px] w-[18px] text-slate-700 stroke-[2.2]" />
                  <span>Wishlist</span>
                </button>

                {/* Bell Icon */}
                <button className="relative p-2 text-slate-700 hover:text-[#0F766E] cursor-pointer transition-colors mr-2 shrink-0">
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
                    className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200/60 p-1.5 pr-3 hover:bg-slate-100 transition-colors cursor-pointer select-none"
                  >
                    <div className="h-8 w-8 rounded-lg bg-[#0F766E] text-white flex items-center justify-center font-extrabold text-[13px] shadow-sm shadow-teal-700/10">
                      RK
                    </div>
                    <span className="text-[13px] font-bold text-slate-800">Rohit Kumar</span>
                    <ChevronDown className={`h-3.5 w-3.5 text-slate-500 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-48 origin-top-right rounded-xl border border-gray-150 bg-white p-1.5 shadow-lg ring-1 ring-black/5 z-40">
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
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        setIsLoggedIn(false);
                      }}
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
                <button
                  onClick={() => { setIsAuthOpen(true); setAuthTab('login'); }}
                  className="rounded-lg border border-[#0F766E] px-5 py-2 text-[14px] font-semibold text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all duration-200 cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => { setIsAuthOpen(true); setAuthTab('register'); }}
                  className="rounded-lg bg-[#0F766E] border border-transparent px-5 py-2 text-[14px] font-semibold text-white shadow-sm hover:bg-[#0c625c] transition-all duration-200 cursor-pointer"
                >
                  Register
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
                    <span className="block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {item.name}
                    </span>
                    <div className="mt-1 pl-4 space-y-1">
                      {item.dropdownItems.map((subItem) => (
                        <a
                          key={subItem}
                          href={`#${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#0F766E] transition-colors"
                        >
                          {subItem}
                        </a>
                      ))}
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
                    } else {
                      onNavigate('home');
                    }
                  }}
                  className={`block rounded-lg px-3 py-2 text-base font-semibold transition-colors ${
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
            {currentPage !== 'become-host' && (
              <button
                onClick={() => {
                  onNavigate('become-host');
                  setIsOpen(false);
                }}
                className="w-full rounded-xl border border-[#0F766E] py-3 text-center text-sm font-semibold text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all duration-200 cursor-pointer"
              >
                Become a Host
              </button>
            )}
            
            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-150 p-3.5 rounded-xl">
                  <div className="h-10 w-10 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-black text-[15px]">
                    RK
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[14px] font-bold text-slate-800 leading-none">Rohit Kumar</span>
                    <span className="text-[11px] font-semibold text-slate-400 mt-1 leading-none">rohit.kumar@example.com</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate('my-bookings');
                  }}
                  className="w-full rounded-xl border border-slate-200 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  My Bookings
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate('become-host');
                  }}
                  className="w-full rounded-xl border border-slate-200 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Host Dashboard
                </button>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsOpen(false);
                  }}
                  className="w-full rounded-xl border border-red-250 hover:bg-red-50/50 py-3 text-center text-sm font-semibold text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => { setIsAuthOpen(true); setAuthTab('login'); setIsOpen(false); }}
                  className="w-full rounded-xl border border-[#0F766E] py-3 text-center text-sm font-semibold text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all duration-200 cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => { setIsAuthOpen(true); setAuthTab('register'); setIsOpen(false); }}
                  className="w-full rounded-xl bg-[#0F766E] py-3 text-center text-sm font-semibold text-white shadow-md hover:bg-[#0c625c] transition-all cursor-pointer"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {/* Style & Modal injected before nav end */}
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(8px); }
        }
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes formSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes successCheck {
          0% { transform: scale(0.6); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-modal-backdrop {
          animation: modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-modal-box {
          animation: modalScaleIn 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-form-slide {
          animation: formSlide 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-success-check {
          animation: successCheck 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-modal-backdrop">
          <div 
            ref={authModalRef}
            className="bg-white rounded-[32px] border border-slate-100 shadow-2xl w-full max-w-[460px] p-6 sm:p-8 pb-0 flex flex-col gap-6 relative overflow-y-auto max-h-[90vh] no-scrollbar animate-modal-box animate-duration-300"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsAuthOpen(false)}
              className="absolute top-5 right-5 text-slate-450 hover:text-slate-700 rounded-full hover:bg-slate-50 p-1.5 transition-all duration-205 cursor-pointer z-10"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5 stroke-[2.5]" />
            </button>

            {isAuthSuccess ? (
              /* Success View */
              <div className="flex flex-col items-center justify-center py-10 pb-8 gap-4 text-center animate-success-check">
                <div className="h-20 w-20 rounded-full bg-emerald-50 border border-emerald-150 flex items-center justify-center text-[#007F55] shadow-inner">
                  {/* SVG Checkmark */}
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <h3 className="text-2xl font-black text-slate-900">Success!</h3>
                  <p className="text-[13.5px] font-bold text-slate-500">
                    {authTab === 'login' ? 'Successfully logged in as John Doe.' : 'Your account has been created.'}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-400 mt-1">Preparing your dashboard...</p>
                </div>
              </div>
            ) : (
              /* Main Auth Flow */
              <>
                {/* Logo Section */}
                <div className="flex items-center gap-2.5 justify-center mt-2">
                  <div className="relative w-9 h-9 flex items-center justify-center">
                    <svg className="w-full h-full text-[#007F55]" viewBox="0 0 36 36" fill="currentColor">
                      <path d="M18 2C11.5 2 6 7.5 6 14C6 22 18 34 18 34C18 34 30 22 30 14C30 7.5 24.5 2 18 2Z" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center pb-1">
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-[25px] font-bold text-[#0D233A] tracking-tight">
                    TripVerse
                  </span>
                </div>

                {authTab === 'login' ? (
                  /* LOGIN TAB */
                  <div key="login-form" className="flex flex-col gap-6 animate-form-slide">
                    <div className="text-center flex flex-col gap-1.5">
                      <h2 className="text-[28px] font-bold text-[#0D233A] leading-tight tracking-tight">
                        Welcome Back!
                      </h2>
                      <p className="text-[14px] font-semibold text-slate-400">
                        Sign in to continue your journey
                      </p>
                    </div>

                    <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
                      {/* Email/Phone input */}
                      <div className="relative flex items-center">
                        <Mail className={`absolute left-4.5 h-5 w-5 transition-colors duration-300 ${focusedInput === 'email' ? 'text-[#007F55]' : 'text-slate-400'}`} />
                        <input
                          type="text"
                          required
                          placeholder="Email or Phone Number"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          onFocus={() => setFocusedInput('email')}
                          onBlur={() => setFocusedInput(null)}
                          className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-4 py-4 text-[14px] font-semibold text-slate-800 placeholder-slate-450 outline-none focus:border-[#007F55] focus:ring-4 focus:ring-[#007F55]/10 transition-all duration-300 shadow-xs"
                        />
                      </div>

                      {/* Password input */}
                      <div className="relative flex items-center">
                        <Lock className={`absolute left-4.5 h-5 w-5 transition-colors duration-300 ${focusedInput === 'password' ? 'text-[#007F55]' : 'text-slate-400'}`} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="Password"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          onFocus={() => setFocusedInput('password')}
                          onBlur={() => setFocusedInput(null)}
                          className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-12 py-4 text-[14px] font-semibold text-slate-800 placeholder-slate-450 outline-none focus:border-[#007F55] focus:ring-4 focus:ring-[#007F55]/10 transition-all duration-300 shadow-xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4.5 text-slate-400 hover:text-slate-650 transition-colors cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>

                      {/* Remember & Forgot */}
                      <div className="flex items-center justify-between mt-1 px-1">
                        {/* Custom Styled Remember Me Checkbox */}
                        <div 
                          onClick={() => setRememberMe(!rememberMe)}
                          className="flex items-center gap-2.5 cursor-pointer select-none group"
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            rememberMe 
                              ? 'bg-[#007F55] border-[#007F55] text-white shadow-xs' 
                              : 'border-slate-350 group-hover:border-slate-400 bg-white'
                          }`}>
                            {rememberMe && (
                              <svg className="w-3.5 h-3.5 stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[13.5px] font-semibold text-slate-600">Remember me</span>
                        </div>

                        <a href="#forgot" className="text-[13.5px] font-bold text-[#007F55] hover:underline transition-all">
                          Forgot Password?
                        </a>
                      </div>

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={isAuthLoading}
                        className="w-full mt-3 rounded-2xl bg-[#007F55] hover:bg-[#006644] disabled:bg-slate-200 disabled:cursor-not-allowed text-white py-4 text-[15px] font-bold shadow-md shadow-emerald-700/10 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isAuthLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Signing in...</span>
                          </>
                        ) : (
                          <span>Sign In</span>
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  /* REGISTER TAB */
                  <div key="register-form" className="flex flex-col gap-6 animate-form-slide">
                    <div className="text-center flex flex-col gap-1.5">
                      <h2 className="text-[28px] font-bold text-[#0D233A] leading-tight tracking-tight">
                        Create Account
                      </h2>
                      <p className="text-[14px] font-semibold text-slate-400">
                        Join TripVerse and start exploring
                      </p>
                    </div>

                    <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3.5">
                      {/* Name input */}
                      <div className="relative flex items-center">
                        <User className={`absolute left-4.5 h-5 w-5 transition-colors duration-300 ${focusedInput === 'name' ? 'text-[#007F55]' : 'text-slate-400'}`} />
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          onFocus={() => setFocusedInput('name')}
                          onBlur={() => setFocusedInput(null)}
                          className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-4 py-3.5 text-[14px] font-semibold text-slate-800 placeholder-slate-450 outline-none focus:border-[#007F55] focus:ring-4 focus:ring-[#007F55]/10 transition-all duration-300 shadow-xs"
                        />
                      </div>

                      {/* Email input */}
                      <div className="relative flex items-center">
                        <Mail className={`absolute left-4.5 h-5 w-5 transition-colors duration-300 ${focusedInput === 'email' ? 'text-[#007F55]' : 'text-slate-400'}`} />
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          onFocus={() => setFocusedInput('email')}
                          onBlur={() => setFocusedInput(null)}
                          className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-4 py-3.5 text-[14px] font-semibold text-slate-800 placeholder-slate-450 outline-none focus:border-[#007F55] focus:ring-4 focus:ring-[#007F55]/10 transition-all duration-300 shadow-xs"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="relative flex items-center">
                        <Phone className={`absolute left-4.5 h-5 w-5 transition-colors duration-300 ${focusedInput === 'phone' ? 'text-[#007F55]' : 'text-slate-400'}`} />
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          onFocus={() => setFocusedInput('phone')}
                          onBlur={() => setFocusedInput(null)}
                          className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-4 py-3.5 text-[14px] font-semibold text-slate-800 placeholder-slate-450 outline-none focus:border-[#007F55] focus:ring-4 focus:ring-[#007F55]/10 transition-all duration-300 shadow-xs"
                        />
                      </div>

                      {/* Password input */}
                      <div className="relative flex items-center">
                        <Lock className={`absolute left-4.5 h-5 w-5 transition-colors duration-300 ${focusedInput === 'password' ? 'text-[#007F55]' : 'text-slate-400'}`} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="Create Password"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          onFocus={() => setFocusedInput('password')}
                          onBlur={() => setFocusedInput(null)}
                          className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-12 py-3.5 text-[14px] font-semibold text-slate-800 placeholder-slate-450 outline-none focus:border-[#007F55] focus:ring-4 focus:ring-[#007F55]/10 transition-all duration-300 shadow-xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4.5 text-slate-400 hover:text-slate-650 transition-colors cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>

                      {/* Confirm Password input */}
                      <div className="relative flex items-center">
                        <Lock className={`absolute left-4.5 h-5 w-5 transition-colors duration-300 ${focusedInput === 'confirmPassword' ? 'text-[#007F55]' : 'text-slate-400'}`} />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          placeholder="Confirm Password"
                          value={confirmPasswordInput}
                          onChange={(e) => setConfirmPasswordInput(e.target.value)}
                          onFocus={() => setFocusedInput('confirmPassword')}
                          onBlur={() => setFocusedInput(null)}
                          className="w-full rounded-2xl border border-slate-200/90 bg-white pl-12 pr-12 py-3.5 text-[14px] font-semibold text-slate-800 placeholder-slate-450 outline-none focus:border-[#007F55] focus:ring-4 focus:ring-[#007F55]/10 transition-all duration-300 shadow-xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4.5 text-slate-400 hover:text-slate-650 transition-colors cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>

                      {/* Terms check */}
                      <div 
                        onClick={() => setAgreeTerms(!agreeTerms)}
                        className="flex items-start gap-2.5 cursor-pointer select-none group mt-1 px-1"
                      >
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all mt-0.5 ${
                          agreeTerms 
                            ? 'bg-[#007F55] border-[#007F55] text-white shadow-xs' 
                            : 'border-slate-350 group-hover:border-slate-400 bg-white'
                        }`}>
                          {agreeTerms && (
                            <svg className="w-3.5 h-3.5 stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span className="text-[13px] font-semibold text-slate-500 leading-normal text-left">
                          I agree to the <span className="text-[#007F55] hover:underline cursor-pointer">Terms & Conditions</span> and <span className="text-[#007F55] hover:underline cursor-pointer">Privacy Policy</span>
                        </span>
                      </div>

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={isAuthLoading}
                        className="w-full mt-3 rounded-2xl bg-[#007F55] hover:bg-[#006644] disabled:bg-slate-200 disabled:cursor-not-allowed text-white py-4 text-[15px] font-bold shadow-md shadow-emerald-700/10 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isAuthLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Signing up...</span>
                          </>
                        ) : (
                          <span>Sign Up</span>
                        )}
                      </button>
                    </form>
                  </div>
                )}

                {/* Or continue with */}
                <div className="flex items-center gap-3 mt-1 px-1">
                  <span className="h-[1px] bg-slate-200 flex-1"></span>
                  <span className="text-[12.5px] font-semibold text-slate-450 whitespace-nowrap">or continue with</span>
                  <span className="h-[1px] bg-slate-200 flex-1"></span>
                </div>

                {/* Social Login Grid (3 Columns) */}
                <div className="grid grid-cols-3 gap-3 px-1">
                  <button
                    onClick={() => {
                      setIsAuthLoading(true);
                      setTimeout(() => {
                        setIsAuthLoading(false);
                        setIsAuthSuccess(true);
                        setTimeout(() => {
                          setIsLoggedIn(true);
                          setIsAuthOpen(false);
                          setIsAuthSuccess(false);
                        }, 1000);
                      }, 850);
                    }}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 bg-white py-3 text-[13px] font-bold text-slate-700 hover:shadow-xs active:scale-98 transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    Google
                  </button>
                  <button
                    onClick={() => {
                      setIsAuthLoading(true);
                      setTimeout(() => {
                        setIsAuthLoading(false);
                        setIsAuthSuccess(true);
                        setTimeout(() => {
                          setIsLoggedIn(true);
                          setIsAuthOpen(false);
                          setIsAuthSuccess(false);
                        }, 1000);
                      }, 850);
                    }}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 bg-white py-3 text-[13px] font-bold text-slate-700 hover:shadow-xs active:scale-98 transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-[#1877F2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                  <button
                    onClick={() => {
                      setIsAuthLoading(true);
                      setTimeout(() => {
                        setIsAuthLoading(false);
                        setIsAuthSuccess(true);
                        setTimeout(() => {
                          setIsLoggedIn(true);
                          setIsAuthOpen(false);
                          setIsAuthSuccess(false);
                        }, 1000);
                      }, 850);
                    }}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 hover:border-slate-350 hover:bg-slate-50/50 bg-white py-3 text-[13px] font-bold text-slate-700 hover:shadow-xs active:scale-98 transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-black shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.64.74-1.2 1.88-1.05 2.99 1.11.09 2.24-.55 3-1.43z" />
                    </svg>
                    Apple
                  </button>
                </div>

                {/* Bottom Toggle Text */}
                <div className="text-center mt-1 pb-2">
                  {authTab === 'login' ? (
                    <span className="text-[14px] font-semibold text-slate-500">
                      Don't have an account?{' '}
                      <button
                        onClick={() => {
                          setAuthTab('register');
                          setPhotoError('');
                        }}
                        className="text-[#007F55] hover:underline font-extrabold cursor-pointer transition-all"
                      >
                        Sign Up
                      </button>
                    </span>
                  ) : (
                    <span className="text-[14px] font-semibold text-slate-500">
                      Already have an account?{' '}
                      <button
                        onClick={() => {
                          setAuthTab('login');
                          setPhotoError('');
                        }}
                        className="text-[#007F55] hover:underline font-extrabold cursor-pointer transition-all"
                      >
                        Sign In
                      </button>
                    </span>
                  )}
                </div>

                {/* Bottom Illustration Banner */}
                <div className="w-full mt-2 mx-[-32px] mb-[-32px] overflow-hidden rounded-b-[32px] border-t border-slate-100/50 bg-[#F4F9F6] flex justify-center items-end">
                  <img 
                    src={becameBg} 
                    alt="TripVerse Illustration" 
                    className="w-full h-auto object-cover max-h-[160px] translate-y-1 select-none pointer-events-none" 
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
