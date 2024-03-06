import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux"

import { UserSlice } from "./user/userSlice.ts"
import { usersAPI } from "../services/user"
import { positionsAPI } from "../services/position"
import { PositionSlice } from "./position/positionSlice.ts"
import { tokenAPI } from "../services/token"
import { TokenSlice } from "./token/tokenSlice.ts"

const rootReducer = combineReducers({
  [UserSlice.name]: UserSlice.reducer,
  [PositionSlice.name]: PositionSlice.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [positionsAPI.reducerPath]: positionsAPI.reducer,
  [tokenAPI.reducerPath]: tokenAPI.reducer,
  [TokenSlice.reducerPath]: TokenSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      usersAPI.middleware,
      positionsAPI.middleware,
      tokenAPI.middleware,
    ]),
})

export type RootState = ReturnType<typeof store.getState>
export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector
