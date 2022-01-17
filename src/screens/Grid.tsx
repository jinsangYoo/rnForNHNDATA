import React, {useEffect, useState, useCallback} from 'react'
import {StyleSheet, FlatList} from 'react-native'
import {useNavigation, DrawerActions} from '@react-navigation/native'
// prettier-ignore
import {SafeAreaView, View, Text, TextInput, TouchableView,
NavigationHeader, MaterialCommunityIcon as Icon} from '../theme'
import {AppState} from '../store'
import {useDispatch, useSelector} from 'react-redux'
import * as D from '../data'
import * as L from '../store/login'
import {useAutoFocus, useScrollEnabled} from '../contexts'
import {Switch} from 'react-native'
import {commonStyles} from '../styles/Common.style'
import {Colors} from 'react-native-paper'
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid'
import {gcodeSelector} from '../../utils'
import GridCell from './GridCell'
import {useDefaultAPIList} from '../hooks'
import {IAPI} from '../data'

export default function Grid() {
  // gcode
  const focus = useAutoFocus()
  const [gcode, setGcode] = useState<string>(gcodeSelector())
  const onApplyGcode = useCallback(() => {}, [])
  // debug mode
  const [isDebug, setIsDebug] = useState<boolean>(false)
  // idfa
  const [isAdTrackingEnabled, setIsAdTrackingEnabled] = useState<boolean>(false)
  useEffect(() => {
    ReactNativeIdfaAaid.getAdvertisingInfo()
      .then((res: AdvertisingInfoResponse) => {
        setIsAdTrackingEnabled(!res.isAdTrackingLimited)
      })
      .catch(err => {
        console.log(err)
        setIsAdTrackingEnabled(false)
      })
    D.makeArray(5).forEach(addPerson)
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
  const {loggedUser} = useSelector<AppState, L.State>(({login}) => login)
  console.log(`loggedUser: ${JSON.stringify(loggedUser, null, 2)}`)
  const [scrollEnabled] = useScrollEnabled()
  // people
  const [people, setPeople] = useState<D.IPerson[]>([])
  const addPerson = useCallback(() => {
    setPeople(people => [D.createRandomPerson(), ...people])
  }, [])
  const deletePerson = useCallback(
    (id: string) => () => {
      setPeople(people => people.filter(person => person.id != id))
    },
    [],
  )
  const clickedCell = useCallback(
    (node: IAPI) => () => {
      console.log(`clickedCell::node: ${JSON.stringify(node, null, 2)}`)
    },
    [],
  )
  const cells = useDefaultAPIList()
  console.log(`Grid::cells: ${JSON.stringify(cells, null, 2)}`)

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <NavigationHeader
          title="Grid"
          Left={() => <Icon name="menu" size={30} onPress={open} />}
          Right={() => <Icon name="logout" size={30} onPress={logout} />}
        />
        <View
          style={[
            commonStyles.widthFullView,
            {backgroundColor: Colors.amber100},
          ]}>
          <View
            style={[
              commonStyles.rowFlexDirectionViewNonPadding,
              {backgroundColor: Colors.lightGreen100},
            ]}>
            <Text style={[styles.text]}>key:</Text>
            <View
              border
              style={[
                styles.textInputViewInControlBox,
                {backgroundColor: Colors.limeA100},
              ]}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={gcode}
                onChangeText={setGcode}
                placeholder="enter your gcode."
              />
            </View>
            <TouchableView
              notification
              style={[styles.touchableViewInControlBox]}
              onPress={onApplyGcode}>
              <Text style={[styles.textInTouchableView]}>apply</Text>
            </TouchableView>
          </View>
          <View
            style={[
              commonStyles.rowFlexDirectionViewNonPadding,
              styles.controlBoxJustifyContent,
              {
                backgroundColor: Colors.lightBlue100,
              },
            ]}>
            <Text style={[styles.text]}>debug 모드:</Text>
            <Switch
              value={isDebug}
              onValueChange={setIsDebug}
              style={{height: 50}}
            />
          </View>
          <View
            style={[
              commonStyles.rowFlexDirectionViewNonPadding,
              styles.controlBoxJustifyContent,
              {
                backgroundColor: Colors.lightGreenA100,
              },
            ]}
            pointerEvents="none">
            <Text style={[styles.text]}>개인 정보 취급 방침 활성화:</Text>
            <Switch value={isAdTrackingEnabled} style={{height: 50}} />
          </View>
        </View>
        <View style={styles.view}>
          <FlatList
            numColumns={3}
            scrollEnabled={scrollEnabled}
            data={cells}
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
