import z from "zod";

export const usernameSchema = z.object({
  username: z.string().min(5, "Username should contain at least 5 characters"),
});

export type UsernameType = z.infer<typeof usernameSchema>;
