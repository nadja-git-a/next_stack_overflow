"use client";

import { apiFetch } from "../utilities/fetch/apiFetch";

export const deleteSnippet = async (id: number) => {
  const res = await apiFetch(`api/snippets/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to delete snippet: ${res.status} ${text}`);
  }
};
