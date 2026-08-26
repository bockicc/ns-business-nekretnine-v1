import { useCallback, useMemo } from 'react';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { BLOG_CATEGORIES, getBlogPostsByCategory } from '@/data/blogPosts';
import type { BlogPost } from '@/data/blogPosts';
import { Container } from '@/components/layout/Container';

interface BlogSearch {
  category?: string;
}

export const Route = createFileRoute('/blog/')({
  validateSearch: (search: Record<string, unknown>): BlogSearch => ({
    category: typeof search.category === 'string' ? search.category : undefined,
  }),
  component: BlogArchivePage,
});

function BlogArchivePage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const activeCategory = search.category ?? 'Sve';

  const setCategory = useCallback(
    (cat: string) => {
      void navigate({
        to: '/blog',
        search: cat === 'Sve' ? {} : { category: cat },
        replace: true,
      });
    },
    [navigate],
  );

  const filteredPosts = useMemo(
    () => getBlogPostsByCategory(activeCategory),
    [activeCategory],
  );

  return (
    <Container className="py-10 md:py-14">
      <header className="mb-8">
        <nav aria-label="Natananje" className="mb-4 text-sm text-neutral-500">
          <Link to="/" className="hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
            Početna
          </Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-primary-900 font-medium">Blog</span>
        </nav>
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-700">Blog</p>
        <h1 className="mt-2 font-display text-3xl font-medium text-primary-900 md:text-4xl">
          Korisni saveti za kupce i prodavce
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
          Članci o tržištu nekretnina, finansijama i lokacijama u Novom Sadu.
          Informišite se pre nego što donesete odluku.
        </p>
      </header>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtriraj po kategoriji">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
              activeCategory === cat
                ? 'bg-primary-900 text-white'
                : 'border border-neutral-300 bg-white text-neutral-700 hover:border-primary-300 hover:text-primary-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="mt-12 text-center text-neutral-500">Nema članaka u ovoj kategoriji.</p>
      ) : null}
    </Container>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex flex-col rounded-lg border border-neutral-200 bg-white p-5 shadow-card transition-all hover:shadow-card-hover hover:border-primary-200 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-800">
          {post.category}
        </span>
      </div>
      <h2 className="font-display text-lg font-medium text-primary-900 group-hover:text-primary-700">
        {post.title}
      </h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-700">{post.description}</p>
      <div className="mt-4 flex items-center gap-4 border-t border-neutral-100 pt-3 text-xs text-neutral-500">
        <span className="inline-flex items-center gap-1">
          <Calendar className="size-3.5" aria-hidden="true" />
          {new Date(post.date).toLocaleDateString('sr-RS', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3.5" aria-hidden="true" />
          {post.readingTime}
        </span>
      </div>
      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-800 group-hover:text-gold-600">
        Čitaj više
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
