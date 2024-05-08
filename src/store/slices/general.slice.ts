import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Character, CharacterSelectionInfo, GameState } from './models';
import { sendSocketMessageWithCallback } from '../../tools/socket-wrapper';

const initialState: GameState = {
  allCharacters: [],
  gameState: 0,
  players: {}
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    selectCharacter: (state, action: PayloadAction<CharacterSelectionInfo>) => {
      state.players = {
        ...state.players,
        [action.payload.login]: {
          character: state.allCharacters.find((ch: Character) => ch.id === action.payload.newChId)!,
          ready: false,
          isHost: false
        }
      }
    },
    updateState: (state, action: PayloadAction<GameState>) => {
      return action.payload;
    }
  },
  extraReducers: (builder: any) => {
    builder.addCase(getInitialState.fulfilled, (state: GameState, action: PayloadAction<GameState>) => {
      return action.payload;
    })
  }
})

export const { updateState, selectCharacter } = generalSlice.actions

export default generalSlice.reducer




// async reducers
export const getInitialState = createAsyncThunk(
  'getInitialState',
  async () => await sendSocketMessageWithCallback('getGameState', '')
)