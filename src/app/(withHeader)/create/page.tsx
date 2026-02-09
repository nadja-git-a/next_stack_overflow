import { Loader } from "@/src/ui/loader/Loader";
import { CreateSnippet } from "@/src/ui/snippetForm/CreateSnippet";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <h1 className="my-3 text-center font-sans text-3xl font-bold text-primary">
          New Snippet
        </h1>

        <CreateSnippet />
      </Suspense>
    </>
  );
}
