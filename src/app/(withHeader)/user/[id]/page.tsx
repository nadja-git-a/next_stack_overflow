import { Envelope, UserStatistics } from "@/src/types/types";
import { Account } from "@/src/ui/account/Account";
import { Loader } from "@/src/ui/loader/Loader";
import { serverFetch } from "@/src/utilities/fetch/serverFetch";
import { Suspense } from "react";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const param = await props.params;
  const res = await serverFetch(`/api/users/${param.id}/statistic`);

  const data: Envelope<UserStatistics> = await res.json().catch(() => null);
  const user = data.data;

  return (
    <Suspense fallback={<Loader />}>
      <Account user={user} />
    </Suspense>
  );
}
