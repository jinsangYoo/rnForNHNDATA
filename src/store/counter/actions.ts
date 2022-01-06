import type * as T from './types'

export const increaseAction = (): T.IncreaseAction => ({
  type: '@counter/increase'
})
export const decreaseAction = (): T.DecreaseAction => ({
  type: '@counter/decrease'
})
