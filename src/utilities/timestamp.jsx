export function formatTimeSinceShift(value) {
  if (!value) return "—";

  const diffMs = Date.now() - new Date(value).getTime();

  if (diffMs < 0) return "Только что";

  const minutes = Math.floor(diffMs / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `${minutes} мин назад`;
  if (hours < 24) return `${hours} ч назад`;
  return `${days} дн назад`;
}
