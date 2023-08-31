import React, {Dispatch, SetStateAction, useCallback, useState} from 'react'
import type {FC, ComponentProps} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import {useTheme} from '@react-navigation/native'

export type RadioButtonProps = ComponentProps<typeof View> & {
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
  data?: {value: string; valueForVisual: string}[]
}

export const RadioButton: FC<RadioButtonProps> = ({
  selected,
  setSelected,
  data = [],
  style,
  ...props
}) => {
  const {colors} = useTheme()
  const nowForKey = new Date()
  const itemPressed = useCallback(argSelect => {
    console.log(`argSelect: ${argSelect}, selected: ${selected}`)
    selected = argSelect
    setSelected(argSelect)
  }, [])
  return (
    <View style={[style]} {...props}>
      {data.map((item, index) => {
        return (
          <Pressable
            style={item.value == selected ? styles.selected : styles.unselected}
            onPress={() => itemPressed(item.value)}
            key={`${nowForKey.getMilliseconds()}-${item.value}-${index}`}>
            <Text
              style={[
                styles.option,
                {
                  color:
                    item.value == selected
                      ? colors.text
                      : 'rgba(204, 204, 204, 1.0)',
                },
              ]}>
              {item.valueForVisual}
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
