import React, {useState} from 'react'
import type {FC} from 'react'
import {Colors} from 'react-native-paper'
// prettier-ignore
import {View, Text, UnderlineText, TouchableView,
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
      <TouchableView style={[styles.topView]}>
        <Avatar
          imageStyle={[styles.avatar]}
          uri={api.avatar}
          size={50}
          onPress={onPressed}
        />
      </TouchableView>
      <View style={[styles.bottomView]}>
        <Text style={[styles.name]}>{api.name}</Text>
        <UnderlineText
          numberOfLines={3}
          ellipsizeMode="tail"
          style={[styles.text, styles.remark]}>
          구현:{api.isEnable.toString()}
        </UnderlineText>
      </View>
    </TouchableView>
  )
}
export default GridCell
