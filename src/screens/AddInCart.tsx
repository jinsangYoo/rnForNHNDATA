import React, {useState, useCallback, useEffect} from 'react'
import {
  Platform,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
// prettier-ignore
import {SafeAreaView, View, Text, TextInput, TouchableViewForFullWidth as TouchableView}
from '../theme'
import {useAutoFocus, AutoFocusProvider} from '../contexts'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../store'
import * as U from '../utils'
import * as L from '../store/login'
import {Colors} from 'react-native-paper'
import {DrawerNavigationProp} from '@react-navigation/drawer'
import {DrawerStackParamList} from '../theme/navigation'

type AddInCartScreenNavigationProp = DrawerNavigationProp<
  DrawerStackParamList,
  'AddInCart'
>
type Props = {
  navigation: AddInCartScreenNavigationProp
}

export default function AddInCart() {
  const {loggedIn} = useSelector<AppState, L.State>(({login}) => login)
  const [acesession, setAcesession] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const focus = useAutoFocus()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const goTabNavigator = useCallback(() => {
    dispatch(L.loginAction({acesession, id, password}))
    navigation.navigate('TabNavigator')
  }, [acesession, id, password])
  const goSignUp = useCallback(() => navigation.navigate('SignUp'), [])

  useEffect(() => {
    // U.readFromStorage(L.loggedUserKey)
    //   .then(value => {
    //     if (value.length > 0) {
    //       const savedUser = JSON.parse(value)
    //       setAcesession(savedUser.acesession)
    //       setId(savedUser.id)
    //       setPassword(savedUser.password)
    //     }
    //   })
    //   .catch(e => {})
  }, [loggedIn])

  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const onLogin = useCallback(() => {
    setLoading(true)
    fetch(`http://m.acecounter.com/login.amz?id=${id}&pw=${password}`)
      .then(res => {
        var _resultMap = new Map()
        for (const [key, value] of Object.entries(res)) {
          _resultMap.set(key, value)
        }

        if (_resultMap.has('status') && _resultMap.get('status') === 200) {
          console.log(`_resultMap.get('status'): ${_resultMap.get('status')}`)
        } else {
          throw new Error('response is not ok.')
        }

        var _resultHeadersMap = new Map()
        if (!_resultMap.has('headers')) {
          throw new Error('response headers key is not exist.')
        } else {
          const _headers = _resultMap.get('headers')
          for (const [keyHeaders, valueHeaders] of Object.entries(
            _headers['map'],
          )) {
            _resultHeadersMap.set(keyHeaders, valueHeaders)
          }

          if (_resultHeadersMap.has('set-cookie')) {
            const regex = /^ACESESSION=(?!deleted).*/
            const setCookie = _resultHeadersMap
              .get('set-cookie')
              .split(' ')
              .filter(item => {
                return regex.test(item)
              })

            if (setCookie.length != 1) {
              throw new Error(
                'not found ACE SESSION information at response headers.',
              )
            } else {
              return setCookie[0]
            }
          } else {
            throw new Error('not found set-cookie key at response headers.')
          }
        }
      })
      .then(result => {
        console.log(`result: ${result}`)
        dispatch(L.loginWithSaveAction({acesession: result, id, password}))
        setLoading(false)
        navigation.navigate('WebViewHome')
      })
      .catch(e => {
        setLoading(false)
        setErrorMessage(e.message)
        popupErrorMessage()
      })
  }, [id, password])
  const popupErrorMessage = useCallback(() => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG)
    } else {
      Alert.alert(errorMessage)
    }
  }, [errorMessage])

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
          <Text style={[styles.title, {marginBottom: 100}]}>ACE COUNTER</Text>
          <View style={[styles.textView]}>
            <Text style={[styles.text]}>ID</Text>
            <View border style={[styles.textInputView]}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={id}
                onChangeText={setId}
                placeholder="AddInCart"
              />
            </View>
          </View>
          <View style={[styles.textView]}>
            <Text style={[styles.text]}>password</Text>
            <View border style={[styles.textInputView]}>
              <TextInput
                secureTextEntry
                onFocus={focus}
                style={[styles.textInput]}
                value={password}
                onChangeText={setPassword}
                placeholder="enter your password."
              />
            </View>
          </View>
          {loading && (
            <ActivityIndicator size="large" color={Colors.lightBlue500} />
          )}
          <TouchableView
            notification
            style={[styles.touchableView]}
            onPress={onLogin}>
            <Text style={[styles.text]}>Login</Text>
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
