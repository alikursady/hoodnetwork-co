CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS guest_list_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organizer_id text NOT NULL,
  organizer_name text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  event_slug text NOT NULL DEFAULT 'hood-network-event',
  checked_in boolean NOT NULL DEFAULT false,
  checked_in_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS guest_list_entries_unique_person_per_organizer_event
ON guest_list_entries (
  event_slug,
  organizer_id,
  lower(trim(first_name)),
  lower(trim(last_name))
);

CREATE INDEX IF NOT EXISTS guest_list_entries_event_idx
ON guest_list_entries (event_slug);

CREATE INDEX IF NOT EXISTS guest_list_entries_organizer_idx
ON guest_list_entries (organizer_id);
