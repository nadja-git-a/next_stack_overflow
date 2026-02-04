"use client";

import { editSnippet, EditState } from "@/src/actions/editAction";
import { useActionState, useEffect, useState } from "react";
import { Button } from "../button/Button";
import { useRouter } from "next/navigation";

export function EditModal({
  initialLanguage,
  initialCode,
  snippetId,
  languages,
  open,
  onClose,
}: {
  initialLanguage: string;
  initialCode: string;
  snippetId: string;
  languages: string[];
  open: boolean;
  onClose: () => void;
}) {
  const [language, setLanguage] = useState<string>(initialLanguage);
  const [code, setCode] = useState<string>(initialCode);
  const router = useRouter();

  const initialState: EditState = {};
  const [state, formAction, isPending] = useActionState(
    editSnippet,
    initialState,
  );

  useEffect(() => {
    if (state.ok && open === true) {
      onClose();
      router.refresh();
    }
  }, [state.ok, onClose, router, open]);

  if (!open) {
    return;
  }

  return (
    <div className="fixed inset-0 z-40 bg-black/40 px-5 py-5" onClick={onClose}>
      <form
        action={formAction}
        onClick={(e) => e.stopPropagation()}
        className="
      mx-auto max-w-lg
      rounded-xl bg-bg p-4
      shadow-md
      border border-border
    "
      >
        <input name="id" value={snippetId} type="hidden"></input>
        <div className="flex flex-col gap-6 text-fg">
          <select
            className="
      text-fg
      bg-bg
      border border-border
      rounded-md
      px-3 py-2
      focus:outline-none
      focus:ring-2 focus:ring-primary/50
    "
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((lang) => {
              return (
                <option className="text-fg" key={lang} value={lang}>
                  {lang}
                </option>
              );
            })}
          </select>

          <div>
            <p className="mb-1 font-sans text-sm font-medium text-muted">
              Code
            </p>

            <textarea
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// paste or type your code here"
              rows={8}
              autoComplete="off"
              className="
      w-full min-h-[8rem] resize-y
      rounded-md
      border border-border
      bg-bg text-fg
      px-3 py-2
      font-mono text-sm leading-relaxed
      placeholder:text-muted
      focus:outline-none
      focus:ring-2 focus:ring-primary/50
    "
            />
          </div>

          <Button className="px-3 py-2" type="button" onClick={onClose}>
            Leave
          </Button>

          <Button className="px-3 py-2" type="submit" isPending={isPending}>
            Edit Snippet
          </Button>

          {state.formError ? (
            <p className="mt-1 text-sm text-muted">{state.formError}</p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
