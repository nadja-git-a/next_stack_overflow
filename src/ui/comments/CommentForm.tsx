"use client";

import { comment, type CommentState } from "@/src/actions/commentAction";
import { useActionState } from "react";

const initialState: CommentState = { ok: false };

export function CommentForm({ id }: { id: string }) {
  const [state, formAction, isPending] = useActionState(comment, initialState);

  return (
    <form action={formAction} className="mt-4 flex flex w-full gap-2 px-8">
      <input type="hidden" name="id" value={id} />

      <input
        name="comment"
        placeholder="Comment here"
        className="
        w-full rounded-lg px-3 py-2 text-sm
        bg-bg text-fg placeholder:text-muted
        border border-border
        focus:outline-none focus:ring-1 focus:ring-primary
      "
      />

      <button
        type="submit"
        disabled={isPending}
        className="
        self-end rounded-md px-4 py-2 text-sm font-medium
        bg-primary text-bg
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:bg-primary-600 transition-colors
      "
      >
        {isPending ? "Sending..." : "Send"}
      </button>

      {state.formError ? (
        <p className="mt-1 text-sm text-muted">{state.formError}</p>
      ) : null}
    </form>
  );
}
