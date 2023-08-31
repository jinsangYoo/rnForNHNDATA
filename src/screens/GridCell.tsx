import React, {useState} from 'react'
import type {FC} from 'react'
import {Colors} from 'react-native-paper'
// prettier-ignore
import {View, Text, UnderlineText, TouchableViewForFullWidth as TouchableView} from '../theme/navigation'
import * as D from '../data'
import {Avatar} from '../components'
import {styles} from './GridCell.style'

export type GridCellProps = {
  api: D.IAPI
  onPressed: () => void
}

const GridCell: FC<GridCellProps> = ({api: initialApi, onPressed}) => {
  const [api, setApi] = useState<D.IAPI>(initialApi)
  return (
    <TouchableView style={[styles.view]} onPress={onPressed}>
      <View
        style={[
          styles.leftView,
          {
            backgroundColor:
              api.node.isEnable == true
                ? 'rgba(99, 255, 99, 1.0)'
                : 'rgba(255, 99, 99, 1.0)',
          },
        ]}>
        <Avatar
          imageStyle={[styles.avatar]}
          uri={api.avatar}
          size={50}
          onPress={onPressed}
        />
      </View>
      <View
        style={[
          styles.rightView,
          {
            backgroundColor:
              api.node.isEnable == true
                ? 'rgba(99, 255, 99, 1.0)'
                : 'rgba(255, 99, 99, 1.0)',
          },
        ]}>
        <Text
          style={[
            styles.name,
            {
              color:
                api.node.isEnable == true
                  ? 'rgba(99, 99, 99, 1.0)'
                  : 'rgba(200, 200, 200, 1.0)',
            },
          ]}>
          {api.node.displayName}
        </Text>
        <UnderlineText
          ellipsizeMode="tail"
          style={[
            styles.text,
            styles.remark,
            {
              color:
                api.node.isEnable == true
                  ? 'rgba(99, 99, 99, 1.0)'
                  : 'rgba(200, 200, 200, 1.0)',
            },
          ]}>
          {api.node.isEnable == true ? '사용 가능' : '사용 불가능'}
        </UnderlineText>
      </View>
    </TouchableView>
  )
}
export default GridCell
