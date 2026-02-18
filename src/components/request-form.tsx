'use client';

import { SERVICES, WEEKEND_SLOTS } from '@/lib/constants';
import { getAvailableWeekendDays, getDayLabel } from '@/lib/scheduling';
import type { FormErrors, ServiceType } from '@/lib/types';
import { projectRequestSchema } from '@/lib/validation';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertCircle,
    Calendar,
    CheckCircle2,
    ChevronDown,
    Clock,
    FileText,
    Loader2,
    Mail,
    MessageSquare,
    Send,
    User,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

export default function RequestForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    aimEmail: '',
    serviceType: '' as ServiceType | '',
    projectTitle: '',
    projectDescription: '',
    scheduledDate: '',
    scheduledTimeSlot: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const weekendDays = useMemo(() => getAvailableWeekendDays(6), []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (stepNum: number): boolean => {
    const newErrors: FormErrors = {};

    if (stepNum === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
      if (!formData.aimEmail.trim()) {
        newErrors.aimEmail = 'Email is required';
      } else if (!formData.aimEmail.toLowerCase().endsWith('@aim.edu')) {
        newErrors.aimEmail = 'Please use your AIM email (@aim.edu)';
      }
    }

    if (stepNum === 2) {
      if (!formData.serviceType) newErrors.serviceType = 'Please select a service';
      if (!formData.projectTitle.trim()) newErrors.projectTitle = 'Project title is required';
      if (formData.projectDescription.trim().length < 20) {
        newErrors.projectDescription = 'Please provide at least 20 characters';
      }
    }

    if (stepNum === 3) {
      if (!formData.scheduledDate) newErrors.scheduledDate = 'Please select a date';
      if (!formData.scheduledTimeSlot) newErrors.scheduledTimeSlot = 'Please select a time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(3, s + 1));
    }
  };

  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    // Full validation with zod
    const result = projectRequestSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setIsSuccess(true);
      toast.success('Project request submitted successfully!');
      setFormData({
        fullName: '',
        aimEmail: '',
        serviceType: '',
        projectTitle: '',
        projectDescription: '',
        scheduledDate: '',
        scheduledTimeSlot: '',
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to submit request'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="request" className="section-padding bg-white dark:bg-aim-navy-light">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="card-glass p-8 sm:p-12"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-aim-navy dark:text-aim-white mb-4">
              Request Submitted! 🎉
            </h3>
            <p className="text-aim-gray dark:text-aim-gray-light mb-3 leading-relaxed">
              Your project request has been received. We&apos;ll review it and reach out to you
              via your AIM email with next steps.
            </p>
            <p className="text-sm text-aim-gray dark:text-aim-gray mb-6">
              Remember: All builds happen on <strong className="text-aim-navy dark:text-aim-white">Saturdays and Sundays</strong>.
              We&apos;ll confirm your scheduled slot shortly.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                setStep(1);
              }}
              className="btn-primary"
            >
              Submit Another Request
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="request" className="section-padding bg-white dark:bg-aim-navy-light relative overflow-hidden">
      <div className="absolute inset-0 bg-aim-mesh opacity-20" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aim-gold/10 border border-aim-gold/20 text-sm font-medium text-aim-gold mb-4">
            <Send className="w-4 h-4" />
            Get Started
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-aim-navy dark:text-aim-white mt-4">
            Submit Your <span className="text-gradient">Project</span>
          </h2>
          <p className="mt-4 text-aim-gray dark:text-aim-gray-light text-base sm:text-lg max-w-2xl mx-auto">
            Tell us about your project and pick a weekend slot.
            Use your AIM email (@aim.edu) for communication.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  step >= s
                    ? 'bg-aim-gold text-aim-navy shadow-lg shadow-aim-gold/20'
                    : 'bg-aim-navy/5 dark:bg-white/5 text-aim-gray'
                }`}
              >
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 sm:w-24 h-1 rounded-full mx-2 transition-all duration-500 ${
                    step > s ? 'bg-aim-gold' : 'bg-aim-navy/10 dark:bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 sm:gap-20 mb-8 text-xs sm:text-sm text-aim-gray">
          <span className={step >= 1 ? 'text-aim-gold font-medium' : ''}>Your Info</span>
          <span className={step >= 2 ? 'text-aim-gold font-medium' : ''}>Project Details</span>
          <span className={step >= 3 ? 'text-aim-gold font-medium' : ''}>Schedule</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="card-glass p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
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
                      placeholder="Enter your full name"
                      className={`input-field ${errors.fullName ? '!border-red-500 !ring-red-500/20' : ''}`}
                    />
                    {errors.fullName && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.fullName}
                      </p>
                    )}
                  </div>

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
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.aimEmail}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-aim-gray">
                      Must be a valid @aim.edu email. All communication will happen through this address.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Project Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="serviceType" className="label-field">
                      <ChevronDown className="w-4 h-4 inline mr-2 opacity-50" />
                      Service Type
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className={`input-field appearance-none ${errors.serviceType ? '!border-red-500 !ring-red-500/20' : ''}`}
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title} — {service.pricing === 'free' ? 'Free' : 'Charged'}
                        </option>
                      ))}
                    </select>
                    {errors.serviceType && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.serviceType}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="projectTitle" className="label-field">
                      <FileText className="w-4 h-4 inline mr-2 opacity-50" />
                      Project Title
                    </label>
                    <input
                      type="text"
                      id="projectTitle"
                      name="projectTitle"
                      value={formData.projectTitle}
                      onChange={handleChange}
                      placeholder="e.g., My Startup Landing Page"
                      className={`input-field ${errors.projectTitle ? '!border-red-500 !ring-red-500/20' : ''}`}
                    />
                    {errors.projectTitle && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.projectTitle}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="projectDescription" className="label-field">
                      <MessageSquare className="w-4 h-4 inline mr-2 opacity-50" />
                      Project Description
                    </label>
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Describe your project in detail: what it should do, key features, any reference sites, etc."
                      className={`input-field resize-none ${errors.projectDescription ? '!border-red-500 !ring-red-500/20' : ''}`}
                    />
                    <div className="flex justify-between mt-2">
                      {errors.projectDescription ? (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.projectDescription}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="text-xs text-aim-gray">
                        {formData.projectDescription.length}/2000
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Scheduling */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="label-field">
                      <Calendar className="w-4 h-4 inline mr-2 opacity-50" />
                      Select a Weekend Date
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                      {weekendDays.slice(0, 12).map((day) => (
                        <button
                          key={day.date.toISOString()}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              scheduledDate: format(day.date, 'yyyy-MM-dd'),
                              scheduledTimeSlot: '',
                            }))
                          }
                          className={`p-3 rounded-xl border-2 text-left transition-all duration-300 ${
                            formData.scheduledDate === format(day.date, 'yyyy-MM-dd')
                              ? 'border-aim-gold bg-aim-gold/10 shadow-md'
                              : 'border-aim-gray-light/30 dark:border-aim-blue/30 hover:border-aim-gold/50'
                          }`}
                        >
                          <p className="text-sm font-bold text-aim-navy dark:text-aim-white">
                            {getDayLabel(day.date)}
                          </p>
                          <p className="text-xs text-aim-gray mt-0.5">
                            {format(day.date, 'MMM d, yyyy')}
                          </p>
                        </button>
                      ))}
                    </div>
                    {errors.scheduledDate && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.scheduledDate}
                      </p>
                    )}
                  </div>

                  {formData.scheduledDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="label-field">
                        <Clock className="w-4 h-4 inline mr-2 opacity-50" />
                        Select a Time Slot
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        {WEEKEND_SLOTS.map((slot) => {
                          const slotValue = `${slot.startTime}-${slot.endTime}`;
                          return (
                            <button
                              key={slotValue}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  scheduledTimeSlot: slotValue,
                                }))
                              }
                              className={`p-3 rounded-xl border-2 flex items-center gap-3 transition-all duration-300 ${
                                formData.scheduledTimeSlot === slotValue
                                  ? 'border-aim-gold bg-aim-gold/10 shadow-md'
                                  : 'border-aim-gray-light/30 dark:border-aim-blue/30 hover:border-aim-gold/50'
                              }`}
                            >
                              <Clock className="w-4 h-4 text-aim-gold flex-shrink-0" />
                              <span className="text-sm font-medium text-aim-navy dark:text-aim-white">
                                {slot.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.scheduledTimeSlot && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.scheduledTimeSlot}
                        </p>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-aim-gray-light/20 dark:border-aim-blue/20">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-ghost"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Request
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
