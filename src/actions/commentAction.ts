"use server";

import z from "zod";
import type { CommentResponse, Envelope } from "../types/types";
import { apiFetch } from "../utilities/fetch/apiFetch";
import { revalidateTag } from "next/cache";

const commentSchema = z.object({
  comment: z.string().min(1, "Comment can't be empty"),
  id: z.string().optional(),
});

export type CommentState = {
  formError?: string;
  ok?: boolean;
  comment?: CommentResponse;
};

export const comment = async (
  prevState: CommentState,
  formData: FormData,
): Promise<CommentState> => {
  const payload = commentSchema.safeParse({
    comment: formData.get("comment"),
    id: formData.get("id"),
  });

  if (!payload.success) {
    return { formError: "Something went wrong" };
  }

  const dto = {
    content: payload.data.comment,
    snippetId: payload.data.id,
  };

  const res = await apiFetch(`/api/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
    cache: "no-store",
  });

  if (!res.ok) {
    return { formError: `Request failed (${res.status})` };
  }

  const data = (await res.json()) as Envelope<CommentResponse>;

  revalidateTag(`comments-${dto.snippetId}`, "default");

  return {
    ok: true,
    comment: data.data,
  };
};
