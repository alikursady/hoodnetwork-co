import type { Metadata } from "next";
import Link from "next/link";
import { Manrope } from "next/font/google";
import { Container } from "@/components/ui/container";
import { SubmitButton } from "@/components/guest-list/submit-button";
import { ORGANIZERS } from "@/lib/guest-list/config";
import { getOrganizerSession, getStaffSession } from "@/lib/guest-list/auth";
import { getGuestListStats, getOrganizerEntries, getStaffList } from "@/lib/guest-list/db";
import {
  addGuestAction,
  organizerLoginAction,
  organizerLogoutAction,
  removeGuestAction
} from "@/app/guest-list/yazdir/actions";
import { staffLogoutAction, toggleCheckInAction } from "@/app/guest-list/kontrol/actions";
import { staffLoginAction } from "@/app/guest-list/kontrol/login/actions";

const manrope = Manrope({
  subsets: ["latin-ext"],
  weight: ["400", "500", "600", "700"]
});

type PageProps = {
  searchParams?: {
    org_status?: string;
    staff_status?: string;
    q?: string;
    organizer?: string;
    mode?: string;
  };
};

const ORG_STATUS_MESSAGES: Record<string, { text: string; tone: "success" | "error" }> = {
  "organizer-not-found": { text: "Organizer seçimi geçersiz.", tone: "error" },
  "invalid-login": { text: "Organizer giriş bilgileri hatalı.", tone: "error" },
  "login-required": { text: "Devam etmek için organizer girişi yapmalısın.", tone: "error" },
  "name-required": { text: "Ad ve soyad alanı zorunludur.", tone: "error" },
  "name-too-long": { text: "Ad veya soyad çok uzun.", tone: "error" },
  duplicate: { text: "Bu kişi senin guest listende zaten kayıtlı görünüyor.", tone: "error" },
  added: { text: "İsim guest list'e eklendi.", tone: "success" },
  deleted: { text: "Kayıt listeden kaldırıldı.", tone: "success" },
  "delete-failed": { text: "Kayıt kaldırılamadı, lütfen tekrar dene.", tone: "error" }
};

const STAFF_STATUS_MESSAGES: Record<string, { text: string; tone: "success" | "error" }> = {
  invalid: { text: "Staff şifresi hatalı.", tone: "error" },
  "login-required": { text: "Kontrol ekranı için staff girişi gerekir.", tone: "error" }
};

export const metadata: Metadata = {
  title: "Guest List",
  description: "Guest List Yazdır ve Kontrol ekranı"
};

function MessageBox({
  text,
  tone
}: {
  text: string;
  tone: "success" | "error";
}) {
  const className =
    tone === "success"
      ? "border-emerald-600/40 bg-emerald-950/30 text-emerald-200"
      : "border-rose-600/40 bg-rose-950/30 text-rose-200";

  return <div className={`rounded-xl border px-4 py-3 text-sm ${className}`}>{text}</div>;
}

export default async function GuestListPage({ searchParams }: PageProps) {
  const organizerSession = getOrganizerSession();
  const staffSession = getStaffSession();

  const query = String(searchParams?.q ?? "");
  const organizerFilter = String(searchParams?.organizer ?? "all");
  const mode = searchParams?.mode === "staff" ? "staff" : "organizer";

  const [organizerEntries, stats, rows] = await Promise.all([
    organizerSession ? getOrganizerEntries(organizerSession.id) : Promise.resolve([]),
    staffSession ? getGuestListStats() : Promise.resolve({ total: 0, checkedIn: 0, notCheckedIn: 0 }),
    staffSession ? getStaffList({ query, organizerId: organizerFilter }) : Promise.resolve([])
  ]);

  const orgMessage = searchParams?.org_status ? ORG_STATUS_MESSAGES[searchParams.org_status] : undefined;
  const staffMessage = searchParams?.staff_status
    ? STAFF_STATUS_MESSAGES[searchParams.staff_status]
    : undefined;

  return (
    <Container>
      <section className={`relative mx-auto max-w-4xl py-10 sm:py-14 ${manrope.className}`}>
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute -left-16 -top-24 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-sky-700/10 blur-3xl" />
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-textPrimary sm:text-4xl">Guest List</h1>
        <p className="mt-3 text-sm text-textMuted sm:text-base">Devam etmek için panel seç.</p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            href="/guest-list?mode=organizer"
            className={`rounded-xl border px-4 py-3 ${
              mode === "organizer"
                ? "border-accent bg-accentSoft text-textPrimary"
                : "border-border bg-surface text-textMuted hover:border-accentSoft hover:text-textPrimary"
            }`}
          >
            <p className="text-sm font-semibold">Organizer Paneli</p>
            <p className="mt-1 text-xs opacity-90">Kendi listene isim ekle ve kayıtlarını yönet.</p>
          </Link>
          <Link
            href="/guest-list?mode=staff"
            className={`rounded-xl border px-4 py-3 ${
              mode === "staff"
                ? "border-accent bg-accentSoft text-textPrimary"
                : "border-border bg-surface text-textMuted hover:border-accentSoft hover:text-textPrimary"
            }`}
          >
            <p className="text-sm font-semibold">Staff / Kapı Paneli</p>
            <p className="mt-1 text-xs opacity-90">Kapı girişlerini kontrol et ve check-in işle.</p>
          </Link>
        </div>

        {mode === "organizer" ? (
          <div className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-textPrimary">Guest List Yazdır</h2>
            <p className="mt-2 text-sm text-textMuted">Kendi listene isim ekle.</p>

            {orgMessage ? (
              <div className="mt-4">
                <MessageBox text={orgMessage.text} tone={orgMessage.tone} />
              </div>
            ) : null}

            {!organizerSession ? (
              <form action={organizerLoginAction} className="mt-5 space-y-4">
                <label className="block text-sm text-textMuted">
                  Kimsin?
                  <select
                    name="organizer_id"
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none focus:border-accent"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Organizer seç
                    </option>
                    {ORGANIZERS.map((organizer) => (
                      <option key={organizer.id} value={organizer.id}>
                        {organizer.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm text-textMuted">
                  Şifre
                  <input
                    name="password"
                    type="password"
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none focus:border-accent"
                    required
                  />
                </label>

                <SubmitButton
                  idleText="Giriş yap"
                  loadingText="Giriş..."
                  className="inline-flex rounded-xl border border-accent bg-accentSoft px-5 py-3 text-sm font-medium text-textPrimary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </form>
            ) : (
              <div className="mt-5 space-y-5">
                <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                  <p className="text-sm text-textPrimary">Organizer: {organizerSession.name}</p>
                  <form action={organizerLogoutAction}>
                    <SubmitButton
                      idleText="Çıkış"
                      loadingText="..."
                      className="rounded-lg border border-border px-3 py-2 text-xs text-textMuted transition hover:border-accentSoft hover:text-textPrimary disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </form>
                </div>

                <form action={addGuestAction} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    name="first_name"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none focus:border-accent"
                    placeholder="Ad"
                    required
                  />
                  <input
                    name="last_name"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none focus:border-accent"
                    placeholder="Soyad"
                    required
                  />
                  <div className="sm:col-span-2">
                    <SubmitButton
                      idleText="İsim ekle"
                      loadingText="Ekleniyor..."
                      className="inline-flex rounded-xl border border-accent bg-accentSoft px-5 py-3 text-sm font-medium text-textPrimary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </form>

                <div>
                  <p className="text-sm font-medium text-textPrimary">Eklediklerin</p>
                  {organizerEntries.length === 0 ? (
                    <p className="mt-2 text-sm text-textMuted">Henüz kişi yok.</p>
                  ) : (
                    <ul className="mt-3 space-y-2">
                      {organizerEntries.map((entry) => (
                        <li
                          key={entry.id}
                          className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3"
                        >
                          <p className="text-sm text-textPrimary">
                            {entry.first_name} {entry.last_name}
                          </p>
                          <form action={removeGuestAction}>
                            <input type="hidden" name="entry_id" value={entry.id} />
                            <SubmitButton
                              idleText="Sil"
                              loadingText="..."
                              className="rounded-lg border border-border px-3 py-2 text-xs text-textMuted transition hover:border-accentSoft hover:text-textPrimary disabled:cursor-not-allowed disabled:opacity-60"
                            />
                          </form>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-textPrimary">Kapı Giriş Listesi</h2>
            <p className="mt-2 text-sm text-textMuted">Kontrol paneli</p>

            {staffMessage ? (
              <div className="mt-4">
                <MessageBox text={staffMessage.text} tone={staffMessage.tone} />
              </div>
            ) : null}

            {!staffSession ? (
              <form action={staffLoginAction} className="mt-5 space-y-4">
                <input
                  type="password"
                  name="password"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none focus:border-accent"
                  placeholder="Staff şifresi"
                  required
                />
                <SubmitButton
                  idleText="Staff girişi"
                  loadingText="Giriş..."
                  className="inline-flex rounded-xl border border-accent bg-accentSoft px-5 py-3 text-sm font-medium text-textPrimary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </form>
            ) : (
              <div className="mt-5 space-y-5">
                <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                  <div className="text-sm text-textPrimary">
                    Toplam: {stats.total} · Gelen: {stats.checkedIn} · Gelmeyen: {stats.notCheckedIn}
                  </div>
                  <form action={staffLogoutAction}>
                    <SubmitButton
                      idleText="Çıkış"
                      loadingText="..."
                      className="rounded-lg border border-border px-3 py-2 text-xs text-textMuted transition hover:border-accentSoft hover:text-textPrimary disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </form>
                </div>

                <form action="/guest-list" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <input type="hidden" name="mode" value="staff" />
                  <input
                    type="text"
                    name="q"
                    defaultValue={query}
                    placeholder="Ara (ad, soyad, organizer)"
                    className="rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none focus:border-accent sm:col-span-2"
                  />
                  <select
                    name="organizer"
                    defaultValue={organizerFilter}
                    className="rounded-xl border border-border bg-background px-4 py-3 text-textPrimary outline-none focus:border-accent"
                  >
                    <option value="all">Tüm organizerlar</option>
                    {ORGANIZERS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      className="inline-flex rounded-xl border border-accent bg-accentSoft px-4 py-2 text-sm font-medium text-textPrimary transition hover:opacity-90"
                    >
                      Filtrele
                    </button>
                  </div>
                </form>

                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="min-w-full text-left text-xs sm:text-sm">
                    <thead className="border-b border-border bg-background/70 text-[11px] uppercase tracking-wide text-textMuted">
                      <tr>
                        <th className="px-3 py-2">Organizer</th>
                        <th className="px-3 py-2">Ad</th>
                        <th className="px-3 py-2">Soyad</th>
                        <th className="px-3 py-2">Durum</th>
                        <th className="px-3 py-2">İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-3 py-6 text-center text-textMuted">
                            Kayıt yok.
                          </td>
                        </tr>
                      ) : (
                        rows.map((entry) => (
                          <tr
                            key={entry.id}
                            className={`border-b border-border last:border-b-0 ${
                              entry.checked_in ? "bg-emerald-950/20" : "bg-transparent"
                            }`}
                          >
                            <td className="px-3 py-2 text-textPrimary">{entry.organizer_name}</td>
                            <td className="px-3 py-2 text-textPrimary">{entry.first_name}</td>
                            <td className="px-3 py-2 text-textPrimary">{entry.last_name}</td>
                            <td className="px-3 py-2 text-textMuted">{entry.checked_in ? "Geldi" : "Gelmedi"}</td>
                            <td className="px-3 py-2">
                              <form action={toggleCheckInAction}>
                                <input type="hidden" name="entry_id" value={entry.id} />
                                <input type="hidden" name="checked_in" value={entry.checked_in ? "false" : "true"} />
                                <SubmitButton
                                  idleText={entry.checked_in ? "Kaldır" : "Geldi"}
                                  loadingText="..."
                                  className="rounded-lg border border-border px-2.5 py-1.5 text-[11px] text-textMuted transition hover:border-accentSoft hover:text-textPrimary disabled:cursor-not-allowed disabled:opacity-60"
                                />
                              </form>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </Container>
  );
}
