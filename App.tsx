/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useLayoutEffect} from 'react'
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

const App = () => {
  useLayoutEffect(() => {
    const _config = AceConfiguration.init(getGCode())
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

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <MainNavigator />
    </SafeAreaView>
  )
}

function getGCode(): string {
  if (Platform.OS == 'ios') {
    return 'AK3A79964'
  } else {
    return 'AK2A79936'
  }
}

function isEmpty(value: any): boolean {
  return (
    value === null || // check for null
    value === undefined || // check for undefined
    value === '' || // check for empty string
    (Array.isArray(value) && value.length === 0) || // check for empty array
    (typeof value === 'object' && Object.keys(value).length === 0) // check for empty object
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
})

export default App
