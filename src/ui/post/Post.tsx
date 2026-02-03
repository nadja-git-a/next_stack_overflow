import { Suspense } from "react";
import { Loader } from "../loader/Loader";
import SnippetCard from "../snippetCard/SnippetCard";
import { CommentsList } from "../comments/CommentsList";
import { Envelope, Snippet } from "@/src/types/types";
import { URL } from "@/src/variables/variables";

export async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`${URL}/api/snippets/${id}`, {
    next: { tags: [`comments-${id}`] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch snippet: ${res.status}`);
  }

  const data = (await res.json()) as Envelope<Snippet>;
  const snippet = data.data;
  const { comments } = snippet;
  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className="mt-4 flex flex-col items-center">
          <div className="w-full p-6">
            <SnippetCard snippet={snippet} />
          </div>

          <CommentsList id={id} comments={comments} />
        </div>
      </Suspense>
    </>
  );
}
