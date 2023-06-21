export function formatyyyyMMdd(date) {
  return date.toISOString().split("T")[0];
}
