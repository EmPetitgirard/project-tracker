import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  show: false,
  title: '',
  message: '',
}

const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    show: {
      prepare: (title, message) => ({
        payload: { title, message },
      }),
      reducer: (state, action) => {
        return {
          show: true,
          title: action.payload.title,
          message: action.payload.message,
        }
      },
    },
    hide: {
      prepare: (title, message) => ({
        payload: { title, message },
      }),
      reducer: (state, action) => {
        return initialState
      },
    },
  },
})

// on extrait les actions et le reducer
const { actions, reducer } = confirmSlice
// on export chaque action individuellement
export const { show, hide } = actions
// on export le reducer comme default export
export default reducer
