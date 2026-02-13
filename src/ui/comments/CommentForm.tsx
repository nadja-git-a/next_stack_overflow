"use client";

import { comment, type CommentState } from "@/src/actions/commentAction";
import { useActionState } from "react";
import { Button } from "../button/Button";
import { Input } from "../input/Input";

const initialState: CommentState = { ok: false };

export function CommentForm({ id }: { id: string }) {
  const [state, formAction, isPending] = useActionState(comment, initialState);

  return (
    <form action={formAction} className="mt-4 flex w-full gap-2 px-8">
      <input type="hidden" name="id" value={id} />

      <Input type="text" name="comment" placeholder="Comment here" />

      <Button isDisabled={isPending} className="px-4 py-2">
        {isPending ? "Sending..." : "Send"}
      </Button>

      {state.formError ? (
        <p className="mt-1 text-sm text-muted">{state.formError}</p>
      ) : null}
    </form>
  );
}
