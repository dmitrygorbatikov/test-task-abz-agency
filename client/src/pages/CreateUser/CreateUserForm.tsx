import { FC, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { CreateUserValues } from "./schema/create-user.schema.ts"
import { useDispatch } from "react-redux"
import { usersAPI } from "../../services/user"
import { positionsAPI } from "../../services/position"
import { useStoreSelector } from "../../store"
import { useNavigate } from "react-router-dom"
import { setPositions } from "../../store/position/positionSlice.ts"
import { TextField } from "./components/TextField.tsx"
import { SelectField } from "./components/SelectField.tsx"
import { ImageField } from "./components/ImageField.tsx"
import toastr from "toastr"
export const CreateUserForm: FC = () => {
  const dispatch = useDispatch()
  const [createUser] = usersAPI.useCreateUserMutation()
  const [fetchPositions, { isLoading }] =
    positionsAPI.useLazyFetchPositionsQuery()
  const { positions } = useStoreSelector((state) => state.position)
  const navigate = useNavigate()

  const { handleSubmit, getValues, watch } = useFormContext<CreateUserValues>()
  const handleCreateUser = () => () => {
    const body = {
      ...getValues(),
      position_id: Number(getValues().position_id),
    }
    createUser(body)
      .unwrap()
      .then(() => {
        navigate("/users?sortBy=desc&sortItem=created_at")
      })
      .catch((error) => {
        toastr.error(error.data.error)
      })
  }

  useEffect(() => {
    fetchPositions(null).then(({ data }) => {
      dispatch(setPositions(data))
    })
  }, [])

  watch()
  return (
    <form onSubmit={handleSubmit(handleCreateUser())}>
      <TextField fieldName="name" label="Name" />
      <TextField fieldName="email" label="Email" />
      <TextField fieldName="phone" label="Phone" />
      <SelectField
        fieldName="position_id"
        label="Position"
        options={positions.map((item) => ({
          value: item.id.toString(),
          label: item.name,
        }))}
      />
      <ImageField fieldName="photo" label="Photo" />

      <button
        type="submit"
        className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300 ${
          isLoading ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Post"}
      </button>

      <button
        onClick={() => navigate("/users")}
        type="button"
        className={`ml-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-700 transition duration-300 ${
          isLoading ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={isLoading}
      >
        Cancel
      </button>
    </form>
  )
}
