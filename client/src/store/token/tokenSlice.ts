import { createSlice } from "@reduxjs/toolkit"
import { ITokenInitialState } from "./types.ts"
import { createTokenFormData } from "./data.ts"

const initialState: ITokenInitialState = {
  tokens: [],
  query: {
    page: 1,
    perPage: 20,
  },
  tokenFormData: createTokenFormData,
}

export const TokenSlice = createSlice({
  initialState,
  name: "token",
  reducers: {
    setTokens: (state, action) => {
      state.tokens = action.payload.tokens
    },
    setQuery: (state, action) => {
      state.query = action.payload
    },
    setDetailToken: (state, action) => {
      state.token = action.payload
    },
  },
})

export const { setTokens, setQuery, setDetailToken } = TokenSlice.actions
