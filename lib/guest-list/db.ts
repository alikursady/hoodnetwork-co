import { Pool } from "pg";
import { GUEST_LIST_EVENT_SLUG } from "@/lib/guest-list/config";
import type { GuestListEntry, GuestListStats } from "@/lib/guest-list/types";

let pool: Pool | null = null;

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL tanimli degil.");
  }
  return databaseUrl;
}

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: getDatabaseUrl()
    });
  }
  return pool;
}

function normalizeName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeGuestName(firstName: string, lastName: string) {
  return {
    firstName: normalizeName(firstName),
    lastName: normalizeName(lastName)
  };
}

export async function getOrganizerEntries(organizerId: string): Promise<GuestListEntry[]> {
  const result = await getPool().query<GuestListEntry>(
    `SELECT
      id,
      organizer_id,
      organizer_name,
      first_name,
      last_name,
      event_slug,
      checked_in,
      checked_in_at,
      created_at
    FROM guest_list_entries
    WHERE event_slug = $1
      AND organizer_id = $2
    ORDER BY created_at DESC`,
    [GUEST_LIST_EVENT_SLUG, organizerId]
  );
  return result.rows;
}

export async function addGuestListEntry(input: {
  organizerId: string;
  organizerName: string;
  firstName: string;
  lastName: string;
}) {
  const { firstName, lastName } = normalizeGuestName(input.firstName, input.lastName);

  try {
    const result = await getPool().query<GuestListEntry>(
      `INSERT INTO guest_list_entries (
        organizer_id,
        organizer_name,
        first_name,
        last_name,
        event_slug
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        organizer_id,
        organizer_name,
        first_name,
        last_name,
        event_slug,
        checked_in,
        checked_in_at,
        created_at`,
      [input.organizerId, input.organizerName, firstName, lastName, GUEST_LIST_EVENT_SLUG]
    );

    return { ok: true as const, entry: result.rows[0] };
  } catch (error: unknown) {
    const pgError = error as { code?: string };
    if (pgError.code === "23505") {
      return { ok: false as const, reason: "duplicate" as const };
    }
    throw error;
  }
}

export async function deleteGuestListEntry(input: { entryId: string; organizerId: string }) {
  const result = await getPool().query(
    `DELETE FROM guest_list_entries
     WHERE id = $1
       AND organizer_id = $2
       AND event_slug = $3`,
    [input.entryId, input.organizerId, GUEST_LIST_EVENT_SLUG]
  );

  return { deleted: (result.rowCount ?? 0) > 0 };
}

export async function getStaffList(input: { query: string; organizerId: string }) {
  const q = input.query.trim();
  const organizerFilter = input.organizerId.trim();

  const where: string[] = ["event_slug = $1"];
  const values: string[] = [GUEST_LIST_EVENT_SLUG];
  let idx = 2;

  if (organizerFilter && organizerFilter !== "all") {
    where.push(`organizer_id = $${idx++}`);
    values.push(organizerFilter);
  }

  if (q) {
    where.push(
      `(first_name ILIKE $${idx} OR last_name ILIKE $${idx} OR organizer_name ILIKE $${idx} OR (first_name || ' ' || last_name) ILIKE $${idx})`
    );
    values.push(`%${q}%`);
    idx += 1;
  }

  const result = await getPool().query<GuestListEntry>(
    `SELECT
      id,
      organizer_id,
      organizer_name,
      first_name,
      last_name,
      event_slug,
      checked_in,
      checked_in_at,
      created_at
    FROM guest_list_entries
    WHERE ${where.join(" AND ")}
    ORDER BY created_at DESC`,
    values
  );

  return result.rows;
}

export async function getGuestListStats(): Promise<GuestListStats> {
  const result = await getPool().query<{
    total: string;
    checked_in_count: string;
    not_checked_in_count: string;
  }>(
    `SELECT
      COUNT(*)::text AS total,
      COUNT(*) FILTER (WHERE checked_in = true)::text AS checked_in_count,
      COUNT(*) FILTER (WHERE checked_in = false)::text AS not_checked_in_count
    FROM guest_list_entries
    WHERE event_slug = $1`,
    [GUEST_LIST_EVENT_SLUG]
  );

  const row = result.rows[0] ?? {
    total: "0",
    checked_in_count: "0",
    not_checked_in_count: "0"
  };

  return {
    total: Number(row.total),
    checkedIn: Number(row.checked_in_count),
    notCheckedIn: Number(row.not_checked_in_count)
  };
}

export async function setCheckIn(input: { entryId: string; checkedIn: boolean }) {
  const result = await getPool().query(
    `UPDATE guest_list_entries
     SET
       checked_in = $1,
       checked_in_at = CASE WHEN $1 THEN NOW() ELSE NULL END
     WHERE id = $2
       AND event_slug = $3`,
    [input.checkedIn, input.entryId, GUEST_LIST_EVENT_SLUG]
  );

  return { updated: (result.rowCount ?? 0) > 0 };
}
