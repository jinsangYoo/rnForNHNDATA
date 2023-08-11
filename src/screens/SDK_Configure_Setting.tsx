import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react'
import {StyleSheet, Switch} from 'react-native'
// prettier-ignore
import {SafeAreaView, NavigationHeader, MaterialCommunityIcon as Icon, View, Text, TextInput, TouchableViewForFullWidth as TouchableView}
from '../theme'
import {useAutoFocus, AutoFocusProvider} from '../contexts'
import {SDK_Configure_SettingScreenProps as Props} from '../routeProps'

import {gcodeSelector, getRandomIntInclusive, isEmpty} from '../../utils'
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

import {commonStyles} from '../styles/Common.style'
import {AppState as AppStateStore} from '../store'
import {useDispatch, useSelector} from 'react-redux'
import * as AI from '../store/appinfo'

const title = 'SDK_Configure_Setting'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function SDK_Configure_Setting({navigation}: Props) {
  const onBack = useCallback(() => {
    navigation.canGoBack() && navigation.goBack()
  }, [])

  useLayoutEffect(() => {
    const msgForScreen = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msgForScreen)
    sendCommonWithPromise(msgForScreen, params)
  }, [])

  const focus = useAutoFocus()
  const dispatch = useDispatch()
  const {appinformaion} = useSelector<AppStateStore, AI.State>(
    ({appinfo}) => appinfo,
  )

  const [gcode, setGcode] = useState(gcodeSelector())
  const [debug, setDebug] = useState(true)
  const [enablePrivacyPolicy, setEnablePrivacyPolicy] = useState(false)
  const [
    disableToCollectAdvertisingIdentifier,
    setDisableToCollectAdvertisingIdentifier,
  ] = useState(false)
  useEffect(() => {
    console.log(`${title}::appinformaion:`)
    console.log(JSON.stringify(appinformaion, null, 2))
    setGcode(
      isEmpty(appinformaion.gcode) ? gcodeSelector() : appinformaion.gcode,
    )
    setDebug(appinformaion.debug)
    setEnablePrivacyPolicy(appinformaion.enablePrivacyPolicy)
    setDisableToCollectAdvertisingIdentifier(
      appinformaion.disableToCollectAdvertisingIdentifier,
    )
  }, [appinformaion])

  const toggleDebugSwitch = (value: boolean) => setDebug(value)
  const toggleEnablePrivacyPolicySwitch = (value: boolean) =>
    setEnablePrivacyPolicy(value)
  const toggleDisableToCollectAdvertisingIdentifierSwitch = (value: boolean) =>
    setDisableToCollectAdvertisingIdentifier(value)

  const onSave = useCallback(() => {
    dispatch(
      AI.appInfoWithSaveAction({
        ...appinformaion,
        gcode: gcode,
        disableToCollectAdvertisingIdentifier:
          disableToCollectAdvertisingIdentifier,
        debug: debug,
        enablePrivacyPolicy: enablePrivacyPolicy,
      }),
    )
  }, [])

  const onSaveByDefaultValues = useCallback(() => {
    setGcode(gcodeSelector())
    setDisableToCollectAdvertisingIdentifier(false)
    setEnablePrivacyPolicy(false)
    setDebug(true)

    dispatch(
      AI.appInfoWithSaveAction({
        ...appinformaion,
        gcode: gcodeSelector(),
        disableToCollectAdvertisingIdentifier: false,
        debug: true,
        enablePrivacyPolicy: false,
      }),
    )
  }, [])

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
            <Text style={[styles.text]}>key:</Text>
            <View border style={[styles.textInputViewInControlBox]}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={gcode}
                onChangeText={setGcode}
                placeholder="enter your gcode."
              />
            </View>
          </View>
          <View style={[commonStyles.widthFullAndRowFlexDirectionView]}>
            <Text style={[styles.text]}>Debug:</Text>
            <Switch value={debug} onValueChange={toggleDebugSwitch} />
          </View>
          <View style={[commonStyles.widthFullAndRowFlexDirectionView]}>
            <Text style={[styles.text]}>EnablePrivacyPolicy:</Text>
            <Switch
              value={enablePrivacyPolicy}
              onValueChange={toggleEnablePrivacyPolicySwitch}
            />
          </View>
          <View style={[commonStyles.widthFullAndRowFlexDirectionView]}>
            <Text style={[styles.text]}>
              DisableToCollectAdvertisingIdentifier:
            </Text>
            <Switch
              value={disableToCollectAdvertisingIdentifier}
              onValueChange={toggleDisableToCollectAdvertisingIdentifierSwitch}
            />
          </View>

          <TouchableView
            notification
            style={[styles.touchableView, styles.bottomAPITouchableView]}
            onPress={onSave}>
            <Text style={[styles.text]}>저장</Text>
          </TouchableView>

          <TouchableView
            notification
            style={[
              styles.touchableView,
              styles.touchableViewRedBG,
              styles.bottomAPITouchableView,
            ]}
            onPress={onSaveByDefaultValues}>
            <Text style={[styles.text]}>Default 설정</Text>
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
  bottomAPITouchableView: {
    marginVertical: 10,
  },
})
