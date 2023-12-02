import * as actions from './tickets'
import ticketsReducer from './tickets'

describe('Tickets reducer', () => {
  it('should return void intial state', () => {
    expect(ticketsReducer(undefined, { type: '@INIT' })).toEqual({
      data: null,
      error: null,
      status: 'void',
    })
  })

  it('should fetch tickets', () => {
    expect(
      ticketsReducer(
        { data: null, error: null, status: 'void' },
        actions.fetching(),
      ),
    ).toEqual({ data: null, error: null, status: 'pending' })
  })

  it('should resolved tickets', () => {
    const state = ticketsReducer(
      { data: null, error: null, status: 'pending' },
      actions.resolved({
        ticketsList: [],
      }),
    )
    expect(state.status).toBe('resolved')
  })

  it('should switch to updating when fetching on resolved', () => {
    const state = ticketsReducer(
      { data: [], error: null, status: 'resolved' },
      actions.fetching(),
    )
    expect(state.status).toBe('updating')
    expect(state.data).toEqual([])
  })

  it('should ignore rejected on resolved', () => {
    const state = ticketsReducer(
      { data: [], error: null, status: 'resolved' },
      actions.rejected('Oops'),
    )
    expect(state.status).toBe('resolved')
    expect(state.data).toEqual([])
  })
})
