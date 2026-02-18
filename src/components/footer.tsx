'use client';

import { AimLogoMark } from '@/components/illustrations/aim-logo';
import {
    ExternalLink,
    Heart,
    Mail,
    MapPin,
} from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Services', href: '#services' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Submit Project', href: '#request' },
  ],
  About: [
    { label: 'Our Mission', href: '#about' },
    { label: 'AIM Website', href: 'https://aim.edu', external: true },
    { label: 'Student Life', href: 'https://aim.edu/student-life/', external: true },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-aim-navy border-t border-aim-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 sm:py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <AimLogoMark size={36} />
              <div>
                <span className="text-lg font-bold text-white">
                  Make It <span className="text-aim-gold">Exist</span>
                </span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              A platform built by AIM students, for AIM students.
              Empowering the community to launch businesses and careers
              through technology.
            </p>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Asian Institute of Management, Makati City</span>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-sm mt-2">
              <Mail className="w-4 h-4" />
              <span>makeitexist@aim.edu</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={'external' in link ? '_blank' : undefined}
                      rel={'external' in link ? 'noopener noreferrer' : undefined}
                      className="text-white/50 hover:text-aim-gold text-sm transition-colors duration-300 inline-flex items-center gap-1"
                    >
                      {link.label}
                      {'external' in link && (
                        <ExternalLink className="w-3 h-3" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Get Started
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Have an idea? Submit your project request and we&apos;ll build it
              during the next available weekend.
            </p>
            <a href="#request" className="btn-primary !py-3 !px-6 !text-sm">
              Submit a Request
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © {currentYear} Make It Exist — Asian Institute of Management.
            Built with{' '}
            <Heart className="w-3 h-3 inline text-red-400" /> by AIM
            students.
          </p>
          <div className="flex items-center gap-4 text-white/30 text-xs">
            <span>Lead. Inspire. Transform.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
