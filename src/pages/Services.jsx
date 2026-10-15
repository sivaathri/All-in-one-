import React, { useState, useEffect } from 'react';
import { 
  Wrench, Disc, ShieldCheck, Clock, Phone, MapPin, 
  AlertCircle, CheckCircle2, Truck, Car, Bike, Sparkles, 
  Star, MessageCircle, Check, ChevronRight, Zap, ArrowRight,
  Search, ShieldAlert, CheckCircle, Navigation, Radio
} from 'lucide-react';
import catServicesImg from '../assets/cat_services.png';
import catMechanicImg from '../assets/cat_mechanic.png';
import catTireImg from '../assets/cat_tire.png';

export default function Services({ initialTab = 'all', onNavigate = () => {} }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'all' | 'mechanic' | 'puncture'
  const [vehicleType, setVehicleType] = useState('bike'); // 'bike' | 'car' | 'suv'
  const [selectedIssue, setSelectedIssue] = useState('puncture_tubeless');
  const [locationInput, setLocationInput] = useState('White Town, Pondicherry');
  const [phoneInput, setPhoneInput] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestConfirmed, setRequestConfirmed] = useState(false);
  const [activeMechanicEta, setActiveMechanicEta] = useState(14);
  const [activeFilter, setActiveFilter] = useState('all'); // for workshop cards

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialTab]);

  const handleQuickRequest = (e) => {
    e.preventDefault();
    if (!phoneInput) {
      alert('Please enter your contact phone number so our mechanic can reach you.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRequestConfirmed(true);
    }, 1200);
  };

  const servicesList = [
    {
      id: 'punc-tubeless',
      category: 'puncture',
      title: 'Tubeless Tyre Puncture Fix',
      desc: 'Rapid on-spot tubeless puncture strip repair, pressure calibration, and valve inspection.',
      time: '10-15 mins',
      price: '₹149',
      popular: true,
      icon: Disc,
      vehicles: ['Bike', 'Scooter', 'Car', 'SUV'],
      features: ['High-tensile rubber plug', 'Air pressure top-up', 'Rim seal check']
    },
    {
      id: 'punc-tube',
      category: 'puncture',
      title: 'Tube Puncture & Patching',
      desc: 'Wheel dismounting, high-grade vulcanized patch sealing, and puncture testing in water tank.',
      time: '15-20 mins',
      price: '₹120',
      popular: false,
      icon: Disc,
      vehicles: ['Bike', 'Scooter'],
      features: ['Cold vulcanized patch', 'Spoke & rim check', 'Leakage test']
    },
    {
      id: 'punc-replacement',
      category: 'puncture',
      title: 'Emergency Tyre Replacement',
      desc: 'Delivery and installation of brand new tyres (MRF, CEAT, Apollo, Michelin) at roadside.',
      time: '25-30 mins',
      price: '₹299 + tyre MRP',
      popular: false,
      icon: Disc,
      vehicles: ['Bike', 'Car', 'SUV'],
      features: ['Original manufacturer tyres', 'On-spot balance check', 'Free old tyre recycle']
    },
    {
      id: 'mech-breakdown',
      category: 'mechanic',
      title: 'On-Spot Breakdown Assistance',
      desc: 'Comprehensive diagnostic inspection for vehicle non-starting, stalling, or sudden engine shutdown.',
      time: '15-25 mins',
      price: '₹349',
      popular: true,
      icon: Wrench,
      vehicles: ['Bike', 'Scooter', 'Car', 'SUV'],
      features: ['Spark plug & ignition check', 'Fuel line diagnosis', 'Fuse & electrical test']
    },
    {
      id: 'mech-battery',
      category: 'mechanic',
      title: 'Battery Jumpstart & Boost',
      desc: 'Heavy-duty 12V jumper cables & mobile booster pack to revive drained batteries immediately.',
      time: '10-15 mins',
      price: '₹299',
      popular: true,
      icon: Zap,
      vehicles: ['Car', 'SUV', 'Bike'],
      features: ['Alternator health test', 'Terminal cleaning & spray', 'Voltage meter check']
    },
    {
      id: 'mech-brakes-chain',
      category: 'mechanic',
      title: 'Brake, Clutch & Chain Repair',
      desc: 'Emergency chain slack tightening, lubrication, clutch cable replacement, and brake bleeding.',
      time: '20-30 mins',
      price: '₹249',
      popular: false,
      icon: Wrench,
      vehicles: ['Bike', 'Scooter'],
      features: ['High-temp chain lube', 'Cable tension adjustment', 'Brake bite calibration']
    },
    {
      id: 'mech-towing',
      category: 'mechanic',
      title: 'Hydraulic Flatbed Towing',
      desc: 'Safe, damage-free flatbed tow truck transfer to the nearest authorized service center or hotel.',
      time: '20-35 mins',
      price: '₹799',
      popular: false,
      icon: Truck,
      vehicles: ['Car', 'SUV', 'Superbike'],
      features: ['Hydraulic tilt bed', 'Vehicle transit insurance', 'Direct drop-off to garage']
    },
    {
      id: 'mech-fuel',
      category: 'all',
      title: 'Emergency Fuel Delivery (2L - 5L)',
      desc: 'Ran out of petrol or diesel? Our mobile van delivers certified fuel directly to your coordinates.',
      time: '15-20 mins',
      price: '₹199 + fuel cost',
      popular: false,
      icon: Zap,
      vehicles: ['Bike', 'Car', 'SUV'],
      features: ['Pure IOCL / HP fuel', 'Safety jerrycan', 'Instant refueling']
    }
  ];

  const filteredServices = servicesList.filter(s => {
    if (activeTab === 'mechanic') return s.category === 'mechanic' || s.category === 'all';
    if (activeTab === 'puncture') return s.category === 'puncture' || s.category === 'all';
    return true;
  });

  const verifiedWorkshops = [
    {
      id: 1,
      name: 'Promenade Quick Tyre & Puncture Care',
      category: 'puncture',
      rating: 4.9,
      reviews: 342,
      location: 'White Town, Pondicherry (Near Rock Beach)',
      eta: '8 - 12 mins',
      phone: '+91 98401 23411',
      openHours: 'Open 24/7 (Emergency Service)',
      specialty: 'Tubeless puncture, bike tube vulcanizing, nitrogen fill',
      verified: true
    },
    {
      id: 2,
      name: 'Auroville Highway Auto Mechanics',
      category: 'mechanic',
      rating: 4.8,
      reviews: 289,
      location: 'ECR Auroville Junction, Pondicherry',
      eta: '12 - 18 mins',
      phone: '+91 98402 88722',
      openHours: '6:00 AM - 11:30 PM (Roadside dispatch 24h)',
      specialty: 'Royal Enfield, Activa & car engine breakdown specialist',
      verified: true
    },
    {
      id: 3,
      name: 'Sri Venkateswara Mobile Garage & Recovery',
      category: 'mechanic',
      rating: 4.9,
      reviews: 415,
      location: 'Mission Street, Heritage Town',
      eta: '10 - 15 mins',
      phone: '+91 98403 76543',
      openHours: 'Open 24/7',
      specialty: 'Battery jumpstart, clutch/brake cables, towing',
      verified: true
    },
    {
      id: 4,
      name: 'East Coast Fast Wheels & Tyre Clinic',
      category: 'puncture',
      rating: 4.7,
      reviews: 198,
      location: 'Lawspet Main Road, Pondicherry',
      eta: '14 - 20 mins',
      phone: '+91 98404 99120',
      openHours: 'Open 24/7',
      specialty: 'SUV/Car tubeless repair, rim bend fix, spare tyre swap',
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
      {/* ── Top Hero Banner ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b3c38] via-[#0F766E] to-[#115e59] text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl relative z-10">
          {/* Breadcrumb / Back Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-100/80 mb-6">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold">Services</span>
            <span className="bg-teal-500/30 text-teal-200 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">
              Mechanic & Puncture
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-white border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3" />
                <span>24/7 Roadside & Breakdown Support in Pondicherry</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                Vehicle Services, Mechanic & Puncture Assistance
              </h1>

              <p className="text-base sm:text-lg text-teal-50 font-normal leading-relaxed max-w-2xl">
                Got a flat tyre or bike/car engine trouble? Verified on-spot mobile mechanics and puncture specialists reach you anywhere across Pondicherry, Auroville & ECR within <strong className="text-white font-bold underline decoration-amber-400">15 minutes</strong>.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-extrabold text-slate-900 shadow-lg shadow-amber-400/25 hover:bg-amber-300 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 fill-slate-900" />
                  <span>Call Emergency SOS: +91 98765 43210</span>
                </a>

                <a
                  href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20immediate%20vehicle%20assistance%20in%20Pondicherry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-emerald-500 shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Help</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/15 max-w-lg">
                <div>
                  <div className="text-xl font-black text-amber-300">15 Mins</div>
                  <div className="text-[11px] text-teal-100 font-semibold">Average Arrival</div>
                </div>
                <div>
                  <div className="text-xl font-black text-white">100% Verified</div>
                  <div className="text-[11px] text-teal-100 font-semibold">Local Mechanics</div>
                </div>
                <div>
                  <div className="text-xl font-black text-white">Fixed Price</div>
                  <div className="text-[11px] text-teal-100 font-semibold">No Hidden Charges</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-teal-100 text-slate-800">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img src={catServicesImg} alt="Vehicle Services" className="w-12 h-12 object-contain" />
                    <div>
                      <h2 className="text-base font-extrabold text-slate-900">One-Tap Roadside Help</h2>
                      <p className="text-xs text-slate-500">Live mechanic dispatch active</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    18 Active Vans
                  </span>
                </div>

                {/* Quick Request Form */}
                {requestConfirmed ? (
                  <div className="py-6 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900">Mechanic Dispatched!</h3>
                      <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                        Mechanic <strong>Ramesh (Auroville Auto)</strong> is heading to <strong>{locationInput}</strong>.
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 text-left space-y-1.5 text-xs">
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-500">Estimated Arrival:</span>
                        <span className="text-emerald-600 font-black">{activeMechanicEta} Minutes</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-500">Vehicle Contact:</span>
                        <span className="text-slate-800">{phoneInput || '+91 98765 43210'}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-500">Service:</span>
                        <span className="text-slate-800">
                          {selectedIssue === 'puncture_tubeless' ? 'Tubeless Puncture Fix' : 'Mechanic Breakdown'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href="tel:+919840123411"
                        className="flex-1 rounded-xl bg-[#0F766E] text-white py-2.5 text-xs font-bold hover:bg-[#0c625c] transition-colors"
                      >
                        Call Ramesh (Driver)
                      </a>
                      <button
                        onClick={() => setRequestConfirmed(false)}
                        className="px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                      >
                        New Request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleQuickRequest} className="mt-4 space-y-3.5">
                    {/* Vehicle Type Selector */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Select Your Vehicle
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setVehicleType('bike')}
                          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            vehicleType === 'bike'
                              ? 'border-[#0F766E] bg-teal-50 text-[#0F766E] shadow-xs'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Bike className="w-3.5 h-3.5" />
                          <span>Bike / Scooty</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setVehicleType('car')}
                          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            vehicleType === 'car'
                              ? 'border-[#0F766E] bg-teal-50 text-[#0F766E] shadow-xs'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Car className="w-3.5 h-3.5" />
                          <span>Car / Sedan</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setVehicleType('suv')}
                          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            vehicleType === 'suv'
                              ? 'border-[#0F766E] bg-teal-50 text-[#0F766E] shadow-xs'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>SUV / Thar</span>
                        </button>
                      </div>
                    </div>

                    {/* Common Issue Selector */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        What's the issue?
                      </label>
                      <select
                        value={selectedIssue}
                        onChange={(e) => setSelectedIssue(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#0F766E] focus:outline-none transition-colors"
                      >
                        <optgroup label="🛞 Puncture & Tyre Issues">
                          <option value="puncture_tubeless">Tubeless Tyre Flat / Puncture (₹149)</option>
                          <option value="puncture_tube">Tube Tyre Puncture Repair (₹120)</option>
                          <option value="puncture_swap">Spare Tyre Swap / Change (₹199)</option>
                        </optgroup>
                        <optgroup label="🔧 Mechanic & Breakdown Issues">
                          <option value="mech_start">Engine Won't Start / Sudden Stalling (₹349)</option>
                          <option value="mech_battery">Dead Battery / Needs Jumpstart (₹299)</option>
                          <option value="mech_chain">Broken / Loose Chain or Clutch Cable (₹249)</option>
                          <option value="mech_brakes">Brakes Failure / Jammed Wheel (₹299)</option>
                          <option value="mech_towing">Vehicle Needs Towing (₹799)</option>
                        </optgroup>
                      </select>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Your Location / Landmark
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={locationInput}
                          onChange={(e) => setLocationInput(e.target.value)}
                          placeholder="e.g. Near Promenade Beach / Auroville Rd"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#0F766E] focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Your Mobile Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          placeholder="+91 98765 XXXXX"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#0F766E] focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-[#0F766E] py-3 text-xs font-extrabold text-white shadow-md hover:bg-[#0c625c] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching Nearest Specialist...</span>
                        </>
                      ) : (
                        <>
                          <Navigation className="w-4 h-4" />
                          <span>Request Immediate Assistance (~15m ETA)</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter / Navigation Menu Tabs ───────────────────────────── */}
      <section className="sticky top-20 z-40 bg-white border-b border-slate-200/80 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-3 no-scrollbar gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#0F766E] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>All Services</span>
              </button>

              <button
                onClick={() => setActiveTab('mechanic')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'mechanic'
                    ? 'bg-[#0F766E] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Mechanic Service</span>
              </button>

              <button
                onClick={() => setActiveTab('puncture')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'puncture'
                    ? 'bg-[#0F766E] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Disc className="w-3.5 h-3.5" />
                <span>Puncture Service</span>
              </button>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified local garages & mechanics only</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Area ───────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 space-y-14">
        {/* Services Grid */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                Available On-Demand
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                {activeTab === 'mechanic'
                  ? 'Mechanic Breakdown & Repair Services'
                  : activeTab === 'puncture'
                  ? 'Doorstep & Highway Puncture Services'
                  : 'All Vehicle & Breakdown Services'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-semibold">
              Showing {filteredServices.length} standard rate packages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredServices.map((service) => {
              const IconComp = service.icon;
              return (
                <div
                  key={service.id}
                  className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <IconComp className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      {service.popular && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                          Most Requested
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0F766E] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed">
                      {service.desc}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Fixed Rate</div>
                      <div className="text-base font-black text-slate-900">{service.price}</div>
                    </div>
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 150, behavior: 'smooth' });
                      }}
                      className="rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white group-hover:bg-[#0F766E] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Verified Garages / Mechanics in Pondicherry ─────────────── */}
        <section className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  Verified Local Partners
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Nearby Mechanic Workshops & Puncture Stations
              </h2>
            </div>
            <div className="text-xs font-bold text-slate-500">
              Active around Pondicherry, White Town & Auroville
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verifiedWorkshops.map((shop) => (
              <div
                key={shop.id}
                className="rounded-2xl border border-slate-200/80 p-4 sm:p-5 hover:border-[#0F766E] transition-all bg-slate-50/50 hover:bg-white"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900">{shop.name}</h4>
                      {shop.verified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {shop.rating}
                      </span>
                      <span>({shop.reviews} reviews)</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                        ETA: {shop.eta}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-600 font-medium space-y-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{shop.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-500">{shop.openHours}</span>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">
                    {shop.specialty}
                  </span>
                  <a
                    href={`tel:${shop.phone}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F766E] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#0c625c] transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Shop</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Common Questions / FAQs ─────────────────────────────────── */}
        <section className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-400">
              TripVerse Reliability
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              How TripVerse Vehicle & Roadside Assistance Works
            </h2>
            <p className="text-sm text-slate-300 mt-2 font-medium">
              Renting a scooter, Royal Enfield, or driving your car in Pondicherry? You never have to worry about getting stranded.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-black text-sm">
                  1
                </div>
                <h4 className="text-sm font-bold text-white">Call or Submit Issue</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Call our SOS number or pick your flat tyre or breakdown issue in the quick form.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-black text-sm">
                  2
                </div>
                <h4 className="text-sm font-bold text-white">Mobile Van Dispatched</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The nearest certified mechanic heads to your GPS location with all necessary tools.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-black text-sm">
                  3
                </div>
                <h4 className="text-sm font-bold text-white">Fixed Price & Back on Road</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  On-spot repair completed. Pay fixed standard rates via UPI, cash, or card.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
