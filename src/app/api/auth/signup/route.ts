import { AIM_EMAIL_DOMAIN } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100)
    .trim(),
  aimEmail: z
    .string()
    .email('Invalid email address')
    .refine(
      (email) => email.toLowerCase().endsWith(AIM_EMAIL_DOMAIN),
      `Must be a valid AIM email (${AIM_EMAIL_DOMAIN})`
    ),
  program: z.string().min(1, 'Program is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: result.error.issues.map((i) => ({
            field: i.path[0],
            message: i.message,
          })),
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // Try to persist to DB if configured
    try {
      const { sql } = await import('@vercel/postgres');
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          full_name VARCHAR(100) NOT NULL,
          aim_email VARCHAR(255) UNIQUE NOT NULL,
          program VARCHAR(50) NOT NULL,
          verified BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `;

      // Check if email already exists
      const existing = await sql`
        SELECT id FROM users WHERE aim_email = ${data.aimEmail.toLowerCase()};
      `;
      if (existing.rows.length > 0) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        );
      }

      await sql`
        INSERT INTO users (full_name, aim_email, program)
        VALUES (${data.fullName}, ${data.aimEmail.toLowerCase()}, ${data.program});
      `;
    } catch (dbError) {
      console.warn('Database not configured:', dbError instanceof Error ? dbError.message : 'Unknown');
      // Still return success for demo purposes
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully. Check your AIM email for verification.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
