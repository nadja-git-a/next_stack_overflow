import { HelperText } from "../helperText/HelperText";

interface Input {
  type: string;
  name?: string;
  placeholder?: string;
  helperText?: string;
  label?: string;
}

export function Input({
  type,
  name,
  placeholder,
  helperText,
  label,
  ...rest
}: Input) {
  return (
    <div className="flex-1">
      {label ? (
        <label className="block text-sm font-medium text-muted py-2">
          {label}
        </label>
      ) : null}
      <input
        type={type}
        name={name}
        placeholder={placeholder ?? ""}
        {...rest}
        className="
  w-full rounded-lg px-3 py-2 text-sm
  bg-bg text-fg placeholder:text-muted
  border border-border
  transition
  focus:outline-none focus:ring-1 focus:ring-primary
"
      />
      {helperText ? <HelperText error={helperText} /> : null}
    </div>
  );
}
