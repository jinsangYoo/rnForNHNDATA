import React, {useCallback} from 'react'
import {View} from 'react-native'

export const useRenderSeparator = (
  height: number = 1,
  width: string = '100%',
  backgroundColor: string = '#CED0CE',
  deps: any[] = [],
): (() => JSX.Element) => {
  return useCallback(() => {
    return (
      <View
        style={{
          height: height,
          width: width,
          backgroundColor: backgroundColor,
        }}
      />
    )
  }, deps)
}
