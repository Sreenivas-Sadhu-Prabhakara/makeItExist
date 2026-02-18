import { z } from 'zod';
import { AIM_EMAIL_DOMAIN } from './constants';

export const projectRequestSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .trim(),
  aimEmail: z
    .string()
    .email('Please enter a valid email address')
    .refine(
      (email) => email.toLowerCase().endsWith(AIM_EMAIL_DOMAIN),
      `Please use your AIM email (must end with ${AIM_EMAIL_DOMAIN})`
    ),
  serviceType: z.enum(
    ['website', 'mobile_app', 'web_app', 'llm_model', 'other'],
    { errorMap: () => ({ message: 'Please select a service type' }) }
  ),
  projectTitle: z
    .string()
    .min(3, 'Project title must be at least 3 characters')
    .max(200, 'Project title must be under 200 characters')
    .trim(),
  projectDescription: z
    .string()
    .min(20, 'Please provide at least 20 characters of description')
    .max(2000, 'Description must be under 2000 characters')
    .trim(),
  scheduledDate: z.string().min(1, 'Please select a date'),
  scheduledTimeSlot: z.string().min(1, 'Please select a time slot'),
});

export type ProjectRequestInput = z.infer<typeof projectRequestSchema>;
