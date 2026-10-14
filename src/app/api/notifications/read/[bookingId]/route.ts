import { NextRequest, NextResponse } from "next/server";
import { markNotificationAsRead } from "@/lib/bookingsStore";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  const { bookingId } = await params;

  const success = markNotificationAsRead(bookingId);

  if (success) {
    return NextResponse.json({
      success: true,
      message: `Notificación del turno ${bookingId} marcada como leída.`,
      bookingId,
    });
  } else {
    return NextResponse.json(
      {
        success: false,
        message: `No se encontró la reserva con ID ${bookingId}`,
      },
      { status: 404 }
    );
  }
}
