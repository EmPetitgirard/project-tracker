import { useDispatch } from 'react-redux'
import * as confirmActions from '../../features/confirm'

let resolveCallback

function useConfirm() {
  const dispatch = useDispatch()

  const onConfirm = () => {
    dispatch(confirmActions.hide('', ''))
    resolveCallback(true)
  }

  const onCancel = () => {
    dispatch(confirmActions.hide('', ''))
    resolveCallback(false)
  }
  const confirm = (title, message) => {
    dispatch(confirmActions.show(title, message))
    return new Promise((res, rej) => {
      resolveCallback = res
    })
  }

  return { confirm, onConfirm, onCancel }
}

export default useConfirm
