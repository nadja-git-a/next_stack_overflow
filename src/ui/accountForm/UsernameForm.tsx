"use client";

import { Button } from "../button/Button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { usernameSchema, UsernameType } from "./usernameSchema/usernameSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientFetch } from "@/src/utilities/fetch/clientFetch";
import { Input } from "../input/Input";
import { useAuthStore } from "@/src/shared/store/authStore";
import { useEffect } from "react";

export function UsernameForm() {
  const router = useRouter();
  const username = useAuthStore((store) => store.user?.username);

  const form = useForm<UsernameType>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: username,
    },
  });

  const { register, handleSubmit, formState, reset } = form;

  useEffect(() => {
    reset({ username });
  }, [username, reset]);

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

        <Input
          type="text"
          {...register("username")}
          placeholder="New username"
          helperText={formState.errors.username?.message}
        />
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
