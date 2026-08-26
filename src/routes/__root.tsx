import '../styles.css';
import { Outlet, createRootRouteWithContext, Link } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { siteConfig } from '@/data/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/layout/BackToTop';
import { CompareProvider } from '@/hooks/useComparison';
import { CompareDrawer } from '@/components/comparison/CompareDrawer';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  errorComponent: RootError,
  notFoundComponent: RootNotFound,
  component: RootLayout,
});

function RootLayout() {
  return (
    <CompareProvider>
      <Header />
      <main id="sadrzaj">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <CompareDrawer />
      <Toaster position="bottom-right" />
    </CompareProvider>
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
