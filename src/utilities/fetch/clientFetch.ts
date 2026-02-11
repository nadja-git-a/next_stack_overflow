"use client";

type FetchInit = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

import { useAuthStore } from "@/src/shared/store/authStore";

export async function clientFetch(path: string, init: FetchInit = {}) {
  const headers: HeadersInit = {
    ...(init.headers ?? {}),
  };

  const response = await fetch(path, {
    ...init,
    headers,
    credentials: "include",
  });

  if (response.status === 401) {
    const { logout } = useAuthStore.getState();
    logout();

    throw new Error("Unauthorized");
  }

  return response;
}
