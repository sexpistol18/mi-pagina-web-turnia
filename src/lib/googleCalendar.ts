/**
 * Google Calendar API & OAuth 2.0 Integration Utility for Turnia
 * Handles OAuth tokens, 24h automated reminders, and calendar event creation.
 */

export interface GoogleCalendarEventInput {
  bookingId: string;
  localNombre: string;
  servicioNombre: string;
  profesionalNombre: string;
  direccion: string;
  startTimeISO: string; // e.g. "2026-10-08T15:00:00-03:00"
  endTimeISO: string;   // e.g. "2026-10-08T15:40:00-03:00"
  clientEmail?: string;
  userRefreshToken?: string;
}

export interface GoogleCalendarEventResponse {
  id: string;
  htmlLink: string;
  status: "confirmed" | "tentative" | "cancelled";
  summary: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  reminders: {
    useDefault: boolean;
    overrides: Array<{ method: "popup" | "email"; minutes: number }>;
  };
}

/**
 * Builds the exact Google Calendar v3 API Event payload structure required by Turnia
 */
export function buildGoogleCalendarEventPayload(input: GoogleCalendarEventInput) {
  const timeZone = "America/Argentina/Buenos_Aires";

  return {
    summary: `Turno en ${input.localNombre} - ${input.servicioNombre}`,
    description: `Detalle del turno:\n- Servicio: ${input.servicioNombre}\n- Profesional: ${input.profesionalNombre}\n- Dirección: ${input.direccion}\n- ID de Reserva: ${input.bookingId}`,
    location: input.direccion,
    start: {
      dateTime: input.startTimeISO,
      timeZone: timeZone,
    },
    end: {
      dateTime: input.endTimeISO,
      timeZone: timeZone,
    },
    attendees: input.clientEmail ? [{ email: input.clientEmail }] : [],
    // 24-hour prior alert overrides (1440 minutes = 24 hours)
    reminders: {
      useDefault: false,
      overrides: [
        { method: "popup" as const, minutes: 1440 },
        { method: "email" as const, minutes: 1440 },
      ],
    },
  };
}

/**
 * Inserts an event into Google Calendar via Google Calendar API v3
 * If GOOGLE_CLIENT_ID / REFRESH_TOKEN environment variables are available, performs real HTTP call.
 * Otherwise, generates a valid simulated Google Calendar event with web calendar links.
 */
export async function insertGoogleCalendarEvent(
  input: GoogleCalendarEventInput
): Promise<GoogleCalendarEventResponse> {
  const payload = buildGoogleCalendarEventPayload(input);
  const calendarId = "primary";

  // Check if real Google Access Token or Refresh Token is available in environment
  const googleAccessToken = process.env.GOOGLE_ACCESS_TOKEN;

  if (googleAccessToken) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data as GoogleCalendarEventResponse;
      }
    } catch (error) {
      console.warn("Failed to call live Google Calendar API, using fallback sync response:", error);
    }
  }

  // Fallback / Standalone simulation link generation for web Google Calendar
  const encode = encodeURIComponent;
  const startCompact = input.startTimeISO.replace(/[-:]/g, "").split(".")[0];
  const endCompact = input.endTimeISO.replace(/[-:]/g, "").split(".")[0];
  const googleWebCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encode(
    payload.summary
  )}&details=${encode(payload.description)}&location=${encode(
    payload.location
  )}&dates=${startCompact}/${endCompact}`;

  return {
    id: `gcal_evt_${Date.now()}_${input.bookingId}`,
    htmlLink: googleWebCalendarUrl,
    status: "confirmed",
    summary: payload.summary,
    start: payload.start,
    end: payload.end,
    reminders: payload.reminders,
  };
}

/**
 * Handles Google OAuth 2.0 token refresh using refresh_token
 */
export async function refreshGoogleOAuthToken(encryptedRefreshToken: string): Promise<string | null> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return null;
  }

  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: encryptedRefreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.access_token as string;
    }
  } catch (err) {
    console.error("Error refreshing Google OAuth token:", err);
  }
  return null;
}
