import {DrawerNavigationProp} from '@react-navigation/drawer'
import {RouteProp} from '@react-navigation/native'
import {DrawerStackParamList} from '../theme'

type WebViewHomeScreenRouteProp = RouteProp<DrawerStackParamList, 'WebViewHome'>

type WebViewHomeScreenNavigationProp = DrawerNavigationProp<
  DrawerStackParamList,
  'WebViewHome'
>

type WebViewHomeScreenProps = {
  route: WebViewHomeScreenRouteProp
  navigation: WebViewHomeScreenNavigationProp
}

export type {WebViewHomeScreenProps}
