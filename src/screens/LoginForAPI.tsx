import React, {useState, useCallback, useLayoutEffect, useMemo} from 'react'
import {StyleSheet, ScrollView} from 'react-native'
// prettier-ignore
import {SafeAreaView, NavigationHeader, MaterialCommunityIcon as Icon, View, Text, TextInput, TouchableViewForFullWidth as TouchableView, RadioButton}
from '../theme'
import {useAutoFocus, AutoFocusProvider} from '../contexts'
import {LoginForAPIScreenProps as Props} from '../routeProps'

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

const title = 'LoginForAPI'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function LoginForAPI({navigation}: Props) {
  const focus = useAutoFocus()
  const onBack = useCallback(() => {
    navigation.canGoBack() && navigation.goBack()
  }, [])

  useLayoutEffect(() => {
    const msgForScreen = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msgForScreen)
    sendCommonWithPromise(msgForScreen, params)
  }, [])

  const randomValue = getRandomIntInclusive(0, 999)
  const [url, setUrl] = useState<string>(`>>${title}<< >>${randomValue}<<`)
  const [keyword, setKeyword] = useState<string>(`로그인 >>${randomValue}<<`)
  const [age, setAge] = useState<string>(randomValue.toString())

  const genderData = useMemo(
    () => [
      {value: ACEGender.Unknown, valueForVisual: '알수 없음'},
      {value: ACEGender.Man, valueForVisual: ACEGender.Man},
      {value: ACEGender.Woman, valueForVisual: ACEGender.Woman},
    ],
    [],
  )
  let initGender = ACEGender.Unknown
  if (randomValue % 3 == 0) {
    initGender = ACEGender.Woman
  } else if (randomValue % 2 == 0) {
    initGender = ACEGender.Man
  }
  const [genderChecked, setGenderChecked] = useState<string>(initGender)

  const maritalStatusData = useMemo(
    () => [
      {value: ACEMaritalStatus.Unknown, valueForVisual: '알수 없음'},
      {value: ACEMaritalStatus.Single, valueForVisual: ACEMaritalStatus.Single},
      {
        value: ACEMaritalStatus.Married,
        valueForVisual: ACEMaritalStatus.Married,
      },
    ],
    [],
  )
  let initMaritalStatus = ACEMaritalStatus.Unknown
  if (randomValue % 3 == 0) {
    initMaritalStatus = ACEMaritalStatus.Single
  } else if (randomValue % 2 == 0) {
    initMaritalStatus = ACEMaritalStatus.Married
  }
  const [maritalStatusChecked, setMaritalStatusChecked] =
    useState<string>(initMaritalStatus)

  const onSend = useCallback(() => {
    const params = ACParams.init(ACParams.TYPE.LOGIN, url)
    params.userId = keyword
    params.userAge = +age
    params.userGender = genderChecked as ACEGender
    params.userMaritalStatus = maritalStatusChecked as ACEMaritalStatus
    sendCommonWithPromisePopup(url, params)
  }, [url, keyword, age, genderChecked, maritalStatusChecked])

  return (
    <SafeAreaView>
      <NavigationHeader
        title={`${title} ${randomValueForScreen}`}
        Left={() => <Icon name="arrow-left-thick" size={30} onPress={onBack} />}
      />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={[styles.view]}>
          <AutoFocusProvider
            contentContainerStyle={[styles.keyboardAwareFocus]}>
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
            </View>
            <View style={[styles.textView]}>
              <Text style={[styles.text]}>유저ID 입력</Text>
              <View border style={[styles.textInputView]}>
                <TextInput
                  onFocus={focus}
                  style={[styles.textInput]}
                  value={keyword}
                  onChangeText={setKeyword}
                  placeholder="유저ID 입력"
                />
              </View>
              <Text style={[styles.text]}>유저 나이 입력</Text>
              <View border style={[styles.textInputView]}>
                <TextInput
                  onFocus={focus}
                  style={[styles.textInput]}
                  value={age}
                  onChangeText={setAge}
                  keyboardType="decimal-pad"
                  placeholder="유저 나이 입력"
                />
              </View>
              <Text style={[styles.text, {marginTop: 20}]}>성별 입력</Text>
              <View border style={[styles.textInputView]}>
                <RadioButton
                  data={genderData}
                  selected={genderChecked}
                  setSelected={setGenderChecked}
                />
              </View>
              <Text style={[styles.text, {marginTop: 20}]}>결혼여부 입력</Text>
              <View border style={[styles.textInputView]}>
                <RadioButton
                  data={maritalStatusData}
                  selected={maritalStatusChecked}
                  setSelected={setMaritalStatusChecked}
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
      </ScrollView>
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
  contentContainerStyle: {width: '100%'},
})
