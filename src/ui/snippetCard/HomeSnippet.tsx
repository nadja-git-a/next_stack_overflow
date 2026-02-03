import { Snippet } from "@/src/types/types";
import SnippetCard from "./SnippetCard";
import { SnippetWrapper } from "./SnippetWrapper";

export function HomeSnippet({ snippet }: { snippet: Snippet }) {
  const { id } = snippet;
  return (
    <SnippetWrapper id={id}>
      <SnippetCard snippet={snippet} />
    </SnippetWrapper>
  );
}
