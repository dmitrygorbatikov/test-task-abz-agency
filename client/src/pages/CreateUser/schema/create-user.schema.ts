import * as z from "zod"

import { E_ErrorMessage as e, regExp } from "./create-user.errors"

export const createUserSchema = z.object({
  name: z.string().nonempty(e.required),
  email: z.string().nonempty(e.required).regex(regExp.email, e.format),
  phone: z.string().nonempty(e.required).regex(regExp.phone, e.format),
  position_id: z.string().nonempty(e.required),
  photo: z.string().nonempty(e.required),
})

export type CreateUserValues = z.infer<typeof createUserSchema>
