import { siteConfig } from '@/data/site';

type MetaEntry = { title: string } | { name: string; content: string };

export interface PageSeoInput {
  title?: string;
  description?: string;
  path?: string;
}

export function buildPageMeta({ title, description, path }: PageSeoInput): MetaEntry[] {
const fullTitle = title ? `${title} · NS Business Consulting` : defaultTitle();  const pageDescription = description ?? siteConfig.tagline;
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url;

  return [
    { title: fullTitle },
    { name: 'description', content: pageDescription },
    { name: 'theme-color', content: siteConfig.themeColor },
    { name: 'og:title', content: fullTitle },
    { name: 'og:description', content: pageDescription },
    { name: 'og:url', content: url },
    { name: 'og:type', content: 'website' },
    { name: 'og:locale', content: 'sr_RS' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
}

export function propertyTitle(title: string, city: string): string {
  return `${title}, ${city}`;
}

function defaultTitle(): string {
return 'NS Business Consulting | Krediti, nekretnine, posao i biznis';
}