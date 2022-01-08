import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import DrawerContent from './DrawerContent'

import Login from './Login'
import SignUp from './SignUp'
import TabNavigator from './TabNavigator'
import Settings from './Settings'

const Drawer = createDrawerNavigator()

export default function MainNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="SignUp" component={SignUp} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{title: 'Home'}}
      />
    </Drawer.Navigator>
  )
}
