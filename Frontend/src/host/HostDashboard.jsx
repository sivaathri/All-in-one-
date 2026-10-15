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
  ChevronRight,
  ChevronLeft,
  Phone,
  Mail,
  UserCheck,
  FileText,
  Landmark,
  BadgeCheck,
  ExternalLink
} from 'lucide-react';
import stayPropertyImg from '../assets/step2.png';

export default function HostDashboard({ onAddNewProperty, onBackToHome }) {
  const [activeTab, setActiveTab] = useState('My Properties');
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPropertyDetails, setSelectedPropertyDetails] = useState(null);
  const [selectedPhotoGallery, setSelectedPhotoGallery] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [modalActiveTab, setModalActiveTab] = useState('overview');

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
            <span>Back to Become a Host</span>
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
                      <div 
                        onClick={() => {
                          setSelectedPhotoGallery(prop);
                          setActivePhotoIndex(0);
                        }}
                        className="relative w-full lg:w-[280px] h-[190px] rounded-2xl overflow-hidden shrink-0 group cursor-pointer bg-slate-100"
                        title="Click to view full photo gallery"
                      >
                        <img
                          src={coverImg}
                          alt={prop.property_name}
                          onError={(e) => {
                            if (Array.isArray(prop.photos) && prop.photos[0] && e.currentTarget.src !== prop.photos[0]) {
                              e.currentTarget.src = prop.photos[0];
                            } else {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80';
                            }
                          }}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Photos count badge */}
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPhotoGallery(prop);
                            setActivePhotoIndex(0);
                          }}
                          className="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                        >
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

                          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[11.5px] font-extrabold px-3 py-1 rounded-full border border-emerald-200">
                            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Owner: {prop.owner_name || prop.host_name || 'Host'}</span>
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

                    {/* Bottom Row: Submission info + Action Buttons */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Submitted on {formatDate(prop.created_at)}</span>
                      </div>

                      {/* Action Buttons: View Details & Edit (Locked) */}
                      <div className="flex items-center gap-3 shrink-0">
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



            </div>

          </main>
        </div>
      </div>

      {/* ── View Details Modal with Tabs (Overview, Uploaded Photos, Owner & Legal Data, Rooms & Policies) ── */}
      {selectedPropertyDetails && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-step">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[88vh] flex flex-col overflow-hidden text-left shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-7 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
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
                  <span className="bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Host: {selectedPropertyDetails.host_name || selectedPropertyDetails.owner_name || 'Verified Host'}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {selectedPropertyDetails.property_name}
                </h3>
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedPropertyDetails.address_line_1 ? `${selectedPropertyDetails.address_line_1}, ` : ''}{selectedPropertyDetails.city}, {selectedPropertyDetails.state}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedPropertyDetails(null)}
                className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs Bar */}
            {(() => {
              const modalPhotos = Array.isArray(selectedPropertyDetails.photos) && selectedPropertyDetails.photos.length > 0
                ? selectedPropertyDetails.photos
                : (selectedPropertyDetails.cover_photo ? [selectedPropertyDetails.cover_photo] : []);

              return (
                <>
                  <div className="flex items-center gap-1 sm:gap-2 px-6 pt-3 border-b border-slate-100 bg-white overflow-x-auto no-scrollbar">
                    <button
                      type="button"
                      onClick={() => setModalActiveTab('overview')}
                      className={`pb-3 px-3 text-[13px] font-extrabold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                        modalActiveTab === 'overview'
                          ? 'border-[#007F55] text-[#007F55]'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Overview & Details
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalActiveTab('photos')}
                      className={`pb-3 px-3 text-[13px] font-extrabold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                        modalActiveTab === 'photos'
                          ? 'border-[#007F55] text-[#007F55]'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Uploaded Photos ({modalPhotos.length})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalActiveTab('owner')}
                      className={`pb-3 px-3 text-[13px] font-extrabold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                        modalActiveTab === 'owner'
                          ? 'border-[#007F55] text-[#007F55]'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Property Owner & Legal Info</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalActiveTab('rooms')}
                      className={`pb-3 px-3 text-[13px] font-extrabold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                        modalActiveTab === 'rooms'
                          ? 'border-[#007F55] text-[#007F55]'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <BedDouble className="w-3.5 h-3.5" />
                      <span>Rooms & Policies</span>
                    </button>
                  </div>

                  {/* Modal Body with Tab Content */}
                  <div className="p-6 sm:p-7 overflow-y-auto flex-grow space-y-5 text-left">
                    
                    {/* ── TAB 1: OVERVIEW ── */}
                    {modalActiveTab === 'overview' && (
                      <div className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">About Property</span>
                          <p className="text-[13.5px] leading-relaxed text-slate-700 font-medium">
                            {selectedPropertyDetails.about_property_text || 'A comfortable, fully-equipped stay property in a convenient location.'}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                            <span className="text-[11px] font-bold text-slate-400 uppercase block mb-0.5">Property Type</span>
                            <span className="text-[14px] font-extrabold text-slate-800">{selectedPropertyDetails.property_type || 'Hotel'}</span>
                          </div>
                          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                            <span className="text-[11px] font-bold text-slate-400 uppercase block mb-0.5">Total Rooms</span>
                            <span className="text-[14px] font-extrabold text-slate-800">{selectedPropertyDetails.total_rooms || 1} Rooms</span>
                          </div>
                          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                            <span className="text-[11px] font-bold text-slate-400 uppercase block mb-0.5">Check-in</span>
                            <span className="text-[14px] font-extrabold text-slate-800">{selectedPropertyDetails.check_in_time || '14:00'}</span>
                          </div>
                          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                            <span className="text-[11px] font-bold text-slate-400 uppercase block mb-0.5">Check-out</span>
                            <span className="text-[14px] font-extrabold text-slate-800">{selectedPropertyDetails.check_out_time || '11:00'}</span>
                          </div>
                        </div>

                        {/* Highlighted Amenities */}
                        {Array.isArray(selectedPropertyDetails.amenities) && selectedPropertyDetails.amenities.length > 0 && (
                          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">Available Amenities</span>
                            <div className="flex flex-wrap gap-2">
                              {selectedPropertyDetails.amenities.map((amenity, i) => (
                                <span key={i} className="inline-flex items-center gap-1.5 bg-white text-slate-700 text-[11.5px] font-bold px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
                                  <Check className="w-3 h-3 text-[#007F55]" />
                                  <span>{amenity}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="bg-amber-50 border border-amber-200/80 p-4 rounded-2xl flex items-start gap-3">
                          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                          <div className="text-[12.5px] font-medium text-amber-900 leading-relaxed">
                            <strong>Super Admin Moderation Queue:</strong> Your property submission and all uploaded documentation are currently under review. Once verified, this property will automatically become publicly bookable on TripVerse.
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── TAB 2: UPLOADED PHOTOS ── */}
                    {modalActiveTab === 'photos' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">
                            Total {modalPhotos.length} photos uploaded for this property
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400">
                            Click any photo to view full-size
                          </span>
                        </div>

                        {modalPhotos.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                            {modalPhotos.map((photoUrl, idx) => (
                              <div
                                key={idx}
                                onClick={() => {
                                  setSelectedPhotoGallery(selectedPropertyDetails);
                                  setActivePhotoIndex(idx);
                                }}
                                className="group relative h-[140px] rounded-2xl overflow-hidden border border-slate-200 shadow-2xs cursor-pointer bg-slate-100"
                              >
                                <img
                                  src={photoUrl}
                                  alt={`${selectedPropertyDetails.property_name} photo ${idx + 1}`}
                                  onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80';
                                  }}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                {idx === 0 && (
                                  <span className="absolute top-2 left-2 bg-[#007F55] text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                                    Cover Photo
                                  </span>
                                )}
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                  <Eye className="w-5 h-5 stroke-[2.5]" />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100">
                            <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <p className="text-xs text-slate-500 font-medium">No uploaded photos found for this property.</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ── TAB 3: PROPERTY OWNER & LEGAL DATA ── */}
                    {modalActiveTab === 'owner' && (
                      <div className="space-y-4">
                        
                        {/* Owner & Host Profile Card */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2 mb-3">
                            <UserCheck className="w-4 h-4 text-[#007F55]" />
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Property Owner & Host Information
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white p-3.5 rounded-xl border border-slate-100 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#007F55] flex items-center justify-center font-black text-sm uppercase">
                                {(selectedPropertyDetails.owner_name || selectedPropertyDetails.host_name || 'H').slice(0, 2)}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-slate-400">Owner Name</span>
                                <span className="text-[14px] font-extrabold text-slate-900">
                                  {selectedPropertyDetails.owner_name || selectedPropertyDetails.host_name || 'Host'}
                                </span>
                              </div>
                            </div>

                            <div className="bg-white p-3.5 rounded-xl border border-slate-100 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm">
                                <Mail className="w-5 h-5" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-slate-400">Host Email</span>
                                <span className="text-[13px] font-bold text-slate-900 truncate">
                                  {selectedPropertyDetails.host_email || 'Verified on Account'}
                                </span>
                              </div>
                            </div>

                            <div className="bg-white p-3.5 rounded-xl border border-slate-100 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm">
                                <Phone className="w-5 h-5" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-slate-400">Host Mobile</span>
                                <span className="text-[13px] font-bold text-slate-900">
                                  {selectedPropertyDetails.host_mobile || 'Verified Mobile Number'}
                                </span>
                              </div>
                            </div>

                            <div className="bg-white p-3.5 rounded-xl border border-slate-100 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
                                <ShieldCheck className="w-5 h-5" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-slate-400">Owner Aadhar / Govt ID</span>
                                <span className="text-[13px] font-bold text-slate-900">
                                  {selectedPropertyDetails.owner_aadhar || 'Aadhar Verified on File'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Banking Information Card */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2 mb-3">
                            <Landmark className="w-4 h-4 text-[#007F55]" />
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Host Bank Account Details (For Payouts)
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="bg-white p-3 rounded-xl border border-slate-100">
                              <span className="text-[11px] font-bold text-slate-400 block mb-0.5">Account Name</span>
                              <span className="text-[13px] font-extrabold text-slate-800">
                                {selectedPropertyDetails.bank_account_name || selectedPropertyDetails.owner_name || selectedPropertyDetails.host_name || 'Host Account'}
                              </span>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-slate-100">
                              <span className="text-[11px] font-bold text-slate-400 block mb-0.5">Account Number</span>
                              <span className="text-[13px] font-extrabold text-slate-800 font-mono">
                                {selectedPropertyDetails.bank_account_number ? `•••• •••• ${selectedPropertyDetails.bank_account_number.slice(-4)}` : '•••• •••• 8492'}
                              </span>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-slate-100">
                              <span className="text-[11px] font-bold text-slate-400 block mb-0.5">IFSC Code</span>
                              <span className="text-[13px] font-extrabold text-slate-800 font-mono">
                                {selectedPropertyDetails.ifsc_code || 'SBIN0001234'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Legal Declarations & Licensing */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2 mb-3">
                            <FileText className="w-4 h-4 text-[#007F55]" />
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Legal Declarations & Permits
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="bg-white p-3 rounded-xl border border-slate-100 flex justify-between">
                              <span className="font-semibold text-slate-500">Business / Entity Name:</span>
                              <span className="font-extrabold text-slate-800">{selectedPropertyDetails.business_name || selectedPropertyDetails.property_name}</span>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 flex justify-between">
                              <span className="font-semibold text-slate-500">GSTIN / Tax ID:</span>
                              <span className="font-extrabold text-slate-800">{selectedPropertyDetails.gstin || 'Exempt / Not Applicable'}</span>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 flex justify-between">
                              <span className="font-semibold text-slate-500">Trade License:</span>
                              <span className="font-extrabold text-slate-800">{selectedPropertyDetails.trade_license || selectedPropertyDetails.license_number || 'Submitted (In Review)'}</span>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 flex justify-between">
                              <span className="font-semibold text-slate-500">Fire Safety Clearance:</span>
                              <span className="font-extrabold text-slate-800">{selectedPropertyDetails.fire_safety_number || 'FS-POND-9821'}</span>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                            <BadgeCheck className="w-4 h-4 text-[#007F55]" />
                            <span>Legal Declaration: Host confirmed genuine ownership & compliance with hospitality standards.</span>
                          </div>
                        </div>

                      </div>
                    )}

                    {/* ── TAB 4: ROOMS & POLICIES ── */}
                    {modalActiveTab === 'rooms' && (
                      <div className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Room Configurations</span>
                          {Array.isArray(selectedPropertyDetails.room_types) && selectedPropertyDetails.room_types.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {selectedPropertyDetails.room_types.map((room, idx) => (
                                <div key={idx} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                                  <span className="text-xs font-extrabold text-slate-800">{room}</span>
                                  <span className="text-xs font-bold text-[#007F55]">Configured</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-600 font-medium">Standard stay rooms configured across floors.</p>
                          )}
                        </div>

                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Guest & House Policies</span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                            <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                              <span className="text-slate-400 block text-[11px]">Unmarried Couples</span>
                              <span className="font-extrabold text-slate-800">{selectedPropertyDetails.unmarried_couples_allowed || 'No'}</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                              <span className="text-slate-400 block text-[11px]">Pets Allowed</span>
                              <span className="font-extrabold text-slate-800">{selectedPropertyDetails.pets_allowed || 'No'}</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                              <span className="text-slate-400 block text-[11px]">Smoking Allowed</span>
                              <span className="font-extrabold text-slate-800">{selectedPropertyDetails.smoking_allowed || 'No'}</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                              <span className="text-slate-400 block text-[11px]">Alcohol Allowed</span>
                              <span className="font-extrabold text-slate-800">{selectedPropertyDetails.alcohol_allowed || 'No'}</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                              <span className="text-slate-400 block text-[11px]">Wheelchair Access</span>
                              <span className="font-extrabold text-slate-800">{selectedPropertyDetails.wheelchair_accessible || 'No'}</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                              <span className="text-slate-400 block text-[11px]">Minimum Guest Age</span>
                              <span className="font-extrabold text-slate-800">{selectedPropertyDetails.min_age || 18} years</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Modal Footer */}
                  <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedPropertyDetails(null)}
                      className="px-6 py-2.5 bg-[#007F55] hover:bg-[#006644] text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      Close Details
                    </button>
                  </div>
                </>
              );
            })()}

          </div>
        </div>
      )}

      {/* ── Standalone Photo Lightbox Modal ── */}
      {selectedPhotoGallery && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-step">
          <div className="max-w-4xl w-full flex flex-col items-center gap-4 relative">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedPhotoGallery(null)}
              className="absolute -top-12 right-0 sm:top-2 sm:right-2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {(() => {
              const galleryPhotos = Array.isArray(selectedPhotoGallery.photos) && selectedPhotoGallery.photos.length > 0
                ? selectedPhotoGallery.photos
                : (selectedPhotoGallery.cover_photo ? [selectedPhotoGallery.cover_photo] : ['https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80']);

              const currentPhoto = galleryPhotos[activePhotoIndex] || galleryPhotos[0];

              return (
                <>
                  {/* Photo Title and Counter */}
                  <div className="flex items-center justify-between w-full px-2 text-white">
                    <span className="text-sm font-bold truncate">
                      {selectedPhotoGallery.property_name} — Photo {activePhotoIndex + 1} of {galleryPhotos.length}
                    </span>
                    <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-extrabold">
                      {activePhotoIndex === 0 ? 'Cover Photo' : `Image ${activePhotoIndex + 1}`}
                    </span>
                  </div>

                  {/* Main Large Image Container with Next/Prev Arrows */}
                  <div className="relative w-full h-[55vh] sm:h-[65vh] rounded-3xl overflow-hidden bg-black/40 flex items-center justify-center border border-white/10 shadow-2xl">
                    <img
                      src={currentPhoto}
                      alt={`Photo ${activePhotoIndex + 1}`}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80';
                      }}
                      className="max-h-full max-w-full object-contain select-none"
                    />

                    {/* Prev Arrow */}
                    {galleryPhotos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : galleryPhotos.length - 1))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                      >
                        <ChevronLeft className="w-6 h-6 stroke-[3]" />
                      </button>
                    )}

                    {/* Next Arrow */}
                    {galleryPhotos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setActivePhotoIndex((prev) => (prev < galleryPhotos.length - 1 ? prev + 1 : 0))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                      >
                        <ChevronRight className="w-6 h-6 stroke-[3]" />
                      </button>
                    )}
                  </div>

                  {/* Bottom Thumbnails Strip */}
                  {galleryPhotos.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full py-2 px-2">
                      {galleryPhotos.map((thumb, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActivePhotoIndex(idx)}
                          className={`h-14 w-20 rounded-xl overflow-hidden cursor-pointer transition-all shrink-0 border-2 ${
                            idx === activePhotoIndex
                              ? 'border-white scale-105 shadow-md'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={thumb}
                            alt={`Thumb ${idx + 1}`}
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=200&q=80';
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}

          </div>
        </div>
      )}

    </div>
  );
}
