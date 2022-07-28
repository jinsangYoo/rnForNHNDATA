import React, {useLayoutEffect, useCallback} from 'react'
import {StyleSheet} from 'react-native'
import {useNavigation, DrawerActions} from '@react-navigation/native'
// prettier-ignore
import {SafeAreaView, View,
NavigationHeader, MaterialCommunityIcon as Icon} from '../theme'
import {useDispatch} from 'react-redux'
import * as L from '../store/login'
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
} from 'ace.sdk.react-native'
import {WebViewHomeScreenProps as Props} from '../routeProps'

const title = 'WebViewHome'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function WebViewHome({route}: Props) {
  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  // navigation
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const open = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer())
  }, [])
  const logout = useCallback(() => {
    dispatch(L.logoutAction())
    navigation.reset({index: 0, routes: [{name: 'Login' as never}]})
  }, [])
  console.log(
    `${title}: ${JSON.stringify(route, null, 2)}`,
    `${title}.acesession: ${JSON.stringify(route.params?.acesession, null, 2)}`,
  )

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <NavigationHeader
          title={`ACE ${title} ${randomValueForScreen}`}
          Left={() => <Icon name="menu" size={30} onPress={open} />}
          Right={() => <Icon name="logout" size={30} onPress={logout} />}
        />
        <WebView
          originWhitelist={['*']}
          source={{
            uri: 'https://m.acecounter.com/stat/my/site_list.amz',
            headers: {
              Cookie: route.params?.acesession,
            },
          }}
          style={[commonStyles.flex]}
        />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  view: {flex: 1},
})
