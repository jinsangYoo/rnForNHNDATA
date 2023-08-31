import type {State, Actions} from './types'

const initialState: State = []

export const reducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case '@person/add':
      return [...state, action.payload]
    case '@person/delete':
      return state.filter(person => person.id !== action.payload.id)
    case '@person/deleteAll':
      return initialState
  }
  return state
}
