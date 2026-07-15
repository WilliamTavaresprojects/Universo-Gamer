import React, { useEffect, useState } from "react";
import { Code, Smile, Terminal, Award, Users } from "lucide-react";
import { Stat } from "../types";

interface StatsProps {
  stats: Stat[];
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Code: Code,
  Smile: Smile,
  Terminal: Terminal,
  Award: Award,
  Users: Users
};

export default function Stats({ stats }: StatsProps) {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Simple count-up effect
    const duration = 1200; // ms
    const steps = 30;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const nextCounts: { [key: string]: number } = {};
      
      stats.forEach((st) => {
        const target = st.value;
        const current = Math.min(Math.round((target / steps) * step), target);
        nextCounts[st.id] = current;
      });

      setCounts(nextCounts);

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [stats]);

  return (
    <section className="py-16 bg-[#020617] text-white relative overflow-hidden border-t border-b border-white/5">
      {/* Background neon lights */}
      <div className="glow-spot w-72 h-72 bg-neon-blue/25 top-[-50px] right-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {stats.map((st) => {
            const IconComp = iconMap[st.iconName] || Code;
            const displayValue = counts[st.id] !== undefined ? counts[st.id] : st.value;

            return (
              <div
                key={st.id}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-[#00AEEF]/5 hover:border-neon-blue/20 transition-all duration-300 shadow-[0_4px_25px_rgba(0,174,239,0.03)] hover:shadow-[0_4px_30px_rgba(0,174,239,0.12)] backdrop-blur-md"
              >
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#00AEEF]/10 text-neon-blue mb-4 shadow-inner">
                  <IconComp size={22} />
                </div>

                {/* Big Animated Count Number */}
                <div className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-2 flex items-baseline justify-center">
                  <span>{displayValue}</span>
                  <span className="text-neon-blue font-bold ml-0.5">{st.suffix}</span>
                </div>

                {/* Label */}
                <p className="text-xs sm:text-sm font-medium text-neutral-300 font-sans">
                  {st.label}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
