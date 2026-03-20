"use server";

import { redirect } from "next/navigation";
import { createStaffSession, verifyStaffPassword } from "@/lib/guest-list/auth";

function toLoginUrl(status: string) {
  return `/guest-list?staff_status=${encodeURIComponent(status)}`;
}

export async function staffLoginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!verifyStaffPassword(password)) {
    redirect(toLoginUrl("invalid"));
  }

  createStaffSession();
  redirect("/guest-list");
}
