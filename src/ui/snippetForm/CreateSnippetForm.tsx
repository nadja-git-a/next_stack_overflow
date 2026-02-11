"use client";

import { useActionState, useState } from "react";
import { Button } from "../button/Button";
import { createSnippet, CreateState } from "@/src/actions/createAction";

export function CreateSnippetForm({ languages }: { languages: string[] }) {
  const [language, setLanguage] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const initialState: CreateState = {};
  const [state, formAction, isPending] = useActionState(
    createSnippet,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="
    rounded-xl bg-bg p-4
    shadow-md
    border border-border
  "
    >
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
          <p className="mb-1 font-sans text-sm font-medium text-muted">Code</p>

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

        {state.fieldErrors?.code ? (
          <p className="mt-1 text-sm text-muted">{state.fieldErrors.code}</p>
        ) : null}

        <Button className="px-3 py-2" type="submit" isDisabled={isPending}>
          Create Snippet
        </Button>

        {state.formError ? (
          <p className="mt-1 text-sm text-muted">{state.formError}</p>
        ) : null}
      </div>
    </form>
  );
}
