import type {Action} from 'redux'

export type User = {
  acesession: string
  id: string
  password: string
}
export type State = {
  loggedIn: boolean
  loggedUser: User
}

export type LogoutAction = Action<'logout'>
export type LoginAction = Action<'login'> & {
  loggedUser: User
}
export type Actions = LogoutAction | LoginAction
