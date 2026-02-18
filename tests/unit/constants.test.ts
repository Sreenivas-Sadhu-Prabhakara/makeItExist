import { describe, expect, it } from 'vitest';
import { AIM_EMAIL_DOMAIN, SERVICES, STATS, WEEKEND_SLOTS } from '../../src/lib/constants';

/**
 * Tests for constants to ensure data integrity.
 * Catches accidental edits to critical configuration values.
 */

describe('SERVICES', () => {
  it('has exactly 5 services', () => {
    expect(SERVICES.length).toBe(5);
  });

  it('has "website" as the first (free) service', () => {
    expect(SERVICES[0].id).toBe('website');
    expect(SERVICES[0].pricing).toBe('free');
  });

  it('only has one free service (websites)', () => {
    const freeServices = SERVICES.filter((s) => s.pricing === 'free');
    expect(freeServices.length).toBe(1);
    expect(freeServices[0].id).toBe('website');
  });

  it('charges for mobile_app, web_app, llm_model, and other', () => {
    const chargedIds = SERVICES.filter((s) => s.pricing === 'charged').map((s) => s.id);
    expect(chargedIds).toContain('mobile_app');
    expect(chargedIds).toContain('web_app');
    expect(chargedIds).toContain('llm_model');
    expect(chargedIds).toContain('other');
  });

  it('each service has required properties', () => {
    for (const s of SERVICES) {
      expect(s.id).toBeTruthy();
      expect(s.title).toBeTruthy();
      expect(s.description).toBeTruthy();
      expect(s.icon).toBeTruthy();
      expect(s.features.length).toBeGreaterThan(0);
      expect(s.pricingNote).toBeTruthy();
      expect(typeof s.available).toBe('boolean');
    }
  });

  it('service IDs match the ServiceType union', () => {
    const validIds = ['website', 'mobile_app', 'web_app', 'llm_model', 'other'];
    for (const s of SERVICES) {
      expect(validIds).toContain(s.id);
    }
  });
});

describe('WEEKEND_SLOTS', () => {
  it('has exactly 5 time slots', () => {
    expect(WEEKEND_SLOTS.length).toBe(5);
  });

  it('starts at 09:00', () => {
    expect(WEEKEND_SLOTS[0].startTime).toBe('09:00');
  });

  it('ends at 17:30', () => {
    expect(WEEKEND_SLOTS[WEEKEND_SLOTS.length - 1].endTime).toBe('17:30');
  });

  it('has no overlapping time slots', () => {
    for (let i = 1; i < WEEKEND_SLOTS.length; i++) {
      // Each slot's start time should be >= previous slot's end time
      expect(WEEKEND_SLOTS[i].startTime >= WEEKEND_SLOTS[i - 1].endTime).toBe(true);
    }
  });

  it('each slot has a human-readable label', () => {
    for (const slot of WEEKEND_SLOTS) {
      expect(slot.label).toBeTruthy();
      expect(slot.label).toContain('–'); // en-dash separator
    }
  });

  it('each slot has valid time format (HH:MM)', () => {
    const timeRegex = /^\d{2}:\d{2}$/;
    for (const slot of WEEKEND_SLOTS) {
      expect(slot.startTime).toMatch(timeRegex);
      expect(slot.endTime).toMatch(timeRegex);
    }
  });
});

describe('AIM_EMAIL_DOMAIN', () => {
  it('is @aim.edu', () => {
    expect(AIM_EMAIL_DOMAIN).toBe('@aim.edu');
  });
});

describe('STATS', () => {
  it('has exactly 4 stats', () => {
    expect(STATS.length).toBe(4);
  });

  it('each stat has a label, value, and icon', () => {
    for (const stat of STATS) {
      expect(stat.label).toBeTruthy();
      expect(stat.value).toBeTruthy();
      expect(stat.icon).toBeTruthy();
    }
  });
});
