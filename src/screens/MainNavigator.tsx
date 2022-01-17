import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import DrawerContent from './DrawerContent'

import Grid from './Grid'
import Login from './Login'
import SignUp from './SignUp'
import TabNavigator from './TabNavigator'
import Settings from './Settings'
import WebViewHome from './WebViewHome'

const Drawer = createDrawerNavigator()

export default function MainNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Grid" component={Grid} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="SignUp" component={SignUp} />
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
