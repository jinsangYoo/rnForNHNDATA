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
} from 'reactslimer'
import {WebViewHomeScreenProps} from '../routeProps.ts'

const title = 'WebViewHome'
export default function WebViewHome({route}: WebViewHomeScreenProps) {
  useLayoutEffect(() => {
    const randomValue = getRandomIntInclusive(0, 999).toString()
    const msg = `>>${title}<< >>${randomValue}<<`
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
    navigation.navigate('Login')
  }, [])
  console.log(
    `${title}.acesession: ${JSON.stringify(route.params?.acesession, null, 2)}`,
  )

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <NavigationHeader
          title="ACE"
          Left={() => <Icon name="menu" size={30} onPress={open} />}
          Right={() => <Icon name="logout" size={30} onPress={logout} />}
        />
        <WebView
          originWhitelist={['*']}
          source={{
            uri: 'http://m.acecounter.com/stat/my/site_list.amz',
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
