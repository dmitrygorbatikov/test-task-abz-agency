import { createApi } from "@reduxjs/toolkit/query/react"

import { baseQuery } from "../baseQuery.ts"
import { IPosition } from "./types.ts"

export const positionsAPI = createApi({
  reducerPath: "positionsAPI",
  baseQuery,
  endpoints: (build) => ({
    fetchPositions: build.query<IPosition[], null>({
      query: () => ({
        url: `/position`,
        method: "GET",
      }),
    }),
  }),
})
