"use client";

import { useAuthStore } from "@/src/shared/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EditModal } from "../modals/EditModal";
import { clientFetch } from "@/src/utilities/fetch/clientFetch";

export function EditDeleteButtons({
  userId,
  id,
  code,
  language,
  languages,
}: {
  userId: number;
  id: number;
  code: string;
  language: string;
  languages: string[];
}) {
  const [editOpen, setEditOpen] = useState(false);
  const router = useRouter();
  const userSavedId = useAuthStore((store) => store.user?.id);

  if (userId !== userSavedId) return <div></div>;

  const handleDelete = async (id: number) => {
    try {
      const res = await clientFetch(`/api/snippets/${id}`, {
        method: "DELETE",
      });
      console.log("delete status", res.status);
    } catch (e) {
      console.log("delete failed", e);
    }
    router.refresh();
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditOpen(true);
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

      <EditModal
        initialLanguage={language}
        initialCode={code}
        snippetId={String(id)}
        languages={languages}
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
        }}
      />
    </>
  );
}
