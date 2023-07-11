import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react'
import {
  StyleSheet,
  ActivityIndicator,
  Alert,
  AppState,
  AppStateStatus,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
// prettier-ignore
import {SafeAreaView, View, Text, TextInput, TouchableViewForFullWidth as TouchableView}
from '../theme'
import {useAutoFocus, AutoFocusProvider} from '../contexts'
import {useDispatch, useSelector} from 'react-redux'
import {AppState as AppStateStore} from '../store'
import * as U from '../utils'
import * as L from '../store/login'
import {Colors} from 'react-native-paper'

import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid'

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
import {APP_VERSION} from '../version'
import {
  registerAppWithFCM,
  requestUserPermission,
  addListenerForForeground,
} from '../message'

const title = 'ACE COUNTER'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function Login() {
  const {loggedIn} = useSelector<AppStateStore, L.State>(({login}) => login)
  const [acesession, setAcesession] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const focus = useAutoFocus()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const goTabNavigator = useCallback(() => {
    dispatch(L.loginAction({acesession, id, password}))
    navigation.navigate('TabNavigator' as never)
  }, [acesession, id, password])
  const goSignUp = useCallback(() => navigation.navigate('SignUp' as never), [])

  const [idfa, setIdfa] = useState<string | null>()
  const [isAdTrackingEnabled, setIsAdTrackingEnabled] = useState(false)
  useEffect(() => {
    const getAdvertisingInfo = async () => {
      ReactNativeIdfaAaid.getAdvertisingInfo()
        .then((res: AdvertisingInfoResponse) => {
          setIsAdTrackingEnabled(!res.isAdTrackingLimited)
          !res.isAdTrackingLimited ? setIdfa(res.id) : setIdfa(null)
          console.log(`${title}::in then: getAdvertisingInfo`)
          console.log(
            `${title}::in then: isAdTrackingEnabled: ${!res.isAdTrackingLimited}`,
          )
          console.log(`${title}::in then: idfa: ${res.id}`)
          ACS.setAdvertisingIdentifier(!res.isAdTrackingLimited, res.id)
        })
        .catch(err => {
          console.log(`${title}::in catch: getAdvertisingInfo`)
          console.log(err)
          setIsAdTrackingEnabled(false)
          setIdfa(null)
        })
        .finally(() => {
          registerAppWithFCM()
          requestUserPermission()
          addListenerForForeground()
        })
    }

    getAdvertisingInfo()
  }, [])

  useEffect(() => {
    U.readFromStorage(L.loggedUserKey)
      .then(value => {
        if (value.length > 0) {
          const savedUser = JSON.parse(value)
          setAcesession(savedUser.acesession)
          setId(savedUser.id)
          setPassword(savedUser.password)
        }
      })
      .catch(e => {})
  }, [loggedIn])

  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const popupErrorMessage = (message: string) => {
    Alert.alert(message)
  }
  const [loading, setLoading] = useState<boolean>(false)
  const onLogin = useCallback(() => {
    setLoading(true)
    fetch(`https://m.acecounter.com/login.amz?id=${id}&pw=${password}`)
      .then(res => {
        var _resultMap = new Map()
        for (const [key, value] of Object.entries(res)) {
          _resultMap.set(key, value)
        }

        if (_resultMap.has('status') && _resultMap.get('status') === 200) {
          console.log(`_resultMap.get('status'): ${_resultMap.get('status')}`)
        } else {
          throw new Error('response is not ok.')
        }

        var _resultHeadersMap = new Map()
        if (!_resultMap.has('headers')) {
          throw new Error('response headers key is not exist.')
        } else {
          const _headers = _resultMap.get('headers')
          for (const [keyHeaders, valueHeaders] of Object.entries(
            _headers['map'],
          )) {
            _resultHeadersMap.set(keyHeaders, valueHeaders)
          }

          if (_resultHeadersMap.has('set-cookie')) {
            const regex = /^ACESESSION=(?!deleted).*/
            const setCookie = _resultHeadersMap
              .get('set-cookie')
              .split(' ')
              .filter((item: string) => regex.test(item))

            if (setCookie.length != 1) {
              throw new Error(
                `${setCookie.length}: not found ACE SESSION information at response headers.`,
              )
            } else {
              console.log(`setCookie[0]: ${setCookie[0]}`)
              return setCookie[0]
            }
          } else {
            throw new Error('not found set-cookie key at response headers.')
          }
        }
      })
      .then(acesession => {
        setLoading(false)
        console.log(`acesession: ${acesession}`)
        dispatch(L.loginWithSaveAction({acesession, id, password}))
        navigation.reset({
          index: 0,
          routes: [{name: 'WebViewHome' as never, params: {acesession}}],
        })
      })
      .catch((e: Error) => {
        setLoading(false)
        popupErrorMessage(`id: ${id}, pw: ${password}, message: ${e.message}`)
      })
  }, [id, password])

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
          <Text style={[styles.title, {marginBottom: 5}]}>{title}</Text>
          <Text style={[styles.subTitle, {marginBottom: 5}]}>
            ({randomValueForScreen})
          </Text>
          <Text style={[styles.subTitle, {marginBottom: 5}]}>
            app version: {APP_VERSION}
          </Text>
          <Text style={[{marginBottom: 100}]}>
            SDK version: {ACS.getSdkVersion()}
          </Text>
          {loading && (
            <ActivityIndicator size="large" color={Colors.lightBlue500} />
          )}
          <View style={[styles.textView]}>
            <Text style={[styles.text]}>ID</Text>
            <View border style={[styles.textInputView]}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={id}
                onChangeText={setId}
                placeholder="enter your id."
              />
            </View>
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
                placeholder="enter your password."
              />
            </View>
          </View>
          <TouchableView
            notification
            style={[styles.touchableView]}
            onPress={onLogin}>
            <Text style={[styles.text]}>Login</Text>
          </TouchableView>
        </AutoFocusProvider>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1, justifyContent: 'space-between', alignItems: 'center'},
  title: {fontSize: 40},
  subTitle: {fontSize: 20},
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
