import { IGetUsersRequest, IUser } from "../../services/user/types.ts"
import { CreateUserValues } from "../../pages/CreateUser/schema/create-user.schema.ts"

export interface IUsersInitialState {
  users: IUser[]
  query: IGetUsersRequest
  totalCount: number
  user?: IUser
  createUserForm: CreateUserValues
}
