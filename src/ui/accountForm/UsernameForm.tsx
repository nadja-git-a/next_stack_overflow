"use client";

import { Button } from "../button/Button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { usernameSchema, UsernameType } from "./usernameSchema/usernameSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientFetch } from "@/src/utilities/fetch/clientFetch";

export function UsernameForm() {
  const router = useRouter();

  const form = useForm<UsernameType>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });

  const { register, handleSubmit, formState } = form;

  const onSubmit = async (data: UsernameType) => {
    const res = await clientFetch(`/api/me`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
      }),
      cache: "no-store",
    });

    if (!res.ok) return toast.error("Something went wrong");

    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 w-full space-y-4 rounded-2xl border border-border bg-bg px-6 py-5"
    >
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-fg">
          Change your username
        </legend>

        <input
          {...register("username")}
          placeholder="New username"
          className="
        w-full rounded-lg px-3 py-2 text-sm
        bg-bg text-fg placeholder:text-muted
        border border-border
        transition
        focus:outline-none focus:ring-1 focus:ring-primary
      "
        />

        {formState.errors.username && (
          <p className="mt-1 text-sm text-red-500">
            {formState.errors.username.message}
          </p>
        )}
      </fieldset>

      <div className="flex justify-end">
        <Button
          isDisabled={formState.isSubmitting}
          type="submit"
          className="px-3 py-1"
        >
          {formState.isSubmitting ? "Changing…" : "Save"}
        </Button>
      </div>
    </form>
  );
}
