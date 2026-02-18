import {
    addDays,
    format,
    isAfter,
    isSaturday,
    isSunday,
    parse,
    startOfDay,
} from 'date-fns';
import { WEEKEND_SLOTS } from './constants';
import { ScheduleDay, TimeSlot } from './types';

/**
 * Get the next N available weekend days (Saturday and Sunday only).
 * Build sessions only happen on weekends.
 */
export function getAvailableWeekendDays(
  weeksAhead: number = 4
): ScheduleDay[] {
  const today = startOfDay(new Date());
  const days: ScheduleDay[] = [];
  const totalDays = weeksAhead * 7;

  for (let i = 1; i <= totalDays; i++) {
    const date = addDays(today, i);
    const dayOfWeek = date.getDay();

    if (isSaturday(date) || isSunday(date)) {
      const slots: TimeSlot[] = WEEKEND_SLOTS.map((slot, index) => ({
        id: `${format(date, 'yyyy-MM-dd')}-${index}`,
        date: format(date, 'yyyy-MM-dd'),
        startTime: slot.startTime,
        endTime: slot.endTime,
        isAvailable: true,
        maxCapacity: 3,
        currentBookings: 0,
      }));

      days.push({
        date,
        dayOfWeek,
        isWeekend: true,
        slots,
      });
    }
  }

  return days;
}

/**
 * Format a date for display
 */
export function formatScheduleDate(dateStr: string): string {
  const date = parse(dateStr, 'yyyy-MM-dd', new Date());
  return format(date, 'EEEE, MMMM d, yyyy');
}

/**
 * Check if a date is in the future
 */
export function isFutureDate(dateStr: string): boolean {
  const date = parse(dateStr, 'yyyy-MM-dd', new Date());
  return isAfter(date, startOfDay(new Date()));
}

/**
 * Get the label for a day type
 */
export function getDayLabel(date: Date): string {
  if (isSaturday(date)) return 'Saturday';
  if (isSunday(date)) return 'Sunday';
  return format(date, 'EEEE');
}

/**
 * Group weekend days by week
 */
export function groupByWeek(days: ScheduleDay[]): ScheduleDay[][] {
  const weeks: ScheduleDay[][] = [];
  let currentWeek: ScheduleDay[] = [];

  days.forEach((day, index) => {
    currentWeek.push(day);
    // If it's Sunday or last item, push the week
    if (isSunday(day.date) || index === days.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return weeks;
}
