import { render as rtlRender } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ticketsReducer from '../../features/tickets'
import ticketReducer from '../../features/ticket'
import creationReducer from '../../features/creation'
import modificationReducer from '../../features/modification'
import suppressionReducer from '../../features/suppression'
import categoriesReducer from '../../features/categories'
import categoryReducer from '../../features/category'
import categoryCreationReducer from '../../features/categoryCreation'
import categoryModificationReducer from '../../features/categoryModification'
import categorySuppressionReducer from '../../features/categorySuppression'
import navigationSwitchReducer from '../../features/navigationSwitch'
import confirmReducer from '../../features/confirm'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

export function render(ui, options) {
  const store = configureStore({
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
      confirm: confirmReducer,
    },
  })

  function Wrapper({ children }) {
    return (
      <MemoryRouter {...options}>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    )
  }
  rtlRender(ui, { wrapper: Wrapper })
}
