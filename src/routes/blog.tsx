import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog')({
  component: BlogLayout,
});

function BlogLayout() {
  return (
    <div className="bg-neutral-50">
      <Outlet />
    </div>
  );
}
