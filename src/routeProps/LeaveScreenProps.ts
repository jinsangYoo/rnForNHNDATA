import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type LeaveScreenRouteProp = RouteProp<GridStackParamList, 'Leave'>
type LeaveScreenNavigationProp = StackNavigationProp<
  GridStackParamList,
  'Leave'
>
type LeaveScreenProps = {
  route: LeaveScreenRouteProp
  navigation: LeaveScreenNavigationProp
}

export type {LeaveScreenProps}
