import { FC } from "react"
import toastr from "toastr"
import { tokenAPI } from "../../services/token"
import { useNavigate } from "react-router-dom"
import { TextField } from "./components/TextField.tsx"
import { useFormContext } from "react-hook-form"
import { CreateTokenValues } from "./schema/create-token.schema.ts"

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

  if (isLoading) {
    return <h1>Loading ...</h1>
  }

  watch()

  return (
    <div className="container mx-auto p-8">
      <form onSubmit={handleSubmit(handleCreateToken())}>
        <TextField fieldName={"userId"} label={"Test User Id"} />

        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Token"}
        </button>

        <button
          onClick={() => navigate("/")}
          type="button"
          className={`ml-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-700 transition duration-300 ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={isLoading}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}
