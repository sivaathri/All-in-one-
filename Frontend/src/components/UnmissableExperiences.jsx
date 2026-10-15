import { Landmark, Compass, ShoppingBag, Utensils, Waves, ArrowRight, Compass as Lighthouse } from 'lucide-react';

const EXPERIENCES = [
  {
    id: 1,
    title: 'Heritage Walks',
    desc: 'Explore historic streets & colonial charm',
    bgColor: 'bg-purple-50/40 border-purple-100/80',
    iconBg: 'bg-purple-100/50 text-purple-600',
    Icon: Landmark,
  },
  {
    id: 2,
    title: 'Beach Activities',
    desc: 'Sun, sand & adventure by the sea',
    bgColor: 'bg-blue-50/40 border-blue-100/80',
    iconBg: 'bg-blue-100/50 text-blue-600',
    Icon: Waves,
  },
  {
    id: 3,
    title: 'Spiritual & Culture',
    desc: 'Temples, Auroville & cultural vibes',
    bgColor: 'bg-amber-50/30 border-amber-100/70',
    iconBg: 'bg-amber-100/40 text-amber-600',
    Icon: Compass,
  },
  {
    id: 4,
    title: 'Food Trails',
    desc: 'Savor local delights & street food',
    bgColor: 'bg-rose-50/30 border-rose-100/70',
    iconBg: 'bg-rose-100/40 text-rose-500',
    Icon: Utensils,
  },
  {
    id: 5,
    title: 'Shopping',
    desc: 'Boutiques, handmade & local treasures',
    bgColor: 'bg-emerald-50/30 border-emerald-100/70',
    iconBg: 'bg-emerald-100/40 text-emerald-600',
    Icon: ShoppingBag,
  },
];

export default function UnmissableExperiences() {
  return (
    <section className="w-full pb-12 pt-4 bg-white overflow-hidden border-t border-slate-100">
      <div className="mx-auto max-w-[1760px] px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {/* Round Lighthouse/Compass Header Icon Badge */}
            <div className="h-10 w-10 rounded-full bg-[#E6F4F1] flex items-center justify-center text-[#0F766E] border border-emerald-100/50 shadow-xs shrink-0">
              <Lighthouse className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <h2 className="text-2xl sm:text-[24px] font-black text-slate-900 tracking-tight leading-tight">
                Unmissable Experiences in Pondicherry
              </h2>
              <span className="text-[12.5px] font-medium text-slate-400 mt-0.5">
                Handpicked activities to make your trip extraordinary
              </span>
            </div>
          </div>

          <a
            href="#all-experiences"
            className="flex items-center gap-1.5 text-sm font-extrabold text-[#0F766E] hover:underline transition-all duration-200 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="h-4.5 w-4.5 text-[#0F766E] stroke-[2.5]" />
          </a>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {EXPERIENCES.map((exp) => {
            const IconComponent = exp.Icon;
            return (
              <div
                key={exp.id}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-left ${exp.bgColor}`}
              >
                {/* Icon wrapper */}
                <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 shadow-xs ${exp.iconBg}`}>
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-[14.5px] font-extrabold text-slate-800 leading-snug line-clamp-1">
                    {exp.title}
                  </h4>
                  <p className="text-[11.5px] font-semibold text-slate-450 leading-normal mt-0.5 line-clamp-2">
                    {exp.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
