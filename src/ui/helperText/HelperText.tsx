export function HelperText({ error }: { error: string }) {
  return <>{error ? <p className="text-xs text-red-500">{error}</p> : null}</>;
}
