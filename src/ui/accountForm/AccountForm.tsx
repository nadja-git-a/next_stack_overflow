import { PasswordForm } from "./PasswordForm";
import { UsernameForm } from "./UsernameForm";

export function AccountForms() {
  return (
    <div className="flex-colone py-5 items-center justify-center bg-bg px-4">
      <h2 className="my-3 text-center font-sans text-3xl font-bold text-primary">
        Edit your profiler
      </h2>

      <UsernameForm />
      <PasswordForm />
    </div>
  );
}
