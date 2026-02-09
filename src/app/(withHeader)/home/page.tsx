import { Suspense } from "react";
import { Envelope, Snippet } from "../../../types/types";
import { SnippetList } from "../../../ui/snippetList/SnippetList";
import { Loader } from "../../../ui/loader/Loader";
import { limit, URL } from "../../../variables/variables";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page ?? 1));

  const res = await fetch(`${URL}/api/snippets?page=${page}&limit=${limit}`);
  const data: Envelope<Envelope<Snippet[]>> = await res
    .json()
    .catch(() => null);
  const snippets = data.data.data;
  const safeSnippets = JSON.parse(JSON.stringify(snippets));

  const totalPages = data.data.meta?.totalPages || 0;

  return (
    <div>
      <main>
        <Suspense fallback={<Loader />}>
          <SnippetList snippets={safeSnippets} lastPage={totalPages} />
        </Suspense>
      </main>
    </div>
  );
}
