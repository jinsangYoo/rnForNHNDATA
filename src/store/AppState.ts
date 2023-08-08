import * as L from './login'
import * as C from './counter'
import * as CL from './clock'
import * as P from './people'
import * as H from './humor'
import * as AI from './appinfo'

export type AppState = {
  login: L.State
  counter: C.State
  clock: CL.State
  people: P.State
  humor: H.State
  appinfo: AI.State
}
