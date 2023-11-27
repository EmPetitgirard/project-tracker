export const selectTickets = (state) => state.tickets

const voidTicket = { status: 'void' }

export const selectTicket = (ticketId) => (state) => {
  return state.ticket[ticketId] ?? voidTicket
}

export const selectCreation = (state) => state.creation

export const selectModification = (state) => state.modification

export const selectSuppression = (state) => state.suppression

export const selectCategories = (state) => state.categories

export const selectNavigationSwitch = (state) => state.navigationSwitch

export const selectCategorySuppression = (state) => state.categorySuppression

export const selectCategoryCreation = (state) => state.categoryCreation

const voidCategory = { status: 'void' }

export const selectCategory = (categoryId) => (state) => {
  return state.category[categoryId] ?? voidCategory
}

export const selectCategoryModification = (state) => state.categoryModification

export const selectConfirm = (state) => state.confirm
