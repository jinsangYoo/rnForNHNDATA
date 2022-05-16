import React from 'react'
import type {FC} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import type {StyleProp, ViewStyle} from 'react-native'
import {View} from './View'
import type {ViewProps} from './View'

export type TouchableViewNonWidthProps = ViewProps & {
  onPress?: () => void
  touchableStyle?: StyleProp<ViewStyle>
}

export const TouchableViewNonWidth: FC<TouchableViewNonWidthProps> = ({
  children,
  onPress,
  touchableStyle,
  ...viewProps
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[touchableStyle]}>
      <View {...viewProps}>{children}</View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  touchable: {alignItems: 'center', justifyContent: 'center'},
})
