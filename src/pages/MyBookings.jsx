import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Heart, 
  Star, 
  Compass, 
  User, 
  CreditCard, 
  BookOpen, 
  Headphones, 
  LogOut, 
  Gift, 
  MapPin, 
  Users, 
  ChevronRight, 
  ChevronDown, 
  Phone, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck,
  SlidersHorizontal,
  Send,
  X
} from 'lucide-react';

export default function MyBookings({ onNavigate }) {
  // Sidebar tab control
  const [activeTab, setActiveTab] = useState('My Bookings');

  // Interactive booking status state
  const [bookings, setBookings] = useState([
    {
      id: 'TVR-2025-67890',
      hotelName: 'Sea Breeze Resort',
      location: 'Pondicherry Beach, Pondicherry',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
      rooms: 2,
      adults: 4,
      children: 2,
      dates: '21 Jun 2025 (Sat) - 25 Jun 2025 (Wed)',
      nights: 4,
      bookedOn: '18 May 2025',
      status: 'Confirmed',
      amount: '₹44,080',
      statusDetail: 'Reservation Confirmed',
      isUpcoming: true
    },
    {
      id: 'TVR-2025-55621',
      hotelName: 'Ocean View Hotel',
      location: 'Calangute Beach, Goa',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
      rooms: 1,
      adults: 2,
      children: 0,
      dates: '10 Jul 2025 (Thu) - 12 Jul 2025 (Sat)',
      nights: 2,
      bookedOn: '12 May 2025',
      status: 'Pending Confirmation',
      amount: '₹16,500',
      statusDetail: 'Waiting for property confirmation',
      isUpcoming: true
    },
    {
      id: 'TVR-2025-44567',
      hotelName: 'Hilltop Resort',
      location: 'Manali, Himachal Pradesh',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
      rooms: 1,
      adults: 2,
      children: 0,
      dates: '05 Sep 2025 (Fri) - 08 Sep 2025 (Mon)',
      nights: 3,
      bookedOn: '20 Apr 2025',
      status: 'Completed',
      amount: '₹12,000',
      statusDetail: 'You stayed on 05-08 Sep 2025',
      isUpcoming: false
    },
    {
      id: 'TVR-2025-33211',
      hotelName: 'Serenity Villa',
      location: 'Lonavala, Maharashtra',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      rooms: 1,
      adults: 2,
      children: 0,
      dates: '15 May 2025 (Thu) - 16 May 2025 (Fri)',
      nights: 1,
      bookedOn: '15 Apr 2025',
      status: 'Cancelled',
      amount: '₹6,000',
      statusDetail: 'Cancelled on 16 Apr 2025',
      isUpcoming: false
    }
  ]);

  // Center column booking filter
  const [selectedFilter, setSelectedFilter] = useState('All Bookings');

  // Cancel Booking modal state
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  // Details modal state
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewBooking, setReviewBooking] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Referral states
  const [copiedReferral, setCopiedReferral] = useState(false);

  // Dynamic booking summary counts
  const totalCount = bookings.length;
  const upcomingCount = bookings.filter(b => b.isUpcoming && b.status !== 'Cancelled').length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'Completed').length;
  const cancelledCount = bookings.filter(b => b.status === 'Cancelled').length;

  // Filter tab list
  const filterTabs = [
    { name: 'All Bookings', count: null },
    { name: 'Upcoming', count: null },
    { name: 'Pending', count: bookings.filter(b => b.status === 'Pending Confirmation').length },
    { name: 'Confirmed', count: null },
    { name: 'Completed', count: null },
    { name: 'Cancelled', count: null }
  ];

  // Filtering implementation
  const filteredBookings = bookings.filter(booking => {
    if (selectedFilter === 'All Bookings') return true;
    if (selectedFilter === 'Upcoming') return booking.isUpcoming && booking.status !== 'Cancelled';
    if (selectedFilter === 'Pending') return booking.status === 'Pending Confirmation';
    if (selectedFilter === 'Confirmed') return booking.status === 'Confirmed';
    if (selectedFilter === 'Completed') return booking.status === 'Completed';
    if (selectedFilter === 'Cancelled') return booking.status === 'Cancelled';
    return true;
  });

  // Action: Trigger cancellation
  const handleCancelClick = (booking) => {
    setBookingToCancel(booking);
    setShowCancelModal(true);
  };

  // Action: Confirm cancellation
  const confirmCancellation = () => {
    if (!bookingToCancel) return;
    setBookings(prevBookings => 
      prevBookings.map(b => 
        b.id === bookingToCancel.id 
          ? { 
              ...b, 
              status: 'Cancelled', 
              statusDetail: `Cancelled on ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
              isUpcoming: false
            } 
          : b
      )
    );
    setShowCancelModal(false);
    setBookingToCancel(null);
  };

  // Action: Copy referral code
  const copyReferralCode = () => {
    navigator.clipboard.writeText('TRIPVERSE-ROHIT-500');
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  // Action: Submit Review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for reviewing ${reviewBooking.hotelName}! Your review has been recorded.`);
    setShowReviewModal(false);
    setReviewComment('');
  };

  // Helper: Status styling and icons
  const getStatusBadge = (status, statusDetail) => {
    switch (status) {
      case 'Confirmed':
        return (
          <div className="flex items-center gap-2 bg-emerald-50 text-[#16A34A] px-3.5 py-2 rounded-xl text-xs font-semibold">
            <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0" strokeWidth={2.5} />
            <div className="flex flex-col text-left">
              <span className="font-bold text-[10px] uppercase tracking-wider leading-none">Confirmed</span>
              <span className="text-[9px] text-[#15803D] font-medium mt-1 leading-none">{statusDetail}</span>
            </div>
          </div>
        );
      case 'Pending Confirmation':
        return (
          <div className="flex items-center gap-2 bg-amber-50 text-[#D97706] px-3.5 py-2 rounded-xl text-xs font-semibold">
            <Clock className="h-4 w-4 text-[#D97706] shrink-0" strokeWidth={2.5} />
            <div className="flex flex-col text-left">
              <span className="font-bold text-[10px] uppercase tracking-wider leading-none">Pending Confirmation</span>
              <span className="text-[9px] text-[#B45309] font-medium mt-1 leading-none">{statusDetail}</span>
            </div>
          </div>
        );
      case 'Completed':
        return (
          <div className="flex items-center gap-2 bg-slate-50 text-[#475569] px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-100">
            <CheckCircle2 className="h-4 w-4 text-[#64748B] shrink-0" strokeWidth={2.5} />
            <div className="flex flex-col text-left">
              <span className="font-bold text-[10px] uppercase tracking-wider leading-none">Completed</span>
              <span className="text-[9px] text-[#64748B] font-medium mt-1 leading-none">{statusDetail}</span>
            </div>
          </div>
        );
      case 'Cancelled':
        return (
          <div className="flex items-center gap-2 bg-red-50 text-[#DC2626] px-3.5 py-2 rounded-xl text-xs font-semibold">
            <XCircle className="h-4 w-4 text-[#DC2626] shrink-0" strokeWidth={2.5} />
            <div className="flex flex-col text-left">
              <span className="font-bold text-[10px] uppercase tracking-wider leading-none">Cancelled</span>
              <span className="text-[9px] text-[#B91C1C] font-medium mt-1 leading-none">{statusDetail}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 py-8 px-4 sm:px-6 lg:px-8 xl:px-12 font-sans">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ==================== LEFT COLUMN: SIDEBAR ==================== */}
          <aside className="lg:col-span-3 xl:col-span-2 flex flex-col gap-6">
            
            {/* User Profile Card - clean borderless */}
            <div className="flex items-center gap-4 py-2 px-3">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80" 
                alt="Rohit Kumar Profile" 
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="flex flex-col text-left">
                <span className="text-[15px] font-bold text-slate-800 leading-none">Rohit Kumar</span>
                <span className="text-xs text-slate-400 font-medium mt-1 leading-none">rohit.kumar@gmail.com</span>
              </div>
            </div>

            {/* Navigation Menu - clean list */}
            <div className="flex flex-col text-left gap-1">
              {[
                { name: 'Dashboard', icon: LayoutDashboard },
                { name: 'My Bookings', icon: Calendar },
                { name: 'My Wishlist', icon: Heart },
                { name: 'My Reviews', icon: Star },
                { name: 'My Trips', icon: Compass },
                { name: 'Profile Settings', icon: User },
                { name: 'Payment Methods', icon: CreditCard },
                { name: 'Address Book', icon: BookOpen },
                { name: 'Support', icon: Headphones },
                { name: 'Logout', icon: LogOut }
              ].map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.name;
                const isLogout = item.name === 'Logout';

                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (isLogout) {
                        if (confirm('Are you sure you want to log out?')) {
                          onNavigate('home');
                        }
                      } else {
                        setActiveTab(item.name);
                      }
                    }}
                    className={`relative w-full rounded-xl px-4 py-3 text-sm font-semibold flex items-center gap-3.5 transition-all duration-200 ${
                      isActive 
                        ? 'bg-teal-50 text-[#0F766E]' 
                        : isLogout 
                          ? 'text-red-500 hover:bg-red-50 hover:text-red-600' 
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-[#0F766E]" />
                    )}
                    <IconComponent 
                      className={`h-5 w-5 shrink-0 ${isActive ? 'text-[#0F766E]' : isLogout ? 'text-red-450' : 'text-slate-400'}`} 
                      strokeWidth={isActive ? 2.5 : 2} 
                    />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Refer & Earn Promo Card */}
            <div className="bg-gradient-to-br from-[#E6F4F1] to-[#F0FDFA] border border-teal-100 rounded-3xl p-6 text-left relative overflow-hidden shadow-sm flex flex-col gap-3 min-h-[220px] justify-between">
              <div>
                <h4 className="text-base font-extrabold text-[#0D3833]">Refer & Earn</h4>
                <p className="text-xs font-semibold text-slate-500 mt-2 leading-relaxed max-w-[170px]">
                  Invite your friends and earn exciting rewards!
                </p>
              </div>

              <div>
                <button 
                  onClick={copyReferralCode}
                  className="bg-[#0F766E] hover:bg-[#0D625A] text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all shadow-md shadow-teal-700/10 cursor-pointer w-fit z-10"
                >
                  {copiedReferral ? 'Code Copied!' : 'Refer Now'}
                </button>
              </div>

              {/* Decorative Travel luggage Illustration SVG */}
              <div className="absolute right-0 bottom-0 pointer-events-none scale-105 origin-bottom-right">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 120C60 110 90 100 120 112V120H40Z" fill="#14B8A6" fillOpacity="0.25"/>
                  <path d="M0 120C30 115 70 105 120 120H0Z" fill="#14B8A6" fillOpacity="0.15"/>
                  <rect x="52" y="55" width="42" height="52" rx="7" fill="#EA580C"/>
                  <rect x="56" y="59" width="34" height="44" rx="4" fill="#F97316"/>
                  <rect x="62" y="55" width="5" height="52" fill="#C2410C"/>
                  <rect x="79" y="55" width="5" height="52" fill="#C2410C"/>
                  <path d="M65 55V44C65 42.8954 65.8954 42 67 42H79C80.1046 42 81 42.8954 81 44V55" stroke="#C2410C" strokeWidth="3" strokeLinecap="round"/>
                  <rect x="68" y="38" width="10" height="5" rx="1.5" fill="#475569"/>
                  <circle cx="61" cy="109" r="4.5" fill="#1E293B"/>
                  <circle cx="61" cy="109" r="2" fill="#94A3B8"/>
                  <circle cx="85" cy="109" r="4.5" fill="#1E293B"/>
                  <circle cx="85" cy="109" r="2" fill="#94A3B8"/>
                  <path d="M12 120V92C12 91.5 12.5 91 13 91H14C14.5 91 15 91.5 15 92V120H12Z" fill="#78350F"/>
                  <circle cx="13.5" cy="84" r="12" fill="#0D9488" fillOpacity="0.8"/>
                  <circle cx="8" cy="80" r="8" fill="#0F766E" fillOpacity="0.85"/>
                  <circle cx="19" cy="81" r="9" fill="#14B8A6" fillOpacity="0.75"/>
                </svg>
              </div>
            </div>
          </aside>

          {/* ==================== CENTER COLUMN: DASHBOARD CONTENT ==================== */}
          <main className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6">
            
            {activeTab === 'My Bookings' ? (
              <>
                {/* Header Content */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">My Bookings</h2>
                  
                  {/* Dropdown All Types Filter */}
                  <button className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm cursor-pointer">
                    <SlidersHorizontal className="h-4 w-4 text-slate-500" strokeWidth={2} />
                    <span>All Types</span>
                    <ChevronDown className="h-4 w-4 text-slate-400" strokeWidth={2} />
                  </button>
                </div>

                {/* Subnav Filter Tabs */}
                <div className="border-b border-slate-200 flex items-center gap-6 overflow-x-auto no-scrollbar py-0.5">
                  {filterTabs.map((tab) => {
                    const isTabActive = selectedFilter === tab.name;
                    return (
                      <button
                        key={tab.name}
                        onClick={() => setSelectedFilter(tab.name)}
                        className={`pb-3 text-sm font-bold relative transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                          isTabActive ? 'text-[#0F766E]' : 'text-slate-400 hover:text-slate-650'
                        }`}
                      >
                        <span>{tab.name}</span>
                        {tab.count !== null && tab.count > 0 && (
                          <span className="bg-orange-500 text-white rounded-full text-[11px] h-5 w-5 flex items-center justify-center font-bold">
                            {tab.count}
                          </span>
                        )}
                        {isTabActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#0F766E]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Bookings Card List */}
                <div className="flex flex-col gap-5">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <div 
                        key={booking.id}
                        className="bg-white rounded-3xl border border-slate-200 p-5 flex flex-col md:flex-row gap-5 shadow-sm transition-all duration-200 hover:shadow-md text-left"
                      >
                        {/* Booking Image */}
                        <div className="w-full md:w-[220px] h-[140px] md:h-[150px] shrink-0 rounded-2xl overflow-hidden bg-slate-100">
                          <img 
                            src={booking.image} 
                            alt={booking.hotelName} 
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Booking Info (Left Side inside Row) */}
                        <div className="flex-1 flex flex-col justify-between py-1 text-left">
                          <div className="space-y-2">
                            <h3 className="text-lg font-bold text-slate-800 leading-snug">{booking.hotelName}</h3>
                            
                            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                              <MapPin className="h-4 w-4 text-slate-400 shrink-0" strokeWidth={2} />
                              <span>{booking.location}</span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                              <Users className="h-4 w-4 text-slate-400 shrink-0" strokeWidth={2} />
                              <span>
                                {booking.rooms} Room{booking.rooms > 1 ? 's' : ''}  •  {booking.adults} Adults
                                {booking.children > 0 ? `, ${booking.children} Children` : ''}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                              <Calendar className="h-4 w-4 text-slate-400 shrink-0" strokeWidth={2} />
                              <span>{booking.dates}  •  <span className="text-slate-800 font-bold">{booking.nights} Nights</span></span>
                            </div>
                          </div>

                          <div className="mt-4 pt-2 border-t border-slate-100 flex flex-col gap-1">
                            <div className="flex items-center gap-1 text-xs">
                              <span className="text-slate-400 font-medium">Booking ID:</span>
                              <span className="text-slate-800 font-bold">{booking.id}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px]">
                              <span className="text-slate-400 font-medium">Booked on:</span>
                              <span className="text-slate-500 font-semibold">{booking.bookedOn}</span>
                            </div>
                          </div>
                        </div>

                        {/* Booking Amount & Actions (Right Side inside Row) */}
                        <div className="w-full md:w-[180px] shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-5 flex flex-col justify-between items-end text-right gap-3">
                          {/* Status Badge */}
                          <div className="w-full flex justify-end">
                            {getStatusBadge(booking.status, booking.statusDetail)}
                          </div>

                          {/* Total Amount block */}
                          <div className="text-right">
                            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Total Amount</span>
                            <span className="text-xl font-bold text-slate-900 mt-1 block leading-none">{booking.amount}</span>
                            <span className="text-[10px] font-semibold text-slate-450 mt-1 block leading-none">
                              {booking.status === 'Cancelled' ? 'Cancelled' : booking.status === 'Completed' ? 'Paid at Property' : 'Pay at Property'}
                            </span>
                          </div>

                          {/* Dynamic button options based on booking status */}
                          <div className="flex items-center gap-2 w-full justify-end">
                            <button 
                              onClick={() => {
                                setSelectedBookingDetails(booking);
                                  setShowDetailsModal(true);
                              }}
                              className="border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                            >
                              View Details
                            </button>

                            {booking.status === 'Pending Confirmation' && (
                              <button 
                                onClick={() => handleCancelClick(booking)}
                                className="border border-red-200 text-red-500 hover:bg-red-50 font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                              >
                                Cancel Booking
                              </button>
                            )}

                            {booking.status === 'Confirmed' && (
                              <button 
                                onClick={() => alert('Feature coming soon: Owner contact direct chat.')}
                                className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer font-bold flex items-center gap-1.5 whitespace-nowrap"
                              >
                                <Phone className="h-3.5 w-3.5" strokeWidth={2.3} />
                                <span>Contact Owner</span>
                              </button>
                            )}

                            {booking.status === 'Completed' && (
                              <button 
                                onClick={() => {
                                  setReviewBooking(booking);
                                  setShowReviewModal(true);
                                }}
                                className="border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer font-bold flex items-center gap-1.5 whitespace-nowrap"
                              >
                                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-400" strokeWidth={2} />
                                <span>Write Review</span>
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    ))
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-[24px] p-12 text-center flex flex-col items-center justify-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                        <Calendar className="h-7 w-7" strokeWidth={1.8} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-[15px] text-slate-800">No Bookings Found</h4>
                        <p className="text-[12.5px] font-semibold text-slate-400">
                          There are no bookings matching the "{selectedFilter}" status filter.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Booking Guarantee Shield Banner */}
                  <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-4 flex items-start gap-3.5">
                    <ShieldCheck className="h-6 w-6 text-[#16A34A] shrink-0 mt-0.5" strokeWidth={2} />
                    <div className="text-left">
                      <span className="text-xs font-bold text-[#14532D]">Your bookings are safe and secure with TripVerse</span>
                      <p className="text-[11px] font-semibold text-slate-400 mt-1 leading-relaxed">
                        We don't store your payment details. You will pay at the property.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // SUBPAGE FALLBACKS
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col text-left gap-6 min-h-[500px]">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">{activeTab}</h2>
                  <p className="text-xs font-semibold text-slate-400 mt-1">Manage and view details regarding your {activeTab.toLowerCase()}.</p>
                </div>
                
                <div className="h-[1px] bg-slate-100" />

                {activeTab === 'Dashboard' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                    <div className="bg-teal-50/30 border border-teal-100 p-5 rounded-2xl">
                      <h4 className="font-extrabold text-xs text-[#0F766E] uppercase tracking-wider">Welcome back!</h4>
                      <span className="text-xl font-bold text-slate-900 mt-2 block">Rohit Kumar</span>
                      <p className="text-xs font-semibold text-slate-500 mt-1">Review your upcoming stays, modify check-ins, or share referrals on your profile.</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Account status</span>
                        <span className="text-sm font-bold text-slate-800 mt-1.5 block">Verified Member</span>
                      </div>
                      <button 
                        onClick={() => setActiveTab('My Bookings')}
                        className="bg-[#0F766E] hover:bg-[#0D625A] text-white font-bold text-xs py-2 px-4.5 rounded-xl cursor-pointer transition-all mt-4 w-fit"
                      >
                        View Reservations
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'My Wishlist' && (
                  <div className="flex flex-col gap-4">
                    <p className="text-xs font-semibold text-slate-550">Here are the stays you saved recently to review later:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { name: 'Sea Breeze Resort', location: 'Pondicherry', price: '₹4,000/night', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80' },
                        { name: 'Heritage Home Stay', location: 'Pondicherry', price: '₹2,880/night', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80' }
                      ].map((item, index) => (
                        <div key={index} className="border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-sm">
                          <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
                          <div className="p-3.5 space-y-1">
                            <span className="font-bold text-[13.5px] text-slate-800 block leading-none">{item.name}</span>
                            <span className="text-[11px] text-slate-400 font-semibold">{item.location}</span>
                            <div className="flex justify-between items-center pt-2">
                              <span className="text-xs font-bold text-slate-800">{item.price}</span>
                              <button 
                                onClick={() => onNavigate('stays-results')}
                                className="text-[10px] font-bold text-[#0F766E] hover:underline"
                              >
                                View Stay
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'Profile Settings' && (
                  <form onSubmit={(e) => { e.preventDefault(); alert('Settings saved successfully!'); }} className="space-y-4 max-w-md">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
                        <input type="text" defaultValue="Rohit Kumar" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#0F766E] transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Email Address</label>
                        <input type="email" defaultValue="rohit.kumar@gmail.com" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#0F766E] transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Phone Number</label>
                        <input type="tel" defaultValue="+91 98765 43210" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#0F766E] transition-all" />
                      </div>
                    </div>
                    <button type="submit" className="bg-[#0F766E] hover:bg-[#0D625A] text-white font-bold text-xs py-3 px-6 rounded-xl cursor-pointer transition-all">
                      Save Changes
                    </button>
                  </form>
                )}

                {activeTab === 'Support' && (
                  <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); e.target.reset(); }} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Topic</label>
                      <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#0F766E] transition-all">
                        <option>Reservation Inquiry</option>
                        <option>Cancellation request support</option>
                        <option>Payment & billing issue</option>
                        <option>Other support requests</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">How can we help?</label>
                      <textarea rows="4" placeholder="Describe your inquiry..." className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#0F766E] transition-all" required></textarea>
                    </div>
                    <button type="submit" className="bg-[#0F766E] hover:bg-[#0D625A] text-white font-bold text-xs py-3 px-6 rounded-xl cursor-pointer transition-all flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      <span>Submit Query</span>
                    </button>
                  </form>
                )}

                {['My Reviews', 'My Trips', 'Payment Methods', 'Address Book'].includes(activeTab) && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3">
                    <Compass className="h-10 w-10 text-slate-300" />
                    <span className="font-bold text-sm text-slate-700">No details found</span>
                    <p className="text-xs font-semibold text-slate-400">There are currently no records listed under your {activeTab.toLowerCase()}. Keep exploring to add items.</p>
                    <button 
                      onClick={() => onNavigate('stays-results')}
                      className="bg-white hover:bg-slate-50 border border-slate-200 font-bold text-xs py-2 px-4 rounded-xl cursor-pointer transition-all mt-2"
                    >
                      Browse Stays
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>

          {/* ==================== RIGHT COLUMN: STATS & HELP PANELS ==================== */}
          <section className="lg:col-span-3 xl:col-span-3 flex flex-col gap-6">
            
            {/* Booking Summary Panel */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm text-left">
              {/* Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="h-9 w-9 bg-teal-50 rounded-xl flex items-center justify-center text-[#0F766E]">
                  <Calendar className="h-5 w-5" strokeWidth={2} />
                </div>
                <span className="font-bold text-sm text-slate-800">Booking Summary</span>
              </div>

              {/* Total Bookings Big Number */}
              <div className="py-6 text-center">
                <span className="text-5xl font-black text-slate-900 leading-none tracking-tight block">{totalCount}</span>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block mt-2 leading-none">Total Bookings</span>
              </div>

              {/* Dynamic 2x2 Separation Grid */}
              <div className="grid grid-cols-2 text-center border-t border-slate-100">
                <div className="py-4 border-r border-b border-slate-100 flex flex-col justify-center">
                  <span className="text-lg font-bold text-slate-800 leading-none block">{upcomingCount}</span>
                  <span className="text-[10px] font-bold text-slate-450 block mt-1 leading-none">Upcoming</span>
                </div>
                <div className="py-4 border-b border-slate-100 flex flex-col justify-center">
                  <span className="text-lg font-bold text-emerald-600 leading-none block">{confirmedCount}</span>
                  <span className="text-[10px] font-bold text-emerald-600 block mt-1 leading-none">Confirmed</span>
                </div>
                <div className="py-4 border-r border-slate-100 flex flex-col justify-center">
                  <span className="text-lg font-bold text-slate-800 leading-none block">{completedCount}</span>
                  <span className="text-[10px] font-bold text-slate-450 block mt-1 leading-none">Completed</span>
                </div>
                <div className="py-4 flex flex-col justify-center">
                  <span className={`text-lg font-bold leading-none block ${cancelledCount > 0 ? 'text-red-500' : 'text-slate-400'}`}>{cancelledCount}</span>
                  <span className={`text-[10px] font-bold block mt-1 leading-none ${cancelledCount > 0 ? 'text-red-550' : 'text-slate-400'}`}>Cancelled</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm text-left">
              <h3 className="font-bold text-sm text-slate-800 mb-4 leading-none">Quick Actions</h3>

              <div className="flex flex-col gap-3">
                {[
                  { 
                    title: 'Explore Stays', 
                    sub: 'Find more amazing places to stay', 
                    color: 'bg-blue-50 text-blue-600', 
                    icon: Compass,
                    action: () => onNavigate('stays-results')
                  },
                  { 
                    title: 'My Wishlist', 
                    sub: 'View your saved properties', 
                    color: 'bg-purple-50 text-purple-600', 
                    icon: Heart,
                    action: () => setActiveTab('My Wishlist')
                  },
                  { 
                    title: 'Invite & Earn', 
                    sub: 'Refer friends and earn rewards', 
                    color: 'bg-emerald-50 text-emerald-600', 
                    icon: Gift,
                    action: () => copyReferralCode()
                  }
                ].map((act, index) => {
                  const ActionIcon = act.icon;
                  return (
                    <button
                      key={index}
                      onClick={act.action}
                      className="w-full text-left rounded-2xl border border-slate-100 hover:border-slate-250 bg-slate-50/20 hover:bg-slate-50/60 p-3.5 flex items-center justify-between gap-3.5 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`h-9 w-9 rounded-xl ${act.color} flex items-center justify-center shrink-0`}>
                          <ActionIcon className="h-5 w-5" strokeWidth={2} />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-bold text-slate-800 leading-none group-hover:text-[#0F766E] transition-colors">{act.title}</span>
                          <span className="text-[10px] font-semibold text-slate-400 mt-1 leading-none">{act.sub}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" strokeWidth={2} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Need Help? Support Panel */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm text-left flex flex-col gap-4">
              <div>
                <h3 className="font-bold text-sm text-slate-800 leading-none">Need Help?</h3>
                <p className="text-xs font-semibold text-slate-400 mt-2 leading-none">Our support team is here to help you</p>
              </div>

              {/* Action Buttons grid */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setActiveTab('Support')}
                  className="border border-[#0F766E] hover:bg-teal-50 text-[#0F766E] font-bold text-xs py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <MessageSquare className="h-4 w-4" strokeWidth={2} />
                  <span>Chat Support</span>
                </button>
                <a 
                  href="tel:+919876543210"
                  className="border border-[#0F766E] hover:bg-teal-50 text-[#0F766E] font-bold text-xs py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm text-center"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} />
                  <span>Call Support</span>
                </a>
              </div>

              {/* Display Phone Support */}
              <div className="flex items-center justify-center gap-2 py-1.5 border-t border-slate-100 text-[#0F766E]">
                <Phone className="h-4 w-4" strokeWidth={2} />
                <span className="text-xs font-bold tracking-wide">+91 98765 43210</span>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ==================== DIALOG MODALS ==================== */}
      
      {/* 1. Cancel Confirmation Modal */}
      {showCancelModal && bookingToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl max-w-md w-full p-6 text-center space-y-5 animate-scale-up">
            <div className="h-14 w-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
              <XCircle className="h-7 w-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900">Cancel Reservation?</h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                Are you sure you want to cancel your booking at <span className="font-bold text-slate-800">{bookingToCancel.hotelName}</span>? 
                This action will change your reservation status to Cancelled.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={() => setShowCancelModal(false)}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl cursor-pointer"
              >
                No, Keep Booking
              </button>
              <button 
                onClick={confirmCancellation}
                className="bg-red-650 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-xl cursor-pointer shadow-md shadow-red-700/10"
              >
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Details Modal */}
      {showDetailsModal && selectedBookingDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[28px] border border-slate-100 shadow-2xl max-w-lg w-full p-6 text-left relative animate-scale-up space-y-5">
            <button 
              onClick={() => setShowDetailsModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-50 p-1.5 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1 pr-6">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Reservation Details</span>
              <h3 className="text-xl font-black text-slate-900 leading-none">{selectedBookingDetails.hotelName}</h3>
              <span className="text-xs text-slate-400 font-semibold block pt-0.5">Booking ID: {selectedBookingDetails.id}</span>
            </div>

            <div className="h-[1px] bg-slate-100" />

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-500">
                <div>
                  <span className="block font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-1">Destination</span>
                  <span className="text-slate-800 font-extrabold">{selectedBookingDetails.location}</span>
                </div>
                <div>
                  <span className="block font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-1">Status</span>
                  <span className="text-slate-800 font-extrabold">{selectedBookingDetails.statusDetail}</span>
                </div>
                <div>
                  <span className="block font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-1">Duration</span>
                  <span className="text-slate-800 font-extrabold">{selectedBookingDetails.nights} Nights</span>
                </div>
                <div>
                  <span className="block font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-1">Dates</span>
                  <span className="text-slate-800 font-extrabold">{selectedBookingDetails.dates}</span>
                </div>
                <div>
                  <span className="block font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-1">Rooms & Guests</span>
                  <span className="text-slate-800 font-extrabold">
                    {selectedBookingDetails.rooms} Room, {selectedBookingDetails.adults} Adults
                    {selectedBookingDetails.children > 0 ? `, ${selectedBookingDetails.children} Children` : ''}
                  </span>
                </div>
                <div>
                  <span className="block font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-1">Booked On</span>
                  <span className="text-slate-800 font-extrabold">{selectedBookingDetails.bookedOn}</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between mt-2">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Total Paid/Due</span>
                  <span className="text-xl font-black text-slate-900 mt-1 block leading-none">{selectedBookingDetails.amount}</span>
                </div>
                <div className="text-right">
                  <span className="bg-teal-50 border border-teal-100 text-[#0F766E] rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    {selectedBookingDetails.status === 'Cancelled' ? 'No Payment' : 'Pay at Property'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="bg-[#0F766E] hover:bg-[#0D625A] text-white font-bold text-xs py-3 px-6 rounded-xl cursor-pointer shadow-md shadow-teal-700/10"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Review Modal */}
      {showReviewModal && reviewBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[28px] border border-slate-100 shadow-2xl max-w-md w-full p-6 text-left relative animate-scale-up space-y-4">
            <button 
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-50 p-1.5 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Share Your Experience</span>
              <h3 className="text-lg font-black text-slate-900 leading-none">Review {reviewBooking.hotelName}</h3>
            </div>

            <div className="h-[1px] bg-slate-100" />

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setReviewRating(starValue)}
                      className="cursor-pointer focus:outline-none transition-transform active:scale-90"
                    >
                      <Star 
                        className={`h-7 w-7 ${
                          starValue <= reviewRating 
                            ? 'text-amber-500 fill-amber-400' 
                            : 'text-slate-200 fill-slate-100'
                        }`} 
                        strokeWidth={2}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Comments</label>
                <textarea 
                  rows="4" 
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Tell us about the service, food, rooms, and environment..." 
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#0F766E] transition-all"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#0F766E] hover:bg-[#0D625A] text-white font-bold text-xs py-3 rounded-xl cursor-pointer shadow-md shadow-teal-700/10"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Styled Animations CSS block */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.96) translateY(8px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
}
