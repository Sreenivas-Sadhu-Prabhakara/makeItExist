'use client';

import { AimLogoMark } from '@/components/illustrations/aim-logo';
import { STATS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Calendar, Code2, Rocket, Users } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  Users,
  Code2,
  Calendar,
};

export default function Stats() {
  return (
    <section className="py-16 sm:py-20 bg-aim-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-aim-mesh opacity-40" />
      
      {/* Decorative AIM logo watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <AimLogoMark size={300} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-aim-gold/60 text-sm font-semibold uppercase tracking-widest">
            Our Impact at AIM
          </span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, index) => {
            const Icon = iconMap[stat.icon] || Rocket;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-aim-gold/10 mb-4 group-hover:bg-aim-gold/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7 text-aim-gold" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-white/60 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
