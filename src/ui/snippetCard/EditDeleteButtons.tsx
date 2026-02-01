"use client";

import { deleteSnippet } from "@/src/actions/snippetActions";
import { useAuthStore } from "@/src/shared/store/authStore";
import { UiUser } from "@/src/types/types";
import { useRouter } from "next/navigation";
// import { useState } from "react";

export function EditDeleteButtons({ user, id }: { user?: UiUser; id: number }) {
  // const [editOpen, setEditOpen] = useState(false);
  const router = useRouter();
  const userSavedId = useAuthStore((store) => store.user?.id);

  if (user?.id !== userSavedId) return <div></div>;

  const handleDelete = (id: number) => {
    deleteSnippet(id);
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          // setEditOpen(true);
        }}
        className="
          rounded-md border border-border px-2 py-1 text-xs
          text-primary transition hover:bg-primary-50
        "
      >
        Edit
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(id);
        }}
        className="
          rounded-md border border-border px-2 py-1 text-xs
          text-red-600 transition hover:bg-red-50
        "
      >
        Delete
      </button>
    </div>
  );
}
