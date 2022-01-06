import type {State, Actions} from './types'
const initialState: State = {currentDate: '', currentTime: ''}
export const reducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case '@clock/setTime':
      return {currentDate: action.currentDate, currentTime: action.currentTime}
  }
  return state
}
