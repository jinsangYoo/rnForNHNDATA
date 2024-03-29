import type {Dispatch} from 'redux'
import * as U from '../../utils'
import type * as T from './types'

export const loggedUserKey = 'loggedUser'
export const loginAction = (loggedUser: T.User): T.LoginAction => ({
  type: 'login',
  loggedUser,
})
export const loginWithSaveAction =
  (loggedUser: T.User) => (dispatch: Dispatch) => {
    U.writeToStorage(loggedUserKey, JSON.stringify(loggedUser))
      .then(() => {
        dispatch(loginAction(loggedUser))
      })
      .catch(e => {
        dispatch(loginAction(loggedUser))
      })
  }
export const logoutAction = (): T.LogoutAction => ({
  type: 'logout',
})

export const signUpAction = (loggedUser: T.User) => (dispatch: Dispatch) => {
  // 서버에서 회원 가입을 성공적으로 했다고 가정합니다.
  U.writeToStorage(loggedUserKey, JSON.stringify(loggedUser))
    .then(() => {
      dispatch(loginAction(loggedUser))
    })
    .catch(e => {
      dispatch(loginAction(loggedUser))
    })
}
