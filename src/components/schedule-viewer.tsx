'use client';

import { WEEKEND_SLOTS } from '@/lib/constants';
import { getAvailableWeekendDays, getDayLabel, groupByWeek } from '@/lib/scheduling';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Clock, Users } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function ScheduleViewer() {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const weekendDays = useMemo(() => getAvailableWeekendDays(6), []);
  const weeks = useMemo(() => groupByWeek(weekendDays), [weekendDays]);

  const currentWeek = weeks[currentWeekIndex];
  if (!currentWeek) return null;

  const canGoPrev = currentWeekIndex > 0;
  const canGoNext = currentWeekIndex < weeks.length - 1;

  return (
    <section id="schedule" className="section-padding bg-aim-white dark:bg-aim-navy relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aim-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aim-gold/10 border border-aim-gold/20 text-sm font-medium text-aim-gold mb-4">
            <Calendar className="w-4 h-4" />
            Build Schedule
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-aim-navy dark:text-aim-white mt-4">
            Weekend <span className="text-gradient">Availability</span>
          </h2>
          <p className="mt-4 text-aim-gray dark:text-aim-gray-light text-base sm:text-lg max-w-2xl mx-auto">
            All builds are scheduled on Saturdays and Sundays. Browse available slots
            and select your preferred time when submitting a project request.
          </p>
          
          {/* Visual indicator - mini weekend days */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div
                key={day}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                  i >= 5
                    ? 'bg-aim-gold/15 text-aim-gold border border-aim-gold/30 scale-110'
                    : 'bg-aim-navy/5 dark:bg-white/5 text-aim-gray/40 dark:text-aim-gray/30'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Week navigator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setCurrentWeekIndex((i) => Math.max(0, i - 1))}
            disabled={!canGoPrev}
            className="p-2 rounded-xl bg-aim-navy/5 dark:bg-white/5 hover:bg-aim-navy/10 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            aria-label="Previous week"
          >
            <ChevronLeft className="w-5 h-5 text-aim-navy dark:text-aim-white" />
          </button>
          <div className="text-center">
            <p className="font-bold text-aim-navy dark:text-aim-white text-lg">
              {format(currentWeek[0].date, 'MMMM d')} –{' '}
              {format(currentWeek[currentWeek.length - 1].date, 'MMMM d, yyyy')}
            </p>
            <p className="text-xs text-aim-gray">
              Week {currentWeekIndex + 1} of {weeks.length}
            </p>
          </div>
          <button
            onClick={() => setCurrentWeekIndex((i) => Math.min(weeks.length - 1, i + 1))}
            disabled={!canGoNext}
            className="p-2 rounded-xl bg-aim-navy/5 dark:bg-white/5 hover:bg-aim-navy/10 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            aria-label="Next week"
          >
            <ChevronRight className="w-5 h-5 text-aim-navy dark:text-aim-white" />
          </button>
        </div>

        {/* Schedule grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWeekIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {currentWeek.map((day) => (
              <div
                key={day.date.toISOString()}
                className="card-glass p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-aim-navy dark:text-aim-white">
                      {getDayLabel(day.date)}
                    </h3>
                    <p className="text-sm text-aim-gray">
                      {format(day.date, 'MMMM d, yyyy')}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-aim-gold/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-aim-gold" />
                  </div>
                </div>

                <div className="space-y-3">
                  {WEEKEND_SLOTS.map((slot, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-aim-navy/[0.02] dark:bg-white/[0.02] border border-aim-gray-light/20 dark:border-aim-blue/20 hover:border-aim-gold/30 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-aim-gray" />
                        <span className="text-sm font-medium text-aim-navy dark:text-aim-white">
                          {slot.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-aim-gray" />
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                          Available
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-aim-gray">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span>Limited Slots</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Fully Booked</span>
          </div>
        </div>
      </div>
    </section>
  );
}
