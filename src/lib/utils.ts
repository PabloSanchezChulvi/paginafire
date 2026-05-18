export function formatEUR(n: number, decimals = 0): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(n)
}

export function formatPct(n: number, decimals = 1): string {
  return `${(n * 100).toFixed(decimals)}%`
}

export function formatK(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M€`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K€`
  return `${Math.round(n)}€`
}
