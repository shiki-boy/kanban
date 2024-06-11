import { z } from "zod";

export const LoginFormBody = z.object({
  email: z.string().email(),
});

export type LoginFormDto = z.infer<typeof LoginFormBody>;
