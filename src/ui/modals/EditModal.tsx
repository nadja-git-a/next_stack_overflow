"use client";

import { Button } from "../button/Button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { editModalSchema, type EditModal } from "./modalSchema/editModalSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientFetch } from "@/src/utilities/fetch/clientFetch";

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
  const router = useRouter();

  const form = useForm<EditModal>({
    resolver: zodResolver(editModalSchema),
    defaultValues: {
      code: initialCode,
      language: initialLanguage,
    },
  });

  const { register, handleSubmit, formState } = form;

  if (!open) {
    return;
  }

  const onSubmit = async (data: EditModal) => {
    const res = await clientFetch(`/api/snippets/${snippetId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: data.code,
        language: data.language,
      }),
    });

    console.log("fetch res", res.body);
    onClose();
    router.refresh();
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/40 px-5 py-5" onClick={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
        className="
      mx-auto max-w-lg
      rounded-xl bg-bg p-4
      shadow-md
      border border-border
    "
      >
        <div className="mb-1 font-sans text-sm font-medium text-muted">
          Language
        </div>
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
            {...register("language")}
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
              {...register("code")}
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

            {formState.errors.code && (
              <p className="mt-1 text-sm text-red-500">
                {formState.errors.code.message}
              </p>
            )}
          </div>

          <div className="flex">
            <Button className="px-3 py-2" type="button" onClick={onClose}>
              Leave
            </Button>

            <Button className="px-3 py-2" type="submit">
              Edit Snippet
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
