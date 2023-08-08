import type {Dispatch} from 'redux'
import * as U from '../../utils'
import type * as T from './types'

export const appInfoForSaveKey = 'appInfoForSaveKey'
export const saveAction = (
  isSuccess: boolean,
  appInfo: T.AppInfo,
): T.SaveAppInfoAction => ({
  type: 'saveAppInfo',
  isSuccess,
  appInfo,
})
export const appInfoWithSaveAction =
  (appInfo: T.AppInfo) => (dispatch: Dispatch) => {
    U.writeToStorage(appInfoForSaveKey, JSON.stringify(appInfo))
      .then(() => {
        dispatch(saveAction(true, appInfo))
      })
      .catch(e => {
        console.error(e)
        dispatch(saveAction(false, appInfo))
      })
  }
export const deleteAction = (): T.DeleteAppInfoAction => ({
  type: 'deleteAppInfo',
})
export const loadAction = (
  isSuccess: boolean,
  appInfo: T.AppInfo,
): T.LoadAppInfoAction => ({
  type: 'loadAppInfo',
  isSuccess,
  appInfo,
})
export const appInfoWithLoadAction = () => (dispatch: Dispatch) => {
  U.readFromStorage(appInfoForSaveKey)
    .then(value => {
      const storedAppInfo = JSON.parse(value)
      dispatch(loadAction(true, storedAppInfo))
    })
    .catch(e => {
      console.error(e)
      dispatch(
        loadAction(false, {
          version: '',
          gcode: '',
          disableToCollectAdvertisingIdentifier: false,
          debug: true,
          enablePrivacyPolicy: false,
          isLoaded: false,
        }),
      )
    })
}
