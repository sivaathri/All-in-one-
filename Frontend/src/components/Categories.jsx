import catStaysImg from '../assets/cat_stays.png';
import catRentalsImg from '../assets/cat_rentals.png';
import catFoodImg from '../assets/cat_food.png';
import catAdventureImg from '../assets/cat_adventure.png';
import catTaxiImg from '../assets/cat_taxi.png';
import catServicesImg from '../assets/cat_services.png';
import catTourImg from '../assets/cat_tour.png';

export default function Categories({ onNavigate = () => {} }) {
  const categories = [
    {
      title: 'Stays',
      exploreLink: '#stays',
      image: catStaysImg
    },
    {
      title: 'Rentals',
      exploreLink: '#rentals',
      image: catRentalsImg
    },
    {
      title: 'Food Spots',
      exploreLink: '#food-spots',
      image: catFoodImg
    },
    {
      title: 'Activities',
      exploreLink: '#activities',
      image: catAdventureImg
    },
    {
      title: 'Taxi Booking',
      exploreLink: '#taxi-booking',
      image: catTaxiImg
    },
    {
      title: 'Services',
      exploreLink: '#services',
      image: catServicesImg
    },
    {
      title: 'Tour Packages',
      exploreLink: '#tour-packages',
      image: catTourImg
    }
  ];

  return (
    <section className="w-full bg-white pt-24 sm:pt-20 lg:pt-16 pb-8">
      <div className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 justify-center">
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href={cat.exploreLink}
              onClick={(e) => {
                e.preventDefault();
                if (cat.title === 'Food Spots') {
                  onNavigate('food-spots');
                } else if (cat.title === 'Stays') {
                  onNavigate('stays-results');
                } else if (cat.title === 'Rentals' || cat.title === 'Bike Rental' || cat.title === 'Car Rental') {
                  onNavigate('rent-home');
                } else if (cat.title === 'Activities' || cat.title === 'Adventures') {
                  onNavigate('activities');
                } else if (cat.title === 'Services') {
                  onNavigate('services');
                } else {
                  onNavigate('home');
                }
              }}
              className="group flex flex-col items-center justify-between rounded-2xl border border-slate-200 bg-white py-6 px-3 text-center shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-slate-300 cursor-pointer h-[200px] outline-none"
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
