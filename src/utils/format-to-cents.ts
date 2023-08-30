export function formatCentsToCurrency(cents: number) {
  const dollars = Math.floor(cents / 100);
  const centsPart = cents % 100;
  const formattedCents = centsPart < 10 ? `0${centsPart}` : centsPart;
  return `${dollars}.${formattedCents}`;
}