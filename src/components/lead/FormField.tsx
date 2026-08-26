import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string | null;
  type?: 'text' | 'tel' | 'email';
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}

export function FormField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  required = false,
  placeholder,
  autoComplete,
  className,
}: FormFieldProps) {
  const errorId = `${id}-greska`;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-neutral-900">
        {label}
        {required ? <span aria-hidden="true" className="ml-0.5 text-gold-600">*</span> : null}
      </label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(type === 'tel' && 'max-w-56')}
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-danger-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FormTextareaField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  rows = 5,
}: Omit<FormFieldProps, 'type'> & { rows?: number }) {
  const errorId = `${id}-greska`;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-neutral-900">
        {label}
        {required ? <span aria-hidden="true" className="ml-0.5 text-gold-600">*</span> : null}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-md border bg-white px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:shadow-focus-ring ${
          error ? 'border-danger-600' : 'border-neutral-300 hover:border-neutral-500'
        }`}
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-danger-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
