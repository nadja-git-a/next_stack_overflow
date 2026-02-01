"use client";
import { useAuthStore } from "@/src/shared/store/authStore";
import { useEffect } from "react";

export function AuthRefresh() {
  const hydrate = useAuthStore((store) => store.hydrate);

  useEffect(() => {
    console.log("hydrate");
    hydrate();
  }, [hydrate]);

  return null;
}
