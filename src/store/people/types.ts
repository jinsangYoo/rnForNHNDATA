import type {Action} from 'redux'
import * as D from '../../data'

export type State = D.IPerson[]

export type AddAction = Action<'@person/add'> & {
  payload: D.IPerson
}
export type DeleteAction = Action<'@person/delete'> & {
  payload: {id: string}
}
export type DeleteAllAction = Action<'@person/deleteAll'>

export type Actions = AddAction | DeleteAction | DeleteAllAction
