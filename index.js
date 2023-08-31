/**
 * @format
 */

import {AppRegistry} from 'react-native'
import messaging from '@react-native-firebase/messaging'
import AppWrapper from './AppWrapper'
import {name as appName} from './app.json'

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage)
})

AppRegistry.registerComponent(appName, () => AppWrapper)
