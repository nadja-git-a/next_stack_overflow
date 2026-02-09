"use server";

import { URL } from "@/src/variables/variables";
import { cookies } from "next/headers";

type FetchInit = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

export async function serverFetch(path: string, init: FetchInit = {}) {
  const url = `${URL}${path}`;

  const headers: Record<string, string> = {
    ...(init.headers ?? {}),
  };

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) headers["cookie"] = `token=${token}`;

  return fetch(url, {
    ...init,
    headers,
  });
}
