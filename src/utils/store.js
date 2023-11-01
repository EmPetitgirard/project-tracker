import ticketsReducer from '../features/tickets'
import ticketReducer from '../features/ticket'
import creationReducer from '../features/creation'
import modificationReducer from '../features/modification'
import suppressionReducer from '../features/suppression'
import categoriesReducer from '../features/categories'
import navigationSwitchReducer from '../features/navigationSwitch'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    tickets: ticketsReducer,
    ticket: ticketReducer,
    creation: creationReducer,
    modification: modificationReducer,
    suppression: suppressionReducer,
    categories: categoriesReducer,
    navigationSwitch: navigationSwitchReducer,
  },
})
