// Types for the Make It Exist platform

export type ServiceType =
  | 'website'
  | 'mobile_app'
  | 'web_app'
  | 'llm_model'
  | 'other';

export type RequestStatus =
  | 'pending'
  | 'approved'
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type PricingType = 'free' | 'charged';

export interface Service {
  id: ServiceType;
  title: string;
  description: string;
  pricing: PricingType;
  pricingNote: string;
  icon: string;
  features: string[];
  available: boolean;
}

export interface TimeSlot {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  isAvailable: boolean;
  maxCapacity: number;
  currentBookings: number;
}

export interface ProjectRequest {
  id?: string;
  fullName: string;
  aimEmail: string;
  serviceType: ServiceType;
  projectTitle: string;
  projectDescription: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
  status: RequestStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScheduleDay {
  date: Date;
  dayOfWeek: number; // 0=Sun, 6=Sat
  isWeekend: boolean;
  slots: TimeSlot[];
}

export interface FormErrors {
  [key: string]: string;
}
