import type * as T from './types'

export const setTimeAction = (time: Date = new Date()): T.SetTimeAction => ({
  type: '@clock/setTime',
  currentDate: time.toLocaleDateString(),
  currentTime: time.toLocaleTimeString()
})
