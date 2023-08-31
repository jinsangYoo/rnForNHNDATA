import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type ManuallySetAD_IDScreenRouteProp = RouteProp<
  GridStackParamList,
  'ManuallySetAD_ID'
>
type ManuallySetAD_IDScreenNavigationProp = StackNavigationProp<
  GridStackParamList,
  'ManuallySetAD_ID'
>
type ManuallySetAD_IDScreenProps = {
  route: ManuallySetAD_IDScreenRouteProp
  navigation: ManuallySetAD_IDScreenNavigationProp
}

export type {ManuallySetAD_IDScreenProps}
