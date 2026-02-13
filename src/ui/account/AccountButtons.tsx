"use client";

import { useAuthStore } from "@/src/shared/store/authStore";
import { Button } from "../button/Button";
import { useRouter } from "next/navigation";
import { clientFetch } from "@/src/utilities/fetch/clientFetch";

export function AccountButtons({ id }: { id: number }) {
  const logout = useAuthStore((store) => store.logout);
  const myId = useAuthStore((store) => store.user?.id);
  const router = useRouter();

  if (myId !== id) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/home");
  };

  const handleDelete = async () => {
    await clientFetch("/api/me", {
      method: "DELETE",
    });

    await logout();
    router.push("/home");
  };

  return (
    <div className="mt-6 flex gap-3">
      <Button className="flex-1 px-2 py-2" onClick={handleLogout}>
        Log out
      </Button>
      <Button className="flex-1 px-2 py-2" onClick={handleDelete}>
        Delete account
      </Button>
    </div>
  );
}
