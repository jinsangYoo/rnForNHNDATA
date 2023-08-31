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
} from 'acecounter.sdk.react-native'

import {sendCommonWithPromise} from '../../acsdk'

export const useDeeplinkURL = () => {
  const [url, setUrl] = useState<string | null>(null)
  const [processing, setProcessing] = useState(true)

  useEffect(() => {
    // Get the deep link used to background the app
    const onLinkingEvent = async (event: {url: string}) => {
      if (event.url) {
        console.log(`useInitialURL::onLinkingEvent::event.url is ${event.url}`)

        const params = ACParams.init(ACParams.TYPE.DEEPLINK)
        params.keyword = event.url == null ? undefined : event.url
        sendCommonWithPromise(
          `useInitialURL::onLinkingEvent::event.url: >>${event.url}<<`,
          params,
        )
      } else {
        console.log(`useInitialURL::onLinkingEvent::event.url is null`)
      }
    }
    Linking.addEventListener('url', onLinkingEvent)

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
