import { Envelope, UserStatistics } from "@/src/types/types";
import { Account } from "@/src/ui/account/Account";
import { AccountForms } from "@/src/ui/accountForm/AccountForm";
import { serverFetch } from "@/src/utilities/fetch/serverFetch";
import { decodeJwtPayload } from "@/src/utilities/token/decodeJwtPayload";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const payload = token ? decodeJwtPayload(token) : null;

  const id = payload?.user.id;

  if (id === undefined) redirect("/login");

  const res = await serverFetch(`/api/users/${id}/statistic`);
  const data: Envelope<UserStatistics> = await res.json().catch(() => null);

  const user = data.data;

  return (
    <>
      <h1 className="my-3 text-center font-sans text-3xl font-bold text-primary">
        Welcome, {user.username}
      </h1>
      <Account user={user} />
      <AccountForms />
    </>
  );
}
