import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  side?: 'left' | 'right' | 'bottom';
  children: React.ReactNode;
  className?: string;
}

export function Drawer({
  open,
  onOpenChange,
  title,
  side = 'left',
  children,
  className,
}: DrawerProps) {
  const positionClass =
    side === 'left'
      ? 'left-0 top-0 h-full w-80 max-w-[85vw] border-r animate-fade-in'
      : side === 'right'
        ? 'right-0 top-0 h-full w-80 max-w-[85vw] border-l animate-slide-in-right'
        : 'bottom-0 left-0 w-full max-h-[85dvh] border-t rounded-t-xl animate-slide-up';

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-primary-950/60 animate-overlay-in" />
        <Dialog.Content
          className={cn(
            'fixed z-50 flex flex-col border-neutral-200 bg-white shadow-modal focus-visible:outline-none',
            positionClass,
            className,
          )}
        >
          <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
            <Dialog.Title className="font-display text-lg font-medium text-primary-900">
              {title}
            </Dialog.Title>
            <Dialog.Close
              aria-label="Zatvori"
              className="rounded-md p-1.5 text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <X className="size-5" aria-hidden="true" />
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
