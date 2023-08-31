/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useCallback, useEffect} from 'react'
import {SafeAreaView, StyleSheet, Platform, useColorScheme} from 'react-native'

import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus,
} from 'acecounter.sdk.react-native'

import MainNavigator from './src/screens/MainNavigator'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import {ToggleThemeProvider} from './src/contexts'

import {gcodeSelector} from './utils/aceWrappers'

import DeviceInfo from 'react-native-device-info'

import {sendCommonWithPromise} from './acsdk'
import {useDeeplinkURL} from './src/hooks'

import {useDispatch, useSelector} from 'react-redux'
import {AppState as AppStateStore} from './src/store'
import * as AI from './src/store/appinfo'
import type {AppInfo} from './src/store/appinfo'
import * as U from './src/utils'

const App = () => {
  // const {coldURL: initialUrl, processing} = useDeeplinkURL()
  // const {warmURL: linkingUrl} = useLinkingURL()
  useDeeplinkURL()
  // useLinkingURL()

  const appinformaion = useSelector<AppStateStore, AppInfo>(state => {
    console.log('useSelector::state:')
    console.log(state)
    // console.log('useSelector::state.appinfo:')
    // console.log(state.appinfo)
    console.log(
      `useSelector::state.appinfo.appinformaion: ${JSON.stringify(
        state.appinfo.appinformaion,
        null,
        2,
      )}`,
    )
    return state.appinfo.appinformaion
  })
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(`App::appinformaion: ${JSON.stringify(appinformaion, null, 2)}`)
    dispatch(AI.appInfoWithLoadAction())
  }, [])

  const [gcode, setGcode] = useState('')
  const [debug, setDebug] = useState(true)
  const [enablePrivacyPolicy, setEnablePrivacyPolicy] = useState(false)
  const [
    disableToCollectAdvertisingIdentifier,
    setDisableToCollectAdvertisingIdentifier,
  ] = useState(false)
  useEffect(() => {
    console.log(`0. ACS.isEnableSDK(): ${ACS.isEnableSDK()}`)
    console.log(`0. ACS.getSdkVersion(): ${ACS.getSdkVersion()}`)

    U.readFromStorage(AI.appInfoForSaveKey)
      .then(value => {
        if (value.length > 0) {
          const storedConfigureValues = JSON.parse(value)
          console.log(
            `저장된 gcode: >>${storedConfigureValues.gcode}<< 를 사용합니다.`,
          )
          console.log(JSON.stringify(storedConfigureValues, null, 2))
          setGcode(storedConfigureValues.gcode)
          setDebug(storedConfigureValues.debug)
          setEnablePrivacyPolicy(storedConfigureValues.enablePrivacyPolicy)
          setDisableToCollectAdvertisingIdentifier(
            storedConfigureValues.disableToCollectAdvertisingIdentifier,
          )

          const _config = AceConfiguration.init(storedConfigureValues.gcode)
          _config.debug = storedConfigureValues.debug
          _config.enablePrivacyPolicy =
            storedConfigureValues.enablePrivacyPolicy
          _config.disableToCollectAdvertisingIdentifier =
            storedConfigureValues.disableToCollectAdvertisingIdentifier

          ACS.configure(
            _config,
            (error?: object, innerResult?: ACEResponseToCaller) => {
              if (error) {
                console.log('SDK CB 초기화::in error!!')
                console.log(`error: ${error}`)
                if (innerResult) {
                  console.log(
                    'innerResult: ' + JSON.stringify(innerResult, null, 2),
                  )
                }
              } else if (innerResult) {
                console.log('SDK CB 초기화::in innerResult!!')
                console.log(
                  'innerResult: ' + JSON.stringify(innerResult, null, 2),
                )
                console.log(`2. ACS.isEnableSDK(): ${ACS.isEnableSDK()}`)
                console.log(
                  'ACS.getDetail(): ' +
                    JSON.stringify(ACS.getSdkDetails(), null, 2),
                )
              } else {
                console.log('SDK CB 초기화::finally!!')
                console.log('error and innerResult is undefined.')
              }
            },
          )
        } else {
          console.log(
            `초기화 JSON 파일 읽기 실패 value.length: >>${value.length}<<`,
          )
          defaultInitForSDK()
        }
      })
      .catch(e => {
        console.log(`초기화 JSON 파일 읽기 실패`)
        console.log(e)
        defaultInitForSDK()
      })
  }, [])

  const defaultInitForSDK = useCallback(() => {
    console.log(
      `gcodeSelector(): >>${gcodeSelector()}<< 의 gcode 를 사용합니다.`,
    )

    setGcode(gcodeSelector())
    const _config = AceConfiguration.init(gcodeSelector())
    _config.debug = debug
    _config.enablePrivacyPolicy = enablePrivacyPolicy
    _config.disableToCollectAdvertisingIdentifier =
      disableToCollectAdvertisingIdentifier

    ACS.configure(
      _config,
      (error?: object, innerResult?: ACEResponseToCaller) => {
        if (error) {
          console.log('SDK CB 초기화::in error!!')
          console.log(`error: ${error}`)
          if (innerResult) {
            console.log('innerResult: ' + JSON.stringify(innerResult, null, 2))
          }
        } else if (innerResult) {
          console.log('SDK CB 초기화::in innerResult!!')
          console.log('innerResult: ' + JSON.stringify(innerResult, null, 2))
          console.log(`2. ACS.isEnableSDK(): ${ACS.isEnableSDK()}`)
          console.log(
            'ACS.getDetail(): ' + JSON.stringify(ACS.getSdkDetails(), null, 2),
          )
        } else {
          console.log('SDK CB 초기화::finally!!')
          console.log('error and innerResult is undefined.')
        }
      },
    )
    // ACS.configure(_config)
    //   .then(response => {
    //     console.log('SDK Promise 초기화::in then!!')
    //     console.log('response: ' + JSON.stringify(response, null, 2))
    //     console.log(
    //       'ACS.getDetail(): ' + JSON.stringify(ACS.getDetail(), null, 2),
    //     )
    //   })
    //   .catch(err => {
    //     console.log('SDK Promise 초기화::in reject!!')
    //     console.log('err: ' + JSON.stringify(err, null, 2))
    //   })
  }, [])

  const scheme = useColorScheme() // 'dark' 혹은 'light'
  const [theme, setTheme] = useState(
    scheme === 'dark' ? DarkTheme : DefaultTheme,
  )
  // prettier-ignore
  const toggleTheme = useCallback(
  () => setTheme(({dark}) => (dark ? DefaultTheme : DarkTheme)),
  [])

  const testReactNativeDeviceInfo = () => {
    DeviceInfo.getAndroidId().then(androidId => {
      console.log(`DeviceInfo.getAndroidId: ${androidId}`)
    })
    DeviceInfo.getDevice().then(device => {
      console.log(`DeviceInfo.getDevice: ${device}`)
    })

    console.log(`DeviceInfo.getDeviceType: ${DeviceInfo.getDeviceType()}`)
    console.log(`DeviceInfo.getDeviceId: ${DeviceInfo.getDeviceId()}`)
    DeviceInfo.getDeviceName().then(deviceName => {
      console.log(`DeviceInfo.getDeviceName: ${deviceName}`)
    })

    console.log(`DeviceInfo.getModel: ${DeviceInfo.getModel()}`)
    console.log(`DeviceInfo.getSystemName: ${DeviceInfo.getSystemName()}`)
    console.log(`DeviceInfo.getSystemVersion: ${DeviceInfo.getSystemVersion()}`)
    console.log(`DeviceInfo.getUniqueId: ${DeviceInfo.getUniqueId()}`)
  }
  testReactNativeDeviceInfo()

  if (Platform.OS === 'android') {
    DeviceInfo.getInstallReferrer()
      .then(installReferrer => {
        // If the app was installed from https://play.google.com/store/apps/details?id=com.myapp&referrer=my_install_referrer
        // the result will be "my_install_referrer"
        console.log(`installReferrer: ${installReferrer}`)
        const params = ACParams.init(ACParams.TYPE.REFERRER)
        params.keyword = installReferrer
        sendCommonWithPromise(`installReferrer: >>${installReferrer}<<`, params)
      })
      .catch(e => {
        console.log(`installReferrer::e: ${JSON.stringify(e, null, 2)}`)
      })
  }
  console.log('rnForNHNData is ready.')

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ToggleThemeProvider toggleTheme={toggleTheme}>
        <NavigationContainer theme={theme}>
          <MainNavigator />
        </NavigationContainer>
      </ToggleThemeProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
})

export default App
