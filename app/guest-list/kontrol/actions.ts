"use server";

import { redirect } from "next/navigation";
import { clearStaffSession, getStaffSession } from "@/lib/guest-list/auth";
import { setCheckIn } from "@/lib/guest-list/db";

export async function staffLogoutAction() {
  clearStaffSession();
  redirect("/guest-list");
}

export async function toggleCheckInAction(formData: FormData) {
  const staff = getStaffSession();
  if (!staff) {
    redirect("/guest-list?staff_status=login-required");
  }

  const entryId = String(formData.get("entry_id") ?? "").trim();
  const value = String(formData.get("checked_in") ?? "").trim();
  const checkedIn = value === "true";

  if (!entryId) return;

  await setCheckIn({ entryId, checkedIn });
}
