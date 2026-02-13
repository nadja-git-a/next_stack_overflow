import { ReactNode, Suspense } from "react";
import { Header } from "../../ui/header/Header";
import { Toaster } from "sonner";
import { Loader } from "@/src/ui/loader/Loader";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
      </Suspense>

      {children}
      <Toaster position="top-right" richColors />
    </>
  );
}
