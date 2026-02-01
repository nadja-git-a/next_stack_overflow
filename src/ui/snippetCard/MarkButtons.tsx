"use client";

import { CommentIcon } from "@/public/icons/CommentIcon";
import { ThumbDownIcon } from "@/public/icons/ThumbDownIcon";
import { ThumbUpIcon } from "@/public/icons/ThumbUpIcon";
import { useAuthStore } from "@/src/shared/store/authStore";
import { Mark } from "@/src/types/types";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ModalMarkAlert from "../modals/ModalMarkAlert";

export interface MarkButtons {
  marks: Mark[];
  id: number;
}

export function MarkButtons({ marks, id }: MarkButtons) {
  const [openModal, setOpenModal] = useState(false);

  const isAuth = useAuthStore((store) => store.isAuth);
  const usernameSaved = useAuthStore((store) => store.user?.username);
  const router = useRouter();

  const initialMark = useMemo(() => {
    return marks.find((m) => m.user.username === usernameSaved)?.type ?? "none";
  }, [marks, usernameSaved]);

  const [marked, setMarked] = useState(initialMark);

  useEffect(() => {
    setMarked(initialMark);
  }, [initialMark]);

  const likesCount = useMemo(
    () => marks.filter((m) => m.type === "like").length,
    [marks],
  );

  const [newLikesCount, setNewLikesCount] = useState(likesCount);

  const dislikesCount = useMemo(
    () => marks.filter((m) => m.type === "dislike").length,
    [marks],
  );

  const [newDislikesCount, setNewDislikesCount] = useState(dislikesCount);

  useEffect(() => {
    setNewLikesCount(marks.filter((m) => m.type === "like").length);
    setNewDislikesCount(marks.filter((m) => m.type === "dislike").length);
  }, [marks]);

  const handleLike = async (id: number) => {
    if (!isAuth) {
      setOpenModal(true);
      return;
    }
    try {
      await fetch(`/api/snippets/${id}/mark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mark: "like" }),
        credentials: "include",
      });
    } catch (e) {
      console.error(e);
    }

    if (marked === "like") {
      setMarked("none");
      setNewLikesCount((prev) => prev - 1);
    } else {
      setMarked("like");
      setNewLikesCount((prev) => prev + 1);
    }
  };

  const handleDislike = async (id: number) => {
    if (!isAuth) {
      setOpenModal(true);
      return;
    }
    try {
      await fetch(`/api/snippets/${id}/mark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mark: "dislike" }),
        credentials: "include",
      });
    } catch (e) {
      console.error(e);
    }

    if (marked === "dislike") {
      setMarked("none");
      setNewDislikesCount((prev) => prev - 1);
    } else {
      setMarked("dislike");
      setNewDislikesCount((prev) => prev + 1);
    }
  };

  const handleClick = (id: number) => {
    if (!isAuth) {
      setOpenModal(true);
      return;
    }
    router.push(`/snippets/${id}`);
  };

  return (
    <>
      <ModalMarkAlert open={openModal} onClose={() => setOpenModal(false)} />

      <div className="flex items-center gap-4 px-4 py-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLike(id);
          }}
          className="
    flex items-center gap-1
    text-primary transition hover:text-primary-600
  "
        >
          <ThumbUpIcon active={marked === "like"} />
          <span className="text-xs">{newLikesCount ?? 0}</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDislike(id);
          }}
          className="
    flex items-center gap-1
    text-primary transition hover:text-primary-600
  "
        >
          <ThumbDownIcon active={marked === "dislike"} />
          <span className="text-xs">{newDislikesCount ?? 0}</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick(id);
          }}
          className="
    flex items-center gap-1
    text-primary transition hover:text-primary-600
  "
        >
          <CommentIcon />
        </button>
      </div>
    </>
  );
}
