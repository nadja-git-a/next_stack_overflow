import { CommentResponse } from "@/src/types/types";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";

export function CommentsList({
  comments,
  id,
}: {
  comments?: CommentResponse[];
  id: string;
}) {
  return (
    <>
      {!comments || comments.length === 0 ? (
        <div className="mt-3 p-3 text-center rounded-lg bg-bg border border-border">
          <p className="text-sm text-muted">No comments yet</p>
        </div>
      ) : (
        <div className="w-full px-6 pb-6">
          <h3 className="mb-2 text-lg font-semibold text-fg">
            Comments ({comments.length})
          </h3>

          <div className="flex flex-col max-h-[300px]  overflow-y-auto pr-1">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      )}

      <CommentForm id={id} />
    </>
  );
}
