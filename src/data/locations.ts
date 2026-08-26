export interface LocationGroup {
  city: string;
  neighborhoods: readonly string[];
}

export const LOCATION_GROUPS: readonly LocationGroup[] = [
  {
    city: 'Novi Sad',
    neighborhoods: [
      'Centar',
      'Grbavica',
      'Detelinara',
      'Novo Naselje',
      'Liman',
      'Podbara',
      'Rotkvarija',
      'Klisa',
      'Telep',
      'Adice',
      'Petrovaradin',
      'Kać',
      'Čenej',
      'Futog',
      'Veternik',
    ],
  },
  {
    city: 'Sremska Kamenica',
    neighborhoods: ['Kameničko naselje', 'Bukovac'],
  },
  { city: 'Beograd', neighborhoods: ['Zemun', 'Novi Beograd'] },
  { city: 'Subotica', neighborhoods: ['Centar'] },
  { city: 'Temerin', neighborhoods: ['Centar'] },
];

export const CITIES: readonly string[] = LOCATION_GROUPS.map((g) => g.city);

export const ALL_LOCATIONS: readonly string[] = LOCATION_GROUPS.flatMap((group) => [
  group.city,
  ...group.neighborhoods.map((n) => `${n} (${group.city})`),
]);
