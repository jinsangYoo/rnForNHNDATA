import {combineReducers} from 'redux'
import * as T from './types'

const initialAppInfo: T.AppInfo = {
  version: '',
  gcode: '',
  disableToCollectAdvertisingIdentifier: false,
  debug: true,
  enablePrivacyPolicy: false,
  isLoaded: false,
}
const appInfoReducer = (state = initialAppInfo, action: T.Actions) => {
  switch (action.type) {
    case 'saveAppInfo':
      if (!action.isSuccess) {
        console.log(
          `appInfoReducer::saveAppInfo::isSuccess: ${action.isSuccess}`,
        )
        return {...state, isLoaded: action.isSuccess}
      }
      return {...state, ...action.appinformaion, isLoaded: action.isSuccess}
    case 'loadAppInfo':
      if (!action.isSuccess) {
        console.log(
          `appInfoReducer::saveAppInfo::loadAppInfo: ${action.isSuccess}`,
        )
        return {...state, isLoaded: action.isSuccess}
      }
      return {...state, ...action.appinformaion, isLoaded: action.isSuccess}
    case 'deleteAppInfo':
      return initialAppInfo
  }
  return state
}
export const reducer = combineReducers({
  appinformaion: appInfoReducer,
})
