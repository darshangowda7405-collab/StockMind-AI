export function formatPercentage(value: number) {
  return `${value.toFixed(2)}%`;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}