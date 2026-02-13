"use client";

import { useAuthStore } from "@/src/shared/store/authStore";
import Link from "next/link";
import { Button } from "../button/Button";
import { useRouter } from "next/navigation";
import { UiUser } from "@/src/types/types";
import { useEffect } from "react";

export function LogInOutButton({ user }: { user: UiUser | undefined }) {
  const setUser = useAuthStore((store) => store.setUser);
  const isAuth = useAuthStore((store) => store.isAuth);
  const logout = useAuthStore((store) => store.logout);
  const router = useRouter();

  useEffect(() => {
    if (user) setUser(user);
  }, [user, setUser]);

  const onLogout = async () => {
    await logout();
    router.push("/home");
  };
  return (
    <>
      {isAuth ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">{user?.username ?? ""}</span>

          <Button onClick={onLogout} className=" px-3 py-1">
            Log out
          </Button>
        </div>
      ) : (
        <Link
          href="/login"
          className="
          inline-flex
          items-center
          rounded-md
          px-3
          py-1
          text-sm
          font-medium
          bg-primary
          text-white
          transition
          hover:bg-primary-600
          focus:outline-none
          focus:ring-2
          focus:ring-primary
        "
        >
          Log in
        </Link>
      )}
    </>
  );
}
