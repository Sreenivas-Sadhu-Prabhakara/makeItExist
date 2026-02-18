import { describe, expect, it } from 'vitest';

/**
 * Integration tests for the /api/schedule endpoint.
 * Tests that the schedule API returns correct weekend-only data.
 */

async function callGET(params: Record<string, string> = {}) {
  const { GET } = await import('../../src/app/api/schedule/route');
  const url = new URL('http://localhost:3000/api/schedule');
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const request = new Request(url.toString(), { method: 'GET' });
  return GET(request as any);
}

describe('GET /api/schedule', () => {
  it('returns success response', async () => {
    const response = await callGET();
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data).toBeDefined();
    expect(Array.isArray(json.data)).toBe(true);
  });

  it('returns only weekend days (Saturday=6, Sunday=0)', async () => {
    const response = await callGET({ weeks: '4' });
    const json = await response.json();
    for (const day of json.data) {
      expect([0, 6]).toContain(day.dayOfWeek);
    }
  });

  it('returns correct dayLabel for each day', async () => {
    const response = await callGET({ weeks: '4' });
    const json = await response.json();
    for (const day of json.data) {
      if (day.dayOfWeek === 0) {
        expect(day.dayLabel).toBe('Sunday');
      } else {
        expect(day.dayLabel).toBe('Saturday');
      }
    }
  });

  it('returns 5 time slots per day', async () => {
    const response = await callGET({ weeks: '2' });
    const json = await response.json();
    for (const day of json.data) {
      expect(day.slots.length).toBe(5);
    }
  });

  it('returns slots with correct structure', async () => {
    const response = await callGET({ weeks: '1' });
    const json = await response.json();
    const day = json.data[0];
    expect(day).toBeDefined();
    const slot = day.slots[0];
    expect(slot.startTime).toBeDefined();
    expect(slot.endTime).toBeDefined();
    expect(slot.label).toBeDefined();
    expect(typeof slot.currentBookings).toBe('number');
    expect(typeof slot.maxCapacity).toBe('number');
    expect(typeof slot.isAvailable).toBe('boolean');
    expect(typeof slot.availableSlots).toBe('number');
  });

  it('all slots show as available when no DB', async () => {
    const response = await callGET({ weeks: '2' });
    const json = await response.json();
    for (const day of json.data) {
      for (const slot of day.slots) {
        expect(slot.isAvailable).toBe(true);
        expect(slot.currentBookings).toBe(0);
        expect(slot.availableSlots).toBe(3);
      }
    }
  });

  it('respects the weeks parameter', async () => {
    const r1 = await callGET({ weeks: '1' });
    const r2 = await callGET({ weeks: '4' });
    const d1 = (await r1.json()).data;
    const d2 = (await r2.json()).data;
    expect(d2.length).toBeGreaterThanOrEqual(d1.length);
  });

  it('caps weeks at 12', async () => {
    const response = await callGET({ weeks: '100' });
    const json = await response.json();
    // 12 weeks * 2 weekend days = max 24 days
    expect(json.data.length).toBeLessThanOrEqual(24);
  });

  it('returns dates as YYYY-MM-DD strings', async () => {
    const response = await callGET({ weeks: '2' });
    const json = await response.json();
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    for (const day of json.data) {
      expect(day.date).toMatch(dateRegex);
    }
  });

  it('returns dates in chronological order', async () => {
    const response = await callGET({ weeks: '4' });
    const json = await response.json();
    for (let i = 1; i < json.data.length; i++) {
      expect(json.data[i].date > json.data[i - 1].date).toBe(true);
    }
  });
});
