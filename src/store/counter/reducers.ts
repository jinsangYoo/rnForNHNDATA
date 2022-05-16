import * as T from './types'

const initialState: T.State = 0

export const reducer = (state: T.State = initialState, action: T.Actions) => {
  switch (action.type) {
    case '@counter/increase':
      return state + 1
    case '@counter/decrease':
      return state - 1
  }
  return state
}
