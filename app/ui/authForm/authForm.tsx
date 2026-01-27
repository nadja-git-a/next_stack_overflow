"use client";

import { AuthState } from "@/app/actions/actions";
import { useAuthStore } from "@/app/shared/store/authStore";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export function AuthForm({
  action,
}: {
  action: (prevState: AuthState, formData: FormData) => Promise<AuthState>;
}) {
  const initialState: AuthState = {};
  const [state, formAction, isPending] = useActionState(action, initialState);

  const login = useAuthStore((store) => store.login);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

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
      {state?.formError && (
        <p className="text-sm text-red-500 text-center">{state.formError}</p>
      )}

      <div className="w-full">
        <label className="block text-sm font-medium text-muted">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="
        mt-1
        w-full
        bg-transparent
        py-2
        text-fg
        outline-none
        border-b
        border-border
        focus:border-primary
        transition
      "
        />
        <div className="mt-1 min-h-[1.25rem]">
          {state?.fieldErrors?.username && (
            <p className="text-xs text-red-500">{state.fieldErrors.username}</p>
          )}
        </div>
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-muted">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
        mt-1
        w-full
        bg-transparent
        py-2
        text-fg
        outline-none
        border-b
        border-border
        focus:border-primary
        transition
      "
        />
        <div className="mt-1 min-h-[1.25rem]">
          {state?.fieldErrors?.password && (
            <p className="text-xs text-red-500">{state.fieldErrors.password}</p>
          )}
        </div>
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-muted">
          Confirm password
        </label>
        <input
          type="password"
          name="confirm"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="
        mt-1
        w-full
        bg-transparent
        py-2
        text-fg
        outline-none
        border-b
        border-border
        focus:border-primary
        transition
      "
        />
        <div className="mt-1 min-h-[1.25rem]">
          {state?.fieldErrors?.confirm && (
            <p className="text-xs text-red-500">{state.fieldErrors.confirm}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="
      mt-4
      rounded-lg
      bg-primary
      px-6
      py-2.5
      font-semibold
      text-white
      transition
      hover:bg-primary-600
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
      >
        SIGN UP
      </button>
    </form>
  );
}
