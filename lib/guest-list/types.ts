export type GuestListEntry = {
  id: string;
  organizer_id: string;
  organizer_name: string;
  first_name: string;
  last_name: string;
  event_slug: string;
  checked_in: boolean;
  checked_in_at: string | null;
  created_at: string;
};

export type GuestListStats = {
  total: number;
  checkedIn: number;
  notCheckedIn: number;
};
