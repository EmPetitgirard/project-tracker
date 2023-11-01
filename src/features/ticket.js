import { createSlice } from '@reduxjs/toolkit'
import { selectTicket } from '../utils/selector'

// le state initial de cette feature est un objet vide
const initialState = {
  // chaque propriété de cet objet correspond à l'Id d'un freelance
  // 3: { status: 'void' }
}

export function fetchOrUpdateTicket(ticketId) {
  return async (dispatch, getState) => {
    const selectTicketById = selectTicket(ticketId)
    const status = selectTicketById(getState()).status
    if (status === 'pending' || status === 'updating') {
      // on stop la fonction pour éviter de récupérer plusieurs fois la même donnée
      return
    }
    dispatch(actions.fetching(ticketId))
    try {
      const response = await fetch(`http://localhost:5050/record/${ticketId}`)
      const data = await response.json()
      dispatch(actions.resolved(ticketId, data))
    } catch (error) {
      dispatch(actions.rejected(ticketId, error))
    }
  }
}

function setVoidIfUndefined(draft, ticketId) {
  if (draft[ticketId] === undefined) {
    draft[ticketId] = { status: 'void' }
  }
}

const { actions, reducer } = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    fetching: {
      prepare: (ticketId) => ({
        payload: { ticketId },
      }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.ticketId)
        if (draft[action.payload.ticketId].status === 'void') {
          draft[action.payload.ticketId].status = 'pending'
          return
        }
        if (draft[action.payload.ticketId].status === 'rejected') {
          draft[action.payload.ticketId].error = null
          draft[action.payload.ticketId].status = 'pending'
          return
        }
        if (draft[action.payload.ticketId].status === 'resolved') {
          draft[action.payload.ticketId].status = 'updating'
          return
        }
      },
    },
    resolved: {
      // prepare permet de modifier le payload
      prepare: (ticketId, data) => ({
        payload: { ticketId, data },
      }),
      // la fonction de reducer
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.ticketId)
        if (
          draft[action.payload.ticketId].status === 'pending' ||
          draft[action.payload.ticketId].status === 'updating'
        ) {
          draft[action.payload.ticketId].data = action.payload.data
          draft[action.payload.ticketId].status = 'resolved'
          return
        }
        return
      },
    },
    rejected: {
      prepare: (ticketId, error) => ({
        payload: { ticketId, error },
      }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.ticketId)
        if (
          draft[action.payload.ticketId].status === 'pending' ||
          draft[action.payload.ticketId].status === 'updating'
        ) {
          draft[action.payload.ticketId].error = action.payload.error
          draft[action.payload.ticketId].data = null
          draft[action.payload.ticketId].status = 'rejected'
          return
        }
        return
      },
    },
  },
})

export default reducer
