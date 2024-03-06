export interface IGetUsersRequest {
  q?: string
  sortBy?: string
  sortItem?: string
  page?: string
  perPage?: string
}

export interface IGetUsersResponse {
  users: IUser[]
  totalCount: number
  page: number
  perPage: number
}

export interface IGetUserByIdRequest {
  userId: number
}

export interface IGetUserByIdResponse {
  user: IUser
}

export interface IUser {
  id: number
  created_at: string
  updated_at: string
  name: string
  email: string
  phone: string
  position_name: string
  position_id: number
  photo: string
}

export interface ICreateUserRequest {
  name: string
  email: string
  phone: string
  position_id: number
  photo: string
}
