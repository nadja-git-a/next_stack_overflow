"use client";

import { AuthState } from "@/src/actions/authActions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { authenticate } from "../../actions/authActions";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { HelperText } from "../helperText/HelperText";

export function AuthForm() {
  const initialState: AuthState = {};
  const [state, formAction, isPending] = useActionState(
    authenticate,
    initialState,
  );

  const router = useRouter();

  useEffect(() => {
    if (!state?.ok || !state.user) return;
    router.replace("/login");
  }, [state?.ok, state?.user, router]);

  return (
    <form
      action={formAction}
      className="
    mx-auto
    w-full
    max-w-md
    min-w-0
    overflow-hidden
    rounded-xl
    border
    border-border
    bg-bg
    p-8
    shadow-sm
    flex
    flex-col
    gap-6
  "
    >
      <HelperText error={state?.formError ?? ""} />

      <div className="w-full">
        <Input
          type="text"
          name="username"
          label="Username"
          helperText={state?.fieldErrors?.username}
        />
      </div>

      <div className="w-full">
        <Input
          type="password"
          name="password"
          label="Password"
          helperText={state?.fieldErrors?.password}
        />
      </div>

      <div className="w-full">
        <Input
          type="password"
          name="confirm"
          label="Confirm password"
          helperText={state?.fieldErrors?.confirm}
        />
      </div>

      <Button className="size-6 py-4 px-3" type="submit" isDisabled={isPending}>
        SIGN UP
      </Button>
    </form>
  );
}
