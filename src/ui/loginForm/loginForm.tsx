"use client";

import { AuthState } from "@/src/actions/authActions";
import { useAuthStore } from "@/src/shared/store/authStore";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { HelperText } from "../helperText/HelperText";

export function LoginForm({
  action,
}: {
  action: (prevState: AuthState, formData: FormData) => Promise<AuthState>;
}) {
  const initialState: AuthState = {};
  const [state, formAction, isPending] = useActionState(action, initialState);

  const login = useAuthStore((store) => store.login);
  const router = useRouter();

  useEffect(() => {
    if (!state?.ok || !state.user) return;
    login(state.user);
    router.replace("/home");
  }, [state?.ok, state?.user, login, router]);

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

      <Button
        type="submit"
        isDisabled={isPending}
        className="
        px-6
        py-2.5
        font-semibold"
      >
        LOG IN
      </Button>
    </form>
  );
}
