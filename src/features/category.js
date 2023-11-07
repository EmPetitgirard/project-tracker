import { createSlice } from '@reduxjs/toolkit'
import { selectCategory } from '../utils/selector'

// le state initial de cette feature est un objet vide
const initialState = {
  // chaque propriété de cet objet correspond à l'Id d'un freelance
  // 3: { status: 'void' }
}

export function fetchOrUpdateCategory(categoryId) {
  return async (dispatch, getState) => {
    const selectCategoryById = selectCategory(categoryId)
    const status = selectCategoryById(getState()).status
    if (status === 'pending' || status === 'updating') {
      // on stop la fonction pour éviter de récupérer plusieurs fois la même donnée
      return
    }
    dispatch(actions.fetching(categoryId))
    try {
      const response = await fetch(
        `http://localhost:5050/category/${categoryId}`,
      )
      const data = await response.json()
      dispatch(actions.resolved(categoryId, data))
    } catch (error) {
      dispatch(actions.rejected(categoryId, error))
    }
  }
}

function setVoidIfUndefined(draft, categoryId) {
  if (draft[categoryId] === undefined) {
    draft[categoryId] = { status: 'void' }
  }
}

const { actions, reducer } = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetching: {
      prepare: (categoryId) => ({
        payload: { categoryId },
      }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.categoryId)
        if (draft[action.payload.categoryId].status === 'void') {
          draft[action.payload.categoryId].status = 'pending'
          return
        }
        if (draft[action.payload.categoryId].status === 'rejected') {
          draft[action.payload.categoryId].error = null
          draft[action.payload.categoryId].status = 'pending'
          return
        }
        if (draft[action.payload.categoryId].status === 'resolved') {
          draft[action.payload.categoryId].status = 'updating'
          return
        }
      },
    },
    resolved: {
      // prepare permet de modifier le payload
      prepare: (categoryId, data) => ({
        payload: { categoryId, data },
      }),
      // la fonction de reducer
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.categoryId)
        if (
          draft[action.payload.categoryId].status === 'pending' ||
          draft[action.payload.categoryId].status === 'updating'
        ) {
          draft[action.payload.categoryId].data = action.payload.data
          draft[action.payload.categoryId].status = 'resolved'
          return
        }
        return
      },
    },
    rejected: {
      prepare: (categoryId, error) => ({
        payload: { categoryId, error },
      }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.categoryId)
        if (
          draft[action.payload.categoryId].status === 'pending' ||
          draft[action.payload.categoryId].status === 'updating'
        ) {
          draft[action.payload.categoryId].error = action.payload.error
          draft[action.payload.categoryId].data = null
          draft[action.payload.categoryId].status = 'rejected'
          return
        }
        return
      },
    },
  },
})

export default reducer
