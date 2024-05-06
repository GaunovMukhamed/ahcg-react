import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface LocationsState {
  showTavern: boolean;
}

const initialState: LocationsState = {
  showTavern: false,
}

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    showTavern: () => {
      const newState: LocationsState = {...initialState};
      newState.showTavern = true;
      return newState;
    },
    closeLocation: () => {
      return initialState;
    }
  },
})

export const {
  showTavern,
  closeLocation
} = locationsSlice.actions

export default locationsSlice.reducer