import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react'
import {Platform, StyleSheet, ToastAndroid, Alert, Switch} from 'react-native'
// prettier-ignore
import {SafeAreaView, NavigationHeader, MaterialCommunityIcon as Icon, View, Text, TextInput, TouchableViewForFullWidth as TouchableView}
from '../theme'
import {useAutoFocus, AutoFocusProvider} from '../contexts'
import {ManuallySetAD_IDScreenProps as Props} from '../routeProps'

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

import {commonStyles} from '../styles/Common.style'
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid'
import Validate from '../utils/validate'

const title = 'ManuallySetAD_ID'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function ManuallySetAD_ID({navigation}: Props) {
  const onBack = useCallback(() => {
    navigation.canGoBack() && navigation.goBack()
  }, [])

  useLayoutEffect(() => {
    const msgForScreen = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msgForScreen)
    sendCommonWithPromise(msgForScreen, params)
  }, [])

  const focus = useAutoFocus()
  const [idfa, setIdfa] = useState<string>('-')
  const [isAdTrackingEnabled, setIsAdTrackingEnabled] = useState(false)

  const toggleDebugSwitch = (value: boolean) => setIsAdTrackingEnabled(value)
  const onGetAD_ID = useCallback(() => {
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

        ACS.setAdvertisingIdentifier(result.isAdEnabled, result.adid)
      })
      .catch(err => {
        console.log(`${title}::in catch: getAdvertisingInfo`)
        console.log(err)
        setIsAdTrackingEnabled(false)
        setIdfa('--')
        ACS.setAdvertisingIdentifier(false, '--')
      })

    onPopup('광고식별자 얻어 SDK에 설정')
  }, [idfa, isAdTrackingEnabled])

  const onSetDefaultAD_ID = useCallback(() => {
    setIdfa('00000000-0000-0000-0000-000000000000')
    setIsAdTrackingEnabled(false)

    ACS.setAdvertisingIdentifier(false, '00000000-0000-0000-0000-000000000000')

    onPopup('Default 광고식별자로 SDK에 설정')
  }, [])

  const onSetRandomAD_ID = useCallback(() => {
    const randomValue = getRandomIntInclusive(0, 999)

    const _idfa = `>>${title}<< >>${randomValue}<<`
    let _isAdTrackingEnabled = false
    if (randomValue % 2 === 0) {
      _isAdTrackingEnabled = true
    }
    setIdfa(_idfa)
    setIsAdTrackingEnabled(_isAdTrackingEnabled)

    ACS.setAdvertisingIdentifier(_isAdTrackingEnabled, _idfa)

    onPopup('랜덤 문자열를 광고식별자로 SDK에 설정')
  }, [])

  const onPopup = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT)
    } else {
      Alert.alert(message)
    }
  }

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
          <View style={[commonStyles.rowFlexDirectionViewNonPadding]}>
            <Text style={[styles.text]}>광고식별자:</Text>
            <View border style={[styles.textInputViewInControlBox]}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={idfa}
                onChangeText={setIdfa}
                multiline={true}
                placeholder="enter ADID/IDFA."
              />
            </View>
          </View>
          <View style={[commonStyles.widthFullAndRowFlexDirectionView]}>
            <Text style={[styles.text]}>isAdTrackingEnabled:</Text>
            <Switch
              value={isAdTrackingEnabled}
              onValueChange={toggleDebugSwitch}
            />
          </View>
          <TouchableView
            notification
            style={[styles.touchableView, styles.bottomAPITouchableView]}
            onPress={onGetAD_ID}>
            <Text style={[styles.text]}>광고식별자 얻어 SDK에 설정</Text>
          </TouchableView>

          <TouchableView
            notification
            style={[
              styles.touchableView,
              styles.touchableViewRedBG,
              styles.bottomAPITouchableView,
            ]}
            onPress={onSetDefaultAD_ID}>
            <Text style={[styles.text]}>Default 광고식별자로 SDK에 설정</Text>
          </TouchableView>

          <TouchableView
            notification
            style={[
              styles.touchableView,
              styles.touchableViewBrightGreenBG,
              styles.bottomAPITouchableView,
            ]}
            onPress={onSetRandomAD_ID}>
            <Text style={[styles.text]}>
              랜덤 문자열를 광고식별자로 SDK에 설정
            </Text>
          </TouchableView>
        </AutoFocusProvider>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'center'},
  title: {fontSize: 40},
  text: {fontSize: 20},
  keyboardAwareFocus: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {fontSize: 24, padding: 10},
  textInputView: {marginTop: 5, borderRadius: 10, width: '90%'},
  textInputViewInControlBox: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 10,
  },
  touchableView: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 255, 99, 0.5)',
  },
  touchableViewRedBG: {
    backgroundColor: 'rgba(255, 99, 99, 1.0)',
  },
  touchableViewBrightGreenBG: {
    backgroundColor: '#97FFB9',
  },
  bottomAPITouchableView: {
    marginVertical: 10,
  },
})
