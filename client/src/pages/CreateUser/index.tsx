import { FC, useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  createUserSchema,
  CreateUserValues,
} from "./schema/create-user.schema.ts"
import { CreateUserForm } from "./CreateUserForm.tsx"
import { createUserFormData } from "../../store/user/data.ts"
const CreateUser: FC = () => {
  const methods = useForm<CreateUserValues>({
    defaultValues: createUserFormData,
    resolver: zodResolver(createUserSchema),
    shouldFocusError: true,
  })

  useEffect(() => {
    methods.reset(createUserFormData)
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create new User</h1>
      <FormProvider {...methods}>
        <CreateUserForm />
      </FormProvider>
    </div>
  )
}

export default CreateUser
