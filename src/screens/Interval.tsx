import React, {useLayoutEffect, useEffect, useCallback, useState} from 'react'
import {StyleSheet, View, Text, ScrollView, Platform} from 'react-native'
import {Colors} from 'react-native-paper'
import {Avatar} from '../components'
import * as D from '../data'
import {useInterval} from '../hooks'

import {getRandomIntInclusive} from '../../utils'
import {sendCommonWithPromise} from '../../acsdk'
import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus,
} from 'ace.sdk.react-native'

type IdAndAvatar = Pick<D.IPerson, 'id' | 'avatar'>

const title = 'Interval'
export default function Interval() {
  useLayoutEffect(() => {
    const randomValue = getRandomIntInclusive(0, 999).toString()
    const msg = `>>${title}<< >>${randomValue}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const [avatars, setAvatars] = useState<IdAndAvatar[]>([])
  const [start, setStart] = useState(true)
  useInterval(
    () => {
      if (start) {
        setAvatars(avatars => [
          {id: D.randomId(), avatar: D.randomAvatarUrl()},
          ...avatars,
        ])
      }
    },
    5000,
    [start],
  )
  const toggleStart = useCallback(() => setStart(start => !start), [])
  const clearAvatars = useCallback(() => setAvatars(notUsed => []), [])

  const children = avatars.map(({id, avatar}) => (
    <Avatar
      key={id}
      uri={avatar}
      size={70}
      viewStyle={styles.avatarViewStyle}
    />
  ))

  return (
    <View style={[styles.view]}>
      <View style={styles.topBar}>
        <Text onPress={toggleStart} style={styles.topBarText}>
          {start ? 'stop' : 'start'}
        </Text>
        <Text onPress={clearAvatars} style={styles.topBarText}>
          clear avatars
        </Text>
      </View>
      <Text style={[styles.title]}>{title}</Text>
      <ScrollView contentContainerStyle={styles.avatarViewStyle}>
        {children}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'center', backgroundColor: Colors.lime300},
  title: {fontSize: 30, color: 'white', fontWeight: '600'},
  topBar: {
    width: '100%',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    backgroundColor: Colors.blue500,
  },
  topBarText: {fontSize: 30, color: 'white', fontWeight: '600'},
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  avatarViewStyle: {padding: 10},
})
