import type {Dispatch} from 'redux'
import * as U from '../../utils'
import type * as T from './types'

export const appInfoForSaveKey = 'appInfoForSaveKey'
export const saveAction = (
  isSuccess: boolean,
  appinformaion: T.AppInfo,
): T.SaveAppInfoAction => ({
  type: 'saveAppInfo',
  isSuccess,
  appinformaion,
})
export const appInfoWithSaveAction =
  (appinformaion: T.AppInfo) => (dispatch: Dispatch) => {
    console.log(
      `appInfoWithSaveAction::appinformaion: ${JSON.stringify(
        appinformaion,
        null,
        2,
      )}`,
    )
    U.writeToStorage(appInfoForSaveKey, JSON.stringify(appinformaion))
      .then(() => {
        dispatch(saveAction(true, appinformaion))
      })
      .catch(e => {
        console.error(e)
        dispatch(saveAction(false, appinformaion))
      })
  }
export const deleteAction = (): T.DeleteAppInfoAction => ({
  type: 'deleteAppInfo',
})
export const loadAction = (
  isSuccess: boolean,
  appinformaion: T.AppInfo,
): T.LoadAppInfoAction => ({
  type: 'loadAppInfo',
  isSuccess,
  appinformaion,
})
export const appInfoWithLoadAction = () => (dispatch: Dispatch) => {
  U.readFromStorage(appInfoForSaveKey)
    .then(value => {
      const storedAppInfo = JSON.parse(value)
      console.log(
        `appInfoWithLoadAction::storedAppInfo: ${JSON.stringify(
          storedAppInfo,
          null,
          2,
        )}`,
      )
      dispatch(loadAction(true, storedAppInfo))
    })
    .catch(e => {
      console.info('Fail: appInfo read from storage.')
      console.info(e)
      dispatch(
        loadAction(false, {
          version: '',
          gcode: '',
          disableToCollectAdvertisingIdentifier: false,
          debug: true,
          enablePrivacyPolicy: false,
          isLoaded: false,
          actionType: 'init',
        }),
      )
    })
}
