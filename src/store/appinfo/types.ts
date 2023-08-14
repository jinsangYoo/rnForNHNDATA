import type {Action} from 'redux'

export type AppInfo = {
  version: string
  gcode: string
  disableToCollectAdvertisingIdentifier: boolean
  debug: boolean
  enablePrivacyPolicy: boolean
  isLoaded: boolean
  actionType: string
}
export type State = {
  appinformaion: AppInfo
}

export type DeleteAppInfoAction = Action<'deleteAppInfo'>
export type LoadAppInfoAction = Action<'loadAppInfo'> & {
  isSuccess: boolean
  appinformaion: AppInfo
}
export type SaveAppInfoAction = Action<'saveAppInfo'> & {
  isSuccess: boolean
  appinformaion: AppInfo
}
export type Actions =
  | SaveAppInfoAction
  | LoadAppInfoAction
  | DeleteAppInfoAction
