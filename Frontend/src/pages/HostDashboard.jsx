import React, { useState, useEffect } from 'react';
import {
  Home,
  Plus,
  Calendar,
  MessageSquare,
  CreditCard,
  Settings,
  HelpCircle,
  Eye,
  EyeOff,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  Wifi,
  Car,
  Lock,
  X,
  ArrowLeft,
  Building2,
  Users,
  BedDouble,
  Image as ImageIcon,
  Check,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import stayPropertyImg from '../assets/step2.png';

export default function HostDashboard({ onAddNewProperty, onBackToHome }) {
  const [activeTab, setActiveTab] = useState('My Properties');
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPropertyDetails, setSelectedPropertyDetails] = useState(null);

  // Fetch host's properties from backend
  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('tripverse_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5001/api/properties/my-listings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data?.properties)) {
        setProperties(data.data.properties);
      }
    } catch (err) {
      console.warn('Could not fetch host listings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Status counters
  const totalCount = properties.length;
  const pendingCount = properties.filter(p => p.status === 'waiting_for_approval').length;
  const approvedCount = properties.filter(p => p.status === 'approved').length;
  const rejectedCount = properties.filter(p => p.status === 'rejected').length;
  const blockedCount = 0;

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return '15 Oct 2026, 10:30 AM';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }) + ', ' + d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
      className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-16"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Top Back / Breadcrumb Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#007F55] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to TripVerse Home</span>
          </button>
        </div>

        {/* Main Grid: Left Sidebar + Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── Left Sidebar (Host Dashboard Navigation) ── */}
          <aside className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-xs text-left">
              <h2 className="text-xl font-extrabold text-slate-900 px-3 py-2 mb-2 tracking-tight">
                Host Dashboard
              </h2>

              <nav className="space-y-1.5">
                {/* 1. My Properties */}
                <button
                  type="button"
                  onClick={() => setActiveTab('My Properties')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-[14px] font-bold transition-all cursor-pointer ${
                    activeTab === 'My Properties'
                      ? 'bg-[#E6F4EA] text-[#007F55] shadow-xs'
                      : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 stroke-[2.2]" />
                    <span>My Properties</span>
                  </div>
                </button>

                {/* 2. Add New Property */}
                <button
                  type="button"
                  onClick={onAddNewProperty}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-[14px] font-bold text-slate-650 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border-2 border-current flex items-center justify-center">
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>Add New Property</span>
                  </div>
                </button>

                {/* 3. Bookings */}
                <button
                  type="button"
                  onClick={() => setActiveTab('Bookings')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-[14px] font-bold transition-all cursor-pointer ${
                    activeTab === 'Bookings'
                      ? 'bg-[#E6F4EA] text-[#007F55]'
                      : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 stroke-[2.2]" />
                    <span>Bookings</span>
                  </div>
                </button>

                {/* 4. Messages */}
                <button
                  type="button"
                  onClick={() => setActiveTab('Messages')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-[14px] font-bold transition-all cursor-pointer ${
                    activeTab === 'Messages'
                      ? 'bg-[#E6F4EA] text-[#007F55]'
                      : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 stroke-[2.2]" />
                    <span>Messages</span>
                  </div>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-[11px] font-black">
                    3
                  </span>
                </button>

                {/* 5. Payouts */}
                <button
                  type="button"
                  onClick={() => setActiveTab('Payouts')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-[14px] font-bold transition-all cursor-pointer ${
                    activeTab === 'Payouts'
                      ? 'bg-[#E6F4EA] text-[#007F55]'
                      : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 stroke-[2.2]" />
                    <span>Payouts</span>
                  </div>
                </button>

                {/* 6. Profile & Settings */}
                <button
                  type="button"
                  onClick={() => setActiveTab('Settings')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-[14px] font-bold transition-all cursor-pointer ${
                    activeTab === 'Settings'
                      ? 'bg-[#E6F4EA] text-[#007F55]'
                      : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 stroke-[2.2]" />
                    <span>Profile & Settings</span>
                  </div>
                </button>

                {/* 7. Help & Support */}
                <button
                  type="button"
                  onClick={() => setActiveTab('Support')}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-[14px] font-bold transition-all cursor-pointer ${
                    activeTab === 'Support'
                      ? 'bg-[#E6F4EA] text-[#007F55]'
                      : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 stroke-[2.2]" />
                    <span>Help & Support</span>
                  </div>
                </button>
              </nav>
            </div>

            {/* List more properties promo card */}
            <div className="bg-[#F4FAF6] rounded-3xl border border-emerald-100/90 p-5 text-center flex flex-col items-center gap-3 shadow-xs">
              <div className="w-24 h-20 flex items-center justify-center">
                <img
                  src={stayPropertyImg}
                  alt="List properties illustration"
                  className="w-full h-full object-contain mix-blend-multiply select-none pointer-events-none"
                />
              </div>
              <div className="flex flex-col text-center">
                <h4 className="text-[15px] font-extrabold text-slate-900">List more properties</h4>
                <p className="text-[11.5px] font-medium text-slate-500 mt-1 leading-snug">
                  Reach thousands of travelers and grow your business.
                </p>
              </div>
              <button
                type="button"
                onClick={onAddNewProperty}
                className="w-full rounded-xl bg-[#007F55] hover:bg-[#006644] text-white py-2.5 text-[13px] font-extrabold shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                Add New Property
              </button>
            </div>
          </aside>

          {/* ── Right Content Area ── */}
          <main className="lg:col-span-9 flex flex-col gap-6 text-left">
            
            {/* Header: Title + Subtitle + Add Property button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  My Properties
                </h1>
                <p className="text-[13.5px] font-medium text-slate-500 mt-1">
                  View and manage all your listed properties
                </p>
              </div>

              <button
                type="button"
                onClick={onAddNewProperty}
                className="flex items-center gap-2 rounded-xl bg-[#007F55] hover:bg-[#006644] text-white px-5 py-2.5 text-[14px] font-bold shadow-md active:scale-95 transition-all cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Property</span>
              </button>
            </div>

            {/* ── 5 Stat Metric Cards Row ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              
              {/* 1. Total Properties */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Home className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-slate-900 leading-tight">
                    {totalCount > 0 ? totalCount : 1}
                  </span>
                  <span className="text-[11.5px] font-bold text-slate-500 mt-0.5">
                    Total Properties
                  </span>
                </div>
              </div>

              {/* 2. Pending Approval */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                  <Clock className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-slate-900 leading-tight">
                    {totalCount > 0 ? pendingCount : 1}
                  </span>
                  <span className="text-[11.5px] font-bold text-slate-500 mt-0.5">
                    Pending Approval
                  </span>
                </div>
              </div>

              {/* 3. Approved */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#007F55]">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-slate-900 leading-tight">
                    {approvedCount}
                  </span>
                  <span className="text-[11.5px] font-bold text-slate-500 mt-0.5">
                    Approved
                  </span>
                </div>
              </div>

              {/* 4. Rejected */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <XCircle className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-slate-900 leading-tight">
                    {rejectedCount}
                  </span>
                  <span className="text-[11.5px] font-bold text-slate-500 mt-0.5">
                    Rejected
                  </span>
                </div>
              </div>

              {/* 5. Blocked / Unlisted */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs flex items-center gap-3.5 col-span-2 sm:col-span-1">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <EyeOff className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-slate-900 leading-tight">
                    {blockedCount}
                  </span>
                  <span className="text-[11.5px] font-bold text-slate-500 mt-0.5">
                    Blocked / Unlisted
                  </span>
                </div>
              </div>
            </div>

            {/* ── Properties List Section ── */}
            <div className="space-y-6">
              
              {/* Real DB Properties or Demo Representation */}
              {(properties.length > 0 ? properties : [
                {
                  property_id: 101,
                  property_name: 'Auro Moon Residency',
                  property_type: 'Homestay',
                  city: 'Puducherry',
                  address_line_1: 'Auroville',
                  about_property_text: 'A peaceful homestay near Auroville with modern amenities, spacious rooms and a relaxing environment surrounded by nature.',
                  total_rooms: 4,
                  status: 'waiting_for_approval',
                  cover_photo: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
                  photos: [
                    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80'
                  ],
                  created_at: new Date().toISOString()
                }
              ]).map((prop) => {
                const isPending = prop.status === 'waiting_for_approval';
                const isApproved = prop.status === 'approved';
                const isRejected = prop.status === 'rejected';

                const photoCount = Array.isArray(prop.photos) ? prop.photos.length : 8;
                const coverImg = prop.cover_photo || (Array.isArray(prop.photos) && prop.photos[0]) || 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80';

                return (
                  <div
                    key={prop.property_id}
                    className="bg-white rounded-3xl border border-slate-150 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-6"
                  >
                    {/* Top Row: Thumbnail + Info + Status Card */}
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                      
                      {/* Left Image Thumbnail */}
                      <div className="relative w-full lg:w-[280px] h-[190px] rounded-2xl overflow-hidden shrink-0 group">
                        <img
                          src={coverImg}
                          alt={prop.property_name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Photos count badge */}
                        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-xs">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>{photoCount} photos</span>
                        </div>
                      </div>

                      {/* Middle Property Details */}
                      <div className="flex-1 flex flex-col gap-2.5 text-left">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {prop.property_name}
                        </h3>

                        {/* Pills */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 text-[11.5px] font-extrabold px-3 py-1 rounded-full border border-sky-100">
                            <Home className="w-3.5 h-3.5" />
                            <span>{prop.property_type || 'Homestay'}</span>
                          </span>

                          <span className="inline-flex items-center gap-1.5 text-slate-500 text-[12px] font-semibold">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{prop.address_line_1 ? `${prop.address_line_1}, ` : ''}{prop.city || 'Pondicherry'}</span>
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-[13px] text-slate-600 font-medium leading-relaxed line-clamp-2">
                          {prop.about_property_text || 'A peaceful stay with modern amenities, spacious rooms and a relaxing environment surrounded by nature.'}
                        </p>

                        {/* Amenities / Specs badges */}
                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 mt-2">
                          <div className="flex items-center gap-1.5">
                            <BedDouble className="w-4 h-4 text-slate-400" />
                            <span>{prop.total_rooms || 4} Rooms</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-slate-400" />
                            <span>Up to 12 Guests</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Wifi className="w-4 h-4 text-slate-400" />
                            <span>Free Wi-Fi</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Car className="w-4 h-4 text-slate-400" />
                            <span>Parking</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Status Card */}
                      <div className="w-full lg:w-[280px] shrink-0">
                        {isPending && (
                          <div className="bg-[#FEF9EE] border border-[#FDE68A]/70 rounded-2xl p-4.5 text-left flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-2 text-amber-700">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100">
                                  <Clock className="w-4 h-4 stroke-[2.5]" />
                                </div>
                                <span className="text-[14.5px] font-extrabold tracking-tight">
                                  Pending Approval
                                </span>
                              </div>
                              <p className="text-[11.5px] text-amber-900/80 font-medium leading-relaxed mt-2.5">
                                Your property listing is under review by our team. We will notify you once it is approved.
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>Submitted on {formatDate(prop.created_at)}</span>
                            </div>
                          </div>
                        )}

                        {isApproved && (
                          <div className="bg-[#F4FAF6] border border-emerald-200 rounded-2xl p-4.5 text-left flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-2 text-[#007F55]">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-[#007F55]">
                                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                                </div>
                                <span className="text-[14.5px] font-extrabold tracking-tight">
                                  Approved & Live
                                </span>
                              </div>
                              <p className="text-[11.5px] text-emerald-900/80 font-medium leading-relaxed mt-2.5">
                                Congratulations! Your property is live on TripVerse and visible to travelers in search results.
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                              <Check className="w-3.5 h-3.5" />
                              <span>Live on TripVerse Stays</span>
                            </div>
                          </div>
                        )}

                        {isRejected && (
                          <div className="bg-red-50 border border-red-200 rounded-2xl p-4.5 text-left flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-2 text-red-600">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-600">
                                  <XCircle className="w-4 h-4 stroke-[2.5]" />
                                </div>
                                <span className="text-[14.5px] font-extrabold tracking-tight">
                                  Action Required
                                </span>
                              </div>
                              <p className="text-[11.5px] text-red-800 font-medium leading-relaxed mt-2.5">
                                {prop.rejection_reason || 'Listing was not approved. Please review your details and resubmit.'}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Row: Stepper Progress + Action Buttons */}
                    <div className="pt-5 border-t border-slate-100 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                      
                      {/* Stepper with 6 steps and connecting lines */}
                      <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-1">
                        
                        {/* Step 1: Basic Information */}
                        <div className="flex flex-col items-center text-center shrink-0">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#15803D] text-white shadow-xs">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                          <span className="text-[11px] font-bold text-slate-800 mt-1">Basic Information</span>
                          <span className="text-[10px] font-extrabold text-[#15803D]">Completed</span>
                        </div>
                        <div className="h-0.5 w-6 sm:w-10 bg-[#15803D] shrink-0 mb-4" />

                        {/* Step 2: Location Details */}
                        <div className="flex flex-col items-center text-center shrink-0">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#15803D] text-white shadow-xs">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                          <span className="text-[11px] font-bold text-slate-800 mt-1">Location Details</span>
                          <span className="text-[10px] font-extrabold text-[#15803D]">Completed</span>
                        </div>
                        <div className="h-0.5 w-6 sm:w-10 bg-[#15803D] shrink-0 mb-4" />

                        {/* Step 3: Room Setup */}
                        <div className="flex flex-col items-center text-center shrink-0">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#15803D] text-white shadow-xs">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                          <span className="text-[11px] font-bold text-slate-800 mt-1">Room Setup</span>
                          <span className="text-[10px] font-extrabold text-[#15803D]">Completed</span>
                        </div>
                        <div className={`h-0.5 w-6 sm:w-10 ${isApproved ? 'bg-[#15803D]' : 'bg-amber-400'} shrink-0 mb-4`} />

                        {/* Step 4: Amenities & Policies */}
                        <div className="flex flex-col items-center text-center shrink-0">
                          {isApproved ? (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#15803D] text-white shadow-xs">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F59E0B] text-white shadow-xs font-black text-xs">
                              4
                            </div>
                          )}
                          <span className="text-[11px] font-bold text-slate-800 mt-1">Amenities & Policies</span>
                          <span className={`text-[10px] font-extrabold ${isApproved ? 'text-[#15803D]' : 'text-amber-600'}`}>
                            {isApproved ? 'Completed' : 'In Review'}
                          </span>
                        </div>
                        <div className={`h-0.5 w-6 sm:w-10 ${isApproved ? 'bg-[#15803D]' : 'bg-slate-200'} shrink-0 mb-4`} />

                        {/* Step 5: Legal Documents */}
                        <div className="flex flex-col items-center text-center shrink-0">
                          {isApproved ? (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#15803D] text-white shadow-xs">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-slate-500 font-black text-xs">
                              5
                            </div>
                          )}
                          <span className="text-[11px] font-bold text-slate-800 mt-1">Legal Documents</span>
                          <span className={`text-[10px] font-extrabold ${isApproved ? 'text-[#15803D]' : 'text-slate-400'}`}>
                            {isApproved ? 'Completed' : 'Pending'}
                          </span>
                        </div>
                        <div className={`h-0.5 w-6 sm:w-10 ${isApproved ? 'bg-[#15803D]' : 'bg-slate-200'} shrink-0 mb-4`} />

                        {/* Step 6: Final Approval */}
                        <div className="flex flex-col items-center text-center shrink-0">
                          {isApproved ? (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#15803D] text-white shadow-xs">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-slate-500 font-black text-xs">
                              6
                            </div>
                          )}
                          <span className="text-[11px] font-bold text-slate-800 mt-1">Final Approval</span>
                          <span className={`text-[10px] font-extrabold ${isApproved ? 'text-[#15803D]' : 'text-slate-400'}`}>
                            {isApproved ? 'Live' : 'Pending'}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons: View Details & Edit (Locked) */}
                      <div className="flex items-center gap-3 shrink-0 self-end xl:self-auto">
                        <button
                          type="button"
                          onClick={() => setSelectedPropertyDetails(prop)}
                          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs active:scale-95 transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>

                        <button
                          type="button"
                          disabled
                          title="Listing details are locked while under Super Admin review"
                          className="flex items-center gap-1.5 rounded-xl bg-[#B7E4C7]/60 text-[#2D6A4F] px-4 py-2.5 text-xs font-extrabold cursor-not-allowed select-none"
                        >
                          <span>Edit (Locked)</span>
                          <Lock className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}

              {/* ── "List another property" Dotted Card ── */}
              <div className="rounded-3xl border-2 border-dashed border-slate-200/90 bg-white p-8 flex flex-col items-center justify-center text-center gap-3 shadow-2xs">
                <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Building2 className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-extrabold text-slate-800">
                    List another property
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add more properties to reach more travelers and increase your bookings.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onAddNewProperty}
                  className="mt-1 flex items-center gap-2 rounded-xl bg-[#007F55] hover:bg-[#006644] text-white px-5 py-2.5 text-xs font-extrabold shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add New Property</span>
                </button>
              </div>

            </div>

          </main>
        </div>
      </div>

      {/* ── View Details Modal ── */}
      {selectedPropertyDetails && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-step">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 text-left shadow-2xl relative">
            <button
              onClick={() => setSelectedPropertyDetails(null)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                selectedPropertyDetails.status === 'approved'
                  ? 'bg-emerald-100 text-[#007F55]'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {selectedPropertyDetails.status === 'approved' ? 'Approved & Live' : 'Waiting for Approval'}
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">
                #TVP-{selectedPropertyDetails.property_id}
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-2">
              {selectedPropertyDetails.property_name}
            </h3>
            <p className="text-xs font-medium text-slate-500 mb-6 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedPropertyDetails.address_line_1}, {selectedPropertyDetails.city}, {selectedPropertyDetails.state}</span>
            </p>

            <div className="space-y-4 text-xs font-medium text-slate-700">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-900 block mb-1">About Property:</span>
                <p className="leading-relaxed text-slate-600">{selectedPropertyDetails.about_property_text || 'No description provided.'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-0.5">Property Type:</span>
                  <span>{selectedPropertyDetails.property_type || 'Homestay'}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-0.5">Total Rooms:</span>
                  <span>{selectedPropertyDetails.total_rooms || 1} Rooms</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200/70 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-[12px] font-medium text-amber-900 leading-snug">
                  <strong>Verification Note:</strong> Your property was registered and is currently in the moderation queue. Our Super Admin team verifies license details, fire safety certifications, and photo clarity before approving.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedPropertyDetails(null)}
              className="mt-6 w-full py-3 bg-[#007F55] hover:bg-[#006644] text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
