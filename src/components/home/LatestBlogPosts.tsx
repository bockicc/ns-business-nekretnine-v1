import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogPosts';

export function LatestBlogPosts() {
  return (
    <section aria-labelledby="blog-naslov" className="bg-neutral-50 py-16 md:py-20">
      <div className="container-page">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gold-600">Najnovije iz bloga</p>
            <h2 id="blog-naslov" className="mt-2 font-display text-3xl font-medium text-primary-900 md:text-4xl">
              Korisni saveti za kupce i prodavce
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary-800 hover:text-gold-600 sm:inline-flex"
          >
            Svi članci
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group flex flex-col rounded-lg border border-neutral-200 bg-white p-5 shadow-card transition-all hover:shadow-card-hover hover:border-primary-200 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <span className="mb-3 inline-block w-fit rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-800">
                {post.category}
              </span>
              <h3 className="font-display text-lg font-medium text-primary-900 group-hover:text-primary-700">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-700">{post.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                <span>{post.readingTime} čitanja</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-primary-800 group-hover:text-gold-600">
                  Čitaj više
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
