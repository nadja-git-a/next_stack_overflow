"use client";

import { MarkType } from "../types/types";
import { clientFetch } from "../utilities/fetch/clientFetch";

export async function toggleMark(
  snippetId: number,
  mark: MarkType,
): Promise<MarkType> {
  const res = await clientFetch(`/api/snippets/${snippetId}/mark`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mark }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to toggle mark: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { mark: MarkType };
  return data.mark;
}
