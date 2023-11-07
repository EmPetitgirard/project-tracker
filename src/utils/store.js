import ticketsReducer from '../features/tickets'
import ticketReducer from '../features/ticket'
import creationReducer from '../features/creation'
import modificationReducer from '../features/modification'
import suppressionReducer from '../features/suppression'
import categoriesReducer from '../features/categories'
import navigationSwitchReducer from '../features/navigationSwitch'
import categorySuppressionReducer from '../features/categorySuppression'
import categoryCreationReducer from '../features/categoryCreation'
import categoryReducer from '../features/category'
import categoryModificationReducer from '../features/categoryModification'
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
    categorySuppression: categorySuppressionReducer,
    categoryCreation: categoryCreationReducer,
    category: categoryReducer,
    categoryModification: categoryModificationReducer,
  },
})
