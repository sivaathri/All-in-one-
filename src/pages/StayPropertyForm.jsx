import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Save, ArrowRight, ShieldCheck, Gift, MapPin, Plus, Trash2, Info, Undo2, Redo2, Bold, Italic, Underline, List, ListOrdered } from 'lucide-react';
import stayPropertyImg from '../assets/step2.png';
import puducherryMapImg from '../assets/puducherry_map.png';
import step3Img from '../assets/step3.png';

export default function StayPropertyForm({ onBack }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Step 1 States
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState('Hotel');

  // Step 2 States
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [countryVal, setCountryVal] = useState('');
  const [zipVal, setZipVal] = useState('');

  // Step 3 States (Dynamic pills flow)
  const [selectedRoomPills, setSelectedRoomPills] = useState([]);
  const [roomConfigs, setRoomConfigs] = useState({});
  const [isRoomTypeDropdownOpen, setIsRoomTypeDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState('');

  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsRoomTypeDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Step 4 States
  const [selectedAmenities, setSelectedAmenities] = useState(['Free Wi-Fi', 'Air Conditioning', 'Free Parking', 'Housekeeping']);

  // Step 5 (Property Rules & Policies) States
  const [checkInTime, setCheckInTime] = useState('14:00');
  const [checkOutTime, setCheckOutTime] = useState('11:00');
  const [minAge, setMinAge] = useState('18');
  const [acceptedIds, setAcceptedIds] = useState(['Aadhar', 'Govt ID']);
  const [unmarriedCouplesAllowed, setUnmarriedCouplesAllowed] = useState('No');
  const [maleOnlyGroupsAllowed, setMaleOnlyGroupsAllowed] = useState('No');
  const [scantyBaggageAllowed, setScantyBaggageAllowed] = useState('No');
  const [smokingAllowedStr, setSmokingAllowedStr] = useState('No');
  const [alcoholAllowed, setAlcoholAllowed] = useState('No');
  const [nonVegAllowed, setNonVegAllowed] = useState('No');
  const [outsideFoodAllowed, setOutsideFoodAllowed] = useState('No');
  const [foodDeliveryOptions, setFoodDeliveryOptions] = useState(['Zomato', 'Swiggy']);
  const [wheelchairAccessible, setWheelchairAccessible] = useState('No');
  const [wheelchairProvided, setWheelchairProvided] = useState('No');
  const [petsAllowedStr, setPetsAllowedStr] = useState('No');
  const [petsOnProperty, setPetsOnProperty] = useState('No');
  const [extraMattressChild, setExtraMattressChild] = useState('0');
  const [extraMattressAdult, setExtraMattressAdult] = useState('0');
  const [extraCotCost, setExtraCotCost] = useState('0');
  const [additionalRules, setAdditionalRules] = useState('');

  // Step 6 States (Amenities)
  // Already has selectedAmenities defined above

  // Step 7 States (Photos)
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [photoError, setPhotoError] = useState('');

  // Step 8 States (About this property)
  const [distanceBeach, setDistanceBeach] = useState('0.0');
  const [distanceRailway, setDistanceRailway] = useState('0.0');
  const [distanceAirport, setDistanceAirport] = useState('0.0');
  const [distanceBus, setDistanceBus] = useState('0.0');
  const [allowedGuestTypes, setAllowedGuestTypes] = useState(['Married Couples', 'Families', 'Solo Travelers', 'Friends']);
  const [instantBooking, setInstantBooking] = useState('No');
  const [manualApproval, setManualApproval] = useState('Yes');
  const [aboutPropertyText, setAboutPropertyText] = useState('');

  // Step 7 States (Pricing & Availability)
  const [roomPrices, setRoomPrices] = useState({
    Single: '',
    Double: ''
  });
  const [occupancyAdjustments, setOccupancyAdjustments] = useState({
    Single: [
      { id: 1, guests: '1', extraPrice: '0' },
      { id: 2, guests: '1', extraPrice: '0' }
    ],
    Double: [
      { id: 1, guests: '1', extraPrice: '0' }
    ]
  });
  const [childAgeRanges, setChildAgeRanges] = useState([
    { id: 1, ageFrom: '0', ageTo: '0', price: '0', priceType: 'Fixed Amount (₹)' }
  ]);
  const [instantPayment, setInstantPayment] = useState(true);
  const [freeCancellation, setFreeCancellation] = useState(true);
  const [refundPolicies, setRefundPolicies] = useState([
    { id: 1, type: 'Select a policy', daysBefore: '', percentage: '' }
  ]);

  // Synchronized room capacities state and dynamic synchronizer
  const [roomCapacities, setRoomCapacities] = useState({});

  useEffect(() => {
    // 1. Sync room prices
    setRoomPrices(prev => {
      const updated = { ...prev };
      let changed = false;
      selectedRoomPills.forEach(pill => {
        if (updated[pill] === undefined) {
          updated[pill] = '';
          changed = true;
        }
      });
      return changed ? updated : prev;
    });

    // 2. Sync occupancy adjustments
    setOccupancyAdjustments(prev => {
      const updated = { ...prev };
      let changed = false;
      selectedRoomPills.forEach(pill => {
        if (updated[pill] === undefined) {
          updated[pill] = [
            { id: Date.now() + Math.random(), guests: '1', extraPrice: '0' }
          ];
          changed = true;
        }
      });
      return changed ? updated : prev;
    });

    // 3. Sync room capacities based on Room Setup quantities
    setRoomCapacities(prev => {
      const updated = { ...prev };
      let changed = false;
      selectedRoomPills.forEach(pill => {
        const qtyStr = roomConfigs[pill]?.quantity || '1';
        const qty = parseInt(qtyStr, 10) || 1;
        const currentArr = updated[pill] || [];
        if (currentArr.length !== qty) {
          const newArr = [];
          for (let i = 0; i < qty; i++) {
            if (currentArr[i]) {
              newArr.push(currentArr[i]);
            } else {
              let defAdults = 2;
              let defChildren = 0;
              if (pill.toLowerCase().includes('single')) {
                defAdults = 1;
              } else if (pill.toLowerCase().includes('triple')) {
                defAdults = 3;
              } else if (pill.toLowerCase().includes('quad') || pill.toLowerCase().includes('family')) {
                defAdults = 4;
              }
              newArr.push({ adults: defAdults, children: defChildren });
            }
          }
          updated[pill] = newArr;
          changed = true;
        }
      });
      return changed ? updated : prev;
    });
  }, [selectedRoomPills, roomConfigs]);

  // Enforce occupancy adjustments cap when room capacities change
  useEffect(() => {
    setOccupancyAdjustments(prev => {
      const updated = { ...prev };
      let changed = false;
      selectedRoomPills.forEach(roomType => {
        const qtyStr = roomConfigs[roomType]?.quantity || '1';
        const qty = parseInt(qtyStr, 10) || 1;
        const capacities = roomCapacities[roomType] || Array(qty).fill({ adults: 2, children: 0 });
        const totalGuests = capacities.reduce((sum, cap) => sum + (parseInt(cap.adults, 10) || 0) + (parseInt(cap.children, 10) || 0), 0);

        const list = updated[roomType] || [];
        
        // 1. Slice list if it has more items than totalGuests
        let newList = list;
        if (list.length > totalGuests) {
          newList = list.slice(0, totalGuests);
          changed = true;
        }

        // 2. Cap existing adjustments
        let capChanged = false;
        newList = newList.map(adj => {
          const g = parseInt(adj.guests, 10) || 1;
          if (g > totalGuests) {
            capChanged = true;
            return { ...adj, guests: String(totalGuests) };
          }
          return adj;
        });

        if (changed || capChanged) {
          updated[roomType] = newList;
          changed = true;
        }
      });
      return changed ? updated : prev;
    });
  }, [roomCapacities, selectedRoomPills, roomConfigs]);

  const roomTypesOptions = [
    'Single', 'Double', 'Twin', 'Twin/Double', 'Triple', 'Quadruple', 'Family', 
    'Suite', 'Studio', 'Apartment', 'Dormitory Room', 'Bed in Dormitory', 
    'Bungalow', 'Chalet', 'Villa', 'Holiday Home', 'Mobile Home', 'Tent', '1 BHK' , '2BHK' , '3BHK', '4BHK', '5BHK', '6BHK'
  ];

  const floorOptions = [
    'Select Floor', 'Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', 
    '4th Floor', '5th Floor', '6th Floor', '7th Floor', '8th Floor', '9th Floor', '10th Floor', '11th Floor', '12th Floor', '13th Floor', '14th Floor', '15th Floor', '16th Floor', '17th Floor', '18th Floor', '19th Floor', '20th Floor'
  ];

  const steps = [
    { number: 1, title: 'Basic Information', desc: 'Add basic details about your property', active: currentStep === 1, completed: currentStep > 1 },
    { number: 2, title: 'Location Details', desc: 'Add address and map location', active: currentStep === 2, completed: currentStep > 2 },
    { number: 3, title: 'Room Setup', desc: 'Add your room types and quantity', active: currentStep === 3, completed: currentStep > 3 },
    { number: 4, title: 'Pricing & Availability', desc: 'Set room pricing and adjustments', active: currentStep === 4, completed: currentStep > 4 },
    { number: 5, title: 'Property Rules & Policies', desc: 'Add rules and policies for guests', active: currentStep === 5, completed: currentStep > 5 },
    { number: 6, title: 'Facilities & Amenities', desc: 'Select facilities and amenities available', active: currentStep === 6, completed: currentStep > 6 },
    { number: 7, title: 'Photos', desc: 'Upload property photos', active: currentStep === 7, completed: currentStep > 7 },
    { number: 8, title: 'About this property', desc: 'Set distances, booking rules and preferences', active: currentStep === 8, completed: currentStep > 8 },
  ];

  const propertyTypes = [
    {
      id: 'Hotel',
      title: 'Hotel',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 40V14C12 12.8954 12.8954 12 14 12H34C35.1046 12 36 12.8954 36 14V40" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M8 40H40" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="16" y="18" width="4" height="4" rx="0.5" fill="#E6F4EA" stroke="#16A34A" strokeWidth="1.5" />
          <rect x="28" y="18" width="4" height="4" rx="0.5" fill="#E6F4EA" stroke="#16A34A" strokeWidth="1.5" />
          <rect x="16" y="26" width="4" height="4" rx="0.5" fill="#E6F4EA" stroke="#16A34A" strokeWidth="1.5" />
          <rect x="28" y="26" width="4" height="4" rx="0.5" fill="#E6F4EA" stroke="#16A34A" strokeWidth="1.5" />
          <path d="M21 40V34C21 32.8954 21.8954 32 23 32H25C26.1046 32 27 32.8954 27 34V40" fill="#16A34A" />
          <path d="M24 4L25.2 6.8L28.2 7L25.8 9L26.6 12L24 10.2L21.4 12L22.2 9L19.8 7L22.8 6.8L24 4Z" fill="#16A34A" />
          <path d="M17 7L17.8 9.1L20 9.2L18.2 10.7L18.8 13L17 11.6L15.2 13L15.8 10.7L14 9.2L16.2 9.1L17 7Z" fill="#16A34A" opacity="0.6" />
          <path d="M31 7L31.8 9.1L34 9.2L32.2 10.7L32.8 13L31 11.6L29.2 13L29.8 10.7L28 9.2L30.2 9.1L31 7Z" fill="#16A34A" opacity="0.6" />
        </svg>
      ),
    },
    {
      id: 'Apartment',
      title: 'Apartment',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="8" width="18" height="34" rx="2" stroke="#2563EB" strokeWidth="2.5" />
          <path d="M10 42H38" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="19" y="13" width="3" height="3" rx="0.5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
          <rect x="26" y="13" width="3" height="3" rx="0.5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
          <rect x="19" y="19" width="3" height="3" rx="0.5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
          <rect x="26" y="19" width="3" height="3" rx="0.5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
          <rect x="19" y="25" width="3" height="3" rx="0.5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
          <rect x="26" y="25" width="3" height="3" rx="0.5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
          <rect x="19" y="31" width="3" height="3" rx="0.5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
          <rect x="26" y="31" width="3" height="3" rx="0.5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
          <rect x="22" y="37" width="4" height="5" fill="#2563EB" />
        </svg>
      ),
    },
    {
      id: 'Hut House',
      title: 'Hut House',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 24L24 10L40 24" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 24V40H36V24" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 40V32C21 30.8954 21.8954 30 23 30H25C26.1046 30 27 30.8954 27 32V40" fill="#D97706" />
          <circle cx="24" cy="18" r="3" stroke="#D97706" strokeWidth="2" fill="#FEF3C7" />
          <path d="M16 17L14 19M32 17L34 19M24 12V8" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'Resort',
      title: 'Resort',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 34H42" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M12 34V20H28V34" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M10 20H30L20 12L10 20Z" fill="#F3E8FF" stroke="#7C3AED" strokeWidth="2" />
          <path d="M36 34C36 26 34 22 38 16" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
          <path d="M38 16C36 14 32 15 32 15M38 16C40 14 44 15 44 15M38 16C39 18 41 21 41 21M38 16C37 18 35 21 35 21" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'Beach House',
      title: 'Beach House',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 38C12 38 14 40 20 40C26 40 28 38 34 38C40 38 42 40 46 40" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          <rect x="10" y="18" width="16" height="20" rx="1" stroke="#0284C7" strokeWidth="2" fill="#EFF6FF" />
          <path d="M8 18L18 10L28 18" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M36 38V24" stroke="#0284C7" strokeWidth="1.5" />
          <path d="M30 24C30 20 36 17 36 17C36 17 42 20 42 24H30Z" fill="#0284C7" />
        </svg>
      ),
    },
    {
      id: 'Villa',
      title: 'Villa',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="20" width="18" height="20" rx="1" stroke="#EA580C" strokeWidth="2.5" fill="#FFF7ED" />
          <rect x="22" y="14" width="18" height="26" rx="1" stroke="#EA580C" strokeWidth="2.5" fill="#FFF7ED" />
          <path d="M6 20L17 12L28 20" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 14L31 6L42 14" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  if (isSubmitted) {
    return (
      <main
        style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
        className="min-h-screen bg-[#FAFAFA] pt-12 pb-24 px-4 flex flex-col justify-center items-center"
      >
        <div className="max-w-[600px] w-full bg-white rounded-3xl border border-slate-100 p-10 shadow-lg text-center flex flex-col items-center gap-6 animate-fade-step">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E6F4EA] text-[#007F55] shadow-inner mb-2">
            <svg className="w-10 h-10 stroke-[3] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-extrabold text-slate-900">Listing Submitted!</h2>
          <p className="text-[15px] font-medium text-slate-500 max-w-md mx-auto leading-relaxed">
            Congratulations! Your property <strong>{propertyName || 'Luxury Stay Villa'}</strong> has been successfully listed and is now <strong>waiting for approval</strong>. Our team will review the details and publish it live within 24 hours.
          </p>

          <div className="w-full bg-[#E6F4EA]/30 border border-emerald-500/10 rounded-2xl p-5 text-left mt-2 flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <span className="text-[13px] font-bold text-emerald-800">✓ Listing Status:</span>
              <span className="bg-[#FEF3C7] text-[#D97706] text-[10.5px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Waiting for Approval</span>
            </div>
            <div className="flex gap-3 items-center">
              <span className="text-[13px] font-bold text-emerald-800">✓ Launch Promotion:</span>
              <span className="text-[13px] font-bold text-slate-700">3 Months Free Subscription Active 🎁</span>
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-4 mt-6 justify-center">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                onBack();
              }}
              className="rounded-xl bg-[#007F55] hover:bg-[#006644] px-8 py-3.5 text-[14px] font-bold text-white shadow-md active:scale-95 transition-all cursor-pointer w-full sm:w-auto"
            >
              Go to Host Dashboard
            </button>
            <button
              onClick={onBack}
              className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-8 py-3.5 text-[14px] font-bold text-slate-700 active:scale-95 transition-all cursor-pointer w-full sm:w-auto"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  const renderYesNoToggle = (label, value, onChange) => (
    <div className="flex flex-col gap-2 p-4 rounded-xl border border-slate-100 bg-slate-50/30 text-left">
      <span className="text-[13px] font-bold text-slate-750 leading-snug">{label}</span>
      <div className="flex rounded-xl border border-slate-200 p-1 bg-slate-100/50 w-fit mt-1">
        <button
          type="button"
          onClick={() => onChange('Yes')}
          className={`px-5 py-1.5 rounded-lg text-[12px] font-extrabold transition-all cursor-pointer ${
            value === 'Yes'
              ? 'bg-[#007F55] text-white shadow-xs'
              : 'text-slate-550 hover:text-slate-800'
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange('No')}
          className={`px-5 py-1.5 rounded-lg text-[12px] font-extrabold transition-all cursor-pointer ${
            value === 'No'
              ? 'bg-[#007F55] text-white shadow-xs'
              : 'text-slate-550 hover:text-slate-800'
          }`}
        >
          No
        </button>
      </div>
    </div>
  );

  return (
    <main
      style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
      className="min-h-screen bg-[#FAFAFA] pt-4 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between"
    >
      <style>{`
        @keyframes fadeStep {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-step {
          animation: fadeStep 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .editor-content:empty:before {
          content: attr(placeholder);
          color: #94A3B8;
          cursor: text;
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto w-full flex-grow">
        {/* Back to Home Navigation */}
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-[15px] font-semibold text-slate-600 hover:text-[#007F55] transition-colors duration-200 cursor-pointer mb-6"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>

        {/* Sidebar & Form grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar */}
          <aside className="w-full lg:w-[320px] bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between shrink-0">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 text-left mb-2">Become a Host</h2>
              <p className="text-[13px] font-medium text-slate-500 text-left mb-8">
                List your property and start welcoming guests.
              </p>

              {/* Steps Vertical List */}
              <div className="space-y-4">
                {steps.map((step) => (
                  <div 
                    key={step.number} 
                    className={`flex justify-between items-start text-left p-2.5 rounded-xl transition-all ${
                      step.active ? 'bg-[#E6F4EA]/40' : ''
                    }`}
                  >
                    <div className="flex gap-4 items-start">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-200 ${
                          step.active
                            ? 'bg-[#007F55] text-white'
                            : step.completed
                            ? 'bg-[#E6F4EA] text-[#007F55]'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {step.number}
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={`text-[14px] font-bold ${
                            step.active ? 'text-slate-950 font-semibold' : 'text-slate-500 font-normal'
                          }`}
                        >
                          {step.title}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400 mt-0.5 leading-snug">
                          {step.desc}
                        </span>
                      </div>
                    </div>
                    {step.completed && (
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E6F4EA] text-[#007F55] mt-1.5 shadow-xs">
                        <svg className="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Offer Card */}
            <div className="mt-10 rounded-xl bg-[#E6F4EA]/30 border border-emerald-500/10 p-4 text-left flex gap-3.5 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100/40">
                <Gift className="h-5 w-5 text-[#007F55]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-slate-800 leading-snug">Launch Offer</span>
                <span className="text-[11px] font-medium text-slate-500 mt-1 leading-snug">
                  It's free to list your business for 3 months. 🎁
                </span>
              </div>
            </div>
          </aside>

          {/* Right Content Area */}
          <section className="flex-1 w-full">
            <div key={currentStep} className="animate-fade-step flex flex-col gap-6">
              
              {currentStep === 1 && (
                <>
                  {/* Step 1 Header Block */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007F55] text-white text-sm font-bold">
                          1
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Step 1: Basic Information</h3>
                      </div>
                      <p className="text-[14px] font-medium text-slate-500 pl-11">
                        Let's start with some basic details about your property.
                      </p>
                    </div>
                    <div className="shrink-0 max-w-[120px] self-end sm:self-center">
                      <img
                        src={stayPropertyImg}
                        alt="Stay Property Illustration"
                        className="w-full h-auto object-contain select-none pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Form Box */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-8 flex flex-col gap-8 text-left">
                    {/* Property Name Input */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[15px] font-bold text-slate-800 flex items-center gap-1">
                        Property Name <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[12px] font-medium text-slate-400">
                        Enter the name of your property
                      </span>
                      <input
                        type="text"
                        placeholder="Enter property name"
                        value={propertyName}
                        onChange={(e) => setPropertyName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-[#007F55] focus:ring-1 focus:ring-[#007F55] transition-all"
                      />
                    </div>

                    {/* Property Type Grid */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[15px] font-bold text-slate-800 flex items-center gap-1">
                        Property Type <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[12px] font-medium text-slate-400 mb-2">
                        Select the type that best describes your property
                      </span>

                      {/* Horizontal Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {propertyTypes.map((type) => {
                          const isSelected = propertyType === type.id;
                          return (
                            <div
                              key={type.id}
                              onClick={() => setPropertyType(type.id)}
                              className={`group relative flex flex-col items-center justify-center rounded-2xl border p-5 text-center transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? 'border-[#007F55] bg-emerald-50/5'
                                  : 'border-slate-100 hover:border-slate-200 bg-white'
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#007F55] text-white">
                                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}

                              <div className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50/50 group-hover:scale-105 transition-transform">
                                {type.icon}
                              </div>
                              <span className="text-[13px] font-bold text-slate-700">
                                {type.title}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  {/* Step 2 Header Block */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007F55] text-white text-sm font-bold">
                          2
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Step 2: Location Details</h3>
                      </div>
                      <p className="text-[14px] font-medium text-slate-500 pl-11">
                        Provide the address and exact location of your property.
                      </p>
                    </div>
                    <div className="shrink-0 max-w-[120px] self-end sm:self-center">
                      <img
                        src={stayPropertyImg}
                        alt="Stay Property Illustration"
                        className="w-full h-auto object-contain select-none pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Form Box Location */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                    {/* Left Column Address Input fields */}
                    <div className="lg:col-span-6 flex flex-col gap-5">
                      {/* Address Line 1 */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[14px] font-bold text-slate-800">
                          Address Line 1 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Street address"
                          value={addressLine1}
                          onChange={(e) => setAddressLine1(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-[#007F55] focus:ring-1 focus:ring-[#007F55] transition-all"
                        />
                      </div>

                      {/* Address Line 2 */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[14px] font-bold text-slate-800">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          placeholder="Apartment, suite, unit, etc. (optional)"
                          value={addressLine2}
                          onChange={(e) => setAddressLine2(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-[#007F55] focus:ring-1 focus:ring-[#007F55] transition-all"
                        />
                      </div>

                      {/* City */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[14px] font-bold text-slate-800">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-[#007F55] focus:ring-1 focus:ring-[#007F55] transition-all"
                        />
                      </div>

                      {/* State & Country Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[14px] font-bold text-slate-800">
                            State / Province <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={stateVal}
                            onChange={(e) => setStateVal(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[14px] font-medium text-slate-700 outline-none focus:border-[#007F55] focus:ring-1 focus:ring-[#007F55] transition-all cursor-pointer"
                          >
                            <option value="">Select state / province</option>
                            <option value="Pondicherry">Pondicherry</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[14px] font-bold text-slate-800">
                            Country <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={countryVal}
                            onChange={(e) => setCountryVal(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[14px] font-medium text-slate-700 outline-none focus:border-[#007F55] focus:ring-1 focus:ring-[#007F55] transition-all cursor-pointer"
                          >
                            <option value="">Select country</option>
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                          </select>
                        </div>
                      </div>

                      {/* Zip / Postal Code */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[14px] font-bold text-slate-800">
                          Zip / Postal Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter zip / postal code"
                          value={zipVal}
                          onChange={(e) => setZipVal(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-[#007F55] focus:ring-1 focus:ring-[#007F55] transition-all"
                        />
                      </div>
                    </div>

                    {/* Right Column Map Selection */}
                    <div className="lg:col-span-6 flex flex-col gap-4">
                      <div>
                        <label className="text-[14px] font-bold text-slate-800 flex items-center gap-1">
                          Select Location on Map <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[12px] font-medium text-slate-400">
                          Drag the pin to the exact location of your property.
                        </span>
                      </div>

                      {/* Live Google Map Container */}
                      <div className="relative w-full h-[290px] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-50">
                        <iframe
                          title="Live Location Map"
                          src={`https://maps.google.com/maps?q=${encodeURIComponent(
                            (addressLine1 ? addressLine1 + ', ' : '') + (city || 'Puducherry') + ', ' + (stateVal || '') + ' ' + (zipVal || '') + ', ' + (countryVal || 'India')
                          )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-full rounded-2xl"
                        ></iframe>
                      </div>

                      {/* Light Green Tip bar */}
                      <div className="w-full bg-[#E6F4EA]/25 border border-emerald-500/10 rounded-xl p-3.5 flex items-start gap-2.5">
                        <MapPin className="h-4.5 w-4.5 text-[#007F55] shrink-0 mt-0.5" />
                        <span className="text-[12px] font-medium text-[#15803D] leading-snug">
                          <strong>Tip:</strong> You can type your street address, city, and zip code on the left to dynamically display your exact property location on the live Google Map!
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  {/* Step 3 Header Block */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007F55] text-white text-sm font-bold">
                          3
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Step 3: Room Setup</h3>
                      </div>
                      <p className="text-[14px] font-medium text-slate-500 pl-11">
                        Add your room types and the number of rooms available.
                      </p>
                    </div>
                    <div className="shrink-0 max-w-[240px] w-full self-end sm:self-center">
                      <img
                        src={step3Img}
                        alt="Room Setup Illustration"
                        className="w-full h-24 object-cover select-none pointer-events-none rounded-xl shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Form Box Room Setup */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-8 flex flex-col gap-6 text-left">
                    
                    {/* Header Row: Dropdown and Pills */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[15px] font-bold text-slate-800">
                        Select room type
                      </label>
                      <div className="flex flex-wrap items-center gap-3.5">
                        
                        {/* Custom dropdown inline */}
                        <div ref={dropdownRef} className="relative min-w-[200px]">
                          <button
                            type="button"
                            onClick={() => setIsRoomTypeDropdownOpen(!isRoomTypeDropdownOpen)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-bold text-slate-700 outline-none flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors"
                          >
                            <span>-- Select --</span>
                            <svg className={`w-4 h-4 text-slate-500 transition-transform ${isRoomTypeDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {isRoomTypeDropdownOpen && (
                            <div className="absolute top-[50px] left-0 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-25 py-1.5 max-h-[260px] overflow-y-auto">
                              {/* Search / Custom input box */}
                              <div className="px-3 py-2 border-b border-slate-100 sticky top-0 bg-white z-10">
                                <input
                                  type="text"
                                  placeholder="Search or type custom room..."
                                  value={dropdownSearch}
                                  onChange={(e) => setDropdownSearch(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && dropdownSearch.trim()) {
                                      const customVal = dropdownSearch.trim();
                                      if (!selectedRoomPills.includes(customVal)) {
                                        setSelectedRoomPills([...selectedRoomPills, customVal]);
                                        setRoomConfigs({
                                          ...roomConfigs,
                                          [customVal]: { floor: 'Select Floor', quantity: '' }
                                        });
                                      }
                                      setDropdownSearch('');
                                      setIsRoomTypeDropdownOpen(false);
                                      e.preventDefault();
                                    }
                                  }}
                                  className="w-full rounded-lg border border-slate-250 px-3 py-1.5 text-[13px] font-semibold text-slate-800 placeholder-slate-400 outline-none focus:border-[#007F55]"
                                />
                              </div>

                              {/* Custom Room Type option (if search is not empty and doesn't exactly match) */}
                              {dropdownSearch.trim() && !roomTypesOptions.some(opt => opt.toLowerCase() === dropdownSearch.trim().toLowerCase()) && (
                                <div
                                  onClick={() => {
                                    const customVal = dropdownSearch.trim();
                                    if (!selectedRoomPills.includes(customVal)) {
                                      setSelectedRoomPills([...selectedRoomPills, customVal]);
                                      setRoomConfigs({
                                        ...roomConfigs,
                                        [customVal]: { floor: 'Select Floor', quantity: '' }
                                      });
                                    }
                                    setDropdownSearch('');
                                    setIsRoomTypeDropdownOpen(false);
                                  }}
                                  className="px-4 py-2.5 text-[13.5px] font-bold text-[#007F55] hover:bg-emerald-50/50 cursor-pointer border-b border-slate-50 flex items-center gap-1"
                                >
                                  <span>+ Add custom:</span> <span className="underline font-extrabold">"{dropdownSearch.trim()}"</span>
                                </div>
                              )}

                              {/* Filtered options list */}
                              {roomTypesOptions
                                .filter(opt => opt.toLowerCase().includes(dropdownSearch.toLowerCase()))
                                .map((opt) => {
                                  const isAdded = selectedRoomPills.includes(opt);
                                  return (
                                    <div
                                      key={opt}
                                      onClick={() => {
                                        if (!isAdded) {
                                          setSelectedRoomPills([...selectedRoomPills, opt]);
                                          setRoomConfigs({
                                            ...roomConfigs,
                                            [opt]: { floor: 'Select Floor', quantity: '' }
                                          });
                                        }
                                        setDropdownSearch('');
                                        setIsRoomTypeDropdownOpen(false);
                                      }}
                                      className={`px-4 py-2 text-[13.5px] font-bold cursor-pointer transition-colors ${
                                        isAdded ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-50'
                                      }`}
                                    >
                                      {opt}
                                    </div>
                                  );
                                })}

                              {dropdownSearch.trim() && roomTypesOptions.filter(opt => opt.toLowerCase().includes(dropdownSearch.toLowerCase())).length === 0 && (
                                <div className="px-4 py-3 text-[13px] text-slate-400 text-center font-medium">
                                  Press Enter to add "{dropdownSearch.trim()}" as a custom room type!
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Pills tags next to dropdown */}
                        <div className="flex flex-wrap items-center gap-2">
                          {selectedRoomPills.map((pill) => (
                            <div
                              key={pill}
                              className="bg-[#EFF6FF] text-[#1E40AF] px-4 py-1.5 rounded-full text-[13px] font-bold flex items-center gap-1.5"
                            >
                              <span>{pill}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedRoomPills(selectedRoomPills.filter(p => p !== pill));
                                  const updatedConfigs = { ...roomConfigs };
                                  delete updatedConfigs[pill];
                                  setRoomConfigs(updatedConfigs);
                                }}
                                className="text-[#1E40AF]/60 hover:text-[#1E40AF] font-bold cursor-pointer text-[15px]"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>

                      </div>
                    </div>

                    {/* Horizontal Divider */}
                    <div className="border-t border-slate-100 my-2"></div>

                    {/* Room Config Rows List */}
                    <div className="flex flex-col gap-6">
                      {selectedRoomPills.map((roomType) => {
                        const config = roomConfigs[roomType] || { floor: 'Select Floor', quantity: '' };
                        return (
                          <div 
                            key={roomType} 
                            className="w-full border border-slate-200 rounded-2xl p-6 bg-white flex flex-col md:flex-row items-center gap-6"
                          >
                            {/* Room Type Header column */}
                            <div className="w-full md:w-[12%] text-left shrink-0">
                              <span className="text-[16px] font-bold text-slate-800 block">
                                {roomType}
                              </span>
                            </div>

                            {/* Floor selection column */}
                            <div className="w-full md:flex-1 flex flex-col gap-1.5 text-left">
                              <label className="text-[13px] font-bold text-slate-500">Floor</label>
                              <div className="relative">
                                <select
                                  value={config.floor}
                                  onChange={(e) => {
                                    setRoomConfigs({
                                      ...roomConfigs,
                                      [roomType]: { ...config, floor: e.target.value }
                                    });
                                  }}
                                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-700 outline-none cursor-pointer appearance-none"
                                >
                                  {floorOptions.map((fOpt) => (
                                    <option key={fOpt} value={fOpt}>
                                      {fOpt}
                                    </option>
                                  ))}
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            {/* Quantity column */}
                            <div className="w-full md:flex-1 flex flex-col gap-1.5 text-left">
                              <label className="text-[13px] font-bold text-slate-700">
                                {config.floor === 'Select Floor' 
                                  ? `Number of ${roomType} in (Select floor first)` 
                                  : `Number of ${roomType} in ${config.floor}`
                                }
                              </label>
                              <input
                                type="text"
                                placeholder={`Enter number of ${roomType} rooms`}
                                value={config.quantity}
                                onChange={(e) => {
                                  setRoomConfigs({
                                    ...roomConfigs,
                                    [roomType]: { ...config, quantity: e.target.value }
                                  });
                                }}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-800 outline-none focus:border-[#007F55] focus:ring-1"
                              />
                              
                              {/* Helper Text below input */}
                              {config.floor !== 'Select Floor' && config.quantity && (
                                <span className="text-[12px] font-semibold text-slate-500 mt-0.5">
                                  {config.quantity} {roomType} room(s) in {config.floor}
                                </span>
                              )}
                            </div>

                          </div>
                        );
                      })}

                      {selectedRoomPills.length === 0 && (
                        <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50/20">
                          <span className="text-[14px] font-bold text-slate-400">Please select a room type from the dropdown to configure rooms.</span>
                        </div>
                      )}
                    </div>

                  </div>
                </>
              )}

              {currentStep === 5 && (
                <>
                  {/* Step 5 Header Block */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007F55] text-white text-sm font-bold">
                          5
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Step 5: Property Rules & Policies</h3>
                      </div>
                      <p className="text-[14px] font-medium text-slate-500 pl-11">
                        Define check-in rules, guest profiles, dining arrangements, and other policies.
                      </p>
                    </div>
                    <div className="shrink-0 max-w-[240px] w-full self-end sm:self-center">
                      <img
                        src={stayPropertyImg}
                        alt="Rules & Policies Illustration"
                        className="w-full h-24 object-cover select-none pointer-events-none rounded-xl shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Form Box Property Rules & Policies */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-8 text-left flex flex-col gap-8">
                    {/* Must Read Rules */}
                    <div className="flex flex-col gap-5">
                      <h4 className="text-[16px] font-bold text-[#007F55] border-b border-slate-100 pb-2">
                        Must Read Rules
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[14px] font-bold text-slate-800">Check-In Time</label>
                          <select
                            value={checkInTime}
                            onChange={(e) => setCheckInTime(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-700 outline-none focus:border-[#007F55] focus:ring-1 focus:ring-[#007F55] cursor-pointer"
                          >
                            {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map(t => {
                              const hour = parseInt(t.split(':')[0], 10);
                              const period = hour >= 12 ? 'PM' : 'AM';
                              const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
                              const formatted = `${String(displayHour).padStart(2, '0')}:00 ${period}`;
                              return <option key={t} value={t}>{formatted}</option>;
                            })}
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[14px] font-bold text-slate-800">Check-Out Time</label>
                          <select
                            value={checkOutTime}
                            onChange={(e) => setCheckOutTime(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-medium text-slate-700 outline-none focus:border-[#007F55] focus:ring-1 focus:ring-[#007F55] cursor-pointer"
                          >
                            {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map(t => {
                              const hour = parseInt(t.split(':')[0], 10);
                              const period = hour >= 12 ? 'PM' : 'AM';
                              const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
                              const formatted = `${String(displayHour).padStart(2, '0')}:00 ${period}`;
                              return <option key={t} value={t}>{formatted}</option>;
                            })}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end mt-2">
                        {/* Minimum Age of Primary Guest */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[14px] font-bold text-slate-850">Minimum Age of Primary Guest</label>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                const val = parseInt(minAge, 10) || 0;
                                if (val > 1) setMinAge(String(val - 1));
                              }}
                              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold cursor-pointer transition-colors"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={minAge}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                setMinAge(isNaN(val) ? '' : String(val));
                              }}
                              className="w-20 rounded-xl border border-slate-200 bg-white py-2 text-center text-[14px] font-bold text-slate-800 outline-none focus:border-[#007F55]"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const val = parseInt(minAge, 10) || 0;
                                setMinAge(String(val + 1));
                              }}
                              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold cursor-pointer transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Accepted ID Proofs */}
                      <div className="flex flex-col gap-3 mt-2">
                        <label className="text-[14px] font-bold text-slate-800">Accepted ID Proofs</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {['Passport', 'Aadhar', 'Govt ID', 'Driving License'].map((idType) => {
                            const isSelected = acceptedIds.includes(idType);
                            return (
                              <div
                                key={idType}
                                onClick={() => {
                                  if (isSelected) {
                                    setAcceptedIds(acceptedIds.filter(x => x !== idType));
                                  } else {
                                    setAcceptedIds([...acceptedIds, idType]);
                                  }
                                }}
                                className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all duration-200 ${
                                  isSelected
                                    ? 'border-[#007F55] bg-[#E6F4EA]/15 text-[#007F55] font-bold'
                                    : 'border-slate-150 hover:border-slate-350 bg-white text-slate-700 font-semibold'
                                }`}
                              >
                                <div className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-all ${
                                  isSelected ? 'bg-[#007F55] border-[#007F55] text-white' : 'border-slate-300 bg-white'
                                }`}>
                                  {isSelected && (
                                    <svg className="w-3 h-3 stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-[13px]">{idType}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Guest Profile */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[16px] font-bold text-[#007F55] border-b border-slate-100 pb-2">
                        Guest Profile
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {renderYesNoToggle('Unmarried Couples Allowed', unmarriedCouplesAllowed, setUnmarriedCouplesAllowed)}
                        {renderYesNoToggle('Male-Only Groups Allowed', maleOnlyGroupsAllowed, setMaleOnlyGroupsAllowed)}
                        {renderYesNoToggle('Scanty Baggage Allowed', scantyBaggageAllowed, setScantyBaggageAllowed)}
                      </div>
                    </div>

                    {/* Smoking & Alcohol */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[16px] font-bold text-[#007F55] border-b border-slate-100 pb-2">
                        Smoking & Alcohol
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {renderYesNoToggle('Smoking Allowed', smokingAllowedStr, setSmokingAllowedStr)}
                        {renderYesNoToggle('Alcohol Consumption Allowed', alcoholAllowed, setAlcoholAllowed)}
                      </div>
                    </div>

                    {/* Food Arrangement */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[16px] font-bold text-[#007F55] border-b border-slate-100 pb-2">
                        Food Arrangement
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {renderYesNoToggle('Non-veg Food Allowed', nonVegAllowed, setNonVegAllowed)}
                        {renderYesNoToggle('Outside Food Allowed', outsideFoodAllowed, setOutsideFoodAllowed)}
                      </div>

                      {/* Food Delivery Options */}
                      <div className="flex flex-col gap-3 mt-2">
                        <label className="text-[14px] font-bold text-slate-800">Food Delivery Options</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {['Zomato', 'Swiggy', 'Local', 'UberEats'].map((delivery) => {
                            const isSelected = foodDeliveryOptions.includes(delivery);
                            return (
                              <div
                                key={delivery}
                                onClick={() => {
                                  if (isSelected) {
                                    setFoodDeliveryOptions(foodDeliveryOptions.filter(x => x !== delivery));
                                  } else {
                                    setFoodDeliveryOptions([...foodDeliveryOptions, delivery]);
                                  }
                                }}
                                className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all duration-200 ${
                                  isSelected
                                    ? 'border-[#007F55] bg-[#E6F4EA]/15 text-[#007F55] font-bold'
                                    : 'border-slate-150 hover:border-slate-350 bg-white text-slate-700 font-semibold'
                                }`}
                              >
                                <div className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-all ${
                                  isSelected ? 'bg-[#007F55] border-[#007F55] text-white' : 'border-slate-300 bg-white'
                                }`}>
                                  {isSelected && (
                                    <svg className="w-3 h-3 stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-[13px]">{delivery}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Property Accessibility */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[16px] font-bold text-[#007F55] border-b border-slate-100 pb-2">
                        Property Accessibility
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {renderYesNoToggle('Wheelchair Accessible', wheelchairAccessible, setWheelchairAccessible)}
                        {renderYesNoToggle('Wheelchair Provided', wheelchairProvided, setWheelchairProvided)}
                      </div>
                    </div>

                    {/* Pet Policy */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[16px] font-bold text-[#007F55] border-b border-slate-100 pb-2">
                        Pet Policy
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {renderYesNoToggle('Pets Allowed', petsAllowedStr, setPetsAllowedStr)}
                        {renderYesNoToggle('Pets on Property', petsOnProperty, setPetsOnProperty)}
                      </div>
                    </div>

                    {/* Child & Extra Bed Policy */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[16px] font-bold text-[#007F55] border-b border-slate-100 pb-2">
                        Child & Extra Bed Policy
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[13px] font-bold text-slate-700">Extra Mattress Cost (Child)</label>
                          <div className="relative flex items-center">
                            <span className="absolute left-3 text-[14px] font-bold text-slate-500">₹</span>
                            <input
                              type="number"
                              value={extraMattressChild}
                              onChange={(e) => setExtraMattressChild(e.target.value)}
                              placeholder="0"
                              className="w-full rounded-xl border border-slate-200 bg-white pl-8 pr-4 py-2.5 text-[14px] font-bold text-slate-800 outline-none focus:border-[#007F55]"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[13px] font-bold text-slate-700">Extra Mattress Cost (Adult)</label>
                          <div className="relative flex items-center">
                            <span className="absolute left-3 text-[14px] font-bold text-slate-500">₹</span>
                            <input
                              type="number"
                              value={extraMattressAdult}
                              onChange={(e) => setExtraMattressAdult(e.target.value)}
                              placeholder="0"
                              className="w-full rounded-xl border border-slate-200 bg-white pl-8 pr-4 py-2.5 text-[14px] font-bold text-slate-800 outline-none focus:border-[#007F55]"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[13px] font-bold text-slate-700">Extra Cot Cost</label>
                          <div className="relative flex items-center">
                            <span className="absolute left-3 text-[14px] font-bold text-slate-500">₹</span>
                            <input
                              type="number"
                              value={extraCotCost}
                              onChange={(e) => setExtraCotCost(e.target.value)}
                              placeholder="0"
                              className="w-full rounded-xl border border-slate-200 bg-white pl-8 pr-4 py-2.5 text-[14px] font-bold text-slate-800 outline-none focus:border-[#007F55]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Other Rules */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[16px] font-bold text-[#007F55] border-b border-slate-100 pb-2">
                        Other Rules
                      </h4>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[14px] font-bold text-slate-800">Additional Rules & Policies</label>
                        <textarea
                          rows="4"
                          value={additionalRules}
                          onChange={(e) => setAdditionalRules(e.target.value)}
                          placeholder="Enter any other specific rules or policies for your property..."
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-[#007F55] focus:ring-1 focus:ring-[#007F55] transition-all resize-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 6 && (
                <>
                  {/* Step 6 Header Block */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007F55] text-white text-sm font-bold">
                          6
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Step 6: Facilities & Amenities</h3>
                      </div>
                      <p className="text-[14px] font-medium text-slate-500 pl-11">
                        Select facilities and amenities available at your property.
                      </p>
                    </div>
                    <div className="shrink-0 max-w-[240px] w-full self-end sm:self-center">
                      <img
                        src={stayPropertyImg}
                        alt="Facilities & Amenities Illustration"
                        className="w-full h-24 object-cover select-none pointer-events-none rounded-xl shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Form Box Amenities */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-8 text-left">
                    <h4 className="text-[16px] font-bold text-[#007F55] mb-6">
                      Select Facilities & Amenities
                    </h4>

                    {/* Categorized Grid */}
                    <div className="space-y-8">
                      {[
                        {
                          category: 'Highlighted Amenities',
                          items: ['Gym', 'Swimming Pool', 'Spa', 'Restaurant', '24-hour Room Service', 'Lounge', 'Steam and Sauna', 'Bar']
                        },
                        {
                          category: 'Basic Facilities',
                          items: ['Free Parking', 'Free Wi-Fi', 'Refrigerator', 'Laundry Service', 'Housekeeping', 'Air Conditioning', 'Power Backup', 'EV Charging Station', 'Smoke Detector', 'Umbrellas', 'Elevator/Lift', 'Paid LAN']
                        },
                        {
                          category: 'Food and Drinks',
                          items: ['Dining Area', '24-hour Cafe', 'Barbeque', 'Bakery', '24-hour Coffee Shop']
                        },
                        {
                          category: 'Safety and Security',
                          items: ['Fire Extinguishers', 'CCTV', 'Security Alarms']
                        },
                        {
                          category: 'Health and Wellness',
                          items: ['Reflexology', 'First-aid Services']
                        },
                        {
                          category: 'Media and Technology',
                          items: ['TV']
                        },
                        {
                          category: 'General Services',
                          items: ['Luggage Storage', 'Wake-up Call', 'Concierge', 'Doctor on Call', 'Wheelchair', 'Luggage Assistance', 'Bellboy Service', 'Facilities for Guests with Disabilities', 'Pool/Beach towels', 'Multilingual Staff']
                        },
                        {
                          category: 'Beauty and Spa',
                          items: ['Massage']
                        },
                        {
                          category: 'Business Center',
                          items: ['Printer', 'Photocopying', 'Conference Room', 'Banquet']
                        }
                      ].map((grp) => (
                        <div key={grp.category}>
                          <h5 className="text-[14.5px] font-bold text-slate-800 mb-3.5 border-b border-slate-100 pb-1 max-w-fit pr-4">{grp.category}</h5>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {grp.items.map((ame) => {
                              const isSel = selectedAmenities.includes(ame);
                              return (
                                <div
                                  key={ame}
                                  onClick={() => {
                                    if (isSel) {
                                      setSelectedAmenities(selectedAmenities.filter(a => a !== ame));
                                    } else {
                                      setSelectedAmenities([...selectedAmenities, ame]);
                                    }
                                  }}
                                  className={`flex items-center gap-3 rounded-xl border p-4.5 cursor-pointer transition-all duration-200 ${
                                    isSel
                                      ? 'border-[#007F55] bg-[#E6F4EA]/15 text-[#007F55] font-bold'
                                      : 'border-slate-150 hover:border-slate-350 bg-white text-slate-700 font-semibold'
                                  }`}
                                >
                                  <div className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-all ${
                                    isSel ? 'bg-[#007F55] border-[#007F55] text-white' : 'border-slate-300 bg-white'
                                  }`}>
                                    {isSel && (
                                      <svg className="w-3.5 h-3.5 stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  <span className="text-[13px]">{ame}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {currentStep === 7 && (
                <>
                  {/* Step 7 Header Block */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007F55] text-white text-sm font-bold">
                          7
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Step 7: Photos</h3>
                      </div>
                      <p className="text-[14px] font-medium text-slate-500 pl-11">
                        Upload property photos to display your accommodation to guests.
                      </p>
                    </div>
                    <div className="shrink-0 max-w-[240px] w-full self-end sm:self-center">
                      <img
                        src={stayPropertyImg}
                        alt="Photos Illustration"
                        className="w-full h-24 object-cover select-none pointer-events-none rounded-xl shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Form Box Photos */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-8 text-left flex flex-col gap-6">
                    <h4 className="text-[16px] font-bold text-[#007F55]">
                      Upload Photos
                    </h4>

                    {/* Drag and Drop Zone */}
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-slate-50/10 cursor-pointer hover:border-[#007F55] transition-colors relative">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files) {
                            const files = Array.from(e.target.files);
                            const newUrls = files.map(file => URL.createObjectURL(file));
                            const combined = [...uploadedPhotos, ...newUrls];
                            if (combined.length > 10) {
                              setUploadedPhotos(combined.slice(0, 10));
                              setPhotoError('You can upload a maximum of 10 photos. Extra photos were ignored.');
                            } else {
                              setUploadedPhotos(combined);
                              setPhotoError('');
                            }
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <svg className="w-12 h-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-[15px] font-bold text-slate-700">Drag & drop your files here, or <span className="text-[#007F55] underline">Browse files</span></span>
                      <span className="text-[12px] font-medium text-slate-400 mt-1.5">Support JPG, PNG, WEBP files. Max 10 photos.</span>
                    </div>

                    {photoError && (
                      <div className="text-[13px] font-semibold text-red-600 bg-red-50/20 border border-red-500/10 rounded-xl px-4 py-2.5 mt-2 animate-pulse">
                        {photoError}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[12px] font-bold text-slate-400">
                        {uploadedPhotos.length} / 10 photos uploaded
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedPhotos([
                            'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
                            'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80',
                            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80',
                            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80',
                            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
                            'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80'
                          ]);
                          setPhotoError('');
                        }}
                        className="rounded-lg border border-[#007F55]/20 bg-white hover:bg-emerald-50/10 px-4 py-2 text-[12px] font-bold text-[#007F55] cursor-pointer"
                      >
                        ⚡ Pre-fill 6 Sample Photos
                      </button>
                    </div>

                    {/* Uploaded Photos Grid */}
                    {uploadedPhotos.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                        {uploadedPhotos.map((url, index) => (
                          <div key={index} className="group relative rounded-xl overflow-hidden border border-slate-200 h-36 shadow-md transition-all hover:border-[#007F55] bg-slate-50 flex flex-col justify-between">
                            <img src={url} alt={`Uploaded ${index}`} className="w-full h-full object-cover select-none" />
                            
                            {/* Position Badge */}
                            <div className="absolute top-2 left-2 flex items-center">
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm backdrop-blur-xs ${
                                index === 0 
                                  ? 'bg-[#007F55] text-white' 
                                  : 'bg-slate-900/75 text-white'
                              }`}>
                                {index === 0 ? '1st (Cover)' : `${index + 1}${index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'}`}
                              </span>
                            </div>

                            {/* Hover Controls Overlay */}
                            <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/50 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newPhotos = [...uploadedPhotos];
                                    const temp = newPhotos[index];
                                    newPhotos[index] = newPhotos[index - 1];
                                    newPhotos[index - 1] = temp;
                                    setUploadedPhotos(newPhotos);
                                  }}
                                  className="h-8 w-8 flex items-center justify-center bg-white hover:bg-slate-100 text-slate-800 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold text-[14px]"
                                  title="Move Left"
                                >
                                  ←
                                </button>
                              )}
                              
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = uploadedPhotos.filter((_, i) => i !== index);
                                  setUploadedPhotos(updated);
                                  if (updated.length <= 10) setPhotoError('');
                                }}
                                className="h-8 w-8 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                title="Delete Photo"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>

                              {index < uploadedPhotos.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newPhotos = [...uploadedPhotos];
                                    const temp = newPhotos[index];
                                    newPhotos[index] = newPhotos[index + 1];
                                    newPhotos[index + 1] = temp;
                                    setUploadedPhotos(newPhotos);
                                  }}
                                  className="h-8 w-8 flex items-center justify-center bg-white hover:bg-slate-100 text-slate-800 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold text-[14px]"
                                  title="Move Right"
                                >
                                  →
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 opacity-40">
                        {['Cover Photo', 'Bedroom', 'Living Room', 'Bathroom'].map((label, idx) => (
                          <div key={idx} className="border border-dashed border-slate-350 rounded-xl h-36 flex flex-col items-center justify-center bg-slate-50 text-slate-400">
                            <span className="text-[12px] font-bold">{label} Slot</span>
                            <span className="text-[10px] font-medium mt-1">Empty</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <>
                  {/* Step 4 Header Block */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007F55] text-white text-sm font-bold animate-pulse">
                          4
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Step 4: Pricing & Availability</h3>
                      </div>
                      <p className="text-[14px] font-medium text-slate-500 pl-11">
                        Set room pricing, occupancy adjustments, child pricing and policies.
                      </p>
                    </div>
                  </div>

                  {/* Room Summary Container */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-8 flex flex-col gap-6 text-left">
                    <h4 className="text-[16px] font-bold text-slate-800">
                      Room Summary
                    </h4>

                    {selectedRoomPills.length > 0 ? (
                      <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[1200px]">
                          <thead>
                            <tr className="border-b border-slate-100 pb-3">
                              <th className="text-[12px] font-bold text-slate-400 uppercase pb-3 min-w-[120px] pr-4">Floor</th>
                              <th className="text-[12px] font-bold text-slate-400 uppercase pb-3 min-w-[120px] pr-4">Room Type</th>
                              <th className="text-[12px] font-bold text-slate-400 uppercase pb-3 min-w-[140px] pr-4">Number of Rooms</th>
                              <th className="text-[12px] font-bold text-slate-400 uppercase pb-3 min-w-[220px] pr-4">Room Capacities</th>
                              <th className="text-[12px] font-bold text-slate-400 uppercase pb-3 min-w-[120px] pr-4">Total Capacity</th>
                              <th className="text-[12px] font-bold text-slate-400 uppercase pb-3 min-w-[160px] pr-4">Base Price/Night (₹)</th>
                              <th className="text-[12px] font-bold text-slate-400 uppercase pb-3 min-w-[320px]">
                                <div className="flex items-center gap-1">
                                  <span>Occupancy Price Adjustments</span>
                                  <div className="group relative cursor-pointer flex items-center">
                                    <Info className="h-4 w-4 text-[#007F55]" />
                                    <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-850 text-white text-[10px] rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-md leading-normal normal-case font-medium">
                                      Add extra price charges for additional guests over base occupancy.
                                    </div>
                                  </div>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100/50">
                            {selectedRoomPills.map((roomType) => {
                              const config = roomConfigs[roomType] || { floor: 'Ground Floor', quantity: '1' };
                              const qty = parseInt(config.quantity, 10) || 1;
                              const capacities = roomCapacities[roomType] || Array(qty).fill({ adults: 2, children: 0 });
                              
                              // Calculate total guests for this row
                              const totalGuests = capacities.reduce((sum, cap) => sum + (parseInt(cap.adults, 10) || 0) + (parseInt(cap.children, 10) || 0), 0);

                              return (
                                <tr key={roomType} className="align-top">
                                  {/* Floor */}
                                  <td className="py-5 pr-3 text-[14px] font-semibold text-slate-700">
                                    {config.floor === 'Select Floor' ? 'Ground Floor' : config.floor}
                                  </td>

                                  {/* Room Type */}
                                  <td className="py-5 pr-3 text-[14px] font-bold text-slate-800">
                                    {roomType}
                                  </td>

                                  {/* Number of Rooms */}
                                  <td className="py-5 pr-3 text-[14px] font-semibold text-slate-700">
                                    {qty}
                                  </td>

                                  {/* Room Capacities */}
                                  <td className="py-5 pr-3">
                                    <div className="flex flex-col gap-3 max-w-[200px]">
                                      {capacities.map((cap, idx) => (
                                        <div key={idx} className="border border-slate-100 rounded-xl p-3 bg-white flex flex-col gap-1.5 shadow-sm">
                                          <span className="text-[12px] font-bold text-slate-800">Room {idx + 1}</span>
                                          
                                          <div className="flex flex-col gap-1 text-[11px] text-slate-500">
                                            <div className="flex justify-between items-center">
                                              <span>Adults: <strong className="text-slate-800">{cap.adults}</strong></span>
                                              <div className="flex gap-1">
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const updated = [...capacities];
                                                    const currentAdults = parseInt(updated[idx].adults, 10) || 0;
                                                    if (currentAdults > 1) {
                                                      updated[idx] = { ...updated[idx], adults: currentAdults - 1 };
                                                      setRoomCapacities({ ...roomCapacities, [roomType]: updated });
                                                    }
                                                  }}
                                                  className="w-4.5 h-4.5 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 font-black text-slate-600 cursor-pointer"
                                                >
                                                  -
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const updated = [...capacities];
                                                    const currentAdults = parseInt(updated[idx].adults, 10) || 0;
                                                    updated[idx] = { ...updated[idx], adults: currentAdults + 1 };
                                                    setRoomCapacities({ ...roomCapacities, [roomType]: updated });
                                                  }}
                                                  className="w-4.5 h-4.5 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 font-black text-slate-600 cursor-pointer"
                                                >
                                                  +
                                                </button>
                                              </div>
                                            </div>
                                            
                                            <div className="flex justify-between items-center">
                                              <span>Children: <strong className="text-slate-800">{cap.children}</strong></span>
                                              <div className="flex gap-1">
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const updated = [...capacities];
                                                    const currentChildren = parseInt(updated[idx].children, 10) || 0;
                                                    if (currentChildren > 0) {
                                                      updated[idx] = { ...updated[idx], children: currentChildren - 1 };
                                                      setRoomCapacities({ ...roomCapacities, [roomType]: updated });
                                                    }
                                                  }}
                                                  className="w-4.5 h-4.5 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 font-black text-slate-600 cursor-pointer"
                                                >
                                                  -
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const updated = [...capacities];
                                                    const currentChildren = parseInt(updated[idx].children, 10) || 0;
                                                    updated[idx] = { ...updated[idx], children: currentChildren + 1 };
                                                    setRoomCapacities({ ...roomCapacities, [roomType]: updated });
                                                  }}
                                                  className="w-4.5 h-4.5 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 font-black text-slate-600 cursor-pointer"
                                                >
                                                  +
                                                </button>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="border-t border-slate-50 pt-1 mt-1 text-[11px] font-bold text-slate-700">
                                            Total: {parseInt(cap.adults, 10) + parseInt(cap.children, 10)} guests
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </td>

                                  {/* Total Capacity */}
                                  <td className="py-5 pr-3 text-[14px] font-bold text-[#007F55]">
                                    {totalGuests} guests
                                  </td>

                                  {/* Base Price/Night */}
                                  <td className="py-5 pr-3">
                                    <div className="flex flex-col gap-1.5 max-w-[130px]">
                                      <span className="text-[12px] font-bold text-slate-500">Enter price</span>
                                      <div className="relative flex items-center">
                                        <span className="absolute left-3 text-[15px] font-bold text-slate-600">₹</span>
                                        <input
                                          type="number"
                                          value={roomPrices[roomType] || ''}
                                          onChange={(e) => {
                                            setRoomPrices({
                                              ...roomPrices,
                                              [roomType]: e.target.value
                                            });
                                          }}
                                          placeholder="0"
                                          className="w-full rounded-xl border border-slate-200 bg-white pl-8 pr-3 py-3.5 text-[14px] font-extrabold text-slate-800 outline-none focus:border-[#007F55] focus:ring-1 focus:ring-[#007F55] transition-all"
                                        />
                                      </div>
                                      <span className="text-[11px] font-medium text-slate-400">Per night</span>
                                    </div>
                                  </td>

                                  {/* Occupancy Price Adjustments */}
                                  <td className="py-5">
                                    <div className="flex flex-col gap-3">
                                      {(occupancyAdjustments[roomType] || []).map((adj, index) => (
                                        <div key={adj.id || index} className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-600 bg-slate-50/20 p-2.5 rounded-xl border border-slate-100 whitespace-nowrap">
                                          <span>For</span>
                                          <input
                                            type="number"
                                            value={adj.guests}
                                            onChange={(e) => {
                                              const updated = [...(occupancyAdjustments[roomType] || [])];
                                              let val = parseInt(e.target.value, 10);
                                              if (isNaN(val)) {
                                                updated[index] = { ...updated[index], guests: e.target.value };
                                              } else {
                                                if (val > totalGuests) val = totalGuests;
                                                if (val < 1) val = 1;
                                                updated[index] = { ...updated[index], guests: String(val) };
                                              }
                                              setOccupancyAdjustments({ ...occupancyAdjustments, [roomType]: updated });
                                            }}
                                            min="1"
                                            max={totalGuests}
                                            className="w-10 rounded border border-slate-250 bg-white px-1 py-1 text-center font-extrabold text-slate-800 outline-none focus:border-[#007F55]"
                                          />
                                          <span>guest(s)</span>
                                          <span>Add</span>
                                          <input
                                            type="number"
                                            value={adj.extraPrice}
                                            onChange={(e) => {
                                              const updated = [...(occupancyAdjustments[roomType] || [])];
                                              updated[index] = { ...updated[index], extraPrice: e.target.value };
                                              setOccupancyAdjustments({ ...occupancyAdjustments, [roomType]: updated });
                                            }}
                                            className="w-12 rounded border border-slate-250 bg-white px-1.5 py-1 text-center font-extrabold text-slate-800 outline-none focus:border-[#007F55]"
                                          />
                                          <span>₹ per guest</span>
                                          
                                          {/* Delete Adjustment Row */}
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const updated = (occupancyAdjustments[roomType] || []).filter((_, i) => i !== index);
                                              setOccupancyAdjustments({ ...occupancyAdjustments, [roomType]: updated });
                                            }}
                                            className="text-slate-400 hover:text-red-500 font-bold ml-auto transition-colors cursor-pointer"
                                          >
                                            <Trash2 className="h-3.5 w-3.5" />
                                          </button>
                                        </div>
                                      ))}

                                      {(occupancyAdjustments[roomType] || []).length < totalGuests && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const currentList = occupancyAdjustments[roomType] || [];
                                            const nextId = Date.now() + Math.random();
                                            const defaultGuests = Math.min(currentList.length + 1, totalGuests);
                                            setOccupancyAdjustments({
                                              ...occupancyAdjustments,
                                              [roomType]: [...currentList, { id: nextId, guests: String(defaultGuests), extraPrice: '0' }]
                                            });
                                          }}
                                          className="flex items-center justify-center gap-1.5 border border-dashed border-[#007F55]/40 bg-emerald-50/5 hover:bg-[#E6F4EA]/40 text-[#007F55] hover:text-[#006644] font-bold rounded-xl py-2 px-3.5 text-[13px] active:scale-95 transition-all cursor-pointer mt-1"
                                        >
                                          <Plus className="h-3.5 w-3.5" />
                                          Add Price Adjustment
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-12 border border-dashed border-slate-250 rounded-2xl bg-slate-50/20">
                        <span className="text-[14px] font-bold text-slate-450">
                          No rooms configured. Please go back to <strong className="text-[#007F55] cursor-pointer hover:underline" onClick={() => setCurrentStep(3)}>Step 3: Room Setup</strong> to add room types.
                        </span>
                      </div>
                    )}

                    {/* Tip Container */}
                    <div className="w-full bg-[#EBF5FF]/60 border border-[#BFDBFE]/40 rounded-xl p-4 flex items-start gap-3 mt-2 shadow-xs">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white text-[11px] font-bold">
                        i
                      </div>
                      <span className="text-[13px] font-medium text-blue-900 leading-snug">
                        Add price adjustments for additional guests. The adjustment will be applied per guest above the base occupancy.
                      </span>
                    </div>
                  </div>

                  {/* Child Pricing Section */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-8 flex flex-col gap-6 text-left">
                    <div className="flex items-center justify-between w-full">
                      <h4 className="text-[16px] font-bold text-slate-800">
                        Child Pricing
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setChildAgeRanges([
                            ...childAgeRanges,
                            { id: Date.now() + Math.random(), ageFrom: '0', ageTo: '0', price: '0', priceType: 'Fixed Amount (₹)' }
                          ]);
                        }}
                        className="flex items-center gap-1.5 border border-[#007F55]/25 hover:border-[#007F55] bg-white hover:bg-emerald-50/10 text-[#007F55] font-bold rounded-xl py-2 px-4 text-[13px] active:scale-95 transition-all cursor-pointer shadow-xs"
                      >
                        <Plus className="h-4 w-4" />
                        Add Age Range
                      </button>
                    </div>

                    <div className="flex flex-col gap-5">
                      {childAgeRanges.map((range, index) => (
                        <div key={range.id || index} className="border border-slate-150 rounded-2xl p-6 bg-white flex flex-col gap-4 relative shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] font-bold text-slate-800">
                              Age Range {index + 1}
                            </span>
                            {childAgeRanges.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  setChildAgeRanges(childAgeRanges.filter((_, i) => i !== index));
                                }}
                                className="text-slate-400 hover:text-red-650 transition-colors p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                              >
                                <Trash2 className="h-4.5 w-4.5" />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                            {/* Age From */}
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[13px] font-bold text-slate-700">Age From</label>
                              <div className="relative flex items-center">
                                <input
                                  type="number"
                                  value={range.ageFrom}
                                  onChange={(e) => {
                                    const updated = [...childAgeRanges];
                                    updated[index] = { ...updated[index], ageFrom: e.target.value };
                                    setChildAgeRanges(updated);
                                  }}
                                  className="w-full rounded-xl border border-slate-200 bg-white pl-4 pr-16 py-2.5 text-[14px] font-bold text-slate-800 outline-none focus:border-[#007F55]"
                                />
                                <span className="absolute right-4 text-[12px] font-bold text-slate-400">years</span>
                              </div>
                            </div>

                            {/* Age To */}
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[13px] font-bold text-slate-700">Age To</label>
                              <div className="relative flex items-center">
                                <input
                                  type="number"
                                  value={range.ageTo}
                                  onChange={(e) => {
                                    const updated = [...childAgeRanges];
                                    updated[index] = { ...updated[index], ageTo: e.target.value };
                                    setChildAgeRanges(updated);
                                  }}
                                  className="w-full rounded-xl border border-slate-200 bg-white pl-4 pr-16 py-2.5 text-[14px] font-bold text-slate-800 outline-none focus:border-[#007F55]"
                                />
                                <span className="absolute right-4 text-[12px] font-bold text-slate-400">years</span>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[13px] font-bold text-slate-700">Price (₹)</label>
                              <input
                                type="number"
                                value={range.price}
                                onChange={(e) => {
                                  const updated = [...childAgeRanges];
                                  updated[index] = { ...updated[index], price: e.target.value };
                                  setChildAgeRanges(updated);
                                }}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-bold text-slate-800 outline-none focus:border-[#007F55]"
                              />
                            </div>

                            {/* Price Type */}
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[13px] font-bold text-slate-700">Price Type</label>
                              <select
                                value={range.priceType}
                                onChange={(e) => {
                                  const updated = [...childAgeRanges];
                                  updated[index] = { ...updated[index], priceType: e.target.value };
                                  setChildAgeRanges(updated);
                                }}
                                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-[14px] font-bold text-slate-700 outline-none cursor-pointer"
                              >
                                <option value="Fixed Amount (₹)">Fixed Amount (₹)</option>
                                <option value="Percentage (%)">Percentage (%)</option>
                              </select>
                            </div>
                          </div>

                          <span className="text-[12px] font-medium text-slate-400 leading-normal">
                            Children aged {range.ageFrom || '0'}-{range.ageTo || '0'} years will be charged {range.priceType === 'Percentage (%)' ? `${range.price || '0'}% of room rate` : `₹${range.price || '0'}`} per night
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* instant payment and free cancellation row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
                    {/* Instant Payment Switch Box */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-center justify-between gap-6 shadow-sm">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[14px] font-bold text-slate-800 leading-snug">
                          Enable instant payment (0 down payment)
                        </span>
                        <span className="text-[12px] font-semibold text-slate-400 leading-relaxed max-w-sm">
                          When enabled, guests can book without making an advance payment. Payment will be collected at check-in.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setInstantPayment(!instantPayment)}
                        className={`w-11 h-6.5 shrink-0 flex items-center rounded-full p-0.5 transition-colors cursor-pointer duration-200 ${instantPayment ? 'bg-[#007F55]' : 'bg-slate-200'}`}
                      >
                        <div className={`bg-white w-5.5 h-5.5 rounded-full shadow-sm transform transition-transform duration-200 ${instantPayment ? 'translate-x-4.5' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    {/* Free Cancellation Switch Box */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-center justify-between gap-6 shadow-sm">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[14px] font-bold text-slate-800 leading-snug">
                          Enable free cancellation
                        </span>
                        <span className="text-[12px] font-semibold text-slate-400 leading-relaxed max-w-sm">
                          When enabled, guests can cancel their booking free of charge up to 24 hours before check-in.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFreeCancellation(!freeCancellation)}
                        className={`w-11 h-6.5 shrink-0 flex items-center rounded-full p-0.5 transition-colors cursor-pointer duration-200 ${freeCancellation ? 'bg-[#007F55]' : 'bg-slate-200'}`}
                      >
                        <div className={`bg-white w-5.5 h-5.5 rounded-full shadow-sm transform transition-transform duration-200 ${freeCancellation ? 'translate-x-4.5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Refund Policies */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-8 flex flex-col gap-6 text-left">
                    <div className="flex items-center justify-between w-full">
                      <h4 className="text-[16px] font-bold text-slate-800">
                        Refund Policies
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setRefundPolicies([
                            ...refundPolicies,
                            { id: Date.now() + Math.random(), type: 'Select a policy' }
                          ]);
                        }}
                        className="flex items-center gap-1.5 border border-[#007F55]/25 hover:border-[#007F55] bg-white hover:bg-emerald-50/10 text-[#007F55] font-bold rounded-xl py-2 px-4.5 text-[13px] active:scale-95 transition-all cursor-pointer shadow-xs"
                      >
                        <Plus className="h-4 w-4" />
                        Add Policy
                      </button>
                    </div>

                    <div className="flex flex-col gap-5">
                      {refundPolicies.map((pol, index) => (
                        <div key={pol.id || index} className="border border-slate-150 rounded-2xl p-6 bg-white flex flex-col gap-4 relative shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] font-bold text-slate-800">
                              Policy {index + 1}
                            </span>
                            {refundPolicies.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  setRefundPolicies(refundPolicies.filter((_, i) => i !== index));
                                }}
                                className="text-slate-400 hover:text-red-650 transition-colors p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                              >
                                <Trash2 className="h-4.5 w-4.5" />
                              </button>
                            )}
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-bold text-slate-700">Policy Type</label>
                            <select
                              value={pol.type}
                              onChange={(e) => {
                                const updated = [...refundPolicies];
                                updated[index] = { 
                                  ...updated[index], 
                                  type: e.target.value,
                                  daysBefore: e.target.value === 'Fully Refundable' ? '1' : e.target.value === 'Partially Refundable' ? '7' : '',
                                  percentage: e.target.value === 'Partially Refundable' ? '50' : ''
                                };
                                setRefundPolicies(updated);
                              }}
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-bold text-slate-700 outline-none cursor-pointer"
                            >
                              <option value="Select a policy">Select a policy</option>
                              <option value="Fully Refundable">Fully Refundable</option>
                              <option value="Partially Refundable">Partially Refundable</option>
                              <option value="Non-Refundable">Non-Refundable</option>
                              <option value="Flexible (100% refund 24h prior)">Flexible (100% refund 24h prior)</option>
                              <option value="Moderate (100% refund 5 days prior)">Moderate (100% refund 5 days prior)</option>
                              <option value="Strict (50% refund up to 7 days prior)">Strict (50% refund up to 7 days prior)</option>
                            </select>
                          </div>

                          {/* Dynamic fields based on selection */}
                          {pol.type === 'Fully Refundable' && (
                            <div className="flex flex-col gap-2 mt-2 animate-fade-step">
                              <label className="text-[13px] font-bold text-slate-700">Days Before Check-in</label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  placeholder="1"
                                  value={pol.daysBefore || ''}
                                  onChange={(e) => {
                                    const updated = [...refundPolicies];
                                    updated[index] = { ...updated[index], daysBefore: e.target.value };
                                    setRefundPolicies(updated);
                                  }}
                                  className="w-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[14px] font-bold text-slate-800 outline-none focus:border-[#007F55] focus:ring-1 focus:ring-[#007F55]"
                                />
                                <span className="text-[13px] font-semibold text-slate-400">days before check-in</span>
                              </div>
                              <span className="text-[12px] font-medium text-slate-400">
                                Guests can cancel and get a full refund if cancelled at least {pol.daysBefore || '0'} days before check-in
                              </span>
                            </div>
                          )}

                          {pol.type === 'Partially Refundable' && (
                            <div className="flex flex-col gap-3 mt-2 animate-fade-step">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[13px] font-bold text-slate-700">Days Before Check-in</label>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="number"
                                      placeholder="7"
                                      value={pol.daysBefore || ''}
                                      onChange={(e) => {
                                        const updated = [...refundPolicies];
                                        updated[index] = { ...updated[index], daysBefore: e.target.value };
                                        setRefundPolicies(updated);
                                      }}
                                      className="w-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[14px] font-bold text-slate-800 outline-none focus:border-[#007F55]"
                                    />
                                    <span className="text-[13px] font-semibold text-slate-400">days before check-in</span>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[13px] font-bold text-slate-700">Refund Percentage (%)</label>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="number"
                                      placeholder="50"
                                      value={pol.percentage || ''}
                                      onChange={(e) => {
                                        const updated = [...refundPolicies];
                                        updated[index] = { ...updated[index], percentage: e.target.value };
                                        setRefundPolicies(updated);
                                      }}
                                      className="w-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[14px] font-bold text-slate-800 outline-none focus:border-[#007F55]"
                                    />
                                    <span className="text-[13px] font-semibold text-slate-400">% refund</span>
                                  </div>
                                </div>
                              </div>
                              <span className="text-[12px] font-medium text-slate-400">
                                Guests will get a {pol.percentage || '0'}% refund if cancelled at least {pol.daysBefore || '0'} days before check-in
                              </span>
                            </div>
                          )}

                          {pol.type === 'Non-Refundable' && (
                            <div className="mt-2 animate-fade-step">
                              <span className="text-[12px] font-medium text-slate-400">
                                Guests will not receive any refund if they cancel after booking.
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {currentStep === 8 && (
                <>
                  {/* Step 8 Header Block */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007F55] text-white text-sm font-bold animate-pulse">
                          8
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Step 8: About this property</h3>
                      </div>
                      <p className="text-[14px] font-medium text-slate-500 pl-11">
                        Add distances to local spots, set booking preferences and booking type.
                      </p>
                    </div>
                    <div className="shrink-0 max-w-[120px] self-end sm:self-center">
                      <img
                        src={stayPropertyImg}
                        alt="Stay Property Illustration"
                        className="w-full h-auto object-contain select-none pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Form Box Step 8 */}
                  <div className="w-full bg-white rounded-2xl border border-slate-100 p-8 flex flex-col gap-8 text-left">
                    
                    {/* About this property Description Editor */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
                        <h4 className="text-[16px] font-bold text-slate-900">
                          About this property
                        </h4>
                        <button
                          type="button"
                          className="text-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
                          title="Property Description"
                        >
                          <Info className="h-4.5 w-4.5 stroke-[2.5]" />
                        </button>
                      </div>
                      
                      {/* Rich Text Editor Container */}
                      <div className="w-full border border-slate-200/90 rounded-2xl bg-white flex flex-col focus-within:border-[#007F55] focus-within:ring-4 focus-within:ring-[#007F55]/5 transition-all duration-300">
                        {/* Toolbar */}
                        <div className="flex items-center gap-1 p-3 border-b border-slate-100 bg-slate-50/50 flex-wrap">
                          <button
                            type="button"
                            onClick={() => document.execCommand('undo')}
                            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-650 transition-colors cursor-pointer"
                            title="Undo"
                          >
                            <Undo2 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => document.execCommand('redo')}
                            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-650 transition-colors cursor-pointer"
                            title="Redo"
                          >
                            <Redo2 className="h-4 w-4" />
                          </button>
                          
                          <div className="h-5 w-[1px] bg-slate-200 mx-1.5"></div>

                          <button
                            type="button"
                            onClick={() => document.execCommand('bold')}
                            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-800 font-extrabold text-[14px] transition-colors cursor-pointer"
                            title="Bold"
                          >
                            <Bold className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => document.execCommand('italic')}
                            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-800 font-serif italic text-[14px] transition-colors cursor-pointer"
                            title="Italic"
                          >
                            <Italic className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => document.execCommand('underline')}
                            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-800 underline text-[14px] transition-colors cursor-pointer"
                            title="Underline"
                          >
                            <Underline className="h-4 w-4" />
                          </button>

                          <div className="h-5 w-[1px] bg-slate-200 mx-1.5"></div>

                          <button
                            type="button"
                            onClick={() => document.execCommand('insertUnorderedList')}
                            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-650 transition-colors cursor-pointer"
                            title="Bullet List"
                          >
                            <List className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => document.execCommand('insertOrderedList')}
                            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-650 transition-colors cursor-pointer"
                            title="Numbered List"
                          >
                            <ListOrdered className="h-4 w-4" />
                          </button>

                          <div className="h-5 w-[1px] bg-slate-200 mx-1.5"></div>

                          <button
                            type="button"
                            onClick={() => document.execCommand('removeFormat')}
                            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-650 font-bold text-[13.5px] transition-colors cursor-pointer"
                            title="Clear Formatting"
                          >
                            <span className="font-extrabold">T<sub className="text-[9.5px] font-bold">x</sub></span>
                          </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-5">
                          <div 
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => setAboutPropertyText(e.target.innerHTML)}
                            dangerouslySetInnerHTML={{ __html: aboutPropertyText }}
                            className="editor-content w-full min-h-[140px] outline-none text-[14px] text-slate-800 leading-relaxed text-left"
                            placeholder="Write a detailed description of your property (minimum 1000 words). Include information about the location, amenities, nearby attractions, and what makes your property special."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Distance Section */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[16px] font-bold text-slate-900 border-b border-slate-100 pb-2">
                        Distance
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* Nearest Beach */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[13.5px] font-bold text-slate-750">
                            How many kilometers to the nearest beach?
                          </label>
                          <div className="relative flex items-center">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              value={distanceBeach}
                              onChange={(e) => setDistanceBeach(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] font-extrabold text-slate-800 outline-none focus:border-[#007F55] focus:ring-1 focus:ring-[#007F55]"
                            />
                            <span className="absolute right-4 text-[13px] font-bold text-slate-400">km</span>
                          </div>
                        </div>

                        {/* Nearest Railway Station */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[13.5px] font-bold text-slate-750">
                            How many kilometers to the nearest railway station?
                          </label>
                          <div className="relative flex items-center">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              value={distanceRailway}
                              onChange={(e) => setDistanceRailway(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] font-extrabold text-slate-800 outline-none focus:border-[#007F55] focus:ring-1 focus:ring-[#007F55]"
                            />
                            <span className="absolute right-4 text-[13px] font-bold text-slate-400">km</span>
                          </div>
                        </div>

                        {/* Nearest Airport */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[13.5px] font-bold text-slate-750">
                            How many kilometers to the nearest airport?
                          </label>
                          <div className="relative flex items-center">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              value={distanceAirport}
                              onChange={(e) => setDistanceAirport(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] font-extrabold text-slate-800 outline-none focus:border-[#007F55] focus:ring-1 focus:ring-[#007F55]"
                            />
                            <span className="absolute right-4 text-[13px] font-bold text-slate-400">km</span>
                          </div>
                        </div>

                        {/* Nearest Bus Stand */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[13.5px] font-bold text-slate-750">
                            How many kilometers to the nearest bus stand?
                          </label>
                          <div className="relative flex items-center">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              value={distanceBus}
                              onChange={(e) => setDistanceBus(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] font-extrabold text-slate-800 outline-none focus:border-[#007F55] focus:ring-1 focus:ring-[#007F55]"
                            />
                            <span className="absolute right-4 text-[13px] font-bold text-slate-400">km</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Guest Booking Preferences */}
                    <div className="flex flex-col gap-4 mt-2">
                      <h4 className="text-[16px] font-bold text-slate-900 border-b border-slate-100 pb-2">
                        Guest Booking Preferences
                      </h4>
                      <div className="flex flex-col gap-3">
                        <label className="text-[14px] font-bold text-slate-800">
                          Who can book?
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {['Married Couples', 'Families', 'Solo Travelers', 'Friends'].map((type) => {
                            const isSelected = allowedGuestTypes.includes(type);
                            return (
                              <button
                                type="button"
                                key={type}
                                onClick={() => {
                                  if (isSelected) {
                                    setAllowedGuestTypes(allowedGuestTypes.filter(t => t !== type));
                                  } else {
                                    setAllowedGuestTypes([...allowedGuestTypes, type]);
                                  }
                                }}
                                className={`px-5 py-2.5 rounded-xl border text-[13px] font-bold transition-all duration-200 cursor-pointer ${
                                  isSelected
                                    ? 'bg-emerald-50 border-[#007F55] text-[#007F55] shadow-xs'
                                    : 'border-slate-200 bg-white text-slate-650 hover:border-slate-350'
                                }`}
                              >
                                {type}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Booking Type */}
                    <div className="flex flex-col gap-4 mt-2">
                      <h4 className="text-[16px] font-bold text-slate-900 border-b border-slate-100 pb-2">
                        Booking Type
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {renderYesNoToggle('Instant Booking', instantBooking, setInstantBooking)}
                        {renderYesNoToggle('Manual Approval', manualApproval, setManualApproval)}
                      </div>
                    </div>

                  </div>
                </>
              )}

              {/* Bottom Actions Row */}
              <div className="w-full flex items-center justify-between gap-4 mt-6">
                {currentStep === 1 ? (
                  <button
                    onClick={onBack}
                    className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-[14px] font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-[14px] font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                  >
                    ← Previous
                  </button>
                )}

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (currentStep < 8) {
                        setCurrentStep(currentStep + 1);
                      } else {
                        setIsSubmitted(true);
                      }
                    }}
                    className="flex items-center gap-2 rounded-xl bg-[#007F55] px-6 py-3 text-[14px] font-bold text-white shadow-md hover:bg-[#006644] active:scale-95 transition-all cursor-pointer"
                  >
                    {currentStep === 8 ? 'Submit' : 'Continue'}
                    <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>

      {/* Security Footer */}
      <footer className="w-full flex items-center justify-center gap-2 mt-12">
        <ShieldCheck className="h-4.5 w-4.5 text-[#007F55]" />
        <span className="text-[12px] font-bold text-slate-400">
          Your information is 100% secure with us
        </span>
      </footer>
    </main>
  );
}
