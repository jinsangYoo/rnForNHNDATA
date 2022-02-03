import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {GridStackParamList} from '../theme/navigation'

type JoinScreenRouteProp = RouteProp<GridStackParamList, 'Join'>
type JoinScreenNavigationProp = StackNavigationProp<GridStackParamList, 'Join'>
type JoinScreenProps = {
  route: JoinScreenRouteProp
  navigation: JoinScreenNavigationProp
}

export type {JoinScreenProps}
