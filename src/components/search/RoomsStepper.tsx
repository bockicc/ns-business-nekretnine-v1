import { Stepper } from '@/components/ui/stepper';

export function RoomsStepper({
  rooms,
  onChange,
}: {
  rooms: number | null;
  onChange: (rooms: number | null) => void;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
        Broj soba
      </p>
      <Stepper
        ariaLabel="Minimalan broj soba"
        value={rooms}
        onChange={onChange}
        min={1}
        max={6}
        suffix="+"
      />
    </div>
  );
}
