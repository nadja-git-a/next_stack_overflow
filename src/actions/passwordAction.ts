"use server";

import z from "zod";
import { serverFetch } from "../utilities/fetch/serverFetch";
import { PASSWORD_REGEX } from "../variables/variables";

const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Password should contain at least 6 characters")
      .regex(
        PASSWORD_REGEX,
        "Password must contain at least one lowercase letter, one uppercase letter, one number and one symbol",
      ),
    newPassword: z
      .string()
      .min(6, "Password should contain at least 6 characters")
      .regex(
        PASSWORD_REGEX,
        "Password must contain at least one lowercase letter, one uppercase letter, one number and one symbol",
      ),
    confirm: z.string(),
  })
  .refine((v) => v.newPassword === v.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

export interface PasswordState {
  fieldErrors?: {
    oldPassword?: string;
    newPassword?: string;
    confirm?: string;
  };
  formError?: string | null;
  ok?: boolean;
}

export const changePassword = async (
  _prevState: PasswordState,
  formData: FormData,
): Promise<PasswordState> => {
  const payload = changePasswordSchema.safeParse({
    oldPassword: formData.get("oldPassword"),
    newPassword: formData.get("newPassword"),
    confirm: formData.get("confirm"),
  });

  if (!payload.success) {
    const fieldErrors: NonNullable<PasswordState>["fieldErrors"] = {};
    for (const issue of payload.error.issues) {
      const key = issue.path[0] as "oldPassword" | "newPassword" | "confirm";
      fieldErrors[key] = issue.message;
    }
    return { fieldErrors };
  }

  const dto = {
    oldPassword: payload.data.oldPassword,
    newPassword: payload.data.newPassword,
  };

  const res = await serverFetch(`/api/me/password`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
    cache: "no-store",
  });

  if (!res.ok) {
    const { message } = await res.json();
    return { formError: message };
  }

  return { ok: true };
};
