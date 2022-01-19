import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react'
import {
  Platform,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from 'react-native'
import {useNavigation, DrawerActions} from '@react-navigation/native'
// prettier-ignore
import {SafeAreaView, NavigationHeader, MaterialCommunityIcon as Icon, View, Text, TextInput, TouchableViewForFullWidth as TouchableView}
from '../theme'
import {useAutoFocus, AutoFocusProvider} from '../contexts'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../store'
import * as U from '../utils'
import * as L from '../store/login'
import {Colors} from 'react-native-paper'
import {DrawerNavigationProp} from '@react-navigation/drawer'
import {DrawerStackParamList} from '../theme/navigation'

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

type PLScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, 'PL'>
type Props = {
  navigation: PLScreenNavigationProp
}

const title = 'PL'
export default function PL() {
  const focus = useAutoFocus()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const open = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer())
  }, [])
  const logout = useCallback(() => {
    dispatch(L.logoutAction())
    navigation.navigate('Login')
  }, [])

  useLayoutEffect(() => {
    const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
    const msgForScreen = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msgForScreen)
    sendCommonWithPromise(msgForScreen, params)
  }, [])

  const randomValue = getRandomIntInclusive(0, 999).toString()
  const [msg, setMsg] = useState<string>(`>>${title}<< >>${randomValue}<<`)
  const onSend = useCallback(() => {
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [msg])

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <NavigationHeader
          title={title}
          Left={() => <Icon name="menu" size={30} onPress={open} />}
          Right={() => <Icon name="logout" size={30} onPress={logout} />}
        />
        <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
          <View style={[styles.textView]}>
            <Text style={[styles.text]}>PL 명</Text>
            <View border style={[styles.textInputView]}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={msg}
                onChangeText={setMsg}
                placeholder="이벤트 명 입력"
              />
            </View>
          </View>
          <TouchableView
            notification
            style={[styles.touchableView]}
            onPress={onSend}>
            <Text style={[styles.text]}>PL</Text>
          </TouchableView>
        </AutoFocusProvider>
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
  textView: {width: '100%', padding: 5, marginBottom: 10},
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
