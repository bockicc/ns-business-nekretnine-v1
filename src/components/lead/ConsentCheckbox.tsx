import { Checkbox } from '@/components/ui/checkbox';

export function ConsentCheckbox({
  checked,
  error,
  onChange,
  onBlur,
  name,
}: {
  checked: boolean;
  error?: string | null;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  name: string;
}) {
  return (
    <div>
      <Checkbox
        id={name}
        name={name}
        checked={checked}
        onCheckedChange={(value) => onChange(value === true)}
        onBlur={onBlur}
        invalid={Boolean(error)}
        aria-describedby={error ? `${name}-greska` : undefined}
        label={
          <>
            Saglasan/na sam da NS Business Consulting obradi moje podatke isključivo za potrebe
            odgovora na upit. <span aria-hidden="true" className="text-gold-600">*</span>
          </>
        }
      />
      {error ? (
        <p id={`${name}-greska`} role="alert" className="mt-1.5 text-xs font-medium text-danger-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
