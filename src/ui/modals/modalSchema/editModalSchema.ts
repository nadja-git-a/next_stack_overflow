import z from "zod";

export const editModalSchema = z.object({
  code: z.string().min(6, "Snippet should contain at least 6 characters"),
  language: z.string(),
});

export type EditModal = z.infer<typeof editModalSchema>;
