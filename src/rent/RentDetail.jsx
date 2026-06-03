import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, Star, Calendar, MapPin, ShieldCheck, Clock, User, 
  Fuel, Cpu, Users, Shield, Info, Gauge, Check, CreditCard, X 
} from 'lucide-react';

const VEHICLE_DETAILS = {
  1: { // Yamaha R15 V4
    engine: '155cc LC4V SOHC VVA',
    power: '18.4 PS @ 10000 rpm',
    torque: '14.2 Nm @ 7500 rpm',
    mileage: '45 km/l',
    capacity: '11 Liters',
    weight: '142 kg',
    seating: '2 Persons (Rider + Pillion)',
    features: ['Dual-channel ABS', 'Quick Shifter', 'Traction Control System', 'Assist & Slipper Clutch', 'Bluetooth Console'],
    reviews: [
      { id: 1, name: 'Arun Prasath', rating: 5, date: '12 May 2025', comment: 'R15 was in absolute showroom condition. Very smooth pickup and handles beautifully in Pondicherry curves. The host was very friendly.' },
      { id: 2, name: 'Siddharth M.', rating: 4, date: '28 Apr 2025', comment: 'Loved the quickshifter! A bit aggressive seating posture for long rides, but perfect for short sporty sprints around the town.' }
    ]
  },
  2: { // Royal Enfield Classic 350
    engine: '349cc J-Series Single Cylinder',
    power: '20.2 BHP @ 6100 rpm',
    torque: '27 Nm @ 4000 rpm',
    mileage: '35 km/l',
    capacity: '13 Liters',
    weight: '195 kg',
    seating: '2 Persons (Rider + Pillion)',
    features: ['Dual-channel ABS', 'USB Charger Port', 'Retro Instrument Cluster', 'Electric Start', 'Touring Comfort Seats'],
    reviews: [
      { id: 1, name: 'Vikram Singh', rating: 5, date: '19 May 2025', comment: 'Classic thumping ride! Cruising on ECR Pondicherry road with this bike was a dream. The tire grip and comfort was spot on.' },
      { id: 2, name: 'Priya R.', rating: 5, date: '04 May 2025', comment: 'Zero vibration J-series engine. Highly recommended for couples looking to explore Pondicherry Heritage towns at a relaxed pace.' }
    ]
  },
  3: { // Toyota Glanza
    engine: '1197cc DualJet K-Series Petrol',
    power: '89 BHP @ 6000 rpm',
    torque: '113 Nm @ 4400 rpm',
    mileage: '22 km/l',
    capacity: '37 Liters',
    weight: '960 kg',
    seating: '5 Seater Hatchback',
    features: ['9-inch Touchscreen', '360-degree Camera', 'Head-up Display', 'Automatic Climate Control', 'Steering Mounted Controls'],
    reviews: [
      { id: 1, name: 'Rajesh K.', rating: 5, date: '15 May 2025', comment: 'Clean automatic hatchback. Fuel efficiency was surprisingly good. Very easy to park in crowded Pondy streets.' }
    ]
  },
  4: { // Mahindra Thar 4x4
    engine: '2184cc mHawk Diesel',
    power: '130 BHP @ 3750 rpm',
    torque: '300 Nm @ 1600-2800 rpm',
    mileage: '12 km/l',
    capacity: '57 Liters',
    weight: '1750 kg',
    seating: '4 Seater SUV',
    features: ['4x4 Low-Range Transfer Case', 'Touchscreen Infotainment', 'Apple CarPlay & Android Auto', 'Roll Cage Protection', 'Removable Hard Top'],
    reviews: [
      { id: 1, name: 'Devanand S.', rating: 5, date: '22 May 2025', comment: 'Renting Thar is the best way to enjoy a group trip! Clean engine, powerful torque. The sound system was incredible.' },
      { id: 2, name: 'Anjali Sharma', rating: 5, date: '10 May 2025', comment: 'Ultimate road presence! Thar was very clean, tires had good thread. Had a fantastic trip to Auroville beach.' }
    ]
  },
  5: { // KTM Duke 390
    engine: '373.3cc Liquid Cooled DOHC',
    power: '43.5 PS @ 9000 rpm',
    torque: '37 Nm @ 7000 rpm',
    mileage: '30 km/l',
    capacity: '13.4 Liters',
    weight: '171 kg',
    seating: '2 Persons',
    features: ['Ride-by-Wire', 'Supermoto ABS mode', 'TFT Color Display', 'Slipper Clutch', 'LED Headlamp & Indicators'],
    reviews: [
      { id: 1, name: 'Karthik Rao', rating: 4, date: '25 May 2025', comment: 'Monster performance. Bike was well-maintained. Rear tire was a bit worn out but the host changed it immediately on notice. Great service.' }
    ]
  },
  6: { // Tata Nexon SUV
    engine: '1199cc Turbocharged Revotron',
    power: '120 PS @ 5500 rpm',
    torque: '170 Nm @ 1750 rpm',
    mileage: '17.5 km/l',
    capacity: '44 Liters',
    weight: '1230 kg',
    seating: '5 Seater SUV',
    features: ['Vented Leatherette Seats', 'Digital Dashboard Cluster', 'iRA Connected Car Tech', 'Multi-drive Modes', 'Harman Premium Audio'],
    reviews: [
      { id: 1, name: 'Amit G.', rating: 5, date: '18 May 2025', comment: 'Spacious and solid build. Felt very safe driving with family. Automatic transmission works flawlessly. Highly recommend!' }
    ]
  },
  7: { // Honda Activa 6G
    engine: '109.51cc Fuel-Injected Fan Cooled',
    power: '7.8 PS @ 8000 rpm',
    torque: '8.8 Nm @ 5500 rpm',
    mileage: '50 km/l',
    capacity: '5.3 Liters',
    weight: '106 kg',
    seating: '2 Persons',
    features: ['ESP technology', 'Silent Start ACG', 'External Fuel Lid', 'Telescopic Suspension', 'Engine Start/Stop Switch'],
    reviews: [
      { id: 1, name: 'Meera Nair', rating: 5, date: '30 May 2025', comment: 'Simple, cheap and highly reliable. Ideal for zip-zapping around French Quarter cafes. Delivered with a full tank of fuel.' },
      { id: 2, name: 'Rohan Joshi', rating: 4, date: '14 May 2025', comment: 'Very light and easy. Perfect scooter for budget travelers. Helmet provided was of good quality and sanitized.' }
    ]
  },
  8: { // Maruti Swift
    engine: '1197cc DualJet Petrol',
    power: '88.5 BHP @ 6000 rpm',
    torque: '113 Nm @ 4400 rpm',
    mileage: '23 km/l',
    capacity: '37 Liters',
    weight: '875 kg',
    seating: '5 Seater Hatchback',
    features: ['SmartPlay Studio Touchscreen', 'Keyless Entry & Start', 'ABS with EBD', 'Dual Airbags', 'Idle Start-Stop Tech'],
    reviews: [
      { id: 1, name: 'Harish R.', rating: 5, date: '21 May 2025', comment: 'Swift is always a reliable hatchback. Clean interiors, cold AC. Seamless pick-up from the station.' }
    ]
  }
};

const DEFAULT_SPECS = {
  engine: 'Fuel Efficient Engine',
  power: 'Excellent Power Output',
  torque: 'High Pulling Torque',
  mileage: 'Highly Fuel Efficient',
  capacity: 'Standard Tank Size',
  weight: 'Lightweight Handling',
  seating: 'Comfortable Seating',
  features: ['Anti-lock Braking System', 'Electric Start', 'Under-seat storage/Bootspace', 'USB charging socket'],
  reviews: [
    { id: 1, name: 'Verified Rider', rating: 5, date: '10 May 2025', comment: 'Vehicle was in great condition. Pick-up and drop-off process took less than 5 minutes. Friendly customer service.' }
  ]
};

export default function RentDetail({ vehicle, searchParams, onBack, onNavigate }) {
  const [pickUpDate, setPickUpDate] = useState(searchParams.pickUpDate || '2025-06-21');
  const [dropOffDate, setDropOffDate] = useState(searchParams.dropOffDate || '2025-06-25');
  const [insuranceSelected, setInsuranceSelected] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('form'); // 'form' | 'success'
  
  // Checkout Form Fields
  const [fullName, setFullName] = useState('Rohit Kumar');
  const [email, setEmail] = useState('rohit.kumar@gmail.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pickup'); // 'pickup' | 'upi'
  const [bookingId, setBookingId] = useState('');

  // Fetch detailed specs based on ID
  const specs = useMemo(() => {
    return VEHICLE_DETAILS[vehicle?.id] || DEFAULT_SPECS;
  }, [vehicle]);

  // Calculate rental duration in days
  const totalDays = useMemo(() => {
    const start = new Date(pickUpDate);
    const end = new Date(dropOffDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [pickUpDate, dropOffDate]);

  // Price Calculation Breakdown
  const pricing = useMemo(() => {
    if (!vehicle) return { base: 0, insurance: 0, fee: 0, tax: 0, total: 0 };
    const base = vehicle.price * totalDays;
    const insurance = insuranceSelected ? 250 * totalDays : 0;
    const fee = 150; // Flat convenience fee
    const tax = Math.round((base + insurance + fee) * 0.18); // 18% GST
    const total = base + insurance + fee + tax;
    return { base, insurance, fee, tax, total };
  }, [vehicle, totalDays, insuranceSelected]);

  // Generate a random Booking ID
  const handleConfirmReservation = (e) => {
    e.preventDefault();
    if (!licenseNumber.trim()) {
      alert('Please enter your Driving License Number to continue.');
      return;
    }

    const newId = `TVR-RENT-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingId(newId);

    // Save mock booking to localStorage to integrate with MyBookings screen
    const rentalBooking = {
      id: newId,
      hotelName: `${vehicle.title} (${vehicle.type})`, // using hotelName field to seamlessly fit in MyBookings layout
      location: `${searchParams.location || 'Pondicherry Branch, Pondicherry'}`,
      image: vehicle.image,
      rooms: 1, // mapping vehicles to rooms=1 for consistent structure
      adults: vehicle.type === 'Car' ? 5 : 2,
      children: 0,
      dates: `${new Date(pickUpDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} · ${new Date(dropOffDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
      nights: totalDays,
      bookedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Confirmed',
      amount: `₹${pricing.total.toLocaleString('en-IN')}`,
      statusDetail: `Collect ride at Pondy Branch (${paymentMethod === 'pickup' ? 'Pay on Pick Up' : 'Online Paid'})`,
      isUpcoming: true,
      isRental: true // marker to customize cards if needed
    };

    const existingBookingsStr = localStorage.getItem('rental_bookings');
    const existing = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
    localStorage.setItem('rental_bookings', JSON.stringify([...existing, rentalBooking]));

    setCheckoutStep('success');
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-16 rent-page-enter">
      
      {/* Top Banner Navigation */}
      <div className="bg-white border-b border-slate-200 py-4 sticky top-[80px] z-30 shadow-xs">
        <div className="mx-auto max-w-[1360px] px-4 flex items-center justify-between text-left">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-extrabold text-slate-700 hover:text-[#0F766E] transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4.5 w-4.5" strokeWidth={2.5} />
            <span>Back to Fleets</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400">
            <span>Rentals</span>
            <span>/</span>
            <span>{vehicle?.type}s</span>
            <span>/</span>
            <span className="text-[#0F766E]">{vehicle?.title}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1360px] px-4 py-8">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: VISUALS, SPECS, REVIEWS */}
          <div className="lg:col-span-8 space-y-8 text-left">
            
            {/* Header Title Section */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="bg-[#E6F4F1] text-[#0F766E] text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                    Self-Drive {vehicle?.type}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none mt-3.5">
                    {vehicle?.title}
                  </h1>
                  <p className="text-[12.5px] font-bold text-slate-400 mt-2.5 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#0F766E]" />
                    <span>Pondicherry Branch (Free delivery in White Town & Beach area)</span>
                  </p>
                </div>
                
                {/* Rating Badge */}
                <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-center shadow-xs">
                  <div className="flex items-center justify-center gap-1 text-amber-500 font-black text-[16px]">
                    <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                    <span>{vehicle?.rating}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">
                    {vehicle?.reviews} Reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Showcase Visual Hero */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 flex items-center justify-center h-[340px] sm:h-[400px] shadow-xs relative overflow-hidden group">
              <div className="absolute inset-0 bg-radial-gradient from-slate-50/50 via-white to-slate-50/10 pointer-events-none" />
              <img 
                src={vehicle?.image} 
                alt={vehicle?.title} 
                className="max-h-full max-w-full object-contain transform group-hover:scale-103 transition-transform duration-500 ease-out z-10"
              />
              <span className="absolute bottom-4 right-4 bg-slate-950/70 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 z-15">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-450" />
                <span>Verified Sanitized Ride</span>
              </span>
            </div>

            {/* Segment Tabs */}
            <div className="border-b border-slate-200 flex items-center gap-6 overflow-x-auto no-scrollbar py-0.5">
              {['Overview', 'Specifications', 'Reviews', 'Policies'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-black relative transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab ? 'text-[#0F766E]' : 'text-slate-400 hover:text-slate-650'
                  }`}
                >
                  <span>{tab}</span>
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#0F766E]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Panels */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
              
              {activeTab === 'Overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-850">About this vehicle</h3>
                    <p className="text-[13.5px] font-medium text-slate-500 leading-relaxed mt-2.5">
                      Experience ultimate freedom and convenience in Pondicherry with our top-rated {vehicle?.title}. Perfect for couples and solo adventurers wanting to explore the French Colony cafes, White Town architecture, and ECR coastal roads at their own pace. Comes complete with dynamic support, comprehensive insurance cover, and roadside checkups.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl flex flex-col gap-1 items-center text-center">
                      <Fuel className="h-5 w-5 text-slate-500" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-1.5">Fuel</span>
                      <span className="text-[13px] font-bold text-slate-700">{vehicle?.fuel || 'Petrol'}</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl flex flex-col gap-1 items-center text-center">
                      <Cpu className="h-5 w-5 text-slate-500" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-1.5">Transmission</span>
                      <span className="text-[13px] font-bold text-slate-700">{vehicle?.transmission || 'Manual'}</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl flex flex-col gap-1 items-center text-center">
                      <Gauge className="h-5 w-5 text-slate-500" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-1.5">Power/Engine</span>
                      <span className="text-[13px] font-bold text-slate-700">{vehicle?.power || 'Standard'}</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl flex flex-col gap-1 items-center text-center">
                      <Users className="h-5 w-5 text-slate-500" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-1.5">Category</span>
                      <span className="text-[13px] font-bold text-slate-700">{vehicle?.category || 'Standard'}</span>
                    </div>
                  </div>

                  {/* Highlights checklist */}
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Core Features Included</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {specs.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-[13px] font-semibold text-slate-650">
                          <Check className="h-4 w-4 text-[#0F766E] stroke-[3]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Host Info */}
                  <div className="border-t border-slate-100 pt-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-black text-xs">
                        PR
                      </div>
                      <div>
                        <h4 className="text-[13.5px] font-black text-slate-800">Pondy Ride Partners</h4>
                        <span className="text-[11px] font-bold text-slate-400 block mt-0.5">Verified Fleet Host • Member since 2023</span>
                      </div>
                    </div>
                    <span className="bg-[#E6FBF2] text-[#0F766E] text-[10px] font-extrabold px-3 py-1.5 rounded-full border border-emerald-100/40">
                      ★ 4.9 Super Host
                    </span>
                  </div>

                </div>
              )}

              {activeTab === 'Specifications' && (
                <div className="space-y-4">
                  <h3 className="text-base font-extrabold text-slate-850 mb-2">Technical Specifications</h3>
                  <div className="border border-slate-150 rounded-2xl overflow-hidden divide-y divide-slate-150">
                    <div className="grid grid-cols-3 p-4 text-[13px]">
                      <span className="font-bold text-slate-450">Engine Displacement</span>
                      <span className="col-span-2 font-semibold text-slate-800">{specs.engine}</span>
                    </div>
                    <div className="grid grid-cols-3 p-4 text-[13px]">
                      <span className="font-bold text-slate-450">Maximum Power</span>
                      <span className="col-span-2 font-semibold text-slate-800">{specs.power}</span>
                    </div>
                    <div className="grid grid-cols-3 p-4 text-[13px]">
                      <span className="font-bold text-slate-450">Peak Torque</span>
                      <span className="col-span-2 font-semibold text-slate-800">{specs.torque}</span>
                    </div>
                    <div className="grid grid-cols-3 p-4 text-[13px]">
                      <span className="font-bold text-slate-450">Certified Mileage</span>
                      <span className="col-span-2 font-semibold text-slate-800">{specs.mileage}</span>
                    </div>
                    <div className="grid grid-cols-3 p-4 text-[13px]">
                      <span className="font-bold text-slate-450">Fuel Tank / Range</span>
                      <span className="col-span-2 font-semibold text-slate-800">{specs.capacity}</span>
                    </div>
                    <div className="grid grid-cols-3 p-4 text-[13px]">
                      <span className="font-bold text-slate-450">Kerb Weight</span>
                      <span className="col-span-2 font-semibold text-slate-800">{specs.weight}</span>
                    </div>
                    <div className="grid grid-cols-3 p-4 text-[13px]">
                      <span className="font-bold text-slate-450">Seating Capacity</span>
                      <span className="col-span-2 font-semibold text-slate-800">{specs.seating}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Reviews' && (
                <div className="space-y-6">
                  <h3 className="text-base font-extrabold text-slate-850">Client Experiences</h3>
                  
                  {specs.reviews.length > 0 ? (
                    <div className="divide-y divide-slate-100 space-y-5">
                      {specs.reviews.map((rev) => (
                        <div key={rev.id} className="pt-5 first:pt-0 text-left">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-8.5 w-8.5 rounded-full bg-teal-50 text-[#0F766E] flex items-center justify-center font-black text-xs border border-teal-100">
                                {rev.name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="text-[13px] font-black text-slate-800 leading-none">{rev.name}</h4>
                                <span className="text-[10px] text-slate-400 font-bold block mt-1">{rev.date}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-[12.5px] font-semibold text-slate-550 leading-relaxed mt-2.5 pl-10.5">
                            "{rev.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <span className="text-xs font-bold text-slate-450 block">No reviews yet for this vehicle.</span>
                    </div>
                  )}

                </div>
              )}

              {activeTab === 'Policies' && (
                <div className="space-y-5 text-[13px] font-semibold text-slate-650">
                  <h3 className="text-base font-extrabold text-slate-850">Rental Policy Guidelines</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 leading-relaxed">
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Info className="h-4 w-4 text-[#0F766E] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-black text-slate-800">Required Documents</p>
                          <p className="text-xs text-slate-500 mt-0.5">Original Driving License and Aadhar Card/Passport must be shown during pickup.</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Fuel className="h-4 w-4 text-[#0F766E] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-black text-slate-800">Fuel Policy</p>
                          <p className="text-xs text-slate-500 mt-0.5">Full to Full. The vehicle is provided with a full tank and should be returned with a full tank.</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Shield className="h-4 w-4 text-[#0F766E] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-black text-slate-800">Refundable Security Deposit</p>
                          <p className="text-xs text-slate-500 mt-0.5">₹0 Security Deposit for verified customers. Simple digital trust validation.</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Clock className="h-4 w-4 text-[#0F766E] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-black text-slate-800">Speed Limit</p>
                          <p className="text-xs text-slate-500 mt-0.5">Bikes limited to 70 km/h; Cars limited to 90 km/h. High speed violations trigger warning fees.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>

          {/* RIGHT COLUMN: BOOKING ESTIMATOR STICKER */}
          <div className="lg:col-span-4 sticky top-[152px]">
            
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md text-left space-y-5">
              
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div>
                  <span className="text-[20px] font-black text-[#0F766E]">₹{vehicle?.price}</span>
                  <span className="text-[11.5px] font-semibold text-slate-400"> / day</span>
                </div>
                <span className="text-[10px] font-black text-slate-450 uppercase bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
                  Instant Reserved
                </span>
              </div>

              {/* Date Pickers */}
              <div className="grid grid-cols-1 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-0.5">Pick-up Date</label>
                  <input 
                    type="date"
                    value={pickUpDate}
                    onChange={(e) => setPickUpDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[12.5px] font-semibold text-slate-800 outline-none focus:border-[#0F766E]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-0.5">Drop-off Date</label>
                  <input 
                    type="date"
                    value={dropOffDate}
                    onChange={(e) => setDropOffDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[12.5px] font-semibold text-slate-800 outline-none focus:border-[#0F766E]"
                  />
                </div>
              </div>

              {/* Total Duration Info */}
              <div className="flex items-center justify-between text-[12.5px] font-semibold bg-teal-50/55 text-teal-850 p-3 rounded-xl border border-teal-100/30">
                <span>Rental Duration:</span>
                <span className="font-extrabold">{totalDays} Day{totalDays > 1 ? 's' : ''}</span>
              </div>

              {/* Insurance check box */}
              <div 
                onClick={() => setInsuranceSelected(!insuranceSelected)}
                className="flex items-start gap-2.5 bg-slate-50 border border-slate-150 p-3.5 rounded-xl cursor-pointer select-none group"
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all mt-0.5 ${
                  insuranceSelected 
                    ? 'bg-[#0F766E] border-[#0F766E] text-white shadow-xs' 
                    : 'border-slate-350 group-hover:border-slate-400 bg-white'
                }`}>
                  {insuranceSelected && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                </div>
                <div>
                  <span className="text-[12.5px] font-bold text-slate-850 block leading-tight">Add Protection Package</span>
                  <span className="text-[10.5px] text-slate-450 font-semibold block mt-0.5">₹250/day. Covers accidental damages & road towing.</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-2.5 border-t border-slate-100 pt-4 text-[12.5px] font-semibold text-slate-500">
                <div className="flex items-center justify-between">
                  <span>₹{vehicle?.price} x {totalDays} days</span>
                  <span className="text-slate-800 font-extrabold">₹{pricing.base.toLocaleString('en-IN')}</span>
                </div>
                {insuranceSelected && (
                  <div className="flex items-center justify-between">
                    <span>Zero Liability Protection</span>
                    <span className="text-slate-800 font-extrabold">₹{pricing.insurance.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span>Convenience & Booking Fee</span>
                  <span className="text-slate-800 font-extrabold">₹{pricing.fee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Taxes (GST 18%)</span>
                  <span className="text-slate-800 font-extrabold">₹{pricing.tax}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Refundable Security Deposit</span>
                  <span className="text-emerald-600 font-black">₹0 (FREE)</span>
                </div>
                
                <div className="flex items-center justify-between text-base font-black text-slate-900 border-t border-slate-100 pt-3.5 mt-2">
                  <span>Grand Total</span>
                  <span className="text-[#0F766E] text-[18px]">₹{pricing.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* CTA Action */}
              <button 
                onClick={() => setShowCheckout(true)}
                className="w-full bg-[#0F766E] hover:bg-[#0D665F] text-white py-3.5 rounded-2xl text-center text-sm font-extrabold active:scale-98 transition-all shadow-md shadow-emerald-800/10 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Instant Rent Ride</span>
              </button>

              <p className="text-[10px] font-semibold text-slate-400 text-center leading-normal">
                *Cancellation is completely free up to 24 hours prior to pick-up time.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* CHECKOUT MODAL OVERLAY */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-modal-backdrop">
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl w-full max-w-[480px] p-6 sm:p-8 relative overflow-y-auto max-h-[92vh] no-scrollbar animate-modal-box">
            
            {/* Close Button */}
            <button 
              onClick={() => { setShowCheckout(false); setCheckoutStep('form'); }}
              className="absolute top-5 right-5 text-slate-450 hover:text-slate-700 rounded-full hover:bg-slate-50 p-1.5 transition-all cursor-pointer z-10"
            >
              <X className="h-5 w-5 stroke-[2.5]" />
            </button>

            {checkoutStep === 'form' ? (
              /* Checkout Form */
              <div className="space-y-6 text-left">
                
                <div className="text-center flex flex-col gap-1.5 mt-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                    Rental Reservation
                  </h2>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">
                    Confirm details to reserve your ride instantly
                  </p>
                </div>

                {/* Selected vehicle summary */}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-150 p-3 rounded-2xl">
                  <img src={vehicle?.image} alt={vehicle?.title} className="w-16 h-12 object-contain" />
                  <div>
                    <h4 className="text-[13.5px] font-black text-slate-800">{vehicle?.title}</h4>
                    <p className="text-[10.5px] text-slate-450 font-bold mt-0.5">
                      ₹{vehicle?.price}/day • {totalDays} Day{totalDays > 1 ? 's' : ''} rental
                    </p>
                  </div>
                  <div className="ml-auto text-right pr-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Grand Total</span>
                    <span className="text-[14px] font-black text-[#0F766E]">₹{pricing.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <form onSubmit={handleConfirmReservation} className="space-y-4">
                  {/* Contact Info fields */}
                  <div className="grid grid-cols-1 gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-0.5">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-[12.5px] font-semibold text-slate-800 outline-none focus:border-[#0F766E]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-0.5">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-[12.5px] font-semibold text-slate-800 outline-none focus:border-[#0F766E]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-0.5">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-[12.5px] font-semibold text-slate-800 outline-none focus:border-[#0F766E]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-0.5 flex items-center justify-between">
                        <span>Driving License Number</span>
                        <span className="text-[8.5px] text-red-500 font-bold tracking-normal normal-case">Required*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. PY-01-20230009876"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-[12.5px] font-semibold text-slate-800 placeholder-slate-400 outline-none focus:border-[#0F766E]"
                      />
                    </div>
                  </div>

                  {/* Payment Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-0.5">Select Payment Option</label>
                    <div className="grid grid-cols-2 gap-3">
                      
                      <div 
                        onClick={() => setPaymentMethod('pickup')}
                        className={`border rounded-xl p-3 flex flex-col gap-1 cursor-pointer select-none transition-all ${
                          paymentMethod === 'pickup'
                            ? 'border-[#0F766E] bg-teal-50/20 text-[#0F766E]'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span className="text-[12.5px] font-extrabold">Pay on Pick Up</span>
                        <span className="text-[9.5px] opacity-75 font-semibold">Zero upfront cost</span>
                      </div>

                      <div 
                        onClick={() => setPaymentMethod('upi')}
                        className={`border rounded-xl p-3 flex flex-col gap-1 cursor-pointer select-none transition-all ${
                          paymentMethod === 'upi'
                            ? 'border-[#0F766E] bg-teal-50/20 text-[#0F766E]'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span className="text-[12.5px] font-extrabold flex items-center gap-1">
                          <span>Pay Now (UPI)</span>
                        </span>
                        <span className="text-[9.5px] opacity-75 font-semibold">Instant UPI scanning</span>
                      </div>

                    </div>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 flex flex-col items-center gap-2">
                      <div className="h-28 w-28 bg-white border border-slate-200 rounded-lg p-1.5 shadow-inner">
                        {/* Mock QR Code representation */}
                        <svg viewBox="0 0 100 100" className="h-full w-full text-slate-800">
                          <rect x="0" y="0" width="25" height="25" fill="currentColor" />
                          <rect x="5" y="5" width="15" height="15" fill="white" />
                          <rect x="9" y="9" width="7" height="7" fill="currentColor" />
                          
                          <rect x="75" y="0" width="25" height="25" fill="currentColor" />
                          <rect x="80" y="5" width="15" height="15" fill="white" />
                          <rect x="84" y="84" width="7" height="7" fill="currentColor" />
                          
                          <rect x="0" y="75" width="25" height="25" fill="currentColor" />
                          <rect x="5" y="80" width="15" height="15" fill="white" />
                          <rect x="9" y="84" width="7" height="7" fill="currentColor" />
                          
                          <rect x="35" y="35" width="30" height="30" fill="currentColor" />
                          <rect x="40" y="40" width="20" height="20" fill="white" />
                          
                          <rect x="30" y="5" width="10" height="15" fill="currentColor" />
                          <rect x="5" y="30" width="15" height="10" fill="currentColor" />
                          <rect x="85" y="35" width="10" height="15" fill="currentColor" />
                          <rect x="35" y="85" width="15" height="10" fill="currentColor" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">Scan QR Code using any UPI App (GPay/PhonePe) to pay ₹{pricing.total.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full bg-[#0F766E] hover:bg-[#0D665F] text-white py-3.5 rounded-2xl text-center text-sm font-extrabold shadow-md active:scale-98 transition-all mt-4 cursor-pointer"
                  >
                    <span>Confirm Reservation</span>
                  </button>

                </form>

              </div>
            ) : (
              /* Success confirmation Screen */
              <div className="flex flex-col items-center justify-center py-6 gap-5 text-center animate-success-check">
                
                <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-150 flex items-center justify-center text-[#16A34A] shadow-inner">
                  <Check className="w-8 h-8 stroke-[3.5]" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                    Reservation Confirmed!
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold max-w-[280px] mx-auto mt-1 leading-normal">
                    Your ride is reserved. We have sent the confirmation voucher to <strong className="text-slate-700 font-bold">{email}</strong>.
                  </p>
                </div>

                {/* Booking ID box */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 w-full text-[13px] font-semibold text-slate-650 flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Booking Reference</span>
                    <strong className="text-slate-800 font-black">{bookingId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Vehicle</span>
                    <span className="text-slate-800 font-bold">{vehicle?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pick Up Point</span>
                    <span className="text-[#0F766E] font-bold">Pondy Town Branch</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2.5 w-full mt-3">
                  <button 
                    onClick={() => {
                      setShowCheckout(false);
                      setCheckoutStep('form');
                      onNavigate('my-bookings');
                    }}
                    className="w-full bg-[#0F766E] hover:bg-[#0D665F] text-white py-3 rounded-xl text-xs font-extrabold shadow-sm active:scale-98 transition-all cursor-pointer"
                  >
                    Go to My Bookings
                  </button>
                  <button 
                    onClick={() => {
                      setShowCheckout(false);
                      setCheckoutStep('form');
                      onBack(); // back to results or home
                    }}
                    className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 py-3 rounded-xl text-xs font-extrabold active:scale-98 transition-all cursor-pointer"
                  >
                    Browse Other Vehicles
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
