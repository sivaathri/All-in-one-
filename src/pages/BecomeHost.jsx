import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Tag, Calendar, TrendingUp, X, CheckCircle2 } from 'lucide-react';
import StayPropertyForm from './StayPropertyForm';
import becameBg from '../assets/becameBG.png';
import stayPropertyImg from '../assets/stay_property.png';
import bikeRentalImg from '../assets/bike_rental.png';
import carRentalImg from '../assets/car_rental.png';
import adventureImg from '../assets/adventure.png';
import hostFoodImg from '../assets/host_food.png';
import hostTaxiImg from '../assets/host_taxi.png';
import hostServicesImg from '../assets/host_services.png';

export default function BecomeHost({ onBackToHome }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [partnerModal, setPartnerModal] = useState(null);
  const [partnerSuccess, setPartnerSuccess] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const categories = [
    {
      title: 'Stay Property',
      desc: 'List your hotel, villa, resort, homestay or any property.',
      image: stayPropertyImg,
      color: 'text-[#15803D]',
      btnBg: 'bg-[#007F55] hover:bg-[#006644]',
      borderClass: 'border-[#E6F4EA]',
      shadowColor: 'hover:shadow-[#15803D]/5',
    },
    {
      title: 'Bike Rental',
      desc: 'List your bikes and attract riders near you.',
      image: bikeRentalImg,
      color: 'text-[#5B21B6]',
      btnBg: 'bg-[#5B21B6] hover:bg-[#4c1d95]',
      borderClass: 'border-slate-100 hover:border-[#5B21B6]/20',
      shadowColor: 'hover:shadow-[#5B21B6]/5',
    },
    {
      title: 'Car Rental',
      desc: 'List your cars and reach thousands of travelers.',
      image: carRentalImg,
      color: 'text-[#EA580C]',
      btnBg: 'bg-[#EA580C] hover:bg-[#c2410c]',
      borderClass: 'border-slate-100 hover:border-[#EA580C]/20',
      shadowColor: 'hover:shadow-[#EA580C]/5',
    },
    {
      title: 'Activities',
      desc: 'List your activities, outdoor experiences and tours.',
      image: adventureImg,
      color: 'text-[#1D4ED8]',
      btnBg: 'bg-[#1D4ED8] hover:bg-[#1e40af]',
      borderClass: 'border-slate-100 hover:border-[#1D4ED8]/20',
      shadowColor: 'hover:shadow-[#1D4ED8]/5',
    },
    {
      title: 'Food Spot',
      desc: 'Discover and list restaurants, cafés and local food spots.',
      image: hostFoodImg,
      color: 'text-[#E52E2E]',
      btnBg: 'bg-[#E52E2E] hover:bg-[#c92525]',
      borderClass: 'border-slate-100 hover:border-[#E52E2E]/20',
      shadowColor: 'hover:shadow-[#E52E2E]/5',
    },
    {
      title: 'Taxi Booking',
      desc: 'Book local taxis, airport rides and outstation trips.',
      image: hostTaxiImg,
      color: 'text-[#D48806]',
      btnBg: 'bg-[#D48806] hover:bg-[#b87403]',
      borderClass: 'border-slate-100 hover:border-[#D48806]/20',
      shadowColor: 'hover:shadow-[#D48806]/5',
    },
    {
      title: 'Services',
      desc: 'Find mechanics, puncture service and other vehicle services.',
      image: hostServicesImg,
      color: 'text-[#006257]',
      btnBg: 'bg-[#006257] hover:bg-[#004d44]',
      borderClass: 'border-slate-100 hover:border-[#006257]/20',
      shadowColor: 'hover:shadow-[#006257]/5',
    },
  ];

  const benefits = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-[#16A34A]" />,
      title: "It's free to list your business for 3 months",
      desc: 'as part of our launch offer.',
    },
    {
      icon: <Tag className="h-6 w-6 text-[#16A34A]" />,
      title: 'No Listing Fees',
      desc: 'Get started for free',
    },
    {
      icon: <Calendar className="h-6 w-6 text-[#16A34A]" />,
      title: '3 Months Free',
      desc: 'Limited time launch offer',
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-[#16A34A]" />,
      title: 'Grow Your Business',
      desc: 'Reach thousands of travelers',
    },
  ];

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    setPartnerSuccess(true);
    setTimeout(() => {
      setPartnerSuccess(false);
      setPartnerModal(null);
      setBusinessName('');
      setPhone('');
      setEmail('');
    }, 2500);
  };

  if (activeCategory === 'Stay Property') {
    return <StayPropertyForm onBack={() => setActiveCategory(null)} />;
  }

  return (
    <main
      style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
      className="min-h-screen bg-[#FDFDFD] pb-10 flex flex-col justify-between overflow-x-hidden"
    >
      <style>{`
        @keyframes slideDownFade {
          from { opacity: 0; transform: translateY(-24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down-fade {
          opacity: 0;
          animation: slideDownFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-up-fade {
          opacity: 0;
          animation: slideUpFade 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Full-width Header Block with Background Image */}
      <div 
        className="w-full bg-no-repeat bg-right bg-contain min-h-[260px] sm:min-h-[290px] md:min-h-[330px] px-4 sm:px-8 lg:px-16 pt-2"
        style={{ backgroundImage: `url(${becameBg})` }}
      >
        <div className="max-w-[1360px] mx-auto w-full pt-4">
          {/* Text Content */}
          <div 
            className="w-full mt-4 lg:w-[55%] text-left max-w-xl py-6 md:py-10 bg-white/80 lg:bg-transparent backdrop-blur-xs lg:backdrop-blur-none rounded-2xl p-4 lg:p-0 animate-slide-down-fade"
            style={{ animationDelay: '100ms' }}
          >
            <span className="text-[13px] sm:text-[14px] font-extrabold tracking-[0.08em] text-[#16A34A] uppercase block mb-3.5">
              BECOME A HOST
            </span>
            <h1 className="text-[36px] mt-20 sm:text-[46px] md:text-[54px] lg:text-[60px] font-extrabold text-[#0F172A] leading-[1.15] tracking-tight mb-6">
              What would you <br />
              <span className="text-[#16A34A]">like to list?</span>
            </h1>
            <p className="text-[15px] sm:text-[16px] md:text-[17px] font-medium text-[#475569] leading-relaxed">
              Choose a category to get started.<br />
              You can add and manage your listings with ease.
            </p>
          </div>
        </div>
      </div>

      {/* Grid and Benefits Container */}
      <div className="max-w-[1360px] mx-auto w-full px-4 sm:px-8 lg:px-16 mt-8">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (cat.title === 'Stay Property') {
                  setActiveCategory('Stay Property');
                } else {
                  setPartnerModal(cat.title);
                }
              }}
              className={`group relative flex flex-col justify-between bg-white rounded-[24px] border ${cat.borderClass} p-6 sm:p-7 pb-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${cat.shadowColor} animate-slide-up-fade`}
              style={{ animationDelay: `${idx * 80 + 150}ms` }}
            >
              {/* Image Section */}
              <div className="mb-4 flex justify-center items-center overflow-hidden rounded-2xl w-full h-[130px]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-full max-h-[125px] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info Section */}
              <div className="flex flex-col items-start text-left mt-1 flex-grow">
                <h3 className={`text-[22px] font-bold ${cat.color} mb-2 tracking-tight`}>
                  {cat.title}
                </h3>
                <p className="text-[14px] font-medium text-slate-500 leading-snug mb-3 max-w-[78%]">
                  {cat.desc}
                </p>
              </div>

              {/* Action Button */}
              <div className="absolute bottom-6 right-6">
                <button
                  className={`flex h-[44px] w-[44px] items-center justify-center rounded-full text-white shadow-md transition-all duration-300 ${cat.btnBg} active:scale-90 cursor-pointer`}
                  aria-label={`List a ${cat.title}`}
                >
                  <ArrowRight className="h-5 w-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Benefits Bar */}
        <div 
          className="w-full rounded-2xl bg-teal-50/10 border border-[#0F766E]/10 p-6 sm:p-8 mb-4 animate-slide-up-fade"
          style={{ animationDelay: '600ms' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 text-left ${
                  idx > 0 ? 'pt-6 md:pt-0 md:pl-6 lg:pl-8' : ''
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50/30">
                  {benefit.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-slate-800 leading-snug">
                    {benefit.title}
                  </span>
                  <span className="text-[12px] font-medium text-slate-500 mt-0.5 leading-snug">
                    {benefit.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partner Registration Modal for non-stay categories */}
      {partnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-step">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-7 sm:p-9 shadow-2xl border border-slate-100 text-left">
            <button
              onClick={() => setPartnerModal(null)}
              className="absolute top-5 right-5 h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {partnerSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Application Received!</h3>
                <p className="text-sm text-slate-600 max-w-xs mx-auto">
                  Thank you for applying to list your <strong>{partnerModal}</strong> business. Our onboarding manager will contact you within 24 hours to complete your verification and activate your <strong>3 Months Free</strong> promotion.
                </p>
              </div>
            ) : (
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200 mb-3">
                  <span>🎁 3 Months Free Launch Offer</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  List Your {partnerModal}
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  Fill in your basic business details and our local team will help you set up your listing.
                </p>

                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Business or Service Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={`e.g. Pondy Express ${partnerModal}`}
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-800 focus:border-[#007F55] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-800 focus:border-[#007F55] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-800 focus:border-[#007F55] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 border border-slate-200/80">
                    <span className="font-bold text-slate-800">Location:</span> Pondicherry & Auroville Region
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#007F55] hover:bg-[#006644] py-3 text-sm font-extrabold text-white shadow-md active:scale-95 transition-all cursor-pointer mt-2"
                  >
                    Submit Listing Request
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
