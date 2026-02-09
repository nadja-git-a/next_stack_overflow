import ThumbUp from "@/public/icons/thumbUp.svg";
import ThumbDown from "@/public/icons/thumbDown.svg";
import Comment from "@/public/icons/comment.svg";
import { IconButton } from "./IconButton";

export function HollowSnippet() {
  return (
    <>
      <div className="flex items-center justify-between  px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="
        flex h-9 w-9 items-center justify-center rounded-full
        bg-primary text-sm font-semibold text-white
      "
          ></div>

          <div>
            <div className="text-sm font-medium text-fg-accent">
              <div className="h-4 w-32 rounded bg-primary-200" />
            </div>
            <div className="text-xs text-fg-accent-soft">
              <div className="h-4 w-32 rounded bg-primary-200" />
            </div>
          </div>
        </div>
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
          <div className="h-4 w-100 rounded bg-primary-200" />
          <div className="h-4 w-100 rounded bg-primary-200" />
          <div className="h-4 w-100 rounded bg-primary-200" />
          <div className="h-4 w-100 rounded bg-primary-200" />
          <div className="h-4 w-100 rounded bg-primary-200" />
        </pre>
      </div>

      <div className="flex items-center gap-4 px-4 py-2">
        <IconButton>
          <ThumbUp className={`size-6`} />
        </IconButton>

        <IconButton>
          <ThumbDown className={` size-6`} />
        </IconButton>

        <IconButton>
          <Comment className={`size-6`} />
        </IconButton>
      </div>
    </>
  );
}
