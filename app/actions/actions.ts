"use server";

import z from "zod";
import { PASSWORD_REGEX, URL } from "../variables/variables";
import { Envelope, UiUser } from "../types/types";

const registrationSchema = z
  .object({
    username: z
      .string()
      .min(5, "Username should contain at least 5 characters"),
    password: z
      .string()
      .min(6, "Password should contain at least 6 characters")
      .regex(
        PASSWORD_REGEX,
        "Password must contain at least one lowercase letter, one uppercase letter, one number and one symbol",
      ),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

export type AuthState = {
  fieldErrors?: {
    username?: string;
    password?: string;
    confirm?: string;
  };
  formError?: string;
  ok?: boolean;
  user?: UiUser;
};

export const authenticate = async (
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  const payload = registrationSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });

  if (!payload.success) {
    const fieldErrors: NonNullable<AuthState>["fieldErrors"] = {};

    if (!payload.success) {
      const fieldErrors: NonNullable<AuthState>["fieldErrors"] = {};
      for (const issue of payload.error.issues) {
        const key = issue.path[0] as "username" | "password" | "confirm";
        fieldErrors[key] = issue.message;
      }
      return { fieldErrors };
    }

    return { fieldErrors };
  }
  const dto = {
    username: payload.data.username,
    password: payload.data.password,
  };
  const res = await fetch(`${URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
    cache: "no-store",
  });

  if (!res.ok) {
    const { message } = await res.json();
    return { formError: message };
  }

  const data: Envelope<UiUser> = await res.json().catch(() => null);

  const user = data?.data;

  // console.log(data);
  return {
    ok: true,
    user: { id: user.id, username: user.username, role: user.role },
  };
};

const loginSchema = z.object({
  username: z.string().min(5, "Username should contain at least 5 characters"),
  password: z
    .string()
    .min(6, "Password should contain at least 6 characters")
    .regex(
      PASSWORD_REGEX,
      "Password must contain at least one lowercase letter, one uppercase letter, one number and one symbol",
    ),
});

export const loggingIn = async (
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  const payload = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!payload.success) {
    const fieldErrors: NonNullable<AuthState>["fieldErrors"] = {};

    if (!payload.success) {
      const fieldErrors: NonNullable<AuthState>["fieldErrors"] = {};
      for (const issue of payload.error.issues) {
        const key = issue.path[0] as "username" | "password";
        fieldErrors[key] = issue.message;
      }
      return { fieldErrors };
    }

    return { fieldErrors };
  }
  const dto = {
    username: payload.data.username,
    password: payload.data.password,
  };
  const res = await fetch(`${URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
    cache: "no-store",
  });

  if (!res.ok) {
    const { message } = await res.json();
    return { formError: message };
  }

  const data: Envelope<UiUser> = await res.json().catch(() => null);

  const user = data?.data;

  return {
    ok: true,
    user: { id: user.id, username: user.username, role: user.role },
  };
};
