"use client";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
}
