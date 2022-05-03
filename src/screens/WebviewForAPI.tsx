import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
} from 'react'
import {StyleSheet, TextInput as RNTextInput, Keyboard} from 'react-native'
// prettier-ignore
import {SafeAreaView, NavigationHeader, MaterialCommunityIcon as Icon, View, TextInput, Text, TouchableViewNonWidth as TouchableView}
from '../theme'
import {useDispatch} from 'react-redux'
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid'
import * as U from '../utils'
import {WebView} from 'react-native-webview'

import {getRandomIntInclusive} from '../../utils'
import {sendCommonWithPromise} from '../../acsdk'
import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus,
} from 'reactslimer'
import {WebviewScreenProps as Props} from '../routeProps'
import {Colors} from 'react-native-paper'

type WebViewProps = {
  uri: string
  method?: string
}

const title = 'Webview'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function WebviewForAPI({navigation}: Props) {
  const defaultWebviewURL = useMemo(() => {
    return {uri: 'http://vklog.loginside.co.kr/', method: 'get'}
  }, [])
  const [url, setUrl] = useState<WebViewProps>(defaultWebviewURL)
  const [isAdTrackingEnabled, setIsAdTrackingEnabled] = useState<boolean>(false)
  const [idfa, setIdfa] = useState<string | null>()
  useEffect(() => {
    ReactNativeIdfaAaid.getAdvertisingInfo()
      .then((res: AdvertisingInfoResponse) => {
        setIsAdTrackingEnabled(!res.isAdTrackingLimited)
        return !res.isAdTrackingLimited ? setIdfa(res.id) : setIdfa(null)
      })
      .catch(err => {
        console.log(err)
        setIsAdTrackingEnabled(false)
        return setIdfa(null)
      })

    U.readFromStorage('__webViewURL')
      .then(value => {
        if (value.length > 0) {
          const savedWebViewProps = JSON.parse(value)
          savedWebViewProps && setUrl(savedWebViewProps)
          !savedWebViewProps && setUrl(defaultWebviewURL)
        }
      })
      .catch(e => {})
  }, [])
  useLayoutEffect(() => {
    const msgForScreen = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msgForScreen)
    sendCommonWithPromise(msgForScreen, params)
  }, [])

  const [newUrl, setNewUrl] = useState<string>(url.uri)
  const refForWebview = useRef<WebView | null>(null)
  const refForTextInput = useRef<RNTextInput | null>(null)
  const dispatch = useDispatch()
  const onBack = useCallback(() => {
    navigation.canGoBack() && navigation.goBack()
  }, [])
  const setDefaultURLToWebview = useCallback(() => {
    setNewUrl(defaultWebviewURL.uri)
    setUrl(defaultWebviewURL)
    Keyboard.dismiss()
  }, [])
  const reloadToWebview = useCallback(() => {
    setNewUrl(url.uri)
    refForWebview.current?.reload()
    Keyboard.dismiss()
  }, [url])
  const injectionJavascriptToWebview = useCallback(() => {
    console.log(
      `_AceAPP('${ACS.getKey()}', '${ACS.getDevice()}', '${ACS.getTS()}', '${idfa}', ${isAdTrackingEnabled});`,
    )
    refForWebview.current?.injectJavaScript(
      `_AceAPP('${ACS.getKey()}', '${ACS.getDevice()}', '${ACS.getTS()}', '${idfa}', ${isAdTrackingEnabled});`,
    )

    Keyboard.dismiss()
  }, [idfa])
  const requestToWebview = useCallback(() => {
    setUrl({uri: newUrl})
    Keyboard.dismiss()
  }, [newUrl])

  const setSourtcutURLButton = useCallback((value: string) => {
    setNewUrl(value)
    setUrl({uri: value})
    Keyboard.dismiss()
  }, [])

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <NavigationHeader
          title={`${title} ${randomValueForScreen}`}
          Left={() => (
            <Icon name="arrow-left-thick" size={30} onPress={onBack} />
          )}
        />
        <View style={[styles.navigationBarForWebview]}>
          <TouchableView
            notification
            style={[styles.touchableView, {backgroundColor: Colors.grey500}]}
            onPress={setDefaultURLToWebview}>
            <Text style={[styles.text]}>D</Text>
          </TouchableView>
          <TouchableView
            notification
            style={[styles.touchableView]}
            onPress={reloadToWebview}>
            <Text style={[styles.text]}>R</Text>
          </TouchableView>
          <TextInput
            style={[styles.textInput]}
            defaultValue={newUrl}
            onChangeText={newURL => setNewUrl(newURL)}
            onSubmitEditing={requestToWebview}
            multiline={true}
            placeholder="enter website URL."
            ref={refForTextInput}
          />
          <TouchableView
            notification
            style={[styles.touchableView, {backgroundColor: Colors.grey500}]}
            onPress={injectionJavascriptToWebview}>
            <Text style={[styles.text]}>In</Text>
          </TouchableView>
          <TouchableView
            notification
            style={[styles.touchableView]}
            onPress={requestToWebview}>
            <Text style={[styles.text]}>Req</Text>
          </TouchableView>
        </View>
        <View style={[styles.shotcutBarForWebview]}>
          <TouchableView
            notification
            style={[
              styles.touchableView,
              {backgroundColor: Colors.lightBlue300},
            ]}
            onPress={() => setSourtcutURLButton('https://www.daum.net')}>
            <Text style={[styles.text]}>Daum</Text>
          </TouchableView>
          <TouchableView
            notification
            style={[styles.touchableView, {backgroundColor: Colors.green300}]}
            onPress={() => setSourtcutURLButton('https://www.naver.net')}>
            <Text style={[styles.text]}>Naver</Text>
          </TouchableView>
          <TouchableView
            notification
            style={[styles.touchableView, {backgroundColor: Colors.grey500}]}
            onPress={() =>
              setSourtcutURLButton('http://vklog.loginside.co.kr/')
            }>
            <Text style={[styles.text]}>vklog</Text>
          </TouchableView>
          <TouchableView
            notification
            style={[styles.touchableView, {backgroundColor: Colors.red500}]}
            onPress={() => setSourtcutURLButton('https://www.acecounter.com/')}>
            <Text style={[styles.text]}>ACE</Text>
          </TouchableView>
        </View>
        <WebView
          ref={refForWebview}
          originWhitelist={['*']}
          source={url}
          style={[styles.WebviewFlex]}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1},
  title: {fontSize: 40},
  text: {fontSize: 20},
  navigationBarForWebview: {
    minHeight: '6%',
    padding: 3,
    flexDirection: 'row',
  },
  shotcutBarForWebview: {
    minHeight: '6%',
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  WebviewFlex: {flex: 1},
  touchableView: {
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 11,
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    padding: 3,
    backgroundColor: Colors.transparent,
  },
})
