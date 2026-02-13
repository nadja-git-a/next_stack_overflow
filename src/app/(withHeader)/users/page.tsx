import { Envelope, UiUser } from "@/src/types/types";
import { UsersList } from "@/src/ui/users/UsersList";
import { serverFetch } from "@/src/utilities/fetch/serverFetch";
import { limitUsers } from "@/src/variables/variables";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page ?? 1));

  const res = await serverFetch(`/api/users?page=${page}&limit=${limitUsers}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  const data: Envelope<Envelope<UiUser[]>> = await res.json().catch(() => null);

  const lastPage = data.data.meta?.totalPages || 1;

  const users: UiUser[] = data.data.data;

  return (
    <div>
      <main>
        <h1 className="mt-3 text-center font-sans text-3xl font-bold text-primary">
          Users
        </h1>
        <UsersList users={users} lastPage={lastPage} />
      </main>
    </div>
  );
}
