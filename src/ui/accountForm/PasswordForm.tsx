"use client";

import { useActionState, useEffect } from "react";
import { Button } from "../button/Button";
import { changePassword, PasswordState } from "@/src/actions/passwordAction";
import { toast } from "sonner";

export function PasswordForm() {
  const initialPassword: PasswordState = {};

  const [state, formAction, isPending] = useActionState(
    changePassword,
    initialPassword,
  );

  useEffect(() => {
    if (state.ok) {
      toast.success("Password is changed");
    }
  });

  return (
    <form
      action={formAction}
      className="mt-6 w-full space-y-4 rounded-2xl border border-border bg-bg px-6 py-5"
    >
      <fieldset className="space-y-4">
        <legend className="text-sm font-medium text-fg">
          Change your password
        </legend>

        <div className="space-y-1">
          <input
            type="password"
            name="oldPassword"
            placeholder="Current password"
            className="
          w-full rounded-lg px-3 py-2 text-sm
          bg-bg text-fg placeholder:text-muted
          border border-border
          transition
          focus:outline-none focus:ring-1 focus:ring-primary
        "
          />
          {state.fieldErrors?.oldPassword && (
            <p className="text-xs text-red-500">
              {state.fieldErrors.oldPassword}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            className="
          w-full rounded-lg px-3 py-2 text-sm
          bg-bg text-fg placeholder:text-muted
          border border-border
          transition
          focus:outline-none focus:ring-1 focus:ring-primary
        "
          />
          {state.fieldErrors?.newPassword && (
            <p className="text-xs text-red-500">
              {state.fieldErrors.newPassword}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <input
            type="password"
            name="confirm"
            placeholder="Confirm new password"
            className="
          w-full rounded-lg px-3 py-2 text-sm
          bg-bg text-fg placeholder:text-muted
          border border-border
          transition
          focus:outline-none focus:ring-1 focus:ring-primary
        "
          />
          {state.fieldErrors?.confirm && (
            <p className="text-xs text-red-500">{state.fieldErrors.confirm}</p>
          )}
        </div>

        <div className="mt-1 min-h-[1.25rem]">
          {state?.formError && (
            <p className="text-xs text-red-500">{state.formError}</p>
          )}
        </div>
      </fieldset>

      <div className="flex justify-end pt-2">
        <Button type="submit" isDisabled={isPending} className="py-2 px-2">
          {isPending ? "Changing…" : "Change password"}
        </Button>
      </div>
    </form>
  );
}
