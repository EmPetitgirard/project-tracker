import * as actions from './confirm'
import confirmReducer from './confirm'

describe('Confirm reducer', () => {
  it('should return void intial state', () => {
    expect(confirmReducer(undefined, { type: '@INIT' })).toEqual({
      show: false,
      title: '',
      message: '',
    })
  })

  it('should return show state', () => {
    expect(
      confirmReducer(
        {
          show: false,
          title: '',
          message: '',
        },
        actions.show('MyTitle', 'MyMessage'),
      ),
    ).toEqual({
      show: true,
      title: 'MyTitle',
      message: 'MyMessage',
    })
  })

  it('should return hide state', () => {
    expect(
      confirmReducer(
        {
          show: true,
          title: 'MyTitle',
          message: 'MyMessage',
        },
        actions.hide('', ''),
      ),
    ).toEqual({
      show: false,
      title: '',
      message: '',
    })
  })

  it('should return state on invalid action', () => {
    expect(
      confirmReducer(
        {
          show: false,
          title: '',
          message: '',
        },
        { type: 'INVALID' },
      ),
    ).toEqual({
      show: false,
      title: '',
      message: '',
    })
  })
})
