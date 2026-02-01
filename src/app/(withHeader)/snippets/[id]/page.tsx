import { Loader } from "@/src/ui/loader/Loader";
import { Post } from "@/src/ui/post/Post";
import { Suspense } from "react";

export default function Page(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<Loader />}>
      <Post params={props.params} />
    </Suspense>
  );
}
