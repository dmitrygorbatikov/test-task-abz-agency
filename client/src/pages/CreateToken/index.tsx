import { FC, useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { createTokenFormData } from "../../store/token/data.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  createTokenSchema,
  CreateTokenValues,
} from "./schema/create-token.schema.ts"
import { CreateTokenForm } from "./CreateTokenForm.tsx"

const CreateToken: FC = () => {
  const methods = useForm<CreateTokenValues>({
    defaultValues: createTokenFormData,
    resolver: zodResolver(createTokenSchema),
    shouldFocusError: true,
  })

  useEffect(() => {
    methods.reset(createTokenFormData)
  }, [])

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Create new Token</h1>
      <FormProvider {...methods}>
        <CreateTokenForm />
      </FormProvider>
    </div>
  )
}

export default CreateToken
