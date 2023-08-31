import {combineReducers} from 'redux'
import * as T from './types'

const initialAppInfo: T.AppInfo = {
  version: '',
  gcode: '',
  disableToCollectAdvertisingIdentifier: false,
  debug: true,
  enablePrivacyPolicy: false,
  isLoaded: false,
  actionType: 'init',
}
const appInfoReducer = (state = initialAppInfo, action: T.Actions) => {
  // console.log(`appInfoReducer::action.type: ${action.type}`)
  // console.log(`appInfoReducer::state: ${JSON.stringify(state, null, 2)}`)
  switch (action.type) {
    case 'saveAppInfo':
      if (!action.isSuccess) {
        console.log(
          `appInfoReducer::saveAppInfo::isSuccess: ${action.isSuccess}`,
        )
        return {...state, isLoaded: action.isSuccess, actionType: action.type}
      }
      return {
        ...state,
        ...action.appinformaion,
        isLoaded: action.isSuccess,
        actionType: action.type,
      }
    case 'loadAppInfo':
      if (!action.isSuccess) {
        console.log(
          `appInfoReducer::loadAppInfo::isSuccess: ${action.isSuccess}`,
        )
        return {...state, isLoaded: action.isSuccess, actionType: action.type}
      }
      return {
        ...state,
        ...action.appinformaion,
        isLoaded: action.isSuccess,
        actionType: action.type,
      }
    case 'deleteAppInfo': {
      console.log('appInfoReducer::deleteAppInfo')
      return initialAppInfo
    }
  }
  return state
}
export const reducer = combineReducers({
  appinformaion: appInfoReducer,
})
