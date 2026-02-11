export function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-primary-50 px-3 py-2">
      <span className="text-muted">{label}</span>
      <span className="font-mono font-medium text-fg">{value}</span>
    </div>
  );
}
