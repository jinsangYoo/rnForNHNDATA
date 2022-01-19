import React, {useState} from 'react'
import type {FC} from 'react'
import {Colors} from 'react-native-paper'
// prettier-ignore
import {View, Text, UnderlineText, TouchableViewForFullWidth as TouchableView,
MaterialCommunityIcon as Icon} from '../theme/navigation'
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
    <TouchableView
      style={[styles.view, {backgroundColor: Colors.cyan100}]}
      onPress={onPressed}>
      <View style={[styles.leftView]}>
        <Avatar
          imageStyle={[styles.avatar]}
          uri={api.avatar}
          size={50}
          onPress={onPressed}
        />
      </View>
      <View style={[styles.rightView]}>
        <Text style={[styles.name]}>{api.node.type}</Text>
        <UnderlineText
          ellipsizeMode="tail"
          style={[styles.text, styles.remark]}>
          {api.node.isEnable == true ? '구현' : '미구현'}
        </UnderlineText>
      </View>
    </TouchableView>
  )
}
export default GridCell
