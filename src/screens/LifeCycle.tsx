import React, {useLayoutEffect} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Colors} from 'react-native-paper'
import {useLayout} from '../hooks'

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

const title = 'LifeCycle'
export default function LifeCycle() {
  useLayoutEffect(() => {
    const randomValue = getRandomIntInclusive(0, 999).toString()
    const msg = `>>${title}<< >>${randomValue}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const [layout, setLayout] = useLayout()
  return (
    <View onLayout={setLayout} style={[styles.view]}>
      <Text style={[styles.title]}>{title}</Text>
      <Text style={[styles.title]}>{JSON.stringify(layout, null, 2)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'center', backgroundColor: Colors.blue100},
  title: {fontSize: 30, color: 'white', fontWeight: '600'},
})
