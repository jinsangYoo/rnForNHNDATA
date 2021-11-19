import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus,
} from 'reactslimer'

export function sendCommonWithPromise(
  argMessage: string,
  params: ACParams,
): void {
  console.log(argMessage)
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
