import { sql } from '@vercel/postgres';

/**
 * Database operations for the Make It Exist platform.
 * Uses Vercel Postgres for serverless SQL.
 */

// Create the tables if they don't exist
export async function initializeDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS project_requests (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      aim_email VARCHAR(255) NOT NULL,
      service_type VARCHAR(50) NOT NULL,
      project_title VARCHAR(200) NOT NULL,
      project_description TEXT NOT NULL,
      scheduled_date DATE NOT NULL,
      scheduled_time_slot VARCHAR(20) NOT NULL,
      status VARCHAR(20) DEFAULT 'pending' NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS schedule_bookings (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      request_id UUID REFERENCES project_requests(id),
      slot_date DATE NOT NULL,
      start_time VARCHAR(10) NOT NULL,
      end_time VARCHAR(10) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_requests_email ON project_requests(aim_email);
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_requests_status ON project_requests(status);
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_bookings_date ON schedule_bookings(slot_date);
  `;
}

// Insert a new project request
export async function createProjectRequest(data: {
  fullName: string;
  aimEmail: string;
  serviceType: string;
  projectTitle: string;
  projectDescription: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
}) {
  const result = await sql`
    INSERT INTO project_requests (
      full_name, aim_email, service_type, project_title,
      project_description, scheduled_date, scheduled_time_slot, status
    ) VALUES (
      ${data.fullName}, ${data.aimEmail}, ${data.serviceType},
      ${data.projectTitle}, ${data.projectDescription},
      ${data.scheduledDate}, ${data.scheduledTimeSlot}, 'pending'
    )
    RETURNING id, created_at;
  `;

  // Also create a booking record
  const requestId = result.rows[0].id;
  const [startTime, endTime] = data.scheduledTimeSlot.split('-');

  await sql`
    INSERT INTO schedule_bookings (request_id, slot_date, start_time, end_time)
    VALUES (${requestId}, ${data.scheduledDate}, ${startTime}, ${endTime});
  `;

  return result.rows[0];
}

// Get booking count for a specific date and time slot
export async function getSlotBookingCount(
  date: string,
  startTime: string,
  endTime: string
): Promise<number> {
  const result = await sql`
    SELECT COUNT(*) as count
    FROM schedule_bookings
    WHERE slot_date = ${date}
      AND start_time = ${startTime}
      AND end_time = ${endTime};
  `;
  return parseInt(result.rows[0].count, 10);
}

// Get all bookings for a date range
export async function getBookingsForDateRange(
  startDate: string,
  endDate: string
) {
  const result = await sql`
    SELECT slot_date, start_time, end_time, COUNT(*) as booking_count
    FROM schedule_bookings
    WHERE slot_date >= ${startDate} AND slot_date <= ${endDate}
    GROUP BY slot_date, start_time, end_time;
  `;
  return result.rows;
}

// Get requests by email
export async function getRequestsByEmail(email: string) {
  const result = await sql`
    SELECT * FROM project_requests
    WHERE aim_email = ${email}
    ORDER BY created_at DESC;
  `;
  return result.rows;
}
