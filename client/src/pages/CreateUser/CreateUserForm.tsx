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
import { SubmitButton } from "../../components/SubmitButton"
import { CancelButton } from "../../components/CancelButton"
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
        console.log(error)

        toastr.error(error.data.error)
      })
  }

  const handleCancel = () => navigate("/users")

  useEffect(() => {
    fetchPositions(null)
      .unwrap()
      .then((data) => {
        dispatch(setPositions(data))
      })
      .catch((error) => {
        toastr.error(error.data.error)
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

      <SubmitButton
        isLoading={isLoading}
        type={"submit"}
        title={isLoading ? "Creating..." : "Create User"}
      />
      <CancelButton
        isLoading={isLoading}
        onClick={handleCancel}
        title={"Cancel"}
      />
    </form>
  )
}
