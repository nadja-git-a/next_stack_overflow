import { Suspense } from "react";
import { Envelope, Snippet } from "../../../types/types";
import { SnippetList } from "../../../ui/snippetList/SnippetList";
import { Loader } from "../../../ui/loader/Loader";
import { limit } from "../../../variables/variables";
import { serverFetch } from "@/src/utilities/fetch/serverFetch";
import { cookies } from "next/headers";
import { decodeJwtPayload } from "@/src/utilities/token/decodeJwtPayload";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const token = (await cookies()).get("token")?.value;
  const payload = token ? decodeJwtPayload(token) : null;

  const id = payload?.user.id;

  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page ?? 1));

  const res = await serverFetch(
    `/api/snippets?userId=${id}&page=${page}&limit=${limit}`,
  );
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
