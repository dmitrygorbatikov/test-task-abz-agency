import { createSlice } from "@reduxjs/toolkit"
import { IUsersInitialState } from "./types.ts"
import { createUserFormData } from "./data.ts"

const initialState: IUsersInitialState = {
  users: [],
  query: {},
  totalCount: 0,
  createUserForm: createUserFormData,
}

export const UserSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.users
      state.query = action.payload.query
      state.totalCount = action.payload.totalCount
    },
    setDetailUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setUsers, setDetailUser } = UserSlice.actions
