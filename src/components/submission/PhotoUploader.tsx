import { useCallback, useRef, useState } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';
import type { SubmissionPhotoDraft } from '@/domain/submission';
import { Button } from '@/components/ui/button';

const MAX_PHOTOS = 12;
const MAX_SIZE_MB = 8;

export function PhotoUploader({
  photos,
  onChange,
}: {
  photos: SubmissionPhotoDraft[];
  onChange: (photos: SubmissionPhotoDraft[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const addFiles = useCallback(
    (files: FileList): void => {
      const accepted: SubmissionPhotoDraft[] = [];
      let rejected = false;

      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          rejected = true;
          continue;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
          rejected = true;
          continue;
        }
        accepted.push({
          id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
          name: file.name,
          previewUrl: URL.createObjectURL(file),
          sizeBytes: file.size,
        });
      }

      const merged = [...photos, ...accepted].slice(0, MAX_PHOTOS);
      setError(
        rejected
          ? `Neki fajlovi su preskočeni. Dozvoljene su slike do ${MAX_SIZE_MB} MB, najviše ${MAX_PHOTOS} fotografija.`
          : null,
      );
      onChange(merged);
    },
    [onChange, photos],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor="fotografije" className="text-sm font-semibold text-neutral-900">
          Fotografije <span aria-hidden="true" className="text-gold-600">*</span>
        </label>
        <p className="text-xs text-neutral-500">
          {photos.length}/{MAX_PHOTOS} · do {MAX_SIZE_MB} MB po slici
        </p>
      </div>

      <button
        type="button"
        id="fotografije"
        onClick={() => inputRef.current?.click()}
        className="mt-1.5 flex h-24 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 text-sm font-medium text-neutral-700 transition-colors hover:border-primary-400 hover:bg-primary-100/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <ImagePlus className="size-6 text-primary-700" aria-hidden="true" />
        Dodajte fotografije nekretnine
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(event) => {
          if (event.target.files) addFiles(event.target.files);
          event.target.value = '';
        }}
      />

      {error ? (
        <p role="alert" className="mt-2 text-xs font-medium text-danger-600">
          {error}
        </p>
      ) : null}

      {photos.length > 0 ? (
        <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {photos.map((photo, index) => (
            <li key={photo.id} className="group relative overflow-hidden rounded-lg border border-neutral-200 bg-white">
              <img src={photo.previewUrl} alt={`Predlog ${index + 1}`} className="aspect-[4/3] w-full object-cover" />
              <Button
                variant="primary"
                size="iconSm"
                onClick={() => onChange(photos.filter((candidate) => candidate.id !== photo.id))}
                aria-label={`Ukloni fotografiju ${photo.name}`}
                className="absolute right-1 top-1 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
              >
                <Trash2 className="size-3.5" aria-hidden="true" />
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
