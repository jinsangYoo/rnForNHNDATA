import React, {useCallback} from 'react'
import {StyleSheet} from 'react-native'
import {useNavigation, DrawerActions} from '@react-navigation/native'
// prettier-ignore
import {SafeAreaView, View, TextInput,
NavigationHeader, MaterialCommunityIcon as Icon} from '../theme'
import {AppState} from '../store'
import {useDispatch, useSelector} from 'react-redux'
import * as L from '../store/login'
import {WebView} from 'react-native-webview'
import {commonStyles} from '../styles/Common.style'
import {Colors} from 'react-native-paper'

export default function WebViewHome() {
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
  const {loggedUser} = useSelector<AppState, L.State>(({login}) => login)
  console.log(`loggedUser: ${JSON.stringify(loggedUser, null, 2)}`)

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
              Cookie: loggedUser.acesession,
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
