import '../styles.css';
import { Outlet, createRootRouteWithContext, HeadContent, Link } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { siteConfig } from '@/data/site';
import { buildPageMeta } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/layout/BackToTop';
import { CompareProvider } from '@/hooks/useComparison';
import { CompareDrawer } from '@/components/comparison/CompareDrawer';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { title: 'NS Business Consulting | Krediti, nekretnine, posao i biznis' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...buildPageMeta({}),
    ],
    links: [
      { rel: 'icon', type: 'image/png', href: '/ns-business-logo.png?v=10' },
      { rel: 'apple-touch-icon', type: 'image/png', href: '/ns-business-logo.png?v=10' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..600&family=Inter:wght@400..700&display=swap',
      },
    ],
  }),
  errorComponent: RootError,
  notFoundComponent: RootNotFound,
  component: RootLayout,
});

function RootLayout() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CompareProvider>
        <html lang="sr-RS" className="overflow-x-hidden">
          <head>
            <HeadContent />
          </head>
          <body className="min-h-dvh overflow-x-hidden bg-neutral-50 font-body text-neutral-900 antialiased">
            <Header />
            <main id="sadrzaj">
              <Outlet />
            </main>
            <Footer />
            <BackToTop />
            <CompareDrawer />
            <Toaster position="bottom-right" />
          </body>
        </html>
      </CompareProvider>
    </QueryClientProvider>
  );
}

function ShellMessage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-600">{eyebrow}</p>
        <h1 className="mt-3 font-display text-3xl font-medium text-primary-900">{title}</h1>
        <p className="mt-3 text-neutral-700">{description}</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-md bg-primary-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:shadow-focus-ring"
        >
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
}

function RootError({ error }: { error: Error }) {
  return (
    <ShellMessage
      eyebrow={siteConfig.realEstateBrand}
      title="Došlo je do greške"
      description={`${error.message} Pozovite nas na ${siteConfig.contact.phoneDisplay} — tu smo za vas.`}
    />
  );
}

function RootNotFound() {
  return (
    <ShellMessage
      eyebrow="404"
      title="Stranica nije pronađena"
      description="Stranica koju tražite ne postoji ili je premeštena."
    />
  );
}
