import {Platform, Alert} from 'react-native'

import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus,
} from 'acecounter.sdk.react-native'
import {getRandomIntInclusive} from '.'

export function getContraryGcode(): string {
  return gcodeSelector(true)
}

export function gcodeSelector(reverse: boolean = false): string {
  if (reverse) {
    if (!(Platform.OS === 'ios')) {
      return 'AK2A97543'
    } else {
      return 'AK1A97542'
    }
  } else {
    if (Platform.OS === 'ios') {
      return 'AK2A97543'
    } else {
      return 'AK1A97542'
    }
  }
}

export function sendCommonWithCB(argMessage: string, params: ACParams): void {
  const msg = `\n\n\n\n CB ${argMessage} 클릭!`
  console.log(msg)
  console.log(JSON.stringify(params, null, 2))

  ACS.send(params, (error?: object, result?: ACEResponseToCaller) => {
    console.log(`${argMessage}::in CB`)
    console.log('error: ' + JSON.stringify(error, null, 2))
    console.log('result: ' + JSON.stringify(result, null, 2))
  })
}

export function sendCommonWithPromise(
  argMessage: string,
  params: ACParams,
): void {
  const msg = `\n\n\n\n Promise ${argMessage} 클릭!`
  console.log(msg)
  console.log(JSON.stringify(params, null, 2))

  ACS.send(params)
    .then(response => {
      console.log(`${argMessage}::in then!!`)
      if (response) {
        console.log('response: ' + JSON.stringify(response, null, 2))
      } else {
        console.log('response is undefined.')
      }
    })
    .catch(err => {
      console.log(`${argMessage}::in reject!!`)
      if (err) {
        console.log('err: ' + JSON.stringify(err, null, 2))
      } else {
        console.log('err is undefined.')
      }
    })
}

export function setManualToRandomAdvertisingIdentifier(): void {
  const randomValue = getRandomIntInclusive(0, 9999999999999999).toString()
  ACS.setAdvertisingIdentifier(true, randomValue)
  const msg = `set manual AdvertisingIdentifier >${randomValue}<`
  console.log(msg)
}

export function setManualAdvertisingIdentifier(value: string): void {
  ACS.setAdvertisingIdentifier(true, value)
  const msg = `set manual AdvertisingIdentifier >${value}<`
  console.log(msg)
}
