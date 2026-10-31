/** "2026-09-13" -> "Sep 13, 2026" (UTC, so the label never shifts with the build machine's zone). */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
