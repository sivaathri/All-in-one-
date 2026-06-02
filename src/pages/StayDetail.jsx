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
  const [showChat, setShowChat] = useState(false);
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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-8 space-y-8">
            
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

            {/* Rooms Section (Mock list for detailed view) */}
            <section id="rooms-section" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-[17px] font-black text-slate-900 mb-4">Available Rooms</h2>
              <div className="space-y-4">
                {[
                  {
                    name: "Deluxe Ocean View Room",
                    size: "350 sq ft",
                    bed: "1 King Bed",
                    guests: "Max 3 Adults",
                    price: stay.price,
                    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80"
                  },
                  {
                    name: "Executive Suite",
                    size: "520 sq ft",
                    bed: "1 King Bed & 1 Sofa Bed",
                    guests: "Max 4 Guests",
                    price: stay.price + 1500,
                    image: "https://images.unsplash.com/photo-1611891487122-2075b9627dde?auto=format&fit=crop&w=400&q=80"
                  }
                ].map((room, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 border border-slate-200/80 rounded-2xl bg-white hover:border-[#0F766E]/40 transition-colors">
                    <img 
                      src={room.image} 
                      alt={room.name} 
                      className="w-full sm:w-[150px] h-[100px] object-cover rounded-xl shrink-0" 
                    />
                    <div className="flex-1 flex flex-col justify-between text-left">
                      <div>
                        <h4 className="text-[14.5px] font-bold text-slate-800 leading-tight">{room.name}</h4>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-xs text-slate-500 font-semibold">
                          <span>{room.size}</span>
                          <span>•</span>
                          <span>{room.bed}</span>
                          <span>•</span>
                          <span>{room.guests}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[3]" />
                        <span className="text-xs text-emerald-700 font-bold">Free cancellation before 18 Jun 2025</span>
                      </div>
                    </div>
                    <div className="sm:border-l border-slate-100 sm:pl-4 flex sm:flex-col justify-between items-end shrink-0 gap-2">
                      <div className="text-right">
                        <span className="text-[18px] font-black text-slate-900">₹{room.price.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-450 block font-semibold uppercase">per night</span>
                      </div>
                      <button 
                        onClick={() => setShowBookingSuccess(true)}
                        className="bg-[#0F766E] hover:bg-[#0c625c] text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-all active:scale-95 shadow-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
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
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. Booking widget */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm sticky top-36">
              {/* Pricing */}
              <div className="flex items-baseline justify-between gap-1 flex-wrap mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-[24px] font-black text-slate-900">₹{price.toLocaleString()}</span>
                  <span className="text-[12.5px] text-slate-400 font-semibold">/ night</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs font-semibold line-through">₹{originalPrice.toLocaleString()}</span>
                  <span className="bg-[#EF4444] text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wide">
                    {stay.discount || "20% OFF"}
                  </span>
                </div>
              </div>

              {/* Informative Tip Badges */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-emerald-800 text-xs font-bold">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span>Great choice! This property is in high demand.</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-emerald-800 text-xs font-bold">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span>Free cancellation before 18 Jun 2025</span>
                </div>
              </div>

              {/* Checkin / Checkout date blocks */}
              <div className="grid grid-cols-2 gap-3 mb-3 text-left">
                <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50/20 relative">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Check-in</span>
                  <span className="text-[13px] font-extrabold text-slate-800 block mt-1">
                    {formatDateString(searchParams?.checkIn)}
                  </span>
                  <span className="text-[10.5px] font-semibold text-slate-450">
                    ({getDayOfWeek(searchParams?.checkIn)})
                  </span>
                </div>
                <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50/20 relative">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Check-out</span>
                  <span className="text-[13px] font-extrabold text-slate-800 block mt-1">
                    {formatDateString(searchParams?.checkOut)}
                  </span>
                  <span className="text-[10.5px] font-semibold text-slate-450">
                    ({getDayOfWeek(searchParams?.checkOut)})
                  </span>
                </div>
              </div>

              {/* Guests Count box */}
              <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50/20 flex justify-between items-center mb-5 text-left">
                <div>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Guests & Rooms</span>
                  <span className="text-[13px] font-extrabold text-slate-800 block mt-1">
                    {searchParams?.guests || "3 Adults, 1 Child"}
                  </span>
                </div>
                <button className="text-[12px] font-extrabold text-[#0F766E] hover:underline cursor-pointer">
                  Edit
                </button>
              </div>

              {/* Price Details */}
              <div className="space-y-3 pt-4 border-t border-slate-100 text-[13px] font-semibold text-slate-650">
                <h4 className="text-[13px] font-black text-slate-800">Price Details</h4>
                <div className="flex justify-between">
                  <span>₹{price.toLocaleString()} x {totalNights} nights</span>
                  <span className="text-slate-800 font-bold">₹{totalPriceCalculated.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    Taxes & Fees 
                    <Info className="h-3.5 w-3.5 text-slate-400 cursor-help" title="Government GST and local resort surcharges" />
                  </span>
                  <span className="text-slate-800 font-bold">₹{taxesCalculated.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-100 my-2 pt-3 flex justify-between items-center text-slate-800">
                  <span className="font-extrabold">Total Amount</span>
                  <span className="text-[17px] font-black">₹{finalAmount.toLocaleString()}</span>
                </div>
                <span className="text-[10.5px] text-slate-400 font-semibold block -mt-1 leading-none text-right">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Actions CTAs */}
              <button 
                onClick={() => setShowBookingSuccess(true)}
                className="w-full bg-[#0F766E] text-white py-3 rounded-xl font-bold text-[13.5px] shadow-sm hover:bg-[#0c625c] active:scale-95 transition-all duration-150 mt-5 cursor-pointer text-center block"
              >
                Select Room
              </button>

              <button 
                onClick={() => setShowChat(true)}
                className="w-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 py-3 rounded-xl font-bold text-[13.5px] shadow-xs active:scale-95 transition-all duration-150 mt-2.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4.5 w-4.5 text-slate-500" />
                <span>Chat with Property</span>
              </button>
            </div>

            {/* 2. Why book with TripVerse */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-3xl p-5 shadow-xs text-left">
              <h4 className="text-[14px] font-black text-slate-800 mb-4">Why book with TripVerse?</h4>
              
              <div className="space-y-4">
                {[
                  { 
                    icon: <Check className="h-4 w-4 text-[#15803D] stroke-[3]" />, 
                    title: 'Best Price Guarantee', 
                    desc: 'Get the best price, always' 
                  },
                  { 
                    icon: <Check className="h-4 w-4 text-[#15803D] stroke-[3]" />, 
                    title: 'Secure Payments', 
                    desc: '100% safe and secure transactions' 
                  },
                  { 
                    icon: <Check className="h-4 w-4 text-[#15803D] stroke-[3]" />, 
                    title: 'Free Cancellation', 
                    desc: 'Cancel for free before 18 Jun 2025' 
                  },
                  { 
                    icon: <Headphones className="h-4.5 w-4.5 text-slate-500 stroke-[2.2]" />, 
                    title: '24/7 Customer Support', 
                    desc: "We're here to help you anytime" 
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="h-6 w-6 rounded-full bg-slate-100/80 flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="text-[13px] font-bold text-slate-850 leading-tight">{item.title}</h5>
                      <p className="text-[11.5px] font-semibold text-slate-450 mt-0.5 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

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
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center border border-slate-100 shadow-2xl relative">
            <div className="h-16 w-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-700 mx-auto mb-4">
              <Check className="h-8 w-8 stroke-[3.5]" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Room Selected!</h3>
            <p className="text-slate-500 text-xs font-bold mt-2 leading-relaxed">
              You have successfully selected the rooms at <strong>{stay.name}</strong>. We've locked this rate for the next 15 minutes.
            </p>
            <button 
              onClick={() => setShowBookingSuccess(false)}
              className="w-full bg-[#0F766E] text-white py-3 rounded-xl font-bold text-xs shadow-md hover:bg-[#0c625c] transition-all mt-6 cursor-pointer"
            >
              Proceed to Payment
            </button>
            <button 
              onClick={() => setShowBookingSuccess(false)}
              className="w-full text-slate-450 hover:text-slate-700 font-bold text-xs mt-3 cursor-pointer"
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
