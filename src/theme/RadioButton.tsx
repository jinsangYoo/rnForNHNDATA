import React, {useState} from 'react'
import type {FC, ComponentProps} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import {useTheme} from '@react-navigation/native'

export type RadioButtonProps = ComponentProps<typeof View> & {
  onPress: (value: string) => void
  defaultValue?: string
  valueAtZeroIndex?: string
  data?: {value: string}[]
}

export const RadioButton: FC<RadioButtonProps> = ({
  defaultValue,
  valueAtZeroIndex,
  data = [],
  onPress,
  style,
  ...props
}) => {
  const {colors} = useTheme()
  const [userOption, setUserOption] = useState<string>(
    defaultValue ? defaultValue : '',
  )
  const selectHandler = (value: string) => {
    onPress(value)
    setUserOption(value)
  }
  return (
    <View style={[style]} {...props}>
      {data.map((item, index) => {
        return (
          <Pressable
            style={
              item.value === userOption ? styles.selected : styles.unselected
            }
            onPress={() => selectHandler(item.value)}>
            <Text
              style={[
                styles.option,
                {
                  color:
                    item.value === userOption
                      ? colors.text
                      : 'rgba(204, 204, 204, 1.0)',
                },
              ]}>
              {' '}
              {valueAtZeroIndex && index == 0 ? valueAtZeroIndex : item.value}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  option: {
    fontSize: 20,
    textAlign: 'center',
  },
  unselected: {
    backgroundColor: 'rgba(255, 99, 99, 1.0)',
    margin: 5,
  },
  selected: {
    backgroundColor: 'rgba(30, 109, 173, 1.0)',
    margin: 6,
    padding: 10,
    borderRadius: 10,
  },
})
