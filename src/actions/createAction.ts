"use server";

import z from "zod";
import { apiFetch } from "../utilities/fetch/apiFetch";

const createSnippetSchema = z.object({
  code: z.string().min(6, "Snippet should contain at least 6 characters"),
  language: z.string(),
});

export interface CreateState {
  fieldErrors?: {
    code?: string;
    language?: string;
  };
  formError?: string | null;
  ok?: boolean;
}

export const createSnippet = async (
  _prevState: CreateState,
  formData: FormData,
): Promise<CreateState> => {
  const payload = createSnippetSchema.safeParse({
    code: formData.get("code"),
    language: formData.get("language"),
  });

  if (!payload.success) {
    const fieldErrors: NonNullable<CreateState>["fieldErrors"] = {};
    for (const issue of payload.error.issues) {
      const key = issue.path[0] as "code";
      fieldErrors[key] = issue.message;
    }
    return { fieldErrors };
  }

  const dto = {
    code: payload.data.code,
    language: payload.data.language,
  };

  const res = await apiFetch(`/api/snippets`, {
    method: "POST",
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
