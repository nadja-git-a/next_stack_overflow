import { Snippet } from "@/src/types/types";

import { Pagination } from "../pagination/Pagination";
import { HomeSnippet } from "../snippetCard/HomeSnippet";

interface SnippetList {
  snippets: Snippet[];
  isLastPage: boolean;
}

export function SnippetList({ snippets, isLastPage }: SnippetList) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <div className="mt-4">
        <Pagination isLastPage={isLastPage} />
      </div>

      <div className="mt-4 flex flex-col items-center">
        {snippets.map((snippet) => (
          <HomeSnippet key={snippet.id} snippet={snippet} />
        ))}
      </div>
    </div>
  );
}
