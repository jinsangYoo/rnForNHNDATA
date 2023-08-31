// 초기 모습
/*
import type * as T from './types'
*/
// 최종 모습
import type {Dispatch} from 'redux'
import type * as T from './types'

export const setHumorText = (humorText: string): T.SetHumorTextAction => ({
  type: '@humor/setHumor',
  humorText
})
export const setErrorMessage = (
  errorMessage: string
): T.SetErrorMessageAction => ({
  type: '@humor/setErrorMessage',
  errorMessage
})
export const setLoading = (loading: boolean): T.SetloadingAction => ({
  type: '@humor/setLoading',
  loading
})

export const requestHumor = () => (dispatch: Dispatch) => {
  dispatch(setHumorText(''))
  dispatch(setErrorMessage(''))
  dispatch(setLoading(true))
  fetch('https://api.chucknorris.io/jokes/random')
    .then(res => res.json())
    .then(result => {
      dispatch(setHumorText(result.value))
      dispatch(setLoading(false))
    })
    .catch(e => {
      dispatch(setErrorMessage(e.message))
      dispatch(setLoading(false))
    })
}
