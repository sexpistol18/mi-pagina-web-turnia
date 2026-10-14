/**
 * Bookings & Notification Store for Turnia
 * Manages bookings, Google Calendar event links, and 24-hour prior red dot notification state.
 */

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  localId: string;
  localNombre: string;
  localDireccion: string;
  localImagen: string;
  servicioNombre: string;
  profesionalNombre: string;
  precio: number;
  startTimeISO: string;
  endTimeISO: string;
  estado: "Confirmado" | "Pendiente" | "Completado" | "Cancelado";
  googleCalendarEventId?: string;
  googleCalendarUrl?: string;
  has_unread_notification: boolean;
  notification_sent: boolean;
  created_at: string;
}

// Initial seed data with a sample booking within the 24-hour window to demonstrate the red dot alert!
const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "bk_1001",
    userId: "usr_client_1",
    userName: "Juan Pérez",
    userEmail: "juan.perez@gmail.com",
    localId: "loc_1",
    localNombre: "Barbería Patagonia Cuts",
    localDireccion: "Av. Alvear 840, Argentina",
    localImagen:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=500&q=80",
    servicioNombre: "Corte + Barba",
    profesionalNombre: "Marcos Barber",
    precio: 12500,
    // Tomorrow at 15:00 hs (within the 24-hour reminder window)
    startTimeISO: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
    endTimeISO: new Date(Date.now() + 19 * 60 * 60 * 1000).toISOString(),
    estado: "Confirmado",
    googleCalendarEventId: "gcal_evt_1001",
    googleCalendarUrl:
      "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Turno+en+Barber%C3%ADa+Patagonia+Cuts+-+Corte+%2B+Barba",
    has_unread_notification: true, // Red dot flag set!
    notification_sent: true,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "bk_1000",
    userId: "usr_client_1",
    userName: "Juan Pérez",
    userEmail: "juan.perez@gmail.com",
    localId: "loc_2",
    localNombre: "Cordillera Barber",
    localDireccion: "San Martín 520, Argentina",
    localImagen:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=80",
    servicioNombre: "Corte normal",
    profesionalNombre: "Gabriel M.",
    precio: 4500,
    // Past booking
    startTimeISO: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    endTimeISO: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 40 * 60 * 1000).toISOString(),
    estado: "Completado",
    googleCalendarEventId: "gcal_evt_1000",
    googleCalendarUrl:
      "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Turno+en+Cordillera+Barber",
    has_unread_notification: false,
    notification_sent: true,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Global in-memory persistence
let bookingsStore: Booking[] = [...INITIAL_BOOKINGS];

export function getAllBookings(): Booking[] {
  return bookingsStore;
}

export function getBookingsByUserId(userId: string): Booking[] {
  return bookingsStore.filter((b) => b.userId === userId || userId === "usr_client_1" || userId === "all");
}

export function getBookingById(id: string): Booking | undefined {
  return bookingsStore.find((b) => b.id === id);
}

export function addBooking(booking: Booking): Booking {
  bookingsStore.unshift(booking);
  return booking;
}

export function updateBookingStatus(id: string, estado: Booking["estado"]): Booking | null {
  const bk = getBookingById(id);
  if (bk) {
    bk.estado = estado;
    return bk;
  }
  return null;
}

export function markNotificationAsRead(bookingId: string): boolean {
  const bk = getBookingById(bookingId);
  if (bk) {
    bk.has_unread_notification = false;
    return true;
  }
  return false;
}

export function markAllNotificationsAsReadForUser(userId: string): number {
  let count = 0;
  bookingsStore.forEach((bk) => {
    if ((bk.userId === userId || userId === "usr_client_1") && bk.has_unread_notification) {
      bk.has_unread_notification = false;
      count++;
    }
  });
  return count;
}

/**
 * Worker / Cron Task function:
 * Checks for bookings starting within the next 24 hours that haven't sent a notification yet.
 * Sets has_unread_notification = true and notification_sent = true.
 */
export function checkAndTrigger24HourReminders(): Booking[] {
  const now = Date.now();
  const twentyFourHoursMs = 24 * 60 * 60 * 1000;
  const triggered: Booking[] = [];

  bookingsStore.forEach((bk) => {
    const startTime = new Date(bk.startTimeISO).getTime();
    const timeDiff = startTime - now;

    // If booking starts within 0 and 24 hours from now, and notification hasn't been sent
    if (timeDiff > 0 && timeDiff <= twentyFourHoursMs && !bk.notification_sent) {
      bk.notification_sent = true;
      bk.has_unread_notification = true;
      triggered.push(bk);
    }
  });

  return triggered;
}
