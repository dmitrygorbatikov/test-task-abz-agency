import { createApi } from "@reduxjs/toolkit/query/react"

import { baseQuery } from "../baseQuery.ts"
import { generateQueryString } from "../../helpers/functions.ts"
import {
  ICreateUserRequest,
  IGetUserByIdRequest,
  IGetUserByIdResponse,
  IGetUsersRequest,
  IGetUsersResponse,
  IUser,
} from "./types.ts"

export const usersAPI = createApi({
  reducerPath: "usersAPI",
  baseQuery,
  endpoints: (build) => ({
    fetchUsers: build.query<IGetUsersResponse, IGetUsersRequest>({
      query: (query) => ({
        url: `/user?${generateQueryString(query)}`,
        method: "GET",
      }),
    }),
    fetchUserById: build.query<IGetUserByIdResponse, IGetUserByIdRequest>({
      query: ({ userId }) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
    }),
    createUser: build.mutation<IUser, ICreateUserRequest>({
      query: (body) => ({
        url: `/user`,
        method: "POST",
        body,
      }),
    }),
  }),
})
