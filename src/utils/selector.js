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
