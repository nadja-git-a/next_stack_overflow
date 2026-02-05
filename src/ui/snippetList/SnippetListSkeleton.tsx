import { HollowSnippet } from "./HollowSnippet";

export function SnippetListSkeleton() {
  return (
    <div className=" flex flex-col px-10 py-2 ">
      <HollowSnippet />
      <HollowSnippet />
      <HollowSnippet />
      <HollowSnippet />
      <HollowSnippet />
    </div>
  );
}
