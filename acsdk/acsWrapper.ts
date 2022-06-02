import {Platform, ToastAndroid, Alert} from 'react-native'
import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus,
} from 'ace.sdk.react-native'

function popupMessage(msg: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.LONG)
  } else {
    Alert.alert(msg)
  }
}

export function sendCommonWithPromise(
  argMessage: string,
  params: ACParams,
  isNeedPopUp: boolean = false,
): void {
  console.log('in sendCommonWithPromise')
  console.log(argMessage)
  console.log(JSON.stringify(params, null, 2))

  ACS.send(params)
    .then(response => {
      console.log(`${argMessage}::in then!!`)
      if (response) {
        console.log('response: ' + JSON.stringify(response, null, 2))
        if (isNeedPopUp) popupMessage(`success sdk send ${params.name}`)
      } else {
        console.log('response is undefined.')
        if (isNeedPopUp)
          popupMessage(
            `success sdk send ${params.name} but response is undefined`,
          )
      }
    })
    .catch(err => {
      console.log(`${argMessage}::in reject!!`)
      if (err) {
        console.log('err: ' + JSON.stringify(err, null, 2))
        // popupMessage(`fail sdk send ${params.name}`)
      } else {
        console.log('err is undefined.')
        // popupMessage(`fail sdk send ${params.name} but err is undefined`)
      }
    })
}

export function sendCommonWithPromisePopup(
  argMessage: string,
  params: ACParams,
): void {
  sendCommonWithPromise(argMessage, params, true)
}
