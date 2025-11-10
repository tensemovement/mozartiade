/**
 * Format vote count to K format (e.g., 1234 -> "1.2K", 12345 -> "12.3K")
 */
export function formatVoteCount(count: number): string {
  if (count < 1000) {
    return count.toString();
  }

  const thousands = count / 1000;
  return `${thousands.toFixed(1)}K`;
}
