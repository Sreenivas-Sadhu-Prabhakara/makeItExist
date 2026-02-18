import { projectRequestSchema } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const result = projectRequestSchema.safeParse(body);
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

    // Validate that the scheduled date is a weekend (Saturday or Sunday)
    const scheduledDate = new Date(data.scheduledDate + 'T00:00:00');
    const dayOfWeek = scheduledDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      return NextResponse.json(
        { error: 'Builds can only be scheduled on Saturdays and Sundays' },
        { status: 400 }
      );
    }

    // Validate that the scheduled date is in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (scheduledDate <= today) {
      return NextResponse.json(
        { error: 'Scheduled date must be in the future' },
        { status: 400 }
      );
    }

    // Try to save to database if Postgres is configured
    let savedRequest = null;
    try {
      const { createProjectRequest, initializeDatabase } = await import(
        '@/lib/db'
      );
      await initializeDatabase();
      savedRequest = await createProjectRequest({
        fullName: data.fullName,
        aimEmail: data.aimEmail,
        serviceType: data.serviceType,
        projectTitle: data.projectTitle,
        projectDescription: data.projectDescription,
        scheduledDate: data.scheduledDate,
        scheduledTimeSlot: data.scheduledTimeSlot,
      });
    } catch (dbError) {
      // If DB is not configured, still accept the request
      // In production, this should be properly logged
      console.warn(
        'Database not configured, request accepted without persistence:',
        dbError instanceof Error ? dbError.message : 'Unknown error'
      );
      savedRequest = {
        id: `temp-${Date.now()}`,
        created_at: new Date().toISOString(),
      };
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Project request submitted successfully',
        data: {
          id: savedRequest.id,
          createdAt: savedRequest.created_at,
          scheduledDate: data.scheduledDate,
          scheduledTimeSlot: data.scheduledTimeSlot,
          serviceType: data.serviceType,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Make It Exist API - Project Requests',
    version: '1.0.0',
    endpoints: {
      POST: 'Submit a new project request',
    },
  });
}
