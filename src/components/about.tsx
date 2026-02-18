'use client';

import { AimLogoMark } from '@/components/illustrations/aim-logo';
import { CommunityIllustration } from '@/components/illustrations/illustrations';
import { motion } from 'framer-motion';
import { Heart, Lightbulb, Target, Users } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Student Empowerment',
    description:
      'We believe every AIM student should have access to technology that helps launch their ventures. Websites are free, because we believe in lowering barriers.',
  },
  {
    icon: Target,
    title: 'By Students, For Students',
    description:
      'Our developers are AIM students themselves. We understand the academic rhythm, the entrepreneurial drive, and the unique needs of our community.',
  },
  {
    icon: Users,
    title: 'Community First',
    description:
      'This isn\'t just a service — it\'s a movement. By building for each other, we strengthen the entire AIM ecosystem and create lasting impact.',
  },
  {
    icon: Lightbulb,
    title: 'Cutting-Edge Technology',
    description:
      'From modern web frameworks to custom AI solutions, we stay at the forefront of technology to deliver the best possible products.',
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-aim-white dark:bg-aim-navy relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aim-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aim-gold/10 border border-aim-gold/20 text-sm font-medium text-aim-gold mb-6">
              <Heart className="w-4 h-4" />
              Our Mission
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-aim-navy dark:text-aim-white">
              Empowering <span className="text-gradient">Ourselves</span>
            </h2>
            <p className="mt-6 text-aim-gray dark:text-aim-gray-light text-base sm:text-lg leading-relaxed">
              <strong className="text-aim-navy dark:text-aim-white">Make It Exist</strong> was born from a simple idea:
              AIM students have incredible visions for businesses, products, and
              services — but often lack the technical resources to bring them to life.
            </p>
            <p className="mt-4 text-aim-gray dark:text-aim-gray-light text-base sm:text-lg leading-relaxed">
              We&apos;re a platform built by the students of AIM, for the students of AIM.
              Our mission is to bridge the gap between ideas and execution, providing
              the technology muscle to turn concepts into reality — every weekend.
            </p>

            {/* AIM affiliation badge */}
            <div className="mt-8 p-6 rounded-2xl bg-aim-gold/5 border border-aim-gold/10">
              <div className="flex items-start gap-4">
                <AimLogoMark size={40} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-aim-navy dark:text-aim-white mb-1">
                    Asian Institute of Management
                  </p>
                  <p className="text-sm italic text-aim-navy/80 dark:text-aim-white/80 leading-relaxed">
                    &quot;Leadership is not about titles, positions, or power; it&apos;s about making
                    a positive impact on the lives of others.&quot;
                  </p>
                  <p className="mt-2 text-xs font-semibold text-aim-gold">
                    Lead. Inspire. Transform.
                  </p>
                </div>
              </div>
            </div>

            {/* Community illustration for mobile */}
            <div className="lg:hidden mt-8">
              <CommunityIllustration />
            </div>
          </motion.div>

          {/* Right - Illustration + Values grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Community illustration (desktop only) */}
            <div className="hidden lg:block mb-8">
              <CommunityIllustration />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card-glass p-6 group hover:border-aim-gold/30 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-aim-gold/10 flex items-center justify-center mb-4 group-hover:bg-aim-gold/20 transition-colors duration-300">
                  <value.icon className="w-5 h-5 text-aim-gold" />
                </div>
                <h3 className="font-bold text-aim-navy dark:text-aim-white mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-aim-gray dark:text-aim-gray-light leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
