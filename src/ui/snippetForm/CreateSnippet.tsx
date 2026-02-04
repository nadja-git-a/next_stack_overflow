import { Envelope } from "@/src/types/types";
import { CreateSnippetForm } from "./CreateSnippetForm";
import { serverFetch } from "@/src/utilities/fetch/serverFetch";

export async function CreateSnippet() {
  const res = await serverFetch(`/api/snippets/languages`);

  const data: Envelope<string[]> = await res.json().catch(() => null);
  const languages = await data.data;

  return (
    <div className="mx-auto w-full max-w-sm">
      <CreateSnippetForm languages={languages} />
    </div>
  );
}
