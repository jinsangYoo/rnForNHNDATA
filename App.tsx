/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react'
import {SafeAreaView, StyleSheet, Platform} from 'react-native'

import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus,
} from 'reactslimer'

import MainNavigator from './src/screens/MainNavigator'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import {AppearanceProvider, useColorScheme} from 'react-native-appearance'
import {Provider as ReduxProvider} from 'react-redux'
import {ToggleThemeProvider} from './src/contexts'
import {makeStore} from './src/store'

import CloudMessaging from './src/message/Messaging'
import {gcodeSelector} from './utils/aceWrappers'

const store = makeStore()

const App = () => {
  // Foreground 상태인 경우
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log(
  //       'A new FCM message arrived on foreground!',
  //       JSON.stringify(remoteMessage, null, 2),
  //     )
  //     const params = ACParams.init(ACParams.TYPE.PUSH)
  //     params.data = remoteMessage.data
  //     ACS.send(params)
  //   })
  //   return unsubscribe
  // })

  // Register background handler, Background, Quit 상태일 경우  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   console.log(
  //     'Message handled in the background!',
  //     JSON.stringify(remoteMessage, null, 2),
  //   )

  //   const params = ACParams.init(ACParams.TYPE.PUSH)
  //   params.data = remoteMessage.data
  //   ACS.send(params)
  // })

  useLayoutEffect(() => {
    const _config = AceConfiguration.init(gcodeSelector())
    ACS.configure(_config)
      .then(response => {
        console.log('SDK Promise 초기화::in then!!')
        console.log('response: ' + JSON.stringify(response, null, 2))
      })
      .catch(err => {
        console.log('SDK Promise 초기화::in reject!!')
        console.log('err: ' + JSON.stringify(err, null, 2))
      })
  }, [])

  const scheme = useColorScheme() // 'dark' 혹은 'light'
  const [theme, setTheme] = useState(
    scheme === 'dark' ? DarkTheme : DefaultTheme,
  )
  // prettier-ignore
  const toggleTheme = useCallback(
  () => setTheme(({dark}) => (dark ? DefaultTheme : DarkTheme)),
  [])

  CloudMessaging()
  console.log('rnForNHNData is ready.')
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ToggleThemeProvider toggleTheme={toggleTheme}>
        <ReduxProvider store={store}>
          <NavigationContainer theme={theme}>
            <MainNavigator />
          </NavigationContainer>
        </ReduxProvider>
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
