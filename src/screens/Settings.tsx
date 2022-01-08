import React, {useState, useCallback, useEffect} from 'react'
import {Platform, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
// prettier-ignore
import {SafeAreaView, View, Text, TextInput, TouchableView, UnderlineText}
from '../theme'
import * as D from '../data'
import {useAutoFocus, AutoFocusProvider} from '../contexts'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../store'
import * as U from '../utils'
import * as L from '../store/login'
import {commonStyles} from '../styles/Common.style'

import DeviceInfo from 'react-native-device-info'
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid'

export default function Settings() {
  const {loggedIn} = useSelector<AppState, L.State>(({login}) => login)
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [isAdTrackingEnabled, setIsAdTrackingEnabled] = useState<boolean>(false)
  const [idfa, setIdfa] = useState<string | null>()

  const focus = useAutoFocus()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const goTabNavigator = useCallback(() => {
    dispatch(L.loginAction({email, name, password}))
    navigation.navigate('TabNavigator')
  }, [email, name, password])
  const goSignUp = useCallback(() => navigation.navigate('SignUp'), [])

  useEffect(() => {
    ReactNativeIdfaAaid.getAdvertisingInfo()
      .then((res: AdvertisingInfoResponse) => {
        setIsAdTrackingEnabled(!res.isAdTrackingLimited)
        return !res.isAdTrackingLimited ? setIdfa(res.id) : setIdfa(null)
      })
      .catch(err => {
        console.log(err)
        setIsAdTrackingEnabled(false)
        return setIdfa(null)
      })

    U.readFromStorage(L.loggedUserKey)
      .then(value => {
        if (value.length > 0) {
          const savedUser = JSON.parse(value)
          setEmail(savedUser.email)
          setName(savedUser.name)
          setPassword(savedUser.password)
        }
      })
      .catch(e => {})
  }, [loggedIn])

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
          <View style={[commonStyles.widthFullView]}>
            <Text style={[commonStyles.rowTitle, styles.text]}>
              샘플앱 버전:
            </Text>
            <Text
              style={[
                commonStyles.flex,
                commonStyles.rowValueToLeftPadding,
                styles.text,
              ]}>
              {DeviceInfo.getVersion()}
            </Text>
          </View>
          <View style={[commonStyles.widthFullView]}>
            <Text style={[commonStyles.rowTitle, styles.text]}>
              {Platform.select({ios: 'IDFA', android: 'ADID'})}:
            </Text>
            <Text
              style={[
                commonStyles.flex,
                commonStyles.rowValueToLeftPadding,
                styles.text,
              ]}>
              {idfa}
            </Text>
          </View>
          <View style={[commonStyles.widthFullView]}>
            <Text style={[commonStyles.rowTitle, styles.text]}>
              광고 분석 활성화 여부:
            </Text>
            <Text
              style={[
                commonStyles.flex,
                commonStyles.rowValueToLeftPadding,
                styles.text,
              ]}>
              {isAdTrackingEnabled.toString()}
            </Text>
          </View>
          <View style={[styles.textView]}>
            <Text style={[styles.text]}>password</Text>
            <View border style={[styles.textInputView]}>
              <TextInput
                secureTextEntry
                onFocus={focus}
                style={[styles.textInput]}
                value={password}
                onChangeText={setPassword}
                placeholder="enter your name"
              />
            </View>
          </View>
          <TouchableView
            notification
            style={[styles.touchableView]}
            onPress={goTabNavigator}>
            <Text style={[styles.text]}>Login</Text>
          </TouchableView>
          <UnderlineText
            style={[styles.text, {marginTop: 15}]}
            onPress={goSignUp}>
            SignUp
          </UnderlineText>
        </AutoFocusProvider>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1, justifyContent: 'space-between', alignItems: 'center'},
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
