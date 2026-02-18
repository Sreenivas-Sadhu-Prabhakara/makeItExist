'use client';

import { ServiceIllustration } from '@/components/illustrations/illustrations';
import { SERVICES } from '@/lib/constants';
import { Service } from '@/lib/types';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Brain,
    Check,
    Globe,
    Layout,
    Smartphone,
    Sparkles,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Smartphone,
  Layout,
  Brain,
  Sparkles,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon] || Sparkles;
  const isFree = service.pricing === 'free';

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className="card-glass-hover p-6 sm:p-8 flex flex-col h-full group relative overflow-hidden"
    >
      {/* Background illustration */}
      <div className="absolute top-4 right-4 w-20 h-20 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
        <ServiceIllustration type={service.icon} className="w-full h-full" />
      </div>

      {/* Pricing badge */}
      <div className="flex items-center justify-between mb-5">
        <div
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase ${
            isFree
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
              : 'bg-aim-gold/10 text-aim-gold-dark dark:text-aim-gold'
          }`}
        >
          {isFree ? '✦ Free' : '◆ Based on Availability'}
        </div>
        <div className="w-12 h-12 rounded-2xl bg-aim-gold/10 dark:bg-aim-gold/5 flex items-center justify-center group-hover:bg-aim-gold/20 transition-colors duration-300">
          <Icon className="w-6 h-6 text-aim-gold" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-aim-navy dark:text-aim-white mb-3">
        {service.title}
      </h3>

      <p className="text-aim-gray dark:text-aim-gray-light text-sm sm:text-base leading-relaxed mb-6 flex-grow">
        {service.description}
      </p>

      {/* Features list */}
      <div className="space-y-2.5 mb-6">
        {service.features.map((feature, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-aim-gold/10 flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-aim-gold" />
            </div>
            <span className="text-sm text-aim-navy/70 dark:text-aim-white/70">
              {feature}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-aim-gray-light/20 dark:border-aim-blue/20">
        <p className="text-xs text-aim-gray dark:text-aim-gray mb-3">
          {service.pricingNote}
        </p>
        <a
          href="#request"
          className="inline-flex items-center gap-2 text-aim-gold font-semibold text-sm group-hover:gap-3 transition-all duration-300"
        >
          Request this service
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-padding bg-aim-white dark:bg-aim-navy relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aim-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aim-gold/10 border border-aim-gold/20 text-sm font-medium text-aim-gold mb-4">
            <Sparkles className="w-4 h-4" />
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-aim-navy dark:text-aim-white mt-4">
            What We <span className="text-gradient">Build</span>
          </h2>
          <p className="mt-4 text-aim-gray dark:text-aim-gray-light text-base sm:text-lg max-w-2xl mx-auto">
            From free websites to custom AI solutions — we empower AIM students with
            the technology they need to succeed.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
