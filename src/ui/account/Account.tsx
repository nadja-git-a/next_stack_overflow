import { UserStatistics } from "@/src/types/types";
import { Stat } from "./Stat";
import { AccountButtons } from "./AccountButtons";

export function Account({ user }: { user: UserStatistics }) {
  const { statistic } = user;

  return (
    <div className="flex py-5 items-center justify-center bg-bg px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-bg p-6 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <p className="text-lg font-semibold text-fg">{user.username}</p>
          <p className="mt-1 text-sm text-muted">id: {user.id}</p>
          <p className="mt-1 text-sm text-muted">role: {user.role}</p>
        </div>

        <AccountButtons />

        <div className="my-6 h-px bg-border" />

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <Stat label="Rating" value={Math.round(statistic.rating)} />
          <Stat label="Snippets" value={statistic.snippetsCount} />
          <Stat label="Comments" value={statistic.commentsCount} />
          <Stat label="Likes" value={statistic.likesCount} />
          <Stat label="Dislikes" value={statistic.dislikesCount} />
          <Stat label="Questions" value={statistic.questionsCount} />
          <Stat label="Correct answers" value={statistic.correctAnswersCount} />
          <Stat label="Regular answers" value={statistic.regularAnswersCount} />
        </div>
      </div>
    </div>
  );
}
