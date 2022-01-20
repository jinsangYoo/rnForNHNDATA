import React, {useState, useCallback, useLayoutEffect} from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import {useNavigation, DrawerActions} from '@react-navigation/native'
// prettier-ignore
import {SafeAreaView, NavigationHeader, MaterialCommunityIcon as Icon, View, Text, TextInput, TouchableViewForFullWidth as TouchableView}
from '../theme'
import {useAutoFocus, AutoFocusProvider} from '../contexts'
import {useDispatch, useSelector} from 'react-redux'
import * as L from '../store/login'

import {View as RNView} from 'react-native'
import {RadioButton} from 'react-native-paper'

import {DrawerNavigationProp} from '@react-navigation/drawer'
import {DrawerStackParamList} from '../theme/navigation'

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
} from 'reactslimer'
import {combineTransition} from 'react-native-reanimated'

type LoginForAPIScreenNavigationProp = DrawerNavigationProp<
  DrawerStackParamList,
  'LoginForAPI'
>
type Props = {
  navigation: LoginForAPIScreenNavigationProp
}

const title = 'LoginForAPI'
export default function LoginForAPI() {
  const focus = useAutoFocus()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const open = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer())
  }, [])
  const logout = useCallback(() => {
    dispatch(L.logoutAction())
    navigation.navigate('Login')
  }, [])

  useLayoutEffect(() => {
    const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
    const msgForScreen = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msgForScreen)
    sendCommonWithPromise(msgForScreen, params)
  }, [])

  const randomValue = getRandomIntInclusive(0, 999)
  const [url, setUrl] = useState<string>(`>>${title}<< >>${randomValue}<<`)
  const [keyword, setKeyword] = useState<string>(`로그인 >>${randomValue}<<`)
  const [age, setAge] = useState<string>(randomValue.toString())
  const [genderChecked, setGenderChecked] = useState<string>(ACEGender.Unknown)
  const [maritalStatusChecked, setMaritalStatusChecked] = useState<string>(
    ACEMaritalStatus.Unknown,
  )
  if (randomValue % 5 == 0) {
    setGenderChecked(ACEGender.Unknown)
  } else if (randomValue % 3 == 0) {
    setGenderChecked(ACEGender.Woman)
  } else if (randomValue % 2 == 0) {
    setGenderChecked(ACEGender.Man)
  }

  if (randomValue % 5 == 0) {
    setMaritalStatusChecked(ACEMaritalStatus.Unknown)
  } else if (randomValue % 3 == 0) {
    setMaritalStatusChecked(ACEMaritalStatus.Single)
  } else if (randomValue % 2 == 0) {
    setMaritalStatusChecked(ACEMaritalStatus.Married)
  }

  const onSend = useCallback(() => {
    const params = ACParams.init(ACParams.TYPE.LOGIN, url)
    params.userId = keyword
    params.userAge = +age
    params.userGender = genderChecked as ACEGender
    params.userMaritalStatus = maritalStatusChecked as ACEMaritalStatus
    sendCommonWithPromise(url, params)
  }, [url, keyword, age, genderChecked, maritalStatusChecked])

  return (
    <SafeAreaView>
      <NavigationHeader
        title={title}
        Left={() => <Icon name="menu" size={30} onPress={open} />}
        Right={() => <Icon name="logout" size={30} onPress={logout} />}
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
              <Text style={[styles.text]}>성별 입력</Text>
              <RadioButton.Group
                onValueChange={setGenderChecked}
                value={genderChecked}>
                <RadioButton.Item
                  label="알수 없음"
                  value={ACEGender.Unknown}
                  color="#1E6DAD"
                />
                <RadioButton.Item
                  label={ACEGender.Man}
                  value={ACEGender.Man}
                  color="#1E6DAD"
                />
                <RadioButton.Item
                  label={ACEGender.Woman}
                  value={ACEGender.Woman}
                  color="#1E6DAD"
                />
              </RadioButton.Group>
              <Text style={[styles.text]}>결혼여부 입력</Text>
              <RadioButton.Group
                onValueChange={setMaritalStatusChecked}
                value={maritalStatusChecked}>
                <RadioButton.Item
                  label="알수 없음"
                  value={ACEMaritalStatus.Unknown}
                  color="#1E6DAD"
                />
                <RadioButton.Item
                  label={ACEMaritalStatus.Single}
                  value={ACEMaritalStatus.Single}
                  color="#1E6DAD"
                />
                <RadioButton.Item
                  label={ACEMaritalStatus.Married}
                  value={ACEMaritalStatus.Married}
                  color="#1E6DAD"
                />
              </RadioButton.Group>
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
