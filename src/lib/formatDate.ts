const longDateFormatter = new Intl.DateTimeFormat('sr-RS', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const shortDateFormatter = new Intl.DateTimeFormat('sr-RS', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
});

export function formatDate(isoDate: string): string {
  return longDateFormatter.format(new Date(isoDate));
}

export function formatDateShort(isoDate: string): string {
  return shortDateFormatter.format(new Date(isoDate));
}
