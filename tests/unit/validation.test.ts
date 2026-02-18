import { describe, expect, it } from 'vitest';
import { projectRequestSchema } from '../../src/lib/validation';

/**
 * Test suite for the Zod validation schema used in the project request form.
 * This is the first line of defense — all data must pass these before hitting the API.
 */

// ----- Valid payloads -----

const validPayload = {
  fullName: 'Juan Dela Cruz',
  aimEmail: 'juan.delacruz@aim.edu',
  serviceType: 'website' as const,
  projectTitle: 'My Startup Landing Page',
  projectDescription: 'I need a modern landing page for my fintech startup. It should have hero, features, pricing, and contact sections.',
  scheduledDate: '2026-02-21', // a Saturday
  scheduledTimeSlot: '09:00-10:30',
};

describe('projectRequestSchema — happy path', () => {
  it('accepts a fully valid payload', () => {
    const result = projectRequestSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('accepts all valid service types', () => {
    const types = ['website', 'mobile_app', 'web_app', 'llm_model', 'other'] as const;
    for (const st of types) {
      const result = projectRequestSchema.safeParse({ ...validPayload, serviceType: st });
      expect(result.success).toBe(true);
    }
  });

  it('trims whitespace from fullName', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, fullName: '  Juan Dela Cruz  ' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fullName).toBe('Juan Dela Cruz');
    }
  });

  it('trims whitespace from projectTitle', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, projectTitle: '  My Page  ' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.projectTitle).toBe('My Page');
    }
  });
});

// ----- fullName field -----

describe('projectRequestSchema — fullName', () => {
  it('rejects empty fullName', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, fullName: '' });
    expect(result.success).toBe(false);
  });

  it('rejects fullName shorter than 2 chars', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, fullName: 'A' });
    expect(result.success).toBe(false);
  });

  it('rejects fullName longer than 100 chars', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, fullName: 'A'.repeat(101) });
    expect(result.success).toBe(false);
  });

  it('accepts a 2-character fullName', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, fullName: 'Jo' });
    expect(result.success).toBe(true);
  });
});

// ----- aimEmail field -----

describe('projectRequestSchema — aimEmail', () => {
  it('rejects non-email strings', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, aimEmail: 'notanemail' });
    expect(result.success).toBe(false);
  });

  it('rejects non-AIM emails (gmail)', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, aimEmail: 'user@gmail.com' });
    expect(result.success).toBe(false);
  });

  it('rejects non-AIM emails (yahoo)', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, aimEmail: 'user@yahoo.com' });
    expect(result.success).toBe(false);
  });

  it('rejects emails ending in @aim.edu.ph (wrong domain)', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, aimEmail: 'user@aim.edu.ph' });
    expect(result.success).toBe(false);
  });

  it('rejects empty email', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, aimEmail: '' });
    expect(result.success).toBe(false);
  });

  it('accepts uppercase AIM email (case-insensitive check)', () => {
    // The schema uses .toLowerCase() internally, so the email string itself
    // passes as long as its lowered form ends with @aim.edu
    const result = projectRequestSchema.safeParse({ ...validPayload, aimEmail: 'Juan@AIM.EDU' });
    expect(result.success).toBe(true);
  });

  it('accepts valid @aim.edu email', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, aimEmail: 'student123@aim.edu' });
    expect(result.success).toBe(true);
  });
});

// ----- serviceType field -----

describe('projectRequestSchema — serviceType', () => {
  it('rejects empty serviceType', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, serviceType: '' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid serviceType', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, serviceType: 'invalid_service' });
    expect(result.success).toBe(false);
  });

  it('rejects undefined serviceType', () => {
    const { serviceType, ...rest } = validPayload;
    const result = projectRequestSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });
});

// ----- projectTitle field -----

describe('projectRequestSchema — projectTitle', () => {
  it('rejects empty projectTitle', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, projectTitle: '' });
    expect(result.success).toBe(false);
  });

  it('rejects projectTitle shorter than 3 chars', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, projectTitle: 'AB' });
    expect(result.success).toBe(false);
  });

  it('rejects projectTitle longer than 200 chars', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, projectTitle: 'A'.repeat(201) });
    expect(result.success).toBe(false);
  });
});

// ----- projectDescription field -----

describe('projectRequestSchema — projectDescription', () => {
  it('rejects empty description', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, projectDescription: '' });
    expect(result.success).toBe(false);
  });

  it('rejects description shorter than 20 chars', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, projectDescription: 'Too short desc.' });
    expect(result.success).toBe(false);
  });

  it('rejects description longer than 2000 chars', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, projectDescription: 'A'.repeat(2001) });
    expect(result.success).toBe(false);
  });

  it('accepts exactly 20-char description', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, projectDescription: 'A'.repeat(20) });
    expect(result.success).toBe(true);
  });
});

// ----- scheduledDate & scheduledTimeSlot -----

describe('projectRequestSchema — schedule fields', () => {
  it('rejects empty scheduledDate', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, scheduledDate: '' });
    expect(result.success).toBe(false);
  });

  it('rejects empty scheduledTimeSlot', () => {
    const result = projectRequestSchema.safeParse({ ...validPayload, scheduledTimeSlot: '' });
    expect(result.success).toBe(false);
  });

  it('accepts valid scheduledDate and scheduledTimeSlot', () => {
    const result = projectRequestSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });
});

// ----- Completely invalid payloads -----

describe('projectRequestSchema — garbage input', () => {
  it('rejects null', () => {
    const result = projectRequestSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  it('rejects undefined', () => {
    const result = projectRequestSchema.safeParse(undefined);
    expect(result.success).toBe(false);
  });

  it('rejects empty object', () => {
    const result = projectRequestSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('rejects array', () => {
    const result = projectRequestSchema.safeParse([validPayload]);
    expect(result.success).toBe(false);
  });

  it('reports all missing fields at once', () => {
    const result = projectRequestSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      // Should have errors for all 7 required fields
      const fields = result.error.issues.map((i) => i.path[0]);
      expect(fields).toContain('fullName');
      expect(fields).toContain('aimEmail');
      expect(fields).toContain('serviceType');
      expect(fields).toContain('projectTitle');
      expect(fields).toContain('projectDescription');
      expect(fields).toContain('scheduledDate');
      expect(fields).toContain('scheduledTimeSlot');
    }
  });
});
