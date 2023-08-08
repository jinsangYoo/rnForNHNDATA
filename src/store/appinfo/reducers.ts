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
        return {...state, isLoaded: action.isSuccess}
      }
      return {...state, ...action.appInfo, isLoaded: action.isSuccess}
    case 'loadAppInfo':
      if (!action.isSuccess) {
        return {...state, isLoaded: action.isSuccess}
      }
      return {...state, ...action.appInfo, isLoaded: action.isSuccess}
    case 'deleteAppInfo':
      return initialAppInfo
  }
  return state
}
export const reducer = combineReducers({
  appInfo: appInfoReducer,
})
