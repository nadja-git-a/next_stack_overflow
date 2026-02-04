"use client";

type FetchInit = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

export async function clientFetch(path: string, init: FetchInit = {}) {
  const headers: Record<string, string> = {
    ...(init.headers ?? {}),
  };

  return fetch(path, {
    ...init,
    headers,
    credentials: "include",
  });
}
