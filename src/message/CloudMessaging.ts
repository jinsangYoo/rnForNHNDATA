import {useEffect} from 'react'
import {Platform, Alert} from 'react-native'
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'

import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus,
} from 'ace.sdk.react-native'

export function CloudMessaging() {
  useEffect(() => {
    registerAppWithFCM()
    requestUserPermission()

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'A new FCM message arrived on foreground!',
          JSON.stringify(remoteMessage, null, 2),
        )
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
        handleCloudMsg(remoteMessage)
      }
    })

    unsubscribe()
  }, [])

  async function registerAppWithFCM() {
    if (
      Platform.OS === 'ios' &&
      !messaging().isDeviceRegisteredForRemoteMessages
    ) {
      console.log('method: ', 'registerDeviceForRemoteMessages')
      await messaging().registerDeviceForRemoteMessages()
    }
  }

  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission({
      providesAppNotificationSettings: true,
    })
    const enabled =
      authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    // 권한상태 (-1: 요청 안함, 0: 거부, 1: 수락, 2: 임시권한)
    console.log(
      `enabled: ${enabled}, Authorization status: ${authorizationStatus}`,
    )

    switch (authorizationStatus) {
      case 0:
        console.log(`${authorizationStatus}: 거부`)
        checkToken()
        break
      case 1:
        console.log(`${authorizationStatus}: 수락`)
        // 토큰 요청
        checkToken()

        // 앱 꺼져있을 때
        messaging()
          .getInitialNotification()
          .then(remoteMessage => {
            if (remoteMessage) {
              console.log(
                'Notification caused app to open from quit state:',
                remoteMessage.notification,
              )
              handleCloudMsg(remoteMessage)
            }
          })

        // background에서만 작동
        messaging().onNotificationOpenedApp(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from background state:',
              remoteMessage.notification,
            )
            handleCloudMsg(remoteMessage)
          }
        })
        break
      case 2:
        console.log(`${authorizationStatus}: 임시권한`)
        break
      default:
        break
    }
  }

  // 토큰 요청: 추후 필요할 예정
  function checkToken() {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          messaging()
            .getToken()
            .then(fcmtoken => {
              if (fcmtoken) {
                console.log('fcmtoken: ', fcmtoken)
              }
            })
            .catch(e => {
              if (e) {
                console.log('e: ', e)
              }
            })
        } else {
          // user doesn't have a device token yet
          console.log('please, check permission.')
        }
      })
  }

  async function handleCloudMsg(
    remoteMessage: FirebaseMessagingTypes.RemoteMessage | null,
  ) {
    if (remoteMessage) {
      if (remoteMessage.data) {
        // 내가 원하는 액션이 작동하게 하기
        console.log(
          `remoteMessage.data:, ${JSON.stringify(remoteMessage.data, null, 2)}`,
        )

        const params = ACParams.init(ACParams.TYPE.PUSH)
        params.data = remoteMessage.data
        ACS.send(params)
      } else {
        console.log('remoteMessage.data is invalid')
      }
    } else {
      console.log('remoteMessage is invalid')
    }
  }

  return null
}

export const hasPermissionForPush = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    messaging()
      .hasPermission()
      .then(enabled => resolve(enabled ? true : false))
      .catch(reject)
  })

export const getToken = (): Promise<string> =>
  new Promise((resolve, reject) => {
    hasPermissionForPush().then(enabled => {
      if (enabled) {
        messaging()
          .getToken()
          .then(token => resolve(token))
          .catch(reject)
      } else {
        console.log('please, check permission.')
        reject(new Error('please, check permission.'))
      }
    })
  })
