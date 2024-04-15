export function round(value, decimalPlaces = 2) {
  const pow = 10 ** decimalPlaces;
  return Math.round(value * pow) / pow;
}