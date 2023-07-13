import {useState, useEffect} from 'react'
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

export const useLinkingURL = () => {
  const [linkingUrl, setLinkingUrl] = useState<null | string>(null)

  useEffect(() => {
    const onLinkingEvent = async (event: {url: string}) => {
      if (event.url) {
        console.log(`useLinkingURL::linkingUrl is ${event.url}`)
        setLinkingUrl(event.url)

        const params = ACParams.init(ACParams.TYPE.DEEPLINK)
        params.keyword = event.url == null ? undefined : event.url
        sendCommonWithPromise(
          `useLinkingURL::event.url: >>${event.url}<<`,
          params,
        )
      } else {
        console.log(`useLinkingURL::linkingUrl is null`)
      }
    }

    Linking.addEventListener('url', onLinkingEvent)
  }, [])

  return linkingUrl
}
