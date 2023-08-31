// 초기 모습
/*
import type {Action} from 'redux'

export type State = any

export type Actions = Action
*/
// 최종 모습
import type {Action} from 'redux'

export type State = {
  humorText: string
  errorMessage: string
  loading: boolean
}

export type SetHumorTextAction = Action<'@humor/setHumor'> & {
  humorText: string
}
export type SetErrorMessageAction = Action<'@humor/setErrorMessage'> & {
  errorMessage: string
}
export type SetloadingAction = Action<'@humor/setLoading'> & {
  loading: boolean
}
export type Actions =
  | SetHumorTextAction
  | SetErrorMessageAction
  | SetloadingAction
