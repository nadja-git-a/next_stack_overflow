"use client";

import { useAuthStore } from "@/src/shared/store/authStore";

export default function Page() {
  const isAuth = useAuthStore((store) => store.isAuth);

  if (!isAuth) return <div>Unauthorized</div>;
  return <div>is auth</div>;
}
