const areaFormatter = new Intl.NumberFormat('sr-RS', { maximumFractionDigits: 0 });

export function formatArea(areaSqm: number): string {
  return `${areaFormatter.format(areaSqm)} m²`;
}

export function formatLandArea(landAreaSqm: number): string {
  if (landAreaSqm >= 1000) {
    const ari = landAreaSqm / 100;
    return `${new Intl.NumberFormat('sr-RS', { maximumFractionDigits: 2 }).format(ari)} ari`;
  }
  return formatArea(landAreaSqm);
}

export function formatPerSqm(
  areaSqm: number,
  pricePerSqm?: { amount: number; currency: 'RSD' | 'EUR' },
  intent?: 'sale' | 'rent',
): string | null {
  if (!pricePerSqm || areaSqm <= 0) return null;
  const unit = pricePerSqm.currency === 'EUR' ? '€' : 'RSD';
  const suffix = intent === 'rent' ? `${unit}/m² mesečno` : `${unit}/m²`;
  return `${new Intl.NumberFormat('sr-RS', { maximumFractionDigits: 0 }).format(pricePerSqm.amount)} ${suffix}`;
}
