import { Tag, Shield, Headphones, ClipboardList } from 'lucide-react';

export default function Features() {
  const features = [
    
  ];

  return (
    <div className="w-full bg-transparent">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 px-3 py-1.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/10 shadow-sm backdrop-blur-md">
                {feature.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[13px] font-bold text-white tracking-wide leading-none">
                  {feature.title}
                </span>
                <span className="text-[11px] text-slate-300 font-medium mt-1 leading-none">
                  {feature.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
