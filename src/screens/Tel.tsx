import React, {useState, useCallback, useLayoutEffect} from 'react'
import {StyleSheet} from 'react-native'
// prettier-ignore
import {SafeAreaView, NavigationHeader, MaterialCommunityIcon as Icon, View, Text, TextInput, TouchableViewForFullWidth as TouchableView}
from '../theme'
import {useAutoFocus, AutoFocusProvider} from '../contexts'
import {TelScreenProps as Props} from '../routeProps'

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
} from 'acecounter.sdk.react-native'

const title = 'Tel'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function Tel({navigation}: Props) {
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
  const [url, setUrl] = useState<string>(`>>${title}<< >>${randomValue}<<`)
  const [memberKey, setMemberKey] = useState<string>(
    `멤버ID >>${randomValue + 0}<<`,
  )
  const [keyword, setKeyword] = useState<string>(
    `>>${title}<< >>${randomValue + 0}<<`,
  )
  const onSend = useCallback(() => {
    const params = ACParams.init(ACParams.TYPE.TEL, url)
    params.tel = keyword
    params.memberKey = memberKey
    sendCommonWithPromisePopup(url, params)
  }, [url, keyword, memberKey])

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
            <Text style={[styles.text]}>{title} 명(key: url)</Text>
            <View border style={[styles.textInputView]}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={url}
                onChangeText={setUrl}
                placeholder="이벤트 명 입력"
              />
            </View>
            <View border style={[styles.textInputView]}>
              <TextInput
                style={[styles.textInput]}
                value={memberKey}
                onChangeText={setMemberKey}
                placeholder="멤버ID 입력"
              />
            </View>
          </View>
          <View style={[styles.textView]}>
            <Text style={[styles.text]}>연락처 입력</Text>
            <View border style={[styles.textInputView]}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={keyword}
                onChangeText={setKeyword}
                placeholder="연락처 입력"
              />
            </View>
          </View>
          <TouchableView
            notification
            style={[styles.touchableView]}
            onPress={onSend}>
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
