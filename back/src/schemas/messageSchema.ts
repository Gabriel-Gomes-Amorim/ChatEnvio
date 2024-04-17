import { z } from "zod";

export const messageRegisterBodySchema = z.object({
  text: z.string(),
  fromMe: z.boolean(),
  senderName: z.string(),
});
