"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ArrowRight from "@/public/icons/arrowRight.svg";
import ArrowLeft from "@/public/icons/arrowLeft.svg";
import { Button } from "../button/Button";

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
      <Button onClick={goFirst} isDisabled={isFirstPage} variant="round">
        1
      </Button>

      <Button
        onClick={goPrev}
        isDisabled={isFirstPage}
        variant="round"
        aria-label="Previous page"
      >
        <ArrowLeft className="size-6" />
      </Button>
      <span className="text-sm font-medium text-fg">{currentPage}</span>
      <Button
        onClick={goNext}
        aria-label="Next page"
        isDisabled={isLastPage}
        variant="round"
      >
        <ArrowRight className="size-6" />
      </Button>
      <Button onClick={goLast} isDisabled={isLastPage} variant="round">
        {lastPage}
      </Button>
    </div>
  );
}
