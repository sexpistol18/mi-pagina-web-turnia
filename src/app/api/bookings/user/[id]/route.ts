import { NextRequest, NextResponse } from "next/server";
import { getBookingsByUserId } from "@/lib/bookingsStore";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userBookings = getBookingsByUserId(id);

  const hasUnreadNotification = userBookings.some(
    (b) => b.has_unread_notification
  );

  return NextResponse.json({
    success: true,
    userId: id,
    has_unread_notification: hasUnreadNotification,
    count: userBookings.length,
    bookings: userBookings,
  });
}
