'use client';

import { motion } from 'framer-motion';
import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Loader2,
    Mail,
    Sparkles,
    User,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    aimEmail: '',
    program: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.aimEmail.trim()) {
      newErrors.aimEmail = 'Email is required';
    } else if (!formData.aimEmail.toLowerCase().endsWith('@aim.edu')) {
      newErrors.aimEmail = 'Must be a valid AIM email (@aim.edu)';
    }
    if (!formData.program) newErrors.program = 'Please select your program';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Sign up failed');
      }

      setIsSuccess(true);
      toast.success('Account created! Check your AIM email for verification.');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-aim-white dark:bg-aim-navy px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-glass p-8 sm:p-12 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-aim-navy dark:text-aim-white mb-3">
            Welcome to Make It Exist! 🎉
          </h2>
          <p className="text-aim-gray dark:text-aim-gray-light mb-6 leading-relaxed">
            Your account has been created. We&apos;ll send a verification link to your
            AIM email shortly.
          </p>
          <Link href="/" className="btn-primary">
            Go to Homepage
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-aim-white dark:bg-aim-navy relative overflow-hidden px-4 py-12">
      {/* Background */}
      <div className="absolute inset-0 bg-aim-mesh opacity-30 dark:opacity-20" />

      <div className="relative w-full max-w-md">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-aim-gray hover:text-aim-navy dark:hover:text-aim-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card-glass p-8 sm:p-10"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-aim-gold to-aim-gold-dark mb-4">
              <Sparkles className="w-7 h-7 text-aim-navy" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-aim-navy dark:text-aim-white">
              Join <span className="text-gradient">Make It Exist</span>
            </h1>
            <p className="mt-2 text-sm text-aim-gray dark:text-aim-gray-light">
              Sign up with your AIM email to get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="label-field">
                <User className="w-4 h-4 inline mr-2 opacity-50" />
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className={`input-field ${errors.fullName ? '!border-red-500 !ring-red-500/20' : ''}`}
              />
              {errors.fullName && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* AIM Email */}
            <div>
              <label htmlFor="aimEmail" className="label-field">
                <Mail className="w-4 h-4 inline mr-2 opacity-50" />
                AIM Email
              </label>
              <input
                type="email"
                id="aimEmail"
                name="aimEmail"
                value={formData.aimEmail}
                onChange={handleChange}
                placeholder="yourname@aim.edu"
                className={`input-field ${errors.aimEmail ? '!border-red-500 !ring-red-500/20' : ''}`}
              />
              {errors.aimEmail && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.aimEmail}
                </p>
              )}
              <p className="mt-1.5 text-xs text-aim-gray">
                Must be a valid @aim.edu email address
              </p>
            </div>

            {/* Program */}
            <div>
              <label htmlFor="program" className="label-field">
                Program
              </label>
              <select
                id="program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                className={`input-field appearance-none ${errors.program ? '!border-red-500 !ring-red-500/20' : ''}`}
              >
                <option value="">Select your program...</option>
                <option value="mba">MBA</option>
                <option value="emba">Executive MBA</option>
                <option value="msds">MS in Data Science</option>
                <option value="mib">Master in Innovation &amp; Business</option>
                <option value="mdm">Master in Development Management</option>
                <option value="edba">Executive Doctor of Business Administration</option>
                <option value="bsba">BS in Business Administration</option>
                <option value="other">Other</option>
              </select>
              {errors.program && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.program}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-aim-gray">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-aim-gold hover:text-aim-gold-light font-semibold transition-colors"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
