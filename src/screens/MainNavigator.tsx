import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import DrawerContent from './DrawerContent'

import Grid from './Grid'

import AddInCart from './AddInCart'
import AppearProduct from './AppearProduct'
import Buy from './Buy'
import DeleteInCart from './DeleteInCart'
import Event from './Event'
import Join from './Join'
import Leave from './Leave'
import Link from './Link'
import LoginForAPI from './LoginForAPI'
import Search from './Search'
import Tel from './Tel'
import Webview from './Webview'

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
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Grid" component={Grid} />

      <Drawer.Screen name="AddInCart" component={AddInCart} />
      <Drawer.Screen name="AppearProduct" component={AppearProduct} />
      <Drawer.Screen name="Buy" component={Buy} />
      <Drawer.Screen name="DeleteInCart" component={DeleteInCart} />
      <Drawer.Screen name="Event" component={Event} />
      <Drawer.Screen name="Join" component={Join} />
      <Drawer.Screen name="Leave" component={Leave} />
      <Drawer.Screen name="Link" component={Link} />
      <Drawer.Screen name="LoginForAPI" component={LoginForAPI} />
      <Drawer.Screen name="Search" component={Search} />
      <Drawer.Screen name="Tel" component={Tel} />
      <Drawer.Screen name="Webview" component={Webview} />

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
