import { z } from "zod";

export const LoginFormBody = z.object({
  email: z.string().email(),
  otp: z.number().nullable()
});

export type LoginFormDto = z.infer<typeof LoginFormBody>;
