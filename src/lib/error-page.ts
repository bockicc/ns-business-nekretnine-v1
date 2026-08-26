interface ErrorPageOptions {
  title?: string;
  description?: string;
  accentHex?: string;
  baseHex?: string;
}

export function renderErrorPageHtml({
  title = 'Došlo je do greške',
  description = 'Naša stranica je trenutno nedostupna. Pozovite nas na 066/272-410 — tu smo za vas.',
  accentHex = '#B08D3F',
  baseHex = '#061A30',
}: ErrorPageOptions = {}): string {
  return [
    '<!doctype html>',
    '<html lang="sr-RS">',
    '<head>',
    '<meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    `<meta name="theme-color" content="${baseHex}" />`,
    `<title>${title} · NS Nekretnine</title>`,
    '</head>',
    '<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;',
    `background:${baseHex};font-family:Georgia,'Times New Roman',serif;color:#fff;text-align:center;">`,
    '<main style="max-width:32rem;padding:3rem 1.5rem;">',
    `<p style="letter-spacing:0.08em;font-size:0.75rem;font-weight:600;color:${accentHex};`,
    'text-transform:uppercase;margin:0 0 1rem;">NS Nekretnine</p>',
    `<h1 style="font-weight:500;font-size:2rem;line-height:1.15;margin:0 0 1rem;">${title}</h1>`,
    `<p style="line-height:1.6;font-family:'Segoe UI',Arial,sans-serif;color:rgba(255,255,255,0.8);`,
    `margin:0;">${description}</p>`,
    '</main>',
    '</body>',
    '</html>',
  ].join('\n');
}
