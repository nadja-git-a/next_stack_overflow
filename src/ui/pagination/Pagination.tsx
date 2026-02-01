"use client";

import { ArrowLeftIcon } from "@/public/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "@/public/icons/ArrowRightIcon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Pagination({ isLastPage }: { isLastPage: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const isFirstPage = currentPage === 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageNumber));
    return `${pathname}?${params.toString()}`;
  };

  const goPrev = () => {
    if (!isFirstPage) {
      router.push(createPageURL(currentPage - 1));
    }
  };

  const goNext = () => {
    router.push(createPageURL(currentPage + 1));
  };

  return (
    <div className="mt-6 mb-6 flex items-center justify-center gap-4">
      <button
        onClick={goPrev}
        disabled={isFirstPage}
        aria-label="Previous page"
        className="
      inline-flex h-10 w-10 items-center justify-center rounded-full
      border border-border
      text-primary
      transition
      hover:bg-primary-50
      disabled:cursor-not-allowed
      disabled:opacity-40
    "
      >
        <ArrowLeftIcon />
      </button>

      <span className="text-sm font-medium text-fg">{currentPage}</span>

      <button
        onClick={goNext}
        aria-label="Next page"
        disabled={isLastPage}
        className="
      inline-flex h-10 w-10 items-center justify-center rounded-full
      border border-border
      text-primary
      transition
      hover:bg-primary-50
      disabled:cursor-not-allowed
      disabled:opacity-40
    "
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
}
