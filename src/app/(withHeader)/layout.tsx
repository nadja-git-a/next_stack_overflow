import { ReactNode } from "react";
import { Header } from "../../ui/header/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
