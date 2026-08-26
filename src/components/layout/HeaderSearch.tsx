import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function HeaderSearch() {
  const navigate = useNavigate();
  const [term, setTerm] = useState('');

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        void navigate({
          to: '/nekretnine',
          search: term.trim() ? { location: term.trim() } : {},
        });
      }}
      className="relative hidden md:block"
    >
      <Input
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Pretražite lokaciju…"
        aria-label="Pretražite nekretnine po lokaciji"
        className="h-9 w-56 border-white/25 bg-white/10 pr-9 text-white placeholder:text-white/60 hover:border-white/40 focus-visible:bg-primary-800 focus-visible:text-neutral-900 focus-visible:placeholder:text-neutral-500"
      />
      <button
        type="submit"
        aria-label="Pokreni pretragu"
        className="absolute right-1 top-1 flex size-7 items-center justify-center rounded-md text-primary-100 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
      >
        <Search className="size-4" aria-hidden="true" />
      </button>
    </form>
  );
}
