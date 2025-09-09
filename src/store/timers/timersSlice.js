import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  timersCount: 100,
  newTimersCount: 50,
  isTimersEnabled: true
}

const timersSlice = createSlice({
  name: 'timers',
  initialState,
  reducers: {
    addTimers: (state) => {
      state.timersCount += state.newTimersCount
    },
    removeTimers: (state) => {
      state.timersCount = Math.max(state.timersCount - state.newTimersCount, 0)
    },
    setNewTimersCount: (state, action) => {
      state.newTimersCount = action.payload
    },
    toggleTimersEnabled: (state) => {
      state.isTimersEnabled = !state.isTimersEnabled
    },
    setTimersEnabled: (state, action) => {
      state.isTimersEnabled = action.payload
    }
  }
})

// Экспорт действий
export const {
  addTimers,
  removeTimers,
  setNewTimersCount,
  toggleTimersEnabled,
  setTimersEnabled
} = timersSlice.actions

// Селекторы
export const selectTimersCount = (state) => state.timers.timersCount
export const selectNewTimersCount = (state) => state.timers.newTimersCount
export const selectIsTimersEnabled = (state) => state.timers.isTimersEnabled

// Экспорт редьюсера
export default timersSlice.reducer
