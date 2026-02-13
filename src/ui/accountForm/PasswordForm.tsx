"use client";

import { useActionState, useEffect } from "react";
import { Button } from "../button/Button";
import { changePassword, PasswordState } from "@/src/actions/passwordAction";
import { toast } from "sonner";
import { Input } from "../input/Input";
import { HelperText } from "../helperText/HelperText";

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

        <Input
          type="password"
          name="oldPassword"
          placeholder="Enter current password"
          helperText={state.fieldErrors?.oldPassword}
        />

        <Input
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          helperText={state.fieldErrors?.newPassword}
        />

        <Input
          type="password"
          name="confirm"
          placeholder="Confirm new password"
          helperText={state.fieldErrors?.confirm}
        />

        <div className="mt-1 min-h-[1.25rem]">
          <HelperText error={state?.formError ?? ""} />
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
