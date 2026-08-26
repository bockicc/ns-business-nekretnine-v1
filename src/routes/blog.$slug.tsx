import { Link, createFileRoute, notFound } from '@tanstack/react-router';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { BLOG_POSTS, findBlogPost } from '@/data/blogPosts';
import type { BlogPostContent } from '@/data/blogPosts';
import { Container } from '@/components/layout/Container';

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = findBlogPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  component: BlogArticlePage,
  errorComponent: BlogNotFound,
});

function BlogArticlePage() {
  const { post } = Route.useLoaderData();

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category,
  ).slice(0, 2);

  if (relatedPosts.length < 2) {
    const extra = BLOG_POSTS.filter(
      (p) => p.slug !== post.slug && p.category !== post.category,
    ).slice(0, 2 - relatedPosts.length);
    relatedPosts.push(...extra);
  }

  return (
    <Container className="py-10 md:py-14">
      <nav aria-label="Natananje" className="mb-6 text-sm text-neutral-500">
        <Link to="/" className="hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
          Početna
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <Link to="/blog" className="hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
          Blog
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-primary-900 font-medium">{post.title}</span>
      </nav>

      <article className="mx-auto max-w-3xl">
        <header>
          <span className="mb-3 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-800">
            {post.category}
          </span>
          <h1 className="mt-3 font-display text-3xl font-medium text-primary-900 md:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
            <span className="inline-flex items-center gap-1.5">
              <User className="size-4" aria-hidden="true" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4" aria-hidden="true" />
              {new Date(post.date).toLocaleDateString('sr-RS', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              {post.readingTime} čitanja
            </span>
          </div>
        </header>

        <div className="mt-10 space-y-6">
          {post.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </div>

        {relatedPosts.length > 0 ? (
          <section aria-labelledby="povezani-naslov" className="mt-16 border-t border-neutral-200 pt-10">
            <h2 id="povezani-naslov" className="font-display text-2xl font-medium text-primary-900">
              Povezani članci
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  to="/blog/$slug"
                  params={{ slug: rp.slug }}
                  className="group rounded-lg border border-neutral-200 bg-white p-5 shadow-card transition-all hover:shadow-card-hover hover:border-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <span className="mb-2 inline-block rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-800">
                    {rp.category}
                  </span>
                  <h3 className="font-display text-base font-medium text-primary-900 group-hover:text-primary-700">
                    {rp.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-neutral-600 line-clamp-2">{rp.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-800 hover:text-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Nazad na blog
          </Link>
        </div>
      </article>
    </Container>
  );
}

function ContentBlock({ block }: { block: BlogPostContent }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="text-base leading-relaxed text-neutral-700">{block.text}</p>;
    case 'heading':
      return (
        <h2 className="mt-8 font-display text-xl font-medium text-primary-900">{block.text}</h2>
      );
    case 'list':
      return (
        <ul className="space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-base leading-relaxed text-neutral-700">
              <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      );
    case 'callout':
      return (
        <blockquote className="my-6 rounded-lg border-l-4 border-gold-500 bg-gold-100/40 p-5 text-sm leading-relaxed text-primary-900">
          {block.text}
        </blockquote>
      );
  }
}

function BlogNotFound() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-600">Blog</p>
      <h1 className="mt-3 font-display text-3xl font-medium text-primary-900">Članak nije pronađen</h1>
      <p className="mt-3 text-neutral-600">Traženi članak ne postoji ili je uklonjen.</p>
      <Link
        to="/blog"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Nazad na blog
      </Link>
    </Container>
  );
}
