export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  readingTime: string;
  imageAlt: string;
  content: BlogPostContent[];
}

export type BlogPostContent =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; text: string };

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: 'kako-pripremiti-stan-za-prodaju',
    title: 'Kako pripremiti stan za prodaju i postići bolju cenu',
    description:
      'Praktičan vodič za pripremu nekretnine pre izlaska na tržište — od osnovnog čišćenja do procene tržišne vrednosti.',
    category: 'Saveti',
    author: 'Nikola Bibovski',
    date: '2026-08-15',
    readingTime: '6 min',
    imageAlt: 'Sređen stan spreman za prodaju — beli zidovi i prirodna svetlost',
    content: [
      {
        type: 'paragraph',
        text: 'Prodaja stana je proces koji zahteva pažljivu pripremu. Kupci danas imaju na raspolaganju desetine oglasa, pa je ključno da vaša nekretnina ostavi jak prvi utisak — bilo na fotografijama bilo tokom ličnog obilaska.',
      },
      {
        type: 'heading',
        text: '1. Osnovno čišćenje i uređenje',
      },
      {
        type: 'paragraph',
        text: 'Pre nego što fotografije završe u oglasu, stan mora biti temeljno očišćen. Usisavanje, brisanje prašine, pranje prozora i uklanjanje nepotrebnih predmeta su minimalni koraci. Kupci često procenjuju nekretninu na osnovu prvog pogleda — uredan prostor deluje veći i privlačniji.',
      },
      {
        type: 'heading',
        text: '2. Manji popravci koji se isplate',
      },
      {
        type: 'list',
        items: [
          'Zamena dotrajalog prozora ako je potrebno',
          'Popravka curenja vode i zamena slavina',
          'Sveža boja na zidovima u neutralnim tonovima',
          'Popravka ili zamena dotrajalih lustera i prekidača',
        ],
      },
      {
        type: 'paragraph',
        text: 'Ovi zahvati ne zahtevaju velika ulaganja, ali mogu značajno povećati percipiranu vrednost stana. Investicija od 500–1.000 EUR u osvežavanje može doneti razliku od nekoliko hiljada u konačnoj ceni.',
      },
      {
        type: 'heading',
        text: '3. Profesionalne fotografije',
      },
      {
        type: 'paragraph',
        text: 'Dobre fotografije su pola prodaje. Angažujte fotografa ili koristite širokougaoni objektiv. Fotografišite stan tokom dana kada ima prirodne svetlosti. Svaka soba treba bar jednu fotografiju iz ugla koji prikazuje prostor.',
      },
      {
        type: 'callout',
        text: 'Stanovi sa profesionalnim fotografijama se prodaju 32% brže od onih sa amaterskim snimcima, prema podacima srpskih portala za nekretnine.',
      },
      {
        type: 'heading',
        text: '4. Realna procena cene',
      },
      {
        type: 'paragraph',
        text: 'Previsoka cena odbija kupce, a preniska gubi novac. Konsultujte se sa agentom koji poznaje lokalno tržište. NS Business Consulting nudi besplatnu procenu tržišne vrednosti za sve vlasnike koji žele da objave oglas kod nas.',
      },
    ],
  },
  {
    slug: 'vodic-za-stambene-kredite-2026',
    title: 'Vodič za stambene kredite u 2026. godini',
    description:
      'Pregled uslova, kamatnih stopa i potrebne dokumentacije za odobravanje stambenog kredita.',
    category: 'Finansije',
    author: 'Nikola Bibovski',
    date: '2026-07-28',
    readingTime: '8 min',
    imageAlt: 'Bankovni dokumenti i kalkulator na stolu — stambeni kredit',
    content: [
      {
        type: 'paragraph',
        text: 'Stambeni kredit je najčešći način finansiranja kupovine nekretnine u Srbiji. U 2026. godini banke nude različite pakete — od fiksnih do promenljivih kamatnih stopa. Evo šta treba da znate pre nego što aplicirate.',
      },
      {
        type: 'heading',
        text: 'Kamatne stope u 2026.',
      },
      {
        type: 'paragraph',
        text: 'Fiksne kamatne stope kreću se od 4,5% do 5,5% godišnje, zavisno od banke i iznosa kredita. Promenljive stope su trenutno nešto niže, oko 3,9% u prvih godinu dana, ali su podložne promenama na svakih šest meseci.',
      },
      {
        type: 'list',
        items: [
          'Fiksna stopa — stabilnost tokom celog otplate',
          'Promenljiva stopa — niža u početku, ali rizičnija',
          'Kombinovana stopa — fiksna prve 3 godine, promenljiva dalje',
        ],
      },
      {
        type: 'heading',
        text: 'Potrebna dokumentacija',
      },
      {
        type: 'paragraph',
        text: 'Za apliciranje za stambeni kredit potrebni su vam sledeći dokumenti:',
      },
      {
        type: 'list',
        items: [
          'Lična karta ili pasoš',
          'Potvrda o zaposlenju (minimum 6 meseci)',
          'Poslednja tri slipa ili rešenje o penziji',
          'Izvod iz matične knjige rođenih',
          'Predugovor ili kopija oglasa nekretnine',
          'Dokaz o učešću (minimum 20% od vrednosti nekretnine)',
        ],
      },
      {
        type: 'callout',
        text: 'Savet: Pre nego što aplicirate, proverite svoj kreditni rejting. Banke odbijaju aplikante sa aktivnim dugovima ili lošom kreditnom istorijom.',
      },
      {
        type: 'heading',
        text: 'Rok otplate i mesečna rata',
      },
      {
        type: 'paragraph',
        text: 'Maksimalni rok otplate je 30 godina. Za stan od 100.000 EUR sa učešćem od 20.000 EUR i kamatnom stopom od 5%, mesečna rata iznosi oko 430 EUR. Kalkulator na našem sajtu vam može pomoći da izračunate tačan iznos.',
      },
    ],
  },
  {
    slug: 'zasto-je-grbavica-najtrazenija-lokacija',
    title: 'Zašto je Grbavica i dalje najtraženija lokacija',
    description:
      'Analiza faktora koji čine Grbavnicu najpopularnijim kvartom za kupovinu stana u Novom Sadu.',
    category: 'Lokacija',
    author: 'Nikola Bibovski',
    date: '2026-08-02',
    readingTime: '5 min',
    imageAlt: 'Grbavica Novi Sad — stambeni blokovi sa zelenilom',
    content: [
      {
        type: 'paragraph',
        text: 'Grbavica je decenijama jedno od najtraženijih naselja u Novom Sadu. Kupci se vraćaju ovom kvartu zbog odlične infrastrukture, blizine centra i osećaja zajednice. Evo zašto je potražnja i dalje jaka.',
      },
      {
        type: 'heading',
        text: 'Lokacija i povezanost',
      },
      {
        type: 'paragraph',
        text: 'Grbavica se nalazi na svega 10-15 minuta hoda od centra grada. Bulevar oslobođenja povezuje naselje sa svim ključnim tačkama — fakultetima, bolnicom, tržnim centrima. Autobuske linije pokrivaju ceo grad, a biciklistička staza vodi direktno do Keja.',
      },
      {
        type: 'heading',
        text: 'Infrastruktura',
      },
      {
        type: 'list',
        items: [
          'Vrtići i osnovne škole u okviru naselja',
          'Dom zdravlja i apoteke na minut hoda',
          'Supermarketi (Lidl, Maxi, IDEA) u radijusu od 500m',
          'Parkovi i dečija igrališta između blokova',
          'Sportski centar i teretane',
        ],
      },
      {
        type: 'heading',
        text: 'Cene i trendovi',
      },
      {
        type: 'paragraph',
        text: 'Prosečna cena kvadratnog metra stana u Grbavici u 2026. godini iznosi oko 2.200–2.600 EUR, što je nešto više od proseka grada (2.000 EUR). Međutim, potražnja ne opada — naprotiv, broj oglasa se brzo iscrpljuje.',
      },
      {
        type: 'callout',
        text: 'Stanovi u Grbavici se prodaju u proseku za 25 dana — tri puta brže od proseka u Novom Sadu.',
      },
      {
        type: 'paragraph',
        text: 'Ako razmišljate o kupovini stana u Grbavici, preporučujemo da pratite našu stranicu sa aktivnim oglasima. Redovno dodajemo nove stanove, a naš tim vam može pomoći da pronađete idealan prostor pre nego što bude rasprodat.',
      },
    ],
  },
  {
    slug: 'provera-predugovora-saveti',
    title: 'Šta obavezno proveriti pre potpisivanja predugovora',
    description:
      'Detaljan pregled pravnih i administrativnih tačaka koje morate proveriti pre nego što potpišete predugovor za nekretninu.',
    category: 'Saveti',
    author: 'Nikola Bibovski',
    date: '2026-08-20',
    readingTime: '7 min',
    imageAlt: 'Pravni dokumenti i olovka na stolu — predugovor za nekretninu',
    content: [
      {
        type: 'paragraph',
        text: 'Predugovor je prvi korak ka kupovini nekretnine, ali i najčešći izvor problema ako se ne proveri temeljno. Pre nego što potpišete bilo koji dokument, postarajte se da su sledeće tačke jasno definisane.',
      },
      {
        type: 'heading',
        text: '1. Identitet i vlasništvo',
      },
      {
        type: 'list',
        items: [
          'Proverite da li je prodavac zaista vlasnik nekretnine (list nepokretnosti)',
          'Uverite se da nema tereta, hipoteka ili sudskih sporova na nekretnini',
          'Zatražite izvod iz katastra ne stariji od 30 dana',
        ],
      },
      {
        type: 'heading',
        text: '2. Predmet prodaje',
      },
      {
        type: 'paragraph',
        text: 'Jasno definišite šta tačno kupujete — stan, garažu, parking mesto, ostavu. Svaka stavka mora biti posebno navedena u predugovoru sa tačnom kvadraturom i spratnošću.',
      },
      {
        type: 'heading',
        text: '3. Cena i način plaćanja',
      },
      {
        type: 'paragraph',
        text: 'Cena mora biti izražena u EUR ili RSD sa jasno definisanim kursom. Odredite rok uplate, način plaćanja (gotovina, kredit, mešovito) i šta se dešava ako kupac ne dobije odobrenje za kredit.',
      },
      {
        type: 'callout',
        text: 'Obavezno ugovorite klauzulu o povratu kapare ako transakcija ne uspe iz razloga koji nisu vaša krivica.',
      },
      {
        type: 'heading',
        text: '4. Rokovi',
      },
      {
        type: 'list',
        items: [
          'Rok za zaključenje glavnog ugovora',
          'Rok za iseljenje prodavca',
          'Rok za predaju ključeva',
          'Šta se dešava sa kirijom ako se nekretnina izdaje do promete vlasništva',
        ],
      },
      {
        type: 'paragraph',
        text: 'NS Business Consulting preporučuje da se predugovor proveri sa advokatom pre potpisivanja. Naš tim vam može pomoći u pronalaženju advokata koji specijalizovano radi sa nekretninama.',
      },
    ],
  },
  {
    slug: 'dodatni-troskovi-kupovine-stana',
    title: 'Dodatni troškovi pri kupovini stana: Porez, notar i provizija',
    description:
      'Sve što treba da znate o skrivenim troškovima kupovine nekretnine — od poreza na prenos do notarskih troškova.',
    category: 'Finansije',
    author: 'Nikola Bibovski',
    date: '2026-08-10',
    readingTime: '6 min',
    imageAlt: 'Kalkulator i novčanice — troškovi kupovine stana',
    content: [
      {
        type: 'paragraph',
        text: 'Kupovina stana ne podrazumeva samo cenu kvadrata. Postoji niz dodatnih troškova koje kupac mora da planira unapred. Evo pregleda najčešćih.',
      },
      {
        type: 'heading',
        text: 'Porez na prenos apsolutnih prava',
      },
      {
        type: 'paragraph',
        text: 'Porez na prenos apsolutnih prava iznosi 2.5% od tržišne vrednosti nekretnine. Plaća ga kupac i mora biti uplaćen u roku od 60 dana od potpisivanja ugovora. Poreska osnovica je tržišna vrednost, ne ugovorna cena.',
      },
      {
        type: 'callout',
        text: 'Ako kupujete prvi stan i nemate drugu nekretninu, možete ostvariti oslobođenje od poreza do 40m². Proverite uslove kod poreske uprave.',
      },
      {
        type: 'heading',
        text: 'Notarski troškovi',
      },
      {
        type: 'list',
        items: [
          'Overa potpisa — oko 1.500–3.000 RSD po potpisu',
          'Sastav i overa ugovora — oko 0.5–1% od vrednosti nekretnine',
          'Taksa za overu — zavisi od vrednosti predmeta',
        ],
      },
      {
        type: 'heading',
        text: 'Provizija agencije',
      },
      {
        type: 'paragraph',
        text: 'Provizija agencije za kupca iznosi 2% od kupoprodajne cene. Kod nas, provizija za prodavca je fiksna — 5.000 RSD za 30 dana objave. Za kupce, provizija je uključena u konačnu cenu i plaća se tek nakon uspešno zaključenog ugovora.',
      },
      {
        type: 'heading',
        text: 'Ukupni troškovi na primeru',
      },
      {
        type: 'paragraph',
        text: 'Za stan od 100.000 EUR, kupac treba da planira:',
      },
      {
        type: 'list',
        items: [
          'Porez: 2.500 EUR (2.5%)',
          'Notar: oko 700–1.000 EUR',
          'Provizija agencije: 2.000 EUR (2%)',
          'Ukupno dodatni troškovi: 5.200–5.500 EUR',
        ],
      },
      {
        type: 'paragraph',
        text: 'Ovo znači da za stan od 100.000 EUR treba da imate oko 105.500 EUR ukupno. Planirajte unapred da ne bi bilo neprijatnih iznenađenja.',
      },
    ],
  },
  {
    slug: 'zasto-je-liman-idealan-za-porodice',
    title: 'Zašto je Liman idealan izbor za porodični život',
    description:
      'Pregled razloga zbog kojih se sve više porodica odlučuje za život u limanskim blokovima.',
    category: 'Lokacija',
    author: 'Nikola Bibovski',
    date: '2026-08-08',
    readingTime: '5 min',
    imageAlt: 'Liman Novi Sad — porodično naselje pored Dunava',
    content: [
      {
        type: 'paragraph',
        text: 'Liman je jedno od omiljenih naselja za porodice u Novom Sadu. Kombinacija zelenila, blizine Dunava i odlične infrastrukture čini ga idealnim mestom za podizanje dece.',
      },
      {
        type: 'heading',
        text: 'Zašto porodice biraju Liman',
      },
      {
        type: 'list',
        items: [
          'Park Liman — jedan od najvećih parkova u gradu sa dečijim igralištima',
          'Blizina Dunava i Štranda za porodične šetnje i rekreaciju',
          'Vrtići i škole u okviru i oko naselja',
          'Bezbedne ulice sa malim saobraćajem',
          'Blizina tržnih centara (Big, Roda, Lidl)',
        ],
      },
      {
        type: 'heading',
        text: 'Infrastruktura za porodice',
      },
      {
        type: 'paragraph',
        text: 'Liman je podeljen na četiri bloka (Liman 1–4), a svaki ima svoj karakter. Liman 1 i 2 su bliži centru i Fruškogorskoj, dok su Liman 3 i 4 mirniji i idealni za porodice sa decom. Svi blokovi imaju dobru povezanost autobuskim linijama.',
      },
      {
        type: 'heading',
        text: 'Cene nekretnina',
      },
      {
        type: 'paragraph',
        text: 'Prosečna cena kvadratnog metra stana u Limanu iznosi 2.100–2.500 EUR, što je u rangu sa Grbavicom. Međutim, limanski stanovi su često veći i imaju bolji raspored — idealno za porodice.',
      },
      {
        type: 'callout',
        text: 'Liman ima najnižu stopu kriminala u Novom Sadu — podaci MUP-a za 2025. godinu.',
      },
      {
        type: 'paragraph',
        text: 'Ako tražite stan za porodicu u Novom Sadu, Liman je siguran izbor. Pogledajte našu trenutnu ponudu ili nas kontaktirajte za pomoć oko pronalaženja idealnog stana.',
      },
    ],
  },
] as const;

export function findBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): readonly BlogPost[] {
  if (!category || category === 'Sve') return BLOG_POSTS;
  return BLOG_POSTS.filter((post) => post.category === category);
}

export const BLOG_CATEGORIES = ['Sve', 'Saveti', 'Finansije', 'Lokacija'] as const;
