import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Tag, Calendar, TrendingUp } from 'lucide-react';
import StayPropertyForm from './StayPropertyForm';
import becameBg from '../assets/becameBG.png';
import stayPropertyImg from '../assets/stay_property.png';
import bikeRentalImg from '../assets/bike_rental.png';
import carRentalImg from '../assets/car_rental.png';
import adventureImg from '../assets/adventure.png';

export default function BecomeHost({ onBackToHome }) {
  const [activeCategory, setActiveCategory] = useState(null);
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
      title: 'Adventure',
      desc: 'List your adventure activities and experiences.',
      image: adventureImg,
      color: 'text-[#1D4ED8]',
      btnBg: 'bg-[#1D4ED8] hover:bg-[#1e40af]',
      borderClass: 'border-slate-100 hover:border-[#1D4ED8]/20',
      shadowColor: 'hover:shadow-[#1D4ED8]/5',
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

  if (activeCategory === 'Stay Property') {
    return <StayPropertyForm onBack={() => setActiveCategory(null)} />;
  }

  return (
    <main
      style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
      className="min-h-screen bg-[#FDFDFD] pb-10 flex flex-col justify-between"
    >
      {/* Full-width Header Block with Background Image */}
      <div 
        className="w-full bg-no-repeat bg-right bg-contain min-h-[260px] sm:min-h-[290px] md:min-h-[330px] px-4 sm:px-8 lg:px-16 pt-2"
        style={{ backgroundImage: `url(${becameBg})` }}
      >
        <div className="max-w-[1360px] mx-auto w-full">
          {/* Back to Home Link */}
          {/* <button
            onClick={onBackToHome}
            className="group flex items-center gap-2 text-[15px] font-semibold text-slate-600 hover:text-teal-755 transition-colors duration-200 cursor-pointer mb-2"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button> */}

          {/* Text Content */}
          <div className="w-full mt-10 lg:w-[55%] text-left max-w-xl py-6 md:py-10 bg-white/80 lg:bg-transparent backdrop-blur-xs lg:backdrop-blur-none rounded-2xl p-4 lg:p-0">
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
        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (cat.title === 'Stay Property') {
                  setActiveCategory('Stay Property');
                }
              }}
              className={`group relative flex flex-col justify-between bg-white rounded-[20px] border ${cat.borderClass} p-7 pb-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${cat.shadowColor}`}
            >
              {/* Image Section */}
              <div className="mb-5 flex justify-center items-center overflow-hidden rounded-2xl bg-slate-50/20 w-full h-[135px]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-contain group-hover:scale-103 transition-transform duration-300"
                />
              </div>

              {/* Info Section */}
              <div className="flex flex-col items-start text-left mt-2 flex-grow">
                <h3 className={`text-[22px] font-bold ${cat.color} mb-3`}>
                  {cat.title}
                </h3>
                <p className="text-[14px] font-medium text-slate-500 leading-normal mb-5 max-w-[82%]">
                  {cat.desc}
                </p>
              </div>

              {/* Action Button */}
              <div className="absolute bottom-6 right-6">
                <button
                  className={`flex h-[42px] w-[42px] items-center justify-center rounded-full text-white shadow-md transition-all duration-300 ${cat.btnBg} active:scale-90 cursor-pointer`}
                  aria-label={`List a ${cat.title}`}
                >
                  <ArrowRight className="h-5 w-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Benefits Bar */}
        <div className="w-full rounded-2xl bg-teal-50/10 border border-[#0F766E]/10 p-6 sm:p-8 mb-4">
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
    </main>
  );
}
