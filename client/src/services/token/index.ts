import { createApi } from "@reduxjs/toolkit/query/react"

import { baseQuery } from "../baseQuery.ts"
import {
  IGetTokenByIdRequest,
  IGetTokenByIdResponse,
  IGetTokenListRequest,
  IToken,
  IVerifyTokenRequest,
} from "./types.ts"
import { generateQueryString } from "../../helpers/functions.ts"

export const tokenAPI = createApi({
  reducerPath: "tokenAPI",
  baseQuery,
  endpoints: (build) => ({
    fetchTokens: build.query<IGetTokenByIdResponse, IGetTokenListRequest>({
      query: (query) => ({
        url: `/token?${generateQueryString(query)}`,
        method: "GET",
      }),
    }),
    fetchTokenById: build.query<IToken, IGetTokenByIdRequest>({
      query: ({ id }) => ({
        url: `/token/${id}`,
        method: "GET",
      }),
    }),
    createToken: build.mutation<IToken, any>({
      query: (body) => ({
        url: `/token`,
        method: "POST",
        body,
      }),
    }),
    verifyToken: build.query<any, IVerifyTokenRequest>({
      query: ({ id }) => ({
        url: `/token/verify/${id}`,
        method: "GET",
      }),
    }),
  }),
})
