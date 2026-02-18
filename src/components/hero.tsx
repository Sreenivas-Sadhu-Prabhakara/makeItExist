'use client';

import { AimLogoMark } from '@/components/illustrations/aim-logo';
import { HeroIllustration } from '@/components/illustrations/illustrations';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Shield, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-aim-gradient dark:bg-aim-gradient">
        <div className="absolute inset-0 bg-aim-mesh opacity-60" />
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(200,169,81,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,81,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Floating orbs */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-aim-gold/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-aim-blue-light/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aim-gold/10 border border-aim-gold/20 mb-6 sm:mb-8"
            >
              <Zap className="w-4 h-4 text-aim-gold" />
              <span className="text-sm font-medium text-aim-gold">
                Built by AIM Students, for AIM Students
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Make It{' '}
              <span className="relative">
                <span className="text-gradient">Exist</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-1 bg-aim-gradient-gold rounded-full"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Empowering AIM students to launch their businesses and careers.
              Free websites, mobile apps, web apps, custom AI solutions — built
              every weekend by your fellow students.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a href="#request" className="btn-primary text-base sm:text-lg group">
                Submit Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#services" className="btn-secondary text-base sm:text-lg">
                Explore Services
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-10 sm:mt-14 flex flex-wrap gap-6 sm:gap-8 justify-center lg:justify-start"
            >
              {[
                { icon: Shield, label: 'AIM Verified' },
                { icon: Clock, label: 'Weekend Builds' },
                { icon: Zap, label: 'Quick Turnaround' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-white/50">
                  <item.icon className="w-4 h-4 text-aim-gold/70" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </motion.div>

            {/* AIM Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <AimLogoMark size={28} />
              <div>
                <p className="text-xs font-semibold text-white/80">Asian Institute of Management</p>
                <p className="text-[10px] text-white/40">Lead. Inspire. Transform.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="hidden lg:block"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-aim-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
