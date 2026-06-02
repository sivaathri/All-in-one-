import catStaysImg from '../assets/cat_stays.png';
import catBikeImg from '../assets/cat_bike.png';
import catCarImg from '../assets/cat_car.png';
import catFoodImg from '../assets/cat_food.png';
import catAdventureImg from '../assets/cat_adventure.png';
import catTaxiImg from '../assets/cat_taxi.png';
import catTireImg from '../assets/cat_tire.png';
import catMechanicImg from '../assets/cat_mechanic.png';
import catTourImg from '../assets/cat_tour.png';

export default function Categories() {
  const categories = [
    {
      title: 'Stays',
      exploreLink: '#stays',
      image: catStaysImg
    },
    {
      title: 'Bike Rental',
      exploreLink: '#bike-rental',
      image: catBikeImg
    },
    {
      title: 'Car Rental',
      exploreLink: '#car-rental',
      image: catCarImg
    },
    {
      title: 'Food Spots',
      exploreLink: '#food-spots',
      image: catFoodImg
    },
    {
      title: 'Adventures',
      exploreLink: '#adventures',
      image: catAdventureImg
    },
    {
      title: 'Taxi Booking',
      exploreLink: '#taxi-booking',
      image: catTaxiImg
    },
    {
      title: 'Puncture Service',
      exploreLink: '#puncture-service',
      image: catTireImg
    },
    {
      title: 'Mechanic Service',
      exploreLink: '#mechanic-service',
      image: catMechanicImg
    },
    {
      title: 'Tour Packages',
      exploreLink: '#tour-packages',
      image: catTourImg
    }
  ];

  return (
    <section className="w-full bg-white pt-16 pb-8">
      <div className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 justify-center">
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href={cat.exploreLink}
              className="group flex flex-col items-center justify-between rounded-2xl border border-slate-200 bg-white py-6 px-3 text-center shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-slate-300 cursor-pointer h-[200px]"
            >
              {/* 3D Image Icon Container */}
              <div className="flex-grow flex items-center justify-center mb-3 min-h-[90px]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-22 h-22 object-contain transition-transform duration-300 group-hover:scale-105 select-none pointer-events-none"
                />
              </div>

              {/* Title & Explore Link */}
              <div className="flex flex-col items-center">
                <span className="text-[13.5px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
                  {cat.title}
                </span>
                <span className="mt-2 text-[11.5px] font-bold text-[#0F766E] group-hover:text-[#0D625A] transition-colors leading-none">
                  Explore
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
