import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react'
import {Platform, StyleSheet, ToastAndroid, Alert} from 'react-native'
import {useNavigation, DrawerActions} from '@react-navigation/native'
import Clipboard from '@react-native-clipboard/clipboard'
// prettier-ignore
import {SafeAreaView, View, Text, NavigationHeader, TouchableView, MaterialCommunityIcon as Icon}
from '../theme'
import {useAutoFocus, AutoFocusProvider} from '../contexts'
import {useDispatch, useSelector} from 'react-redux'
import {AppState as AppStateStore} from '../store'
import * as U from '../utils'
import * as L from '../store/login'
import {commonStyles} from '../styles/Common.style'

import DeviceInfo from 'react-native-device-info'
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid'
import {useAsync} from '../hooks'
import {getToken} from '../message'

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
} from 'reactslimer'
import {APP_VERSION} from '../version'
import Validate from '../utils/validate'

const title = 'Settings'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function Settings() {
  const {loggedIn} = useSelector<AppStateStore, L.State>(({login}) => login)
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const focus = useAutoFocus()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const open = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer())
  }, [])
  const logout = useCallback(() => {
    dispatch(L.logoutAction())
    navigation.reset({index: 0, routes: [{name: 'Login'} as never]})
  }, [])

  // const goTabNavigator = useCallback(() => {
  //   dispatch(L.loginAction({email, name, password}))
  //   navigation.navigate('TabNavigator')
  // }, [email, name, password])
  // const goSignUp = useCallback(() => navigation.navigate('SignUp'), [])

  const [idfa, setIdfa] = useState<string | null>()
  const [isAdTrackingEnabled, setIsAdTrackingEnabled] = useState(false)
  useEffect(() => {
    const getAdvertisingInfo = async () => {
      ReactNativeIdfaAaid.getAdvertisingInfo()
        .then((res: AdvertisingInfoResponse) => {
          console.log(`${title}::in then: getAdvertisingInfo`)
          console.log(
            `${title}::in then: isAdTrackingEnabled: ${!res.isAdTrackingLimited}`,
          )
          console.log(`${title}::in then: idfa: ${res.id}`)

          const result = Validate.validateAdvertisingIdentifier(
            !res.isAdTrackingLimited,
            res.id,
          )
          setIdfa(result.adid)
          setIsAdTrackingEnabled(result.isAdEnabled)
        })
        .catch(err => {
          console.log(`${title}::in catch: getAdvertisingInfo`)
          console.log(err)
          setIsAdTrackingEnabled(false)
          setIdfa(null)
        })
    }

    getAdvertisingInfo()
  }, [])

  useEffect(() => {
    U.readFromStorage(L.loggedUserKey)
      .then(value => {
        // if (value.length > 0) {
        //   const savedUser = JSON.parse(value)
        //   setEmail(savedUser.email)
        //   setName(savedUser.name)
        //   setPassword(savedUser.password)
        // }
      })
      .catch(e => console.error(e))
  }, [loggedIn])

  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const [token, setToken] = useState<string>('not init token')
  const [error, resetError] = useAsync(async () => {
    setToken('can not get token')
    resetError()
    const _token = await getToken()
    setToken(_token)
  })
  const copyToClipboard = useCallback(() => {
    Clipboard.setString(token)
    const doneCopy = '푸시 토큰을 복사했습니다.'
    if (Platform.OS === 'android') {
      ToastAndroid.show(doneCopy, ToastAndroid.SHORT)
    } else {
      Alert.alert(doneCopy)
    }
  }, [token])

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <NavigationHeader
          title={`${title} ${randomValueForScreen}`}
          Left={() => <Icon name="menu" size={30} onPress={open} />}
          Right={() => <Icon name="logout" size={30} onPress={logout} />}
        />
        <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
          <View style={[commonStyles.widthFullAndRowFlexDirectionView]}>
            <Text style={[commonStyles.rowTitle, styles.text]}>
              샘플앱 버전:
            </Text>
            <Text
              style={[
                commonStyles.flex,
                commonStyles.rowValueToLeftPadding,
                styles.text,
              ]}>
              {APP_VERSION}
            </Text>
          </View>
          <View style={[commonStyles.widthFullAndRowFlexDirectionView]}>
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
          <View style={[commonStyles.widthFullAndRowFlexDirectionView]}>
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
          <View style={[commonStyles.widthFullAndRowFlexDirectionView]}>
            <Text style={[commonStyles.rowTitle, styles.text]}>
              {Platform.select({
                ios: 'bundle identifier',
                android: 'ANDROID_ID',
              })}
              :
            </Text>
            <Text
              style={[
                commonStyles.flex,
                commonStyles.rowValueToLeftPadding,
                styles.text,
              ]}>
              {DeviceInfo.getBundleId()}
            </Text>
          </View>
          <View style={[commonStyles.widthFullAndRowFlexDirectionView]}>
            <Text style={[commonStyles.rowTitle, styles.text]}>푸시 토큰:</Text>
            <Text
              style={[
                commonStyles.flex,
                commonStyles.rowValueToLeftPadding,
                styles.text,
              ]}>
              {error && <Text>error: {error.message}</Text>}
              {token}
            </Text>
          </View>
          <TouchableView
            notification
            style={[styles.touchableView]}
            onPress={copyToClipboard}>
            <Text style={[styles.text]}>복사</Text>
          </TouchableView>
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
