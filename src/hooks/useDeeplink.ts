import {useEffect, useState} from 'react'
import {Linking} from 'react-native'

import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus,
} from 'ace.sdk.react-native'

import {sendCommonWithPromise} from '../../acsdk'

export const useInitialURL = () => {
  const [url, setUrl] = useState<string | null>(null)
  const [processing, setProcessing] = useState(true)

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL()
      console.log(`useInitialURL::initialUrl: >>${initialUrl}<<`)
      if (initialUrl != null) {
        var regex = /[?&]([^=#]+)=([^&#]*)/g
        var match: Array<string> | null
        while ((match = regex.exec(initialUrl))) {
          console.log(
            `useInitialURL::match[1]: >>${match[1]}<<, match[2]: >>${match[2]}<<`,
          )
        }
      } else {
        console.log(`useInitialURL::initialUrl is null`)
      }

      const params = ACParams.init(ACParams.TYPE.DEEPLINK)
      params.keyword = initialUrl == null ? undefined : initialUrl
      sendCommonWithPromise(
        `useInitialURL::initialUrl: >>${initialUrl}<<`,
        params,
      )

      setUrl(initialUrl)
      setProcessing(false)
    }

    getUrlAsync()
  }, [])

  return {url, processing}
}
