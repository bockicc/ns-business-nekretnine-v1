export const siteConfig = {
  name: 'NS Business Consulting',
  realEstateBrand: 'NS Nekretnine',
  cityTag: 'Novi Sad',
  tagline: 'Jasne činjenice. Pametne odluke.',
  heroLine: 'Most koji spaja ljude i prilike.',
  kingdomMark: 'Carstvo nekretnina',
  themeColor: '#061A30',
  url: 'https://ns-business.rs',
  contact: {
    phoneDisplay: '066/272-410',
    phoneHref: 'tel:+38166272410',
    whatsappHref: 'https://wa.me/38166272410',
    viberHref: 'viber://chat?number=%2B38166272410',
    email: 'biznis021m@gmail.com',
    address: 'Trg mladenaca, Novi Sad',
    workingHours: 'pon–sub 09–19h',
    coverage: 'Pokrivamo celu Srbiju',
  },
  legal: {
    entity: 'Nikola Bibovski PR Konsalting Usluge, Novi Sad',
    mb: '68645140',
    pib: '115800489',
    account: '265-1100310108512-45',
  },
  socials: [
    { id: 'instagram', label: '@nsconsulting_26', href: 'https://instagram.com/nsconsulting_26' },
    {
      id: 'facebook',
      label: 'NS Business Consulting',
      href: 'https://www.facebook.com/nsconsulting26',
    },
  ] as const,
  listingFee: { amount: 5000, currency: 'RSD', periodDays: 30 },
  reviewWindowHours: '24–48 poslovnih sati',
  privacyLine: 'Podaci se koriste isključivo za obradu upita i ne objavljuju se bez saglasnosti.',
  approvalNote:
    'Oglas se objavljuje tek nakon administrativne provere i odobrenja podataka, fotografija i cene.',
} as const;

export type SocialLinkId = (typeof siteConfig.socials)[number]['id'];
