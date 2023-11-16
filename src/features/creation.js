import { createSlice } from '@reduxjs/toolkit'
import { selectCreation } from '../utils/selector'
import Userfront from '@userfront/toolkit/react'

// Le state initial de la feature creation
const initialState = {
  // le statut permet de suivre l'état de la requête
  status: 'void',
  // les données lorsque la requête a fonctionné
  data: null,
  // l'erreur lorsque la requête échoue
  error: null,
}

export function resetCreation(dispatch, getState) {
  const status = selectCreation(getState()).status
  if (status !== 'void') dispatch(actions.reset())
}

export function createTicket(newTicket) {
  return async (dispatch, getState) => {
    const status = selectCreation(getState()).status
    if (status === 'pending' || status === 'updating') {
      // on stop la fonction pour éviter de créer plusieurs fois la même donnée
      return
    }
    dispatch(actions.creating())
    try {
      const response = await fetch('http://localhost:5050/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Userfront.accessToken()}`,
        },
        body: JSON.stringify(newTicket),
      })
      const data = await response.json()
      dispatch(actions.resolved(data))
    } catch (error) {
      dispatch(actions.rejected(error))
    }
  }
}

const { actions, reducer } = createSlice({
  name: 'creation',
  initialState,
  reducers: {
    reset: (draft) => {
      draft.status = 'void'
      return
    },
    // creating action & reducer
    creating: (draft) => {
      if (draft.status === 'void') {
        // on passe en pending
        draft.status = 'pending'
        return
      }
      // si le statut est rejected
      if (draft.status === 'rejected') {
        // on supprime l'erreur et on passe en pending
        draft.error = null
        draft.status = 'pending'
        return
      }
      // si le statut est resolved
      if (draft.status === 'resolved') {
        // on passe en updating (requête en cours mais des données sont déjà présentent)
        draft.status = 'updating'
        return
      }
      // sinon l'action est ignorée
      return
    },
    // resolved action & reducer
    resolved: (draft, action) => {
      // si la requête est en cours
      if (draft.status === 'pending' || draft.status === 'updating') {
        // on passe en resolved et on sauvegarde les données
        draft.data = action.payload
        draft.status = 'resolved'
        return
      }
      // sinon l'action est ignorée
      return
    },
    // rejected action & reducer
    rejected: (draft, action) => {
      // si la requête est en cours
      if (draft.status === 'pending' || draft.status === 'updating') {
        // on passe en rejected, on sauvegarde l'erreur et on supprime les données
        draft.status = 'rejected'
        draft.error = action.payload
        draft.data = null
        return
      }
      // sinon l'action est ignorée
      return
    },
  },
})

export default reducer
