import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import { MapObject } from '../../pages/game-page/general-map/map.interfaces';

interface MapState {
  mapObjects: MapObject[]
}

const initialState: MapState = {
  mapObjects: [],
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMapObjects: (state, action: PayloadAction<MapObject[]>) => {
      state.mapObjects = action.payload;
    }
  },
})

export const { setMapObjects } = mapSlice.actions

export const getMapObjects = (state: RootState) => state.map.mapObjects

export default mapSlice.reducer