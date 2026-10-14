import { NextRequest, NextResponse } from "next/server";
import {
  addBooking,
  getAllBookings,
  Booking,
} from "@/lib/bookingsStore";
import { insertGoogleCalendarEvent } from "@/lib/googleCalendar";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "usr_client_1";
  const bookings = getAllBookings();
  
  const hasUnreadNotification = bookings.some(
    (b) => b.has_unread_notification
  );

  return NextResponse.json({
    success: true,
    has_unread_notification: hasUnreadNotification,
    count: bookings.length,
    bookings,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const bookingId = `bk_${Date.now()}`;
    const startTimeISO =
      body.startTimeISO || new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString();
    const endTimeISO =
      body.endTimeISO || new Date(Date.now() + 21 * 60 * 60 * 1000).toISOString();

    const localNombre = body.localNombre || "Barbería Patagonia Cuts";
    const servicioNombre = body.servicioNombre || "Corte + Barba";
    const profesionalNombre = body.profesionalNombre || "Marcos Barber";
    const direccion = body.localDireccion || "Av. Alvear 840, Argentina";
    const userEmail = body.userEmail || "juan.perez@gmail.com";

    // 1. Sincronizar de forma asíncrona con la API de Google Calendar
    const gcalEvent = await insertGoogleCalendarEvent({
      bookingId,
      localNombre,
      servicioNombre,
      profesionalNombre,
      direccion,
      startTimeISO,
      endTimeISO,
      clientEmail: userEmail,
    });

    // 2. Construir y guardar el turno en la base de datos
    const newBooking: Booking = {
      id: bookingId,
      userId: body.userId || "usr_client_1",
      userName: body.userName || "Juan Pérez",
      userEmail: userEmail,
      localId: body.localId || "loc_1",
      localNombre: localNombre,
      localDireccion: direccion,
      localImagen:
        body.localImagen ||
        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=500&q=80",
      servicioNombre: servicioNombre,
      profesionalNombre: profesionalNombre,
      precio: body.precio || 12500,
      startTimeISO,
      endTimeISO,
      estado: "Confirmado",
      googleCalendarEventId: gcalEvent.id,
      googleCalendarUrl: gcalEvent.htmlLink,
      has_unread_notification: true, // Bolita roja activa inmediatamente al confirmar
      notification_sent: true,
      created_at: new Date().toISOString(),
    };

    addBooking(newBooking);

    return NextResponse.json(
      {
        success: true,
        message: "Reserva creada exitosamente y sincronizada con Google Calendar.",
        booking: newBooking,
        googleCalendar: gcalEvent,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Error al crear la reserva" },
      { status: 500 }
    );
  }
}
