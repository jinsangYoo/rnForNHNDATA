import {combineReducers} from 'redux'
import * as L from './login'
import * as C from './counter'
import * as CL from './clock'
import * as P from './people'
import * as H from './humor'
import * as AI from './appinfo'

export const rootReducer = combineReducers({
  login: L.reducer,
  counter: C.reducer,
  clock: CL.reducer,
  people: P.reducer,
  humor: H.reducer,
  appinfo: AI.reducer,
})
