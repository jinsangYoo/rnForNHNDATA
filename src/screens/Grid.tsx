import React, {useEffect, useState, useCallback, useLayoutEffect} from 'react'
import {
  Platform,
  StyleSheet,
  FlatList,
  ToastAndroid,
  Alert,
  Switch,
} from 'react-native'
import {DrawerActions} from '@react-navigation/native'
// prettier-ignore
import {SafeAreaView, View, Text, TextInput, TouchableView,
NavigationHeader, MaterialCommunityIcon as Icon} from '../theme'
import {AppState} from '../store'
import {useDispatch, useSelector} from 'react-redux'
import * as L from '../store/login'
import {useAutoFocus, useScrollEnabled} from '../contexts'
import {commonStyles} from '../styles/Common.style'
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid'
import {gcodeSelector, isEmpty} from '../../utils'
import GridCell from './GridCell'
import type {IAPI} from '../data'
import {useDefaultAPIList, useRenderSeparator} from '../hooks'
import {GridScreenProps as Props} from '../routeProps'

import {getRandomIntInclusive, isStartIndexAkAtGCodeString} from '../../utils'
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
import Validate from '../utils/validate'

import {AppState as AppStateStore} from '../store'
import * as AI from '../store/appinfo'

const title = 'Grid'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function Grid({navigation}: Props) {
  // gcode
  const focus = useAutoFocus()
  const dispatch = useDispatch()
  const {appinformaion} = useSelector<AppStateStore, AI.State>(
    ({appinfo}) => appinfo,
  )
  const [gcode, setGcode] = useState<string>(
    isEmpty(appinformaion.gcode) ? gcodeSelector() : appinformaion.gcode,
  )

  // idfa
  const [isAdTrackingEnabled, setIsAdTrackingEnabled] = useState<boolean>(false)
  useEffect(() => {
    ReactNativeIdfaAaid.getAdvertisingInfo()
      .then((res: AdvertisingInfoResponse) => {
        console.log(`${title}::in then: getAdvertisingInfo`)
        console.log(
          `${title}::in then: isAdTrackingEnabled: ${!res.isAdTrackingLimited}`,
        )
        console.log(`${title}::in then: idfa: ${res.id}`)

        const result = Validate.validateAdvertisingIdentifier(
          !res.isAdTrackingLimited,
          res.id,
        )
        setIsAdTrackingEnabled(result.isAdEnabled)
      })
      .catch(err => {
        console.log(err)
        setIsAdTrackingEnabled(false)
      })
  }, [])
  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])
  // navigation
  const open = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer())
  }, [])
  const logout = useCallback(() => {
    dispatch(L.logoutAction())
    navigation.reset({index: 0, routes: [{name: 'Login' as never}]})
  }, [])
  const {loggedUser} = useSelector<AppState, L.State>(({login}) => login)
  console.log(`loggedUser: ${JSON.stringify(loggedUser, null, 2)}`)
  const [scrollEnabled] = useScrollEnabled()
  const clickedCell = useCallback(
    (item: IAPI) => () => {
      console.log(`clickedCell::item: ${JSON.stringify(item, null, 2)}`)
      if (!item.node.isEnable) {
        const message = 'Disabled function.'
        if (Platform.OS === 'android') {
          ToastAndroid.show(message, ToastAndroid.SHORT)
        } else {
          Alert.alert(message)
        }
        return
      }

      navigation.push(item.node.type)
    },
    [],
  )
  const cells = useDefaultAPIList()
  const renderSeparator = useRenderSeparator()

  console.log(
    `1. isStartIndexAkAtGCodeString: ${isStartIndexAkAtGCodeString(
      'AK2A79936',
    )}`,
  )
  console.log(
    `2. isStartIndexAkAtGCodeString: ${isStartIndexAkAtGCodeString(
      'ak2A79936',
    )}`,
  )
  console.log(
    `3. isStartIndexAkAtGCodeString: ${isStartIndexAkAtGCodeString('')}`,
  )
  console.log(
    `4. isStartIndexAkAtGCodeString: ${isStartIndexAkAtGCodeString(' ')}`,
  )
  console.log(
    `5. isStartIndexAkAtGCodeString: ${isStartIndexAkAtGCodeString(
      'QUNFXzExNDUwOF9ESUdIVFk=',
    )}`,
  )
  const getSDKDetails = useCallback(() => {
    const details = JSON.stringify(ACS.getSdkDetails(), null, 2)
    if (Platform.OS === 'android') {
      ToastAndroid.show(details, ToastAndroid.LONG)
    } else {
      Alert.alert(details)
    }
  }, [])

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <NavigationHeader
          title={`${title} ${randomValueForScreen}`}
          Left={() => <Icon name="menu" size={30} onPress={open} />}
          Right={() => <Icon name="logout" size={30} onPress={logout} />}
        />
        <View style={[commonStyles.widthFullView]}>
          <View style={[commonStyles.rowFlexDirectionViewNonPadding]}>
            <Text style={[styles.text]}>key:</Text>
            <View
              border
              style={[styles.textInputViewInControlBox]}
              pointerEvents="none">
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={gcode}
                onChangeText={setGcode}
                placeholder="enter your gcode."
              />
            </View>
          </View>
          <View
            style={[
              commonStyles.rowFlexDirectionViewNonPadding,
              styles.controlBoxJustifyContent,
              {marginTop: 10},
            ]}
            pointerEvents="none">
            <Text style={[styles.text]}>개인 정보 취급 방침 활성화:</Text>
            <Switch value={isAdTrackingEnabled} />
          </View>
          <View
            style={[
              commonStyles.rowFlexDirectionViewNonPadding,
              styles.controlBoxJustifyContent,
              {marginTop: 10},
            ]}>
            <Text style={[styles.text]}>SDK 상태보기:</Text>
            <TouchableView
              notification
              style={[styles.touchableViewInControlBox]}
              onPress={getSDKDetails}>
              <Text style={[styles.textInTouchableView]}>보기</Text>
            </TouchableView>
          </View>
        </View>
        <View style={styles.view}>
          <FlatList
            scrollEnabled={scrollEnabled}
            data={cells}
            ItemSeparatorComponent={renderSeparator}
            renderItem={({item}) => (
              <GridCell api={item} onPressed={clickedCell(item)} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  view: {flex: 1},
  controlBoxJustifyContent: {justifyContent: 'space-between'},
  text: {fontSize: 20},
  textInTouchableView: {fontSize: 20, width: '100%', textAlign: 'center'},
  textInput: {width: '100%', fontSize: 20, padding: 10, alignItems: 'baseline'},
  textInputViewInControlBox: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 10,
  },
  touchableViewInControlBox: {
    width: '100%',
    marginLeft: 10,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'baseline',
  },
})
