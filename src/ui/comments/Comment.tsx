import { CommentResponse } from "@/src/types/types";

export function Comment({ comment }: { comment: CommentResponse }) {
  const { username } = comment.user;
  const { content } = comment;

  const initial = username.at(0);
  return (
    <div className="w-full p-[10px]">
      <div
        className="
      flex w-full items-start gap-2 rounded-lg p-4
      bg-bg border border-border shadow-sm
    "
      >
        <div
          className="
        flex-shrink-0 h-10 w-10 rounded-full
        bg-primary-50 text-primary-600
        flex items-center justify-center font-medium
      "
        >
          {initial}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-tight text-fg">
            {username}
          </p>

          <p className="mt-1 text-sm leading-snug text-muted break-words">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
