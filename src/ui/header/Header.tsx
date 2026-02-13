import { serverFetch } from "@/src/utilities/fetch/serverFetch";
import { LogInOutButton } from "./LogInOutButton";
import { Menu } from "./Menu";

export async function Header() {
  const res = await serverFetch("/api/me", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json().catch(() => null);
  const user = data.data;

  return (
    <div className="flex-grow">
      <header className="bg-bg text-blue-600 shadow-sm">
        <div className="flex items-center px-2 border-b border-border bg-bg">
          <Menu />
          <h1 className="flex-grow text-lg font-semibold text-fg-accent">
            CODELANG
          </h1>
          <LogInOutButton user={user} />
        </div>
      </header>
    </div>
  );
}
