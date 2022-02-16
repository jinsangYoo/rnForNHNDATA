import React, {useState, useCallback, useMemo, useEffect} from 'react'
import {StyleSheet} from 'react-native'
// prettier-ignore
import {SafeAreaView, NavigationHeader, MaterialCommunityIcon as Icon, View, TextInput, Text, TouchableView}
from '../theme'
import {useAutoFocus, AutoFocusProvider} from '../contexts'
import {useDispatch} from 'react-redux'
import * as U from '../utils'
import {WebView} from 'react-native-webview'
import {commonStyles} from '../styles/Common.style'

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

const title = 'Webview'
export default function Webview({navigation}: Props) {
  const defaultWebviewURL = useMemo(() => 'http://vklog.loginside.co.kr/', [])
  const [url, setUrl] = useState<string>(defaultWebviewURL)
  useEffect(() => {
    U.readFromStorage('__webViewURL')
      .then(value => {
        if (value.length > 0) {
          setUrl(value)
        }
      })
      .catch(e => {})
  }, [])

  const focus = useAutoFocus()
  const dispatch = useDispatch()
  const onBack = useCallback(() => {
    navigation.canGoBack() && navigation.goBack()
  }, [])
  const logout = useCallback(() => {
    dispatch(L.logoutAction())
    navigation.reset({index: 0, routes: [{name: 'Login'}]})
  }, [])
  const setDefaultURLToWebview = useCallback(() => {
    navigation.reset({index: 0, routes: [{name: 'Login'}]})
  }, [])
  const refreshToWebview = useCallback(() => {
    navigation.reset({index: 0, routes: [{name: 'Login'}]})
  }, [])

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <NavigationHeader
          title={title}
          Left={() => (
            <Icon name="arrow-left-thick" size={30} onPress={onBack} />
          )}
          Right={() => <Icon name="logout" size={30} onPress={logout} />}
        />
        <View style={[styles.topNavigationBarForWebview]}>
          <TouchableView
            notification
            style={[styles.touchableView]}
            onPress={setDefaultURLToWebview}>
            <Text style={[styles.text]}>D</Text>
          </TouchableView>
          <TouchableView
            notification
            style={[styles.touchableView]}
            onPress={refreshToWebview}>
            <Text style={[styles.text]}>R</Text>
          </TouchableView>
          <AutoFocusProvider
            contentContainerStyle={[styles.keyboardAwareFocus]}>
            <TextInput
              onFocus={focus}
              style={[styles.textInput]}
              value={url}
              placeholder="enter website URL."
            />
          </AutoFocusProvider>
          <TouchableView
            notification
            style={[styles.touchableView]}
            onPress={refreshToWebview}>
            <Text style={[styles.text]}>GO</Text>
          </TouchableView>
        </View>

        <WebView
          originWhitelist={['*']}
          source={{
            uri: defaultWebviewURL,
          }}
          style={[commonStyles.flex]}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1, justifyContent: 'space-between', alignItems: 'center'},
  title: {fontSize: 40},
  text: {fontSize: 20},
  keyboardAwareFocus: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topNavigationBarForWebview: {width: '100%', padding: 3, flexDirection: 'row'},
  textInput: {fontSize: 24, padding: 10},
  textInputView: {marginTop: 5, borderRadius: 10},
  touchableView: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
