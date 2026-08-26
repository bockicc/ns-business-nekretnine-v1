import type { SubmissionPhotosDescription } from '@/domain/submission';
import { FormTextareaField } from '@/components/lead/FormField';
import { PhotoUploader } from './PhotoUploader';

export function StepPhotosDescription({
  photosDescription,
  errors,
  onPatch,
}: {
  photosDescription: SubmissionPhotosDescription;
  errors: { photos?: string; description?: string };
  onPatch: (patch: Partial<SubmissionPhotosDescription>) => void;
}) {
  return (
    <div className="space-y-6">
      <PhotoUploader
        photos={photosDescription.photos}
        onChange={(photos) => {
          onPatch({ photos });
        }}
      />
      {errors.photos ? (
        <p role="alert" className="-mt-3 text-xs font-medium text-danger-600">{errors.photos}</p>
      ) : null}

      <FormTextareaField
        id="opis-oglasa"
        label="Opis oglasa"
        required
        rows={8}
        value={photosDescription.description}
        onChange={(description) => onPatch({ description })}
        error={errors.description}
      />
      <p className="-mt-2 text-xs text-neutral-500">
        Minimum 60 znakova. Navedite raspored prostorija, stanje nekretnine i šta se nalazi u
        okolini.
      </p>
    </div>
  );
}
