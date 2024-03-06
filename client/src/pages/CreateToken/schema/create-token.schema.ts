import * as z from "zod"

import { E_ErrorMessage as e } from "./create-token.errors.ts"

export const createTokenSchema = z.object({
  userId: z.string().nonempty(e.required),
})

export type CreateTokenValues = z.infer<typeof createTokenSchema>
