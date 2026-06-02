import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, Share2, Heart, Star, MapPin, Wifi, Waves, Compass, 
  Utensils, Car, Clock, ChevronDown, Check, Info, MessageSquare, 
  ShieldCheck, Headphones, Calendar, Camera, Send, X, StarHalf,
  Coffee, Wind, Map
} from 'lucide-react';

export default function StayDetail({ stay, searchParams, onBack, isLiked, onToggleLike }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [shareTooltip, setShareTooltip] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [showReviewPage, setShowReviewPage] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [guestDetails, setGuestDetails] = useState({ name: '', email: '', phone: '', whatsapp: false, specialRequests: '' });
  const [chatMessages, setChatMessages] = useState([
    { sender: 'property', text: "Hello! Thank you for choosing Sea Breeze Resort. How can we help you today?" }
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  // Track selected room quantities from the table
  const [selectedRooms, setSelectedRooms] = useState({
    room1: 0,
    room2: 0,
    room3: 0,
    room4: 0
  });

  // Track bed selection choices for standard double or twin room
  const [bedChoice, setBedChoice] = useState('twin');

  const roomsData = [
    {
      id: 'room1',
      name: 'Standard Double or Twin Room',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
      isHighFloor: true,
      hasBedChoices: true,
      size: '29 m²',
      view: 'City view',
      ac: true,
      tv: true,
      wifi: true,
      minibar: true,
      flatScreen: true,
      guests: '2 Adults, 1 Child',
      price3Nights: 11200,
      taxes3Nights: 560,
      choices: [
        { type: 'breakfast_optional', text: 'Breakfast ₹ 413 (optional)' },
        { type: 'non_refundable', text: 'Non-refundable' },
        { type: 'pay_before', text: 'Pay the property before arrival' }
      ]
    },
    {
      id: 'room2',
      name: 'Standard Double or Twin Room',
      image: 'https://images.unsplash.com/photo-1611891487122-2075b9627dde?auto=format&fit=crop&w=400&q=80',
      isHighFloor: true,
      hasBreakfastIncluded: true,
      size: '29 m²',
      view: 'City view',
      ac: true,
      flatScreen: true,
      wifi: true,
      guests: '2 Adults, 1 Child',
      price3Nights: 11800,
      taxes3Nights: 590,
      choices: [
        { type: 'breakfast_included', text: 'Continental breakfast included' },
        { type: 'non_refundable', text: 'Non-refundable' },
        { type: 'pay_before', text: 'Pay the property before arrival' }
      ]
    },
    {
      id: 'room3',
      name: 'Queen Suite',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80',
      isHighFloor: true,
      leftWarning: 'We have 1 left',
      hasQueenBed: true,
      size: '55 m²',
      privateSuite: true,
      view: 'City view',
      seaView: true,
      ac: true,
      spaTub: true,
      flatScreen: true,
      minibar: true,
      wifi: true,
      guests: '2 Adults, 1 Child',
      price3Nights: 21900,
      taxes3Nights: 1095,
      choices: [
        { type: 'breakfast_optional', text: 'Breakfast ₹ 413 (optional)' },
        { type: 'non_refundable', text: 'Non-refundable' },
        { type: 'pay_before', text: 'Pay the property before arrival' }
      ]
    },
    {
      id: 'room4',
      name: 'Queen Suite',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80',
      isHighFloor: true,
      hasBreakfastIncluded: true,
      size: '55 m²',
      privateSuite: true,
      view: 'City view',
      ac: true,
      flatScreen: true,
      minibar: true,
      wifi: true,
      guests: '2 Adults, 1 Child',
      price3Nights: 22500,
      taxes3Nights: 1125,
      choices: [
        { type: 'breakfast_included', text: 'Continental breakfast included' },
        { type: 'non_refundable', text: 'Non-refundable' },
        { type: 'pay_before', text: 'Pay the property before arrival' }
      ]
    }
  ];

  // Calculate pricing based on selections
  let totalSelectedBase = 0;
  let totalSelectedTaxes = 0;
  let selectedRoomsList = [];

  roomsData.forEach(room => {
    const qty = selectedRooms[room.id] || 0;
    if (qty > 0) {
      totalSelectedBase += room.price3Nights * qty;
      totalSelectedTaxes += room.taxes3Nights * qty;
      selectedRoomsList.push({
        id: room.id,
        name: room.name,
        qty: qty,
        price: room.price3Nights * qty,
        hasBreakfastIncluded: room.hasBreakfastIncluded
      });
    }
  });

  const totalSelectedGrand = totalSelectedBase + totalSelectedTaxes;
  const hasSelectedRooms = selectedRoomsList.length > 0;

  // Date Formatting Helpers
  const formatDateString = (dateStr) => {
    if (!dateStr) return '21 Jun 2025';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getDayOfWeek = (dateStr) => {
    if (!dateStr) return 'Sat';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Sat';
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  // Scroll to section handler
  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id.toLowerCase() + '-section');
    if (element) {
      const offset = 100; // Account for sticky headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setShareTooltip(true);
      setTimeout(() => setShareTooltip(false), 2000);
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages(prev => [...prev, { sender: 'user', text: newMessage }]);
    setNewMessage('');
    
    // Simulate auto reply
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: 'property', 
        text: "Thanks for your query. Our front desk representative will respond within a few minutes!" 
      }]);
    }, 1500);
  };

  // Calculate default values based on stay
  const price = stay.price || 4000;
  const originalPrice = stay.originalPrice || 5000;
  const totalNights = 4;
  const totalPriceCalculated = price * totalNights;
  const taxesCalculated = stay.taxes || Math.round(totalPriceCalculated * 0.16);
  const finalAmount = totalPriceCalculated + taxesCalculated;

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }} className="bg-[#F8FAFC] min-h-screen text-left">

      {/* ═══════════════════════════════════════════════ */}
      {/* REVIEW YOUR RESERVATION PAGE                    */}
      {/* ═══════════════════════════════════════════════ */}
      {showReviewPage && (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[12.5px] font-semibold text-slate-500 mb-6">
            <button onClick={() => { setShowReviewPage(false); }} className="hover:text-[#0F766E] cursor-pointer transition-colors flex items-center gap-1">
              <ChevronLeft className="h-3.5 w-3.5" /> Back to Property
            </button>
            <span className="text-slate-300">›</span>
            <span className="text-slate-400">Select Rooms</span>
            <span className="text-slate-300">›</span>
            <span className="text-[#0F766E] font-bold">Review Reservation</span>
          </div>

          {/* Page Title */}
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-black text-slate-900">Review Your Reservation</h1>
            <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#0F766E] bg-[#0F766E]/8 px-3 py-1.5 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Your reservation is secure and encrypted</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

            {/* LEFT COLUMN */}
            <div className="space-y-5">

              {/* Property Card */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">

                {/* Photo Gallery — 1 large left + 2 stacked middle + 2 stacked right */}
                <div style={{ display: 'flex', height: '210px', gap: '3px' }}>

                  {/* Left — large full-height image */}
                  <div style={{ width: '50%', flexShrink: 0, overflow: 'hidden' }}>
                    <img
                      src={stay.images?.[0] || stay.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'}
                      alt={stay.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>

                  {/* Middle — 2 stacked, each 50% height */}
                  <div style={{ width: '25%', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <img
                        src={stay.images?.[1] || 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80'}
                        alt={stay.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <img
                        src={stay.images?.[2] || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80'}
                        alt={stay.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  </div>

                  {/* Right — 2 stacked, each 50% height */}
                  <div style={{ width: '25%', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <img
                        src={stay.images?.[3] || 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80'}
                        alt={stay.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={stay.images?.[4] || 'https://images.unsplash.com/photo-1611891487122-2075b9627dde?auto=format&fit=crop&w=400&q=80'}
                        alt={stay.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      {stay.images?.length > 5 && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 800 }}>+{stay.images.length - 5} photos</span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>




                {/* Property Info */}
                <div className="p-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-[15px] font-black text-slate-900">{stay.name}</h2>
                    <span className="text-[10px] font-bold bg-[#0F766E]/10 text-[#0F766E] px-2 py-0.5 rounded-full">Best Seller</span>
                  </div>
                  <p className="text-[11.5px] text-slate-500 font-semibold mt-0.5">{stay.location || 'Pondicherry Beach, Pondicherry'} · 0.8 km from center</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-[12px] font-black text-slate-800">{stay.rating || '4.6'}</span>
                    <span className="text-[11px] text-slate-400 font-semibold">({stay.reviewsCount || 128} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2.5 text-[11px] text-slate-500 font-semibold">
                    {[{ icon: <Wifi className="h-3 w-3" />, text: 'Free Wi-Fi' }, { icon: <Waves className="h-3 w-3" />, text: 'Pool' }, { icon: <MapPin className="h-3 w-3" />, text: 'Beach Access' }, { icon: <Utensils className="h-3 w-3" />, text: 'Restaurant' }, { icon: <Car className="h-3 w-3" />, text: 'Free Parking' }].map((f, i) => (
                      <span key={i} className="flex items-center gap-1">{f.icon}{f.text}</span>
                    ))}
                  </div>
                </div>
              </div>


              {/* Selected Rooms */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <h3 className="text-[14px] font-black text-slate-900 mb-4">
                  Selected Rooms
                  <span className="ml-2 text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{selectedRoomsList.reduce((s, r) => s + r.qty, 0)} Room{selectedRoomsList.reduce((s, r) => s + r.qty, 0) !== 1 ? 's' : ''}</span>
                </h3>
                <div className="space-y-3">
                  {selectedRoomsList.length === 0 ? (
                    <p className="text-[12px] text-slate-400 font-semibold">No rooms selected.</p>
                  ) : selectedRoomsList.map((selRoom, idx) => {
                    const roomData = roomsData.find(r => r.id === selRoom.id);
                    return (
                      <div key={idx} className="flex gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 relative">
                        <img src={roomData?.image} alt={selRoom.name} className="w-[90px] h-[65px] rounded-lg object-cover border border-slate-100 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-[13px] font-extrabold text-slate-900">{selRoom.name}</h4>
                              <p className="text-[11px] text-slate-500 font-semibold">{roomData?.view || 'City View'}</p>
                            </div>
                            <button onClick={() => setSelectedRooms(prev => ({ ...prev, [selRoom.id]: 0 }))} className="text-slate-300 hover:text-red-400 cursor-pointer ml-2 shrink-0">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-3 mt-1.5 text-[10.5px] text-slate-500 font-semibold">
                            <span className="flex items-center gap-1">🛏 {roomData?.hasQueenBed ? '1 King Bed' : '1 King Bed'}</span>
                            <span className="flex items-center gap-1">👥 {roomData?.guests || '2 Adults + 1 Child'}</span>
                            <span className="flex items-center gap-1">📐 {roomData?.size || '250 sq.ft'}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                          <div className="text-[15px] font-black text-slate-900">₹{(selRoom.price / 3).toLocaleString()} <span className="text-[10px] font-semibold text-slate-400">/ night</span></div>
                          <div className="text-[11px] text-slate-500 font-semibold mt-0.5">₹{selRoom.price.toLocaleString()} for 3 nights</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stay Details */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[14px] font-black text-slate-900">Stay Details</h3>
                  <button className="text-[11.5px] font-bold text-[#0F766E] border border-[#0F766E]/30 px-3 py-1 rounded-lg hover:bg-[#0F766E]/5 cursor-pointer transition-colors">Edit</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {[
                    { icon: <Calendar className="h-4 w-4 text-slate-400" />, label: 'Check-in', val: formatDateString(searchParams?.checkIn), sub: getDayOfWeek(searchParams?.checkIn) + 'urday' },
                    { icon: <Calendar className="h-4 w-4 text-slate-400" />, label: 'Check-out', val: formatDateString(searchParams?.checkOut), sub: getDayOfWeek(searchParams?.checkOut) + 'nesday' },
                    { icon: <Clock className="h-4 w-4 text-slate-400" />, label: 'Duration', val: '4 Nights', sub: '' },
                    { icon: <Compass className="h-4 w-4 text-slate-400" />, label: 'Rooms', val: `${selectedRoomsList.reduce((s, r) => s + r.qty, 0)} Room${selectedRoomsList.reduce((s, r) => s + r.qty, 0) !== 1 ? 's' : ''}`, sub: '' },
                    { icon: null, label: 'Guests', val: searchParams?.guests || '4 Adults, 2 Children', sub: '' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="flex items-center gap-1.5 text-[10.5px] text-slate-400 font-bold uppercase tracking-wide mb-1">{item.icon}{item.label}</div>
                      <div className="text-[12.5px] font-extrabold text-slate-800">{item.val}</div>
                      {item.sub && <div className="text-[11px] text-slate-400 font-semibold">{item.sub}</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Details Form */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <h3 className="text-[14px] font-black text-slate-900 mb-4">Guest Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  {[
                    { label: 'Full Name', key: 'name', placeholder: 'Rohit Kumar', type: 'text' },
                    { label: 'Email Address', key: 'email', placeholder: 'rohit.kumar@gmail.com', type: 'email' },
                    { label: 'Phone Number', key: 'phone', placeholder: '+91 98765 43210', type: 'tel' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1.5">{field.label}<span className="text-red-400">*</span></label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={guestDetails[field.key]}
                        onChange={e => setGuestDetails(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-[12.5px] font-semibold text-slate-700 placeholder-slate-300 outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]/20 transition-all"
                      />
                    </div>
                  ))}
                </div>
                <label className="flex items-center gap-2.5 cursor-pointer select-none mb-4">
                  <input
                    type="checkbox"
                    checked={guestDetails.whatsapp}
                    onChange={e => setGuestDetails(prev => ({ ...prev, whatsapp: e.target.checked }))}
                    className="w-4 h-4 accent-[#0F766E] rounded"
                  />
                  <span className="text-[12px] font-semibold text-slate-600">Receive reservation updates on WhatsApp 💬</span>
                </label>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Special Requests <span className="text-slate-400 font-semibold">(Optional)</span></label>
                  <textarea
                    rows={3}
                    placeholder="Any special requests? Let the property know..."
                    value={guestDetails.specialRequests}
                    onChange={e => setGuestDetails(prev => ({ ...prev, specialRequests: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-[12.5px] font-semibold text-slate-700 placeholder-slate-300 outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]/20 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: '🎫', title: 'Free Cancellation', sub: 'Cancel for free before 18 Jun 2025' },
                  { icon: '💳', title: 'No Prepayment', sub: 'Pay at the property' },
                  { icon: '🔒', title: 'Secure Reservation', sub: "We're here to help you anytime" },
                  { icon: '🎧', title: '24/7 Support', sub: "We're here to help you anytime" },
                ].map((badge, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs">
                    <span className="text-lg shrink-0">{badge.icon}</span>
                    <div>
                      <div className="text-[11.5px] font-extrabold text-slate-800">{badge.title}</div>
                      <div className="text-[10.5px] text-slate-400 font-semibold mt-0.5">{badge.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDEBAR - Sticky Reservation Summary */}
            <div className="lg:sticky lg:top-6 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                {/* Summary Header */}
                <div className="p-5 border-b border-slate-100">
                  <h3 className="text-[14px] font-black text-slate-900 mb-3">Reservation Summary</h3>
                  <div className="flex gap-3">
                    <img
                      src={stay.images?.[0] || stay.image}
                      alt={stay.name}
                      className="w-[52px] h-[40px] rounded-lg object-cover border border-slate-100 shrink-0"
                    />
                    <div>
                      <div className="text-[12.5px] font-extrabold text-slate-900">{stay.name}</div>
                      <div className="text-[11px] text-slate-500 font-semibold">{stay.location || 'Pondicherry Beach, Pondicherry'}</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-[11px] font-bold text-slate-700">{stay.rating || '4.6'}</span>
                        <span className="text-[10.5px] text-slate-400 font-semibold">({stay.reviewsCount || 128} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dates & Guests */}
                <div className="px-5 py-4 border-b border-slate-100">
                  <div className="grid grid-cols-2 gap-3 text-[11.5px]">
                    <div>
                      <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wide mb-0.5">Check-in</div>
                      <div className="font-extrabold text-slate-800">{formatDateString(searchParams?.checkIn)}</div>
                      <div className="text-slate-400 font-semibold">Saturday</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wide mb-0.5">Check-out</div>
                      <div className="font-extrabold text-slate-800">{formatDateString(searchParams?.checkOut)}</div>
                      <div className="text-slate-400 font-semibold">Wednesday</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wide mb-0.5">Duration</div>
                      <div className="font-extrabold text-slate-800">4 Nights</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wide mb-0.5">Guests</div>
                      <div className="font-extrabold text-slate-800">{searchParams?.guests || '4 Adults, 2 Children'}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-500 font-semibold">Rooms</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11.5px] font-extrabold text-slate-800">{selectedRoomsList.reduce((s, r) => s + r.qty, 0)} Room{selectedRoomsList.reduce((s, r) => s + r.qty, 0) !== 1 ? 's' : ''}</span>
                      <button onClick={() => setShowReviewPage(false)} className="text-[11px] text-[#0F766E] font-bold cursor-pointer hover:underline">Edit</button>
                    </div>
                  </div>
                </div>

                {/* Selected Rooms Summary */}
                <div className="px-5 py-4 border-b border-slate-100">
                  <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wide mb-2.5">Selected Rooms</div>
                  <div className="space-y-2">
                    {selectedRoomsList.map((selRoom, idx) => (
                      <div key={idx} className="flex justify-between items-start text-[11.5px]">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-4 h-4 bg-[#0F766E] text-white rounded-full text-[9px] font-black flex items-center justify-center shrink-0">{idx + 1}</span>
                            <span className="font-extrabold text-slate-800">{selRoom.name}</span>
                          </div>
                          <div className="text-[10.5px] text-slate-400 font-semibold ml-5.5">₹{(selRoom.price / 3).toLocaleString()} × 3 nights</div>
                        </div>
                        <span className="font-extrabold text-slate-900 shrink-0">₹{selRoom.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="px-5 py-4 border-b border-slate-100 space-y-2 text-[12px]">
                  <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wide mb-2">Price Details</div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-semibold">Room Charges</span>
                    <span className="font-bold text-slate-800">₹{totalSelectedBase.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-semibold flex items-center gap-1">Taxes & Fees <Info className="h-3 w-3 text-slate-400" /></span>
                    <span className="font-bold text-slate-800">₹{totalSelectedTaxes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-100 mt-1">
                    <span className="text-[13.5px] font-black text-slate-900">Total Amount</span>
                    <span className="text-[15px] font-black text-slate-900">₹{totalSelectedGrand.toLocaleString()}</span>
                  </div>
                  <div className="text-[10.5px] text-slate-400 font-semibold">Inclusive of all taxes</div>
                </div>

                {/* Payment Method */}
                <div className="px-5 py-4 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-[11.5px] font-bold text-slate-500 mb-3">
                    Payment Method <Info className="h-3 w-3 text-slate-400" />
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0F766E]/6 border border-[#0F766E]/15">
                    <div className="w-5 h-5 rounded-full bg-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-white stroke-[3]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[12.5px] font-extrabold text-[#0F766E]">Pay Directly at Property</div>
                      <div className="space-y-1 mt-2">
                        {['No advance payment required', 'You will pay at the property during check-in', 'The property owner will contact you to confirm your reservation'].map((txt, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[10.5px] text-slate-500 font-semibold">
                            <Check className="h-3 w-3 text-[#0F766E] stroke-[3] shrink-0 mt-0.5" />
                            <span>{txt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reserve Now Button */}
                <div className="p-5">
                  <button className="w-full bg-[#0F766E] hover:bg-[#0c625c] active:scale-[0.98] text-white py-3.5 rounded-xl font-black text-[13.5px] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Reserve Now
                  </button>
                  <div className="text-center text-[10.5px] text-slate-400 font-semibold mt-2">No payment required now. You will pay at the property.</div>
                  <div className="flex items-center justify-center gap-1.5 mt-2 text-[10.5px] text-slate-400 font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
                    Your information is safe and secure
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════ */}
      {/* MAIN STAY DETAIL PAGE (hidden while reviewing) */}
      {/* ═══════════════════════════════════════════════ */}
      {!showReviewPage && (
      <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

        
        {/* 1. Breadcrumbs & Actions Row */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-5">
          <div className="flex items-center gap-3 text-slate-500 text-[13.5px] font-semibold">
            <button 
              onClick={onBack}
              className="flex items-center gap-1.5 text-slate-700 hover:text-[#0F766E] font-bold cursor-pointer transition-colors"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
              <span>Back to Search Results</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            {/* Share Button */}
            <div className="relative">
              <button 
                onClick={handleShare}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-[13px] shadow-xs cursor-pointer transition-colors"
              >
                <Share2 className="h-4 w-4 text-slate-500" />
                <span>Share</span>
              </button>
              {shareTooltip && (
                <div className="absolute right-0 bottom-full mb-2 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-md z-30">
                  Link copied to clipboard!
                </div>
              )}
            </div>

            {/* Save Button */}
            <button 
              onClick={() => onToggleLike(stay.id)}
              className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-[13px] shadow-xs cursor-pointer transition-colors"
            >
              <Heart className={`h-4.5 w-4.5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-500'}`} />
              <span>{isLiked ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* 2. Title & Ratings Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {stay.name}
            </h1>
            {stay.tag && (
              <span className="bg-[#DCFCE7] text-[#15803D] text-[11px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                {stay.tag}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-2.5 text-[13px] text-slate-500 font-semibold">
            <div className="flex items-center gap-1">
              <span className="flex items-center gap-0.5 bg-[#15803D] text-white text-[11px] font-black px-1.5 py-0.5 rounded-md">
                {stay.rating}
                <Star className="h-3 w-3 fill-current text-white" />
              </span>
              <span className="text-slate-450">({stay.reviewsCount || 128} reviews)</span>
            </div>
            <span>•</span>
            <span>{stay.location.split('•')[0].trim()}</span>
            <span>•</span>
            <span>{stay.location.split('•')[1]?.trim() || '0.8 km from center'}</span>
            <span>•</span>
            <button 
              onClick={() => scrollToSection('Location')}
              className="flex items-center gap-1 text-[#0F766E] hover:underline cursor-pointer font-bold"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>View on Map</span>
            </button>
          </div>
        </div>

        {/* 3. Photo Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[320px] sm:h-[400px] rounded-3xl overflow-hidden shadow-xs relative mb-6">
          {/* Main Large Image (Left - 7 cols) */}
          <div className="md:col-span-7 h-full relative group cursor-pointer overflow-hidden" onClick={() => { setGalleryIndex(0); setShowGallery(true); }}>
            <img 
              src={stay.images[0]} 
              alt={`${stay.name} Main View`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
            />
            {/* View All Photos Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); setGalleryIndex(0); setShowGallery(true); }}
              className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs hover:bg-white text-slate-800 text-[12px] font-bold px-3.5 py-2 rounded-xl shadow-md flex items-center gap-1.5 border border-slate-200/40 cursor-pointer transition-all active:scale-95"
            >
              <Camera className="h-4 w-4 text-slate-700" />
              <span>View All Photos</span>
            </button>
          </div>

          {/* Smaller Images Grid (Right - 5 cols) */}
          <div className="md:col-span-5 hidden md:grid grid-cols-2 grid-rows-2 gap-3 h-full">
            {stay.images.slice(1, 5).map((imgUrl, idx) => {
              const imageIndex = idx + 1;
              const isLast = imageIndex === 4;
              return (
                <div 
                  key={idx} 
                  onClick={() => { setGalleryIndex(imageIndex); setShowGallery(true); }}
                  className="h-full relative group cursor-pointer overflow-hidden rounded-xs"
                >
                  <img 
                    src={imgUrl} 
                    alt={`${stay.name} view ${imageIndex}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  {isLast && (
                    <div className="absolute inset-0 bg-black/45 hover:bg-black/50 transition-colors flex flex-col items-center justify-center text-white">
                      <span className="text-xl font-black">+32 Photos</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Tabs Bar */}
        <div className="w-full border-b border-slate-200 bg-white sticky top-20 z-20 flex overflow-x-auto no-scrollbar py-1">
          <div className="flex gap-8 px-2">
            {['Overview', 'Rooms', 'Amenities', 'Reviews', 'Location', 'Policies'].map((tab) => {
              const isActive = activeTab === tab;
              const displayLabel = tab === 'Reviews' ? `Reviews (${stay.reviewsCount || 128})` : tab;
              return (
                <button
                  key={tab}
                  onClick={() => scrollToSection(tab)}
                  className={`py-4 text-[13.5px] font-extrabold border-b-3 whitespace-nowrap cursor-pointer transition-all leading-none ${
                    isActive 
                      ? 'border-[#0F766E] text-[#0F766E] scale-102' 
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {displayLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Main Content Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
          
          {/* Left Column (Content) */}
          <div className="md:col-span-9 space-y-8">
            
            {/* Overview Section */}
            <section id="overview-section" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-[17px] font-black text-slate-900 mb-4">About this property</h2>
              
              <div className="text-[13.5px] text-slate-600 font-semibold leading-relaxed">
                <p>
                  {isDescriptionExpanded 
                    ? stay.description + " This spectacular destination provides guests with state-of-the-art accommodations, high-speed amenities, and personalized attention around the clock. Whether you are traveling for a family holiday, a couple's getaway, or an executive business retreat, you will find peace, relaxation, and luxury."
                    : stay.description
                  }
                </p>
                <button 
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-[#0F766E] font-bold mt-2 hover:underline cursor-pointer flex items-center gap-1.5 p-0"
                >
                  <span>{isDescriptionExpanded ? 'Read less' : 'Read more'}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDescriptionExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Quick High-quality highlight badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-6 pt-6 border-t border-slate-100">
                {[
                  { icon: <Wifi className="h-4.5 w-4.5 text-slate-500 stroke-[2.2]" />, label: 'Free Wi-Fi' },
                  { icon: <Waves className="h-4.5 w-4.5 text-slate-500 stroke-[2.2]" />, label: 'Swimming Pool' },
                  { icon: <Compass className="h-4.5 w-4.5 text-slate-500 stroke-[2.2]" />, label: 'Beach Access' },
                  { icon: <Utensils className="h-4.5 w-4.5 text-slate-500 stroke-[2.2]" />, label: 'Restaurant' },
                  { icon: <Car className="h-4.5 w-4.5 text-slate-500 stroke-[2.2]" />, label: 'Free Parking' },
                  { icon: <Clock className="h-4.5 w-4.5 text-slate-500 stroke-[2.2]" />, label: '24/7 Front Desk' }
                ].map((highlight, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200/60 bg-slate-50/30 text-slate-700 text-[13px] font-bold"
                  >
                    {highlight.icon}
                    <span>{highlight.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Rooms Section */}
            <section id="rooms-section" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs text-left">
              <h2 className="text-[17px] font-black text-slate-900 mb-4">Select Your Room</h2>
              
              {/* Responsive Scrollable Container */}
              <div className="w-full overflow-x-auto no-scrollbar rounded-2xl border border-[#0F766E]/30">
                <table className="w-full text-left text-xs min-w-[950px] bg-white" style={{borderCollapse:'collapse'}}>
                  
                  {/* Table Header */}
                  <thead>
                    <tr className="bg-[#0F766E] text-white font-extrabold text-[11px] uppercase tracking-wider">
                      <th className="p-4 w-[38%] font-extrabold border-r border-[#0d9488]/50">Room type</th>
                      <th className="p-4 w-[12%] font-extrabold text-center border-r border-[#0d9488]/50">Number of guests</th>
                      <th className="p-4 w-[16%] font-extrabold border-r border-[#0d9488]/50">Price for 3 nights</th>
                      <th className="p-4 w-[22%] font-extrabold border-r border-[#0d9488]/50">Your choices</th>
                      <th className="p-4 w-[12%] font-extrabold text-center">Select Rooms</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {roomsData.map((room) => (
                      <tr key={room.id} className="align-top hover:bg-[#f0faf9] transition-colors">
                        
                        {/* 1. Room Type Column */}
                        <td className="p-4 border-b border-[#0F766E]/15">
                          <div className="flex gap-4">
                            {/* Room Image */}
                            <img 
                              src={room.image} 
                              alt={room.name}
                              className="w-[120px] h-[90px] rounded-xl object-cover shrink-0 border border-slate-100 shadow-xs"
                            />
                            {/* Room Info */}
                            <div className="space-y-1.5 text-left">
                              <h4 className="text-[14px] font-extrabold text-[#0F766E] hover:underline cursor-pointer">
                                {room.name}
                              </h4>
                              
                              {room.isHighFloor && (
                                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                                  <span>↑</span>
                                  <span>High floor</span>
                                </div>
                              )}

                              {room.leftWarning && (
                                <div className="flex items-center gap-1 text-[11px] font-extrabold text-red-650">
                                  <span>●</span>
                                  <span>{room.leftWarning}</span>
                                </div>
                              )}

                              {/* Bed Preferences (Radio Choices) */}
                              {room.hasBedChoices && (
                                <div className="space-y-1.5 mt-2 bg-slate-50/65 rounded-xl p-2.5 border border-slate-150/50 max-w-[200px]">
                                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                                    Select your bed (if available)
                                  </span>
                                  
                                  <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input 
                                      type="radio" 
                                      name={`bed-${room.id}`}
                                      checked={bedChoice === 'twin'}
                                      onChange={() => setBedChoice('twin')}
                                      className="accent-[#0F766E]"
                                    />
                                    <span className="text-[11.5px] font-semibold text-slate-650 flex items-center gap-1">
                                      2 twin beds
                                      <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M2 14h20" /></svg>
                                    </span>
                                  </label>

                                  <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input 
                                      type="radio" 
                                      name={`bed-${room.id}`}
                                      checked={bedChoice === 'king'}
                                      onChange={() => setBedChoice('king')}
                                      className="accent-[#0F766E]"
                                    />
                                    <span className="text-[11.5px] font-semibold text-slate-650 flex items-center gap-1">
                                      1 king bed
                                      <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M2 14h20" /></svg>
                                    </span>
                                  </label>
                                </div>
                              )}

                              {room.hasQueenBed && (
                                <div className="text-[11.5px] font-semibold text-slate-650 flex items-center gap-1.5">
                                  <span>1 queen bed</span>
                                  <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M2 14h20" /></svg>
                                </div>
                              )}

                              {/* Size/Room Tags Row */}
                              <div className="flex flex-wrap gap-1.5 mt-2.5 text-[11px] font-bold text-slate-600">
                                <span className="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50">{room.size}</span>
                                {room.privateSuite && <span className="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50">Private suite</span>}
                                <span className="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50">{room.view}</span>
                                {room.seaView && <span className="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50">Sea view</span>}
                                {room.ac && <span className="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50">Air conditioning</span>}
                                {room.spaTub && <span className="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50">Spa tub</span>}
                                {room.flatScreen && <span className="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50">Flat-screen TV</span>}
                                {room.minibar && <span className="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50">Minibar</span>}
                                {room.wifi && <span className="px-2 py-0.5 rounded-md border border-slate-200 bg-slate-50">Free WiFi</span>}
                              </div>

                              {/* Detailed Checklist of Amenities */}
                              {room.amenities && (
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold max-w-[400px]">
                                  {room.amenities.map((amenity, i) => (
                                    <div key={i} className="flex items-center gap-1.5">
                                      <Check className="h-3 w-3 text-emerald-600 shrink-0 stroke-[3.5]" />
                                      <span className="truncate">{amenity}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                            </div>
                          </div>
                        </td>

                        {/* 2. Number of Guests Column */}
                        <td className="p-4 text-center border-l border-b border-[#0F766E]/15">
                          <div className="flex flex-col items-center justify-center pt-2">
                            <svg className="w-5 h-5 text-slate-650" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            <span className="text-[11.5px] font-extrabold text-slate-700 mt-2 block leading-none">
                              {room.guests.split(',')[0]}
                            </span>
                            <span className="text-[10px] font-bold text-slate-450 mt-1 block leading-none">
                              {room.guests.split(',')[1]?.trim() || ''}
                            </span>
                          </div>
                        </td>

                        {/* 3. Price for 3 Nights Column */}
                        <td className="p-4 border-l border-b border-[#0F766E]/15">
                          <div className="pt-2">
                            <span className="text-[16px] font-black text-slate-900">
                              ₹ {room.price3Nights.toLocaleString()}
                            </span>
                            <span className="text-[10.5px] font-bold text-slate-450 block mt-1 leading-normal">
                              + ₹ {room.taxes3Nights} taxes and fees
                            </span>
                          </div>
                        </td>

                        {/* 4. Your Choices Column */}
                        <td className="p-4 border-l border-b border-[#0F766E]/15">
                          <div className="pt-2 space-y-3 font-semibold text-slate-700">
                            {room.choices.map((choice, i) => {
                              const isGreen = choice.type === 'breakfast_included';
                              const isOptional = choice.type === 'breakfast_optional';
                              
                              return (
                                <div key={i} className="flex gap-2 items-start leading-normal text-[11.5px]">
                                  {choice.type.startsWith('breakfast') ? (
                                    <Coffee className={`h-4 w-4 shrink-0 mt-0.5 ${isGreen ? 'text-emerald-600' : 'text-slate-500'}`} />
                                  ) : choice.type === 'non_refundable' ? (
                                    <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-slate-500 font-bold text-[9px]">X</div>
                                  ) : (
                                    <span className="text-slate-450 mt-0.5 shrink-0 text-sm">•</span>
                                  )}
                                  <div className="flex items-center gap-1">
                                    <span className={isGreen ? 'text-emerald-700 font-extrabold' : 'font-semibold'}>
                                      {choice.text}
                                    </span>
                                    {isOptional && (
                                      <Info className="h-3 w-3 text-slate-400 cursor-help shrink-0" title="Breakfast can be added at checkout." />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </td>

                        {/* 5. Select Rooms Column */}
                        <td className="p-4 text-center border-l border-b border-[#0F766E]/15">
                          <div className="pt-1.5 flex justify-center">
                            <div className="relative">
                              <select
                                value={selectedRooms[room.id] || 0}
                                onChange={(e) => setSelectedRooms(prev => ({ ...prev, [room.id]: parseInt(e.target.value) }))}
                                className="appearance-none bg-white border border-slate-355 text-slate-800 text-[12px] font-bold pl-3 pr-8 py-2 rounded-xl outline-none focus:border-[#0F766E] cursor-pointer"
                              >
                                <option value={0}>0</option>
                                {[...Array(10)].map((_, idx) => {
                                  const qty = idx + 1;
                                  return (
                                    <option key={qty} value={qty}>
                                      {qty} (&nbsp;₹&nbsp;{(room.price3Nights * qty).toLocaleString()})
                                    </option>
                                  );
                                })}
                              </select>
                              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none stroke-[2.5]" />
                            </div>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </section>

            {/* Amenities Section */}
            <section id="amenities-section" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-[17px] font-black text-slate-900">Amenities</h2>
                <button className="text-xs font-extrabold text-[#0F766E] hover:underline cursor-pointer">
                  View All Amenities
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-2 text-[13.5px] text-slate-650 font-semibold">
                {[
                  { icon: <Wifi className="h-4.5 w-4.5 text-slate-450" />, text: 'Free Wi-Fi' },
                  { icon: <Waves className="h-4.5 w-4.5 text-slate-450" />, text: 'Pool' },
                  { icon: <Coffee className="h-4.5 w-4.5 text-slate-450" />, text: 'Breakfast' },
                  { icon: <Car className="h-4.5 w-4.5 text-slate-450" />, text: 'Parking' },
                  { icon: <Wind className="h-4.5 w-4.5 text-slate-450" />, text: 'Air Conditioning' },
                  { icon: <Utensils className="h-4.5 w-4.5 text-slate-450" />, text: 'Restaurant' },
                  { icon: <Clock className="h-4.5 w-4.5 text-slate-450" />, text: 'Room Service' },
                  { icon: <Waves className="h-4.5 w-4.5 text-slate-450" />, text: 'Power Backup' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="text-[12.5px] font-bold text-slate-400 mt-4.5">
                +12 more amenities
              </div>
            </section>

            {/* Reviews / What guests say */}
            <section id="reviews-section" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-[17px] font-black text-slate-900 mb-5">What guests say</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-slate-100">
                {/* Large Rating widget */}
                <div className="md:col-span-4 bg-slate-50 rounded-2xl p-5 border border-slate-200/30 flex flex-col items-center justify-center text-center">
                  <div className="text-3xl font-black text-slate-900">{stay.rating} <span className="text-lg font-semibold text-slate-450">/ 5</span></div>
                  <div className="text-emerald-700 font-extrabold text-[13px] mt-1.5">Excellent</div>
                  <div className="flex gap-0.5 text-amber-400 mt-1">
                    {[...Array(4)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current text-amber-400" strokeWidth={0} />)}
                    <StarHalf className="h-4 w-4 fill-current text-amber-400" />
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400 mt-2">Based on {stay.reviewsCount || 128} reviews</div>
                </div>

                {/* Rating progress bars */}
                <div className="md:col-span-8 space-y-2.5">
                  {[
                    { label: 'Cleanliness', score: stay.subRatings?.cleanliness || 4.7 },
                    { label: 'Location', score: stay.subRatings?.location || 4.6 },
                    { label: 'Service', score: stay.subRatings?.service || 4.6 },
                    { label: 'Value for Money', score: stay.subRatings?.value || 4.4 },
                    { label: 'Room Comfort', score: stay.subRatings?.comfort || 4.5 },
                    { label: 'Facilities', score: stay.subRatings?.facilities || 4.6 }
                  ].map((bar, index) => (
                    <div key={index} className="flex items-center gap-4 text-xs font-semibold text-slate-650">
                      <span className="w-28 text-left">{bar.label}</span>
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                        <div 
                          className="absolute left-0 top-0 h-full bg-[#0F766E] rounded-full"
                          style={{ width: `${(bar.score / 5) * 100}%` }}
                        />
                      </div>
                      <span className="w-6 text-right font-bold text-slate-800">{bar.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest reviews list */}
              <div className="mt-6 space-y-5">
                {(stay.reviews || []).map((review) => (
                  <div key={review.id} className="p-4 rounded-2xl bg-slate-50/40 border border-slate-150/70">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {/* Dummy Avatar */}
                        <div className="h-9 w-9 rounded-full bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] flex items-center justify-center font-bold text-xs uppercase">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="text-left">
                          <h5 className="text-[13px] font-bold text-slate-800 leading-tight">{review.name}</h5>
                          <span className="text-[10px] text-slate-450 font-semibold block mt-0.5">{review.date}</span>
                        </div>
                      </div>
                      <span className="bg-[#15803D] text-white text-[10px] font-black px-1.5 py-0.5 rounded">
                        {review.rating}/5
                      </span>
                    </div>
                    <p className="text-[13px] text-slate-600 font-medium mt-2.5 leading-normal">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Location details */}
            <section id="location-section" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-[17px] font-black text-slate-900 mb-2">Location</h2>
              <div className="flex items-center gap-1 text-[13px] text-slate-500 font-semibold mb-4">
                <MapPin className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                <span>Pondicherry Beach, Pondicherry, Tamil Nadu 605001 • 0.8 km from center • Near Rock Beach</span>
              </div>

              {/* Embed map preview */}
              <div className="w-full h-[280px] rounded-2xl bg-slate-100 overflow-hidden relative border border-slate-200 shadow-inner">
                <iframe
                  src="https://maps.google.com/maps?q=Pondicherry,India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  title="Pondicherry Map View"
                ></iframe>
                
                {/* Float View on Map Badge */}
                <a 
                  href="https://maps.google.com/maps?q=Pondicherry,India" 
                  target="_blank" 
                  rel="noreferrer"
                  className="absolute bottom-4 right-4 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 shadow-md flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <Map className="h-3.5 w-3.5 text-[#0F766E]" />
                  <span>View on Google Maps</span>
                </a>
              </div>
            </section>

            {/* Policies Section */}
            <section id="policies-section" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-[17px] font-black text-slate-900 mb-4">Policies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[13px] font-semibold">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150">
                  <h4 className="text-slate-800 font-bold mb-2">Check-in / Check-out</h4>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex justify-between"><span>Check-in:</span> <span className="font-bold text-slate-800">12:00 PM</span></li>
                    <li className="flex justify-between"><span>Check-out:</span> <span className="font-bold text-slate-800">11:00 AM</span></li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150">
                  <h4 className="text-slate-800 font-bold mb-2">House Rules</h4>
                  <ul className="space-y-1 text-slate-600 text-xs">
                    <li>• Pets are not allowed inside hotel rooms.</li>
                    <li>• Silent hours are observed from 10:00 PM to 7:00 AM.</li>
                    <li>• Government ID is required upon check-in.</li>
                  </ul>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column (Sticky Booking Card) */}
          <div className="md:col-span-3 space-y-6">
            
            {/* 1. Booking widget */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm sticky top-36 text-left">
              <h3 className="text-[15px] font-black text-slate-900 mb-4 pb-3 border-b border-slate-100">
                Your Selection
              </h3>

              {/* Dynamic Empty / Active States */}
              {!hasSelectedRooms ? (
                /* Empty state with suitcase SVG */
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center mb-4">
                  <svg className="w-20 h-20 text-slate-200/90 mb-4" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Palm trees */}
                    <path d="M70 45C68 35 55 35 55 45M55 45C55 55 60 58 60 68M60 68C60 70 58 72 58 72H72C72 72 70 70 70 68C70 58 75 55 75 45M75 45C75 35 88 35 88 45" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M65 68V80M80 68V80" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round"/>
                    {/* Suitcase */}
                    <rect x="25" y="45" width="34" height="28" rx="6" fill="#F8FAFC" stroke="#64748B" strokeWidth="2"/>
                    <path d="M34 45V38a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v7" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="32" y1="54" x2="52" y2="54" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="32" y1="60" x2="52" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <h4 className="text-[13.5px] font-black text-slate-800 leading-tight">No rooms selected yet</h4>
                  <p className="text-[11px] font-semibold text-slate-450 mt-1.5 leading-relaxed max-w-[180px] mx-auto">
                    Select your preferred rooms from the list.
                  </p>
                </div>
              ) : (
                /* Active state: List of selected rooms */
                <div className="space-y-3 mb-5 pb-4 border-b border-slate-100 max-h-[180px] overflow-y-auto pr-1">
                  {selectedRoomsList.map((selRoom, idx) => (
                    <div key={idx} className="flex justify-between items-start text-xs font-semibold text-slate-700 leading-tight">
                      <div className="flex-1 pr-3">
                        <span className="font-extrabold text-[#0F766E]">{selRoom.qty} x </span>
                        <span>{selRoom.name}</span>
                        {selRoom.hasBreakfastIncluded && (
                          <span className="block text-[10px] font-bold text-emerald-600 mt-0.5">Breakfast Included</span>
                        )}
                      </div>
                      <span className="font-extrabold text-slate-900 shrink-0">
                        ₹{(selRoom.price).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Details */}
              <div className="space-y-3 text-[13px] font-semibold text-slate-650">
                <div className="flex justify-between">
                  <span>Price ({hasSelectedRooms ? '3 nights' : '0 nights'})</span>
                  <span className="text-slate-850 font-bold">
                    ₹{hasSelectedRooms ? totalSelectedBase.toLocaleString() : '0'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    Taxes & Fees 
                    <Info className="h-3.5 w-3.5 text-slate-400 cursor-help" title="Government GST and local resort surcharges" />
                  </span>
                  <span className="text-slate-855 font-bold">
                    ₹{hasSelectedRooms ? totalSelectedTaxes.toLocaleString() : '0'}
                  </span>
                </div>
                
                <div className="border-t border-slate-100 my-2 pt-3 flex justify-between items-center text-slate-800">
                  <span className="font-extrabold">Total Amount</span>
                  <span className="text-[17px] font-black">
                    ₹{hasSelectedRooms ? totalSelectedGrand.toLocaleString() : '0'}
                  </span>
                </div>
                <span className="text-[10.5px] text-slate-455 font-semibold block -mt-1 leading-none text-right">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Actions CTAs */}
              <button 
                onClick={() => {
                  if (hasSelectedRooms) {
                    setShowBookingSuccess(true);
                  } else {
                    alert("Please select at least one room before checking out!");
                  }
                }}
                className={`w-full py-3.5 rounded-xl font-bold text-[13px] shadow-xs mt-5 cursor-pointer text-center block transition-all active:scale-97 ${
                  hasSelectedRooms 
                    ? 'bg-[#0F766E] hover:bg-[#0c625c] text-white font-extrabold' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed font-extrabold'
                }`}
              >
                Reserve Now
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500 mt-3.5">
                <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>You won't be charged yet</span>
              </div>

              {/* Informative Tip Badge */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-emerald-800 text-[11px] font-bold mt-4 leading-snug">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                <span>Great choice! This property is in high demand.</span>
              </div>

              {/* Chat Button inside Selection Sidebar */}
              <button 
                onClick={() => setShowChat(true)}
                className="w-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 py-2.5 rounded-xl font-bold text-[12px] shadow-xs active:scale-95 transition-all duration-150 mt-3.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4 w-4 text-slate-500" />
                <span>Chat with Property</span>
              </button>
            </div>

            {/* 2. Why book with TripVerse */}
           
          </div>

        </div>

      </div>
      )}

      {/* 6. Lightbox Full-screen Photo Gallery */}

      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 select-none">
          <div className="flex justify-between items-center text-white px-2 py-1">
            <span className="text-sm font-bold">{galleryIndex + 1} / {stay.images.length}</span>
            <button 
              onClick={() => setShowGallery(false)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white cursor-pointer transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-2 relative">
            <img 
              src={stay.images[galleryIndex]} 
              alt="Lightbox View" 
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          <div className="flex justify-center gap-3 p-4 overflow-x-auto no-scrollbar">
            {stay.images.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`Thumbnail ${idx}`}
                onClick={() => setGalleryIndex(idx)}
                className={`w-16 h-12 object-cover rounded-md cursor-pointer border-2 transition-all ${
                  galleryIndex === idx ? 'border-teal-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* 7. Booking Success Dialog */}
      {showBookingSuccess && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full border border-slate-100 shadow-2xl relative text-left">
            <div className="h-16 w-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-700 mx-auto mb-4">
              <Check className="h-8 w-8 stroke-[3.5]" />
            </div>
            <h3 className="text-xl font-black text-slate-900 text-center">Room Selected!</h3>
            <p className="text-slate-500 text-[11.5px] font-semibold mt-2 leading-relaxed text-center">
              You are reserving the following rooms at <strong>{stay.name}</strong>:
            </p>
            
            <div className="my-4 space-y-2 border-t border-b border-slate-100 py-3 text-xs font-semibold text-slate-700">
              {selectedRoomsList.map((selRoom, idx) => (
                <div key={idx} className="flex justify-between items-start">
                  <span className="pr-2">{selRoom.qty} x {selRoom.name}</span>
                  <span className="font-extrabold text-slate-900 shrink-0">₹{selRoom.price.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-slate-100 pt-2.5 font-bold text-slate-900 text-[13px]">
                <span>Grand Total</span>
                <span className="font-black text-[#0F766E]">₹{totalSelectedGrand.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={() => { setShowBookingSuccess(false); setShowReviewPage(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full bg-[#0F766E] text-white py-3 rounded-xl font-bold text-xs shadow-md hover:bg-[#0c625c] transition-all cursor-pointer text-center block"
            >
              Confirm & Proceed to Reserve
            </button>
            <button 
              onClick={() => setShowBookingSuccess(false)}
              className="w-full text-slate-450 hover:text-slate-700 font-bold text-xs mt-3 cursor-pointer text-center block"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* 8. Sliding Chat Drawer */}
      {showChat && (
        <div className="fixed bottom-6 right-6 z-55 w-[330px] h-[420px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-[#0F766E] text-white p-3.5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs uppercase">
                {stay.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-left">
                <h4 className="text-xs font-black leading-tight">{stay.name}</h4>
                <span className="text-[10px] text-teal-200 font-semibold block leading-none mt-0.5">Online</span>
              </div>
            </div>
            <button 
              onClick={() => setShowChat(false)}
              className="text-white hover:text-teal-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3.5 space-y-3 overflow-y-auto bg-slate-50 text-[12.5px] leading-normal">
            {chatMessages.map((msg, idx) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                    isUser 
                      ? 'bg-[#0F766E] text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}>
                    <p className="font-semibold">{msg.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-200 flex gap-2 items-center bg-white">
            <input 
              type="text" 
              placeholder="Ask a question..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#0F766E]"
            />
            <button 
              type="submit" 
              className="bg-[#0F766E] hover:bg-[#0c625c] text-white p-2 rounded-xl cursor-pointer transition-transform active:scale-90"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
