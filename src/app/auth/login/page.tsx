'use client';

import { motion } from 'framer-motion';
import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    Loader2,
    Mail,
    Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [aimEmail, setAimEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!aimEmail.trim()) {
      setError('Email is required');
      return;
    }
    if (!aimEmail.toLowerCase().endsWith('@aim.edu')) {
      setError('Must be a valid AIM email (@aim.edu)');
      return;
    }

    setIsSubmitting(true);
    try {
      // For now, just simulate a magic link send
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmailSent(true);
      toast.success('Login link sent to your AIM email!');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-aim-white dark:bg-aim-navy px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-glass p-8 sm:p-12 max-w-md w-full text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-aim-gold/10 mb-6">
            <Mail className="w-10 h-10 text-aim-gold" />
          </div>
          <h2 className="text-2xl font-bold text-aim-navy dark:text-aim-white mb-3">
            Check Your Email ✉️
          </h2>
          <p className="text-aim-gray dark:text-aim-gray-light mb-2 leading-relaxed">
            We&apos;ve sent a magic login link to:
          </p>
          <p className="text-aim-gold font-semibold mb-6">{aimEmail}</p>
          <p className="text-sm text-aim-gray dark:text-aim-gray mb-6">
            Click the link in your email to sign in. The link expires in 15 minutes.
          </p>
          <button
            onClick={() => {
              setEmailSent(false);
              setAimEmail('');
            }}
            className="btn-ghost text-sm"
          >
            ← Try a different email
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-aim-white dark:bg-aim-navy relative overflow-hidden px-4 py-12">
      <div className="absolute inset-0 bg-aim-mesh opacity-30 dark:opacity-20" />

      <div className="relative w-full max-w-md">
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
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-aim-gray dark:text-aim-gray-light">
              Sign in with your AIM email
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="aimEmail" className="label-field">
                <Mail className="w-4 h-4 inline mr-2 opacity-50" />
                AIM Email
              </label>
              <input
                type="email"
                id="aimEmail"
                value={aimEmail}
                onChange={(e) => {
                  setAimEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="yourname@aim.edu"
                className={`input-field ${error ? '!border-red-500 !ring-red-500/20' : ''}`}
              />
              {error && (
                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending Link...
                </>
              ) : (
                <>
                  Send Magic Link
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-aim-gray">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/signup"
              className="text-aim-gold hover:text-aim-gold-light font-semibold transition-colors"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
