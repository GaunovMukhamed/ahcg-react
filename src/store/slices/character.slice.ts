import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import { Character } from '../../models';

const initialState: Character = {
  login: '',
  name: '',
  level: 1,
  tags: [],
  location: '',
  stats: {
    strength: 1,
    agility: 1,
    intelligence: 1,
    charisma: 1
  },
  hp: 1,
  maxHp: 1,
  mana: 1,
  maxMana: 1,
  xp: 0,
  xpMax: 0,
  gold: 0,
  inventorySize: 1,
  items: []
}

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacterStats: (state, action: PayloadAction<Character>) => {
      return action.payload;
    },
  }
})

export const { setCharacterStats } = characterSlice.actions

export const getCharacterStats = (state: RootState) => state.map.mapObjects

export default characterSlice.reducer