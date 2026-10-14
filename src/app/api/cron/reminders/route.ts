import { NextRequest, NextResponse } from "next/server";
import { checkAndTrigger24HourReminders } from "@/lib/bookingsStore";

/**
 * Cron Job / Scheduled Worker Endpoint
 * Executed periodically (e.g. every 15 minutes) to find bookings within the 24-hour window
 * and flag `has_unread_notification = true` & trigger FCM Push Notifications.
 */
export async function GET(req: NextRequest) {
  const triggered = checkAndTrigger24HourReminders();

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    triggeredCount: triggered.length,
    triggeredBookings: triggered.map((b) => ({
      id: b.id,
      localNombre: b.localNombre,
      servicioNombre: b.servicioNombre,
      startTimeISO: b.startTimeISO,
      userId: b.userId,
    })),
    message:
      triggered.length > 0
        ? `Se enviaron ${triggered.length} notificaciones Push (FCM) y se activó el punto rojo en la interfaz del usuario.`
        : "No hay reservas nuevas dentro de la ventana de 24 horas.",
  });
}

export async function POST(req: NextRequest) {
  return GET(req);
}
