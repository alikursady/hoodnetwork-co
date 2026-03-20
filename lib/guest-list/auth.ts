import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getOrganizerById } from "@/lib/guest-list/config";

const ORGANIZER_COOKIE_NAME = "hood_organizer_session";
const STAFF_COOKIE_NAME = "hood_staff_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

type SessionPayload = {
  role: "organizer" | "staff";
  organizerId?: string;
  exp: number;
};

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET tanimli degil.");
  }
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function encode(payload: SessionPayload) {
  const json = JSON.stringify(payload);
  const base64 = Buffer.from(json, "utf8").toString("base64url");
  const signature = sign(base64);
  return `${base64}.${signature}`;
}

function decode(token: string): SessionPayload | null {
  const [base64, signature] = token.split(".");
  if (!base64 || !signature) return null;

  const expected = sign(base64);
  const left = Buffer.from(signature, "utf8");
  const right = Buffer.from(expected, "utf8");
  if (left.length !== right.length) return null;
  if (!timingSafeEqual(left, right)) return null;

  try {
    const json = Buffer.from(base64, "base64url").toString("utf8");
    const payload = JSON.parse(json) as SessionPayload;
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

function setCookie(name: string, value: string) {
  cookies().set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/"
  });
}

export function clearOrganizerSession() {
  cookies().delete(ORGANIZER_COOKIE_NAME);
}

export function clearStaffSession() {
  cookies().delete(STAFF_COOKIE_NAME);
}

export function createOrganizerSession(organizerId: string) {
  const token = encode({
    role: "organizer",
    organizerId,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000
  });
  setCookie(ORGANIZER_COOKIE_NAME, token);
}

export function createStaffSession() {
  const token = encode({
    role: "staff",
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000
  });
  setCookie(STAFF_COOKIE_NAME, token);
}

export function getOrganizerSession() {
  const raw = cookies().get(ORGANIZER_COOKIE_NAME)?.value;
  if (!raw) return null;
  const payload = decode(raw);
  if (!payload || payload.role !== "organizer" || !payload.organizerId) return null;

  const organizer = getOrganizerById(payload.organizerId);
  if (!organizer) return null;
  return organizer;
}

export function getStaffSession() {
  const raw = cookies().get(STAFF_COOKIE_NAME)?.value;
  if (!raw) return null;
  const payload = decode(raw);
  if (!payload || payload.role !== "staff") return null;
  return { role: "staff" as const };
}

export function verifyOrganizerPassword(organizerId: string, password: string) {
  const organizer = getOrganizerById(organizerId);
  if (!organizer) return false;
  const expectedPassword = process.env[organizer.passwordEnvKey];
  if (!expectedPassword) return false;
  return password === expectedPassword;
}

export function verifyStaffPassword(password: string) {
  const staffPassword = process.env.STAFF_LOGIN_PASSWORD;
  if (!staffPassword) return false;
  return password === staffPassword;
}
