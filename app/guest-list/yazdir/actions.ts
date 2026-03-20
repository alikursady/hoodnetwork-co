"use server";

import { redirect } from "next/navigation";
import {
  clearOrganizerSession,
  createOrganizerSession,
  getOrganizerSession,
  verifyOrganizerPassword
} from "@/lib/guest-list/auth";
import { addGuestListEntry, deleteGuestListEntry } from "@/lib/guest-list/db";
import { getOrganizerById } from "@/lib/guest-list/config";

function toMessageUrl(status: string) {
  return `/guest-list?org_status=${encodeURIComponent(status)}`;
}

export async function organizerLoginAction(formData: FormData) {
  const organizerId = String(formData.get("organizer_id") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const organizer = getOrganizerById(organizerId);
  if (!organizer) {
    redirect(toMessageUrl("organizer-not-found"));
  }

  if (!verifyOrganizerPassword(organizer.id, password)) {
    redirect(toMessageUrl("invalid-login"));
  }

  createOrganizerSession(organizer.id);
  redirect("/guest-list");
}

export async function organizerLogoutAction() {
  clearOrganizerSession();
  redirect("/guest-list");
}

export async function addGuestAction(formData: FormData) {
  const session = getOrganizerSession();
  if (!session) {
    redirect(toMessageUrl("login-required"));
  }

  const firstName = String(formData.get("first_name") ?? "").trim();
  const lastName = String(formData.get("last_name") ?? "").trim();

  if (!firstName || !lastName) {
    redirect(toMessageUrl("name-required"));
  }

  if (firstName.length > 60 || lastName.length > 60) {
    redirect(toMessageUrl("name-too-long"));
  }

  const inserted = await addGuestListEntry({
    organizerId: session.id,
    organizerName: session.name,
    firstName,
    lastName
  });

  if (!inserted.ok && inserted.reason === "duplicate") {
    redirect(toMessageUrl("duplicate"));
  }

  redirect(toMessageUrl("added"));
}

export async function removeGuestAction(formData: FormData) {
  const session = getOrganizerSession();
  if (!session) {
    redirect(toMessageUrl("login-required"));
  }

  const entryId = String(formData.get("entry_id") ?? "").trim();
  if (!entryId) {
    redirect(toMessageUrl("delete-failed"));
  }

  const result = await deleteGuestListEntry({
    entryId,
    organizerId: session.id
  });

  if (!result.deleted) {
    redirect(toMessageUrl("delete-failed"));
  }

  redirect(toMessageUrl("deleted"));
}
