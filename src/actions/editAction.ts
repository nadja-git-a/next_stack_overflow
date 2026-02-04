"use server";

import z from "zod";
import { apiFetch } from "../utilities/fetch/apiFetch";

const editSnippetSchema = z.object({
  code: z.string().min(6, "Snippet should contain at least 6 characters"),
  language: z.string(),
  id: z.string(),
});

export interface EditState {
  fieldErrors?: {
    code?: string;
    language?: string;
    id?: string;
  };
  formError?: string | null;
  ok?: boolean;
}

export const editSnippet = async (
  _prevState: EditState,
  formData: FormData,
): Promise<EditState> => {
  const payload = editSnippetSchema.safeParse({
    code: formData.get("code"),
    language: formData.get("language"),
    id: formData.get("id"),
  });

  if (!payload.success) {
    const fieldErrors: NonNullable<EditState>["fieldErrors"] = {};
    for (const issue of payload.error.issues) {
      const key = issue.path[0] as "code";
      fieldErrors[key] = issue.message;
    }
    return { fieldErrors };
  }

  const id = payload.data.id;

  const dto = {
    code: payload.data.code,
    language: payload.data.language,
  };

  const res = await apiFetch(`/api/snippets/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
    cache: "no-store",
  });

  if (!res.ok) {
    const { message } = await res.json();
    return { formError: message };
  }

  return { ok: true };
};
