import type {Action} from 'redux'

export type State = number

export type IncreaseAction = Action<'@counter/increase'>
export type DecreaseAction = Action<'@counter/decrease'>

export type Actions = IncreaseAction | DecreaseAction
