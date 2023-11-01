import { createSlice } from '@reduxjs/toolkit'

const navigationSlice = createSlice({
  name: 'navigationSwitch',
  initialState: 'tickets',
  reducers: {
    toggle: (state) => {
      return state === 'tickets' ? 'categories' : 'tickets'
    },
    set: (state, action) => {
      return action.payload
    },
  },
})

// on extrait les actions et le reducer
const { actions, reducer } = navigationSlice
// on export chaque action individuellement
export const { set, toggle } = actions
// on export le reducer comme default export
export default reducer
