/**
 * Contact form API layer — posts submissions to a Google Apps Script Web App
 * which appends them to a Google Sheet.
 *
 * The Apps Script source lives in `code.gs` at the project root.
 */

export const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyV-f-sNKOEZEy88heHye1GPBOzDgdU4_ESqb722jXcHuapMavPcuqGKDrtdt9b7RQuvw/exec";

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,19}$/;

/** Client-side validation. Returns a map of field → error message. */
export function validateContact(payload: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};

  const name = payload.name.trim();
  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Name is too short.";

  const email = payload.email.trim();
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";

  const phone = payload.phone.trim();
  if (phone && !PHONE_RE.test(phone)) errors.phone = "Enter a valid phone number.";

  const subject = payload.subject.trim();
  if (!subject) errors.subject = "Please add a subject.";
  else if (subject.length < 3) errors.subject = "Subject is too short.";

  const message = payload.message.trim();
  if (!message) errors.message = "Please write a message.";
  else if (message.length < 10) errors.message = "Message should be at least 10 characters.";

  return errors;
}

function trimPayload(payload: ContactPayload): ContactPayload {
  return {
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    subject: payload.subject.trim(),
    message: payload.message.trim(),
  };
}

/**
 * POSTs the form as JSON to the Apps Script Web App.
 *
 * `Content-Type: text/plain` keeps this a "simple" CORS request so the
 * browser never sends a preflight (Apps Script cannot answer OPTIONS).
 * If the opaque/CORS read fails, we retry in `no-cors` mode so the row is
 * still written even when the response can't be inspected.
 */
export async function submitForm(payload: ContactPayload): Promise<void> {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    throw new Error("Google Apps Script URL is not configured in src/lib/contact.ts");
  }

  const clean = trimPayload(payload);
  const errors = validateContact(clean);
  const firstError = Object.values(errors)[0];
  if (firstError) throw new Error(firstError);

  const body = JSON.stringify({ timestamp: new Date().toISOString(), ...clean });

  let text: string | null = null;

  try {
    const res = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
    });
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    text = await res.text();
  } catch {
    // CORS or network read failure: fire-and-forget so the row still lands.
    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
    });
    return;
  }

  // Non-JSON responses (Google redirect HTML) are treated as delivered.
  try {
    const data = JSON.parse(text) as { status?: string; message?: string };
    if (data.status === "error") {
      throw new Error(data.message || "The server rejected the submission.");
    }
  } catch (err) {
    if (err instanceof Error && !(err instanceof SyntaxError)) throw err;
  }
}
