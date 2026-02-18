import { addDays, format, isSaturday, isSunday } from 'date-fns';
import { describe, expect, it } from 'vitest';
import {
    formatScheduleDate,
    getAvailableWeekendDays,
    getDayLabel,
    groupByWeek,
    isFutureDate,
} from '../../src/lib/scheduling';

/**
 * Test suite for the scheduling logic.
 * Ensures weekend-only enforcement, correct date calculations,
 * grouping, and slot generation.
 */

describe('getAvailableWeekendDays', () => {
  it('returns only Saturdays and Sundays', () => {
    const days = getAvailableWeekendDays(4);
    for (const day of days) {
      expect(day.isWeekend).toBe(true);
      expect(isSaturday(day.date) || isSunday(day.date)).toBe(true);
    }
  });

  it('returns days in the future (no past dates)', () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = getAvailableWeekendDays(4);
    for (const day of days) {
      expect(day.date.getTime()).toBeGreaterThan(today.getTime());
    }
  });

  it('returns at least 1 weekend day for 1 week ahead', () => {
    const days = getAvailableWeekendDays(1);
    expect(days.length).toBeGreaterThanOrEqual(1);
    expect(days.length).toBeLessThanOrEqual(2);
  });

  it('returns approximately 2 * weeksAhead days for many weeks', () => {
    const weeks = 6;
    const days = getAvailableWeekendDays(weeks);
    // Each week has at most 2 weekend days
    expect(days.length).toBeLessThanOrEqual(weeks * 2);
    expect(days.length).toBeGreaterThanOrEqual(weeks); // at least 1 per week
  });

  it('returns dates in chronological order', () => {
    const days = getAvailableWeekendDays(4);
    for (let i = 1; i < days.length; i++) {
      expect(days[i].date.getTime()).toBeGreaterThan(days[i - 1].date.getTime());
    }
  });

  it('generates 5 time slots per day matching WEEKEND_SLOTS', () => {
    const days = getAvailableWeekendDays(2);
    for (const day of days) {
      expect(day.slots.length).toBe(5);
      expect(day.slots[0].startTime).toBe('09:00');
      expect(day.slots[0].endTime).toBe('10:30');
      expect(day.slots[4].startTime).toBe('16:00');
      expect(day.slots[4].endTime).toBe('17:30');
    }
  });

  it('marks all generated slots as available with 0 bookings', () => {
    const days = getAvailableWeekendDays(2);
    for (const day of days) {
      for (const slot of day.slots) {
        expect(slot.isAvailable).toBe(true);
        expect(slot.currentBookings).toBe(0);
        expect(slot.maxCapacity).toBe(3);
      }
    }
  });

  it('generates unique slot IDs', () => {
    const days = getAvailableWeekendDays(4);
    const allIds = days.flatMap((d) => d.slots.map((s) => s.id));
    const uniqueIds = new Set(allIds);
    expect(uniqueIds.size).toBe(allIds.length);
  });
});

describe('getDayLabel', () => {
  it('returns "Saturday" for Saturdays', () => {
    // Find the next Saturday
    let date = new Date();
    while (!isSaturday(date)) {
      date = addDays(date, 1);
    }
    expect(getDayLabel(date)).toBe('Saturday');
  });

  it('returns "Sunday" for Sundays', () => {
    let date = new Date();
    while (!isSunday(date)) {
      date = addDays(date, 1);
    }
    expect(getDayLabel(date)).toBe('Sunday');
  });

  it('returns the weekday name for non-weekend days', () => {
    // Find the next Monday
    let date = new Date();
    while (date.getDay() !== 1) {
      date = addDays(date, 1);
    }
    expect(getDayLabel(date)).toBe('Monday');
  });
});

describe('formatScheduleDate', () => {
  it('formats a date string correctly', () => {
    const formatted = formatScheduleDate('2026-02-21');
    expect(formatted).toBe('Saturday, February 21, 2026');
  });

  it('formats a Sunday date correctly', () => {
    const formatted = formatScheduleDate('2026-02-22');
    expect(formatted).toBe('Sunday, February 22, 2026');
  });
});

describe('isFutureDate', () => {
  it('returns true for a date in the future', () => {
    const futureDate = format(addDays(new Date(), 7), 'yyyy-MM-dd');
    expect(isFutureDate(futureDate)).toBe(true);
  });

  it('returns false for today', () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    expect(isFutureDate(today)).toBe(false);
  });

  it('returns false for a date in the past', () => {
    expect(isFutureDate('2020-01-01')).toBe(false);
  });
});

describe('groupByWeek', () => {
  it('groups weekend days into weeks ending on Sunday', () => {
    const days = getAvailableWeekendDays(4);
    const weeks = groupByWeek(days);

    for (const week of weeks) {
      expect(week.length).toBeGreaterThanOrEqual(1);
      expect(week.length).toBeLessThanOrEqual(2);

      // Last day in the group should be Sunday (except possibly the very last group)
      if (week.length === 2) {
        expect(isSaturday(week[0].date)).toBe(true);
        expect(isSunday(week[1].date)).toBe(true);
      }
    }
  });

  it('returns the correct number of weeks', () => {
    const days = getAvailableWeekendDays(4);
    const weeks = groupByWeek(days);
    // 4 weeks ahead → up to 4 groups (some may be partial)
    expect(weeks.length).toBeGreaterThanOrEqual(1);
    expect(weeks.length).toBeLessThanOrEqual(5);
  });

  it('returns empty array for empty input', () => {
    const weeks = groupByWeek([]);
    expect(weeks).toEqual([]);
  });
});
