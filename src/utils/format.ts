export function formatNgn(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatPoints(points: number): string {
  if (points >= 1_000_000) {
    return `${(points / 1_000_000).toFixed(2)}M`;
  }
  if (points >= 1_000) {
    return `${(points / 1_000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat('en-US').format(points);
}

export function truncateUsername(username?: string, length = 14): string {
  if (!username) return 'Anonymous';
  return username.length > length ? `${username.slice(0, length)}...` : username;
}
