'use client';

import { WeekendCalendarIllustration } from '@/components/illustrations/illustrations';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, FileText, Hammer, MessageSquare, Rocket } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Submit Your Request',
    description: 'Fill out the project form with your idea, service type, and details. Use your AIM email for verification.',
    accent: 'from-aim-gold to-aim-gold-dark',
  },
  {
    icon: Calendar,
    title: 'Pick a Weekend Slot',
    description: 'All builds happen on Saturday and Sunday. Choose an available slot that fits your schedule.',
    accent: 'from-aim-blue-light to-aim-blue',
  },
  {
    icon: MessageSquare,
    title: 'Consultation Call',
    description: 'We\'ll reach out via your AIM email to discuss requirements, scope, and timeline for your project.',
    accent: 'from-emerald-400 to-emerald-600',
  },
  {
    icon: Hammer,
    title: 'Weekend Build Sprint',
    description: 'Our student developers work intensively during the scheduled weekend to bring your project to life.',
    accent: 'from-purple-400 to-purple-600',
  },
  {
    icon: Rocket,
    title: 'Launch & Deliver',
    description: 'Your project is deployed and delivered. Websites are free; other services are charged based on scope.',
    accent: 'from-aim-gold to-aim-gold-light',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-white dark:bg-aim-navy-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-aim-mesh opacity-30 dark:opacity-20" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aim-gold/10 border border-aim-gold/20 text-sm font-medium text-aim-gold mb-4">
            <Calendar className="w-4 h-4" />
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-aim-navy dark:text-aim-white mt-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="mt-4 text-aim-gray dark:text-aim-gray-light text-base sm:text-lg max-w-2xl mx-auto">
            From idea to launch in a weekend. Our streamlined process ensures your
            project gets built efficiently.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-aim-gold/0 via-aim-gold/40 to-aim-gold/0"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>

          {/* Connecting line (mobile/tablet) */}
          <div className="lg:hidden absolute left-[2.25rem] top-0 bottom-0 w-0.5 sm:left-[2.5rem]">
            <motion.div
              className="h-full bg-gradient-to-b from-aim-gold/30 via-aim-gold/20 to-aim-gold/0"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative text-center lg:text-center"
              >
                {/* Mobile/tablet: horizontal layout */}
                <div className="flex items-start gap-4 lg:flex-col lg:items-center sm:flex-col sm:items-center">
                  {/* Step number + icon */}
                  <div className="relative inline-flex flex-col items-center flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${step.accent} flex items-center justify-center shadow-lg mb-0 lg:mb-5 sm:mb-5`}
                    >
                      <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-aim-navy dark:bg-aim-white flex items-center justify-center shadow-md">
                      <span className="text-xs font-bold text-aim-white dark:text-aim-navy">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="text-left lg:text-center sm:text-center">
                    <h3 className="text-lg font-bold text-aim-navy dark:text-aim-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-aim-gray dark:text-aim-gray-light leading-relaxed max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Desktop arrow between steps */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute -right-2 top-[2.5rem] text-aim-gold/40"
                    initial={{ opacity: 0, x: -5 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.15, duration: 0.4 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Weekend emphasis callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 card-glass p-6 sm:p-8 max-w-3xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Calendar illustration */}
            <WeekendCalendarIllustration className="flex-shrink-0" />
            
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                <Calendar className="w-6 h-6 text-aim-gold" />
                <h3 className="text-xl font-bold text-aim-navy dark:text-aim-white">
                  Weekend-Only Build Schedule
                </h3>
              </div>
              <p className="text-aim-gray dark:text-aim-gray-light text-sm sm:text-base leading-relaxed">
                All development work is scheduled exclusively on <strong className="text-aim-navy dark:text-aim-white">Saturdays and Sundays</strong>.
                This allows our student developers to balance their AIM coursework while
                delivering exceptional projects for the community.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-aim-gold/10 text-aim-gold text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Saturday Builds
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-aim-gold/10 text-aim-gold text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Sunday Builds
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-aim-blue-light/10 text-aim-blue-light text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 5 Time Slots
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
