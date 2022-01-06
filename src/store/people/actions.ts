import type * as T from './types'
import * as D from '../../data'

export const addAction = (payload: D.IPerson): T.AddAction => ({
  type: '@person/add',
  payload
})
export const deleteAction = (id: string): T.DeleteAction => ({
  type: '@person/delete',
  payload: {id}
})
export const deleteAllAction = (): T.DeleteAllAction => ({
  type: '@person/deleteAll'
})
