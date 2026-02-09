import { UserStatistics } from "@/src/types/types";
import { Button } from "../button/Button";

export function Account({ user }: { user: UserStatistics }) {
  const { statistic } = user;
  return (
    <div>
      <div>
        {/* <Avatar /> */}
        <p>{user.username}</p>
        <p>id: {user.id}</p>
        <p>role: {user.role}</p>
      </div>
      <Button>Log out</Button>
      <Button>Delete account</Button>
      <div>
        <p>rating: {statistic.rating}</p>
        <p>snippets: {statistic.snippetsCount}</p>
        <p>comments: {statistic.commentsCount}</p>
        <p>likes: {statistic.likesCount}</p>
        <p>dislikes: {statistic.dislikesCount}</p>
        <p>questions: {statistic.questionsCount}</p>
        <p>correct answers: {statistic.correctAnswersCount}</p>
        <p>regular answers: {statistic.regularAnswersCount}</p>
      </div>
    </div>
  );
}
