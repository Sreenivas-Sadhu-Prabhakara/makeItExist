import { WEEKEND_SLOTS } from '@/lib/constants';
import { getAvailableWeekendDays } from '@/lib/scheduling';
import { format } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const weeksAhead = parseInt(searchParams.get('weeks') || '6', 10);

    const weekendDays = getAvailableWeekendDays(Math.min(weeksAhead, 12));

    // Try to get actual booking counts from DB
    let bookingCounts: Record<string, number> = {};
    try {
      const { getBookingsForDateRange } = await import('@/lib/db');
      if (weekendDays.length > 0) {
        const startDate = format(weekendDays[0].date, 'yyyy-MM-dd');
        const endDate = format(
          weekendDays[weekendDays.length - 1].date,
          'yyyy-MM-dd'
        );
        const bookings = await getBookingsForDateRange(startDate, endDate);
        bookings.forEach((b: { slot_date: string; start_time: string; end_time: string; booking_count: string }) => {
          const key = `${b.slot_date}-${b.start_time}-${b.end_time}`;
          bookingCounts[key] = parseInt(b.booking_count, 10);
        });
      }
    } catch {
      // DB not configured, all slots show as available
    }

    // Build response with availability info
    const schedule = weekendDays.map((day) => ({
      date: format(day.date, 'yyyy-MM-dd'),
      dayOfWeek: day.dayOfWeek,
      dayLabel: day.dayOfWeek === 0 ? 'Sunday' : 'Saturday',
      slots: WEEKEND_SLOTS.map((slot) => {
        const key = `${format(day.date, 'yyyy-MM-dd')}-${slot.startTime}-${slot.endTime}`;
        const bookings = bookingCounts[key] || 0;
        const maxCapacity = 3;
        return {
          startTime: slot.startTime,
          endTime: slot.endTime,
          label: slot.label,
          currentBookings: bookings,
          maxCapacity,
          isAvailable: bookings < maxCapacity,
          availableSlots: maxCapacity - bookings,
        };
      }),
    }));

    return NextResponse.json({
      success: true,
      data: schedule,
    });
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schedule' },
      { status: 500 }
    );
  }
}
