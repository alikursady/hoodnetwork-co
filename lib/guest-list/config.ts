export const GUEST_LIST_EVENT_SLUG = "hood-network-event";

export type OrganizerConfig = {
  id: "mert" | "kursat" | "emre" | "batuhan";
  name: string;
  slug: string;
  passwordEnvKey: string;
};

export const ORGANIZERS: OrganizerConfig[] = [
  {
    id: "mert",
    name: "Mert",
    slug: "mert",
    passwordEnvKey: "ORGANIZER_MERT_PASSWORD"
  },
  {
    id: "kursat",
    name: "Kürşat",
    slug: "kursat",
    passwordEnvKey: "ORGANIZER_KURSAT_PASSWORD"
  },
  {
    id: "emre",
    name: "Emre",
    slug: "emre",
    passwordEnvKey: "ORGANIZER_EMRE_PASSWORD"
  },
  {
    id: "batuhan",
    name: "Batuhan",
    slug: "batuhan",
    passwordEnvKey: "ORGANIZER_BATUHAN_PASSWORD"
  }
];

export function getOrganizerById(id: string) {
  return ORGANIZERS.find((organizer) => organizer.id === id) ?? null;
}
