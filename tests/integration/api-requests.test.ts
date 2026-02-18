import { describe, expect, it } from 'vitest';

/**
 * Integration tests for the /api/requests endpoint.
 * These test the actual route handler logic by constructing NextRequest objects.
 *
 * NOTE: These import the route handler directly and call it with mock Request objects,
 * so they don't need a running server. The DB layer is gracefully handled
 * (the route already catches DB errors and returns success with a temp ID).
 */

// We dynamically import the POST handler to avoid top-level module issues
async function callPOST(body: unknown) {
  const { POST } = await import('../../src/app/api/requests/route');
  const request = new Request('http://localhost:3000/api/requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  // NextRequest extends Request, so we cast
  return POST(request as any);
}

const validPayload = {
  fullName: 'Maria Santos',
  aimEmail: 'maria.santos@aim.edu',
  serviceType: 'website',
  projectTitle: 'My Portfolio Site',
  projectDescription: 'I need a professional portfolio website to showcase my MBA projects and career achievements at AIM.',
  scheduledDate: '2026-02-21', // Saturday
  scheduledTimeSlot: '09:00-10:30',
};

describe('POST /api/requests — valid submissions', () => {
  it('returns 201 for a valid request', async () => {
    const response = await callPOST(validPayload);
    expect(response.status).toBe(201);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data).toBeDefined();
    expect(json.data.serviceType).toBe('website');
    expect(json.data.scheduledDate).toBe('2026-02-21');
    expect(json.data.scheduledTimeSlot).toBe('09:00-10:30');
  });

  it('returns a request ID (temp or real)', async () => {
    const response = await callPOST(validPayload);
    const json = await response.json();
    expect(json.data.id).toBeDefined();
    expect(typeof json.data.id).toBe('string');
  });

  it('returns a createdAt timestamp', async () => {
    const response = await callPOST(validPayload);
    const json = await response.json();
    expect(json.data.createdAt).toBeDefined();
  });
});

describe('POST /api/requests — validation errors', () => {
  it('returns 400 for empty body', async () => {
    const response = await callPOST({});
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toBe('Validation failed');
    expect(json.details).toBeDefined();
    expect(json.details.length).toBeGreaterThan(0);
  });

  it('returns 400 for non-AIM email', async () => {
    const response = await callPOST({ ...validPayload, aimEmail: 'user@gmail.com' });
    expect(response.status).toBe(400);
  });

  it('returns 400 for missing serviceType', async () => {
    const { serviceType, ...rest } = validPayload;
    const response = await callPOST(rest);
    expect(response.status).toBe(400);
  });

  it('returns 400 for short description', async () => {
    const response = await callPOST({ ...validPayload, projectDescription: 'Too short' });
    expect(response.status).toBe(400);
  });

  it('returns 400 for empty scheduledDate', async () => {
    const response = await callPOST({ ...validPayload, scheduledDate: '' });
    expect(response.status).toBe(400);
  });

  it('returns 400 for empty scheduledTimeSlot', async () => {
    const response = await callPOST({ ...validPayload, scheduledTimeSlot: '' });
    expect(response.status).toBe(400);
  });
});

describe('POST /api/requests — weekend enforcement', () => {
  it('returns 400 for a weekday date (Monday)', async () => {
    const response = await callPOST({ ...validPayload, scheduledDate: '2026-02-23' }); // Monday
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toContain('Saturday');
  });

  it('returns 400 for a weekday date (Wednesday)', async () => {
    const response = await callPOST({ ...validPayload, scheduledDate: '2026-02-25' }); // Wednesday
    expect(response.status).toBe(400);
  });

  it('returns 400 for a weekday date (Friday)', async () => {
    const response = await callPOST({ ...validPayload, scheduledDate: '2026-02-20' }); // Friday
    expect(response.status).toBe(400);
  });

  it('accepts Saturday dates', async () => {
    const response = await callPOST({ ...validPayload, scheduledDate: '2026-02-21' }); // Saturday
    expect(response.status).toBe(201);
  });

  it('accepts Sunday dates', async () => {
    const response = await callPOST({ ...validPayload, scheduledDate: '2026-02-22' }); // Sunday
    expect(response.status).toBe(201);
  });
});

describe('POST /api/requests — future date enforcement', () => {
  it('returns 400 for a past date', async () => {
    const response = await callPOST({ ...validPayload, scheduledDate: '2024-01-06' }); // past Saturday
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toContain('future');
  });
});

describe('POST /api/requests — malformed input', () => {
  it('returns 500 for non-JSON body', async () => {
    const { POST } = await import('../../src/app/api/requests/route');
    const request = new Request('http://localhost:3000/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'this is not json',
    });
    const response = await POST(request as any);
    expect(response.status).toBe(500);
  });
});

describe('GET /api/requests', () => {
  it('returns API info', async () => {
    const { GET } = await import('../../src/app/api/requests/route');
    const response = await GET();
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.message).toContain('Make It Exist');
  });
});
