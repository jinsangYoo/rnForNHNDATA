import type {Action} from 'redux'

export type State = {
  currentDate: string
  currentTime: string
}

export type SetTimeAction = Action<'@clock/setTime'> & State

export type Actions = SetTimeAction
