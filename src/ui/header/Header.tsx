import { LogInOutButton } from "./LogInOutButton";
import { Menu } from "./Menu";

export function Header() {
  return (
    <div className="flex-grow">
      <header className="bg-bg text-blue-600 shadow-sm">
        <div className="flex items-center px-2 border-b border-border bg-bg">
          <Menu />
          <h1 className="flex-grow text-lg font-semibold text-fg-accent">
            CODELANG
          </h1>
          <LogInOutButton />
        </div>
      </header>
    </div>
  );
}
