import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import DrawerContent from './DrawerContent'

import GridNavigator from './GridNavigator'

import Login from './Login'
import SignUp from './SignUp'
import TabNavigator from './TabNavigator'
import Settings from './Settings'
import WebViewHome from './WebViewHome'

import type {DrawerStackParamList} from '../theme/navigation'

const Drawer = createDrawerNavigator<DrawerStackParamList>()

export default function MainNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Login"
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="SignUp" component={SignUp} />
      <Drawer.Screen name="GridNavigator" component={GridNavigator} />

      <Drawer.Screen name="WebViewHome" component={WebViewHome} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{title: 'Home'}}
      />
    </Drawer.Navigator>
  )
}
