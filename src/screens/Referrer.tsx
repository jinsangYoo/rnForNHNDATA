import React, {useState, useCallback, useLayoutEffect} from 'react'
import {StyleSheet} from 'react-native'
// prettier-ignore
import {SafeAreaView, NavigationHeader, MaterialCommunityIcon as Icon, View, Text, TextInput, TouchableViewForFullWidth as TouchableView}
from '../theme'
import {useAutoFocus, AutoFocusProvider} from '../contexts'
import {ReferrerScreenProps as Props} from '../routeProps'

import {getRandomIntInclusive} from '../../utils'
import {sendCommonWithPromise, sendCommonWithPromisePopup} from '../../acsdk'
import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus,
} from 'ace.sdk.react-native'

const title = 'Referrer'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function Referrer({navigation}: Props) {
  const focus = useAutoFocus()
  const onBack = useCallback(() => {
    navigation.canGoBack() && navigation.goBack()
  }, [])

  useLayoutEffect(() => {
    const msgForScreen = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msgForScreen)
    sendCommonWithPromise(msgForScreen, params)
  }, [])

  const randomValue = getRandomIntInclusive(0, 999).toString()
  const [kw, setKw] = useState<string>(`kw=${randomValue}`)
  const onSend = useCallback(() => {
    const params = ACParams.init(ACParams.TYPE.REFERRER)
    params.keyword = kw
    sendCommonWithPromisePopup(title, params)
  }, [kw])

  const [kwSecond, setKwSecond] = useState<string>(`kw%3D${randomValue}2`)
  const onSendSecond = useCallback(() => {
    const params = ACParams.init(ACParams.TYPE.REFERRER)
    params.keyword = kwSecond
    sendCommonWithPromisePopup(title, params)
  }, [kwSecond])

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <NavigationHeader
          title={`${title} ${randomValueForScreen}`}
          Left={() => (
            <Icon name="arrow-left-thick" size={30} onPress={onBack} />
          )}
        />
        <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
          <View style={[styles.textView]}>
            <Text style={[styles.text]}>{title} 코드(key: kw)</Text>
            <View border style={[styles.textInputView]}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={kw}
                onChangeText={setKw}
                placeholder="kw 값 입력"
              />
            </View>
          </View>
          <TouchableView
            notification
            style={[styles.touchableView]}
            onPress={onSend}>
            <Text style={[styles.text]}>{title}</Text>
          </TouchableView>
          <View style={[styles.textView]}>
            <Text style={[styles.text]}>{title} 코드(key: kw)</Text>
            <View border style={[styles.textInputView]}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={kwSecond}
                onChangeText={setKwSecond}
                placeholder="kw 값 입력"
              />
            </View>
          </View>
          <TouchableView
            notification
            style={[styles.touchableView]}
            onPress={onSendSecond}>
            <Text style={[styles.text]}>{title}</Text>
          </TouchableView>
        </AutoFocusProvider>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1, justifyContent: 'space-between', alignItems: 'center'},
  title: {fontSize: 40},
  text: {fontSize: 20},
  keyboardAwareFocus: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {width: '100%', padding: 5, marginBottom: 10},
  textInput: {fontSize: 24, padding: 10},
  textInputView: {marginTop: 5, borderRadius: 10},
  touchableView: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
