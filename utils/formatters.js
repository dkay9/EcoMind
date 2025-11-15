export function formatNumber(num) {
  if (!num) return "0";
  return new Intl.NumberFormat().format(num);
}

export function formatCarbon(value) {
  return `${value.toFixed(2)} kg CO₂`;
}

export function formatPercent(num) {
  return `${num.toFixed(1)}%`;
}
