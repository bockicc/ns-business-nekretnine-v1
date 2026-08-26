import type { ListingIntent, Money } from '@/domain/property';

const numberFormatter = new Intl.NumberFormat('sr-RS', {
  maximumFractionDigits: 0,
});

export const EUR_RSD_RATE = 117.2;

export function formatAmount(money: Money): string {
  return `${numberFormatter.format(money.amount)} ${money.currency === 'EUR' ? '€' : 'RSD'}`;
}

export function formatPrice(money: Money, intent?: ListingIntent): string {
  const base = formatAmount(money);
  if (intent !== 'rent') return base;
  return `${base} / mesečno`;
}

export function formatPriceCompact(money: Money): string {
  if (money.currency === 'RSD') return `${numberFormatter.format(Math.round(money.amount / 1_000_000))} mil. RSD`;
  return `${numberFormatter.format(money.amount)} €`;
}

export function toEur(amount: number, currency: Money['currency']): number {
  return currency === 'EUR' ? amount : amount / EUR_RSD_RATE;
}
