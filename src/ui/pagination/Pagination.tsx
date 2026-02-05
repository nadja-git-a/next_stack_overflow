"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ArrowRight from "@/public/icons/arrowRight.svg";
import ArrowLeft from "@/public/icons/arrowLeft.svg";
import { RoundButton } from "../button/RoundButton";

export function Pagination({ lastPage }: { lastPage: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const isLastPage = lastPage === currentPage;
  const isFirstPage = currentPage === 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageNumber));
    return `${pathname}?${params.toString()}`;
  };

  const goFirst = () => {
    router.push(createPageURL(1));
  };

  const goPrev = () => {
    router.push(createPageURL(currentPage - 1));
  };

  const goNext = () => {
    router.push(createPageURL(currentPage + 1));
  };

  const goLast = () => {
    router.push(createPageURL(lastPage));
  };

  return (
    <div className="mt-6 mb-6 flex items-center justify-center gap-4">
      <RoundButton onClick={goFirst} isDisabled={isFirstPage}>
        1
      </RoundButton>

      <RoundButton
        onClick={goPrev}
        isDisabled={isFirstPage}
        aria-label="Previous page"
      >
        <ArrowLeft className="size-6" />
      </RoundButton>
      <span className="text-sm font-medium text-fg">{currentPage}</span>
      <RoundButton
        onClick={goNext}
        aria-label="Next page"
        isDisabled={isLastPage}
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
        <ArrowRight className="size-6" />
      </RoundButton>
      <RoundButton onClick={goLast} isDisabled={isLastPage}>
        {lastPage}
      </RoundButton>
    </div>
  );
}
