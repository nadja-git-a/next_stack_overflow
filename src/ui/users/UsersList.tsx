import { UiUser } from "@/src/types/types";
import { Pagination } from "../pagination/Pagination";
import Link from "next/link";

import DoubleArrow from "@/public/icons/doubleArrow.svg";

export function UsersList({
  users,
  lastPage,
}: {
  users: UiUser[];
  lastPage: number;
}) {
  return (
    <div className="w-full px-8 py-6 bg-bg text-fg font-sans">
      <div className="mb-4">
        <Pagination lastPage={lastPage} />
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-primary-50 text-left text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Id</th>
              <th className="px-4 py-3 font-medium">{""}</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="transition hover:bg-primary-50/60">
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3 font-mono text-muted">{user.id}</td>
                <td className="px-4 py-3">
                  <Link href={`/user/${user.id}`}>
                    <DoubleArrow className="size-5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
