import { Loader } from "@/src/ui/loader/Loader";
import { CreateSnippet } from "@/src/ui/snippetForm/CreateSnippet";
import { decodeJwtPayload } from "@/src/utilities/token/decodeJwtPayload";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const payload = token ? decodeJwtPayload(token) : null;

  const id = payload?.user.id;

  if (id === undefined) redirect("/login");
  return (
    <>
      <Suspense fallback={<Loader />}>
        <h1 className="my-3 text-center font-sans text-3xl font-bold text-primary">
          New Snippet
        </h1>

        <CreateSnippet />
      </Suspense>
    </>
  );
}
