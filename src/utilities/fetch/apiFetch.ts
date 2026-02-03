"use server";

import { getApiBase } from "@/src/variables/variables";
import { cookies } from "next/headers";

type FetchInit = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

export async function apiFetch(path: string, init: FetchInit = {}) {
  const base = getApiBase();
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const headers: Record<string, string> = {
    ...(init.headers ?? {}),
  };

  if (typeof window === "undefined") {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) headers["cookie"] = `token=${token}`;
  }

  return fetch(url, {
    ...init,
    headers,
    credentials: "include",
  });
}
