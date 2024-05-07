import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GameState } from './models';
import { sendSocketMessageWithCallback } from '../../tools/socket-wrapper';

const initialState: GameState = {
  allCharacters: [],
  state: null
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getInitialState.fulfilled, (state: GameState, action: any) => {
      return action.payload;
    })
  }
})

// export const { getInitialState } = generalSlice.actions

export default generalSlice.reducer




// async reducers
export const getInitialState = createAsyncThunk(
  'getInitialState',
  async () => await sendSocketMessageWithCallback('getGameState', '')
)