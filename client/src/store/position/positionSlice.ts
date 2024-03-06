import { createSlice } from "@reduxjs/toolkit"
import { IPositionsInitialState } from "./types.ts"

const initialState: IPositionsInitialState = {
  positions: [],
}

export const PositionSlice = createSlice({
  initialState,
  name: "position",
  reducers: {
    setPositions: (state, action) => {
      state.positions = action.payload
    },
  },
})

export const { setPositions } = PositionSlice.actions
