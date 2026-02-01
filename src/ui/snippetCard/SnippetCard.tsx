import { Snippet } from "@/src/types/types";
import { EditDeleteButtons } from "./EditDeleteButtons";
import { MarkButtons } from "./MarkButtons";

export interface SnippetCardProps {
  snippet: Snippet;
}

export default function SnippetCard({ snippet }: SnippetCardProps) {
  const { id, code, user, language, marks } = snippet;
  const initial = user?.username[0].toUpperCase();

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="
          flex h-9 w-9 items-center justify-center rounded-full
          bg-primary text-sm font-semibold text-white
        "
          >
            {initial}
          </div>

          <div>
            <div className="text-sm font-medium text-fg-accent">
              {user?.username}
            </div>
            <div className="text-xs text-fg-accent-soft">{language}</div>
          </div>
        </div>
        <EditDeleteButtons user={user} id={id} />
      </div>

      <div className="px-4 pb-3">
        <pre
          className="
        overflow-x-auto rounded-md
        bg-primary-50 p-3 text-sm
        font-mono text-fg
        whitespace-pre-wrap
      "
        >
          {code}
        </pre>
      </div>

      <MarkButtons marks={marks} id={id} />
    </>
  );
}
