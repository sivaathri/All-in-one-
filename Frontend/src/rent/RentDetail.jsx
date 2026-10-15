import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, Star, Calendar, MapPin, ShieldCheck, Clock, User, 
  Fuel, Cpu, Users, Shield, Info, Gauge, Check, CreditCard, X, ChevronRight,
  MessageSquare, Phone, Mail, Award, Heart
} from 'lucide-react';

const VEHICLE_SPECS_DB = {
  r15: {
    brand: 'Yamaha',
    model: 'R15 V4',
    vehicleType: 'Sports Bike',
    engine: '155cc LC4V SOHC VVA',
    power: '18.4 PS @ 10000 rpm',
    torque: '14.2 Nm @ 7500 rpm',
    mileage: '45-50 kmpl',
    capacity: '11 Liters',
    weight: '142 kg',
    seating: '2 Seater',
    transmission: 'Manual',
    features: ['Dual-channel ABS', 'Quick Shifter', 'Traction Control System', 'Assist & Slipper Clutch', 'Bluetooth Console'],
    reviews: [
      { id: 1, name: 'Arun Prasath', rating: 5, date: '12 May 2025', comment: 'R15 was in absolute showroom condition. Very smooth pickup and handles beautifully in Pondicherry curves. The host was very friendly.' },
      { id: 2, name: 'Siddharth M.', rating: 4, date: '28 Apr 2025', comment: 'Loved the quickshifter! A bit aggressive seating posture for long rides, but perfect for short sporty sprints around the town.' }
    ]
  },
  classic: {
    brand: 'Royal Enfield',
    model: 'Classic 350',
    vehicleType: 'Cruiser Bike',
    engine: '349cc J-Series Single Cylinder',
    power: '20.2 BHP @ 6100 rpm',
    torque: '27 Nm @ 4000 rpm',
    mileage: '35-40 kmpl',
    capacity: '13 Liters',
    weight: '195 kg',
    seating: '2 Seater',
    transmission: 'Manual',
    features: ['Dual-channel ABS', 'USB Charger Port', 'Retro Instrument Cluster', 'Electric Start', 'Touring Comfort Seats'],
    reviews: [
      { id: 1, name: 'Vikram Singh', rating: 5, date: '19 May 2025', comment: 'Classic thumping ride! Cruising on ECR Pondicherry road with this bike was a dream. The tire grip and comfort was spot on.' },
      { id: 2, name: 'Priya R.', rating: 5, date: '04 May 2025', comment: 'Zero vibration J-series engine. Highly recommended for couples looking to explore Pondicherry Heritage towns at a relaxed pace.' }
    ]
  },
  meteor: {
    brand: 'Royal Enfield',
    model: 'Meteor 350',
    vehicleType: 'Cruiser Bike',
    engine: '349cc J-Series Single Cylinder',
    power: '20.2 BHP @ 6100 rpm',
    torque: '27 Nm @ 4000 rpm',
    mileage: '35-40 kmpl',
    capacity: '15 Liters',
    weight: '191 kg',
    seating: '2 Seater',
    transmission: 'Manual',
    features: ['Dual-channel ABS', 'Tripper Navigation', 'USB Charger Port', 'Cruising Windscreen', 'Backrest Seat Comfort'],
    reviews: [
      { id: 1, name: 'Abhishek G.', rating: 5, date: '20 May 2025', comment: 'Perfect cruising stance. The backrest is highly useful for the pillion rider. Mileage was decent around 37kmpl.' }
    ]
  },
  glanza: {
    brand: 'Toyota',
    model: 'Glanza',
    vehicleType: 'Hatchback',
    engine: '1197cc DualJet K-Series',
    power: '89 BHP @ 6000 rpm',
    torque: '113 Nm @ 4400 rpm',
    mileage: '22 km/l',
    capacity: '37 Liters',
    weight: '960 kg',
    seating: '5 Seater',
    transmission: 'Automatic',
    features: ['9-inch Touchscreen', '360-degree Camera', 'Head-up Display', 'Automatic Climate Control', 'Steering Mounted Controls'],
    reviews: [
      { id: 1, name: 'Rajesh K.', rating: 5, date: '15 May 2025', comment: 'Clean automatic hatchback. Fuel efficiency was surprisingly good. Very easy to park in crowded Pondy streets.' }
    ]
  },
  thar: {
    brand: 'Mahindra',
    model: 'Thar 4x4',
    vehicleType: 'SUV',
    engine: '2184cc mHawk Diesel',
    power: '130 BHP @ 3750 rpm',
    torque: '300 Nm @ 1600-2800 rpm',
    mileage: '12 km/l',
    capacity: '57 Liters',
    weight: '1750 kg',
    seating: '4 Seater',
    transmission: 'Manual',
    features: ['4x4 Low-Range Transfer Case', 'Touchscreen Infotainment', 'Apple CarPlay & Android Auto', 'Roll Cage Protection', 'Removable Hard Top'],
    reviews: [
      { id: 1, name: 'Devanand S.', rating: 5, date: '22 May 2025', comment: 'Renting Thar is the best way to enjoy a group trip! Clean engine, powerful torque. The sound system was incredible.' },
      { id: 2, name: 'Anjali Sharma', rating: 5, date: '10 May 2025', comment: 'Ultimate road presence! Thar was very clean, tires had good thread. Had a fantastic trip to Auroville beach.' }
    ]
  },
  nexon: {
    brand: 'Tata',
    model: 'Nexon SUV',
    vehicleType: 'SUV',
    engine: '1199cc Turbocharged Revotron',
    power: '120 PS @ 5500 rpm',
    torque: '170 Nm @ 1750 rpm',
    mileage: '17.5 km/l',
    capacity: '44 Liters',
    weight: '1230 kg',
    seating: '5 Seater',
    transmission: 'Automatic',
    features: ['Vented Leatherette Seats', 'Digital Dashboard Cluster', 'iRA Connected Car Tech', 'Multi-drive Modes', 'Harman Premium Audio'],
    reviews: [
      { id: 1, name: 'Amit G.', rating: 5, date: '18 May 2025', comment: 'Spacious and solid build. Felt very safe driving with family. Automatic transmission works flawlessly. Highly recommend!' }
    ]
  },
  swift: {
    brand: 'Maruti',
    model: 'Swift',
    vehicleType: 'Hatchback',
    engine: '1197cc DualJet Petrol',
    power: '88.5 BHP @ 6000 rpm',
    torque: '113 Nm @ 4400 rpm',
    mileage: '23 km/l',
    capacity: '37 Liters',
    weight: '875 kg',
    seating: '5 Seater',
    transmission: 'Manual',
    features: ['SmartPlay Studio Touchscreen', 'Keyless Entry & Start', 'ABS with EBD', 'Dual Airbags', 'Idle Start-Stop Tech'],
    reviews: [
      { id: 1, name: 'Harish R.', rating: 5, date: '21 May 2025', comment: 'Swift is always a reliable hatchback. Clean interiors, cold AC. Seamless pick-up from the station.' }
    ]
  },
  activa: {
    brand: 'Honda',
    model: 'Activa 6G',
    vehicleType: 'Scooter',
    engine: '109.51cc Fuel-Injected Fan Cooled',
    power: '7.8 PS @ 8000 rpm',
    torque: '8.8 Nm @ 5500 rpm',
    mileage: '50 kmpl',
    capacity: '5.3 Liters',
    weight: '106 kg',
    seating: '2 Seater',
    transmission: 'Automatic',
    features: ['ESP technology', 'Silent Start ACG', 'External Fuel Lid', 'Telescopic Suspension', 'Engine Start/Stop Switch'],
    reviews: [
      { id: 1, name: 'Meera Nair', rating: 5, date: '30 May 2025', comment: 'Simple, cheap and highly reliable. Ideal for zip-zapping around French Quarter cafes. Delivered with a full tank of fuel.' },
      { id: 2, name: 'Rohan Joshi', rating: 4, date: '14 May 2025', comment: 'Very light and easy. Perfect scooter for budget travelers. Helmet provided was of good quality and sanitized.' }
    ]
  },
  jupiter: {
    brand: 'TVS',
    model: 'Jupiter 125',
    vehicleType: 'Scooter',
    engine: '124.8cc ETFi Air Cooled',
    power: '8.2 PS @ 6500 rpm',
    torque: '10.5 Nm @ 4500 rpm',
    mileage: '48 kmpl',
    capacity: '5.1 Liters',
    weight: '108 kg',
    seating: '2 Seater',
    transmission: 'Automatic',
    features: ['Under-seat large storage (33L)', 'Front External Fuel Fill', 'Metal Body paneling', 'Semi-digital Cluster', 'IntelliGO tech'],
    reviews: [
      { id: 1, name: 'Sanjay Dutt', rating: 5, date: '23 May 2025', comment: 'Extremely spacious floorboard. Underseat storage is massive, fits two helmets easily. Pick up was swift.' }
    ]
  },
  duke: {
    brand: 'KTM',
    model: 'Duke 250',
    vehicleType: 'Sports Bike',
    engine: '249cc Liquid Cooled DOHC',
    power: '30 PS @ 9000 rpm',
    torque: '24 Nm @ 7500 rpm',
    mileage: '35 km/l',
    capacity: '13.4 Liters',
    weight: '170 kg',
    seating: '2 Seater',
    transmission: 'Manual',
    features: ['Supermoto ABS', 'Slipper Clutch', 'LED Headlight', 'WP Apex Suspension', 'Digital Console'],
    reviews: [
      { id: 1, name: 'Kunal K.', rating: 5, date: '16 May 2025', comment: 'Duke 250 has amazing street power. Handles like a scalpel. Bike was in neat condition, clean filters.' }
    ]
  },
  pulsar: {
    brand: 'Bajaj',
    model: 'Pulsar NS200',
    vehicleType: 'Sports Bike',
    engine: '199.5cc Triple Spark DTS-i',
    power: '24.5 PS @ 9750 rpm',
    torque: '18.7 Nm @ 8000 rpm',
    mileage: '38 km/l',
    capacity: '12 Liters',
    weight: '158 kg',
    seating: '2 Seater',
    transmission: 'Manual',
    features: ['Perimeter Frame', 'Liquid Cooling', 'Nitrox Mono Shock', 'Dual Disc ABS', 'Underbelly Exhaust'],
    reviews: [
      { id: 1, name: 'Pranav S.', rating: 5, date: '08 May 2025', comment: 'Legendary performance. Very robust and clean bike. Worth the cheap price.' }
    ]
  },
  hornet: {
    brand: 'Honda',
    model: 'Hornet 2.0',
    vehicleType: 'Sports Bike',
    engine: '184.4cc PGM-FI Air Cooled',
    power: '17.2 PS @ 8500 rpm',
    torque: '16.1 Nm @ 6000 rpm',
    mileage: '40 km/l',
    capacity: '12 Liters',
    weight: '142 kg',
    seating: '2 Seater',
    transmission: 'Manual',
    features: ['Upside Down (USD) Forks', 'Fully Digital Console', 'Hazard Switch', 'Dual Petal Disc brakes', 'Engine Stop Switch'],
    reviews: [
      { id: 1, name: 'Harshit V.', rating: 4, date: '11 May 2025', comment: 'Forks handle bumps really well. Sturdy build and excellent fuel efficiency.' }
    ]
  }
};

const DEFAULT_SPECS = {
  brand: 'Generic',
  model: 'Vehicle',
  vehicleType: 'Rental Vehicle',
  engine: 'Fuel Efficient Engine',
  power: 'Excellent Output',
  torque: 'High Pulling Power',
  mileage: '40-45 kmpl',
  capacity: '10 Liters',
  weight: '130 kg',
  seating: '2 Seater',
  transmission: 'Manual',
  features: ['Anti-lock Braking System', 'Digital Console', 'Alloy Wheels', 'Electric Start'],
  reviews: [
    { id: 1, name: 'Verified User', rating: 5, date: '10 May 2025', comment: 'Riding was very smooth. Seamless pick up and dropping process. Sanitized vehicle.' }
  ]
};

function getVehicleDetails(title) {
  const t = title?.toLowerCase() || '';
  if (t.includes('r15')) return VEHICLE_SPECS_DB.r15;
  if (t.includes('classic 350')) return VEHICLE_SPECS_DB.classic;
  if (t.includes('meteor')) return VEHICLE_SPECS_DB.meteor;
  if (t.includes('glanza')) return VEHICLE_SPECS_DB.glanza;
  if (t.includes('thar')) return VEHICLE_SPECS_DB.thar;
  if (t.includes('nexon')) return VEHICLE_SPECS_DB.nexon;
  if (t.includes('swift')) return VEHICLE_SPECS_DB.swift;
  if (t.includes('activa')) return VEHICLE_SPECS_DB.activa;
  if (t.includes('jupiter')) return VEHICLE_SPECS_DB.jupiter;
  if (t.includes('duke')) return VEHICLE_SPECS_DB.duke;
  if (t.includes('pulsar')) return VEHICLE_SPECS_DB.pulsar;
  if (t.includes('hornet')) return VEHICLE_SPECS_DB.hornet;
  return DEFAULT_SPECS;
}

export default function RentDetail({ vehicle, searchParams, onBack, onNavigate }) {
  const [pickUpDate, setPickUpDate] = useState(searchParams.pickUpDate || '2025-06-21');
  const [dropOffDate, setDropOffDate] = useState(searchParams.dropOffDate || '2025-06-25');
  const [pickUpTime, setPickUpTime] = useState(searchParams.pickUpTime || '10:00 AM');
  const [dropOffTime, setDropOffTime] = useState(searchParams.dropOffTime || '10:00 AM');
  const [pickupLoc, setPickupLoc] = useState(searchParams.location || 'Pondicherry, India');
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeThumb, setActiveThumb] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('form'); // 'form' | 'success'

  // Checkout Form State
  const [fullName, setFullName] = useState('Rohit Kumar');
  const [email, setEmail] = useState('rohit.kumar@gmail.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pickup'); // 'pickup' | 'upi'
  const [bookingId, setBookingId] = useState('');

  // Fetch specs dynamically
  const specs = useMemo(() => {
    return getVehicleDetails(vehicle?.title);
  }, [vehicle]);

  // Calculate rental duration in days
  const totalDays = useMemo(() => {
    const start = new Date(pickUpDate);
    const end = new Date(dropOffDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 2;
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 2;
  }, [pickUpDate, dropOffDate]);

  // Price calculations based on mockup
  const vehiclePricePerDay = vehicle?.price || 699;
  const originalPricePerDay = Math.round((vehiclePricePerDay * 1.28) / 10) * 10 + 9;
  const discountPercent = Math.round(((originalPricePerDay - vehiclePricePerDay) / originalPricePerDay) * 100);

  const rentalCost = vehiclePricePerDay * totalDays;
  const securityDeposit = 2000;
  const totalAmount = rentalCost; // security deposit shown separately as refundable

  // Generate thumbnail array variations using the single transparent image flipped/rotated
  const thumbnails = useMemo(() => {
    return [
      { id: 0, style: {} },
      { id: 1, style: { transform: 'scaleX(-1)' } },
      { id: 2, style: { transform: 'rotate(12deg) scale(0.9)' } },
      { id: 3, style: { transform: 'scale(1.3)', objectFit: 'cover' } },
      { id: 4, style: { transform: 'scaleX(-1) rotate(-5deg)', opacity: 0.4 } }
    ];
  }, [vehicle]);

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    if (!licenseNumber.trim()) {
      alert('Please enter your Driving License Number to continue.');
      return;
    }

    const newId = `TVR-RENT-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingId(newId);

    const rentalBooking = {
      id: newId,
      hotelName: `${vehicle?.title} (${vehicle?.type})`,
      location: `${pickupLoc}`,
      image: vehicle?.image,
      rooms: 1,
      adults: vehicle?.type === 'Car' ? 5 : 2,
      children: 0,
      dates: `${new Date(pickUpDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} · ${new Date(dropOffDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
      nights: totalDays,
      bookedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Confirmed',
      amount: `₹${totalAmount.toLocaleString('en-IN')}`,
      statusDetail: `Collect ride at ${pickupLoc} Branch (${paymentMethod === 'pickup' ? 'Pay on Pick Up' : 'Online Paid'})`,
      isUpcoming: true,
      isRental: true
    };

    const existingBookingsStr = localStorage.getItem('rental_bookings');
    const existing = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
    localStorage.setItem('rental_bookings', JSON.stringify([...existing, rentalBooking]));

    setCheckoutStep('success');
  };

  const timeOptions = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  return (
    <div className="w-full bg-[#FAFBFD] min-h-screen pb-16 rent-page-enter">
      
      {/* ─── BREADCRUMBS SECTION ─── */}
      <div className="mx-auto max-w-[1360px] px-4 pt-6">
        <nav className="flex items-center gap-1.5 text-[11.5px] font-bold text-slate-400 uppercase tracking-wider">
          <span onClick={() => onNavigate('home')} className="hover:text-[#0D9488] cursor-pointer">Home</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-350" />
          <span onClick={onBack} className="hover:text-[#0D9488] cursor-pointer">Rentals</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-350" />
          <span onClick={onBack} className="hover:text-[#0D9488] cursor-pointer">{vehicle?.type || 'Bike'} Rentals</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-350" />
          <span className="text-[#0D9488]">{vehicle?.title || 'Yamaha R15 V4'}</span>
        </nav>
      </div>

      {/* ─── MAIN 2-COLUMN DETAIL LAYOUT ─── */}
      <div className="mx-auto max-w-[1360px] px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: VEHICLE DETAILS & PANELS */}
        <div className="lg:col-span-8 space-y-6 text-left">
          
          {/* TOP SECTION: VISUALS CARD + SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Visual Showcase (col-span-5) */}
            <div className="md:col-span-5 bg-white border border-slate-200/60 rounded-2xl p-4 shadow-3xs flex flex-col gap-4 relative">
              
              {/* Wishlist Heart */}
              <button 
                onClick={() => setWishlisted(!wishlisted)}
                className="absolute top-4.5 right-4.5 h-8.5 w-8.5 rounded-full bg-white border border-slate-100/80 flex items-center justify-center shadow-3xs hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
              >
                <Heart className={`h-4.5 w-4.5 transition-colors ${wishlisted ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
              </button>

              {/* Main Image Viewbox */}
              <div className="h-[240px] w-full bg-slate-50/50 rounded-xl flex items-center justify-center p-6 relative overflow-hidden group">
                {/* Arrow Chevrons */}
                <button className="absolute left-2.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-white/90 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer shadow-3xs z-10">
                  <span className="text-sm font-bold">&lt;</span>
                </button>
                <button className="absolute right-2.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-white/90 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer shadow-3xs z-10">
                  <span className="text-sm font-bold">&gt;</span>
                </button>

                <img 
                  src={vehicle?.image} 
                  alt={vehicle?.title} 
                  className="max-h-full max-w-full object-contain transition-transform duration-500"
                  style={thumbnails[activeThumb]?.style}
                />
              </div>

              {/* Thumbnails strip */}
              <div className="flex justify-center gap-2">
                {thumbnails.map((thumb, idx) => (
                  <div
                    key={thumb.id}
                    onClick={() => setActiveThumb(idx)}
                    className={`h-11 w-14 rounded-lg overflow-hidden border cursor-pointer flex items-center justify-center p-1 bg-slate-50/30 transition-all ${
                      activeThumb === idx 
                        ? 'border-[#0D9488] ring-2 ring-teal-500/10' 
                        : 'border-slate-200/80 hover:border-slate-350'
                    }`}
                  >
                    {idx === 4 ? (
                      <div className="relative h-full w-full flex items-center justify-center">
                        <img src={vehicle?.image} className="h-full w-full object-contain opacity-35" style={thumb.style} />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] font-black text-white rounded-md">
                          +3
                        </div>
                      </div>
                    ) : (
                      <img src={vehicle?.image} className="max-h-full max-w-full object-contain" style={thumb.style} />
                    )}
                  </div>
                ))}
              </div>

            </div>

            {/* Core Specs & Summary (col-span-7) */}
            <div className="md:col-span-7 space-y-4">
              
              <div>
                <span className="bg-teal-50 text-[#0D9488] text-[9.5px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Popular
                </span>
                <h1 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight leading-none mt-2">
                  {vehicle?.title || 'Yamaha R15 V4'}
                </h1>
                
                {/* Rating & Shield info */}
                <div className="flex items-center gap-3 text-[12px] font-semibold text-slate-500 mt-3 pl-0.5">
                  <span className="flex items-center gap-0.5 text-amber-500 font-extrabold">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>{vehicle?.rating || '4.7'}</span>
                  </span>
                  <span className="text-slate-400 font-bold">({specs.reviews.length || 128} Reviews)</span>
                  <span className="text-slate-300">|</span>
                  <span className="flex items-center gap-1 text-slate-450">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488]" />
                    <span>Verified Vehicle</span>
                  </span>
                </div>
              </div>

              {/* Specification pills row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-slate-50 border border-slate-200/80 text-slate-650 text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-3xs">
                  {specs.vehicleType}
                </span>
                <span className="bg-slate-50 border border-slate-200/80 text-slate-655 text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-3xs">
                  {specs.engine.split(' ')[0]}
                </span>
                <span className="bg-slate-50 border border-slate-200/80 text-slate-655 text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-3xs">
                  {specs.seating}
                </span>
                <span className="bg-slate-50 border border-slate-200/80 text-slate-655 text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-3xs">
                  {specs.capacity.split(' ')[0] || 'Petrol'}
                </span>
                <span className="bg-slate-50 border border-slate-200/80 text-slate-655 text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-3xs">
                  {specs.transmission}
                </span>
              </div>

              {/* Description */}
              <div className="pt-1.5">
                <span className="text-[11.5px] font-black text-slate-800 uppercase tracking-wider block mb-1">
                  About this bike
                </span>
                <p className="text-[12.5px] font-medium text-slate-500 leading-relaxed">
                  The {vehicle?.title || 'Yamaha R15 V4'} is a premium sports bike that delivers exhilarating performance and outstanding mileage.
                </p>
              </div>

              {/* Technical Icons Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-2">
                <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
                  <div className="h-6.5 w-6.5 rounded-md bg-teal-50/50 text-[#0D9488] flex items-center justify-center shrink-0">
                    <Gauge className="h-3.5 w-3.5" />
                  </div>
                  <span>{specs.engine}</span>
                </div>
                
                <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
                  <div className="h-6.5 w-6.5 rounded-md bg-teal-50/50 text-[#0D9488] flex items-center justify-center shrink-0">
                    <Fuel className="h-3.5 w-3.5" />
                  </div>
                  <span>{specs.mileage} Mileage</span>
                </div>

                <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
                  <div className="h-6.5 w-6.5 rounded-md bg-teal-50/50 text-[#0D9488] flex items-center justify-center shrink-0">
                    <Cpu className="h-3.5 w-3.5" />
                  </div>
                  <span>{specs.transmission} Transmission</span>
                </div>

                <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
                  <div className="h-6.5 w-6.5 rounded-md bg-teal-50/50 text-[#0D9488] flex items-center justify-center shrink-0">
                    <Fuel className="h-3.5 w-3.5" />
                  </div>
                  <span>{specs.capacity} Fuel Tank</span>
                </div>

                <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
                  <div className="h-6.5 w-6.5 rounded-md bg-teal-50/50 text-[#0D9488] flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <span>ABS Dual Channel</span>
                </div>

                <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
                  <div className="h-6.5 w-6.5 rounded-md bg-teal-50/50 text-[#0D9488] flex items-center justify-center shrink-0">
                    <Clock className="h-3.5 w-3.5" />
                  </div>
                  <span>LED Headlight & Tail Light</span>
                </div>
              </div>

              {/* Serviced / Sanitized Alert */}
              <div className="bg-[#EBFDF8] border border-[#CCF7EC] rounded-xl p-3.5 flex items-center gap-2.5 mt-2.5">
                <div className="h-6 w-6 rounded-full bg-[#14B8A6]/20 text-[#0D9488] flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5 stroke-[3.5]" />
                </div>
                <p className="text-[12px] font-bold text-slate-700 leading-snug">
                  This vehicle is regularly serviced and sanitized for your safety and comfort.
                </p>
              </div>

            </div>

          </div>

          {/* BOTTOM SECTION: TAB SWITCHER & TAB CONTENT */}
          <div className="space-y-4 pt-4">
            
            {/* Tab switch row */}
            <div className="border-b border-slate-200 flex items-center gap-6 overflow-x-auto no-scrollbar pb-0.5">
              {['Overview', 'Features', 'Policies', 'Reviews', 'FAQs'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2.5 text-[13px] font-extrabold relative transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeTab === tab ? 'text-[#0D9488]' : 'text-slate-400 hover:text-slate-650'
                  }`}
                >
                  {tab === 'Overview' && <Info className="h-4 w-4" />}
                  {tab === 'Features' && <Award className="h-4 w-4" />}
                  {tab === 'Policies' && <Shield className="h-4 w-4" />}
                  {tab === 'Reviews' && <Star className="h-4 w-4" />}
                  {tab === 'FAQs' && <Info className="h-4 w-4" />}
                  
                  <span>{tab === 'Reviews' ? `Reviews (${specs.reviews.length})` : tab}</span>
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#0D9488]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Panel Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-3xs">
              
              {/* Overview Tab content */}
              {activeTab === 'Overview' && (
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left Desc */}
                  <div className="flex-1 space-y-3.5">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Overview</h3>
                    <p className="text-[12.5px] font-semibold text-slate-500 leading-relaxed">
                      The {vehicle?.title || 'Yamaha R15 V4'} is built for speed, style, and performance. With its aggressive design, powerful engine, and advanced features, it's the perfect companion for your trips around the city or on highways.
                    </p>
                    <button className="text-[11.5px] font-black text-[#0D9488] flex items-center gap-0.5 hover:underline cursor-pointer">
                      <span>Read More</span>
                      <ChevronRight className="h-3.5 w-3.5 rotate-90" />
                    </button>
                  </div>

                  {/* Right Spec list Table */}
                  <div className="w-full md:w-[280px] shrink-0 border border-slate-100 rounded-xl p-4 bg-slate-50/20">
                    <div className="space-y-2.5 text-[12px] font-semibold">
                      <div className="flex justify-between border-b border-slate-100/60 pb-1.5">
                        <span className="text-slate-400">Brand</span>
                        <span className="text-slate-800 font-extrabold">{specs.brand}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100/60 pb-1.5">
                        <span className="text-slate-400">Model</span>
                        <span className="text-slate-800 font-extrabold">{specs.model}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100/60 pb-1.5">
                        <span className="text-slate-400">Vehicle Type</span>
                        <span className="text-slate-800 font-extrabold">{specs.vehicleType}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100/60 pb-1.5">
                        <span className="text-slate-400">Engine Capacity</span>
                        <span className="text-slate-800 font-extrabold">{specs.engine.split(' ')[0]}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100/60 pb-1.5">
                        <span className="text-slate-400">Fuel Type</span>
                        <span className="text-slate-800 font-extrabold">{specs.capacity.toLowerCase().includes('electric') ? 'Electric' : 'Petrol'}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100/60 pb-1.5">
                        <span className="text-slate-400">Mileage</span>
                        <span className="text-slate-800 font-extrabold">{specs.mileage}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100/60 pb-1.5">
                        <span className="text-slate-400">Transmission</span>
                        <span className="text-slate-800 font-extrabold">{specs.transmission}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100/60 pb-1.5">
                        <span className="text-slate-400">Seating Capacity</span>
                        <span className="text-slate-800 font-extrabold">{specs.seating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Fuel Tank Capacity</span>
                        <span className="text-slate-800 font-extrabold">{specs.capacity}</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Features Tab content */}
              {activeTab === 'Features' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Vehicle Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {specs.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-[12.5px] font-semibold text-slate-600">
                        <div className="h-5 w-5 rounded-full bg-teal-50 text-[#0D9488] flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Policies Tab content */}
              {activeTab === 'Policies' && (
                <div className="space-y-4 text-[12.5px] font-semibold text-slate-650 leading-relaxed">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Rental Policy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <p className="font-extrabold text-slate-850">Required Documents</p>
                      <p className="text-xs text-slate-500 leading-normal">Please present your Original Driving License and Aadhar Card/Passport during pick-up. Photocopies or digital copies are not accepted.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-extrabold text-slate-850">Fuel Policy</p>
                      <p className="text-xs text-slate-500 leading-normal">Full to Full. The vehicle is provided with a full tank of petrol and must be returned with a full tank, else refueling fees apply.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-extrabold text-slate-850">Refundable Security Deposit</p>
                      <p className="text-xs text-slate-500 leading-normal">A refundable security deposit of ₹2,000 is collected at the time of pick-up. It is refunded instantly upon returning the vehicle safely.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-extrabold text-slate-850">Speed Limits</p>
                      <p className="text-xs text-slate-500 leading-normal">For self-drive safety, bikes are limited to 70 km/h and cars to 90 km/h. Overspeeding triggers automatic warning systems.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab content */}
              {activeTab === 'Reviews' && (
                <div className="space-y-5">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Rider Reviews</h3>
                  <div className="divide-y divide-slate-100 space-y-4">
                    {specs.reviews.map((rev) => (
                      <div key={rev.id} className="pt-4 first:pt-0 text-left">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8.5 w-8.5 rounded-full bg-teal-50 text-[#0D9488] flex items-center justify-center font-black text-xs border border-teal-100">
                              {rev.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="text-[12.5px] font-black text-slate-800 leading-none">{rev.name}</h4>
                              <span className="text-[10px] text-slate-400 font-bold block mt-1">{rev.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-[12px] font-semibold text-slate-550 leading-relaxed mt-2 pl-10.5">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs Tab content */}
              {activeTab === 'FAQs' && (
                <div className="space-y-4 text-[12.5px] font-semibold text-slate-650 leading-relaxed">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Frequently Asked Questions</h3>
                  <div className="space-y-3.5">
                    <div>
                      <p className="font-extrabold text-slate-850">Q: What is the age limit to rent a vehicle?</p>
                      <p className="text-xs text-slate-500 leading-normal mt-0.5">A: You must be at least 21 years of age and hold a valid active driving license to reserve self-drive fleets.</p>
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-850">Q: Is helmet provided with the bike?</p>
                      <p className="text-xs text-slate-500 leading-normal mt-0.5">A: Yes, we provide one clean, sanitized high-quality helmet with bike rentals for free. Pillion helmet is available on request.</p>
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-850">Q: Can I extend my rental period mid-trip?</p>
                      <p className="text-xs text-slate-500 leading-normal mt-0.5">A: Extension is subject to vehicle availability. Please call support or contact the branch to request extension before your return window closes.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* GUARANTEE FOOTER STRIP */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-slate-200/60 p-4.5 rounded-2xl shadow-3xs text-[11px] font-semibold text-slate-500">
            <div className="flex gap-2">
              <Check className="h-4.5 w-4.5 text-[#0F172A] shrink-0 mt-0.5" />
              <div>
                <p className="font-black text-[#0F172A] text-[11.5px]">Best Price Guarantee</p>
                <p className="text-slate-400 mt-0.5 leading-normal">Get the best rates or we'll match it.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-[#0F172A] shrink-0 mt-0.5" />
              <div>
                <p className="font-black text-[#0F172A] text-[11.5px]">Verified Vehicles</p>
                <p className="text-slate-400 mt-0.5 leading-normal">All vehicles are verified and insured.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <svg className="h-4.5 w-4.5 text-[#0F172A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
              <div>
                <p className="font-black text-[#0F172A] text-[11.5px]">24/7 Support</p>
                <p className="text-slate-400 mt-0.5 leading-normal">We're here to help, anytime.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Calendar className="h-4.5 w-4.5 text-[#0F172A] shrink-0 mt-0.5" />
              <div>
                <p className="font-black text-[#0F172A] text-[11.5px]">Easy Booking</p>
                <p className="text-slate-400 mt-0.5 leading-normal">Book in minutes, ride in seconds.</p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: BOOKING ESTIMATOR & NEED HELP */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Booking Estimator Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-md text-left space-y-5 sticky top-[152px]">
            
            {/* Price header */}
            <div className="flex items-center gap-3 pb-3.5 border-b border-slate-100">
              <div>
                <span className="text-[20px] font-black text-[#0D9488]">₹{vehiclePricePerDay}</span>
                <span className="text-[12px] font-bold text-slate-400"> / day</span>
              </div>
              <span className="text-slate-400 text-[12px] font-semibold line-through ml-auto">
                ₹{originalPricePerDay}
              </span>
              <span className="bg-[#EBFDF8] border border-[#CCF7EC] text-[#0D9488] text-[11px] font-black px-2 py-0.5 rounded-lg shadow-3xs">
                {discountPercent}% OFF
              </span>
            </div>
            <p className="text-[10.5px] font-bold text-slate-400 -mt-2">Price includes GST</p>

            {/* Date Time Picker Fields */}
            <div className="space-y-4">
              
              {/* Pick-up */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-0.5">Pick-up Date & Time</label>
                <div className="grid grid-cols-5 gap-2">
                  {/* Date box with invisible overlay */}
                  <div className="col-span-3 relative flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 cursor-pointer focus-within:border-[#0D9488] shadow-3xs">
                    <span className="text-[11.5px] font-semibold text-slate-800 flex items-center gap-1.5 whitespace-nowrap">
                      <Calendar className="h-4 w-4 text-[#0D9488] shrink-0" />
                      <span>{new Date(pickUpDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </span>
                    <input 
                      type="date"
                      value={pickUpDate}
                      onChange={(e) => setPickUpDate(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                  </div>
                  {/* Time box */}
                  <div className="col-span-2 relative">
                    <select
                      value={pickUpTime}
                      onChange={(e) => setPickUpTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 text-[11.5px] font-semibold text-slate-800 outline-none appearance-none focus:border-[#0D9488] cursor-pointer shadow-3xs"
                    >
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Return */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-0.5">Return Date & Time</label>
                <div className="grid grid-cols-5 gap-2">
                  {/* Date box with invisible overlay */}
                  <div className="col-span-3 relative flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 cursor-pointer focus-within:border-[#0D9488] shadow-3xs">
                    <span className="text-[11.5px] font-semibold text-slate-800 flex items-center gap-1.5 whitespace-nowrap">
                      <Calendar className="h-4 w-4 text-[#0D9488] shrink-0" />
                      <span>{new Date(dropOffDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </span>
                    <input 
                      type="date"
                      value={dropOffDate}
                      onChange={(e) => setDropOffDate(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                  </div>
                  {/* Time box */}
                  <div className="col-span-2 relative">
                    <select
                      value={dropOffTime}
                      onChange={(e) => setDropOffTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 text-[11.5px] font-semibold text-slate-800 outline-none appearance-none focus:border-[#0D9488] cursor-pointer shadow-3xs"
                    >
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Pickup Location */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-0.5">Pickup Location</label>
                <div className="relative">
                  <select
                    value={pickupLoc}
                    onChange={(e) => setPickupLoc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-8 py-2.5 text-[11.5px] font-semibold text-slate-800 outline-none appearance-none focus:border-[#0D9488] cursor-pointer shadow-3xs"
                  >
                    <option value="Pondicherry, India">Pondicherry, India</option>
                    <option value="Auroville, India">Auroville, India</option>
                    <option value="Goa, India">Goa, India</option>
                  </select>
                  <MapPin className="h-4 w-4 text-[#0D9488] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Calculations pricing list */}
            <div className="space-y-2.5 border-t border-slate-100 pt-4 text-[12.5px] font-semibold text-slate-500">
              <div className="flex items-center justify-between">
                <span>{totalDays} Days Rental</span>
                <span className="text-slate-800 font-extrabold">₹{rentalCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <span>Security Deposit</span>
                  <Info className="h-3.5 w-3.5 text-slate-400" />
                </span>
                <span className="text-slate-800 font-extrabold">₹{securityDeposit.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-between text-base font-black text-slate-900 border-t border-slate-100 pt-3.5 mt-2">
                <span>Total Amount</span>
                <span className="text-[#0D9488] text-[18px]">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Submit Reservation trigger */}
            <button 
              onClick={() => setShowCheckout(true)}
              className="w-full bg-[#0D9488] hover:bg-[#0b7d73] text-white py-3.5 rounded-xl text-center text-sm font-extrabold active:scale-98 transition-all shadow-md shadow-teal-850/10 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Continue to Book</span>
              <ChevronRight className="h-4 w-4 stroke-[2.5]" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#0D9488] -mt-1 leading-none">
              <ShieldCheck className="h-4 w-4" />
              <span>Free Cancellation up to 24 hours</span>
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
                    <span className="text-[14px] font-black text-[#0D9488]">₹{totalAmount.toLocaleString('en-IN')}</span>
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-[12.5px] font-semibold text-slate-800 outline-none focus:border-[#0D9488]"
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
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-[12.5px] font-semibold text-slate-800 outline-none focus:border-[#0D9488]"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider pl-0.5">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-[12.5px] font-semibold text-slate-800 outline-none focus:border-[#0D9488]"
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-[12.5px] font-semibold text-slate-800 placeholder-slate-400 outline-none focus:border-[#0D9488]"
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
                            ? 'border-[#0D9488] bg-teal-50/20 text-[#0D9488]'
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
                            ? 'border-[#0D9488] bg-teal-50/20 text-[#0D9488]'
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
                      <span className="text-[10px] font-bold text-slate-500">Scan QR Code using any UPI App to pay ₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full bg-[#0D9488] hover:bg-[#0b7d73] text-white py-3.5 rounded-2xl text-center text-sm font-extrabold shadow-md active:scale-98 transition-all mt-4 cursor-pointer"
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
                <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 w-full text-[12.5px] font-semibold text-slate-600 flex flex-col gap-2">
                  <div className="flex justify-between border-b border-slate-150 pb-2">
                    <span className="text-slate-400">Booking Reference</span>
                    <strong className="text-slate-800 font-black">{bookingId}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-150 pb-2 pt-1">
                    <span className="text-slate-400">Vehicle</span>
                    <span className="text-slate-800 font-bold">{vehicle?.title}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">Pick Up Point</span>
                    <span className="text-[#0D9488] font-bold">Pondicherry Branch</span>
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
                    className="w-full bg-[#0D9488] hover:bg-[#0b7d73] text-white py-3.5 rounded-xl text-xs font-extrabold shadow-sm active:scale-98 transition-all cursor-pointer"
                  >
                    Go to My Bookings
                  </button>
                  <button 
                    onClick={() => {
                      setShowCheckout(false);
                      setCheckoutStep('form');
                      onBack();
                    }}
                    className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 py-3.5 rounded-xl text-xs font-extrabold active:scale-98 transition-all cursor-pointer"
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

// Simple Helper Icon component for Select elements
function ChevronDownIcon({ className = "" }) {
  return (
    <svg className={`h-4 w-4 text-slate-400 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
