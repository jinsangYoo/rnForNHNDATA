import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type AppearProductScreenRouteProp = RouteProp<
  GridStackParamList,
  'AppearProduct'
>
type AppearProductScreenNavigationProp = StackNavigationProp<
  GridStackParamList,
  'AppearProduct'
>
type AppearProductScreenProps = {
  route: AppearProductScreenRouteProp
  navigation: AppearProductScreenNavigationProp
}

export type {AppearProductScreenProps}
