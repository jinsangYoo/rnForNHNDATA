import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type SDK_Configure_SettingScreenRouteProp = RouteProp<
  GridStackParamList,
  'SDK_Configure_Setting'
>
type SDK_Configure_SettingScreenNavigationProp = StackNavigationProp<
  GridStackParamList,
  'SDK_Configure_Setting'
>
type SDK_Configure_SettingScreenProps = {
  route: SDK_Configure_SettingScreenRouteProp
  navigation: SDK_Configure_SettingScreenNavigationProp
}

export type {SDK_Configure_SettingScreenProps}
