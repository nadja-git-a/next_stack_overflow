"use client";

import { comment, type CommentState } from "@/src/actions/commentAction";
import { useActionState } from "react";
import { Button } from "../button/Button";

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

      <Button isDisabled={isPending} className="px-4 py-2">
        {isPending ? "Sending..." : "Send"}
      </Button>

      {state.formError ? (
        <p className="mt-1 text-sm text-muted">{state.formError}</p>
      ) : null}
    </form>
  );
}
