import { FC } from "react"
import toastr from "toastr"
import { tokenAPI } from "../../services/token"
import { useNavigate } from "react-router-dom"
import { TextField } from "./components/TextField.tsx"
import { useFormContext } from "react-hook-form"
import { CreateTokenValues } from "./schema/create-token.schema.ts"
import { SubmitButton } from "../../components/SubmitButton"
import { CancelButton } from "../../components/CancelButton"

export const CreateTokenForm: FC = () => {
  const [createToken, { isLoading }] = tokenAPI.useCreateTokenMutation()
  const navigate = useNavigate()
  const { handleSubmit, getValues, watch } = useFormContext<CreateTokenValues>()

  const handleCreateToken = () => () => {
    createToken(getValues())
      .unwrap()
      .then((res) => {
        navigate(`/tokens/list/${res.id}`)
      })
      .catch((error) => {
        toastr.error(error.data.error)
      })
  }

  const handleCancel = () => navigate("/")

  if (isLoading) {
    return <h1>Loading ...</h1>
  }

  watch()

  return (
    <div className="container mx-auto p-8">
      <form onSubmit={handleSubmit(handleCreateToken())}>
        <TextField fieldName={"userId"} label={"Test User Id"} />
        <SubmitButton
          isLoading={isLoading}
          type={"submit"}
          title={isLoading ? "Creating..." : "Create Token"}
        />
        <CancelButton
          isLoading={isLoading}
          onClick={handleCancel}
          title={"Cancel"}
        />
      </form>
    </div>
  )
}
