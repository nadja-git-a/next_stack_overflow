import { Snippet } from "@/src/types/types";

import { Pagination } from "../pagination/Pagination";
import { HomeSnippet } from "../snippetCard/HomeSnippet";
import { Suspense } from "react";
import { SnippetListSkeleton } from "../snippetSkeleton/SnippetListSkeleton";

interface SnippetList {
  snippets: Snippet[];
  lastPage: number;
}

export function SnippetList({ snippets, lastPage }: SnippetList) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <div className="mt-4">
        <Pagination lastPage={lastPage} />
      </div>
      <Suspense fallback={<SnippetListSkeleton />}>
        <div className="mt-4 flex flex-col items-center">
          {snippets.map((snippet) => (
            <HomeSnippet key={snippet.id} snippet={snippet} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
