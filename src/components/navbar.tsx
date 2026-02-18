'use client';

import { AimLogoMark } from '@/components/illustrations/aim-logo';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Menu,
    Moon,
    Sun,
    X,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#about', label: 'About' },
  { href: '#request', label: 'Get Started' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on link click
  const handleLinkClick = () => setIsOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 dark:bg-aim-navy/90 backdrop-blur-xl shadow-lg shadow-aim-navy/5 dark:shadow-black/20 border-b border-aim-gray-light/20 dark:border-aim-blue/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 sm:gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AimLogoMark size={36} className="sm:w-10 sm:h-10 drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300" />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-aim-navy dark:text-aim-white leading-tight tracking-tight">
                Make It <span className="text-gradient">Exist</span>
              </span>
              <span className="text-[10px] sm:text-xs text-aim-gray font-medium tracking-[0.12em] uppercase hidden sm:block">
                AIM Students
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  link.label === 'Get Started'
                    ? 'btn-primary !py-2.5 !px-6 !text-sm'
                    : 'text-aim-navy/70 dark:text-aim-white/70 hover:text-aim-navy dark:hover:text-aim-white hover:bg-aim-navy/5 dark:hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Theme Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-xl bg-aim-navy/5 dark:bg-white/5 hover:bg-aim-navy/10 dark:hover:bg-white/10 transition-colors duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-aim-gold" />
                ) : (
                  <Moon className="w-5 h-5 text-aim-blue" />
                )}
              </motion.button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-aim-navy/5 dark:bg-white/5 hover:bg-aim-navy/10 dark:hover:bg-white/10 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-aim-navy dark:text-aim-white" />
              ) : (
                <Menu className="w-5 h-5 text-aim-navy dark:text-aim-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 dark:bg-aim-navy/95 backdrop-blur-xl border-t border-aim-gray-light/20 dark:border-aim-blue/20"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    link.label === 'Get Started'
                      ? 'btn-primary !text-center mt-3'
                      : 'text-aim-navy/80 dark:text-aim-white/80 hover:bg-aim-navy/5 dark:hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
