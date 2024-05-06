import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import mapSlice from './slices/map.slice'
import characterSlice from './slices/character.slice'
import locationsSlice from './slices/locations.slice'

export const store = configureStore({
  reducer: {
    character: characterSlice,
    map: mapSlice,
    locations: locationsSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()